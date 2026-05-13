// Phase 4: Integrate Multi-Agent Research into Evidence Sidecar
// Add 27 programs from 6 parallel research agents

const fs = require('fs')

console.log('🔍 eBay Naming Graph - Phase 4 Integration\n')

// Load agent research results
const agentResearch = JSON.parse(fs.readFileSync('./phase4-agent-research.json', 'utf-8'))
console.log(`✅ Loaded ${agentResearch.programs_researched} programs from agent research`)

// Load existing evidence sidecar
const existingEvidence = JSON.parse(fs.readFileSync('./node-evidence.json', 'utf-8'))
console.log(`✅ Loaded ${existingEvidence.length} existing evidence records\n`)

// Load production graph for ID verification
const graphContent = fs.readFileSync('./enriched-consolidated-944-nodes.ts', 'utf-8')

// Helper functions
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

function inferConfidence(sourceType) {
  if (sourceType === 'ebay_official') return 'high'
  if (sourceType === 'press_release') return 'medium'
  if (sourceType === 'secondary_source') return 'medium'
  return 'medium'
}

// Manual mappings for programs that don't follow standard kebab-case
const manualMappings = {
  'My eBay': 'my-ebay',
  'Watchlist': 'watchlist',
  'Saved Searches': 'saved-searches',
  'Best Match': 'best-match',
  'Managed Payments': 'managed-payments',
  'Immediate Payment': 'immediate-payment',
  'PayPal on eBay': 'paypal',
  'eBay Labels': 'ebay-labels',
  'eBay Shipping': 'ebay-shipping',
  'Global Shipping Program': 'global-shipping-program',
  'eBay International Shipping': 'ebay-international-shipping',
  'eBay Standard Envelope': 'ebay-standard-envelope',
  'Promotions Manager': 'promotions-manager',
  'File Exchange': 'file-exchange',
  'Top-Rated Seller': 'top-rated-seller',
  'Best Offer': 'best-offer',
  'Buy It Now': 'buy-it-now',
  'eBay Stores': 'ebay-stores',
  'My Garage': 'my-garage',
  'Parts Compatibility': 'parts-compatibility',
  'eBay Guaranteed Fit': 'ebay-guaranteed-fit',
  'Fits Your Vehicle': 'fits-your-vehicle',
  'eBay Money Back Guarantee': 'ebay-money-back-guarantee',
  'eBay Guaranteed Delivery': 'guaranteed-delivery',
  'Verified Rights Owner (VeRO) Program': 'vero-program',
  'Resolution Center': 'resolution-center',
  'Security Center': 'security-center'
}

// Build map of existing evidence by node_id
const evidenceByNodeId = new Map(
  existingEvidence.map(ev => [ev.node_id, ev])
)

// Track stats
const report = {
  total_programs: agentResearch.programs_researched,
  matched: 0,
  merged_into_existing: 0,
  created_new: 0,
  unmatched: [],
  node_id_not_in_graph: []
}

console.log('🗺️  Mapping agent research to node IDs...\n')

for (const program of agentResearch.research_results) {
  // Use manual mapping or fall back to kebab-case
  let nodeId = manualMappings[program.canonical_name] || toKebabCase(program.canonical_name)

  // Verify node exists in production graph
  const nodeExists = graphContent.includes(`"id": "${nodeId}"`)

  if (!nodeExists) {
    report.node_id_not_in_graph.push({
      canonical_name: program.canonical_name,
      expected_id: nodeId,
      url: program.url,
      reason: 'Node ID not found in production graph'
    })
    continue
  }

  report.matched++

  // Check if evidence record already exists
  if (evidenceByNodeId.has(nodeId)) {
    // Merge into existing record
    const existing = evidenceByNodeId.get(nodeId)

    // Add new source (avoid duplicates)
    const urlExists = existing.sources.some(s => s.url === program.url)
    if (!urlExists) {
      existing.sources.push({
        url: program.url,
        title: program.title,
        source_type: program.source_type,
        captured_at: program.year ? String(program.year) : '2026-04-21',
        provenance: 'Phase 4 multi-agent research (6 agents, 27 programs)',
        notes: program.notes || ''
      })
      report.merged_into_existing++
    } else {
      // Source already exists, skip
      report.matched-- // Don't count as matched since we're not adding anything
    }
  } else {
    // Create new evidence record
    const newEvidence = {
      id: `ev-${nodeId}`,
      node_id: nodeId,
      canonical_name: program.canonical_name,
      sources: [{
        url: program.url,
        title: program.title,
        source_type: program.source_type,
        captured_at: program.year ? String(program.year) : '2026-04-21',
        provenance: 'Phase 4 multi-agent research (6 agents, 27 programs)',
        notes: program.notes || ''
      }],
      confidence: inferConfidence(program.source_type),
      mapping_method: 'manual',
      mapped_at: new Date().toISOString(),
      mapped_by: 'automated'
    }

    existingEvidence.push(newEvidence)
    evidenceByNodeId.set(nodeId, newEvidence)
    report.created_new++
  }
}

// Print summary
const totalEvidence = existingEvidence.length
const coverage = ((totalEvidence / 944) * 100).toFixed(1)

console.log('📊 PHASE 4 INTEGRATION REPORT\n')
console.log('─'.repeat(70))
console.log(`Programs researched:         ${report.total_programs}`)
console.log(`Successfully matched:        ${report.matched}`)
console.log(`Merged into existing:        ${report.merged_into_existing}`)
console.log(`Created new records:         ${report.created_new}`)
console.log(`Node ID not in graph:        ${report.node_id_not_in_graph.length}`)
console.log()

console.log(`📈 Updated Coverage: ${totalEvidence}/944 nodes (${coverage}%)`)
console.log(`📈 Delta from Phase 3: +${totalEvidence - 50} records`)
console.log('─'.repeat(70))
console.log()

if (report.node_id_not_in_graph.length > 0) {
  console.log('⚠️  NODE IDS NOT FOUND IN GRAPH:')
  report.node_id_not_in_graph.forEach(item => {
    console.log(`  ${item.canonical_name}`)
    console.log(`    → Expected ID: ${item.expected_id}`)
    console.log(`    → ${item.reason}`)
  })
  console.log()
}

// Save updated evidence sidecar
console.log('💾 Saving updated node-evidence.json...')
fs.writeFileSync('./node-evidence.json', JSON.stringify(existingEvidence, null, 2))
console.log(`✅ Saved ${existingEvidence.length} evidence records`)

// Save integration report
const reportData = {
  ...report,
  generated_at: new Date().toISOString(),
  phase: 'Phase 4: Multi-Agent Research Integration',
  graph_nodes_total: 944,
  evidence_coverage_percent: parseFloat(coverage),
  evidence_total: totalEvidence,
  phase3_baseline: 50,
  phase4_delta: totalEvidence - 50
}

fs.writeFileSync('./phase4-integration-report.json', JSON.stringify(reportData, null, 2))
console.log('✅ Saved integration report → phase4-integration-report.json')

console.log(`\n✨ Phase 4 complete! ${totalEvidence} total evidence records (${coverage}% coverage)\n`)
