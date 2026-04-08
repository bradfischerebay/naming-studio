import { NextRequest, NextResponse } from "next/server";
import { createNamingTicket, type JiraNamingTicketParams } from "@/lib/jira";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    if (!process.env.JIRAP_API_TOKEN) {
      return NextResponse.json(
        { error: "Jira integration not configured — set JIRAP_API_TOKEN" },
        { status: 503 }
      );
    }
    if (!process.env.JIRAP_PROJECT_KEY) {
      return NextResponse.json(
        { error: "Jira project not configured — set JIRAP_PROJECT_KEY" },
        { status: 503 }
      );
    }

    const body = (await request.json()) as Partial<JiraNamingTicketParams>;

    if (!body.verdictTitle || !body.briefSnippet) {
      return NextResponse.json(
        { error: "verdictTitle and briefSnippet are required" },
        { status: 400 }
      );
    }

    const ticket = await createNamingTicket(body as JiraNamingTicketParams);

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Jira] Create ticket failed:", msg);

    let clientMsg = "Failed to create Jira ticket";
    let status = 500;

    if (msg.includes("401") || msg.includes("403")) {
      clientMsg = "Jira authentication failed — check your PAT token";
    } else if (msg.includes("404")) {
      clientMsg = "Jira project not found — check JIRAP_PROJECT_KEY";
    } else if (msg.includes("ECONNREFUSED") || msg.includes("ETIMEDOUT") || msg.includes("fetch")) {
      clientMsg = "Cannot reach JiraP — make sure you're on the eBay VPN";
      status = 503;
    }

    return NextResponse.json({ error: clientMsg }, { status });
  }
}
