/**
 * Health Check API — GET /api/health
 * Returns 200 if the app is up, 503 if a critical dependency is unavailable.
 * Does not require authentication — safe for uptime monitoring.
 */

import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const checks: Record<string, boolean> = {};

  // Check Chomsky configuration (required for core functionality)
  checks.chomsky_configured = !!(
    process.env.CHOMSKY_ENDPOINT && process.env.CHOMSKY_MODEL
  );

  // Check Redis configuration (optional — graceful degradation)
  checks.redis_configured = !!(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  );

  const healthy = checks.chomsky_configured;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      checks,
    },
    { status: healthy ? 200 : 503 }
  );
}
