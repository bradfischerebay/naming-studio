# v0 Prompt — eBay Naming Knowledge Graph

Paste this into v0.dev to build the graph component.

---

## Prompt

Build an interactive knowledge graph visualization for eBay's product naming portfolio using D3.js force simulation. The component should fetch data from `/naming-graph-data.json` and render a rich multi-relationship graph.

### Data schema

```typescript
// Node
{
  id: string                // kebab-case identifier
  name: string              // display name
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "product" | "program" | "feature" | "platform" | "organization" | "publication" | "event" | "campaign" | "vertical" | "variant" | "legal"
  status: "current" | "legacy" | "renamed"
  parent?: string           // parent node id
  market?: string | string[] // "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global"
  year?: number             // launch year
  desc: string              // description for tooltip
  namingTreatment?: "owned_marketing_name" | "functional_label" | "descriptive_label" | "internal_label" | "partner_brand" | "unknown"
  countsAsManagedName?: boolean  // true = part of active portfolio
  relationshipCount: number // total lateral connections
}

// Link
{
  source: string   // node id
  target: string   // node id
  type: "parent" | "integrates_with" | "related_to" | "depends_on" | "competes_with" | "replaced_by" | "replaces" | "renamed_to" | "renamed_from"
  year?: number
  desc?: string
}
```

### Stats (for context)
- 1,152 nodes total (1,017 from core registry + 135 supplemental umbrella/parent nodes)
- 7,812 links: 1,116 parent-child + 6,696 lateral relationships
- Link type breakdown: integrates_with (3,430), related_to (1,973), depends_on (1,055), competes_with (71), replaced_by/replaces (61), rename chains (106)
- 171 nodes are active managed names (countsAsManagedName=true)
- 192 nodes are owned_marketing_name treatment

### Requirements

**Graph rendering:**
- D3 force-directed layout with collision detection
- Node size based on tier (master=60, umbrella=40, product=28, program=24, feature=18, other=14)
- Node color by type: masterbrand=#e53238, category=#0064d2, advertising=#f5af02, trust=#86b817, impact=#00a3e0, developer=#9b59b6, regional=#ff6b6b
- Legacy/renamed nodes: gray (#888888), 50% opacity
- Link color and style by type:
  - parent: #cccccc, thin solid
  - integrates_with: #0064d2, medium solid
  - related_to: #9b59b6, thin dashed
  - competes_with: #ff6b6b, dashed
  - depends_on: #86b817, solid
  - renamed_to/renamed_from: #f5af02, dashed
  - replaced_by/replaces: #e53238, dashed

**Interaction:**
- Zoom + pan (d3.zoom)
- Click node: show sidebar with name, type, tier, status, market, year, desc, namingTreatment, all connected nodes listed by relationship type
- Hover node: highlight node + all direct connections, dim others
- Search: filter by name (highlight matching nodes)
- Filter panel: filter by type, tier, status, market, namingTreatment
- Toggle link types on/off (e.g. hide parent links to focus on lateral connections)

**Layout controls:**
- "Focus mode": select a node and show only 1-2 hops of its neighborhood
- "Owned names only": toggle to show only countsAsManagedName=true nodes
- "Show legacy": toggle to include/exclude legacy and renamed nodes
- Strength controls: adjust link distance and charge

**Performance:**
- Render parent links at lower opacity by default (they create visual noise)
- Use canvas or WebGL for >500 nodes if needed
- Cluster by type initially, then allow physics to run

### Sample data for reference (paste into component for dev/testing)
See naming-graph-sample.json — 22 nodes, 64 links covering all relationship types.
```json
// fetch('/naming-graph-sample.json') for dev, fetch('/naming-graph-data.json') for full graph
```
