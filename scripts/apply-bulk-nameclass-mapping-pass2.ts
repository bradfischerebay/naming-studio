#!/usr/bin/env tsx
/**
 * apply-bulk-nameclass-mapping-pass2.ts
 *
 * Second pass for nodes that were missed in pass 1.
 * These nodes close with \n}, (0-space) instead of \n  } (2-space).
 * Handles both Wave 6 format nodes and pre-Wave-6 nodes with 0-space closings.
 *
 * Safe to re-run: skips nodes that already have namingTreatment.
 */

import * as fs from 'fs'
import * as path from 'path'
import { ENRICHED_PROGRAMS } from '../app/naming-graph/enriched-consolidated-DEDUPLICATED'
import { ENRICHMENT_V2_COMPLETE } from '../app/naming-graph/enriched-v2-COMPLETE'

const v2Map = new Map((ENRICHMENT_V2_COMPLETE as any[]).map((e: any) => [e.id, e]))

const NAME_CLASS_MAP: Record<string, string> = {
  'Product Name':    'owned_marketing_name',
  'Functional Label': 'functional_label',
  'Internal Term':   'internal_label',
  'Legacy Residue':  'unknown',
}

const patches = []
for (const node of ENRICHED_PROGRAMS) {
  if ((node as any).namingTreatment) continue
  const v2 = v2Map.get(node.id) as any
  if (!v2?.nameClass) continue
  let treatment: string
  if (v2.nameClass === 'Feature Name') {
    treatment = v2.isProductName === true ? 'owned_marketing_name' : 'functional_label'
  } else {
    const mapped = NAME_CLASS_MAP[v2.nameClass]
    if (!mapped) continue
    treatment = mapped
  }
  const isInactive = node.status === 'legacy' || node.status === 'renamed'
  const countsAsManagedName = treatment === 'owned_marketing_name' && !isInactive
  patches.push({ id: node.id, namingTreatment: treatment, countsAsManagedName })
}

console.log(`Pass 2: ${patches.length} nodes still need classification`)

const filePath = path.join(process.cwd(), 'app/naming-graph/enriched-consolidated-DEDUPLICATED.ts')
let text = fs.readFileSync(filePath, 'utf8')

interface Positioned {
  id: string
  namingTreatment: string
  countsAsManagedName: boolean
  insertPos: number
  needsComma: boolean
  indent: string  // The field indentation to use for new fields
}

const positioned: Positioned[] = []

for (const patch of patches) {
  const idPatterns = [
    `"id": "${patch.id}"`,
    `id: '${patch.id}'`,
    `id: "${patch.id}"`,
  ]

  let idPos = -1
  for (const pat of idPatterns) {
    const p = text.indexOf(pat)
    if (p !== -1) { idPos = p; break }
  }

  if (idPos === -1) {
    console.warn(`  NOT FOUND: ${patch.id}`)
    continue
  }

  // Find the next node's id (or end of array) to bound our search
  const nextIdMatch = /\n\s+(?:"id"|id)\s*[:]\s*["']/g
  nextIdMatch.lastIndex = idPos + 1
  const nextId = nextIdMatch.exec(text)
  const searchBound = nextId ? nextId.index : text.length

  // Look for EITHER \n  } or \n}, within the node's range
  // The closing brace ends the node.
  // Try multiple patterns in order of specificity:
  const closingPatterns = [
    /\n  }/g,   // 2-space indent (Wave 1-5)
    /\n    },/g, // 4-space indent with comma (Wave 6 unclassified nodes)
    /\n},/g,    // 0-space with comma (Wave 6 classified / mixed)
    /\n}/g,     // 0-space no comma (last node)
  ]

  let closingPos = -1
  let closingChar = ''

  for (const re of closingPatterns) {
    re.lastIndex = idPos
    const m = re.exec(text)
    if (m && m.index < searchBound) {
      // Verify this looks like a real closing: not inside a string
      // Simple heuristic: the closing should be within reasonable distance
      if (m.index - idPos < 5000) {
        closingPos = m.index
        closingChar = m[0]
        break
      }
    }
  }

  if (closingPos === -1) {
    console.warn(`  NO CLOSING FOUND: ${patch.id}`)
    continue
  }

  const nodeText = text.slice(idPos, closingPos)
  if (nodeText.includes('namingTreatment')) {
    // Already classified — skip silently
    continue
  }

  // Determine field indentation based on how the id field is indented
  // If id is at 4-space (Wave 1-5 double-quoted), use 4-space for fields
  // If id is at 6-space (Wave 6 style), use 6-space for fields
  const idLineStart = text.lastIndexOf('\n', idPos) + 1
  const idLineIndent = text.slice(idLineStart, idPos).match(/^(\s+)/)?.[1] ?? '    '
  // Field indent = same as id field indent
  const fieldIndent = idLineIndent

  const lastFieldChar = text[closingPos - 1]
  const needsComma = lastFieldChar !== ','

  positioned.push({
    ...patch,
    insertPos: closingPos,
    needsComma,
    indent: fieldIndent,
  })
}

// Sort descending by insertPos to avoid offset drift
positioned.sort((a, b) => b.insertPos - a.insertPos)

let applied = 0
for (const p of positioned) {
  const comma = p.needsComma ? ',' : ''
  const insertion = `${comma}\n${p.indent}namingTreatment: '${p.namingTreatment}',\n${p.indent}countsAsManagedName: ${p.countsAsManagedName}`
  text = text.slice(0, p.insertPos) + insertion + text.slice(p.insertPos)
  applied++
}

fs.writeFileSync(filePath, text)

const byTreatment: Record<string, number> = {}
for (const p of positioned) {
  byTreatment[p.namingTreatment] = (byTreatment[p.namingTreatment] ?? 0) + 1
}

console.log(`Applied: ${applied}`)
Object.entries(byTreatment).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`))
