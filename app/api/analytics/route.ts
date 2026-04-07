/**
 * Analytics API
 * GET-only endpoint for retrieving analytics summary
 */

import { NextResponse } from "next/server";
import { analytics } from "@/lib/analytics";

export const runtime = "nodejs";

export async function GET() {
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
