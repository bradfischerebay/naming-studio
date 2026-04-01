import { z } from "zod";

// Gate status enum
export const GateStatus = z.enum(["Pass", "Fail", "Pending", "Unknown"]);
export type GateStatus = z.infer<typeof GateStatus>;

// Individual gate schema
export const GateSchema = z.object({
  status: GateStatus,
  reasoning: z.string(),
});

// Step 1: Gatekeeper output schema
export const GatekeeperSchema = z.object({
  G0: GateSchema.describe("Interaction Model: User-visible vs invisible background process"),
  G1: GateSchema.describe("Integration Level: Distinct enrollment/checkout vs embedded in flows"),
  G2: GateSchema.describe("UX & Service Boundary: Distinct user environment vs feature/button"),
  G3: GateSchema.describe("Strategic Lifespan: >12 months permanent vs temporary"),
  G4: GateSchema.describe("Portfolio Alignment: No collisions vs naming conflicts"),
  G5: GateSchema.describe("Legal & Localization: No trademark/regulatory red flags"),
});

export type GatekeeperResult = z.infer<typeof GatekeeperSchema>;

// Step 2: Scorer output schema (only runs if all gates pass)
export const ScorerSchema = z.object({
  standalone: z.number().describe("Standalone quality: 0, 15, or 25 points"),
  longevity: z.number().describe("Longevity: 0 or 15 points"),
  legal: z.number().describe("Legal clarity: 0 or 10 points"),
  global: z.number().describe("Global viability: 0 or 10 points"),
  clarity: z.number().describe("Clarity & distinctiveness: 0 or 10 points"),
  reasoning: z.string().describe("Overall scoring rationale"),
});

export type ScorerResult = z.infer<typeof ScorerSchema>;

// Complete evaluation result
export interface EvaluationResult {
  verdict: string;
  gatekeeperResult: GatekeeperResult;
  scorerResult?: ScorerResult;
  totalScore?: number;
}
