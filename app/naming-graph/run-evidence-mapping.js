// Phase 2: Evidence Mapping - Map research items to node IDs
const fs = require('fs')

console.log('🔍 eBay Naming Graph - Evidence Mapping (Phase 2)\n')

// Load research items with evidence URLs
const researchItems = JSON.parse(fs.readFileSync('./research-items-april-16.json', 'utf-8'))
console.log(`✅ Loaded ${researchItems.length} research items with evidence URLs`)

// Load production graph nodes from TypeScript file
const graphContent = fs.readFileSync('./enriched-consolidated-944-nodes.ts', 'utf-8')

// Extract the array content (everything between the first [ and last ];)
const arrayMatch = graphContent.match(/export const ENRICHED_PROGRAMS[^[]*\[([\s\S]*)\];/m)
if (!arrayMatch) throw new Error('Could not parse graph nodes')

// Convert TypeScript to JSON (replace single quotes with double quotes for property names)
const jsonString = '[' + arrayMatch[1]
  .replace(/(\s+)(\w+):/g, '$1"$2":')  // Convert property names to quoted strings
  .replace(/'/g, '"')  // Convert single quotes to double quotes
  + ']'

const graphNodes = JSON.parse(jsonString)
console.log(`✅ Loaded ${graphNodes.length} graph nodes\n`)

// Mapping helpers
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
  if (maxLen === 0) return 0
  const distance = levenshteinDistance(normA, normB)
  return 1 - (distance / maxLen)
}

function inferSourceType(url) {
  if (url.includes('investors.ebayinc.com')) return 'press_release'
  if (url.includes('ebayinc.com/stories')) return 'press_release'
  if (url.includes('innovation.ebayinc.com')) return 'press_release'
  if (url.includes('pages.ebay.com')) return 'ebay_official'
  if (url.includes('ebay.com/help')) return 'ebay_official'
  if (url.includes('community.ebay.com')) return 'ebay_official'
  return 'manual_verification'
}

function inferConfidence(url, method) {
  if (method === 'exact_id' || method === 'exact_name') {
    if (url.includes('ebay.com') || url.includes('ebayinc.com')) {
      return 'high'
    }
  }
  if (method === 'normalized_name') return 'medium'
  return 'medium'
}

// Build lookup maps
const nodeById = new Map(graphNodes.map(n => [n.id, n]))
const nodesByName = new Map(graphNodes.map(n => [n.name.toLowerCase(), n]))

// Results
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

// Map each research item
for (const item of researchItems) {
  const kebabId = toKebabCase(item.canonical_name)

  let matchedNode = null
  let method = 'exact_id'

  // Strategy 1: Exact ID match (kebab-case canonical_name === node.id)
  if (nodeById.has(kebabId)) {
    matchedNode = nodeById.get(kebabId)
    method = 'exact_id'
    report.matched.exact_id++
  }
  // Strategy 2: Exact name match (canonical_name === node.name)
  else if (nodesByName.has(item.canonical_name.toLowerCase())) {
    matchedNode = nodesByName.get(item.canonical_name.toLowerCase())
    method = 'exact_name'
    report.matched.exact_name++
  }
  // Strategy 3: Fuzzy normalized match (>90% similarity)
  else {
    const candidates = graphNodes
      .map(node => ({
        node,
        score: calculateSimilarity(item.canonical_name, node.name)
      }))
      .filter(c => c.score >= 0.85)
      .sort((a, b) => b.score - a.score)

    if (candidates.length === 1 && candidates[0].score >= 0.9) {
      // Single strong candidate
      matchedNode = candidates[0].node
      method = 'normalized_name'
      report.matched.normalized_name++
    } else if (candidates.length > 1) {
      // Multiple candidates - ambiguous
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
      // No good match found
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

  // Create evidence record for matched node
  if (matchedNode) {
    evidence.push({
      id: `ev-${matchedNode.id}`,
      node_id: matchedNode.id,
      canonical_name: item.canonical_name !== matchedNode.name ? item.canonical_name : undefined,
      sources: [{
        url: item.evidence_url,
        title: item.canonical_name,
        source_type: inferSourceType(item.evidence_url),
        captured_at: item.first_seen || '2026-04-16',
        provenance: 'April 16, 2026 multi-agent research (11 agents, 106 searches)',
        notes: item.notes
      }],
      confidence: inferConfidence(item.evidence_url, method),
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

// Print summary
const totalMatched = Object.values(report.matched).reduce((a, b) => a + b, 0)
const coverage = ((totalMatched / report.total_graph_nodes) * 100).toFixed(1)

console.log('📊 MAPPING REPORT\n')
console.log('─'.repeat(70))
console.log(`Total research items:        ${report.total_research_items}`)
console.log(`Total graph nodes:           ${report.total_graph_nodes}`)
console.log()

console.log('✅ SUCCESSFULLY MATCHED:')
console.log(`  Exact ID matches:          ${report.matched.exact_id}`)
console.log(`  Exact name matches:        ${report.matched.exact_name}`)
console.log(`  Normalized fuzzy matches:  ${report.matched.normalized_name}`)
console.log(`  TOTAL MATCHED:             ${totalMatched}`)
console.log()

console.log('⚠️  AMBIGUOUS (multiple candidates):')
console.log(`  Items needing review:      ${report.ambiguous.length}`)
if (report.ambiguous.length > 0) {
  console.log('\n  Examples:')
  report.ambiguous.slice(0, 3).forEach(item => {
    console.log(`    "${item.canonical_name}"`)
    item.candidates.slice(0, 2).forEach(c => {
      console.log(`      → ${c.node_name} (${Math.round(c.similarity_score * 100)}%)`)
    })
  })
}
console.log()

console.log('❌ UNMATCHED RESEARCH:')
console.log(`  Not found in graph:        ${report.unmatched_research.length}`)
if (report.unmatched_research.length > 0) {
  console.log('\n  Examples:')
  report.unmatched_research.slice(0, 5).forEach(item => {
    console.log(`    "${item.canonical_name}"`)
  })
}
console.log()

console.log('📭 UNMAPPED NODES (no evidence yet):')
console.log(`  Total without evidence:    ${report.unmapped_nodes.total}`)
console.log(`  High-priority (T1/T2):     ${report.unmapped_nodes.high_priority.length}`)
console.log(`  Regional variants:         ${report.unmapped_nodes.regional_variants.length}`)
console.log()
console.log('─'.repeat(70))
console.log()

// Save files
console.log('💾 Saving evidence records...')
fs.writeFileSync('./node-evidence.json', JSON.stringify(evidence, null, 2))
console.log(`✅ Saved ${evidence.length} evidence records → node-evidence.json`)

fs.writeFileSync('./evidence-mapping-report.json', JSON.stringify(report, null, 2))
console.log('✅ Saved mapping report → evidence-mapping-report.json')

// Generate markdown report
const mdReport = `# Evidence Mapping Report - Phase 2

**Date:** ${new Date().toISOString().split('T')[0]}
**Research Source:** April 16, 2026 multi-agent research
**Integration Method:** Automated exact + fuzzy matching

---

## Summary

Successfully mapped **${totalMatched} of ${report.total_research_items}** research items with evidence URLs to production graph nodes.

- **Coverage:** ${coverage}% of graph nodes now have evidence
- **Evidence records:** ${evidence.length} created
- **Needs review:** ${report.ambiguous.length} ambiguous mappings
- **Unmatched:** ${report.unmatched_research.length} research items

---

## Matching Results

| Method | Count | Description |
|--------|-------|-------------|
| Exact ID | ${report.matched.exact_id} | canonical_name → kebab-case → node.id |
| Exact Name | ${report.matched.exact_name} | canonical_name === node.name |
| Normalized | ${report.matched.normalized_name} | Fuzzy match (>90% similarity) |
| **TOTAL** | **${totalMatched}** | |

---

## Ambiguous Matches (${report.ambiguous.length} items)

${report.ambiguous.length === 0 ? '_None - all items matched cleanly!_' : report.ambiguous.map((item, i) => `
${i + 1}. **${item.canonical_name}**
   Source: ${item.evidence_url}
   Candidates:
${item.candidates.map(c => `   - \`${c.node_id}\` → "${c.node_name}" (${Math.round(c.similarity_score * 100)}%)`).join('\n')}
`).join('\n')}

---

## Unmatched Research (${report.unmatched_research.length} items)

${report.unmatched_research.length === 0 ? '_None - perfect mapping!_' : report.unmatched_research.map((item, i) => `
${i + 1}. **${item.canonical_name}**
   Source: ${item.evidence_url}
   Reason: ${item.reason}
`).join('\n')}

---

## Gap Analysis

**Nodes without evidence:** ${report.unmapped_nodes.total} / ${report.total_graph_nodes}

**High-Priority Programs** (${report.unmapped_nodes.high_priority.length} items):
${report.unmapped_nodes.high_priority.slice(0, 30).map(id => `- \`${id}\``).join('\n')}
${report.unmapped_nodes.high_priority.length > 30 ? `\n_... and ${report.unmapped_nodes.high_priority.length - 30} more_` : ''}

**Regional Variants** (${report.unmapped_nodes.regional_variants.length} items):
${report.unmapped_nodes.regional_variants.slice(0, 20).map(id => `- \`${id}\``).join('\n')}
${report.unmapped_nodes.regional_variants.length > 20 ? `\n_... and ${report.unmapped_nodes.regional_variants.length - 20} more_` : ''}

---

## Next Steps

1. **Review ambiguous mappings** (${report.ambiguous.length} items) - human decision needed
2. **Investigate unmatched items** (${report.unmatched_research.length} items) - add to graph or document exclusion
3. **Fill evidence gaps** (${report.unmapped_nodes.total} nodes) - prioritize T1/T2 programs
4. **Integrate Obsidian citations** - Add 28 footnote citations from V2.md

---

**Generated:** ${new Date().toISOString()}
`

fs.writeFileSync('./EVIDENCE-MAPPING-REPORT.md', mdReport)
console.log('✅ Saved markdown report → EVIDENCE-MAPPING-REPORT.md')

console.log(`\n📈 Evidence Coverage: ${totalMatched}/${report.total_graph_nodes} nodes (${coverage}%)`)
console.log('\n✨ Phase 2 complete!\n')
