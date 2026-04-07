/**
 * Gate Agents — Per-Gate LLM Specialists (Lab streaming path only)
 *
 * Input:        gate: string + brief: string + contextHistory: string[]
 * Output:       Streaming GateDecision via async generator (SSE chunks)
 * Side effects: LLM streaming call via lib/chomsky.ts  (requires VPN)
 * Called by:    app/api/lab/evaluate/route.ts  ONLY — NOT used by orchestrator
 * Tested by:    none
 * Note:         This is the Lab page's path. The main evaluate-v2 route uses
 *               lib/orchestrator.ts instead, which calls evaluator.ts directly.
 *               These are parallel, independent evaluation paths.
 */

import { chomsky } from "../chomsky";
import { GATE_DEFINITIONS, SCORING_RULES } from "../config/naming-rules";

// ─── Custom gate override types ───────────────────────────────────────────────

/**
 * Allows Lab users to override gate definitions for experimentation.
 * Only non-null fields are used; null fields fall back to defaults from GATE_DEFINITIONS.
 */
export interface CustomGateDef {
  label?: string;
  description?: string;
  passConditions?: string[];
  failConditions?: string[];
}

export interface CustomScoringRule {
  key: string;
  label: string;
  maxPoints: number;
  criteria: string; // what earns these points (shown to the LLM)
}

export interface CustomScoringConfig {
  threshold: number;                       // default 60 — pass/fail cutoff
  includeDefaultFactors: boolean;          // if false, skip the standard 5 factors
  factorOverrides: Record<string, number>; // existing factor key → new max points
  additionalFactors: CustomScoringRule[];  // new factors (included only if non-empty)
}

export interface GateDecision {
  status: "Pass" | "Fail" | "Pending";
  reasoning: string;
  evidence?: string;
}

export interface ScorerDecision {
  total: number;
  reasoning: string;
  [key: string]: number | string; // dynamic factor keys (standalone, longevity, custom, etc.)
}

export interface GateAgentEvent {
  gate: string;
  type: "thinking" | "done" | "error";
  content?: string;
  decision?: GateDecision;
  error?: string;
}

export interface ScorerAgentEvent {
  gate: "SCORER";
  type: "thinking" | "done" | "error";
  content?: string;
  decision?: ScorerDecision;
  error?: string;
}

// ─── Prompt sanitization ──────────────────────────────────────────────────────

/**
 * Strip control characters, collapse excessive newlines, and cap length.
 * Applied to all user-controlled text before embedding in LLM prompts.
 */
function sanitizeForPrompt(text: string, maxLength = 2000): string {
  return text
    .replace(/[\x00-\x1F\x7F]/g, " ") // replace control chars with space
    .replace(/ {3,}/g, "  ")           // collapse excessive spaces
    .replace(/\n{3,}/g, "\n\n")        // collapse excessive newlines
    .trim()
    .slice(0, maxLength);
}

// ─── Gate system prompts ──────────────────────────────────────────────────────

function buildGateSystemPrompt(gateKey: string, custom?: CustomGateDef): string {
  const defaults = GATE_DEFINITIONS[gateKey as keyof typeof GATE_DEFINITIONS] ?? {
    label: custom?.label ?? gateKey,
    description: custom?.description ?? "",
    passConditions: custom?.passConditions ?? [],
    failConditions: custom?.failConditions ?? [],
  };
  const label = sanitizeForPrompt(custom?.label ?? defaults.label, 100);
  const description = sanitizeForPrompt(custom?.description ?? defaults.description, 500);
  const passConditions = (custom?.passConditions ?? defaults.passConditions).map((c) => sanitizeForPrompt(c, 300));
  const failConditions = (custom?.failConditions ?? defaults.failConditions).map((c) => sanitizeForPrompt(c, 300));

  return `You are a specialist in evaluating naming briefs for eBay's product naming governance framework.

Your ONLY job is to evaluate Gate ${gateKey}: ${label}.

Gate description: ${description}

PASS conditions (any one is sufficient):
${passConditions.map((c) => `- ${c}`).join("\n")}

FAIL conditions (any one triggers a fail):
${failConditions.map((c) => `- ${c}`).join("\n")}

PENDING/Unknown: Use this if there is genuinely insufficient information in the brief to make a Pass/Fail determination.

Think step-by-step about the brief. Reason out loud. Then at the very end of your response, output a JSON block (and ONLY this JSON — no markdown fences) on its own line:
{"status":"Pass","reasoning":"...","evidence":"..."}

The "status" field must be exactly "Pass", "Fail", or "Pending".
The "reasoning" field should be 1-3 sentences explaining the decision.
The "evidence" field (optional) should quote specific text from the brief.`;
}

const DEFAULT_SCORING_FACTORS = [
  { key: "standalone", label: "Standalone purchase behavior", maxPoints: 25, criteria: "Separate enrollment OR vertical services" },
  { key: "longevity", label: "Longevity", maxPoints: 15, criteria: "≥12 months strategic lifespan" },
  { key: "legal", label: "Legal / Regulatory mandate", maxPoints: 10, criteria: "Has formal_legal tag (trademark, contracts)" },
  { key: "global", label: "Global viability", maxPoints: 10, criteria: "global_big3 tag OR (US AND UK/DE markets)" },
  { key: "clarity", label: "Clarity lift", maxPoints: 10, criteria: "clarity_lift tag — complex concept that genuinely benefits from a name" },
];

function buildScorerSystemPrompt(custom?: CustomScoringConfig): string {
  if (custom) {
    // Build custom factor list
    const factors: Array<{ key: string; label: string; maxPoints: number; criteria: string }> = [];

    if (custom.includeDefaultFactors) {
      for (const f of DEFAULT_SCORING_FACTORS) {
        factors.push({ ...f, maxPoints: custom.factorOverrides[f.key] ?? f.maxPoints });
      }
    }

    for (const f of custom.additionalFactors) {
      if (f.label.trim() && f.maxPoints > 0 && f.criteria.trim()) {
        factors.push({
          ...f,
          label: sanitizeForPrompt(f.label, 100),
          criteria: sanitizeForPrompt(f.criteria, 500),
        });
      }
    }

    const maxTotal = factors.reduce((sum, f) => sum + f.maxPoints, 0);
    const threshold = custom.threshold;
    const exampleJson = JSON.stringify(
      Object.assign({}, ...factors.map((f) => ({ [f.key]: 0 })), { total: 0, reasoning: "..." })
    );

    return `You are a specialist in calculating naming scores for eBay's product naming governance framework.

All gates have already been evaluated and passed. Your job is to calculate the naming score using ONLY these criteria:

SCORING CRITERIA:
${factors.map((f) => `${f.key} (max ${f.maxPoints} pts): ${f.criteria}`).join("\n")}

Maximum possible total: ${maxTotal} points.
THRESHOLD: ${threshold}+ points = Approved for Naming. Below ${threshold} = Use a Descriptive Label.

Think step-by-step through the brief. Apply each factor carefully. Then at the very end, output ONLY this JSON on its own line (no markdown fences):
${exampleJson}

All number fields must be present. "total" is the sum of all factor scores. "reasoning" is 1-2 sentences.`;
  }

  // Default prompt — uses SCORING_RULES from config
  return `You are a specialist in calculating naming scores for eBay's product naming governance framework.

All gates (G0-G5) have already been evaluated and passed. Your job is to calculate the 5-factor naming score (0-70 points maximum) plus any risk deductions.

SCORING CRITERIA:
${Object.entries(SCORING_RULES)
  .map(([key, rule]) => {
    const r = rule as unknown as { label: string; maxPoints: number; tiers: Array<{ points: number; condition: string }> };
    return `${key} (max ${r.maxPoints}): ${r.tiers.map((t) => `${t.points} pts if ${t.condition}`).join("; ")}`;
  })
  .join("\n")}

THRESHOLD: 60+ points = PATH_C (Approved for Naming). Below 60 = PATH_A2 (Use a Descriptive Label).

Think step-by-step through the brief. Apply each factor carefully. Then at the very end, output ONLY this JSON on its own line (no markdown fences):
{"standalone":25,"longevity":15,"legal":0,"global":10,"clarity":0,"portfolio_risk":0,"trademark_risk":0,"total":50,"reasoning":"..."}

All number fields must be present. portfolio_risk and trademark_risk are 0 or negative (-20). reasoning is 1-2 sentences.`;
}

// ─── Resume prompt fragment for restarted gates ───────────────────────────────

function buildResumeFragment(partialThinking: string, newContext: string): string {
  return `\n\n[CONTEXT INJECTION]: You were previously evaluating this brief and had developed the following reasoning:

---
${partialThinking}
---

The user has now added new context: "${newContext}"

Resume your evaluation, taking this new information into account. Confirm or update your previous reasoning if necessary, then conclude your decision.`;
}

// ─── Streaming helpers ────────────────────────────────────────────────────────

/**
 * Extract the final JSON decision from the accumulated streaming text.
 * Looks for the last occurrence of a {...} object containing "status".
 */
function extractGateDecision(text: string): GateDecision | null {
  // Find all JSON-like objects in the text
  const matches = text.match(/\{[^{}]*"status"\s*:\s*"(?:Pass|Fail|Pending)"[^{}]*\}/g);
  if (!matches) return null;
  const last = matches[matches.length - 1];
  try {
    const cleaned = last.replace(/```json\n?|```\n?/g, "").trim();
    return JSON.parse(cleaned) as GateDecision;
  } catch {
    return null;
  }
}

function extractScorerDecision(text: string): ScorerDecision | null {
  const matches = text.match(/\{[^{}]*"total"\s*:\s*\d+[^{}]*\}/g);
  if (!matches) return null;
  const last = matches[matches.length - 1];
  try {
    const cleaned = last.replace(/```json\n?|```\n?/g, "").trim();
    return JSON.parse(cleaned) as ScorerDecision;
  } catch {
    return null;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Stream a single gate agent's evaluation.
 * Yields text chunks; final chunk contains the JSON decision.
 * Emits GateAgentEvents via the callback.
 */
export async function runGateAgent(
  gateKey: string,
  brief: string,
  contextHistory: string[],
  partialState: { thinking?: string } | undefined,
  emit: (event: GateAgentEvent) => void,
  signal?: AbortSignal,
  customGateDef?: CustomGateDef
): Promise<void> {
  let userContent = `Please evaluate the following naming brief against Gate ${gateKey}:\n\n${brief}`;

  if (contextHistory.length > 0) {
    userContent += `\n\n[USER-PROVIDED CONTEXT]:\n${contextHistory.join("\n\n")}`;
  }

  if (partialState?.thinking && contextHistory.length > 0) {
    userContent += buildResumeFragment(partialState.thinking, contextHistory[contextHistory.length - 1]);
  }

  const messages = [
    { role: "system" as const, content: buildGateSystemPrompt(gateKey, customGateDef) },
    { role: "user" as const, content: userContent },
  ];

  let accumulated = "";

  try {
    for await (const chunk of chomsky.streamText({ messages, maxTokens: 1000, signal })) {
      if (signal?.aborted) return;
      accumulated += chunk;
      emit({ gate: gateKey, type: "thinking", content: chunk });
    }

    const decision = extractGateDecision(accumulated);
    if (decision) {
      emit({ gate: gateKey, type: "done", decision });
    } else {
      // Fallback: treat as Pending if we can't parse — show actionable message, not raw thinking text
      emit({
        gate: gateKey,
        type: "done",
        decision: { status: "Pending", reasoning: "The model did not produce a parseable decision. Try adding more detail to your brief or inject context to clarify." },
      });
    }
  } catch (err) {
    if (signal?.aborted) return;
    emit({
      gate: gateKey,
      type: "error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

/**
 * Stream the scoring agent after all gates pass.
 */
export async function runScorerAgent(
  brief: string,
  contextHistory: string[],
  emit: (event: ScorerAgentEvent) => void,
  signal?: AbortSignal,
  customScoring?: CustomScoringConfig
): Promise<void> {
  let userContent = `Please calculate the naming score for the following brief (all gates passed):\n\n${brief}`;

  if (contextHistory.length > 0) {
    userContent += `\n\n[USER-PROVIDED CONTEXT]:\n${contextHistory.join("\n\n")}`;
  }

  const messages = [
    { role: "system" as const, content: buildScorerSystemPrompt(customScoring) },
    { role: "user" as const, content: userContent },
  ];

  let accumulated = "";

  try {
    for await (const chunk of chomsky.streamText({ messages, maxTokens: 800, signal })) {
      if (signal?.aborted) return;
      accumulated += chunk;
      emit({ gate: "SCORER", type: "thinking", content: chunk });
    }

    const decision = extractScorerDecision(accumulated);
    if (decision) {
      emit({ gate: "SCORER", type: "done", decision });
    } else {
      emit({ gate: "SCORER", type: "error", error: "The model did not produce a parseable score. Try running the evaluation again or injecting additional context." });
    }
  } catch (err) {
    if (signal?.aborted) return;
    emit({ gate: "SCORER", type: "error", error: err instanceof Error ? err.message : String(err) });
  }
}

/**
 * Fast triage: given new context and current gate states,
 * determine which gates need re-evaluation.
 * Uses minimal tokens for fast response.
 */
export async function triageInjection(
  brief: string,
  newContext: string,
  currentGateStates: Record<string, { status?: string; thinking?: string }>
): Promise<string[]> {
  const gatesSummary = Object.entries(currentGateStates)
    .filter(([k]) => k.startsWith("G"))
    .map(([k, v]) => `${k}: ${v.status ?? "in-progress"}`)
    .join(", ");

  const systemPrompt = `You are a triage agent for a naming evaluation system. Output raw JSON only. Do not use markdown formatting or code blocks.`;

  const userPrompt = `A user added context to an ongoing brief evaluation.

Brief: ${brief.slice(0, 500)}
New context added: "${newContext}"
Current gate states: ${gatesSummary}

Which gates (if any) might be affected by this new context and need re-evaluation?
Output ONLY this JSON with no other text: {"requiresUpdate":["G0","G1"]}
If no gates need updating, output: {"requiresUpdate":[]}`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    { role: "user" as const, content: userPrompt },
  ];

  try {
    const raw = await chomsky.generateText({ messages, temperature: 0 });
    const cleaned = raw.replace(/```json\n?|```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed.requiresUpdate) ? parsed.requiresUpdate : [];
  } catch {
    // If triage fails, re-evaluate all gates to be safe
    return ["G0", "G1", "G2", "G3", "G4", "G5"];
  }
}
