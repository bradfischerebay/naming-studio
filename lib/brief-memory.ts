/**
 * Brief Memory
 * Stores brief embeddings + verdict metadata in Redis.
 * Used for "similar past decisions" retrieval via cosine similarity.
 */

import { chomsky } from "./chomsky";

export interface BriefMemoryEntry {
  id: string;
  createdAt: string;
  briefSnippet: string; // First 300 chars of brief for display
  offeringDescription: string | null; // From compiledBrief.offering_description
  gateSummary: string | null; // e.g. "G0✓ G1✓ G2✓ G3✗ G4✓ G5✓" or "All gates passed"
  verdictPath: string;  // PATH_A0, PATH_A1, PATH_A2, PATH_B, PATH_C
  verdictTitle: string;
  score: number | null;
  embedding: number[];
}

export interface SimilarBrief {
  id: string;
  createdAt: string;
  briefSnippet: string;
  offeringDescription: string | null;
  gateSummary: string | null;
  verdictPath: string;
  verdictTitle: string;
  score: number | null;
  similarity: number; // 0–1 cosine similarity
}

const REDIS_KEY = "brief-memory:embeddings";
const MAX_ENTRIES = 500;

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

function keywordOverlap(a: string, b: string): number {
  const tokenize = (s: string) =>
    new Set(
      s.toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3) // skip short words
    );
  const setA = tokenize(a);
  const setB = tokenize(b);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  const wordsA = Array.from(setA);
  for (const word of wordsA) {
    if (setB.has(word)) intersection++;
  }
  // Jaccard similarity
  return intersection / (setA.size + setB.size - intersection);
}

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

/**
 * Store a brief evaluation result + its embedding in Redis.
 * Fire-and-forget — never throws.
 */
export async function storeBriefMemory(params: {
  brief: string;
  verdictPath: string;
  verdictTitle: string;
  score: number | null;
  offeringDescription?: string | null;
  gateSummary?: string | null;
}): Promise<void> {
  try {
    const redis = await getRedis();
    if (!redis) return;

    const embedding = await chomsky.embed(params.brief.slice(0, 4000));

    const entry: BriefMemoryEntry = {
      id: `bm_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      briefSnippet: params.brief.slice(0, 300).replace(/\s+/g, " ").trim(),
      offeringDescription: params.offeringDescription ?? null,
      gateSummary: params.gateSummary ?? null,
      verdictPath: params.verdictPath,
      verdictTitle: params.verdictTitle,
      score: params.score,
      embedding,
    };

    await redis
      .multi()
      .lpush(REDIS_KEY, JSON.stringify(entry))
      .ltrim(REDIS_KEY, 0, MAX_ENTRIES - 1)
      .exec();
  } catch {
    // Never crash the caller
  }
}

/**
 * Find the top-N most similar past briefs to the given text.
 */
export async function findSimilarBriefs(
  brief: string,
  topN = 3
): Promise<SimilarBrief[]> {
  const redis = await getRedis();
  if (!redis) return [];

  const [queryEmbedding, raw] = await Promise.all([
    chomsky.embed(brief.slice(0, 4000)),
    redis.lrange(REDIS_KEY, 0, -1) as Promise<string[]>,
  ]);

  if (!raw || raw.length === 0) return [];

  const scored: SimilarBrief[] = [];

  for (const item of raw) {
    try {
      const entry: BriefMemoryEntry = typeof item === "string" ? JSON.parse(item) : item;
      const semantic = cosineSimilarity(queryEmbedding, entry.embedding);
      const keyword = keywordOverlap(brief, entry.briefSnippet);
      // 75% semantic, 25% keyword — matches Audience Platform hybrid search pattern
      const hybrid = 0.75 * semantic + 0.25 * keyword;
      scored.push({
        id: entry.id,
        createdAt: entry.createdAt,
        briefSnippet: entry.briefSnippet,
        offeringDescription: entry.offeringDescription ?? null,
        gateSummary: entry.gateSummary ?? null,
        verdictPath: entry.verdictPath,
        verdictTitle: entry.verdictTitle,
        score: entry.score,
        similarity: Math.round(hybrid * 1000) / 1000,
      });
    } catch {
      // skip malformed entries
    }
  }

  return scored
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
}
