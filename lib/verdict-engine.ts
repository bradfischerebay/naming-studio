import type { GatekeeperResult, ScorerResult } from "./schemas";

/**
 * Step 3: The Verdict Engine (Pure TypeScript Logic)
 *
 * CRITICAL: Do NOT use an LLM for this. Use strict TypeScript logic to evaluate
 * the JSON objects from Steps 1 & 2 and return one of the exact string verdicts.
 */

export function calculateVerdict(
  gatekeeperResult: GatekeeperResult,
  scorerResult?: ScorerResult
): string {
  // Rule 1: If G0 status is "Fail" -> Do Not Name
  if (gatekeeperResult.G0.status === "Fail") {
    return "🚫 Do Not Name - Use Inline Action Copy";
  }

  // Rule 2: If ANY Gate (G0-G5) status is "Pending" or "Unknown" -> Need More Information
  const gates = [
    gatekeeperResult.G0,
    gatekeeperResult.G1,
    gatekeeperResult.G2,
    gatekeeperResult.G3,
    gatekeeperResult.G4,
    gatekeeperResult.G5,
  ];

  const hasPendingOrUnknown = gates.some(
    (gate) => gate.status === "Pending" || gate.status === "Unknown"
  );

  if (hasPendingOrUnknown) {
    return "⚠️ Need More Information - Decision Deferred";
  }

  // Rule 3: If ANY Gate (G1-G5) status is "Fail" -> No Proper Name Needed
  const g1ToG5Failed = [
    gatekeeperResult.G1,
    gatekeeperResult.G2,
    gatekeeperResult.G3,
    gatekeeperResult.G4,
    gatekeeperResult.G5,
  ].some((gate) => gate.status === "Fail");

  if (g1ToG5Failed) {
    return "❌ No Proper Name Needed - Use A Descriptive Label";
  }

  // Rule 4: If ALL Gates are "Pass", sum the Step 2 Scorer points
  // All gates must be "Pass" to reach here
  if (!scorerResult) {
    throw new Error("Scorer result required when all gates pass");
  }

  const totalScore =
    scorerResult.standalone +
    scorerResult.longevity +
    scorerResult.legal +
    scorerResult.global +
    scorerResult.clarity;

  // If Total Score < 60 -> No Proper Name Needed
  if (totalScore < 60) {
    return `❌ No Proper Name Needed - Use A Descriptive Label (Score: ${totalScore}/70)`;
  }

  // If Total Score >= 60 -> Proceed With Naming
  return `✅ Proceed With Naming - A Proper Name Is Recommended (Score: ${totalScore}/70)`;
}
