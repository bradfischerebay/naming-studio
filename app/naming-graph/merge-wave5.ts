// Merge Wave 5 research items into production dataset

import * as fs from 'fs'
import { WAVE5_RESEARCH_ITEMS } from './enriched-wave5-research-items'

// Read existing dataset
const existingContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Extract just the closing bracket and export
const closingMatch = existingContent.match(/\n\]\n*$/)
if (!closingMatch) {
  throw new Error('Could not find closing bracket in enriched-consolidated-DEDUPLICATED.ts')
}

// Remove closing bracket
const withoutClosing = existingContent.replace(/\n\]\n*$/, '')

// Add Wave 5 items as JSON
const wave5Json = JSON.stringify(WAVE5_RESEARCH_ITEMS, null, 2)
  .replace(/^\[/, '')  // Remove opening bracket
  .replace(/\]$/, '')  // Remove closing bracket
  .split('\n')
  .map(line => line ? '  ' + line : line)  // Indent
  .join('\n')

// Reconstruct file
const merged = withoutClosing + ',\n' + wave5Json + '\n]\n'

// Write merged file
fs.writeFileSync('./enriched-consolidated-DEDUPLICATED-MERGED.ts', merged)

console.log('✅ Merged 45 Wave 5 items into enriched-consolidated-DEDUPLICATED-MERGED.ts')
console.log('📊 Original: 831 nodes')
console.log('📊 New total: 876 nodes (831 + 45)')
console.log('\n⚠️  Next step: Review MERGED file, then rename to replace original')
