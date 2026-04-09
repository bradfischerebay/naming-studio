/**
 * Brief Corpus API — Admin only
 * GET    ?limit=50&offset=0&verdict=PATH_C  → paginated corpus entries
 * GET    ?export=jsonl&verdict=PATH_C&format=anthropic  → JSONL fine-tuning export
 * PATCH  body: { hash, approved }  → toggle approvedForTraining on a specific entry
 * DELETE ?hash=xxx  → remove a single corpus entry
 */

import { NextRequest, NextResponse } from "next/server";
import { getCorpusEntries, exportCorpusJSONL, recordBriefCorpus } from "@/lib/brief-corpus";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const { searchParams } = request.nextUrl;
  const isExport = searchParams.get("export") === "jsonl";
  const verdictFilter = searchParams.get("verdict") ?? undefined;
  const format = (searchParams.get("format") ?? "anthropic") as "anthropic" | "openai";
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 200);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  if (isExport) {
    const jsonl = await exportCorpusJSONL({ verdictFilter, format });
    return new Response(jsonl, {
      headers: {
        "Content-Type": "application/x-ndjson",
        "Content-Disposition": `attachment; filename="naming-corpus-${verdictFilter ?? "all"}-${new Date().toISOString().slice(0, 10)}.jsonl"`,
      },
    });
  }

  const { entries, total } = await getCorpusEntries({ limit, offset, verdictFilter });
  return NextResponse.json({ success: true, entries, total, limit, offset });
}

export async function POST(request: NextRequest) {
  const body = await request.json() as {
    briefText?: string;
    verdictPath?: string;
    score?: number | null;
    offeringDescription?: string | null;
    targetGeographies?: string | null;
  };

  const { briefText, verdictPath, score, offeringDescription, targetGeographies } = body;

  if (!briefText || typeof briefText !== "string" || !verdictPath || typeof verdictPath !== "string") {
    return NextResponse.json({ error: "briefText and verdictPath required" }, { status: 400 });
  }

  await recordBriefCorpus({
    brief: briefText,
    verdictPath,
    score: score ?? null,
    offeringDescription: offeringDescription ?? null,
    targetGeographies: targetGeographies ?? null,
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const body = await request.json() as { hash?: string; approved?: boolean };
  const { hash, approved } = body;

  if (!hash || typeof hash !== "string" || typeof approved !== "boolean") {
    return NextResponse.json({ error: "hash (string) and approved (boolean) required" }, { status: 400 });
  }

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ error: "Redis not configured" }, { status: 503 });
  }

  const { Redis } = await import("@upstash/redis");
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const CORPUS_KEY = "brief:corpus";

  const raw = await redis.hget(CORPUS_KEY, hash) as string | null;
  if (!raw) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  const entry = typeof raw === "string" ? JSON.parse(raw) : raw;
  entry.approvedForTraining = approved;
  await redis.hset(CORPUS_KEY, { [hash]: JSON.stringify(entry) });

  return NextResponse.json({ success: true, hash, approvedForTraining: approved });
}

export async function DELETE(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;

  const hash = request.nextUrl.searchParams.get("hash");
  if (!hash) return NextResponse.json({ error: "hash required" }, { status: 400 });

  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ error: "Redis not configured" }, { status: 503 });
  }

  const { Redis } = await import("@upstash/redis");
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const CORPUS_KEY = "brief:corpus";
  const CORPUS_INDEX_KEY = "brief:corpus:idx";

  await redis.hdel(CORPUS_KEY, hash);
  // Remove from index: lrem removes all occurrences
  await redis.lrem(CORPUS_INDEX_KEY, 0, hash);

  return NextResponse.json({ success: true });
}
