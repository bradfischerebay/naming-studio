/**
 * Landscape Researcher Module — LLM-powered market context synthesis
 *
 * Input:        CompiledBrief + optional web search results
 * Output:       LandscapeSynthesis — competitive context, market signals, portfolio notes
 * Side effects: LLM call via lib/chomsky.ts  (requires VPN)
 *               Optionally calls external search API (not yet wired)
 * Called by:    lib/orchestrator.ts  (RESEARCH phase — skippable via config.skipWebResearch)
 * Tested by:    tests/researcher.test.ts
 */

import { chomsky } from "../chomsky";
import { LandscapeSynthesisSchema, type LandscapeSynthesis } from "../models/landscape";
import type { CompiledBrief } from "../models/brief";
import { buildSynthesizeLandscapePrompt } from "../prompts/synthesize-landscape";

/**
 * Analyze naming landscape through web research
 * NOTE: This is a simplified version. Full implementation would:
 * 1. Use web search API (Brave, Google, etc.)
 * 2. Fetch internal eBay portfolio docs
 * 3. Run 3 searches: eBay site, competitors, industry standard
 */
export async function analyzeLandscape(
  brief: CompiledBrief,
  options?: {
    skipWebResearch?: boolean;
  }
): Promise<LandscapeSynthesis> {
  if (options?.skipWebResearch) {
    // Return empty landscape when web research is skipped
    return {
      internal_conflicts: {
        exact_matches: [],
        similar_concepts: [],
      },
      external_landscape: {
        ebay_live_usage: "Web research skipped",
        competitor_usage: [],
        is_industry_standard: false,
      },
    };
  }

  // TODO: Implement actual web search
  // For now, synthesize from brief only
  const mockWebResults = `No web search results available (not yet implemented).

  To enable full landscape research:
  1. Integrate web search API (Brave, Google, etc.)
  2. Fetch internal eBay portfolio documents
  3. Execute 3 searches per the original workflow
  `;

  const briefJson = JSON.stringify(brief, null, 2);
  const prompt = buildSynthesizeLandscapePrompt(briefJson, mockWebResults);

  try {
    const result = await chomsky.generateObject({
      schema: LandscapeSynthesisSchema,
      messages: [
        {
          role: "system",
          content: "You are a landscape synthesizer. Analyze competitive and internal naming landscape.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    return result.object;
  } catch (error) {
    // Fallback to empty landscape on error
    console.warn("Landscape analysis failed, using empty landscape:", error);
    return {
      internal_conflicts: {
        exact_matches: [],
        similar_concepts: [],
      },
      external_landscape: {
        ebay_live_usage: "Analysis failed",
        competitor_usage: [],
        is_industry_standard: false,
      },
    };
  }
}

/**
 * Extract category term from brief for web searches
 */
function extractCategoryTerm(brief: CompiledBrief): string {
  const description = brief.offering_description || "";

  // Simple extraction - in production, use LLM
  // This would be done by the web search step in the original workflow
  const keywords = description.toLowerCase().match(/\b(shipping|pricing|payment|listing|selling|buying)\b/);
  return keywords ? keywords[0] : "feature";
}

/**
 * Check if brief indicates this is a replacement scenario
 * Used for portfolio risk exception handling
 */
export function isReplacementScenario(brief: CompiledBrief): boolean {
  const replacementKeywords = [
    "replacing",
    "migrating",
    "sunsetting",
    "next generation",
    "next-generation",
    "migration from",
    "replaces",
    "sunset",
  ];

  const textToCheck = [
    brief.offering_description,
    brief.value_proposition,
    brief.benefits,
    brief.naming_request,
  ].filter(Boolean).join(" ").toLowerCase();

  return replacementKeywords.some(keyword => textToCheck.includes(keyword));
}
