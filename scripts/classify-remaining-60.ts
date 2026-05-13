#!/usr/bin/env tsx
/**
 * classify-remaining-60.ts
 *
 * Classifies the 60 unclassified nodes that had no V2 enrichment data.
 * These fall into two groups:
 *   1. Structural umbrella / status labels → descriptive_label
 *   2. Multi-market / global variant nodes → functional_label
 *
 * Safe to re-run: skips nodes that already have namingTreatment.
 */

import * as fs from 'fs'
import * as path from 'path'
import { ENRICHED_PROGRAMS } from '../app/naming-graph/enriched-consolidated-DEDUPLICATED'

const DESCRIPTIVE_LABEL_IDS = new Set([
  'acquisitions', 'partnerships', 'mobile', 'loyalty', 'corporate', 'fashion',
  'above-standard-status', 'below-standard-status',
])

const patches: Array<{ id: string; namingTreatment: string; countsAsManagedName: boolean }> = []

for (const node of ENRICHED_PROGRAMS) {
  if ((node as any).namingTreatment) continue
  const treatment = DESCRIPTIVE_LABEL_IDS.has(node.id) ? 'descriptive_label' : 'functional_label'
  patches.push({ id: node.id, namingTreatment: treatment, countsAsManagedName: false })
}

console.log(`Remaining 60 pass: ${patches.length} nodes to classify`)
for (const p of patches) {
  console.log(`  ${p.id}: ${p.namingTreatment}`)
}

const filePath = path.join(process.cwd(), 'app/naming-graph/enriched-consolidated-DEDUPLICATED.ts')
let text = fs.readFileSync(filePath, 'utf8')

interface Positioned {
  id: string
  namingTreatment: string
  countsAsManagedName: boolean
  insertPos: number
  needsComma: boolean
  indent: string
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

  const nextIdMatch = /\n\s+(?:"id"|id)\s*[:]\s*["']/g
  nextIdMatch.lastIndex = idPos + 1
  const nextId = nextIdMatch.exec(text)
  const searchBound = nextId ? nextId.index : text.length

  const closingPatterns = [
    /\n  }/g,
    /\n    },/g,
    /\n},/g,
    /\n}/g,
  ]

  let closingPos = -1

  for (const re of closingPatterns) {
    re.lastIndex = idPos
    const m = re.exec(text)
    if (m && m.index < searchBound && m.index - idPos < 5000) {
      closingPos = m.index
      break
    }
  }

  if (closingPos === -1) {
    console.warn(`  NO CLOSING FOUND: ${patch.id}`)
    continue
  }

  const nodeText = text.slice(idPos, closingPos)
  if (nodeText.includes('namingTreatment')) continue

  const idLineStart = text.lastIndexOf('\n', idPos) + 1
  const fieldIndent = text.slice(idLineStart, idPos).match(/^(\s+)/)?.[1] ?? '    '
  const needsComma = text[closingPos - 1] !== ','

  positioned.push({
    ...patch,
    insertPos: closingPos,
    needsComma,
    indent: fieldIndent,
  })
}

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

console.log(`\nApplied: ${applied}`)
Object.entries(byTreatment).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`))
