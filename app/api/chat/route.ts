import { NextRequest, NextResponse } from "next/server";
import { chomsky } from "@/lib/chomsky";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Rate limiting: 30 requests per minute for chat
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 30,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rateLimitResult.headers
      }
    );
  }

  try {
    const { message, context } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!context) {
      return NextResponse.json(
        { error: "Evaluation context is required" },
        { status: 400 }
      );
    }

    // Build system prompt with verdict context
    const systemPrompt = `You are the eBay Brand Coach. You just issued this verdict for a product naming evaluation:

**Verdict:** ${context.verdict}

**Gate Results:**
- G0 (Interaction Model): ${context.gatekeeperResult.G0.status} - ${context.gatekeeperResult.G0.reasoning}
- G1 (Integration Level): ${context.gatekeeperResult.G1.status} - ${context.gatekeeperResult.G1.reasoning}
- G2 (UX & Service Boundary): ${context.gatekeeperResult.G2.status} - ${context.gatekeeperResult.G2.reasoning}
- G3 (Strategic Lifespan): ${context.gatekeeperResult.G3.status} - ${context.gatekeeperResult.G3.reasoning}
- G4 (Portfolio Alignment): ${context.gatekeeperResult.G4.status} - ${context.gatekeeperResult.G4.reasoning}
- G5 (Legal & Localization): ${context.gatekeeperResult.G5.status} - ${context.gatekeeperResult.G5.reasoning}

${context.scorerResult ? `**Scoring:**
- Standalone: ${context.scorerResult.standalone}/25
- Longevity: ${context.scorerResult.longevity}/15
- Legal: ${context.scorerResult.legal}/10
- Global: ${context.scorerResult.global}/10
- Clarity: ${context.scorerResult.clarity}/10
- Reasoning: ${context.scorerResult.reasoning}` : ""}

Your job is to help the user understand why their brief failed or passed the evaluation, and suggest ways to adjust their strategy if needed. Be helpful, clear, and constructive. Use a professional but friendly tone.`;

    const responseText = await chomsky.generateText({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json({ response: responseText });
  } catch (error) {
    console.error("Chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Chat failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
