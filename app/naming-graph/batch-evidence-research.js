#!/usr/bin/env node
// Systematic Batch Evidence Research
// Process all 900 nodes to find official eBay evidence URLs

const fs = require('fs')

console.log('🔍 eBay Naming Graph - Batch Evidence Research\n')

// Load production graph
console.log('📂 Loading production graph...')
const graphContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Extract nodes from TypeScript format
const arrayMatch = graphContent.match(/export const ENRICHED_PROGRAMS[^[]*\[([\s\S]*)\];/m)
if (!arrayMatch) throw new Error('Could not parse graph nodes')

// Convert TypeScript to JSON
const jsonString = '[' + arrayMatch[1]
  .replace(/(\s+)(\w+):/g, '$1"$2":')  // Convert property names to quoted strings
  .replace(/'/g, '"')  // Convert single quotes to double quotes
  + ']'

const allNodes = JSON.parse(jsonString)
console.log(`✅ Loaded ${allNodes.length} nodes from production graph\n`)

// Load existing evidence to avoid duplicates
const existingEvidence = JSON.parse(fs.readFileSync('./node-evidence.json', 'utf-8'))
const evidencedNodeIds = new Set(existingEvidence.map(ev => ev.node_id))
console.log(`✅ ${evidencedNodeIds.size} nodes already have evidence\n`)

// Filter to nodes without evidence
const nodesNeedingEvidence = allNodes.filter(node => !evidencedNodeIds.has(node.id))
console.log(`📊 ${nodesNeedingEvidence.length} nodes need evidence research\n`)

// Group by category for organized research
const byCategory = {}
nodesNeedingEvidence.forEach(node => {
  const category = node.parent || 'uncategorized'
  if (!byCategory[category]) byCategory[category] = []
  byCategory[category].push(node)
})

console.log('📊 NODES BY CATEGORY:\n')
console.log('─'.repeat(70))
Object.entries(byCategory)
  .sort((a, b) => b[1].length - a[1].length)
  .forEach(([cat, nodes]) => {
    console.log(`${cat.padEnd(30)} ${String(nodes.length).padStart(4)} nodes`)
  })
console.log('─'.repeat(70))
console.log()

// Research strategy configuration
const RESEARCH_STRATEGIES = {
  // High-priority: Official eBay pages most likely to exist
  tier1: {
    searchPatterns: [
      'site:help.ebay.com "{name}"',
      'site:pages.ebay.com "{name}"',
      'site:www.ebay.com/sellercenter "{name}"'
    ],
    confidence: 'high'
  },
  // Medium-priority: Press releases and announcements
  tier2: {
    searchPatterns: [
      'site:ebayinc.com "{name}" announcement',
      'site:investors.ebayinc.com "{name}"',
      'site:innovation.ebayinc.com "{name}"'
    ],
    confidence: 'medium'
  },
  // Low-priority: Community and secondary sources
  tier3: {
    searchPatterns: [
      'site:community.ebay.com "{name}"',
      '"eBay {name}" launched year'
    ],
    confidence: 'low'
  }
}

// Generate research plan
const researchPlan = {
  total_nodes: nodesNeedingEvidence.length,
  categories: Object.keys(byCategory).length,
  research_batches: [],
  estimated_searches: 0
}

// Create batches of 50 nodes each for manageable processing
const BATCH_SIZE = 50
for (let i = 0; i < nodesNeedingEvidence.length; i += BATCH_SIZE) {
  const batchNodes = nodesNeedingEvidence.slice(i, i + BATCH_SIZE)
  researchPlan.research_batches.push({
    batch_number: Math.floor(i / BATCH_SIZE) + 1,
    start_index: i,
    end_index: Math.min(i + BATCH_SIZE, nodesNeedingEvidence.length),
    node_count: batchNodes.length,
    nodes: batchNodes.map(n => ({ id: n.id, name: n.name, parent: n.parent }))
  })
  researchPlan.estimated_searches += batchNodes.length * 3 // 3 search patterns per node
}

console.log('📋 RESEARCH PLAN GENERATED:\n')
console.log(`Total batches: ${researchPlan.research_batches.length}`)
console.log(`Batch size: ${BATCH_SIZE} nodes`)
console.log(`Estimated searches: ${researchPlan.estimated_searches}`)
console.log()

// Save research plan
fs.writeFileSync('./research-plan.json', JSON.stringify(researchPlan, null, 2))
console.log('✅ Saved research plan → research-plan.json\n')

// Generate research instructions for each batch
console.log('📝 GENERATING BATCH RESEARCH INSTRUCTIONS:\n')

const batchInstructions = researchPlan.research_batches.map(batch => {
  return {
    batch_number: batch.batch_number,
    instructions: `Research evidence URLs for batch ${batch.batch_number} (${batch.node_count} programs):

${batch.nodes.map((n, idx) => `${idx + 1}. ${n.name} (id: ${n.id}, parent: ${n.parent})`).join('\n')}

For each program:
1. Search for official eBay page (help.ebay.com, pages.ebay.com, sellercenter)
2. If not found, search investor relations (ebayinc.com, investors.ebayinc.com)
3. Document: URL, title, source_type, year (if found)

Output JSON array format:
[
  {
    "canonical_name": "Program Name",
    "node_id": "node-id",
    "url": "https://...",
    "title": "Page Title",
    "source_type": "ebay_official|press_release|secondary_source",
    "year": 2020,
    "notes": "Brief description"
  }
]

Skip programs where no official source found.`
  }
})

// Save batch instructions
fs.writeFileSync('./batch-research-instructions.json', JSON.stringify(batchInstructions, null, 2))
console.log(`✅ Generated ${batchInstructions.length} batch instruction sets`)
console.log('✅ Saved → batch-research-instructions.json\n')

// Create a resume-friendly tracking file
const progressTracker = {
  created_at: new Date().toISOString(),
  total_nodes: nodesNeedingEvidence.length,
  total_batches: researchPlan.research_batches.length,
  completed_batches: 0,
  batches_status: researchPlan.research_batches.map(b => ({
    batch_number: b.batch_number,
    status: 'pending',
    completed_at: null,
    evidence_found: 0,
    evidence_not_found: 0
  }))
}

fs.writeFileSync('./research-progress.json', JSON.stringify(progressTracker, null, 2))
console.log('✅ Created progress tracker → research-progress.json\n')

// Summary
console.log('━'.repeat(70))
console.log('🎯 BATCH RESEARCH SETUP COMPLETE\n')
console.log(`Total nodes to research: ${nodesNeedingEvidence.length}`)
console.log(`Organized into: ${researchPlan.research_batches.length} batches of ${BATCH_SIZE} nodes`)
console.log(`Estimated searches: ${researchPlan.estimated_searches}`)
console.log()
console.log('📁 FILES CREATED:')
console.log('  - research-plan.json (master plan)')
console.log('  - batch-research-instructions.json (instructions per batch)')
console.log('  - research-progress.json (progress tracker)')
console.log()
console.log('🚀 NEXT STEPS:')
console.log('  1. Launch agents for each batch (or process in groups)')
console.log('  2. Save results to batch-results/ directory')
console.log('  3. Run consolidation script to merge into node-evidence.json')
console.log()
console.log('💡 TIP: Process 5-10 batches at a time to avoid rate limits')
console.log('━'.repeat(70))
console.log()

// Also create a directory for batch results
const resultsDir = './batch-results'
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir)
  console.log(`✅ Created directory: ${resultsDir}/\n`)
}

// Create a sample batch result template
const sampleResult = {
  batch_number: 1,
  completed_at: new Date().toISOString(),
  programs_researched: 50,
  evidence_found: 35,
  evidence_not_found: 15,
  results: [
    {
      canonical_name: "Example Program",
      node_id: "example-program",
      url: "https://help.ebay.com/example",
      title: "Example Program Help",
      source_type: "ebay_official",
      year: 2020,
      notes: "Example description"
    }
  ]
}

fs.writeFileSync(`${resultsDir}/TEMPLATE-batch-result.json`, JSON.stringify(sampleResult, null, 2))
console.log('✅ Created result template → batch-results/TEMPLATE-batch-result.json\n')
