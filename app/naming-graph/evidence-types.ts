// Evidence Layer - Separate from production GraphNode schema
// Provides auditable source tracking without polluting the core graph

export type SourceType =
  | "json_research"       // April 16 multi-agent research
  | "obsidian_doc"        // Manual Obsidian documentation
  | "ebay_official"       // Official eBay pages/help
  | "press_release"       // Investor relations/newsroom
  | "manual_verification" // Human-verified source
  | "inferred"            // Pattern-matched or inferred

export type ConfidenceLevel = "high" | "medium" | "low"

export type MappingMethod =
  | "exact_id"           // JSON canonical_name === TS id (kebab-case)
  | "exact_name"         // JSON canonical_name === TS name
  | "normalized_name"    // Fuzzy match after normalization
  | "manual"             // Human-reviewed mapping
  | "ambiguous"          // Multiple candidates, needs review

export interface EvidenceSource {
  url: string
  title?: string
  source_type: SourceType
  captured_at: string  // ISO date when evidence was collected
  provenance?: string  // "April 16, 2026 multi-agent research"
  notes?: string       // Additional context
}

export interface NodeEvidence {
  id: string           // Unique evidence record ID
  node_id: string      // References GraphNode.id
  canonical_name?: string  // Original name from research (if different)
  sources: EvidenceSource[]
  confidence: ConfidenceLevel
  mapping_method: MappingMethod
  mapped_at: string    // ISO date when mapping was performed
  mapped_by: string    // "automated" | "human"
  review_notes?: string
}

export interface MappingReport {
  total_research_items: number
  total_graph_nodes: number

  matched: {
    exact_id: number
    exact_name: number
    normalized_name: number
    manual: number
  }

  unmatched_research: Array<{
    canonical_name: string
    evidence_url: string
    reason: string
    candidates?: string[]  // Similar node IDs for review
  }>

  ambiguous: Array<{
    canonical_name: string
    evidence_url: string
    candidates: Array<{
      node_id: string
      node_name: string
      similarity_score: number
    }>
  }>

  unmapped_nodes: {
    total: number
    high_priority: string[]  // T1/T2 programs without evidence
    regional_variants: string[]
  }
}
