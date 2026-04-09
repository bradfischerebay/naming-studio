/**
 * Analytics API
 * GET-only endpoint for retrieving analytics summary
 */

import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/lib/analytics";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authError = requireAdmin(request);
  if (authError) return authError;
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
