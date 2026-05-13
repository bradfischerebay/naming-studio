#!/usr/bin/env node
// Generate prompts for ALL 18 batches (complete 900-node coverage)

const fs = require('fs')

console.log('🚀 Generating ALL Batch Prompts (18 batches)\n')

// Load research plan
const plan = JSON.parse(fs.readFileSync('./research-plan-simple.json', 'utf-8'))
console.log(`✅ Loaded research plan: ${plan.total_batches} batches\n`)

// Load production graph to get names
const graphContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Extract node data
const nodeData = {}
const lines = graphContent.split('\n')
let currentId = null

lines.forEach(line => {
  const idMatch = line.match(/"id":\s*"([^"]+)"/)
  if (idMatch) currentId = idMatch[1]

  const nameMatch = line.match(/"name":\s*"([^"]+)"/)
  if (nameMatch && currentId) {
    nodeData[currentId] = nameMatch[1]
    currentId = null
  }
})

console.log(`✅ Extracted ${Object.keys(nodeData).length} node names\n`)

// Generate prompts for ALL 18 batches
console.log(`📋 Generating prompts for ALL ${plan.total_batches} batches...\n`)

const prompts = []

for (let i = 0; i < plan.total_batches; i++) {
  const batch = plan.batches[i]

  // Build program list with names
  const programList = batch.node_ids.map((id, idx) => {
    const name = nodeData[id] || id
    return `${idx + 1}. ${name} (node_id: ${id})`
  }).join('\n')

  const prompt = {
    batch_number: batch.batch_number,
    node_count: batch.count,
    agent_prompt: `Find official evidence URLs for this batch of ${batch.count} eBay programs.

**Programs to research (Batch ${batch.batch_number}):**

${programList}

**For each program:**
1. Search for official eBay page (help.ebay.com, pages.ebay.com, www.ebay.com/sellercenter)
2. If not found, search investor relations (ebayinc.com, investors.ebayinc.com)
3. If still not found, skip it (only include programs with official sources)

**Output JSON array format:**
[
  {
    "canonical_name": "Program Name",
    "node_id": "exact-node-id-from-list-above",
    "url": "https://...",
    "title": "Page Title",
    "source_type": "ebay_official|press_release|secondary_source",
    "year": 2020,
    "notes": "Brief description"
  }
]

**Important:**
- Use exact node_id from the list above
- Skip programs where no official source can be found
- Prioritize ebay_official sources
- Include year if found

Save results to: batch-results/batch-${batch.batch_number}-results.json`
  }

  prompts.push(prompt)
}

// Save all prompts
fs.writeFileSync('./batch-agent-prompts-ALL.json', JSON.stringify(prompts, null, 2))
console.log(`✅ Saved ${prompts.length} agent prompts → batch-agent-prompts-ALL.json\n`)

// Print summary
const totalPrograms = prompts.reduce((sum, p) => sum + p.node_count, 0)

console.log('━'.repeat(70))
console.log('📊 COMPLETE BATCH QUEUE SUMMARY\n')
console.log(`Total batches:                ${prompts.length}`)
console.log(`Total programs to research:   ${totalPrograms}`)
console.log(`Current evidence:             85 records (9.4%)`)
console.log(`Target coverage:              900 records (100%)`)
console.log(`Gap to fill:                  ${867} programs`)
console.log()
console.log('📈 PROJECTED COVERAGE:')
console.log(`  Assuming 70% success rate:  ~${Math.round(totalPrograms * 0.7)} new records`)
console.log(`  Final total:                ~${Math.round(85 + totalPrograms * 0.7)} records`)
console.log(`  Final coverage:             ~${Math.round((85 + totalPrograms * 0.7) / 900 * 100)}%`)
console.log()
console.log('⚡ PROCESSING PLAN:')
console.log('  - Batch 1: Already launched')
console.log('  - Batches 2-18: Queue for sequential launch')
console.log('  - Each batch auto-integrates on completion')
console.log('  - Estimated time: 4-6 hours for all 18 batches')
console.log('━'.repeat(70))
console.log()

// Create batch queue tracker
const queueTracker = {
  created_at: new Date().toISOString(),
  total_batches: prompts.length,
  total_programs: totalPrograms,
  current_evidence: 85,
  target_coverage: 900,
  batches: prompts.map(p => ({
    batch_number: p.batch_number,
    node_count: p.node_count,
    status: p.batch_number === 1 ? 'running' : 'pending',
    agent_id: p.batch_number === 1 ? 'a5cbfaa2902dc1de9' : null,
    completed_at: null,
    evidence_found: null
  }))
}

fs.writeFileSync('./batch-queue-tracker.json', JSON.stringify(queueTracker, null, 2))
console.log('✅ Created batch queue tracker → batch-queue-tracker.json\n')

console.log('🎯 All 18 batches ready for sequential processing!\n')
