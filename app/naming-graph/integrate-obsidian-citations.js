// Phase 3: Integrate Obsidian Citations into Evidence Sidecar
// Extract 28 footnote citations from eBay Naming Graph V2.md and merge into node-evidence.json

const fs = require('fs')

console.log('🔍 eBay Naming Graph - Obsidian Citations Integration (Phase 3)\n')

// Parse citation text to extract structured data
function parseCitation(citationText) {
  // Format: [^N]: Source type | "Title" | URL(s) | Accessed/Verified: DATE

  // Extract source type
  const sourceTypeMatch = citationText.match(/^\[\^\d+\]: ([^|]+) \|/)
  const sourceType = sourceTypeMatch ? sourceTypeMatch[1].trim() : 'unknown'

  // Extract title (may be multiple titles separated by " + ")
  const titleMatch = citationText.match(/\| "([^"]+)"/)
  const titlePart = titleMatch ? titleMatch[1].trim() : citationText.split('|')[1]?.trim() || ''
  // If title contains " + ", take the first title
  const title = titlePart.includes(' + ') ? titlePart.split(' + ')[0].trim() : titlePart

  // Extract URLs (may be multiple separated by +)
  const urlMatch = citationText.match(/\| (https?:\/\/[^\|]+) \|/)
  const urlsText = urlMatch ? urlMatch[1].trim() : ''
  const urls = urlsText.split(' + ').map(url => url.trim()).filter(url => url.startsWith('http'))

  // Extract date
  const dateMatch = citationText.match(/(Accessed|Verified): (.+)$/)
  const date = dateMatch ? dateMatch[2].trim() : '2026-04-20'

  return { sourceType, title, urls, date }
}

function inferSourceTypeFromText(sourceTypeText) {
  const text = sourceTypeText.toLowerCase()
  if (text.includes('official product page') || text.includes('official help page')) return 'ebay_official'
  if (text.includes('official program page') || text.includes('official help center')) return 'ebay_official'
  if (text.includes('official ebay page')) return 'ebay_official'
  if (text.includes('official seller center') || text.includes('community announcement')) return 'ebay_official'
  if (text.includes('investor relations') || text.includes('press release')) return 'press_release'
  if (text.includes('official ebay news')) return 'press_release'
  if (text.includes('ebay innovation blog')) return 'press_release'
  if (text.includes('ebay community archive')) return 'ebay_official'
  if (text.includes('secondary source')) return 'secondary_source'
  return 'manual_verification'
}

function inferConfidence(sourceType) {
  if (sourceType === 'ebay_official') return 'high'
  if (sourceType === 'press_release') return 'medium'
  if (sourceType === 'secondary_source') return 'medium'
  return 'medium'
}

// Map citation to node ID by searching V2.md for inline [^N] references
function findNodeIdForCitation(v2Content, citationNumber) {
  // Find all lines that reference this citation
  const citationRef = `[^${citationNumber}]`
  const lines = v2Content.split('\n')

  const contextLines = []
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(citationRef)) {
      contextLines.push({ lineNum: i, text: lines[i] })
    }
  }

  if (contextLines.length === 0) return null

  // Extract program name from context (usually before the citation)
  // Pattern: "**[T1]** ProgramName [^N]" or "**[Product]** ProgramName [^N]"
  const firstContext = contextLines[0].text

  // Try to extract between ** markers
  const nameMatch = firstContext.match(/\*\*\[.*?\]\*\*\s+([^[]+)\s+\[\^/)
  if (nameMatch) {
    return nameMatch[1].trim()
  }

  // Fallback: try to get text before citation
  const beforeCitation = firstContext.split(citationRef)[0]
  const lastPart = beforeCitation.split('**').pop()
  return lastPart ? lastPart.trim() : null
}

function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\(.*?\)/g, '') // Remove parentheses content
    .replace(/[&\/]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Load V2.md file
console.log('📖 Loading eBay Naming Graph V2.md...')
const v2Content = fs.readFileSync('/Users/bradfischer/Obsidian/Claude Brain/Knowledge/eBay Naming Graph - Complete Hierarchy V2.md', 'utf-8')

// Extract citations from V2.md
const citationPattern = /^\[\^(\d+)\]: (.+)$/gm
const citations = []
let match

while ((match = citationPattern.exec(v2Content)) !== null) {
  const citationNum = match[1]
  const citationText = match[2]

  const parsed = parseCitation(match[0])
  const sourceType = inferSourceTypeFromText(parsed.sourceType)
  const programName = findNodeIdForCitation(v2Content, citationNum)

  citations.push({
    number: citationNum,
    programName,
    sourceType,
    title: parsed.title,
    urls: parsed.urls,
    capturedAt: parsed.date,
    rawText: citationText
  })
}

console.log(`✅ Extracted ${citations.length} citations from V2.md\n`)

// Load existing evidence sidecar
console.log('📂 Loading existing node-evidence.json...')
const existingEvidence = JSON.parse(fs.readFileSync('./node-evidence.json', 'utf-8'))
console.log(`✅ Loaded ${existingEvidence.length} existing evidence records\n`)

// Load Wave 5 file to verify node IDs exist
const wave5Content = fs.readFileSync('./enriched-wave5-research-items.ts', 'utf-8')

// Load production graph for broader ID verification
const graphContent = fs.readFileSync('./enriched-consolidated-944-nodes.ts', 'utf-8')

// Manual mappings for citations that need special handling
const manualCitationMappings = {
  // Citation [^1]: Authenticity Guarantee for Trading Cards
  '1': 'authenticity-guarantee',
  // Citation [^2]: PSA Vault / eBay Vault (use ebay-vault as it's in the graph)
  '2': 'ebay-vault',
  // Citation [^3]: Authenticity Guarantee (master)
  '3': 'authenticity-guarantee',
  // Citation [^4]: Authenticity Guarantee for Fine Jewelry
  '4': 'authenticity-guarantee',
  // Citation [^5]: Authenticity Guarantee for Sneakers
  '5': 'authenticity-guarantee',
  // Citation [^6]: Circular Fashion Fund
  '6': 'circular-fashion-fund',
  // Citation [^7]: eBay Certified Open Box
  '7': 'certified-open-box',
  // Citation [^8]: Seller Hub
  '8': 'seller-hub',
  // Citation [^9]: Promoted Listings
  '9': 'promoted-listings',
  // Citation [^10]: TCGplayer
  '10': 'tcgplayer',
  // Citation [^11]: COMC
  '11': 'comc',
  // Citation [^12]: Butterfield & Butterfield
  '12': 'butterfield-butterfield',
  // Citation [^13]: Kruse International
  '13': 'kruse-international',
  // Citation [^14]: eBay Fashion App
  '14': 'ebay-fashion-app',
  // Citation [^15]: SafeHarbor
  '15': 'safeharbor',
  // Citation [^16]: Feedback Forum
  '16': 'feedback-forum',
  // Citation [^17]: Automated Promoted Listings Campaigns
  '17': 'automated-promoted-listings-campaigns',
  // Citation [^18]: Magical Bulk Listing Tool
  '18': 'magical-bulk-listing-tool',
  // Citation [^19]: About Me
  '19': 'about-me',
  // Citation [^20]: Billpoint
  '20': 'billpoint',
  // Citation [^21]: Find It On eBay (Android)
  '21': 'find-it-on-ebay',
  // Citation [^22]: Things.People.Love / eBay Playbook / eBay Evo
  '22': 'things-people-love', // Will create multiple records from this
  // Citation [^23]: Mission Fish
  '23': 'mission-fish-seller-account',
  // Citation [^24]: Techstars
  '24': 'techstars-future-of-ecommerce',
  // Citation [^25]: Tise
  '25': 'tise',
  // Citation [^26]: KnownOrigin
  '26': 'knownorigin',
}

// Track stats
const report = {
  total_citations: citations.length,
  matched: 0,
  merged_into_existing: 0,
  created_new: 0,
  unmatched: [],
  multi_node_citations: []
}

// Build map of existing evidence by node_id
const evidenceByNodeId = new Map(
  existingEvidence.map(ev => [ev.node_id, ev])
)

console.log('🗺️  Mapping citations to node IDs...\n')

for (const citation of citations) {
  // Use manual mapping if available
  let nodeId = manualCitationMappings[citation.number]

  if (!nodeId && citation.programName) {
    nodeId = toKebabCase(citation.programName)
  }

  if (!nodeId) {
    report.unmatched.push({
      citation_number: citation.number,
      title: citation.title,
      reason: 'Could not determine node ID from V2.md context'
    })
    continue
  }

  // Verify node exists in production graph (check both Wave 5 and full graph)
  // Note: Most major programs are in the production graph, not Wave 5
  // Wave 5 uses TypeScript format: id: "node-id"
  // Production graph uses JSON format: "id": "node-id"
  const inWave5 = wave5Content.includes(`id: "${nodeId}"`)
  const inProductionGraph = graphContent.includes(`"id": "${nodeId}"`)
  const nodeExistsInGraph = inWave5 || inProductionGraph

  if (!nodeExistsInGraph) {
    report.unmatched.push({
      citation_number: citation.number,
      title: citation.title,
      expected_id: nodeId,
      reason: 'Node ID not found in production graph or Wave 5'
    })
    continue
  }

  report.matched++

  // Check if evidence record already exists
  if (evidenceByNodeId.has(nodeId)) {
    // Merge citation into existing record
    const existing = evidenceByNodeId.get(nodeId)

    // Add new sources (avoiding duplicates)
    for (const url of citation.urls) {
      const urlExists = existing.sources.some(s => s.url === url)
      if (!urlExists) {
        existing.sources.push({
          url,
          title: citation.title,
          source_type: citation.sourceType,
          captured_at: citation.capturedAt,
          provenance: 'Obsidian V2.md footnote citations (28 citations)',
          notes: ''
        })
      }
    }

    report.merged_into_existing++
  } else {
    // Create new evidence record
    const newEvidence = {
      id: `ev-${nodeId}`,
      node_id: nodeId,
      canonical_name: citation.programName || citation.title,
      sources: citation.urls.map(url => ({
        url,
        title: citation.title,
        source_type: citation.sourceType,
        captured_at: citation.capturedAt,
        provenance: 'Obsidian V2.md footnote citations (28 citations)',
        notes: ''
      })),
      confidence: inferConfidence(citation.sourceType),
      mapping_method: 'manual',
      mapped_at: new Date().toISOString(),
      mapped_by: 'automated'
    }

    existingEvidence.push(newEvidence)
    evidenceByNodeId.set(nodeId, newEvidence)
    report.created_new++
  }

  // Special handling for citation [^22]: eBay Evo / eBay Playbook / Things.People.Love
  if (citation.number === '22') {
    const multiNodeIds = ['ebay-evo', 'ebay-playbook']
    report.multi_node_citations.push({
      citation: citation.number,
      nodes: ['things-people-love', ...multiNodeIds]
    })

    for (const extraNodeId of multiNodeIds) {
      if (graphContent.includes(`id: "${extraNodeId}"`)) {
        if (evidenceByNodeId.has(extraNodeId)) {
          const existing = evidenceByNodeId.get(extraNodeId)
          for (const url of citation.urls) {
            const urlExists = existing.sources.some(s => s.url === url)
            if (!urlExists) {
              existing.sources.push({
                url,
                title: citation.title,
                source_type: citation.sourceType,
                captured_at: citation.capturedAt,
                provenance: 'Obsidian V2.md footnote citations (shared citation [^22])',
                notes: 'Shared citation covering eBay Evo brand evolution initiative'
              })
            }
          }
        } else {
          existingEvidence.push({
            id: `ev-${extraNodeId}`,
            node_id: extraNodeId,
            canonical_name: extraNodeId === 'ebay-evo' ? 'eBay Evo' : 'eBay Playbook',
            sources: citation.urls.map(url => ({
              url,
              title: citation.title,
              source_type: citation.sourceType,
              captured_at: citation.capturedAt,
              provenance: 'Obsidian V2.md footnote citations (shared citation [^22])',
              notes: 'Shared citation covering eBay Evo brand evolution initiative'
            })),
            confidence: inferConfidence(citation.sourceType),
            mapping_method: 'manual',
            mapped_at: new Date().toISOString(),
            mapped_by: 'automated'
          })
          evidenceByNodeId.set(extraNodeId, existingEvidence[existingEvidence.length - 1])
          report.created_new++
        }
      }
    }
  }
}

// Print summary
console.log('📊 PHASE 3 INTEGRATION REPORT\n')
console.log('─'.repeat(70))
console.log(`Total citations extracted:   ${report.total_citations}`)
console.log(`Successfully matched:        ${report.matched}`)
console.log(`Merged into existing:        ${report.merged_into_existing}`)
console.log(`Created new records:         ${report.created_new}`)
console.log(`Unmatched citations:         ${report.unmatched.length}`)
console.log()

const totalEvidence = existingEvidence.length
const coverage = ((totalEvidence / 944) * 100).toFixed(1)

console.log(`📈 Updated Coverage: ${totalEvidence}/944 nodes (${coverage}%)`)
console.log('─'.repeat(70))
console.log()

if (report.unmatched.length > 0) {
  console.log('⚠️  UNMATCHED CITATIONS:')
  report.unmatched.forEach(item => {
    console.log(`  [^${item.citation_number}] ${item.title}`)
    console.log(`    → ${item.reason}`)
  })
  console.log()
}

if (report.multi_node_citations.length > 0) {
  console.log('🔗 MULTI-NODE CITATIONS:')
  report.multi_node_citations.forEach(item => {
    console.log(`  [^${item.citation}] mapped to ${item.nodes.length} nodes:`)
    item.nodes.forEach(nodeId => console.log(`    - ${nodeId}`))
  })
  console.log()
}

// Save updated evidence sidecar
console.log('💾 Saving updated node-evidence.json...')
fs.writeFileSync('./node-evidence.json', JSON.stringify(existingEvidence, null, 2))
console.log(`✅ Saved ${existingEvidence.length} evidence records`)

// Save integration report
const reportData = {
  ...report,
  generated_at: new Date().toISOString(),
  phase: 'Phase 3: Obsidian Citations Integration',
  graph_nodes_total: 944,
  evidence_coverage_percent: parseFloat(coverage),
  evidence_total: totalEvidence,
  phase2_baseline: 44,
  phase3_delta: totalEvidence - 44
}

fs.writeFileSync('./phase3-integration-report.json', JSON.stringify(reportData, null, 2))
console.log('✅ Saved integration report → phase3-integration-report.json')

console.log(`\n✨ Phase 3 complete! ${totalEvidence} total evidence records (${coverage}% coverage)\n`)
