import { NextRequest, NextResponse } from "next/server";
import { glean } from "@/lib/glean";
import { rateLimit } from "@/lib/rate-limit";

const MAX_QUESTION_LENGTH = 1000;

/**
 * GET /api/glean
 * Health check endpoint
 */
export async function GET() {
  const configured = !!process.env.GLEAN_API_TOKEN;

  return NextResponse.json({
    status: "ok",
    configured,
  });
}

/**
 * POST /api/glean
 * Query Glean enterprise search
 *
 * Request body: { question: string }
 * Response: { answer: string; sources: GleanSource[] } | { error: string }
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 20 requests per minute (expensive — each call hits Glean's LLM)
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

  try {
    // Check if Glean is configured
    if (!process.env.GLEAN_API_TOKEN) {
      return NextResponse.json(
        { error: "Glean not configured — contact your administrator" },
        { status: 503 }
      );
    }

    const body = await req.json() as { question?: string };
    const { question } = body;

    // Validate question
    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        {
          error: `Question is too long. Maximum ${MAX_QUESTION_LENGTH} characters allowed. Your question is ${question.length} characters.`,
        },
        { status: 400 }
      );
    }

    // Query Glean
    const result = await glean.query(question);

    return NextResponse.json(result);
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : String(error);
    console.error("Glean API error:", rawMessage);

    // Sanitize error for client
    let clientMessage = "Glean request failed. Please try again.";
    let statusCode = 503;

    if (rawMessage.includes("took too long") || rawMessage.includes("AbortError")) {
      clientMessage = "Glean took too long to respond. Try a shorter question.";
      statusCode = 504;
    } else if (rawMessage.includes("authentication failed") || rawMessage.includes("401") || rawMessage.includes("403")) {
      clientMessage = "Glean authentication failed — token may have expired.";
      statusCode = 401;
    } else if (rawMessage.includes("not configured")) {
      clientMessage = "Glean not configured — contact your administrator";
      statusCode = 503;
    }

    return NextResponse.json({ error: clientMessage }, { status: statusCode });
  }
}
