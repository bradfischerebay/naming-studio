import { NextRequest, NextResponse } from "next/server";
import { notifySlackEscalation } from "@/lib/slack";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const rateLimitResult = await rateLimit(req, { interval: 60 * 1000, maxRequests: 5 });
  if (!rateLimitResult.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: rateLimitResult.headers });
  }

  try {
    const body = await req.json() as {
      verdictPath?: string;
      verdictTitle?: string;
      briefSnippet?: string;
      score?: number | null;
    };

    const sent = await notifySlackEscalation({
      verdictPath: body.verdictPath ?? "UNKNOWN",
      verdictTitle: body.verdictTitle ?? "Naming Decision",
      briefSnippet: (body.briefSnippet ?? "").slice(0, 300),
      score: body.score ?? null,
    });

    return NextResponse.json({ success: true, sent });
  } catch {
    return NextResponse.json({ error: "Failed to send review request" }, { status: 500 });
  }
}
