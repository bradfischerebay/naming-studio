import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chomsky } from "@/lib/chomsky";
import { rateLimit } from "@/lib/rate-limit";
import { deepsights } from "@/lib/deepsights";
import {
  STRATEGY_BUCKETS,
  NAMING_PROTOCOLS,
  COMPETITOR_BENCHMARKS,
  type StrategyBucket,
} from "@/lib/data/naming-framework";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BRIEF_LENGTH = 5000;
const DEFAULT_COUNT = 3;
const MAX_COUNT = 5;
const DEFAULT_MARKETS = ["US"];

// Schema for each bucket's generation output
const CandidateSchema = z.object({
  name: z.string().max(30),
  rationale: z.string().max(200),
  tagline: z.string().max(80).optional(),
});

const SubtypeResultSchema = z.object({
  subtypeKey: z.string(),
  candidates: z.array(CandidateSchema),
});

const BucketGenerationSchema = z.object({
  subtypes: z.array(SubtypeResultSchema),
});

/**
 * GET /api/generate-names
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0",
    description: "Naming Strategy Framework — Generate product names using AI",
  });
}

/**
 * Build competitor context string for selected markets
 */
function buildCompetitorContext(markets: string[]): string {
  const sections: string[] = [];

  for (const market of markets) {
    const marketData = COMPETITOR_BENCHMARKS[market as keyof typeof COMPETITOR_BENCHMARKS];
    if (!marketData) continue;

    const categories = Object.entries(marketData)
      .slice(0, 5) // Top 5 categories per market
      .map(([category, competitors]) => {
        const topCompetitors = competitors.slice(0, 6).join(", ");
        return `  ${category}: ${topCompetitors}`;
      });

    sections.push(`${market} Market:\n${categories.join("\n")}`);
  }

  return sections.length > 0
    ? sections.join("\n\n")
    : "No competitor data available for selected markets.";
}

/**
 * Build system prompt for name generation
 */
function buildSystemPrompt(
  selectedBuckets: StrategyBucket[],
  markets: string[],
  competitorContext: string,
  deepsightsContext: string | null
): string {
  // Build framework section
  const frameworkSections = selectedBuckets.map((bucket) => {
    const subtypes = bucket.subtypes
      .map((subtype) => {
        const examples = subtype.examples.join(", ");
        return `    - ${subtype.label}: ${subtype.description}\n      Examples: ${examples}`;
      })
      .join("\n");

    return `${bucket.label} — ${bucket.description}\n${subtypes}`;
  });

  const framework = frameworkSections.join("\n\n");

  return `You are an expert brand naming consultant for eBay. Generate product names following the specific strategy framework provided.

HARD GUARDRAILS:
${NAMING_PROTOCOLS}

NAMING STRATEGY FRAMEWORK:
${framework}

COMPETITIVE CONTEXT (${markets.join(", ")} markets):
${competitorContext}

${deepsightsContext ? `MARKET RESEARCH:\n${deepsightsContext}\n` : ""}
Generate names that are:
- Distinctive and memorable
- Appropriate for eBay's brand voice (professional, trustworthy, innovative)
- Actionable (could realistically be used as a product name)
- Different from each other and the provided examples`;
}

/**
 * Generate names for a single bucket using LLM
 */
async function generateBucketNames(
  bucket: StrategyBucket,
  brief: string,
  markets: string[],
  count: number,
  systemPrompt: string
): Promise<{
  strategyKey: string;
  strategyLabel: string;
  subtypes: Array<{
    subtypeKey: string;
    subtypeLabel: string;
    candidates: Array<{
      name: string;
      rationale: string;
      tagline?: string;
    }>;
  }>;
}> {
  // List exact subtypeKey values so the LLM returns the right keys
  const subtypeList = bucket.subtypes
    .map((s) => `  - subtypeKey: "${s.key}" → ${s.label}`)
    .join("\n");

  const userPrompt = `Product Brief: ${brief}
Target Markets: ${markets.join(", ")}

Generate names for the "${bucket.label}" strategy bucket.
You MUST include ALL of the following subtypes using the EXACT subtypeKey values listed:
${subtypeList}

For each subtype, provide exactly ${count} name candidate(s) with rationale and optional tagline.`;

  try {
    const { object } = await chomsky.generateObject({
      schema: BucketGenerationSchema,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8, // Higher temperature for more creative names
    });

    // Map results to output format
    const subtypes = object.subtypes.map((subtypeResult) => {
      const subtypeDefinition = bucket.subtypes.find((s) => s.key === subtypeResult.subtypeKey);
      return {
        subtypeKey: subtypeResult.subtypeKey,
        subtypeLabel: subtypeDefinition?.label || subtypeResult.subtypeKey,
        candidates: subtypeResult.candidates,
      };
    });

    return {
      strategyKey: bucket.key,
      strategyLabel: bucket.label,
      subtypes,
    };
  } catch (error) {
    console.error(`Failed to generate names for bucket ${bucket.key}:`, error);
    // Return empty results for failed bucket
    return {
      strategyKey: bucket.key,
      strategyLabel: bucket.label,
      subtypes: bucket.subtypes.map((subtype) => ({
        subtypeKey: subtype.key,
        subtypeLabel: subtype.label,
        candidates: [],
      })),
    };
  }
}

/**
 * POST /api/generate-names
 * Generate product names using Naming Strategy Framework
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 10 requests per minute
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 10,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  try {
    const body = (await req.json()) as {
      brief?: string;
      markets?: string[];
      strategies?: string[];
      count?: number;
      useDeepSights?: boolean;
    };

    const { brief, markets = DEFAULT_MARKETS, strategies, count = DEFAULT_COUNT, useDeepSights = false } = body;

    // Validate brief
    if (!brief || typeof brief !== "string") {
      return NextResponse.json({ error: "Brief is required" }, { status: 400 });
    }

    if (brief.length > MAX_BRIEF_LENGTH) {
      return NextResponse.json(
        { error: `Brief is too long. Maximum ${MAX_BRIEF_LENGTH} characters allowed.` },
        { status: 400 }
      );
    }

    // Validate count
    const validCount = Math.min(Math.max(1, count), MAX_COUNT);

    // Validate and select strategy buckets
    const selectedBuckets = strategies?.length
      ? STRATEGY_BUCKETS.filter((bucket) => strategies.includes(bucket.key))
      : STRATEGY_BUCKETS;

    if (selectedBuckets.length === 0) {
      return NextResponse.json({ error: "No valid strategies selected" }, { status: 400 });
    }

    // Fetch DeepSights context if requested
    let deepsightsContext: string | null = null;
    if (useDeepSights) {
      try {
        // Use first 512 chars of brief as query (DeepSights limit)
        const query = brief.slice(0, 512);
        const research = await deepsights.research(query);
        deepsightsContext = deepsights.formatForLLM(research);
      } catch (error) {
        console.warn("DeepSights fetch failed, proceeding without market research:", error);
      }
    }

    // Build competitor context
    const competitorContext = buildCompetitorContext(markets);

    // Build system prompt
    const systemPrompt = buildSystemPrompt(selectedBuckets, markets, competitorContext, deepsightsContext);

    // Generate names for all buckets in parallel
    const generationPromises = selectedBuckets.map((bucket) =>
      generateBucketNames(bucket, brief, markets, validCount, systemPrompt)
    );

    const results = await Promise.all(generationPromises);

    return NextResponse.json({
      success: true,
      markets,
      deepsightsContext,
      competitorContext,
      results,
    });
  } catch (error) {
    console.error("Name generation error:", error);

    // Handle VPN/connection errors
    if (
      error instanceof Error &&
      (error.message.includes("ECONNREFUSED") ||
        error.message.includes("ETIMEDOUT") ||
        error.message.includes("403"))
    ) {
      return NextResponse.json(
        { error: "Cannot reach Chomsky gateway — check your VPN connection" },
        { status: 503 }
      );
    }

    // Generic error
    return NextResponse.json({ error: "An error occurred while generating names" }, { status: 500 });
  }
}
