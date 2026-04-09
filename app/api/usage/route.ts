import { NextRequest, NextResponse } from "next/server";
import { usageLog } from "@/lib/usage-log";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const { searchParams } = req.nextUrl;
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "100", 10), 500);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const typeFilter = searchParams.get("type"); // comma-separated event types

  try {
    const [events, total] = await Promise.all([
      usageLog.getRecent(limit, offset),
      usageLog.getTotal(),
    ]);

    const filtered = typeFilter
      ? events.filter((e) => typeFilter.split(",").includes(e.type))
      : events;

    return NextResponse.json({ success: true, events: filtered, total, limit, offset });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to load usage log" },
      { status: 500 }
    );
  }
}
