/**
 * Brief Corpus API — Admin only
 * GET  ?limit=50&offset=0&verdict=PATH_C  → paginated corpus entries
 * GET  ?export=jsonl&verdict=PATH_C&format=anthropic  → JSONL fine-tuning export
 */

import { NextRequest, NextResponse } from "next/server";
import { getCorpusEntries, exportCorpusJSONL } from "@/lib/brief-corpus";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
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
