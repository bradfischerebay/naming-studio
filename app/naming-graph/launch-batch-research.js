#!/usr/bin/env node
// Launch systematic batch research using the generated plan
// This will create agent prompts for each batch

const fs = require('fs')

console.log('🚀 Batch Research Launcher\n')

// Load research plan
const plan = JSON.parse(fs.readFileSync('./research-plan-simple.json', 'utf-8'))
console.log(`✅ Loaded research plan: ${plan.total_batches} batches\n`)

// Load production graph to get names for each node ID
const graphContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Extract node data (id and name pairs)
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

// Generate agent prompts for first 10 batches (manageable overnight run)
const BATCHES_TO_LAUNCH = Math.min(10, plan.total_batches)

console.log(`📋 Generating prompts for ${BATCHES_TO_LAUNCH} batches...\n`)

const prompts = []

for (let i = 0; i < BATCHES_TO_LAUNCH; i++) {
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
3. If still not found, search secondary sources (but note lower confidence)

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
- Prioritize ebay_official sources over press_release
- Include year launched if found in documentation`
  }

  prompts.push(prompt)
}

// Save prompts
fs.writeFileSync('./batch-agent-prompts.json', JSON.stringify(prompts, null, 2))
console.log(`✅ Saved ${prompts.length} agent prompts → batch-agent-prompts.json\n`)

// Print summary
console.log('━'.repeat(70))
console.log('📊 BATCH LAUNCH SUMMARY\n')
console.log(`Total batches available:      ${plan.total_batches}`)
console.log(`Batches with prompts ready:   ${prompts.length}`)
console.log(`Total programs to research:   ${prompts.reduce((sum, p) => sum + p.node_count, 0)}`)
console.log()
console.log('💡 NEXT STEPS:')
console.log('  1. Launch agents using prompts from batch-agent-prompts.json')
console.log('  2. Save results to batch-results/batch-N-results.json')
console.log('  3. Run consolidation script to merge into node-evidence.json')
console.log()
console.log('⚡ TIP: Launch 3-5 batches at a time to avoid rate limits')
console.log('━'.repeat(70))
console.log()

// Print first prompt as example
console.log('📄 EXAMPLE: Batch 1 Prompt Preview\n')
console.log(prompts[0].agent_prompt.substring(0, 500) + '...\n')
console.log(`(Full prompts saved in batch-agent-prompts.json)`)
