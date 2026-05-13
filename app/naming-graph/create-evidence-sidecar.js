// Phase 2: Create Evidence Sidecar - Simplified approach
// Since Wave 5 items ARE the research items, we already know the exact mapping

const fs = require('fs')

console.log('🔍 eBay Naming Graph - Evidence Sidecar Creation (Phase 2)\n')

// Load research items with evidence URLs
const researchItems = JSON.parse(fs.readFileSync('./research-items-april-16.json', 'utf-8'))
console.log(`✅ Loaded ${researchItems.length} research items with evidence URLs`)

// Load manual mappings for items that don't match kebab-case exactly
const manualMappings = JSON.parse(fs.readFileSync('./manual-evidence-mappings.json', 'utf-8'))
const manualMap = new Map(
  manualMappings.manual_mappings.map(m => [m.canonical_name, m.node_id])
)
console.log(`✅ Loaded ${manualMap.size} manual ID mappings`)

// Load Wave 5 enriched items (these are already in the graph with IDs)
const wave5Content = fs.readFileSync('./enriched-wave5-research-items.ts', 'utf-8')

// Simple helper to convert canonical name to kebab-case ID
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parentheses content
    .replace(/[&\/]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function inferSourceType(url) {
  if (url.includes('investors.ebayinc.com')) return 'press_release'
  if (url.includes('ebayinc.com/stories')) return 'press_release'
  if (url.includes('innovation.ebayinc.com')) return 'press_release'
  if (url.includes('pages.ebay.com')) return 'ebay_official'
  if (url.includes('ebay.com/help')) return 'ebay_official'
  if (url.includes('community.ebay.com')) return 'ebay_official'
  if (url.includes('techcrunch.com')) return 'tech_press'
  if (url.includes('wikipedia.org')) return 'secondary_source'
  if (url.includes('encyclopedia.com')) return 'secondary_source'
  if (url.includes('liveabout.com')) return 'secondary_source'
  return 'manual_verification'
}

// Map research items to evidence records
const evidence = []
const report = {
  total_research_items: researchItems.length,
  matched: 0,
  unmatched: [],
  evidence_created: 0
}

console.log('🗺️  Creating evidence records...\n')

for (const item of researchItems) {
  // Check manual mapping first, then fall back to kebab-case
  const nodeId = manualMap.get(item.canonical_name) || toKebabCase(item.canonical_name)

  // Check if this ID appears in Wave 5 (which we know is in the graph)
  const inWave5 = wave5Content.includes(`id: "${nodeId}"`)

  if (!inWave5) {
    report.unmatched.push({
      canonical_name: item.canonical_name,
      expected_id: nodeId,
      evidence_url: item.evidence_url
    })
    continue
  }

  // Create evidence record
  report.matched++
  evidence.push({
    id: `ev-${nodeId}`,
    node_id: nodeId,
    canonical_name: item.canonical_name,
    sources: [{
      url: item.evidence_url,
      title: item.canonical_name,
      source_type: inferSourceType(item.evidence_url),
      captured_at: item.first_seen || '2026-04-16',
      provenance: 'April 16, 2026 multi-agent research (11 agents, 106 searches)',
      notes: item.notes
    }],
    confidence: inferSourceType(item.evidence_url).includes('ebay') ? 'high' : 'medium',
    mapping_method: 'exact_id',
    mapped_at: new Date().toISOString(),
    mapped_by: 'automated'
  })
}

report.evidence_created = evidence.length

// Print results
console.log('📊 EVIDENCE CREATION REPORT\n')
console.log('─'.repeat(70))
console.log(`Research items processed:    ${report.total_research_items}`)
console.log(`Evidence records created:    ${report.evidence_created}`)
console.log(`Matched to graph nodes:      ${report.matched}`)
console.log(`Unmatched items:             ${report.unmatched.length}`)
console.log()

if (report.unmatched.length > 0) {
  console.log('⚠️  UNMATCHED ITEMS:')
  report.unmatched.forEach(item => {
    console.log(`  - ${item.canonical_name} → expected ID: ${item.expected_id}`)
  })
  console.log()
}

const coverage = ((report.evidence_created / 944) * 100).toFixed(1)
console.log(`📈 Coverage: ${report.evidence_created}/944 nodes (${coverage}%)`)
console.log('─'.repeat(70))
console.log()

// Save evidence sidecar
console.log('💾 Saving evidence sidecar...')
fs.writeFileSync('./node-evidence.json', JSON.stringify(evidence, null, 2))
console.log(`✅ Saved ${evidence.length} evidence records → node-evidence.json`)

// Save report
const reportData = {
  ...report,
  generated_at: new Date().toISOString(),
  graph_nodes_total: 944,
  evidence_coverage_percent: parseFloat(coverage)
}
fs.writeFileSync('./evidence-creation-report.json', JSON.stringify(reportData, null, 2))
console.log('✅ Saved report → evidence-creation-report.json')

// Generate markdown summary
const mdSummary = `# Evidence Sidecar - Phase 2 Complete ✅

**Date:** ${new Date().toISOString().split('T')[0]}
**Research Source:** April 16, 2026 multi-agent research
**Mapping Method:** Direct ID matching (research items = Wave 5 items)

---

## Summary

Successfully created **${evidence.length} evidence records** mapping April 16 research to production graph nodes.

- **Evidence created:** ${evidence.length} records
- **Coverage:** ${coverage}% of graph (${evidence.length}/944 nodes)
- **Unmatched:** ${report.unmatched.length} items

---

## Evidence Records Created

All ${evidence.length} research items mapped to graph node IDs:

${evidence.slice(0, 10).map((e, i) => `${i + 1}. \`${e.node_id}\` → ${e.canonical_name}
   - Source: ${e.sources[0].source_type}
   - URL: ${e.sources[0].url.substring(0, 60)}...
`).join('\n')}

${evidence.length > 10 ? `\n_... and ${evidence.length - 10} more_\n` : ''}

---

## Source Type Distribution

${Object.entries(
  evidence.reduce((acc, e) => {
    const type = e.sources[0].source_type
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})
).sort((a, b) => b[1] - a[1]).map(([type, count]) => `- **${type}:** ${count} records`).join('\n')}

---

## Confidence Levels

${Object.entries(
  evidence.reduce((acc, e) => {
    acc[e.confidence] = (acc[e.confidence] || 0) + 1
    return acc
  }, {})
).map(([level, count]) => `- **${level}:** ${count} records`).join('\n')}

---

## Next Steps

1. ✅ **Phase 1 Complete:** Added 44 research items to graph (900 → 944 nodes)
2. ✅ **Phase 2 Complete:** Created ${evidence.length} evidence records
3. **Phase 3:** Integrate 28 Obsidian footnote citations
4. **Phase 4:** Fill evidence gaps for remaining ${944 - evidence.length} nodes

---

**Files Created:**
- \`node-evidence.json\` - Evidence sidecar (${evidence.length} records)
- \`evidence-creation-report.json\` - Detailed statistics
- \`EVIDENCE-SIDECAR-PHASE2-COMPLETE.md\` - This summary

**Status:** Ready for Phase 3 (Obsidian citations)
`

fs.writeFileSync('./EVIDENCE-SIDECAR-PHASE2-COMPLETE.md', mdSummary)
console.log('✅ Saved markdown summary → EVIDENCE-SIDECAR-PHASE2-COMPLETE.md')

console.log(`\n✨ Phase 2 complete! ${evidence.length} evidence records created.\n`)
