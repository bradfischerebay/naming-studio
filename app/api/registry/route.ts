import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return NextResponse.json({ entries: [] });
    }
    const { Redis } = await import("@upstash/redis");
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const raw = await redis.lrange("brief-memory:embeddings", 0, -1) as string[];
    const entries = raw
      .map((item: string) => {
        try {
          const parsed = typeof item === "string" ? JSON.parse(item) : item;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { embedding: _embedding, ...rest } = parsed; // strip embedding
          return rest;
        } catch { return null; }
      })
      .filter((e): e is NonNullable<typeof e> => e !== null && e.verdictPath === "PATH_C")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ entries, total: entries.length });
  } catch (error) {
    console.error("[registry]", error);
    return NextResponse.json({ entries: [], total: 0 });
  }
}
