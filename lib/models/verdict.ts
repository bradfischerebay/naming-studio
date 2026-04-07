import { z } from "zod";
import type { GateEvaluation } from "./gates";
import type { ScoringResult } from "./scoring";
import type { CompiledBrief } from "./brief";

/**
 * Verdict Path Models
 */

export enum VerdictPath {
  PATH_A0 = "PATH_A0", // Do Not Name - Use Inline Action Copy
  PATH_A1 = "PATH_A1", // No Proper Name Needed - Use A Descriptive Label (Gate Fail)
  PATH_A2 = "PATH_A2", // No Proper Name Needed - Use A Descriptive Label (Score Fail)
  PATH_B = "PATH_B",   // Need More Information - Decision Deferred
  PATH_C = "PATH_C",   // Proceed With Naming - A Proper Name Is Recommended
}

export const VerdictOutputSchema = z.object({
  path: z.nativeEnum(VerdictPath),
  title: z.string(),
  summary: z.array(z.string()),
  audit_table: z.string(),
  score_table: z.string().optional(),
  missing_fields: z.array(z.string()).optional(),
});

export type VerdictOutput = z.infer<typeof VerdictOutputSchema>;

/**
 * Complete evaluation result
 */
export interface EvaluationResult {
  verdict: VerdictOutput;
  gateEvaluation: GateEvaluation;
  scoringResult?: ScoringResult;
  landscapeData?: unknown;
  factsData?: unknown;
  compiledBrief?: CompiledBrief;
}

/**
 * Spec-compliant machine payload (Step 1 Gate output per step1_naming_studio_spec.md §6.2)
 */
export interface MachinePayload {
  step: "step_1_gate";
  verdict_path: "A0" | "A1" | "A2" | "B" | "C";
  verdict_label: string;
  compiled_brief: CompiledBrief | null;
  naming_facts: unknown;
  gate_results: GateEvaluation;
  scores: ScoringResult["scores"] | null;
  needs_clarification: boolean;
  clarification_questions: string[];
}

/**
 * Verdict helpers
 */
export function getVerdictEmoji(path: VerdictPath): string {
  const emojiMap: Record<VerdictPath, string> = {
    [VerdictPath.PATH_A0]: "🚫",
    [VerdictPath.PATH_A1]: "❌",
    [VerdictPath.PATH_A2]: "❌",
    [VerdictPath.PATH_B]: "⚠️",
    [VerdictPath.PATH_C]: "✅",
  };
  return emojiMap[path];
}

export function isPass(path: VerdictPath): boolean {
  return path === VerdictPath.PATH_C;
}

export function isFail(path: VerdictPath): boolean {
  return [VerdictPath.PATH_A0, VerdictPath.PATH_A1, VerdictPath.PATH_A2].includes(path);
}

export function needsMoreInfo(path: VerdictPath): boolean {
  return path === VerdictPath.PATH_B;
}
