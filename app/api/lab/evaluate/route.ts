import { NextRequest } from "next/server";
import { runGateAgent, runScorerAgent } from "@/lib/modules/gate-agents";
import type { GateAgentEvent, ScorerAgentEvent, CustomGateDef, CustomScoringConfig } from "@/lib/modules/gate-agents";

export const maxDuration = 120;

const encoder = new TextEncoder();

function sseEvent(data: object): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify(data)}\n\n`);
}

export async function POST(req: NextRequest) {
  const {
    brief,
    contextHistory = [],
    gateStates = {},
    model,
    customGates = {},
    customScoring,
    disabledGates = [],
    blockerGateKeys = [],
  } = await req.json() as {
    brief: string;
    contextHistory?: string[];
    gateStates?: Record<string, { status?: string; thinking?: string; decision?: object }>;
    model?: string;
    customGates?: Record<string, CustomGateDef>;
    customScoring?: CustomScoringConfig;
    disabledGates?: string[];
    blockerGateKeys?: string[];
  };

  const STANDARD_GATES = new Set(["G0", "G1", "G2", "G3", "G4", "G5"]);
  // Additional custom gates that are NOT standard and NOT designated as blockers
  const additionalGateKeys = Object.keys(customGates).filter(
    (k) => !STANDARD_GATES.has(k) && !blockerGateKeys.includes(k)
  );

  if (!brief?.trim()) {
    return new Response(JSON.stringify({ error: "Brief is required" }), { status: 400 });
  }

  const stream = new TransformStream<Uint8Array, Uint8Array>();
  const writer = stream.writable.getWriter();

  // Run gate evaluation in background
  (async () => {
    try {
      const gateDecisions: Record<string, { status: string }> = {};

      // Restore already-done gate decisions so we don't re-run them
      for (const [gate, state] of Object.entries(gateStates)) {
        if (state.status === "done" && (state as { decision?: { status: string } }).decision) {
          gateDecisions[gate] = (state as { decision: { status: string } }).decision;
        }
      }

      const needsRun = (gate: string) => {
        if (disabledGates.includes(gate)) return false;
        const s = gateStates[gate];
        return !s || s.status !== "done";
      };

      const emitGate = async (event: GateAgentEvent) => {
        // Capture decision synchronously BEFORE the async write — prevents race
        // condition where Promise.allSettled resolves before writer.write() completes
        if (event.type === "done" && event.decision) {
          gateDecisions[event.gate] = event.decision;
        }
        try {
          await writer.write(sseEvent(event));
        } catch {
          // writer may be closed if client disconnected
        }
      };

      const emitScorer = async (event: ScorerAgentEvent) => {
        try {
          await writer.write(sseEvent(event));
        } catch {
          // ignore
        }
      };

      // ── Step 1: G0 alone — blocks everything if it fails ─────────────────
      if (needsRun("G0")) {
        await runGateAgent("G0", brief, contextHistory, gateStates["G0"], emitGate, undefined, customGates["G0"]);
      }

      // If G0 failed, skip all remaining gates
      const g0Decision = gateDecisions["G0"] ?? (gateStates["G0"]?.decision as { status: string } | undefined);
      if (g0Decision?.status === "Fail") {
        const verdictEvent = { type: "verdict", path: "PATH_A0" };
        await writer.write(sseEvent(verdictEvent));
        await writer.write(sseEvent({ type: "complete", model: model ?? process.env.CHOMSKY_MODEL ?? "unknown" }));
        return;
      }

      // ── Step 1.5: Custom "blocker" gates — sequential after G0, before G1 ──
      const validBlockers = blockerGateKeys.filter(needsRun);
      if (validBlockers.length > 0) {
        await Promise.allSettled(
          validBlockers.map((gate) =>
            runGateAgent(gate, brief, contextHistory, gateStates[gate], emitGate, undefined, customGates[gate])
          )
        );
        const anyBlockerFailed = validBlockers.some(
          (gate) =>
            (gateDecisions[gate] ?? (gateStates[gate]?.decision as { status: string } | undefined))
              ?.status === "Fail"
        );
        if (anyBlockerFailed) {
          await writer.write(sseEvent({ type: "verdict", path: "PATH_A1" }));
          await writer.write(sseEvent({ type: "complete", model: model ?? process.env.CHOMSKY_MODEL ?? "unknown" }));
          return;
        }
      }

      // ── Step 2: G1 ───────────────────────────────────────────────────────
      if (needsRun("G1")) {
        await runGateAgent("G1", brief, contextHistory, gateStates["G1"], emitGate, undefined, customGates["G1"]);
      }

      // ── Step 3: G2, G3, G4, G5 + parallel custom gates (max 3 concurrent) ──
      const batch2 = ["G2", "G3", "G4", "G5", ...additionalGateKeys].filter(needsRun);

      // Simple concurrency limiter — run in groups of 3
      for (let i = 0; i < batch2.length; i += 3) {
        const group = batch2.slice(i, i + 3);
        await Promise.allSettled(
          group.map((gate) =>
            runGateAgent(gate, brief, contextHistory, gateStates[gate], emitGate, undefined, customGates[gate])
          )
        );
      }

      // ── Check if all gates passed ─────────────────────────────────────────
      const allGates = [
        ...["G0", "G1", "G2", "G3", "G4", "G5"].filter((g) => !disabledGates.includes(g)),
        ...additionalGateKeys,
        ...blockerGateKeys.filter((k) => !disabledGates.includes(k)),
      ];
      const allDecisions = allGates.map((g) => gateDecisions[g] ?? gateStates[g]?.decision);
      const allPassed = allDecisions.every((d) => d && (d as { status: string }).status === "Pass");

      if (allPassed) {
        // ── Scorer agent ───────────────────────────────────────────────────
        await runScorerAgent(brief, contextHistory, emitScorer, undefined, customScoring);
      } else {
        // Determine verdict path based on gate results
        const verdictEvent = { type: "verdict", path: determineFailPath(gateDecisions) };
        await writer.write(sseEvent(verdictEvent));
      }

      await writer.write(sseEvent({ type: "complete", model: model ?? process.env.CHOMSKY_MODEL ?? "unknown" }));
    } catch (err) {
      try {
        await writer.write(sseEvent({ type: "error", error: String(err) }));
      } catch {
        // ignore
      }
    } finally {
      try {
        await writer.close();
      } catch {
        // ignore
      }
    }
  })();

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

function determineFailPath(decisions: Record<string, { status: string }>): string {
  // Priority order: G5 (legal) → G0 (no interaction) → G1-G4 → Pending
  if (decisions.G5?.status === "Fail") return "PATH_A1";
  if (decisions.G0?.status === "Fail") return "PATH_A0";
  const hasFailure = Object.values(decisions).some((d) => d.status === "Fail");
  if (hasFailure) return "PATH_A1";
  const hasPending = Object.values(decisions).some((d) => d.status === "Pending");
  if (hasPending) return "PATH_B";
  return "PATH_A1";
}

export async function GET() {
  return Response.json({ status: "ok", description: "Lab per-gate streaming evaluation endpoint" });
}
