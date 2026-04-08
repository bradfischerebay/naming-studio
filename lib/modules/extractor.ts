/**
 * Fact Extractor Module — LLM-powered semantic fact extraction
 *
 * Input:        CompiledBrief + LandscapeSynthesis (optional)
 * Output:       NamingFacts — structured facts + score_tags used by evaluator and scorer
 * Side effects: LLM call via lib/chomsky.ts  (requires VPN)
 * Called by:    lib/orchestrator.ts  (EXTRACTION phase)
 * Tested by:    none — test via orchestrator integration if needed
 * Note:         NamingFacts is the bridge between LLM and deterministic modules
 */

import { chomsky } from "../chomsky";
import { NamingFactsSchema, type NamingFacts } from "../models/facts";
import type { CompiledBrief } from "../models/brief";
import type { LandscapeSynthesis } from "../models/landscape";
import { buildExtractFactsPrompt } from "../prompts/extract-facts";

/**
 * Extract naming facts from brief and landscape data
 */
export async function extractFacts(
  brief: CompiledBrief,
  landscape?: LandscapeSynthesis,
  model?: string
): Promise<NamingFacts> {
  const briefJson = JSON.stringify(brief, null, 2);
  const landscapeJson = landscape ? JSON.stringify(landscape, null, 2) : undefined;

  const prompt = buildExtractFactsPrompt(briefJson, landscapeJson);

  try {
    const result = await chomsky.generateObject({
      model,
      schema: NamingFactsSchema,
      messages: [
        {
          role: "system",
          content: "You are a fact extractor. Extract naming facts and apply smart heuristics.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3, // Low temperature for consistent extraction
    });

    return result.object;
  } catch (error) {
    throw new Error(
      `Failed to extract facts: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Patch facts with user-provided clarifications
 */
export async function patchFacts(
  originalFacts: NamingFacts,
  userClarification: string,
  model?: string
): Promise<NamingFacts> {
  const patchPrompt = `You are updating naming facts based on user clarification.

ORIGINAL FACTS:
${JSON.stringify(originalFacts, null, 2)}

USER CLARIFICATION:
${userClarification}

CRITICAL INSTRUCTIONS:
1. Interpret the user's clarification using smart heuristics from the extraction rules.
2. Update the relevant fields in the facts object.
3. **MARK GATES AS ANSWERED**: For each piece of information provided, mark the corresponding gate as answered in the answered_gates object.
4. Preserve all other fields exactly as they were.
5. Output the complete updated facts JSON.

SMART INTERPRETATIONS:
- If user says "standalone" or "separate sign-up" -> set enrollment_policies = "separate", mark G1 = true
- If user says "feature" or "toggle" or "integrated" -> set enrollment_policies = "shared", mark G0 = true, G1 = true
- If user mentions "permanent" or ">12 months" -> set appropriate longevity_months, mark G3 = true
- If user mentions specific timing (e.g., "Q2 2026", "6 months") -> calculate longevity_months, mark G3 = true
- If user mentions "global" or multiple countries -> add "global_big3" tag
- If user mentions "legal requirement" or "compliance" -> add "formal_legal" tag
- If user answers about existing products/conflicts -> mark G4 = true (and add "portfolio_risk" tag if conflicts found)
- If user answers about trademark/legal status -> mark G5 = true (and add "trademark_risk" tag if issues found)
- If user mentions "user-facing" or "background process" -> mark G0 = true
- If user mentions architecture details -> mark G2 = true

GATE ANSWER TRACKING (Critical - This Prevents Re-asking):
Update answered_gates for EACH question the user answered:
- G0: User interaction model (user-facing vs background)
- G1: Integration level (standalone vs integrated)
- G2: Architecture (separate vs shared backend)
- G3: Lifespan (timing information)
- G4: Portfolio conflicts (existing product mentions)
- G5: Legal/trademark status

Output the updated facts as JSON (no markdown code blocks).`;

  try {
    const result = await chomsky.generateObject({
      model,
      schema: NamingFactsSchema,
      messages: [
        {
          role: "system",
          content: "You are a fact patcher. Update facts based on user clarification.",
        },
        {
          role: "user",
          content: patchPrompt,
        },
      ],
      temperature: 0.3,
    });

    return result.object;
  } catch (error) {
    throw new Error(
      `Failed to patch facts: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
