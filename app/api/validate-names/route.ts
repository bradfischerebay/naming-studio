import { NextRequest, NextResponse } from "next/server";
import { chomsky } from "@/lib/chomsky";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

// Market extraction: scan brief for market references
function extractMarkets(brief: string): string[] {
  const markets = new Set<string>(["US"]); // Always include US as baseline

  const marketPatterns: Record<string, string[]> = {
    DE: ["germany", "german"],
    JP: ["japan", "japanese"],
    KR: ["korea", "korean"],
    FR: ["france", "french"],
    ES: ["spain", "spanish"],
    IT: ["italy", "italian"],
    CN: ["china", "chinese"],
    BR: ["brazil", "brazilian"],
    NL: ["netherlands", "dutch"],
    PL: ["poland", "polish"],
    UK: ["united kingdom", "uk", "britain", "british"],
  };

  const lowerBrief = brief.toLowerCase();

  // Check for country names and patterns
  for (const [code, patterns] of Object.entries(marketPatterns)) {
    if (patterns.some(pattern => lowerBrief.includes(pattern))) {
      markets.add(code);
    }
  }

  // Check for direct market codes (case-insensitive)
  const directCodes = ["DE", "JP", "KR", "FR", "ES", "IT", "CN", "BR", "NL", "PL", "UK"];
  for (const code of directCodes) {
    const regex = new RegExp(`\\b${code}\\b`, "i");
    if (regex.test(brief)) {
      markets.add(code);
    }
  }

  // Cap at 6 markets, prioritize non-US
  const marketArray = Array.from(markets);
  if (marketArray.length > 6) {
    const us = marketArray.filter(m => m === "US");
    const others = marketArray.filter(m => m !== "US").slice(0, 5);
    return [...others, ...us];
  }

  return marketArray;
}

// Fallback result for failed LLM calls
const FALLBACK_RESULT = {
  score: 5,
  pronunciation: "Unable to analyze",
  meaning: "Analysis failed",
  risks: ["Analysis unavailable"],
  recommendation: "caution" as const,
};

// LLM system prompt for name × market evaluation
const SYSTEM_PROMPT = `You are a multilingual brand naming specialist. Evaluate a candidate product name for a specific target market.

Assess: pronunciation difficulty for native speakers, false cognates or similar-sounding words with different meanings, cultural connotations (positive/negative/neutral), script compatibility, and any known risks.

Output ONLY valid JSON on a single line with no markdown:
{"score":8,"pronunciation":"Easy for German speakers — single syllable","meaning":"No harmful meaning; 'vault' translates to 'Tresor' but English loanwords are common","risks":[],"recommendation":"safe"}

Rules:
- score: 0-10 (10=perfect fit, 7-9=safe, 4-6=caution, 0-3=avoid)
- pronunciation: one sentence about how native speakers would say this
- meaning: one sentence about meaning, cognates, or connotations in this market
- risks: array of specific risk strings (empty array if none)
- recommendation: exactly "safe", "caution", or "avoid"`;

// Analyze a single name for a single market
async function analyzeNameForMarket(
  name: string,
  market: string
): Promise<{
  market: string;
  score: number;
  pronunciation: string;
  meaning: string;
  risks: string[];
  recommendation: "safe" | "caution" | "avoid";
}> {
  try {
    const userPrompt = `Candidate name: "${name}"\nTarget market: ${market}`;

    const text = await chomsky.generateText({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0,
      maxTokens: 600,
    });

    // Parse LLM response and remove markdown code blocks if present
    const jsonText = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const parsed = JSON.parse(jsonText);

    // Validate parsed structure
    if (
      typeof parsed.score !== "number" ||
      typeof parsed.pronunciation !== "string" ||
      typeof parsed.meaning !== "string" ||
      !Array.isArray(parsed.risks) ||
      !["safe", "caution", "avoid"].includes(parsed.recommendation)
    ) {
      console.error("Invalid LLM response structure:", parsed);
      return { market, ...FALLBACK_RESULT };
    }

    return {
      market,
      score: parsed.score,
      pronunciation: parsed.pronunciation,
      meaning: parsed.meaning,
      risks: parsed.risks,
      recommendation: parsed.recommendation,
    };
  } catch (error) {
    console.error(`Analysis failed for ${name} in ${market}:`, error);
    return { market, ...FALLBACK_RESULT };
  }
}

// Sanitize a name string
function sanitizeName(name: string): string {
  // Strip control characters and trim whitespace
  return name.replace(/[\x00-\x1F\x7F]/g, "").trim();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request, {
      interval: 60 * 1000,
      maxRequests: 10,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please try again later." },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { names, brief } = body;

    // Validate input
    if (!Array.isArray(names) || names.length === 0 || names.length > 3) {
      return NextResponse.json(
        { success: false, error: "Names must be an array of 1-3 items" },
        { status: 400 }
      );
    }

    if (!names.every((n) => typeof n === "string" && n.trim().length > 0 && n.length <= 50)) {
      return NextResponse.json(
        { success: false, error: "Each name must be a non-empty string (max 50 characters)" },
        { status: 400 }
      );
    }

    if (typeof brief !== "string" || brief.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Brief must be a non-empty string" },
        { status: 400 }
      );
    }

    // Sanitize names
    const sanitizedNames = names.map(sanitizeName);

    // Extract markets from brief
    const markets = extractMarkets(brief);

    // Build all name × market combinations
    const tasks: Promise<{
      name: string;
      market: string;
      result: Awaited<ReturnType<typeof analyzeNameForMarket>>;
    }>[] = [];

    for (const name of sanitizedNames) {
      for (const market of markets) {
        tasks.push(
          analyzeNameForMarket(name, market).then((result) => ({
            name,
            market,
            result,
          }))
        );
      }
    }

    // Execute all tasks in parallel
    const settled = await Promise.allSettled(tasks);

    // Group results by name
    const resultsByName = new Map<string, Array<Awaited<ReturnType<typeof analyzeNameForMarket>>>>();

    for (const name of sanitizedNames) {
      resultsByName.set(name, []);
    }

    for (const outcome of settled) {
      if (outcome.status === "fulfilled") {
        const { name, result } = outcome.value;
        resultsByName.get(name)?.push(result);
      }
    }

    // Format response
    const results = sanitizedNames.map((name) => ({
      name,
      markets: resultsByName.get(name) || [],
    }));

    return NextResponse.json({
      success: true,
      markets,
      results,
    });

  } catch (error: any) {
    console.error("Name validation error:", error);

    // Handle VPN/connection errors
    if (
      error?.status === 403 ||
      error?.code === "ECONNREFUSED" ||
      error?.code === "ETIMEDOUT"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot reach Chomsky gateway — check your VPN connection",
        },
        { status: 503 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while validating names",
      },
      { status: 500 }
    );
  }
}
