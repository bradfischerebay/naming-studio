/**
 * Lab Presets API
 * Save and retrieve named custom gate/scoring configurations.
 * Uses same Upstash Redis pattern as lib/lab-storage.ts.
 *
 * GET    /api/lab/presets         → { presets: ConfigPreset[] }
 * POST   /api/lab/presets         body: { name, config } → { id: string }
 * DELETE /api/lab/presets?id=xxx  → { success: true }
 */

import { NextRequest } from "next/server";

interface ConfigPreset {
  id: string;
  name: string;
  createdAt: string;
  config: object;
}

const MAX_PRESETS = 20;
const PRESETS_KEY = "lab:presets";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let redis: any | null = null;
let redisEnabled = false;
let redisInitialized = false;

async function getRedis() {
  if (redisInitialized) return redis;
  redisInitialized = true;
  try {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null;
    const { Redis } = await import("@upstash/redis");
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    redisEnabled = true;
  } catch {
    redisEnabled = false;
  }
  return redis;
}

export async function GET() {
  const r = await getRedis();
  if (!r || !redisEnabled) return Response.json({ presets: [] });

  try {
    const jsons: string[] = await r.lrange(PRESETS_KEY, 0, MAX_PRESETS - 1);
    const presets: ConfigPreset[] = jsons
      .map((j: string) => { try { return JSON.parse(j) as ConfigPreset; } catch { return null; } })
      .filter((p: ConfigPreset | null): p is ConfigPreset => p !== null);
    return Response.json({ presets });
  } catch {
    return Response.json({ presets: [] });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; config?: object };
  if (!body.name?.trim() || !body.config) {
    return Response.json({ error: "name and config are required" }, { status: 400 });
  }

  const preset: ConfigPreset = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    createdAt: new Date().toISOString(),
    config: body.config,
  };

  const r = await getRedis();
  if (!r || !redisEnabled) {
    // Return success even without Redis — client uses localStorage as primary
    return Response.json({ id: preset.id, preset });
  }

  try {
    await r.multi()
      .lpush(PRESETS_KEY, JSON.stringify(preset))
      .ltrim(PRESETS_KEY, 0, MAX_PRESETS - 1)
      .exec();
    return Response.json({ id: preset.id, preset });
  } catch (error) {
    console.error("[Presets] Save error:", error);
    return Response.json(
      { error: "Failed to save preset to storage. Please try again." },
      { status: 503 } // Service Unavailable - Redis is down
    );
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  if (!id || !UUID_RE.test(id)) return Response.json({ error: "valid id is required" }, { status: 400 });

  const r = await getRedis();
  if (!r || !redisEnabled) return Response.json({ success: true });

  try {
    const jsons: string[] = await r.lrange(PRESETS_KEY, 0, MAX_PRESETS - 1);
    const remaining = jsons.filter((j: string) => {
      try { return (JSON.parse(j) as ConfigPreset).id !== id; } catch { return true; }
    });

    // Rebuild the list with the item removed
    if (remaining.length < jsons.length) {
      await r.del(PRESETS_KEY);
      if (remaining.length > 0) {
        // lpush adds in reverse order, so reverse to preserve newest-first
        for (const j of [...remaining].reverse()) {
          await r.lpush(PRESETS_KEY, j);
        }
      }
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("[Presets] Delete error:", error);
    return Response.json(
      { error: "Failed to delete preset from storage. Please try again." },
      { status: 503 }
    );
  }
}
