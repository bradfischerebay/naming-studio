import { NextRequest, NextResponse } from "next/server";
import { glean, GleanClient } from "@/lib/glean";
import { rateLimit } from "@/lib/rate-limit";
import { analytics } from "@/lib/analytics";

export const maxDuration = 120; // Glean can take 60-90s for complex queries

const MAX_QUESTION_LENGTH = 50000;    // briefs can be long
const MAX_FILE_TEXT_LENGTH = 15000;   // ~10 pages — keeps Glean under its processing limit

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

    const body = await req.json() as {
      question?: string;
      agentId?: string;
      chatId?: string;
      turnNumber?: number;
      hasAttachment?: boolean;
      agentVersion?: string;
      fileName?: string;
      fileText?: string;
    };
    const {
      question = "",
      agentId,
      chatId,
      turnNumber = 1,
      hasAttachment = false,
      agentVersion = "unknown",
      fileName,
      fileText,
    } = body;

    // Must have either a question or a file
    if (!question.trim() && !fileText) {
      return NextResponse.json({ error: "Message or file is required" }, { status: 400 });
    }

    if (question.length > MAX_QUESTION_LENGTH) {
      return NextResponse.json(
        { error: `Message is too long (${question.length.toLocaleString()} chars). Maximum is ${MAX_QUESTION_LENGTH.toLocaleString()}.` },
        { status: 400 }
      );
    }

    // Assemble the full prompt — inject file text on the backend before handing to Glean
    let fullQuestion = question.trim();
    if (fileText && fileName) {
      const truncated = fileText.length > MAX_FILE_TEXT_LENGTH;
      const truncatedFile = fileText.slice(0, MAX_FILE_TEXT_LENGTH);
      const truncationNote = truncated
        ? `\n\n[Note: document was trimmed to ${MAX_FILE_TEXT_LENGTH.toLocaleString()} characters to fit within processing limits]`
        : "";
      fullQuestion = question.trim()
        ? `Document: "${fileName}"${truncationNote}\n\n${truncatedFile}\n\n---\n\n${question.trim()}`
        : `Document: "${fileName}"${truncationNote}\n\nPlease review this document in the context of eBay naming guidelines:\n\n${truncatedFile}`;
    }

    // Use per-request agentId if provided, otherwise fall back to singleton (env-configured)
    const client = agentId ? new GleanClient({ agentId }) : glean;

    const start = Date.now();

    // Query Glean — pass chatId to continue an existing conversation thread
    const result = await client.query(fullQuestion, chatId);

    const durationMs = Date.now() - start;

    // Fire-and-forget analytics — never blocks response
    void analytics.trackGleanMessage({
      timestamp: new Date().toISOString(),
      agentId: agentId ?? "default",
      agentVersion,
      chatId: result.chatId ?? chatId ?? null,
      userMessage: question || `[Document: ${fileName}]`,
      responsePreview: result.answer.slice(0, 500),
      durationMs,
      sourceCount: result.sources.length,
      turnNumber,
      hasAttachment,
    });

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
