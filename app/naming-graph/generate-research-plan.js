#!/usr/bin/env node
// Generate systematic research plan for all nodes without evidence

const fs = require('fs')

console.log('🔍 Generating Batch Research Plan\n')

// Simple approach: extract node IDs directly from TypeScript file
const graphContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Extract all node IDs using regex
const idMatches = [...graphContent.matchAll(/"id":\s*"([^"]+)"/g)]
const allNodeIds = idMatches.map(m => m[1])

console.log(`✅ Found ${allNodeIds.length} total nodes in production graph\n`)

// Load existing evidence
const existingEvidence = JSON.parse(fs.readFileSync('./node-evidence.json', 'utf-8'))
const evidencedNodeIds = new Set(existingEvidence.map(ev => ev.node_id))

console.log(`✅ ${evidencedNodeIds.size} nodes already have evidence\n`)

// Find nodes without evidence
const nodesNeedingEvidence = allNodeIds.filter(id => !evidencedNodeIds.has(id))

console.log(`📊 ${nodesNeedingEvidence.length} nodes need evidence\n`)

// Create batches of 50
const BATCH_SIZE = 50
const batches = []

for (let i = 0; i < nodesNeedingEvidence.length; i += BATCH_SIZE) {
  const batchNodeIds = nodesNeedingEvidence.slice(i, i + BATCH_SIZE)
  batches.push({
    batch_number: batches.length + 1,
    node_ids: batchNodeIds,
    count: batchNodeIds.length
  })
}

console.log(`📦 Created ${batches.length} batches of ~${BATCH_SIZE} nodes\n`)

// Save research plan
const plan = {
  generated_at: new Date().toISOString(),
  total_nodes: allNodeIds.length,
  nodes_with_evidence: evidencedNodeIds.size,
  nodes_needing_evidence: nodesNeedingEvidence.length,
  batch_size: BATCH_SIZE,
  total_batches: batches.length,
  batches: batches
}

fs.writeFileSync('./research-plan-simple.json', JSON.stringify(plan, null, 2))
console.log('✅ Saved research plan → research-plan-simple.json\n')

// Create batch results directory
const resultsDir = './batch-results'
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir)
  console.log(`✅ Created ${resultsDir}/ directory\n`)
}

// Summary
console.log('━'.repeat(70))
console.log('📊 RESEARCH PLAN SUMMARY\n')
console.log(`Total nodes in graph:         ${allNodeIds.length}`)
console.log(`Nodes with evidence:          ${evidencedNodeIds.size} (${((evidencedNodeIds.size / allNodeIds.length) * 100).toFixed(1)}%)`)
console.log(`Nodes needing evidence:       ${nodesNeedingEvidence.length} (${((nodesNeedingEvidence.length / allNodeIds.length) * 100).toFixed(1)}%)`)
console.log(`\nBatches to process:           ${batches.length}`)
console.log(`Average nodes per batch:      ${Math.round(nodesNeedingEvidence.length / batches.length)}`)
console.log()
console.log('🎯 TARGET: 100% evidence coverage (${allNodeIds.length} nodes)')
console.log('━'.repeat(70))
console.log()

// Print first 3 batches as preview
console.log('📋 FIRST 3 BATCHES PREVIEW:\n')
batches.slice(0, 3).forEach(batch => {
  console.log(`Batch ${batch.batch_number}: ${batch.count} nodes`)
  console.log(`  ${batch.node_ids.slice(0, 5).join(', ')}${batch.node_ids.length > 5 ? ', ...' : ''}`)
  console.log()
})

console.log('💡 Next: Use batch node IDs to launch research agents\n')
