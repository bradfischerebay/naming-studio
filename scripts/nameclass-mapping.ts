/**
 * nameclass-mapping.ts
 *
 * Canonical cross-layer alignment table: Enrichment V2 nameClass → core registry namingTreatment.
 *
 * WHY THIS EXISTS
 * The repository has two fields that partially answer "what kind of name is this?":
 *   - namingTreatment  in enriched-consolidated-DEDUPLICATED.ts  (machine-queryable, canonical)
 *   - nameClass        in enriched-v2-COMPLETE.ts                (semantic enrichment layer)
 *
 * namingTreatment is authoritative. nameClass is informational and may lag behind.
 * When they disagree, namingTreatment wins — update nameClass in the enrichment layer,
 * not namingTreatment in the core registry.
 *
 * Run the report to see alignment state:
 *   npx tsx scripts/naming-classification-report.ts
 */

// ─── Mapping: nameClass → namingTreatment ────────────────────────────────────

/**
 * Maps each Enrichment V2 nameClass value to the equivalent namingTreatment.
 * null = no direct mapping; requires node-level context to resolve.
 *
 * "Feature Name" intentionally maps to null. It is a structural-scope concept
 * (a named capability within a product), not a language-treatment concept.
 * A Feature Name node may be owned_marketing_name if it is a branded named
 * capability, or functional_label if it is a UI action. Resolve per node.
 */
export const NAME_CLASS_TO_NAMING_TREATMENT = {
  'Product Name':    'owned_marketing_name',
  'Functional Label': 'functional_label',
  'Internal Term':   'internal_label',
  'Legacy Residue':  'unknown',
  'Feature Name':    null,               // needs-review: resolve per node context
} as const satisfies Record<string, string | null>

export type NameClassKey = keyof typeof NAME_CLASS_TO_NAMING_TREATMENT

// ─── Compatibility: which nameClass values are acceptable for each namingTreatment ─

/**
 * For a given namingTreatment, which nameClass values are considered compatible?
 * Used for the alignment check — a node is aligned if its nameClass is in this list.
 *
 * partner_brand accepts 'Product Name' because acquired brands (Depop, TCGplayer, Goldin)
 * may carry Product Name classification in the semantic layer while still being partner_brand
 * in the governance layer.
 */
export const COMPATIBLE_NAME_CLASSES: Record<string, string[]> = {
  owned_marketing_name: ['Product Name'],
  partner_brand:        ['Product Name'],
  descriptive_label:    [],                  // no nameClass equivalent; purely a namingTreatment construct
  functional_label:     ['Functional Label'],
  internal_label:       ['Internal Term'],
  unknown:              ['Legacy Residue'],
}

// ─── Alignment check ─────────────────────────────────────────────────────────

export type AlignmentResult = 'aligned' | 'conflict' | 'needs-review'

/**
 * Checks whether a node's nameClass (from V2 enrichment) and namingTreatment
 * (from core registry) are consistent.
 *
 * aligned      = values are consistent per the mapping rules
 * conflict     = values are inconsistent; human review needed
 * needs-review = nameClass is "Feature Name" (no automatic mapping) or
 *                nameClass is unknown; manual resolution required
 */
export function checkNameClassAlignment(
  nameClass: string,
  namingTreatment: string,
): AlignmentResult {
  const compatible = COMPATIBLE_NAME_CLASSES[namingTreatment]

  // Unknown namingTreatment value
  if (!compatible) return 'needs-review'

  // Feature Name has no automatic mapping
  if (nameClass === 'Feature Name') return 'needs-review'

  // Unknown nameClass value
  const mapped = NAME_CLASS_TO_NAMING_TREATMENT[nameClass as NameClassKey]
  if (mapped === undefined) return 'needs-review'

  return compatible.includes(nameClass) ? 'aligned' : 'conflict'
}
