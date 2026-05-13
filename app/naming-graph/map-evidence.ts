// Evidence Mapper - Maps April 16 research JSON to production GraphNode IDs

import { NodeEvidence, MappingMethod, MappingReport, EvidenceSource } from './evidence-types'
import { ENRICHED_PROGRAMS } from './enriched-consolidated-DEDUPLICATED'

type ResearchItem = {
  canonical_name: string
  evidence_url: string
  first_seen?: string
  notes?: string
  market?: string
  status?: string
}

// Normalization helpers
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[&\/]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function calculateSimilarity(a: string, b: string): number {
  const normA = normalize(a)
  const normB = normalize(b)

  if (normA === normB) return 1.0

  // Levenshtein distance ratio
  const maxLen = Math.max(normA.length, normB.length)
  const distance = levenshteinDistance(normA, normB)
  return 1 - (distance / maxLen)
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

export function mapResearchToNodes(
  researchItems: ResearchItem[],
  capturedDate: string = "2026-04-16",
  provenance: string = "April 16, 2026 multi-agent research"
): {
  evidence: NodeEvidence[]
  report: MappingReport
} {
  const evidence: NodeEvidence[] = []
  const report: MappingReport = {
    total_research_items: researchItems.length,
    total_graph_nodes: ENRICHED_PROGRAMS.length,
    matched: {
      exact_id: 0,
      exact_name: 0,
      normalized_name: 0,
      manual: 0,
    },
    unmatched_research: [],
    ambiguous: [],
    unmapped_nodes: {
      total: 0,
      high_priority: [],
      regional_variants: [],
    },
  }

  // Build lookup maps
  const nodeById = new Map(ENRICHED_PROGRAMS.map(n => [n.id, n]))
  const nodesByName = new Map(ENRICHED_PROGRAMS.map(n => [n.name.toLowerCase(), n]))

  for (const item of researchItems) {
    const kebabId = toKebabCase(item.canonical_name)
    const normalizedName = normalize(item.canonical_name)

    let matchedNode = null
    let method: MappingMethod = 'exact_id'

    // Strategy 1: Exact ID match (canonical_name → kebab-case → node.id)
    if (nodeById.has(kebabId)) {
      matchedNode = nodeById.get(kebabId)!
      method = 'exact_id'
      report.matched.exact_id++
    }

    // Strategy 2: Exact name match (canonical_name === node.name)
    else if (nodesByName.has(item.canonical_name.toLowerCase())) {
      matchedNode = nodesByName.get(item.canonical_name.toLowerCase())!
      method = 'exact_name'
      report.matched.exact_name++
    }

    // Strategy 3: Normalized fuzzy match (>0.9 similarity)
    else {
      const candidates = ENRICHED_PROGRAMS
        .map(node => ({
          node,
          score: calculateSimilarity(item.canonical_name, node.name),
        }))
        .filter(c => c.score >= 0.85)
        .sort((a, b) => b.score - a.score)

      if (candidates.length === 1 && candidates[0].score >= 0.9) {
        // Single strong candidate
        matchedNode = candidates[0].node
        method = 'normalized_name'
        report.matched.normalized_name++
      } else if (candidates.length > 1) {
        // Ambiguous - multiple candidates
        report.ambiguous.push({
          canonical_name: item.canonical_name,
          evidence_url: item.evidence_url,
          candidates: candidates.slice(0, 5).map(c => ({
            node_id: c.node.id,
            node_name: c.node.name,
            similarity_score: Math.round(c.score * 100) / 100,
          })),
        })
        continue
      } else {
        // No match found
        report.unmatched_research.push({
          canonical_name: item.canonical_name,
          evidence_url: item.evidence_url,
          reason: candidates.length === 0
            ? 'No similar nodes found'
            : `Best match only ${Math.round(candidates[0].score * 100)}% similar`,
          candidates: candidates.slice(0, 3).map(c => c.node.id),
        })
        continue
      }
    }

    // Create evidence record
    if (matchedNode) {
      const evidenceSource: EvidenceSource = {
        url: item.evidence_url,
        source_type: inferSourceType(item.evidence_url),
        captured_at: capturedDate,
        provenance,
        notes: item.notes,
      }

      evidence.push({
        id: `ev-${matchedNode.id}`,
        node_id: matchedNode.id,
        canonical_name: item.canonical_name !== matchedNode.name
          ? item.canonical_name
          : undefined,
        sources: [evidenceSource],
        confidence: inferConfidence(item.evidence_url, method),
        mapping_method: method,
        mapped_at: new Date().toISOString(),
        mapped_by: "automated",
      })
    }
  }

  // Calculate unmapped nodes
  const evidencedNodeIds = new Set(evidence.map(e => e.node_id))
  const unmappedNodes = ENRICHED_PROGRAMS.filter(n => !evidencedNodeIds.has(n.id))

  report.unmapped_nodes.total = unmappedNodes.length
  report.unmapped_nodes.high_priority = unmappedNodes
    .filter(n => n.tier === 't1' || n.tier === 't2' || n.tier === 'product' || n.tier === 'program')
    .map(n => n.id)
  report.unmapped_nodes.regional_variants = unmappedNodes
    .filter(n => n.market && n.market !== 'global' && typeof n.market === 'string')
    .map(n => n.id)

  return { evidence, report }
}

function inferSourceType(url: string): EvidenceSource['source_type'] {
  if (url.includes('investors.ebayinc.com')) return 'press_release'
  if (url.includes('ebayinc.com/stories')) return 'press_release'
  if (url.includes('pages.ebay.com')) return 'ebay_official'
  if (url.includes('ebay.com/help')) return 'ebay_official'
  if (url.includes('innovation.ebayinc.com')) return 'press_release'
  if (url.includes('community.ebay.com')) return 'ebay_official'
  return 'manual_verification'
}

function inferConfidence(url: string, method: MappingMethod): 'high' | 'medium' | 'low' {
  // High confidence: Official eBay source + exact match
  if (method === 'exact_id' || method === 'exact_name') {
    if (url.includes('ebay.com') || url.includes('ebayinc.com')) {
      return 'high'
    }
  }

  // Medium: Normalized match or secondary sources
  if (method === 'normalized_name') return 'medium'

  // Manual or ambiguous
  return 'medium'
}
