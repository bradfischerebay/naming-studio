import { z } from "zod";

/**
 * Scoring Models
 */

export const ScoringBreakdownSchema = z.object({
  standalone: z.number().min(0).max(25),
  longevity: z.number().min(0).max(15),
  legal: z.number().min(0).max(10),
  global: z.number().min(0).max(10),
  clarity: z.number().min(0).max(10),
  portfolio_risk: z.number().min(-20).max(0),
  trademark_risk: z.number().min(-20).max(0),
});

export type ScoringBreakdown = z.infer<typeof ScoringBreakdownSchema>;

export const ScoringResultSchema = z.object({
  math_scratchpad: z.array(z.string()),
  scores: z.object({
    total: z.number(),
    breakdown: ScoringBreakdownSchema,
  }),
  markdown_table: z.string(),
});

export type ScoringResult = z.infer<typeof ScoringResultSchema>;

/**
 * Scoring constants
 */
export const SCORING_THRESHOLDS = {
  PASS_THRESHOLD: 60,
  MAX_SCORE: 70,
} as const;

/**
 * Calculate total score from breakdown
 */
export function calculateTotal(breakdown: ScoringBreakdown): number {
  return (
    breakdown.standalone +
    breakdown.longevity +
    breakdown.legal +
    breakdown.global +
    breakdown.clarity +
    breakdown.portfolio_risk +
    breakdown.trademark_risk
  );
}

/**
 * Check if score passes threshold
 */
export function passesThreshold(score: number): boolean {
  return score >= SCORING_THRESHOLDS.PASS_THRESHOLD;
}

/**
 * Generate markdown table from scoring result
 */
export function generateMarkdownTable(result: ScoringResult): string {
  const { breakdown } = result.scores;

  const rows = [
    `| Standalone purchase behavior | ${breakdown.standalone} | ${getEvidence('standalone', breakdown.standalone)} |`,
    `| Longevity | ${breakdown.longevity} | ${getEvidence('longevity', breakdown.longevity)} |`,
    `| Legal Req | ${breakdown.legal} | ${getEvidence('legal', breakdown.legal)} |`,
    `| Global Viability | ${breakdown.global} | ${getEvidence('global', breakdown.global)} |`,
    `| Clarity Lift | ${breakdown.clarity} | ${getEvidence('clarity', breakdown.clarity)} |`,
    `| Portfolio Risk | ${breakdown.portfolio_risk} | ${getEvidence('portfolio_risk', breakdown.portfolio_risk)} |`,
    `| Trademark Risk | ${breakdown.trademark_risk} | ${getEvidence('trademark_risk', breakdown.trademark_risk)} |`,
    `| **TOTAL** | **${result.scores.total}** | **Decision rule: >= 60 -> Name** |`,
  ];

  return `| Factor | Points | Evidence |\n| :--- | :---: | :--- |\n${rows.join('\n')}`;
}

function getEvidence(factor: string, points: number): string {
  if (points === 0) return "Not applicable";

  const evidenceMap: Record<string, string> = {
    standalone: "Separate enrollment or distinct checkout identified",
    longevity: "Planned duration >= 12 months",
    legal: "Legal/Regulatory compliance mandate identified",
    global: "International scale identified",
    clarity: "Strategic need for differentiation",
    portfolio_risk: "Risk tag found: portfolio_risk",
    trademark_risk: "Risk tag found: trademark_risk",
  };

  return evidenceMap[factor] || "Identified";
}
