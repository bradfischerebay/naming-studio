import { NextRequest, NextResponse } from "next/server";
import { findSimilarBriefs } from "@/lib/brief-memory";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const rateLimitResult = await rateLimit(req, {
      interval: 60 * 1000,
      maxRequests: 20,
    });
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests." },
        { status: 429, headers: rateLimitResult.headers }
      );
    }
  } catch {
    // allow through on rate limit error
  }

  try {
    const { brief } = await req.json();
    if (!brief || typeof brief !== "string") {
      return NextResponse.json({ error: "brief is required" }, { status: 400 });
    }

    const similar = await findSimilarBriefs(brief, 3);
    return NextResponse.json({ similar });
  } catch (error) {
    console.error("[similar-briefs] Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ similar: [] });
  }
}
