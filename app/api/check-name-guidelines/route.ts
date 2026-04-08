import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chomsky } from "@/lib/chomsky";
import { rateLimit } from "@/lib/rate-limit";
import { NAMING_PROTOCOLS } from "@/lib/data/naming-framework";

export const runtime = "nodejs";
export const maxDuration = 90;

const MAX_BRIEF_LENGTH = 5000;
const MIN_NAMES = 1;
const MAX_NAMES = 10;

// Schema for guideline check output
const GuidelineCheckSchema = z.object({
  checks: z.object({
    naming_protocol: z.object({
      status: z.enum(["pass", "caution", "fail"]),
      notes: z.string(),
    }),
    portfolio_conflict: z.object({
      status: z.enum(["pass", "caution", "fail"]),
      notes: z.string(),
    }),
    brief_alignment: z.object({
      status: z.enum(["pass", "caution", "fail"]),
      notes: z.string(),
    }),
    distinctiveness: z.object({
      status: z.enum(["pass", "caution", "fail"]),
      notes: z.string(),
    }),
    cross_market_fit: z.object({
      status: z.enum(["pass", "caution", "fail"]),
      notes: z.string(),
    }),
  }),
  overall: z.enum(["proceed", "caution", "avoid"]),
  score: z.number().min(0).max(100),
  recommendation: z.string().max(300),
  strengths: z.array(z.string()).max(3),
  concerns: z.array(z.string()).max(3),
});

type GuidelineCheckResult = z.infer<typeof GuidelineCheckSchema>;

/**
 * GET /api/check-name-guidelines
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "1.0",
    description: "Naming Guidelines Checker — Validate product names against eBay naming protocols",
  });
}

/**
 * Build system prompt for guideline checking
 */
function buildSystemPrompt(markets: string[]): string {
  return `You are an expert eBay naming governance reviewer. Evaluate whether proposed product names comply with eBay's naming protocols and are suitable for the described product.

NAMING PROTOCOLS AND GUARDRAILS:
${NAMING_PROTOCOLS}

EVALUATION CRITERIA:
1. naming_protocol: Does the name comply with eBay's hard guardrails? (no banned terms, appropriate length, not too generic)
2. portfolio_conflict: Could this name be confused with existing eBay products or major marketplace competitors? (reference the competitive landscape)
3. brief_alignment: Does the name accurately represent what the product does based on the brief?
4. distinctiveness: Is the name memorable, unique, and clearly differentiable in the market?
5. cross_market_fit: Does the name work across the target markets (${markets.join(", ")}) without negative connotations or linguistic issues?

Score 0-100 where:
- 80-100: Proceed — strong candidate
- 60-79: Caution — viable with modifications or further review
- 0-59: Avoid — significant issues

Overall:
- "proceed": score >= 80 and no "fail" checks
- "caution": score 60-79 or any "caution" checks
- "avoid": score < 60 or any "fail" checks`;
}

/**
 * Fallback result for failed LLM evaluations
 */
function createFallbackResult(name: string): GuidelineCheckResult {
  return {
    checks: {
      naming_protocol: { status: "caution", notes: "Evaluation unavailable" },
      portfolio_conflict: { status: "caution", notes: "Evaluation unavailable" },
      brief_alignment: { status: "caution", notes: "Evaluation unavailable" },
      distinctiveness: { status: "caution", notes: "Evaluation unavailable" },
      cross_market_fit: { status: "caution", notes: "Evaluation unavailable" },
    },
    overall: "caution",
    score: 50,
    recommendation: `Unable to complete evaluation for "${name}". Manual review recommended.`,
    strengths: [],
    concerns: ["Automated evaluation failed"],
  };
}

/**
 * Evaluate a single name against guidelines
 */
async function evaluateName(
  name: string,
  brief: string,
  markets: string[],
  systemPrompt: string
): Promise<GuidelineCheckResult> {
  const userPrompt = `Product Brief: ${brief}
Target Markets: ${markets.join(", ")}
Candidate Name: "${name}"

Evaluate this name against all criteria and provide structured feedback.`;

  try {
    const { object } = await chomsky.generateObject({
      schema: GuidelineCheckSchema,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0, // Deterministic evaluation
    });

    return object;
  } catch (error) {
    console.error(`Failed to evaluate name "${name}":`, error);
    return createFallbackResult(name);
  }
}

/**
 * POST /api/check-name-guidelines
 * Validate product names against eBay naming guidelines
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
      names?: string[];
      brief?: string;
      markets?: string[];
    };

    const { names, brief, markets = ["US"] } = body;

    // Validate names
    if (!Array.isArray(names) || names.length < MIN_NAMES || names.length > MAX_NAMES) {
      return NextResponse.json(
        { error: `Names must be an array of ${MIN_NAMES}-${MAX_NAMES} items` },
        { status: 400 }
      );
    }

    if (!names.every((n) => typeof n === "string" && n.trim().length > 0 && n.length <= 50)) {
      return NextResponse.json(
        { error: "Each name must be a non-empty string (max 50 characters)" },
        { status: 400 }
      );
    }

    // Validate brief
    if (!brief || typeof brief !== "string" || brief.trim().length === 0) {
      return NextResponse.json({ error: "Brief must be a non-empty string" }, { status: 400 });
    }

    if (brief.length > MAX_BRIEF_LENGTH) {
      return NextResponse.json(
        { error: `Brief is too long. Maximum ${MAX_BRIEF_LENGTH} characters allowed.` },
        { status: 400 }
      );
    }

    // Sanitize names (strip control characters)
    const sanitizedNames = names.map((name) => name.replace(/[\x00-\x1F\x7F]/g, "").trim());

    // Build system prompt
    const systemPrompt = buildSystemPrompt(markets);

    // Evaluate all names in parallel
    const evaluationPromises = sanitizedNames.map((name) =>
      evaluateName(name, brief, markets, systemPrompt).then((result) => ({
        name,
        ...result,
      }))
    );

    const settled = await Promise.allSettled(evaluationPromises);

    // Extract results, using fallback for any rejections
    const results = settled.map((outcome, index) => {
      if (outcome.status === "fulfilled") {
        return outcome.value;
      } else {
        return {
          name: sanitizedNames[index],
          ...createFallbackResult(sanitizedNames[index]),
        };
      }
    });

    return NextResponse.json({
      success: true,
      markets,
      results,
    });
  } catch (error) {
    console.error("Name guideline check error:", error);

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
    return NextResponse.json({ error: "An error occurred while checking names" }, { status: 500 });
  }
}
