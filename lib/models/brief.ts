import { z } from "zod";

/**
 * Product Naming Brief Schema
 * Pydantic-style models for type safety and validation
 */

export const CompiledBriefSchema = z.object({
  offering_description: z.string().optional(),
  value_proposition: z.string().optional(),
  benefits: z.string().optional(),
  jobs_to_be_done: z.string().optional(),
  example_use_cases: z.string().optional(),
  pain_points: z.string().optional(),
  target_customers: z.string().optional(),
  target_geographies: z.string().optional(),
  customer_research_and_competitive_insights: z.string().optional(),
  brand_considerations: z.string().optional(),
  naming_request: z.string().optional(),
  primary_contact: z.string().optional(),
  initial_name_ideas: z.string().optional(),
  timing: z.string().optional(),
});

export type CompiledBrief = z.infer<typeof CompiledBriefSchema>;

/**
 * Parsed Brief (output from the parser module)
 */
export const ParsedBriefSchema = z.object({
  compiled_brief: CompiledBriefSchema,
});

export type ParsedBrief = z.infer<typeof ParsedBriefSchema>;

/**
 * Raw Brief Input (user provides text or URL)
 */
export interface RawBriefInput {
  text?: string;
  url?: string;
  hasExistingBrief: boolean;
}

/**
 * Validation helper
 */
export function validateBrief(brief: unknown): ParsedBrief {
  return ParsedBriefSchema.parse(brief);
}

/**
 * Check if brief has minimum required fields
 */
export function hasMinimumFields(brief: CompiledBrief): boolean {
  const required = ['offering_description', 'target_customers', 'timing'];
  return required.every(field => {
    const value = brief[field as keyof CompiledBrief];
    return value && value.trim().length > 0;
  });
}

/**
 * Get missing fields from brief
 */
export function getMissingFields(brief: CompiledBrief): string[] {
  const allFields = Object.keys(CompiledBriefSchema.shape);
  return allFields.filter(field => {
    const value = brief[field as keyof CompiledBrief];
    return !value || value.trim().length === 0;
  });
}
