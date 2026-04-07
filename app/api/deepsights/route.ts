import { NextRequest, NextResponse } from "next/server";
import { deepsights } from "@/lib/deepsights";
import { rateLimit } from "@/lib/rate-limit";

const MAX_QUERY_LENGTH = 512;

/**
 * GET /api/deepsights
 * Health check endpoint
 */
export async function GET() {
  const configured = !!process.env.DEEPSIGHTS_API_KEY;
  const newsConfigured = !!process.env.CONTENTSTORE_API_KEY;

  return NextResponse.json({
    status: "ok",
    configured,
    newsConfigured,
  });
}

/**
 * POST /api/deepsights
 * Search DeepSights market intelligence
 *
 * Request body: { query: string; type?: "documents" | "topics" | "news" | "all" }
 * Response: { documents?: DocumentResult[]; topics?: DocumentResult[]; news?: NewsResult[] } | { error: string }
 */
export async function POST(req: NextRequest) {
  // Rate limiting: 20 requests per minute (conservative — each may fan out to 3 calls)
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
    // Check if DeepSights is configured
    if (!process.env.DEEPSIGHTS_API_KEY) {
      return NextResponse.json(
        { error: "DeepSights not configured — set DEEPSIGHTS_API_KEY in .env.local" },
        { status: 503 }
      );
    }

    const body = await req.json() as { query?: string; type?: string };
    const { query, type = "all" } = body;

    // Validate query
    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (query.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        {
          error: `Query is too long. Maximum ${MAX_QUERY_LENGTH} characters allowed. Your query is ${query.length} characters.`,
        },
        { status: 400 }
      );
    }

    // Execute search based on type
    switch (type) {
      case "documents": {
        const documents = await deepsights.searchDocuments(query);
        return NextResponse.json({ documents });
      }

      case "topics": {
        const topics = await deepsights.searchTopics(query);
        return NextResponse.json({ topics });
      }

      case "news": {
        if (!process.env.CONTENTSTORE_API_KEY) {
          return NextResponse.json(
            { error: "News search requires CONTENTSTORE_API_KEY" },
            { status: 503 }
          );
        }
        const news = await deepsights.searchNews(query);
        return NextResponse.json({ news });
      }

      case "all":
      default: {
        const research = await deepsights.research(query);
        return NextResponse.json(research);
      }
    }
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : String(error);
    console.error("DeepSights API error:", rawMessage);

    // Sanitize error for client
    let clientMessage = "DeepSights request failed. Please try again.";
    let statusCode = 503;

    if (rawMessage.includes("took too long") || rawMessage.includes("AbortError")) {
      clientMessage = "DeepSights took too long to respond. Try a shorter query.";
      statusCode = 504;
    } else if (rawMessage.includes("authentication failed") || rawMessage.includes("401") || rawMessage.includes("403")) {
      if (rawMessage.includes("news")) {
        clientMessage = "News search authentication failed — CONTENTSTORE_API_KEY may be invalid.";
      } else {
        clientMessage = "DeepSights authentication failed — API key may be invalid or expired.";
      }
      statusCode = 401;
    } else if (rawMessage.includes("not configured")) {
      clientMessage = "DeepSights not configured — set DEEPSIGHTS_API_KEY in .env.local";
      statusCode = 503;
    }

    return NextResponse.json({ error: clientMessage }, { status: statusCode });
  }
}
