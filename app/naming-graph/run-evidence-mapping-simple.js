// Evidence Mapping Script - Simpler Node.js version
const fs = require('fs')

// Read research items
const researchItems = JSON.parse(fs.readFileSync('./research-items-april-16.json', 'utf-8'))

// Extract GraphNode array from TypeScript file
const tsContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')
const match = tsContent.match(/export const ENRICHED_PROGRAMS[^[]*(\[[\s\S]*\]);/m)
if (!match) throw new Error('Could not parse ENRICHED_PROGRAMS from TypeScript file')

const graphNodesJson = match[1]
const graphNodes = eval(graphNodesJson)

console.log('🔍 eBay Naming Graph - Evidence Integration\n')
console.log(`✅ Loaded ${researchItems.length} research items with evidence URLs`)
console.log(`✅ Loaded ${graphNodes.length} graph nodes\n`)

// Helper functions
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[&\/]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function levenshteinDistance(a, b) {
  const matrix = []
  for (let i = 0; i <= b.length; i++) matrix[i] = [i]
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j

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

function calculateSimilarity(a, b) {
  const normA = normalize(a)
  const normB = normalize(b)
  if (normA === normB) return 1.0
  const maxLen = Math.max(normA.length, normB.length)
  const distance = levenshteinDistance(normA, normB)
  return 1 - (distance / maxLen)
}

function inferSourceType(url) {
  if (url.includes('investors.ebayinc.com')) return 'press_release'
  if (url.includes('ebayinc.com/stories')) return 'press_release'
  if (url.includes('pages.ebay.com')) return 'ebay_official'
  if (url.includes('ebay.com/help')) return 'ebay_official'
  if (url.includes('innovation.ebayinc.com')) return 'press_release'
  if (url.includes('community.ebay.com')) return 'ebay_official'
  return 'manual_verification'
}

// Build lookup maps
const nodeById = new Map(graphNodes.map(n => [n.id, n]))
const nodesByName = new Map(graphNodes.map(n => [n.name.toLowerCase(), n]))

// Mapping results
const evidence = []
const report = {
  total_research_items: researchItems.length,
  total_graph_nodes: graphNodes.length,
  matched: { exact_id: 0, exact_name: 0, normalized_name: 0, manual: 0 },
  unmatched_research: [],
  ambiguous: [],
  unmapped_nodes: { total: 0, high_priority: [], regional_variants: [] }
}

console.log('🗺️  Mapping research items to graph nodes...\n')

for (const item of researchItems) {
  const kebabId = toKebabCase(item.canonical_name)
  const normalizedName = normalize(item.canonical_name)

  let matchedNode = null
  let method = 'exact_id'

  // Strategy 1: Exact ID match
  if (nodeById.has(kebabId)) {
    matchedNode = nodeById.get(kebabId)
    method = 'exact_id'
    report.matched.exact_id++
  }
  // Strategy 2: Exact name match
  else if (nodesByName.has(item.canonical_name.toLowerCase())) {
    matchedNode = nodesByName.get(item.canonical_name.toLowerCase())
    method = 'exact_name'
    report.matched.exact_name++
  }
  // Strategy 3: Fuzzy match
  else {
    const candidates = graphNodes
      .map(node => ({
        node,
        score: calculateSimilarity(item.canonical_name, node.name)
      }))
      .filter(c => c.score >= 0.85)
      .sort((a, b) => b.score - a.score)

    if (candidates.length === 1 && candidates[0].score >= 0.9) {
      matchedNode = candidates[0].node
      method = 'normalized_name'
      report.matched.normalized_name++
    } else if (candidates.length > 1) {
      report.ambiguous.push({
        canonical_name: item.canonical_name,
        evidence_url: item.evidence_url,
        candidates: candidates.slice(0, 5).map(c => ({
          node_id: c.node.id,
          node_name: c.node.name,
          similarity_score: Math.round(c.score * 100) / 100
        }))
      })
      continue
    } else {
      report.unmatched_research.push({
        canonical_name: item.canonical_name,
        evidence_url: item.evidence_url,
        reason: candidates.length === 0
          ? 'No similar nodes found'
          : `Best match only ${Math.round(candidates[0].score * 100)}% similar`,
        candidates: candidates.slice(0, 3).map(c => c.node.id)
      })
      continue
    }
  }

  // Create evidence record
  if (matchedNode) {
    evidence.push({
      id: `ev-${matchedNode.id}`,
      node_id: matchedNode.id,
      canonical_name: item.canonical_name !== matchedNode.name ? item.canonical_name : undefined,
      sources: [{
        url: item.evidence_url,
        source_type: inferSourceType(item.evidence_url),
        captured_at: '2026-04-16',
        provenance: 'April 16, 2026 multi-agent research (11 agents, 106 searches)',
        notes: item.notes
      }],
      confidence: (method === 'exact_id' || method === 'exact_name') ? 'high' : 'medium',
      mapping_method: method,
      mapped_at: new Date().toISOString(),
      mapped_by: 'automated'
    })
  }
}

// Calculate unmapped nodes
const evidencedNodeIds = new Set(evidence.map(e => e.node_id))
const unmappedNodes = graphNodes.filter(n => !evidencedNodeIds.has(n.id))

report.unmapped_nodes.total = unmappedNodes.length
report.unmapped_nodes.high_priority = unmappedNodes
  .filter(n => n.tier === 't1' || n.tier === 't2' || n.tier === 'product' || n.tier === 'program')
  .map(n => n.id)
report.unmapped_nodes.regional_variants = unmappedNodes
  .filter(n => n.market && n.market !== 'global' && typeof n.market === 'string')
  .map(n => n.id)

// Print report
const totalMatched = Object.values(report.matched).reduce((a, b) => a + b, 0)

console.log('📊 MAPPING REPORT\n')
console.log('─'.repeat(60))
console.log(`Total research items: ${report.total_research_items}`)
console.log(`Total graph nodes: ${report.total_graph_nodes}`)
console.log()

console.log('✅ MATCHED:')
console.log(`  Exact ID matches:         ${report.matched.exact_id}`)
console.log(`  Exact name matches:       ${report.matched.exact_name}`)
console.log(`  Normalized fuzzy matches: ${report.matched.normalized_name}`)
console.log(`  TOTAL MATCHED:            ${totalMatched}`)
console.log()

console.log('⚠️  AMBIGUOUS (multiple candidates):')
console.log(`  Items needing review:     ${report.ambiguous.length}`)
if (report.ambiguous.length > 0) {
  console.log('\n  Top 3 examples:')
  report.ambiguous.slice(0, 3).forEach(item => {
    console.log(`    "${item.canonical_name}"`)
    item.candidates.slice(0, 2).forEach(c => {
      console.log(`      → ${c.node_name} (${c.similarity_score * 100}% match)`)
    })
  })
}
console.log()

console.log('❌ UNMATCHED RESEARCH:')
console.log(`  Items not found in graph: ${report.unmatched_research.length}`)
if (report.unmatched_research.length > 0) {
  console.log('\n  Top 5 examples:')
  report.unmatched_research.slice(0, 5).forEach(item => {
    console.log(`    "${item.canonical_name}" - ${item.reason}`)
  })
}
console.log()

console.log('📭 UNMAPPED NODES (no evidence yet):')
console.log(`  Total nodes without evidence:    ${report.unmapped_nodes.total}`)
console.log(`  High-priority programs (T1/T2):  ${report.unmapped_nodes.high_priority.length}`)
console.log(`  Regional variants:               ${report.unmapped_nodes.regional_variants.length}`)
console.log()
console.log('─'.repeat(60))
console.log()

// Save files
fs.writeFileSync('./node-evidence.json', JSON.stringify(evidence, null, 2))
console.log(`✅ Saved ${evidence.length} evidence records to node-evidence.json`)

fs.writeFileSync('./evidence-mapping-report.json', JSON.stringify(report, null, 2))
console.log('✅ Saved mapping report to evidence-mapping-report.json')

const coverage = ((totalMatched / report.total_graph_nodes) * 100).toFixed(1)
console.log(`\n📈 Coverage: ${totalMatched}/${report.total_graph_nodes} nodes (${coverage}%)\n`)
console.log('✨ Evidence integration complete!\n')
