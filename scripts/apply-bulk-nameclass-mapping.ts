#!/usr/bin/env tsx
/**
 * apply-bulk-nameclass-mapping.ts
 *
 * Bulk-applies namingTreatment + countsAsManagedName to the ~854 unclassified nodes
 * that have a nameClass in Enrichment V2.
 *
 * Mapping rules:
 *   Product Name     → owned_marketing_name
 *   Functional Label → functional_label
 *   Internal Term    → internal_label
 *   Legacy Residue   → unknown
 *   Feature Name     → owned_marketing_name if isProductName=true, else functional_label
 *
 * countsAsManagedName: true only for owned_marketing_name AND status not legacy/renamed
 *
 * Safe to re-run: skips nodes that already have namingTreatment.
 * Processes insertions in reverse position order to avoid offset drift.
 */

import * as fs from 'fs'
import * as path from 'path'
import { ENRICHED_PROGRAMS } from '../app/naming-graph/enriched-consolidated-DEDUPLICATED'
import { ENRICHMENT_V2_COMPLETE } from '../app/naming-graph/enriched-v2-COMPLETE'

// ─── Build V2 map ─────────────────────────────────────────────────────────────

const v2Map = new Map((ENRICHMENT_V2_COMPLETE as any[]).map((e: any) => [e.id, e]))

// ─── Compute patches ──────────────────────────────────────────────────────────

const NAME_CLASS_MAP: Record<string, string> = {
  'Product Name':    'owned_marketing_name',
  'Functional Label': 'functional_label',
  'Internal Term':   'internal_label',
  'Legacy Residue':  'unknown',
}

interface Patch {
  id: string
  namingTreatment: string
  countsAsManagedName: boolean
}

const patches: Patch[] = []

for (const node of ENRICHED_PROGRAMS) {
  if ((node as any).namingTreatment) continue  // already classified

  const v2 = v2Map.get(node.id) as any
  if (!v2?.nameClass) continue  // no V2 data

  let treatment: string
  if (v2.nameClass === 'Feature Name') {
    treatment = v2.isProductName === true ? 'owned_marketing_name' : 'functional_label'
  } else {
    const mapped = NAME_CLASS_MAP[v2.nameClass]
    if (!mapped) continue
    treatment = mapped
  }

  const isLegacyOrRenamed = node.status === 'legacy' || node.status === 'renamed'
  const countsAsManagedName = treatment === 'owned_marketing_name' && !isLegacyOrRenamed

  patches.push({ id: node.id, namingTreatment: treatment, countsAsManagedName })
}

console.log(`Computed ${patches.length} patches`)

// ─── Apply patches to file ────────────────────────────────────────────────────

const filePath = path.join(process.cwd(), 'app/naming-graph/enriched-consolidated-DEDUPLICATED.ts')
let text = fs.readFileSync(filePath, 'utf8')

// Find insertion position for each patch
interface PatchWithPos extends Patch {
  insertPos: number
  needsComma: boolean
}

const positioned: PatchWithPos[] = []

for (const patch of patches) {
  // Find the node id — handles "id": "X", id: 'X', id: "X"
  const idPatterns = [
    `"id": "${patch.id}"`,
    `id: '${patch.id}'`,
    `id: "${patch.id}"`,
  ]

  let idPos = -1
  for (const pattern of idPatterns) {
    const pos = text.indexOf(pattern)
    if (pos !== -1) { idPos = pos; break }
  }

  if (idPos === -1) {
    console.warn(`  SKIP (not found): ${patch.id}`)
    continue
  }

  // Verify namingTreatment not already present in this node's text
  // Find the closing \n  } after the id (Wave 1-5 format; all unclassified nodes are Wave 1-5)
  const searchFrom = idPos
  const closingRegex = /\n  \}/g
  closingRegex.lastIndex = searchFrom
  const closingMatch = closingRegex.exec(text)

  if (!closingMatch) {
    console.warn(`  SKIP (no closing found): ${patch.id}`)
    continue
  }

  const closingPos = closingMatch.index

  // Verify namingTreatment not already in this node's range
  const nodeText = text.slice(idPos, closingPos)
  if (nodeText.includes('namingTreatment')) {
    console.warn(`  SKIP (already classified): ${patch.id}`)
    continue
  }

  // Check if last field before closing needs a trailing comma
  const lastFieldChar = text[closingPos - 1]
  const needsComma = lastFieldChar !== ','

  positioned.push({ ...patch, insertPos: closingPos, needsComma })
}

// Sort by position descending so insertions don't shift earlier positions
positioned.sort((a, b) => b.insertPos - a.insertPos)

let applied = 0

for (const p of positioned) {
  const comma = p.needsComma ? ',' : ''
  const insertion = `${comma}\n    namingTreatment: '${p.namingTreatment}',\n    countsAsManagedName: ${p.countsAsManagedName}`
  text = text.slice(0, p.insertPos) + insertion + text.slice(p.insertPos)
  applied++
}

fs.writeFileSync(filePath, text)

// ─── Summary ──────────────────────────────────────────────────────────────────

const byTreatment: Record<string, number> = {}
const managedTrue = positioned.filter(p => p.countsAsManagedName).length
for (const p of positioned) {
  byTreatment[p.namingTreatment] = (byTreatment[p.namingTreatment] ?? 0) + 1
}

console.log(`Applied: ${applied}`)
console.log()
console.log('By namingTreatment:')
Object.entries(byTreatment).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`))
console.log(`  countsAsManagedName=true: ${managedTrue}`)
console.log(`  countsAsManagedName=false: ${applied - managedTrue}`)
