import { NextRequest, NextResponse } from "next/server";

/**
 * Shared admin authentication check.
 * Returns a 401 NextResponse if the request is not authorized, or null if it passes.
 * When ADMIN_PASSWORD is not set, all requests are allowed (dev/open mode).
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return null;
  const providedKey = request.headers.get("x-admin-key");
  if (providedKey !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
