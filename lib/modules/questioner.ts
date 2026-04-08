/**
 * Question Generator Module — LLM-powered clarification question generation
 *
 * Input:        GateEvaluation (to find Pending/Unknown gates) + NamingFacts (for context)
 * Output:       string[] — natural language questions, one per unclear gate
 * Side effects: LLM call via lib/chomsky.ts  (requires VPN)
 * Called by:    lib/orchestrator.ts  (QUESTIONS phase — only when verdict is PATH_B)
 * Tested by:    none
 */

import { chomsky } from "../chomsky";
import type { GateEvaluation } from "../models/gates";
import type { NamingFacts } from "../models/facts";
import { getPendingGates } from "../models/gates";
import { isGateAnswered } from "../models/facts";
import { buildGenerateQuestionsPrompt, GENERATE_QUESTIONS_SYSTEM_PROMPT } from "../prompts/generate-questions";

/**
 * Generate clarifying questions for unknown gates.
 * Filters out gates already answered in a previous clarification round.
 * Returns an array of natural language question strings (one per unknown gate).
 */
export async function generateQuestions(
  gateEvaluation: GateEvaluation,
  facts?: NamingFacts,
  model?: string
): Promise<string[]> {
  const allPendingGates = getPendingGates(gateEvaluation);

  // Remove gates that the user already answered — prevents asking the same question twice
  const pendingGates = allPendingGates.filter(
    gate => !facts || !isGateAnswered(facts, gate as keyof NonNullable<NamingFacts["answered_gates"]>)
  );

  if (pendingGates.length === 0) {
    return [];
  }

  const contextJson = JSON.stringify(
    {
      pendingGates, // already filtered to unanswered gates only
      gateEvaluation,
      answeredGates: facts?.answered_gates ?? {},
      evidenceAnchors: facts?.evidence_anchors ?? [],
      extractedFacts: facts?.facts ?? {},
    },
    null,
    2
  );

  const prompt = buildGenerateQuestionsPrompt(contextJson);

  try {
    const response = await chomsky.generateText({
      model,
      messages: [
        { role: "system", content: GENERATE_QUESTIONS_SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    if (
      !response.trim() ||
      response.trim() === "No additional information needed."
    ) {
      return [];
    }

    // Split on blank lines — each paragraph is one question
    const questions = response
      .split(/\n\n+/)
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    return questions;
  } catch {
    // Fallback to simple plain-language questions (uses filtered pendingGates — no duplicates)
    return getFallbackQuestions(pendingGates);
  }
}

/**
 * Plain language fallback questions when LLM fails
 */
function getFallbackQuestions(pendingGates: string[]): string[] {
  const map: Record<string, string> = {
    G0: "Before I can make a recommendation, I need to understand how users actually encounter this feature. Does a user actively choose to enable or configure it, or does it work automatically in the background without them knowing? The answer determines whether naming it would add value or just add noise.",

    G1: "I need to clarify how users access this. Is there a dedicated sign-up or enrollment step that's separate from the standard eBay flow, or does it appear as part of an existing experience? A standalone enrollment path typically means a name would help users find and identify the offering.",

    G2: "Can you tell me more about the system architecture? Specifically, does this run as its own service with distinct backend infrastructure, or does it share the core platform's systems? Features with separate service boundaries tend to benefit more from a distinct name.",

    G3: "What's the planned lifespan for this? Is it intended as a permanent part of the platform — something you'd expect to still be running in two or three years — or is it tied to a specific campaign, season, or short-term initiative? Naming only makes sense for things that will be around long enough to build recognition.",

    G4: "I want to make sure there are no naming conflicts before we go further. Are there any existing eBay products, programs, or features that share a similar name or concept to what you're building? Even partial overlaps can create confusion for customers and internal teams.",

    G5: "Has legal had a chance to review this for trademark availability in your target markets? If there are existing marks that conflict, or if certain markets require specific regulatory terminology that can't be replaced by a brand name, that would affect what kind of name is actually usable.",
  };

  return pendingGates
    .map((gate) => map[gate])
    .filter((q): q is string => !!q);
}
