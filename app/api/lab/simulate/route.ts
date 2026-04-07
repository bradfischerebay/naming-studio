/**
 * Lab Simulate API
 * Batch-evaluates up to 5 briefs in parallel using the same gate agents as the
 * streaming Lab evaluate route, but returns all results synchronously.
 *
 * POST { briefs: string[], customGates?: Record<string, CustomGateDef>, customScoring?: CustomScoringConfig }
 * → { results: BriefSimResult[] }
 *
 * Briefs run in parallel; within each brief G0 and G1 are sequential, G2-G5 are concurrent.
 * Timeout is 120s (covers ~5 briefs × 6 gates in parallel).
 */

import { NextRequest, NextResponse } from "next/server";
import { runGateAgent, runScorerAgent } from "@/lib/modules/gate-agents";
import type {
  CustomGateDef,
  CustomScoringConfig,
  GateDecision,
  ScorerDecision,
} from "@/lib/modules/gate-agents";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 120;

interface BriefSimResult {
  brief: string;
  verdict: string;
  gateResults: Record<string, { status: string; reasoning: string; evidence?: string }>;
  scorerResult?: { total: number; reasoning: string };
}

async function runBriefSimulation(
  brief: string,
  customGates: Record<string, CustomGateDef>,
  customScoring: CustomScoringConfig | undefined,
  disabledGates: string[]
): Promise<BriefSimResult> {
  const STANDARD_GATES = new Set(["G0", "G1", "G2", "G3", "G4", "G5"]);
  const additionalGateKeys = Object.keys(customGates).filter(
    (k) => !STANDARD_GATES.has(k) && !disabledGates.includes(k)
  );

  const gateDecisions: Record<string, GateDecision> = {};

  const runGate = async (gate: string) => {
    if (disabledGates.includes(gate)) return;
    await runGateAgent(
      gate,
      brief,
      [],
      undefined,
      (event) => {
        if (event.type === "done" && event.decision) {
          gateDecisions[gate] = event.decision;
        } else if (event.type === "error") {
          // Treat gate errors as Pending so they surface correctly in verdict
          gateDecisions[gate] = {
            status: "Pending",
            reasoning: `Evaluation error: ${event.error ?? "unknown error"}`,
          };
        }
      },
      undefined,
      customGates[gate]
    );
  };

  // G0 — sequential blocker
  if (!disabledGates.includes("G0")) {
    await runGate("G0");
    if (gateDecisions["G0"]?.status === "Fail") {
      return {
        brief,
        verdict: "PATH_A0",
        gateResults: Object.fromEntries(
          Object.entries(gateDecisions).map(([k, v]) => [k, { status: v.status, reasoning: v.reasoning, evidence: v.evidence }])
        ),
      };
    }
  }

  // G1 — sequential
  if (!disabledGates.includes("G1")) {
    await runGate("G1");
  }

  // G2-G5 + custom gates — parallel
  const batch = ["G2", "G3", "G4", "G5", ...additionalGateKeys].filter(
    (g) => !disabledGates.includes(g)
  );
  await Promise.allSettled(batch.map(runGate));

  const allGates = [
    ...["G0", "G1", "G2", "G3", "G4", "G5"].filter((g) => !disabledGates.includes(g)),
    ...additionalGateKeys,
  ];

  // Guard: if every gate was disabled, surface as PATH_A1 rather than auto-passing to scoring
  if (allGates.length === 0) {
    return { brief, verdict: "PATH_A1", gateResults: {} };
  }

  const hasFail = allGates.some((g) => gateDecisions[g]?.status === "Fail");
  const hasPending = allGates.some(
    (g) => !gateDecisions[g] || gateDecisions[g].status === "Pending"
  );

  const gateResultsMap = Object.fromEntries(
    Object.entries(gateDecisions).map(([k, v]) => [
      k,
      { status: v.status, reasoning: v.reasoning, evidence: v.evidence },
    ])
  );

  if (hasFail) {
    const verdict =
      gateDecisions["G5"]?.status === "Fail"
        ? "PATH_A1"
        : gateDecisions["G0"]?.status === "Fail"
        ? "PATH_A0"
        : "PATH_A1";
    return { brief, verdict, gateResults: gateResultsMap };
  }

  if (hasPending) {
    return { brief, verdict: "PATH_B", gateResults: gateResultsMap };
  }

  // All passed — run scorer
  // Use an array to avoid TypeScript's mutable-closure narrowing issue
  const scorerResults: ScorerDecision[] = [];
  await runScorerAgent(
    brief,
    [],
    (event) => {
      if (event.type === "done" && event.decision) {
        scorerResults.push(event.decision);
      }
    },
    undefined,
    customScoring
  );

  const scorerDecision = scorerResults[0] ?? null;
  const total = scorerDecision?.total ?? 0;
  const threshold = customScoring?.threshold ?? 60;
  const verdict = total >= threshold ? "PATH_C" : "PATH_A2";

  return {
    brief,
    verdict,
    gateResults: gateResultsMap,
    scorerResult: scorerDecision
      ? { total: scorerDecision.total, reasoning: String(scorerDecision.reasoning) }
      : undefined,
  };
}

export async function POST(req: NextRequest) {
  // Rate limiting: 5 requests per minute (expensive - runs up to 35 LLM calls)
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 5,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  const body = await req.json() as {
    briefs?: unknown[];
    customGates?: Record<string, CustomGateDef>;
    customScoring?: CustomScoringConfig;
    disabledGates?: string[];
  };

  const briefs = (body.briefs ?? [])
    .filter((b): b is string => typeof b === "string" && b.trim().length > 0)
    .slice(0, 5); // max 5

  if (!briefs.length) {
    return Response.json({ error: "At least one non-empty brief is required" }, { status: 400 });
  }

  const customGates = body.customGates ?? {};
  const customScoring = body.customScoring;
  const disabledGates = body.disabledGates ?? [];

  try {
    const results = await Promise.all(
      briefs.map((brief) =>
        runBriefSimulation(brief, customGates, customScoring, disabledGates)
      )
    );
    return Response.json({ results });
  } catch (err) {
    return Response.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    status: "ok",
    description: "Lab Quick Test — batch simulate up to 5 briefs in parallel",
  });
}
