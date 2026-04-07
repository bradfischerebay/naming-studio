/**
 * Verdict Decision Module — deterministic path routing (NO LLM)
 *
 * Input:        GateEvaluation + ScoringResult (optional)
 * Output:       VerdictOutput — one of PATH_A0 | PATH_A1 | PATH_A2 | PATH_B | PATH_C
 * Side effects: none — pure TypeScript, no I/O
 * Called by:    lib/orchestrator.ts  (VERDICT phase)
 * Tested by:    tests/verdict.test.ts  (10 tests)
 * Priority:     G5 fail → G0 fail → G1-G4 fail → Pending → score<60 → PATH_C
 */

import type { GateEvaluation, GateResult } from "../models/gates";
import type { ScoringResult } from "../models/scoring";
import { VerdictPath, type VerdictOutput } from "../models/verdict";
import { VERDICT_LOGIC } from "../config/naming-rules";

/**
 * Build a PATH_B verdict for when the brief is too thin to evaluate.
 * Called before the gate pipeline runs.
 */
export function buildNoBriefVerdict(missingFields: string[]): VerdictOutput {
  const criticalFields = ["offering_description", "target_customers", "timing", "target_geographies"];
  const critical = missingFields.filter(f => criticalFields.includes(f));
  const guidance: Record<string, string> = {
    offering_description: "Describe what this product or feature actually does.",
    target_customers: "Who are the buyers, sellers, or users this is built for?",
    timing: "When does this launch, and how long is it expected to run?",
    target_geographies: "Which markets or countries will this be available in?",
  };

  const bulletLines = critical.map(
    f => `- **${f.replace(/_/g, " ")}**: ${guidance[f] ?? "Please provide this information."}`
  );

  return {
    path: VerdictPath.PATH_B,
    title: "⚠️ Need More Information – Please Complete Your Brief",
    summary: [
      "**Before I can make a naming recommendation, I need a more complete Product Naming Brief.**",
      "",
      "A proper naming evaluation requires understanding what the offering does, who it's for, where it launches, and how long it will run. Without these I'd be guessing — and guessing wrong here costs real time.",
      "",
      "**What to fill out before coming back:**",
      ...bulletLines,
      "",
      "Once you have these details, paste your completed brief and I'll walk you through the full evaluation.",
    ],
    audit_table: "| Note | Detail |\n| :--- | :--- |\n| **Evaluation skipped** | Insufficient brief content to run gate evaluation. Please complete the brief and resubmit. |",
    missing_fields: critical.length > 0 ? critical : missingFields.slice(0, 4),
  };
}

/**
 * Calculate final verdict based on gates and scoring
 * This is pure TypeScript logic - no LLM calls
 */
export function calculateVerdict(
  gateEval: GateEvaluation,
  scoringResult?: ScoringResult
): VerdictOutput {
  // PRIORITY 1: Legal/Localization Blocker
  if (gateEval.gate_results.G5.status === "Fail") {
    return buildVerdictOutput(
      VerdictPath.PATH_A1,
      "❌ No Proper Name Needed - Use A Descriptive Label",
      [
        "**This feature should not be named.**",
        "",
        "Here's why: Legal or localization compliance issues create blockers that make a proper name infeasible. When regulatory requirements vary across markets, or when legal mandates dictate specific terminology, trying to create a branded name creates more problems than it solves.",
        "",
        "**What to do instead:** Use a descriptive label that complies with regulatory requirements in each market. This approach gives you the flexibility to adapt the terminology as needed while staying compliant.",
        "",
        `*Example: If DE requires \"Käuferschutz\" by law, but US markets can use \"Purchase Protection,\" a single branded name won't work across both markets.*`,
      ],
      gateEval,
      undefined
    );
  }

  // PRIORITY 2: No Name (Ghost Protocol)
  if (gateEval.gate_results.G0.status === "Fail") {
    return buildVerdictOutput(
      VerdictPath.PATH_A0,
      "🚫 Do Not Name - Use Inline Action Copy",
      [
        "**This feature should not be named.**",
        "",
        "Here's why: Background processes and automatic features work best when they're invisible to users. When something happens automatically (like fraud detection or auto-categorization), giving it a name adds unnecessary cognitive load. Users don't need to remember or understand a feature name if they never explicitly interact with it.",
        "",
        "**What to do instead:** Use inline action copy that describes what's happening in the moment. Focus on verbs (\"We're checking for fraud\") rather than nouns (\"FraudGuard™ is active\").",
        "",
        `*Example: eBay's Best Match algorithm doesn't have a customer-facing name - it's just described as \"Most relevant\" in the sort dropdown. Users understand the action without needing to learn a feature name.*`,
      ],
      gateEval,
      undefined
    );
  }

  // PRIORITY 3: Gate Failures (G1-G4)
  const failedGates = [
    gateEval.gate_results.G1,
    gateEval.gate_results.G2,
    gateEval.gate_results.G3,
    gateEval.gate_results.G4,
  ].filter(gate => gate.status === "Fail");

  if (failedGates.length > 0) {
    const failedLabels = failedGates.map(g => g.label).join(", ");
    const explanations = buildGateFailureExplanations(failedGates);

    return buildVerdictOutput(
      VerdictPath.PATH_A1,
      "❌ No Proper Name Needed - Use A Descriptive Label",
      [
        "**This feature doesn't meet the criteria for a proper name.**",
        "",
        `**Failed criteria:** ${failedLabels}`,
        "",
        ...explanations,
        "",
        "**What to do instead:** Use a descriptive label that clearly communicates the function. Descriptive labels are perfect for integrated features, short-term campaigns, and single-market initiatives - they're easier to localize, simpler to maintain, and don't require trademark protection.",
      ],
      gateEval,
      undefined
    );
  }

  // PRIORITY 4: Missing Information
  const pendingGates = Object.values(gateEval.gate_results).filter(
    gate => gate.status === "Unknown" || gate.status === "Pending"
  );

  if (pendingGates.length > 0) {
    const pendingLabels = pendingGates.map(g => g.label).join(", ");
    const missingFields = pendingGates.map(g => g.label);

    return buildVerdictOutput(
      VerdictPath.PATH_B,
      "⚠️ Need More Information - Decision Deferred",
      [
        "**To give you the best guidance, I need a bit more context.**",
        "",
        `I need to understand: ${pendingLabels}`,
        "",
        "These details help me determine whether this qualifies for a proper name or if a descriptive label would serve you better. The naming framework considers factors like standalone behavior, longevity, and market scope - and I want to make sure I'm evaluating your feature accurately.",
        "",
        "Please answer the questions below, and I'll complete the assessment.",
      ],
      gateEval,
      undefined,
      missingFields
    );
  }

  // All gates must be "Pass" to reach here
  if (!scoringResult) {
    throw new Error("Scorer result required when all gates pass");
  }

  // PRIORITY 5: Score Failure
  if (scoringResult.scores.total < 60) {
    const scoreExplanation = buildScoreFailureExplanation(scoringResult);

    return buildVerdictOutput(
      VerdictPath.PATH_A2,
      `❌ No Proper Name Needed - Use A Descriptive Label (Score: ${scoringResult.scores.total}/70)`,
      [
        "**This feature doesn't quite reach the threshold for a proper name.**",
        "",
        `**Score breakdown:** ${scoringResult.scores.total}/70 points (60 needed to pass)`,
        "",
        scoreExplanation,
        "",
        "**What to do instead:** Use a descriptive label. While this feature has some name-worthy qualities, it falls just below the threshold where a proper name would add more value than complexity. Descriptive labels give you flexibility to evolve the feature without being locked into a branded identity.",
      ],
      gateEval,
      scoringResult
    );
  }

  // PRIORITY 6: Pass
  return buildVerdictOutput(
    VerdictPath.PATH_C,
    `✅ Proceed With Naming - A Proper Name Is Recommended (Score: ${scoringResult.scores.total}/70)`,
    [
      "**Congratulations! This feature qualifies for a proper name.**",
      "",
      `**Score breakdown:** ${scoringResult.scores.total}/70 points (60+ needed)`,
      "",
      "This passes the threshold because it demonstrates the qualities that make naming valuable: standalone behavior, meaningful longevity, and strategic significance. A proper name will help customers understand and remember this feature, differentiate it in the market, and build brand equity over time.",
      "",
      "**Next steps:** Work with the Brand team to develop name candidates. Focus on names that are distinctive, memorable, and legally protectable across your target markets.",
      "",
      `*Example: Features like \"eBay Plus\" earned proper names because they're standalone programs with separate enrollment, multi-market scope, and strategic long-term value.*`,
    ],
    gateEval,
    scoringResult
  );
}

/**
 * Build explanations for gate failures
 */
function buildGateFailureExplanations(failedGates: GateResult[]): string[] {
  const explanations: string[] = [];

  for (const gate of failedGates) {
    let explanation = "";

    // G1: Standalone vs Integrated
    if (gate.label.includes("Standalone") || gate.label.includes("Integration")) {
      explanation = "**Why standalone behavior matters:** Integrated features (toggles, settings, embedded flows) don't need distinct names because they're part of an existing experience. The parent product name already provides context. Think of it like a light switch - you don't name the switch, you describe what it does (\"Turn on kitchen light\").";
    }
    // G2: System Architecture
    else if (gate.label.includes("System") || gate.label.includes("Architecture")) {
      explanation = "**Why system architecture matters:** Features that share underlying infrastructure are extensions of existing products, not new products. If it uses the same backend, database, and services, it's a feature enhancement - and feature enhancements are better served by descriptive labels.";
    }
    // G3: Longevity
    else if (gate.label.includes("Lifespan") || gate.label.includes("Strategic")) {
      explanation = "**Why longevity matters:** Naming is an investment. It requires legal review, trademark searches, localization, and brand governance. Short-term campaigns (under 12 months) don't generate enough return on that investment. Use descriptive campaign language that you can easily sunset when the promotion ends.";
    }
    // G4: Portfolio Risk
    else if (gate.label.includes("Portfolio")) {
      explanation = "**Why portfolio alignment matters:** Name collisions create customer confusion and internal coordination costs. If a similar name already exists in the eBay portfolio, either consolidate under that existing name or choose a clearly distinct path. Similar names for different features fragment brand equity.";
    }

    if (explanation) {
      explanations.push(explanation);
    }
  }

  return explanations;
}

/**
 * Build explanation for score failure
 */
function buildScoreFailureExplanation(scoringResult: ScoringResult): string {
  const { breakdown } = scoringResult.scores;
  const lowScores: string[] = [];

  if (breakdown.standalone < 15) {
    lowScores.push("limited standalone behavior (integrated into existing flows)");
  }
  if (breakdown.longevity < 15) {
    lowScores.push("shorter time horizon (under 12-18 months)");
  }
  if (breakdown.global < 10) {
    lowScores.push("single-market or limited geographic scope");
  }
  if (breakdown.clarity < 10) {
    lowScores.push("no critical clarity gap requiring a distinctive name");
  }

  if (lowScores.length > 0) {
    return `The score reflects ${lowScores.join(", ")}. While these factors don't disqualify the feature, they suggest a descriptive label would be more appropriate than a proper name.`;
  }

  return "The score reflects factors that don't quite reach the threshold for naming investment.";
}

/**
 * Build structured verdict output
 */
function buildVerdictOutput(
  path: VerdictPath,
  title: string,
  summary: string[],
  gateEval: GateEvaluation,
  scoringResult?: ScoringResult,
  missingFields?: string[]
): VerdictOutput {
  const audit_table = generateAuditTable(gateEval);
  const score_table = scoringResult ? scoringResult.markdown_table : undefined;

  return {
    path,
    title,
    summary,
    audit_table,
    score_table,
    missing_fields: missingFields,
  };
}

/**
 * Generate audit table from gate evaluation
 */
function generateAuditTable(gateEval: GateEvaluation): string {
  const gates = gateEval.gate_results;

  // Special case: If G0 fails, only show G0
  if (gates.G0.status === "Fail") {
    return generateTableRow("G0", gates.G0);
  }

  // Standard case: Show all gates
  const rows = Object.entries(gates).map(([key, gate]) =>
    generateTableRow(key, gate)
  );

  const header = "| Gate | Criterion | Result | Evidence & Rationale |\n| :--- | :--- | :--- | :--- |";
  return `${header}\n${rows.join('\n')}`;
}

/**
 * Generate a single table row
 */
function generateTableRow(gateKey: string, gate: GateResult): string {
  const statusEmoji = gate.status === "Pass" ? "✅" : gate.status === "Fail" ? "❌" : "⚠️";
  const resultText = `${statusEmoji} ${gate.status}`;

  return `| **${gateKey}** | ${gate.label} | ${resultText} | **CHECK:** ${gate.reasoning} // **EVIDENCE:** ${gate.evidence || "See reasoning"} |`;
}
