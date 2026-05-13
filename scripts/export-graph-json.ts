#!/usr/bin/env tsx
/**
 * export-graph-json.ts
 *
 * Generates public/naming-graph-data.json from the enriched naming graph.
 * Output is ready for v0.dev or any D3/graph visualization component.
 *
 * Includes:
 *   - nodes: all 1000+ nodes with key display + governance fields
 *   - links: all parent-child + lateral relationships (integrates_with, competes_with, etc.)
 *   - stats: summary counts by type
 */

import * as fs from 'fs'
import * as path from 'path'
import { ENRICHED_PROGRAMS, generateLinks, getGraphStats } from '../lib/enriched-naming-data'

const nodes = ENRICHED_PROGRAMS.map(node => ({
  id: node.id,
  name: node.name,
  type: node.type,
  tier: node.tier,
  status: node.status,
  parent: node.parent,
  market: node.market,
  year: node.year,
  released: node.released,
  desc: node.desc,
  renamedTo: node.renamedTo,
  renamedFrom: node.renamedFrom,
  sourceUrl: node.sourceUrl,
  namingTreatment: (node as any).namingTreatment,
  countsAsManagedName: (node as any).countsAsManagedName,
  // Include relationship count so the graph can size nodes by connectivity
  relationshipCount: (node.relationships?.length ?? 0),
}))

const links = generateLinks(ENRICHED_PROGRAMS).map(link => ({
  source: link.source,
  target: link.target,
  type: link.type,
  year: link.year,
  desc: link.desc,
  bidirectional: link.bidirectional,
}))

// Filter out links where source or target doesn't exist in node set
// (some relationship targets reference external/legacy nodes not in the graph)
const nodeIds = new Set(nodes.map(n => n.id))
const validLinks = links.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target))
const droppedLinks = links.length - validLinks.length

const stats = {
  totalNodes: nodes.length,
  totalLinks: validLinks.length,
  droppedLinks,
  byStatus: {
    current: nodes.filter(n => n.status === 'current').length,
    legacy: nodes.filter(n => n.status === 'legacy').length,
    renamed: nodes.filter(n => n.status === 'renamed').length,
  },
  byType: Object.fromEntries(
    ['masterbrand', 'category', 'advertising', 'trust', 'impact', 'developer', 'regional'].map(t => [
      t, nodes.filter(n => n.type === t).length,
    ])
  ),
  byLinkType: Object.fromEntries(
    ['parent', 'integrates_with', 'related_to', 'depends_on', 'competes_with', 'replaced_by', 'replaces', 'renamed_to', 'renamed_from'].map(t => [
      t, validLinks.filter(l => l.type === t).length,
    ])
  ),
  namingTreatment: {
    owned_marketing_name: nodes.filter(n => n.namingTreatment === 'owned_marketing_name').length,
    functional_label: nodes.filter(n => n.namingTreatment === 'functional_label').length,
    descriptive_label: nodes.filter(n => n.namingTreatment === 'descriptive_label').length,
    internal_label: nodes.filter(n => n.namingTreatment === 'internal_label').length,
    partner_brand: nodes.filter(n => n.namingTreatment === 'partner_brand').length,
    unknown: nodes.filter(n => n.namingTreatment === 'unknown').length,
    unclassified: nodes.filter(n => !n.namingTreatment).length,
  },
  managedNames: nodes.filter(n => n.countsAsManagedName === true).length,
}

const output = { nodes, links: validLinks, stats }

const outPath = path.join(process.cwd(), 'public', 'naming-graph-data.json')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(output, null, 2))

const fileSizeKB = Math.round(fs.statSync(outPath).size / 1024)

console.log('=== Graph Export Complete ===')
console.log(`Output: ${outPath} (${fileSizeKB} KB)`)
console.log()
console.log(`Nodes: ${stats.totalNodes}`)
console.log(`Links: ${stats.totalLinks} (dropped ${droppedLinks} with unresolved targets)`)
console.log()
console.log('By link type:')
Object.entries(stats.byLinkType).forEach(([k, v]) => v > 0 && console.log(`  ${k}: ${v}`))
console.log()
console.log('Naming treatment:')
Object.entries(stats.namingTreatment).forEach(([k, v]) => console.log(`  ${k}: ${v}`))
console.log(`  countsAsManagedName=true: ${stats.managedNames}`)
