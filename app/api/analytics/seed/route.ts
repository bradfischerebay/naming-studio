/**
 * Analytics Seed Route
 * POST /api/analytics/seed — inserts realistic dummy evaluation events for dev/demo
 * Only works when Upstash Redis is configured.
 */

import { NextResponse } from "next/server";
import { analytics } from "@/lib/analytics";
import type { AnalyticsEvent } from "@/lib/analytics";
import { VerdictPath } from "@/lib/models/verdict";

function daysAgo(d: number, h = 0): string {
  const ts = new Date();
  ts.setDate(ts.getDate() - d);
  ts.setHours(ts.getHours() - h);
  return ts.toISOString();
}

const GPT = "azure-chat-completions-gpt-5-2-2025-12-11-sandbox";
const CLAUDE = "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox";
const GEMINI = "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox";

const DUMMY_EVENTS: AnalyticsEvent[] = [
  // PATH_C — Proceed with naming (full pass)
  {
    timestamp: daysAgo(0, 1),
    sessionId: "seed-001",
    model: GPT,
    verdictPath: VerdictPath.PATH_C,
    gateResults: { pass: 6, fail: 0, unknown: 0 },
    scoringTotal: 65,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 8450,
    briefLength: 512,
    error: null,
    briefText: "eBay is launching Seller Protection Suite — a standalone guarantee product that sellers explicitly enroll in. Covers up to $10,000 per incident. Separate dashboard, dedicated legal framework, permanent offering launching Q2 2026 in US, UK, and DE.",
    briefSummary: "Seller Protection Suite — standalone guarantee product for enrolled sellers.",
    targetGeographies: "US, UK, DE",
    targetCustomers: "High-volume professional sellers",
    timing: "Q2 2026, permanent",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Sellers explicitly enroll and see the product name on their dashboard." },
      G1: { status: "Pass", label: "Integration Level", reasoning: "Separate enrollment flow distinct from main seller hub." },
      G2: { status: "Pass", label: "Standalone Architecture", reasoning: "Dedicated microservice with its own data model." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent offering with no sunset date." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No collision with existing eBay products." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "Legal team has pre-cleared trademark in all 3 markets." },
    },
    verdictTitle: "✅ Proceed With Naming",
    verdictSummary: "All 6 gates passed. Score: 65/70. Strong candidate for a proper product name.",
    scoringBreakdown: { standalone: 25, longevity: 15, legal: 10, global: 10, clarity: 10, portfolio_risk: 0, trademark_risk: 0 },
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_A1 — No Proper Name (gate failure)
  {
    timestamp: daysAgo(0, 3),
    sessionId: "seed-002",
    model: GPT,
    verdictPath: VerdictPath.PATH_A1,
    gateResults: { pass: 3, fail: 3, unknown: 0 },
    scoringTotal: null,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 7200,
    briefLength: 340,
    error: null,
    briefText: "Adding gift-wrapping toggle in checkout. Buyers tap a checkbox during checkout — seller opts in to offer it. Launching holiday season 2026 only (Oct–Jan). US only.",
    briefSummary: "Gift wrapping checkout toggle — seasonal, embedded in checkout flow.",
    targetGeographies: "US",
    targetCustomers: "Holiday shoppers and gift-focused buyers",
    timing: "Holiday 2026, 3-month campaign",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Buyer sees and interacts with the option." },
      G1: { status: "Fail", label: "Integration Level", reasoning: "Embedded directly inside the checkout flow — not separate enrollment." },
      G2: { status: "Fail", label: "Standalone Architecture", reasoning: "No distinct service boundary; reuses checkout microservice." },
      G3: { status: "Fail", label: "Strategic Lifespan", reasoning: "3-month seasonal campaign, not a permanent product." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No naming conflicts detected." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "No trademark issues for a generic feature label." },
    },
    verdictTitle: "⚠️ No Proper Name — Use Descriptive Label",
    verdictSummary: "Failed G1 (embedded in checkout), G2 (shared infra), G3 (seasonal). Use inline copy like 'Add gift wrapping' instead.",
    scoringBreakdown: null,
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_B — Needs more info, then resolved via retry → PATH_C
  {
    timestamp: daysAgo(1, 0),
    sessionId: "seed-003",
    model: CLAUDE,
    verdictPath: VerdictPath.PATH_B,
    gateResults: { pass: 4, fail: 0, unknown: 2 },
    scoringTotal: null,
    requiresClarification: true,
    isClarificationRetry: false,
    durationMs: 11800,
    briefLength: 290,
    error: null,
    briefText: "AI-powered listing description generator for sellers. Users can toggle it on/off in seller hub. US-only initially, global rollout Q1 2027.",
    briefSummary: "AI listing description generator — seller-toggled, US first then global.",
    targetGeographies: "US, then global",
    targetCustomers: "Active sellers",
    timing: "US launch Q3 2026, global Q1 2027",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Seller explicitly enables/disables via toggle." },
      G1: { status: "Unknown", label: "Integration Level", reasoning: "Brief is unclear whether this has separate enrollment or is just a settings toggle." },
      G2: { status: "Unknown", label: "Standalone Architecture", reasoning: "Need to know if this runs as an independent microservice or is part of listing infra." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent offering implied by global rollout." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No conflicts found." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "No trademark issues detected." },
    },
    verdictTitle: "⏸️ Additional Information Needed",
    verdictSummary: "Gates G1 and G2 require clarification before a verdict can be given.",
    scoringBreakdown: null,
    questionCount: 2,
    retryCount: 0,
  },

  // PATH_C retry (successful resolution of seed-003)
  {
    timestamp: daysAgo(1, 0),
    sessionId: "seed-003",
    model: CLAUDE,
    verdictPath: VerdictPath.PATH_C,
    gateResults: { pass: 6, fail: 0, unknown: 0 },
    scoringTotal: 60,
    requiresClarification: false,
    isClarificationRetry: true,
    durationMs: 9100,
    briefLength: 290,
    error: null,
    briefText: "AI-powered listing description generator for sellers. Users can toggle it on/off in seller hub. US-only initially, global rollout Q1 2027.",
    briefSummary: "AI listing description generator — clarified as standalone service with separate enrollment.",
    targetGeographies: "US, then global",
    targetCustomers: "Active sellers",
    timing: "US launch Q3 2026, global Q1 2027",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Seller explicitly enables/disables." },
      G1: { status: "Pass", label: "Integration Level", reasoning: "User confirmed: separate opt-in page distinct from listing flow." },
      G2: { status: "Pass", label: "Standalone Architecture", reasoning: "User confirmed: dedicated AI microservice with its own data pipeline." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent with global rollout confirmed." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No conflicts." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "No trademark issues." },
    },
    verdictTitle: "✅ Proceed With Naming",
    verdictSummary: "All gates now pass after clarification. Score 60/70 — meets threshold.",
    scoringBreakdown: { standalone: 25, longevity: 15, legal: 0, global: 10, clarity: 10, portfolio_risk: 0, trademark_risk: 0 },
    questionCount: 0,
    retryCount: 1,
  },

  // PATH_A0 — Do Not Name
  {
    timestamp: daysAgo(1, 5),
    sessionId: "seed-004",
    model: GPT,
    verdictPath: VerdictPath.PATH_A0,
    gateResults: { pass: 0, fail: 1, unknown: 5 },
    scoringTotal: null,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 6800,
    briefLength: 220,
    error: null,
    briefText: "Background fraud detection model that silently scores each transaction. No user interaction — runs automatically on every checkout. Permanent infrastructure.",
    briefSummary: "Background fraud scoring — invisible, automatic, no user-facing interaction.",
    targetGeographies: "Global",
    targetCustomers: "Internal risk teams",
    timing: "Ongoing, permanent",
    gateResultsFull: {
      G0: { status: "Fail", label: "Interaction Model", reasoning: "Completely invisible to users — runs silently in the background. No user selection or visibility." },
      G1: { status: "Unknown", label: "Integration Level", reasoning: "Not evaluated — G0 failure triggers PATH_A0 immediately." },
      G2: { status: "Unknown", label: "Standalone Architecture", reasoning: "Not evaluated." },
      G3: { status: "Unknown", label: "Strategic Lifespan", reasoning: "Not evaluated." },
      G4: { status: "Unknown", label: "Portfolio Alignment", reasoning: "Not evaluated." },
      G5: { status: "Unknown", label: "Legal & Localization", reasoning: "Not evaluated." },
    },
    verdictTitle: "🚫 Do Not Name — Use Inline Copy",
    verdictSummary: "G0 failed: users never see or interact with this feature. Use inline technical description only.",
    scoringBreakdown: null,
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_A2 — Passes gates but low score
  {
    timestamp: daysAgo(2, 0),
    sessionId: "seed-005",
    model: GEMINI,
    verdictPath: VerdictPath.PATH_A2,
    gateResults: { pass: 6, fail: 0, unknown: 0 },
    scoringTotal: 40,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 9100,
    briefLength: 380,
    error: null,
    briefText: "Carrier Network — the internal carrier routing system that selects the best shipping carrier per shipment. Sellers see it referenced in shipping label details. US only, permanent.",
    briefSummary: "Carrier Network — internal carrier routing, seller-visible in shipping details.",
    targetGeographies: "US",
    targetCustomers: "High-volume sellers",
    timing: "Permanent, US only",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Sellers see carrier name in label details." },
      G1: { status: "Pass", label: "Integration Level", reasoning: "Separate routing service." },
      G2: { status: "Pass", label: "Standalone Architecture", reasoning: "Distinct routing microservice." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent infrastructure." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No collision found." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "No trademark blocks." },
    },
    verdictTitle: "⚠️ No Proper Name — Score Below Threshold",
    verdictSummary: "All gates passed but score is 40/70 (threshold: 60). US-only limits global points; no separate enrollment lowers standalone score.",
    scoringBreakdown: { standalone: 15, longevity: 15, legal: 0, global: 0, clarity: 10, portfolio_risk: 0, trademark_risk: 0 },
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_C — Another strong pass
  {
    timestamp: daysAgo(2, 8),
    sessionId: "seed-006",
    model: GPT,
    verdictPath: VerdictPath.PATH_C,
    gateResults: { pass: 6, fail: 0, unknown: 0 },
    scoringTotal: 70,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 8600,
    briefLength: 460,
    error: null,
    briefText: "Authentication Vault — standalone credential management product. Sellers and buyers explicitly enroll. Dedicated app, separate data store, trademark pre-cleared in US/UK/DE. Permanent strategic investment launching Q1 2026.",
    briefSummary: "Authentication Vault — dedicated credential manager, enrolled separately, global.",
    targetGeographies: "US, UK, DE",
    targetCustomers: "Sellers and buyers requiring enhanced security",
    timing: "Q1 2026, permanent",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Users actively enroll and access vault dashboard." },
      G1: { status: "Pass", label: "Integration Level", reasoning: "Completely separate enrollment and login." },
      G2: { status: "Pass", label: "Standalone Architecture", reasoning: "Isolated data store and microservice." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent strategic product." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No conflicts." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "Trademark pre-cleared in all target markets." },
    },
    verdictTitle: "✅ Proceed With Naming",
    verdictSummary: "Perfect 70/70. All gates pass. Trademark cleared. Global markets. Strong naming candidate.",
    scoringBreakdown: { standalone: 25, longevity: 15, legal: 10, global: 10, clarity: 10, portfolio_risk: 0, trademark_risk: 0 },
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_A1 — Legal blocker
  {
    timestamp: daysAgo(3, 2),
    sessionId: "seed-007",
    model: GPT,
    verdictPath: VerdictPath.PATH_A1,
    gateResults: { pass: 5, fail: 1, unknown: 0 },
    scoringTotal: null,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 7500,
    briefLength: 310,
    error: null,
    briefText: "ShipNow — express shipping guarantee for buyers. Buyers see it as a badge on listings. Standalone feature, permanent. US/UK. But 'ShipNow' is a registered trademark of DHL in the EU.",
    briefSummary: "ShipNow express shipping badge — trademark conflict with DHL in EU.",
    targetGeographies: "US, UK",
    targetCustomers: "Buyers seeking fast delivery",
    timing: "Q3 2026, permanent",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Buyers see badge on listing." },
      G1: { status: "Pass", label: "Integration Level", reasoning: "Separate service contract." },
      G2: { status: "Pass", label: "Standalone Architecture", reasoning: "Distinct shipping SLA microservice." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent offering." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No internal eBay name collision." },
      G5: { status: "Fail", label: "Legal & Localization", reasoning: "'ShipNow' is registered by DHL in EU — potential expansion blocker." },
    },
    verdictTitle: "⚠️ No Proper Name — Legal Blocker",
    verdictSummary: "G5 failed: trademark conflict with 'ShipNow' (DHL EU). Choose a different name before proceeding.",
    scoringBreakdown: null,
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_C — Gemini model
  {
    timestamp: daysAgo(4, 0),
    sessionId: "seed-008",
    model: GEMINI,
    verdictPath: VerdictPath.PATH_C,
    gateResults: { pass: 6, fail: 0, unknown: 0 },
    scoringTotal: 65,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 7800,
    briefLength: 420,
    error: null,
    briefText: "eBay ShipFast — managed express shipping service. Sellers explicitly opt in and pay a monthly fee. Dedicated seller dashboard. US, UK, AU markets. Permanent product launching Q2 2026.",
    briefSummary: "ShipFast — managed express shipping with explicit seller enrollment, multi-market.",
    targetGeographies: "US, UK, AU",
    targetCustomers: "Professional sellers",
    timing: "Q2 2026, permanent",
    gateResultsFull: {
      G0: { status: "Pass", label: "Interaction Model", reasoning: "Sellers explicitly opt in and manage via dedicated dashboard." },
      G1: { status: "Pass", label: "Integration Level", reasoning: "Separate monthly subscription enrollment." },
      G2: { status: "Pass", label: "Standalone Architecture", reasoning: "Dedicated logistics microservice." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Permanent subscription product." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No conflicts." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "Trademark cleared in all 3 markets." },
    },
    verdictTitle: "✅ Proceed With Naming",
    verdictSummary: "All 6 gates pass. Score 65/70. Multi-market, permanent product. Strong naming candidate.",
    scoringBreakdown: { standalone: 25, longevity: 15, legal: 0, global: 10, clarity: 10, portfolio_risk: 0, trademark_risk: 0 },
    questionCount: 0,
    retryCount: 0,
  },

  // PATH_B — Still needs info after retry
  {
    timestamp: daysAgo(5, 4),
    sessionId: "seed-009",
    model: GPT,
    verdictPath: VerdictPath.PATH_B,
    gateResults: { pass: 3, fail: 0, unknown: 3 },
    scoringTotal: null,
    requiresClarification: true,
    isClarificationRetry: false,
    durationMs: 10200,
    briefLength: 180,
    error: null,
    briefText: "Payment Gateway — new payment processing layer. Handles all checkout payments. Not sure if buyers will see the name anywhere.",
    briefSummary: "Payment Gateway — unclear user visibility and architecture.",
    targetGeographies: "US",
    targetCustomers: "All buyers",
    timing: "Unknown",
    gateResultsFull: {
      G0: { status: "Unknown", label: "Interaction Model", reasoning: "Brief doesn't clarify if buyers ever see the payment gateway name." },
      G1: { status: "Unknown", label: "Integration Level", reasoning: "Architecture not described." },
      G2: { status: "Unknown", label: "Standalone Architecture", reasoning: "Not enough detail on service boundaries." },
      G3: { status: "Pass", label: "Strategic Lifespan", reasoning: "Implied permanent infrastructure." },
      G4: { status: "Pass", label: "Portfolio Alignment", reasoning: "No conflicts found." },
      G5: { status: "Pass", label: "Legal & Localization", reasoning: "Generic term, no trademark issues." },
    },
    verdictTitle: "⏸️ Additional Information Needed",
    verdictSummary: "Cannot determine G0, G1, or G2 from current brief. Please clarify user visibility and architecture.",
    scoringBreakdown: null,
    questionCount: 3,
    retryCount: 0,
  },

  // Error case
  {
    timestamp: daysAgo(6, 1),
    sessionId: "seed-010",
    model: GPT,
    verdictPath: VerdictPath.PATH_B,
    gateResults: { pass: 0, fail: 0, unknown: 6 },
    scoringTotal: null,
    requiresClarification: false,
    isClarificationRetry: false,
    durationMs: 3200,
    briefLength: 45,
    error: "Cannot reach the Chomsky gateway — make sure you're on the eBay VPN.",
    briefText: "Test brief.",
    briefSummary: null,
    targetGeographies: null,
    targetCustomers: null,
    timing: null,
    gateResultsFull: null,
    verdictTitle: "Error",
    verdictSummary: null,
    scoringBreakdown: null,
    questionCount: 0,
    retryCount: 0,
  },
];

export async function POST(request: Request) {
  // Require admin password to prevent unauthorized data seeding
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    const providedKey = request.headers.get("x-admin-key");
    if (providedKey !== adminPassword) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!analytics.isEnabled()) {
    return NextResponse.json({
      success: false,
      error: "Analytics (Upstash Redis) is not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your .env.local.",
    }, { status: 503 });
  }

  let tracked = 0;
  const errors: string[] = [];

  for (const event of DUMMY_EVENTS) {
    try {
      await analytics.track(event);
      tracked++;
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  // Small delay to let fire-and-forget writes flush
  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json({
    success: true,
    message: `Seeded ${tracked} dummy analytics events.`,
    errors: errors.length > 0 ? errors : undefined,
  });
}

export async function GET() {
  return NextResponse.json({
    usage: "POST to this endpoint to seed dummy analytics data.",
    enabled: analytics.isEnabled(),
  });
}
