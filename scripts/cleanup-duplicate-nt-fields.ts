#!/usr/bin/env tsx
/**
 * cleanup-duplicate-nt-fields.ts
 *
 * Removes duplicate namingTreatment / countsAsManagedName fields from nodes
 * that received multiple insertions due to a bug in the bulk classification script.
 *
 * Strategy:
 * - Load the file as text
 * - For each node (identified by id), find all occurrences of namingTreatment / countsAsManagedName
 * - If a node has more than one occurrence, remove the extras (keep last — matches TS parse behavior)
 */

import * as fs from 'fs'
import * as path from 'path'

const filePath = path.join(process.cwd(), 'app/naming-graph/enriched-consolidated-DEDUPLICATED.ts')
let text = fs.readFileSync(filePath, 'utf8')

// Match consecutive nt+cam pairs:
// namingTreatment: 'value',\n    countsAsManagedName: bool[,]
// When they appear back-to-back (possibly with comma at end of cam line), we keep only the last set.

// Strategy: remove any namingTreatment line immediately followed by countsAsManagedName line
// that is ITSELF immediately followed by another namingTreatment line.
// i.e., remove the first of any consecutive nt+cam pair when there's another one right after.

const NT_CAM_PAIR = /\n    namingTreatment: '[^']+',\n    countsAsManagedName: (?:true|false)[,]?(?=\n    namingTreatment:)/g

let count = 0
let modified = text.replace(NT_CAM_PAIR, () => {
  count++
  return ''  // remove the first pair; the next one remains
})

// Run multiple times in case of 3+ occurrences
while (count > 0) {
  count = 0
  modified = modified.replace(NT_CAM_PAIR, () => { count++; return '' })
}

// Also remove nt+cam pairs that appear before the closing brace AND are duplicated
// with a trailing comma on cam that shouldn't be there for the last field
// Fix: if countsAsManagedName: bool, (trailing comma) is followed immediately by
// \n  } or \n    } (closing brace), remove the trailing comma
modified = modified.replace(/(countsAsManagedName: (?:true|false)),(\n\s*\})/g, '$1$2')

fs.writeFileSync(filePath, modified)
console.log('Cleanup complete. File written.')

// Verify by counting
const finalText = fs.readFileSync(filePath, 'utf8')
const ntLines = (finalText.match(/namingTreatment:/g) || []).length
console.log(`namingTreatment: lines in file: ${ntLines}`)
