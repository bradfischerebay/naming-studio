/**
 * Scoring Module — deterministic score calculation (NO LLM)
 *
 * Input:        NamingFacts (output of extractor.ts)
 * Output:       ScoringResult — 0–70 point total with per-factor breakdown
 * Side effects: none — pure TypeScript arithmetic, no I/O
 * Called by:    lib/orchestrator.ts  (SCORING phase — only runs when all 6 gates pass)
 * Tested by:    tests/scorer.test.ts  (15 tests)
 */

import type { ScoringResult, ScoringBreakdown } from "../models/scoring";
import type { NamingFacts } from "../models/facts";
import { hasTag } from "../models/facts";
import { SCORING_RULES } from "../config/naming-rules";

/**
 * Calculate naming score from facts
 * This is pure arithmetic - no LLM calls
 */
export function calculateScore(facts: NamingFacts): ScoringResult {
  const breakdown: ScoringBreakdown = {
    standalone: calculateStandalone(facts),
    longevity: calculateLongevity(facts),
    legal: calculateLegal(facts),
    global: calculateGlobal(facts),
    clarity: calculateClarity(facts),
    portfolio_risk: calculatePortfolioRisk(facts),
    trademark_risk: calculateTrademarkRisk(facts),
  };

  const math_scratchpad = generateScratchpad(breakdown);
  const total = calculateTotal(breakdown);
  const markdown_table = generateMarkdownTable(breakdown, total);

  return {
    math_scratchpad,
    scores: {
      total,
      breakdown,
    },
    markdown_table,
  };
}

/**
 * Standalone: +25 points
 * IF separate enrollment OR distinct checkout OR vertical services OR downloadable software
 */
function calculateStandalone(facts: NamingFacts): number {
  const { enrollment_policies, checkout_flow, vertical_services } = facts.facts;

  if (
    enrollment_policies === "separate" ||
    checkout_flow === "distinct" ||
    vertical_services.length > 0 ||
    vertical_services.includes("Downloadable Software")
  ) {
    return 25;
  }

  return 0;
}

/**
 * Longevity: +15 points
 * IF longevity_months >= 12
 */
function calculateLongevity(facts: NamingFacts): number {
  const { longevity_months } = facts.facts;

  if (longevity_months !== null && longevity_months >= 12) {
    return 15;
  }

  return 0;
}

/**
 * Legal: +10 points
 * IF formal_legal tag present
 */
function calculateLegal(facts: NamingFacts): number {
  return hasTag(facts, "formal_legal") ? 10 : 0;
}

/**
 * Global: +10 points
 * IF global_big3 tag present OR (US AND UK/DE markets)
 */
function calculateGlobal(facts: NamingFacts): number {
  const { markets } = facts.facts;

  if (hasTag(facts, "global_big3")) {
    return 10;
  }

  const hasUS = markets.some(m => m.toUpperCase() === "US");
  const hasInternational = markets.some(m => ["UK", "DE", "GB"].includes(m.toUpperCase()));

  if (hasUS && hasInternational) {
    return 10;
  }

  return 0;
}

/**
 * Clarity: +10 points
 * IF clarity_lift tag present
 */
function calculateClarity(facts: NamingFacts): number {
  return hasTag(facts, "clarity_lift") ? 10 : 0;
}

/**
 * Portfolio Risk: -20 points
 * IF portfolio_risk tag present
 */
function calculatePortfolioRisk(facts: NamingFacts): number {
  return hasTag(facts, "portfolio_risk") ? -20 : 0;
}

/**
 * Trademark Risk: -20 points
 * IF trademark_risk tag present
 */
function calculateTrademarkRisk(facts: NamingFacts): number {
  return hasTag(facts, "trademark_risk") ? -20 : 0;
}

/**
 * Calculate total from breakdown
 */
function calculateTotal(breakdown: ScoringBreakdown): number {
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
 * Generate math scratchpad showing step-by-step calculation
 */
function generateScratchpad(breakdown: ScoringBreakdown): string[] {
  const steps: string[] = ["Start: 0"];
  let runningTotal = 0;

  // Step 1: Standalone
  runningTotal += breakdown.standalone;
  steps.push(`Step 1 Standalone: Add ${breakdown.standalone} -> New Total: ${runningTotal}`);

  // Step 2: Longevity
  runningTotal += breakdown.longevity;
  steps.push(`Step 2 Longevity: Add ${breakdown.longevity} -> New Total: ${runningTotal}`);

  // Step 3: Legal
  runningTotal += breakdown.legal;
  steps.push(`Step 3 Legal: Add ${breakdown.legal} -> New Total: ${runningTotal}`);

  // Step 4: Global
  runningTotal += breakdown.global;
  steps.push(`Step 4 Global: Add ${breakdown.global} -> New Total: ${runningTotal}`);

  // Step 5: Clarity
  runningTotal += breakdown.clarity;
  steps.push(`Step 5 Clarity: Add ${breakdown.clarity} -> New Total: ${runningTotal}`);

  // Step 6: Portfolio Risk
  runningTotal += breakdown.portfolio_risk;
  steps.push(`Step 6 Portfolio Risk: Subtract ${Math.abs(breakdown.portfolio_risk)} -> New Total: ${runningTotal}`);

  // Step 7: Trademark Risk
  runningTotal += breakdown.trademark_risk;
  steps.push(`Step 7 Trademark Risk: Subtract ${Math.abs(breakdown.trademark_risk)} -> New Total: ${runningTotal}`);

  return steps;
}

/**
 * Generate markdown table
 */
function generateMarkdownTable(breakdown: ScoringBreakdown, total: number): string {
  const rows = [
    `| Standalone purchase behavior | ${breakdown.standalone} | ${getEvidence('standalone', breakdown.standalone)} |`,
    `| Longevity | ${breakdown.longevity} | ${getEvidence('longevity', breakdown.longevity)} |`,
    `| Legal Req | ${breakdown.legal} | ${getEvidence('legal', breakdown.legal)} |`,
    `| Global Viability | ${breakdown.global} | ${getEvidence('global', breakdown.global)} |`,
    `| Clarity Lift | ${breakdown.clarity} | ${getEvidence('clarity', breakdown.clarity)} |`,
    `| Portfolio Risk | ${breakdown.portfolio_risk} | ${getEvidence('portfolio_risk', breakdown.portfolio_risk)} |`,
    `| Trademark Risk | ${breakdown.trademark_risk} | ${getEvidence('trademark_risk', breakdown.trademark_risk)} |`,
    `| **TOTAL** | **${total}** | **Decision rule: >= 60 -> Name** |`,
  ];

  return `| Factor | Points | Evidence |\n| :--- | :---: | :--- |\n${rows.join('\n')}`;
}

function getEvidence(factor: string, points: number): string {
  if (points === 0 && !factor.includes('risk')) return "Not applicable";
  if (points === 0 && factor.includes('risk')) return "No risk detected";

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
