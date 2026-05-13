// Phase 5: Integrate Additional Round 2 Research (23 programs from 6 agents)

const fs = require('fs')

console.log('🔍 Phase 5 Integration - Additional Research\n')

// Load Phase 5 research
const phase5 = JSON.parse(fs.readFileSync('./phase5-additional-research.json', 'utf-8'))
console.log(`✅ Loaded ${phase5.programs_researched} programs from Phase 5\n`)

// Load existing evidence
const existingEvidence = JSON.parse(fs.readFileSync('./node-evidence.json', 'utf-8'))
console.log(`✅ ${existingEvidence.length} existing evidence records\n`)

// Manual mappings
const manualMappings = {
  'eBay for Charity': 'ebay-for-charity',
  'eBay Foundation': 'ebay-foundation',
  'eBay Community Forums': 'ebay-community',
  'Small Business Ambassador Network': 'sban',
  'eBay Mobile App': 'ebay-mobile-app',
  'eBay Motors App': 'ebay-motors-app',
  'eBay Mobile Web': 'ebay-mobile-web',
  'Terapeak Product Research': 'terapeak',
  'Traffic Reports': 'traffic-reports',
  'Sales Reports': 'sales-reports',
  'Promoted Listings Reports': 'promoted-listings-reports',
  'eBay Live': 'ebay-live',
  'eBay Open': 'ebay-open',
  'eBay Live on Tour': 'ebay-live-on-tour',
  'eBay Refurbished': 'ebay-refurbished',
  'Certified Refurbished': 'certified-refurbished',
  'Seller Refurbished': 'seller-refurbished',
  'Open Box': 'open-box',
  'Manufacturer Refurbished': 'manufacturer-refurbished',
  'eBay Plus': 'ebay-plus',
  'Top Rated Plus': 'top-rated-plus',
  'Volume Pricing': 'volume-pricing',
  'Store Subscription': 'ebay-stores'
}

function toKebabCase(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
}

function inferConfidence(sourceType) {
  if (sourceType === 'ebay_official') return 'high'
  return 'medium'
}

// Load graph for verification
const graphContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Build evidence map
const evidenceByNodeId = new Map(existingEvidence.map(ev => [ev.node_id, ev]))

const report = {
  total: phase5.programs_researched,
  matched: 0,
  merged: 0,
  created: 0,
  skipped: []
}

console.log('🗺️  Integrating Phase 5 research...\n')

for (const program of phase5.research_results) {
  const nodeId = manualMappings[program.canonical_name] || toKebabCase(program.canonical_name)

  const nodeExists = graphContent.includes(`"id": "${nodeId}"`)

  if (!nodeExists) {
    report.skipped.push({ name: program.canonical_name, expected_id: nodeId })
    continue
  }

  report.matched++

  if (evidenceByNodeId.has(nodeId)) {
    const existing = evidenceByNodeId.get(nodeId)
    const urlExists = existing.sources.some(s => s.url === program.url)

    if (!urlExists) {
      existing.sources.push({
        url: program.url,
        title: program.title,
        source_type: program.source_type,
        captured_at: program.year ? String(program.year) : '2026-04-21',
        provenance: 'Phase 5 additional research (6 agents, 23 programs)',
        notes: program.notes || ''
      })
      report.merged++
    }
  } else {
    existingEvidence.push({
      id: `ev-${nodeId}`,
      node_id: nodeId,
      canonical_name: program.canonical_name,
      sources: [{
        url: program.url,
        title: program.title,
        source_type: program.source_type,
        captured_at: program.year ? String(program.year) : '2026-04-21',
        provenance: 'Phase 5 additional research (6 agents, 23 programs)',
        notes: program.notes || ''
      }],
      confidence: inferConfidence(program.source_type),
      mapping_method: 'manual',
      mapped_at: new Date().toISOString(),
      mapped_by: 'automated'
    })
    evidenceByNodeId.set(nodeId, existingEvidence[existingEvidence.length - 1])
    report.created++
  }
}

const coverage = ((existingEvidence.length / 900) * 100).toFixed(1)

console.log('📊 PHASE 5 INTEGRATION REPORT\n')
console.log('─'.repeat(70))
console.log(`Programs researched:         ${report.total}`)
console.log(`Matched to graph:            ${report.matched}`)
console.log(`Merged into existing:        ${report.merged}`)
console.log(`Created new:                 ${report.created}`)
console.log(`Skipped (not in graph):      ${report.skipped.length}`)
console.log()
console.log(`📈 Updated Coverage: ${existingEvidence.length}/900 nodes (${coverage}%)`)
console.log('─'.repeat(70))
console.log()

fs.writeFileSync('./node-evidence.json', JSON.stringify(existingEvidence, null, 2))
console.log(`✅ Saved ${existingEvidence.length} evidence records\n`)
console.log(`✨ Phase 5 complete! Ready for batch processing.\n`)
