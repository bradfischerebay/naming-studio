// Evidence Mapping Script - Run the integration

import * as fs from 'fs'
import { mapResearchToNodes } from './map-evidence'

type ResearchItem = {
  canonical_name: string
  evidence_url: string
  first_seen?: string
  notes?: string
  market?: string
  status?: string
}

async function main() {
  console.log('🔍 eBay Naming Graph - Evidence Integration\n')
  console.log('Reading research items from April 16, 2026...')

  const researchItems: ResearchItem[] = JSON.parse(
    fs.readFileSync('./research-items-april-16.json', 'utf-8')
  )

  console.log(`✅ Loaded ${researchItems.length} research items with evidence URLs\n`)

  console.log('🗺️  Mapping research items to graph nodes...\n')

  const { evidence, report } = mapResearchToNodes(
    researchItems,
    '2026-04-16',
    'April 16, 2026 multi-agent research (11 agents, 106 searches)'
  )

  console.log('📊 MAPPING REPORT\n')
  console.log('─'.repeat(60))
  console.log(`Total research items: ${report.total_research_items}`)
  console.log(`Total graph nodes: ${report.total_graph_nodes}`)
  console.log()

  console.log('✅ MATCHED:')
  console.log(`  Exact ID matches:         ${report.matched.exact_id}`)
  console.log(`  Exact name matches:       ${report.matched.exact_name}`)
  console.log(`  Normalized fuzzy matches: ${report.matched.normalized_name}`)
  console.log(`  Manual mappings:          ${report.matched.manual}`)
  const totalMatched = Object.values(report.matched).reduce((a, b) => a + b, 0)
  console.log(`  TOTAL MATCHED:            ${totalMatched}`)
  console.log()

  console.log('⚠️  AMBIGUOUS (multiple candidates):')
  console.log(`  Items needing review:     ${report.ambiguous.length}`)
  if (report.ambiguous.length > 0) {
    console.log('\n  Examples:')
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
    console.log('\n  Examples:')
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

  // Save evidence records
  console.log('💾 Saving evidence records...')
  fs.writeFileSync(
    './node-evidence.json',
    JSON.stringify(evidence, null, 2)
  )
  console.log(`✅ Saved ${evidence.length} evidence records to node-evidence.json`)

  // Save full report
  console.log('💾 Saving mapping report...')
  fs.writeFileSync(
    './evidence-mapping-report.json',
    JSON.stringify(report, null, 2)
  )
  console.log('✅ Saved mapping report to evidence-mapping-report.json')

  // Generate human-readable report
  const readableReport = generateReadableReport(report, evidence)
  fs.writeFileSync('./EVIDENCE-MAPPING-REPORT.md', readableReport)
  console.log('✅ Saved readable report to EVIDENCE-MAPPING-REPORT.md')

  console.log('\n✨ Evidence integration complete!\n')

  // Summary stats
  const coverage = ((totalMatched / report.total_graph_nodes) * 100).toFixed(1)
  console.log(`📈 Coverage: ${totalMatched}/${report.total_graph_nodes} nodes (${coverage}%)\n`)
}

function generateReadableReport(report: any, evidence: any[]): string {
  const totalMatched = Object.values(report.matched).reduce((a: any, b: any) => a + b, 0)
  const coverage = ((totalMatched / report.total_graph_nodes) * 100).toFixed(1)

  return `# eBay Naming Graph - Evidence Mapping Report

**Date:** ${new Date().toISOString().split('T')[0]}
**Research Source:** April 16, 2026 multi-agent research
**Integration Method:** Automated mapping with sidecar evidence layer

---

## Executive Summary

Successfully mapped **${totalMatched} of ${report.total_research_items}** research items with evidence URLs to the production graph of **${report.total_graph_nodes} nodes**.

**Coverage:** ${coverage}% of graph nodes now have evidence backing
**Evidence Records:** ${evidence.length} created
**Needs Review:** ${report.ambiguous.length} ambiguous mappings
**Unmatched:** ${report.unmatched_research.length} research items (not in graph)

---

## Mapping Results

### ✅ Successfully Matched (${totalMatched} items)

| Method | Count | Description |
|--------|-------|-------------|
| Exact ID | ${report.matched.exact_id} | canonical_name → kebab-case → node.id |
| Exact Name | ${report.matched.exact_name} | canonical_name === node.name |
| Normalized | ${report.matched.normalized_name} | Fuzzy match (>90% similarity) |
| Manual | ${report.matched.manual} | Human-reviewed mappings |
| **TOTAL** | **${totalMatched}** | |

---

### ⚠️ Ambiguous Matches (${report.ambiguous.length} items)

These items have multiple possible candidates and need human review:

${report.ambiguous.map((item: any, i: number) => `
${i + 1}. **${item.canonical_name}**
   Source: ${item.evidence_url}
   Candidates:
${item.candidates.slice(0, 3).map((c: any) => `   - \`${c.node_id}\` → "${c.node_name}" (${Math.round(c.similarity_score * 100)}% match)`).join('\n')}
`).join('\n')}

---

### ❌ Unmatched Research (${report.unmatched_research.length} items)

These research items were not found in the graph:

${report.unmatched_research.map((item: any, i: number) => `
${i + 1}. **${item.canonical_name}**
   Source: ${item.evidence_url}
   Reason: ${item.reason}
   ${item.candidates && item.candidates.length > 0 ? `Possible candidates: ${item.candidates.join(', ')}` : 'No similar nodes found'}
`).join('\n')}

---

## Gap Analysis

### Nodes Without Evidence (${report.unmapped_nodes.total} total)

**High-Priority Programs** (${report.unmapped_nodes.high_priority.length} items):
${report.unmapped_nodes.high_priority.slice(0, 20).map((id: string) => `- \`${id}\``).join('\n')}
${report.unmapped_nodes.high_priority.length > 20 ? `\n... and ${report.unmapped_nodes.high_priority.length - 20} more` : ''}

**Regional Variants** (${report.unmapped_nodes.regional_variants.length} items):
${report.unmapped_nodes.regional_variants.slice(0, 20).map((id: string) => `- \`${id}\``).join('\n')}
${report.unmapped_nodes.regional_variants.length > 20 ? `\n... and ${report.unmapped_nodes.regional_variants.length - 20} more` : ''}

---

## Evidence Quality Distribution

${evidence.reduce((acc: any, e: any) => {
  acc[e.confidence] = (acc[e.confidence] || 0) + 1
  return acc
}, {})}

---

## Next Steps

1. **Review Ambiguous Mappings** (${report.ambiguous.length} items)
   - Human review required for multiple-candidate items
   - Update mapping method to \`manual\` after review

2. **Investigate Unmatched Research** (${report.unmatched_research.length} items)
   - Determine if items should be added to graph
   - Or document why they're excluded

3. **Fill Evidence Gaps** (${report.unmapped_nodes.total} nodes)
   - Prioritize high-priority programs (T1/T2)
   - Launch targeted research for regional variants

4. **Integrate into Application**
   - Add \`evidence_ref?: string\` to GraphNode if needed
   - Build evidence lookup/display in UI
   - Create governance workflow for adding new evidence

---

**Generated:** ${new Date().toISOString()}
**Tool:** Evidence Mapper v1.0
`
}

main().catch(console.error)
