import { z } from "zod";

/**
 * Landscape Research Models
 */

export const CompetitorUsageSchema = z.object({
  competitor: z.string(),
  term_used: z.string(),
});

export const InternalConflictsSchema = z.object({
  exact_matches: z.array(z.string()),
  similar_concepts: z.array(z.string()),
});

export const ExternalLandscapeSchema = z.object({
  ebay_live_usage: z.string(),
  competitor_usage: z.array(CompetitorUsageSchema),
  is_industry_standard: z.boolean(),
});

export const LandscapeSynthesisSchema = z.object({
  internal_conflicts: InternalConflictsSchema,
  external_landscape: ExternalLandscapeSchema,
});

export type LandscapeSynthesis = z.infer<typeof LandscapeSynthesisSchema>;
export type CompetitorUsage = z.infer<typeof CompetitorUsageSchema>;
export type InternalConflicts = z.infer<typeof InternalConflictsSchema>;
export type ExternalLandscape = z.infer<typeof ExternalLandscapeSchema>;
