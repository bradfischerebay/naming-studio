// Create clean 876-node merged dataset
const fs = require('fs')

// Read original 831-node file (backup)
const original = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts.backup-20260420', 'utf-8')

// Read Wave 5 file and extract items
const wave5Content = fs.readFileSync('./enriched-wave5-research-items.ts', 'utf-8')

// Extract Wave 5 JSON array (everything between [ and ])
const wave5Match = wave5Content.match(/export const WAVE5_RESEARCH_ITEMS[^[]*\[([\s\S]*)\]/m)
if (!wave5Match) throw new Error('Could not extract Wave 5 array')

const wave5Items = wave5Match[1].trim()

// Remove closing ]; from original
const baseContent = original.replace(/\];?\s*$/, '')

// Build merged file
const merged = baseContent + ',\n  // Wave 5: April 16, 2026 Research Items (44 new items)\n  ' + wave5Items + '\n];\n'

fs.writeFileSync('./enriched-consolidated-876-nodes.ts', merged)

console.log('✅ Created enriched-consolidated-876-nodes.ts')
console.log('📊 Total nodes: 875 (831 + 44)')
console.log('\nVerifying...')

// Count nodes
const nodeCount = (merged.match(/"id":/g) || []).length + (merged.match(/id: "/g) || []).length
console.log(`Actual node count: ${nodeCount}`)
