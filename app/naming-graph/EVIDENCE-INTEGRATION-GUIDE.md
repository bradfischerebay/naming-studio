# Evidence Sidecar Integration Guide

## What is the Evidence Sidecar?

The evidence sidecar (`node-evidence.json`) is a **separate data file** that provides provenance and citations for each node in your naming graph. It connects your 900 eBay programs to their official documentation sources.

**Why separate?**
- Keeps the main graph TypeScript file clean (only structural data)
- Allows evidence to be updated independently
- Enables versioning and audit trails
- Supports multiple sources per program

## Data Structure

### Main Graph (`enriched-consolidated-DEDUPLICATED.ts`)
```typescript
{
  id: "authenticity-guarantee",
  name: "Authenticity Guarantee",
  tier: "Product Line",
  category: "Trust & Safety",
  // ... other metadata
}
```

### Evidence Sidecar (`node-evidence.json`)
```json
{
  "id": "ev-authenticity-guarantee",
  "node_id": "authenticity-guarantee",
  "canonical_name": "Authenticity Guarantee",
  "sources": [
    {
      "url": "https://www.ebay.com/authenticity-guarantee",
      "title": "eBay Authenticity Guarantee",
      "source_type": "ebay_official",
      "captured_at": "2024",
      "provenance": "Batch 1 systematic research",
      "notes": "Multi-category authentication service"
    }
  ],
  "confidence": "high",
  "mapping_method": "automated",
  "mapped_at": "2026-04-21T01:15:42.183Z",
  "mapped_by": "batch-research"
}
```

## Integration Approaches

### Option 1: Runtime Join (Recommended)
Load both files separately and join on `node_id`:

```typescript
import graph from './enriched-consolidated-DEDUPLICATED'
import evidence from './node-evidence.json'

const evidenceMap = new Map(
  evidence.map(ev => [ev.node_id, ev])
)

const enrichedGraph = graph.nodes.map(node => ({
  ...node,
  evidence: evidenceMap.get(node.id)
}))
```

### Option 2: Pre-merge Script
Create a build-time script that merges evidence into the graph:

```javascript
// merge-evidence.js
const fs = require('fs')

const graph = require('./enriched-consolidated-DEDUPLICATED.ts')
const evidence = require('./node-evidence.json')

const evidenceMap = new Map(evidence.map(ev => [ev.node_id, ev]))

const merged = graph.nodes.map(node => ({
  ...node,
  evidence: evidenceMap.get(node.id) || null
}))

fs.writeFileSync('./graph-with-evidence.json', JSON.stringify(merged, null, 2))
```

### Option 3: API Endpoint
Create an API that joins data on-demand:

```typescript
// app/api/graph/[nodeId]/route.ts
export async function GET(req, { params }) {
  const node = graph.nodes.find(n => n.id === params.nodeId)
  const ev = evidence.find(e => e.node_id === params.nodeId)
  
  return Response.json({ ...node, evidence: ev })
}
```

## Coverage Stats

**Final Campaign Results:**
- Total Graph Nodes: 900
- Evidence Records: 930
- Coverage: 103.3% (some nodes have multiple sources)
- Source Types:
  - eBay Official: ~750 (81%)
  - Press Releases: ~120 (13%)
  - Secondary Sources: ~60 (6%)

## UI Display Examples

### Node Detail View
```
[Node Card]
  Authenticity Guarantee
  Tier: Product Line | Category: Trust & Safety
  
  📚 Evidence (High Confidence)
  ✓ eBay Authenticity Guarantee
    https://www.ebay.com/authenticity-guarantee
    Source: eBay Official | 2024
    
  ℹ️ Multi-category authentication service
  🔍 Provenance: Batch 1 systematic research
```

### Graph Visualization
- Color nodes by evidence confidence (high/medium/low)
- Show badge/icon for nodes with multiple sources
- Tooltip on hover showing source count
- Click to expand evidence panel

### Evidence Browser
- Filterable list of all 930 evidence records
- Group by source type, confidence, batch
- Export citations for specific nodes
- Audit trail view

## Prompt for v0

Here's a prompt you can use with v0.dev:

---

**v0 Prompt:**

Create a React component that displays evidence citations for nodes in my eBay naming graph.

**Context:**
I have a graph of 900 eBay programs (nodes) and a separate evidence sidecar with 930 citation records. Each node can have 0-N evidence sources proving its existence.

**Data Structure:**
```typescript
interface NodeEvidence {
  id: string              // "ev-authenticity-guarantee"
  node_id: string         // Links to graph node ID
  canonical_name: string  // "Authenticity Guarantee"
  sources: {
    url: string
    title: string
    source_type: 'ebay_official' | 'press_release' | 'secondary_source'
    captured_at: string   // Year or date
    provenance: string    // "Batch 1 systematic research"
    notes: string
  }[]
  confidence: 'high' | 'medium' | 'low'
  mapping_method: 'manual' | 'automated'
  mapped_at: string
  mapped_by: string
}
```

**Component Requirements:**

1. **Evidence Card Component** - Display all sources for a single node:
   - Header: Program name + confidence badge
   - List of sources with clickable URLs
   - Source type icons (official/press/secondary)
   - Expandable notes section
   - Provenance footer (when/how it was mapped)

2. **Evidence Browser** - Filterable table of all evidence:
   - Columns: Program Name | Sources Count | Confidence | Last Updated
   - Filters: Source Type, Confidence Level, Batch Number
   - Search by program name or URL
   - Export to CSV

3. **Coverage Dashboard** - Stats visualization:
   - Total coverage percentage (930/900 = 103%)
   - Breakdown by source type (pie chart)
   - Confidence distribution (bar chart)
   - Timeline of batch research progress

**Design:**
- Modern, clean UI with Tailwind CSS
- Use shadcn/ui components (Card, Badge, Table, Dialog)
- Responsive layout
- Dark mode support

**Example Usage:**
```tsx
<EvidenceCard nodeId="authenticity-guarantee" />
<EvidenceBrowser evidence={evidenceData} />
<CoverageDashboard evidence={evidenceData} />
```

---

## Next Steps

1. **Choose integration approach** (runtime join recommended)
2. **Build UI components** (use v0 prompt above)
3. **Add evidence panel** to your graph visualization
4. **Create API endpoints** for evidence lookup
5. **Export capabilities** for citations/references
