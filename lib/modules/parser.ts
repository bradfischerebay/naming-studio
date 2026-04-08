/**
 * Brief Parser Module — LLM-powered structured extraction
 *
 * Input:        rawBrief: string (free-form text, paste, or document export)
 * Output:       ParsedBrief (CompiledBrief) — structured fields with Zod validation
 * Side effects: LLM call via lib/chomsky.ts  (requires VPN)
 * Called by:    lib/orchestrator.ts  (PARSING phase)
 * Tested by:    none — covered implicitly; mock if needed
 */

import { chomsky } from "../chomsky";
import { ParsedBriefSchema, type ParsedBrief } from "../models/brief";
import { buildParsePrompt } from "../prompts/parse-brief";

/**
 * Parse raw brief text into structured CompiledBrief
 */
export async function parseBrief(rawBriefText: string, model?: string): Promise<ParsedBrief> {
  const prompt = buildParsePrompt(rawBriefText);

  try {
    const result = await chomsky.generateObject({
      model,
      schema: ParsedBriefSchema,
      messages: [
        {
          role: "system",
          content: "You are a brief parser. Extract structured data from messy text.",
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
      `Failed to parse brief: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Parse brief from URL (fetch and parse)
 */
export async function parseBriefFromUrl(url: string): Promise<ParsedBrief> {
  // This would integrate with document fetching
  // For now, throw not implemented
  throw new Error("URL parsing not yet implemented - use parseBrief() with text");
}
