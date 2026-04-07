import { z } from "zod";

/**
 * Gate Evaluation Models
 * Extended from existing schemas.ts with additional metadata
 */

export const GateStatus = z.enum(["Pass", "Fail", "Pending", "Unknown"]);
export type GateStatus = z.infer<typeof GateStatus>;

export const GateResultSchema = z.object({
  label: z.string(),
  status: GateStatus,
  reasoning: z.string(),
  evidence: z.string().optional(),
});

export type GateResult = z.infer<typeof GateResultSchema>;

export const GateEvaluationSchema = z.object({
  gate_results: z.object({
    G0: GateResultSchema,
    G1: GateResultSchema,
    G2: GateResultSchema,
    G3: GateResultSchema,
    G4: GateResultSchema,
    G5: GateResultSchema,
  }),
  any_failures: z.boolean(),
  missing_info: z.boolean(),
});

export type GateEvaluation = z.infer<typeof GateEvaluationSchema>;

/**
 * Gate helpers
 */
export function hasAnyFailures(evaluation: GateEvaluation): boolean {
  return Object.values(evaluation.gate_results).some(gate => gate.status === "Fail");
}

export function hasMissingInfo(evaluation: GateEvaluation): boolean {
  return Object.values(evaluation.gate_results).some(
    gate => gate.status === "Pending" || gate.status === "Unknown"
  );
}

export function getFailedGates(evaluation: GateEvaluation): string[] {
  return Object.entries(evaluation.gate_results)
    .filter(([_, gate]) => gate.status === "Fail")
    .map(([key]) => key);
}

export function getPendingGates(evaluation: GateEvaluation): string[] {
  return Object.entries(evaluation.gate_results)
    .filter(([_, gate]) => gate.status === "Pending" || gate.status === "Unknown")
    .map(([key]) => key);
}
