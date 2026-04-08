/**
 * Jira integration for Naming Studio
 * Creates naming decision tickets in JiraP (eBay internal Jira)
 *
 * Auth: PAT Bearer token (JIRAP_API_TOKEN env var)
 * Base URL: https://jirap.corp.ebay.com/rest/api/2
 * Project: JIRAP_PROJECT_KEY env var
 */

export interface JiraNamingTicketParams {
  verdictTitle: string;
  verdictPath: string;
  verdictSummary?: string[];
  score?: number | null;
  briefSnippet: string;
  offeringDescription?: string | null;
  gateResults?: Record<string, { status: string; reasoning?: string; rationale?: string }>;
  scoringBreakdown?: Record<string, number>;
}

export interface JiraTicketResult {
  key: string;
  id: string;
  url: string;
}

const JIRAP_BASE = "https://jirap.corp.ebay.com/rest/api/2";
const JIRAP_BROWSE = "https://jirap.corp.ebay.com/browse";

function buildJiraDescription(params: JiraNamingTicketParams): string {
  const lines: string[] = [];

  // Verdict
  lines.push(`h2. ${params.verdictTitle}`);
  lines.push("");

  if (params.verdictSummary && params.verdictSummary.filter(Boolean).length > 0) {
    lines.push("*Key points:*");
    for (const point of params.verdictSummary.filter(Boolean)) {
      lines.push(`* ${point}`);
    }
    lines.push("");
  }

  // Brief excerpt
  lines.push("h3. Brief Excerpt");
  lines.push("{quote}");
  lines.push(params.briefSnippet.slice(0, 500).replace(/\n{3,}/g, "\n\n").trim());
  lines.push("{quote}");
  lines.push("");

  // Gate results table
  if (params.gateResults && Object.keys(params.gateResults).length > 0) {
    lines.push("h3. Gate Evaluation");
    lines.push("||Gate||Status||Reasoning||");
    for (const [key, gate] of Object.entries(params.gateResults)) {
      const status = gate.status;
      const statusCell =
        status === "Pass"
          ? "{color:#00875A}✅ Pass{color}"
          : status === "Fail"
          ? "{color:#DE350B}❌ Fail{color}"
          : `{color:#505F79}⚠ ${status}{color}`;
      const reasoning = (gate.reasoning ?? gate.rationale ?? "").slice(0, 200);
      lines.push(`|${key}|${statusCell}|${reasoning}|`);
    }
    lines.push("");
  }

  // Score breakdown
  if (params.scoringBreakdown && Object.keys(params.scoringBreakdown).length > 0) {
    lines.push("h3. Scoring Breakdown");
    if (params.score != null) {
      lines.push(`*Total Score:* ${params.score} / 70`);
      lines.push("");
    }
    lines.push("||Factor||Points||");
    for (const [key, pts] of Object.entries(params.scoringBreakdown)) {
      const display = pts >= 0 ? `+${pts}` : `${pts}`;
      lines.push(`|${key}|${display}|`);
    }
    lines.push("");
  }

  lines.push("----");
  lines.push(
    `_Created by [eBay Naming Studio|https://naming-studio.ebay.com] on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}_`
  );

  return lines.join("\n");
}

/**
 * Create a naming decision ticket in JiraP.
 * Requires JIRAP_API_TOKEN and JIRAP_PROJECT_KEY env vars.
 * Must be on eBay VPN.
 */
export async function createNamingTicket(
  params: JiraNamingTicketParams
): Promise<JiraTicketResult> {
  const apiToken = process.env.JIRAP_API_TOKEN;
  const projectKey = process.env.JIRAP_PROJECT_KEY;

  if (!apiToken) {
    throw new Error("JIRAP_API_TOKEN is not configured");
  }
  if (!projectKey) {
    throw new Error("JIRAP_PROJECT_KEY is not configured");
  }

  const offeringPart = params.offeringDescription
    ? ` — ${params.offeringDescription.slice(0, 80)}`
    : ` — ${params.briefSnippet.slice(0, 60)}`;

  const issueSummary = `[Naming] Approved for Naming${offeringPart}`.slice(0, 255);
  const description = buildJiraDescription(params);

  const body = {
    fields: {
      project: { key: projectKey },
      summary: issueSummary,
      description,
      issuetype: { name: "Task" },
      labels: ["naming-studio", "ai-governance", "path-c"],
    },
  };

  const response = await fetch(`${JIRAP_BASE}/issue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiToken}`,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Jira API ${response.status}: ${text.slice(0, 300)}`);
  }

  const data = (await response.json()) as { id: string; key: string };

  return {
    id: data.id,
    key: data.key,
    url: `${JIRAP_BROWSE}/${data.key}`,
  };
}
