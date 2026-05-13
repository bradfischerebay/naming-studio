#!/usr/bin/env node
// Auto-consolidate batch results into evidence sidecar
// Run after each batch completes: node auto-consolidate-batches.js <batch-number>

const fs = require('fs')

const batchNum = process.argv[2]
if (!batchNum) {
  console.error('Usage: node auto-consolidate-batches.js <batch-number>')
  process.exit(1)
}

console.log(`\n🔄 Auto-Consolidating Batch ${batchNum}\n`)

// Load batch results
const resultFile = `./batch-results/batch-${batchNum}-results.json`
if (!fs.existsSync(resultFile)) {
  console.error(`❌ Result file not found: ${resultFile}`)
  process.exit(1)
}

const batchResults = JSON.parse(fs.readFileSync(resultFile, 'utf-8'))
console.log(`✅ Loaded ${batchResults.length} results from Batch ${batchNum}`)

// Load existing evidence
const existingEvidence = JSON.parse(fs.readFileSync('./node-evidence.json', 'utf-8'))
const beforeCount = existingEvidence.length
console.log(`✅ Current evidence: ${beforeCount} records\n`)

// Load graph for verification
const graphContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Build evidence map
const evidenceByNodeId = new Map(existingEvidence.map(ev => [ev.node_id, ev]))

function inferConfidence(sourceType) {
  if (sourceType === 'ebay_official') return 'high'
  if (sourceType === 'press_release') return 'medium'
  return 'medium'
}

const report = {
  batch: batchNum,
  results_loaded: batchResults.length,
  matched: 0,
  merged: 0,
  created: 0,
  skipped: []
}

console.log('🗺️  Integrating batch results...\n')

for (const result of batchResults) {
  const nodeId = result.node_id

  // Verify node exists
  const nodeExists = graphContent.includes(`"id": "${nodeId}"`)
  if (!nodeExists) {
    report.skipped.push({ node_id: nodeId, reason: 'Not found in graph' })
    continue
  }

  report.matched++

  // Check if evidence already exists
  if (evidenceByNodeId.has(nodeId)) {
    const existing = evidenceByNodeId.get(nodeId)
    const urlExists = existing.sources.some(s => s.url === result.url)

    if (!urlExists) {
      existing.sources.push({
        url: result.url,
        title: result.title,
        source_type: result.source_type,
        captured_at: result.year ? String(result.year) : '2026-04-21',
        provenance: `Batch ${batchNum} systematic research (18-batch coverage campaign)`,
        notes: result.notes || ''
      })
      report.merged++
    }
  } else {
    // Create new evidence record
    const newEvidence = {
      id: `ev-${nodeId}`,
      node_id: nodeId,
      canonical_name: result.canonical_name,
      sources: [{
        url: result.url,
        title: result.title,
        source_type: result.source_type,
        captured_at: result.year ? String(result.year) : '2026-04-21',
        provenance: `Batch ${batchNum} systematic research (18-batch coverage campaign)`,
        notes: result.notes || ''
      }],
      confidence: inferConfidence(result.source_type),
      mapping_method: 'automated',
      mapped_at: new Date().toISOString(),
      mapped_by: 'batch-research'
    }

    existingEvidence.push(newEvidence)
    evidenceByNodeId.set(nodeId, newEvidence)
    report.created++
  }
}

const afterCount = existingEvidence.length
const coverage = ((afterCount / 900) * 100).toFixed(1)

console.log('📊 BATCH CONSOLIDATION REPORT\n')
console.log('─'.repeat(70))
console.log(`Batch number:                ${batchNum}`)
console.log(`Results loaded:              ${report.results_loaded}`)
console.log(`Matched to graph:            ${report.matched}`)
console.log(`Merged into existing:        ${report.merged}`)
console.log(`Created new:                 ${report.created}`)
console.log(`Skipped:                     ${report.skipped.length}`)
console.log()
console.log(`Before: ${beforeCount} records`)
console.log(`After:  ${afterCount} records (+${afterCount - beforeCount})`)
console.log(`Coverage: ${coverage}% (${afterCount}/900 nodes)`)
console.log('─'.repeat(70))
console.log()

// Save updated evidence
fs.writeFileSync('./node-evidence.json', JSON.stringify(existingEvidence, null, 2))
console.log(`✅ Updated node-evidence.json (${afterCount} records)\n`)

// Update batch queue tracker
if (fs.existsSync('./batch-queue-tracker.json')) {
  const tracker = JSON.parse(fs.readFileSync('./batch-queue-tracker.json', 'utf-8'))
  const batchIndex = tracker.batches.findIndex(b => b.batch_number === parseInt(batchNum))

  if (batchIndex !== -1) {
    tracker.batches[batchIndex].status = 'completed'
    tracker.batches[batchIndex].completed_at = new Date().toISOString()
    tracker.batches[batchIndex].evidence_found = report.created + report.merged
    tracker.current_evidence = afterCount

    fs.writeFileSync('./batch-queue-tracker.json', JSON.stringify(tracker, null, 2))
    console.log(`✅ Updated batch-queue-tracker.json\n`)
  }
}

// Save batch report
const batchReport = {
  ...report,
  consolidated_at: new Date().toISOString(),
  evidence_before: beforeCount,
  evidence_after: afterCount,
  coverage_percent: parseFloat(coverage)
}

fs.writeFileSync(`./batch-results/batch-${batchNum}-report.json`, JSON.stringify(batchReport, null, 2))
console.log(`✅ Saved batch report → batch-results/batch-${batchNum}-report.json\n`)

console.log(`✨ Batch ${batchNum} consolidated! Coverage: ${coverage}%\n`)

// Print next batch status
if (fs.existsSync('./batch-queue-tracker.json')) {
  const tracker = JSON.parse(fs.readFileSync('./batch-queue-tracker.json', 'utf-8'))
  const nextBatch = tracker.batches.find(b => b.status === 'pending')

  if (nextBatch) {
    console.log(`📋 Next: Launch Batch ${nextBatch.batch_number} (${nextBatch.node_count} programs)\n`)
  } else {
    const completed = tracker.batches.filter(b => b.status === 'completed').length
    const total = tracker.batches.length
    console.log(`🎉 ALL BATCHES COMPLETE! (${completed}/${total})\n`)
    console.log(`Final Coverage: ${coverage}% (${afterCount}/900 nodes)\n`)
  }
}
