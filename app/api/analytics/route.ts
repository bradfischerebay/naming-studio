/**
 * Analytics API
 * GET-only endpoint for retrieving analytics summary
 */

import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/lib/analytics";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    const providedKey = request.headers.get("x-admin-key");
    if (providedKey !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  try {
    const summary = await analytics.getSummary();

    return NextResponse.json({
      success: true,
      enabled: analytics.isEnabled(),
      data: summary,
    });
  } catch (error) {
    console.error("[Analytics API] Error:", error);

    return NextResponse.json(
      {
        success: false,
        enabled: false,
        error: "Failed to fetch analytics",
      },
      { status: 500 }
    );
  }
}
