/**
 * Lab Generate Conditions API
 * AI-generated pass/fail conditions for a custom gate, based on label + description.
 * POST { label: string, description: string } → { passConditions: string[], failConditions: string[] }
 */

import { NextRequest, NextResponse } from "next/server";
import { chomsky } from "@/lib/chomsky";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting: 20 requests per minute
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 20,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitResult.headers }
    );
  }
  const body = await req.json() as { label?: string; description?: string };
  const label = body.label?.trim() ?? "";
  const description = body.description?.trim() ?? "";

  if (!label) {
    return Response.json({ error: "label is required" }, { status: 400 });
  }

  const userPrompt = `Gate name: "${label}"
Gate description: "${description || "Evaluates whether this product meets the gate criteria."}"

Generate exactly 3 PASS conditions and 3 FAIL conditions for this gate.
Each condition is one concrete sentence describing when a product passes or fails.

Output ONLY valid JSON with no markdown or explanation:
{"passConditions":["...","...","..."],"failConditions":["...","...","..."]}`;

  try {
    const raw = await chomsky.generateText({
      messages: [
        {
          role: "system",
          content:
            "You generate gate evaluation criteria for a product naming governance framework. Output raw JSON only — no markdown, no code blocks, no explanation.",
        },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
      maxTokens: 400,
    });

    // Extract JSON object — handles LLM output with surrounding text or markdown fences
    const jsonMatch = raw.match(/\{[\s\S]*"passConditions"[\s\S]*"failConditions"[\s\S]*\}/) ??
                      raw.match(/\{[\s\S]*"failConditions"[\s\S]*"passConditions"[\s\S]*\}/);
    const cleaned = jsonMatch
      ? jsonMatch[0]
      : raw.replace(/```json\n?|```\n?/g, "").trim();

    let parsed: { passConditions?: unknown; failConditions?: unknown };
    try {
      parsed = JSON.parse(cleaned) as typeof parsed;
    } catch {
      return Response.json({ error: "Failed to parse conditions — try again" }, { status: 500 });
    }

    const passConditions = Array.isArray(parsed.passConditions)
      ? (parsed.passConditions as string[]).slice(0, 3)
      : [];
    const failConditions = Array.isArray(parsed.failConditions)
      ? (parsed.failConditions as string[]).slice(0, 3)
      : [];

    return Response.json({ passConditions, failConditions });
  } catch {
    return Response.json({ error: "Failed to generate conditions" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ status: "ok", description: "Generate gate conditions from label + description" });
}
