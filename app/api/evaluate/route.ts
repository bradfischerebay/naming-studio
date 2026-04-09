/**
 * Legacy evaluation route — superseded by /api/evaluate-v2
 * Returns 410 Gone to redirect callers to the current endpoint.
 */

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "This endpoint has been removed. Use /api/evaluate-v2." },
    { status: 410 }
  );
}

export async function GET() {
  return NextResponse.json(
    { error: "This endpoint has been removed. Use /api/evaluate-v2." },
    { status: 410 }
  );
}
