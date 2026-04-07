import { z } from "zod";

/**
 * Naming Facts Extraction Models
 */

export const NamingFactsSchema = z.object({
  facts: z.object({
    vertical_services: z.array(z.string()),
    enrollment_policies: z.enum(["separate", "shared"]).nullable(),
    checkout_flow: z.enum(["distinct", "shared"]).nullable(),
    markets: z.array(z.string()),
    longevity_months: z.number().nullable(),
  }),
  score_tags: z.array(
    z.enum([
      "formal_legal",
      "global_big3",
      "clarity_lift",
      "portfolio_risk",
      "trademark_risk",
    ])
  ),
  evidence_anchors: z.array(z.string()),

  // Explicit gate answer tracking - prevents duplicate questions (optional, defaults handled in markGateAnswered)
  answered_gates: z.object({
    G0: z.boolean().default(false),
    G1: z.boolean().default(false),
    G2: z.boolean().default(false),
    G3: z.boolean().default(false),
    G4: z.boolean().default(false),
    G5: z.boolean().default(false),
  }).optional(),
});

export type NamingFacts = z.infer<typeof NamingFactsSchema>;

/**
 * Score Tag Helpers
 */
export function hasTag(facts: NamingFacts, tag: NamingFacts['score_tags'][number]): boolean {
  return facts.score_tags.includes(tag);
}

export function addTag(facts: NamingFacts, tag: NamingFacts['score_tags'][number]): NamingFacts {
  if (!hasTag(facts, tag)) {
    return {
      ...facts,
      score_tags: [...facts.score_tags, tag],
    };
  }
  return facts;
}

/**
 * Gate tracking helpers - prevent duplicate questions
 */
export function markGateAnswered(facts: NamingFacts, gate: keyof NonNullable<NamingFacts['answered_gates']>): void {
  if (!facts.answered_gates) {
    facts.answered_gates = {
      G0: false,
      G1: false,
      G2: false,
      G3: false,
      G4: false,
      G5: false,
    };
  }
  facts.answered_gates[gate] = true;
}

export function isGateAnswered(facts: NamingFacts, gate: keyof NonNullable<NamingFacts['answered_gates']>): boolean {
  return facts.answered_gates?.[gate] ?? false;
}
