/**
 * Brief Corpus
 * Stores every unique brief (by SHA-256 hash) evaluated through the tool.
 * Enables deduplication, frequency analysis, and fine-tuning dataset export.
 *
 * Key design decisions:
 * - One canonical entry per unique brief hash (normalized: lowercased + whitespace collapsed)
 * - Tracks how many times each brief has been run + verdict distribution across runs
 * - Separate from analytics events (event-centric) and brief-memory (similarity search)
 * - approvedForTraining defaults false — requires explicit review before export
 */

async function getRedis() {
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

export interface CorpusEntry {
  hash: string;
  briefText: string;           // Full brief text
  briefSnippet: string;        // First 200 chars for display
  firstSeenAt: string;         // ISO timestamp
  lastSeenAt: string;
  runCount: number;            // Times this exact brief has been evaluated
  verdictCounts: Record<string, number>; // { PATH_C: 2, PATH_A2: 1, ... }
  lastVerdictPath: string;
  lastScore: number | null;
  offeringDescription: string | null;
  targetGeographies: string | null;
  approvedForTraining: boolean; // Must be manually set true before export
}

const CORPUS_KEY = "brief:corpus";           // Redis hash — field = briefHash, value = JSON
const CORPUS_INDEX_KEY = "brief:corpus:idx"; // Redis list of hashes in insertion order
const MAX_CORPUS = 5000;

/**
 * Normalize a brief for consistent hashing.
 * Two briefs that differ only in whitespace/casing hash identically.
 */
export function normalizeBrief(brief: string): string {
  return brief
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s.,!?;:()\-'"/]/g, "")
    .trim();
}

/**
 * SHA-256 hash of the normalized brief.
 * Returns a 16-char hex prefix (collision-safe for this scale).
 */
export async function hashBrief(brief: string): Promise<string> {
  const normalized = normalizeBrief(brief);
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 16);
}

/**
 * Record a brief evaluation in the corpus.
 * Fire-and-forget — never throws.
 */
export async function recordBriefCorpus(params: {
  brief: string;
  verdictPath: string;
  score: number | null;
  offeringDescription?: string | null;
  targetGeographies?: string | null;
}): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;

    const hash = await hashBrief(params.brief);
    const now = new Date().toISOString();
    const existing = await redis.hget(CORPUS_KEY, hash) as string | null;

    if (existing) {
      // Update existing entry
      const entry: CorpusEntry = typeof existing === "string" ? JSON.parse(existing) : existing;
      entry.runCount += 1;
      entry.lastSeenAt = now;
      entry.lastVerdictPath = params.verdictPath;
      entry.lastScore = params.score;
      entry.verdictCounts[params.verdictPath] = (entry.verdictCounts[params.verdictPath] ?? 0) + 1;
      if (params.offeringDescription) entry.offeringDescription = params.offeringDescription;
      if (params.targetGeographies) entry.targetGeographies = params.targetGeographies;
      await redis.hset(CORPUS_KEY, { [hash]: JSON.stringify(entry) });
    } else {
      // New brief — add to corpus
      const entry: CorpusEntry = {
        hash,
        briefText: params.brief.slice(0, 10000),
        briefSnippet: params.brief.slice(0, 200).replace(/\s+/g, " ").trim(),
        firstSeenAt: now,
        lastSeenAt: now,
        runCount: 1,
        verdictCounts: { [params.verdictPath]: 1 },
        lastVerdictPath: params.verdictPath,
        lastScore: params.score,
        offeringDescription: params.offeringDescription ?? null,
        targetGeographies: params.targetGeographies ?? null,
        approvedForTraining: false,
      };
      await redis
        .multi()
        .hset(CORPUS_KEY, { [hash]: JSON.stringify(entry) })
        .lpush(CORPUS_INDEX_KEY, hash)
        .ltrim(CORPUS_INDEX_KEY, 0, MAX_CORPUS - 1)
        .exec();
    }
  } catch {
    // Never crash the caller
  }
}

/**
 * Fetch corpus entries — newest first.
 */
export async function getCorpusEntries(opts: {
  limit?: number;
  offset?: number;
  verdictFilter?: string;
}): Promise<{ entries: CorpusEntry[]; total: number }> {
  const redis = await getRedis();
  if (!redis) return { entries: [], total: 0 };

  try {
    const allHashes = await redis.lrange(CORPUS_INDEX_KEY, 0, -1) as string[];
    if (!allHashes || allHashes.length === 0) return { entries: [], total: 0 };

    // Fetch all entries
    const raw = await Promise.all(
      allHashes.map((h) => redis.hget(CORPUS_KEY, h) as Promise<string | null>)
    );
    let entries: CorpusEntry[] = raw
      .map((r) => {
        try { return typeof r === "string" ? JSON.parse(r) : r; } catch { return null; }
      })
      .filter((e): e is CorpusEntry => e !== null);

    if (opts.verdictFilter) {
      entries = entries.filter((e) => e.lastVerdictPath === opts.verdictFilter);
    }

    const total = entries.length;
    const limit = opts.limit ?? 50;
    const offset = opts.offset ?? 0;

    return { entries: entries.slice(offset, offset + limit), total };
  } catch {
    return { entries: [], total: 0 };
  }
}

/**
 * Export corpus as JSONL for fine-tuning.
 * Only includes entries where approvedForTraining === true.
 * Format: one JSON object per line, compatible with Anthropic + OpenAI fine-tune APIs.
 */
export async function exportCorpusJSONL(opts: {
  verdictFilter?: string;
  format?: "anthropic" | "openai";
}): Promise<string> {
  const redis = await getRedis();
  if (!redis) return "";

  const { entries } = await getCorpusEntries({ limit: MAX_CORPUS, verdictFilter: opts.verdictFilter });
  const approved = entries.filter((e) => e.approvedForTraining);

  const lines = approved.map((e) => {
    if (opts.format === "openai") {
      return JSON.stringify({
        messages: [
          { role: "system", content: "You write complete product naming briefs for eBay's internal governance process." },
          { role: "user", content: `Write a naming brief for: ${e.offeringDescription ?? e.briefSnippet}` },
          { role: "assistant", content: e.briefText },
        ],
      });
    }
    // Anthropic format (default)
    return JSON.stringify({
      prompt: `Write a complete product naming brief for: ${e.offeringDescription ?? e.briefSnippet}`,
      completion: e.briefText,
      metadata: {
        verdictPath: e.lastVerdictPath,
        score: e.lastScore,
        markets: e.targetGeographies,
      },
    });
  });

  return lines.join("\n");
}
