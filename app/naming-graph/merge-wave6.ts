// Merge Wave 6 new candidates into production dataset
// Text-extraction approach: reads Wave 6 source as text to avoid import-chain complications.
// Wave 6 uses the extended GraphNode (released, sourceUrl, relationships) — MERGED interface
// already extended to match before running this script.

import * as fs from 'fs'
import * as path from 'path'

// Run from repo root: npx tsx app/naming-graph/merge-wave6.ts
const dir = path.join(process.cwd(), 'app/naming-graph')

// ── 1. Read Wave 6 source and extract the node array content ─────────────────
const wave6Source = fs.readFileSync(path.join(dir, 'enriched-wave6-new-candidates.ts'), 'utf-8')

// The export is: export const WAVE6_NEW_CANDIDATES: GraphNode[] = [
// We need everything between the outer `[` and the closing `]`
const arrayMatch = wave6Source.match(/export const WAVE6_NEW_CANDIDATES[^=]*=\s*\[(.+)\s*\]\s*$/s)
if (!arrayMatch) {
  throw new Error('Could not locate WAVE6_NEW_CANDIDATES array in source file')
}

// Strip leading/trailing whitespace from the extracted array body
let wave6Body = arrayMatch[1].trim()

// Remove trailing comma if present (safe to add one before the final `];`)
wave6Body = wave6Body.replace(/,\s*$/, '')

// Indent each line by 2 spaces to match the registry format
const wave6Indented = wave6Body
  .split('\n')
  .map(line => line ? '  ' + line : line)
  .join('\n')

// ── 2. Read MERGED file ───────────────────────────────────────────────────────
const mergedPath = path.join(dir, 'enriched-consolidated-DEDUPLICATED-MERGED.ts')
const mergedContent = fs.readFileSync(mergedPath, 'utf-8')

// Strip the closing `];` (and any trailing whitespace/newlines)
const withoutClosing = mergedContent.replace(/\];\s*$/, '')

// ── 3. Count nodes before and verify strip worked ─────────────────────────────
const nodesBefore = (mergedContent.match(/["']id["']:\s*["']/g) || []).length
  + (mergedContent.match(/^\s+id:\s*["']/gm) || []).length

console.log(`📊 Nodes before merge: ${nodesBefore}`)
console.log(`➕ Wave 6 nodes to add: 66`)

// ── 4. Reconstruct and write ──────────────────────────────────────────────────
const merged = withoutClosing + ',\n\n  // ── Wave 6: April 29, 2026 — Overnight Run + Follow-Up Batches 01–05 ───────────\n\n' + wave6Indented + '\n];\n'

fs.writeFileSync(mergedPath, merged)

// ── 5. Verify count ───────────────────────────────────────────────────────────
const newContent = fs.readFileSync(mergedPath, 'utf-8')
const nodesAfter = (newContent.match(/["']id["']:\s*["']/g) || []).length
  + (newContent.match(/^\s+id:\s*["']/gm) || []).length

console.log(`📊 Nodes after merge: ${nodesAfter}`)
console.log(`✅ Wave 6 merged into enriched-consolidated-DEDUPLICATED-MERGED.ts`)
console.log(`📍 Next step: review MERGED file, then coordinate rename to replace production DEDUPLICATED.ts`)
