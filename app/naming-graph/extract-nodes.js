// Extract GraphNode array from TypeScript and save as JSON
const fs = require('fs')

const tsContent = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8')

// Find the array start and end
const arrayStart = tsContent.indexOf('export const ENRICHED_PROGRAMS: GraphNode[] = [')
const arrayContentStart = tsContent.indexOf('[', arrayStart)
let bracketCount = 0
let arrayEnd = -1

for (let i = arrayContentStart; i < tsContent.length; i++) {
  if (tsContent[i] === '[') bracketCount++
  if (tsContent[i] === ']') {
    bracketCount--
    if (bracketCount === 0) {
      arrayEnd = i + 1
      break
    }
  }
}

const arrayJson = tsContent.substring(arrayContentStart, arrayEnd)
fs.writeFileSync('./graph-nodes.json', arrayJson)

console.log('✅ Extracted GraphNode array to graph-nodes.json')
