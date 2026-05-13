# eBay Knowledge Graph - V0 Prompt Summary

## Core Concept
Interactive knowledge graph visualization for eBay's product naming portfolio: **967 programs (nodes)** and **560 relationships (edges)**.

**Philosophy**: Governed decision-support system with progressive disclosure - NOT an overwhelming "show everything" exploratory tool.

---

## Data Model

```typescript
interface GraphNode {
  id: string;
  name: string;
  type: 'masterbrand' | 'category' | 'advertising' | 'trust' | 'impact' | 'developer' | 'regional';
  tier: 'master' | 'umbrella' | 't1' | 't2' | 't3' | 'product' | 'program' | 'feature' | 'legal' | 'organization' | 'publication' | 'event' | 'campaign' | 'vertical' | 'platform' | 'variant';
  status: 'current' | 'legacy' | 'renamed';
  parent?: string;
  desc?: string;
  year?: number;
  market?: string | string[];
  sourceUrl?: string;
  relationships?: GraphRelationship[];
}

interface GraphRelationship {
  target: string;
  type: 'renamed_from' | 'renamed_to' | 'replaced_by' | 'replaces' 
       | 'related_to' | 'integrates_with' | 'competes_with' | 'depends_on' 
       | 'parent' | 'child';
  year?: number;
  desc?: string;
  bidirectional?: boolean;
}
```

**Data source**: `lib/enriched-naming-data.ts`
- `BASE_PROGRAMS` (831) + `MISSING_PARENT_NODES` (136) = `ENRICHED_PROGRAMS` (967)

---

## Three Modes (Not One Giant Graph)

### Mode 1: Taxonomy Explorer (Default)
- **Layout**: Hierarchical tree (parent-child)
- **Initial view**: Show only `tier: 'master'` + `'umbrella'` + `'t1'` (~100-150 nodes)
- **Hidden**: `t2`, `t3`, `feature` tiers until expanded
- **Edges**: Hierarchy only (parent-child)
- **Features**: Expand/collapse, search with auto-expand, filters (type/tier/status/year/market), detail panel, KPI strip

### Mode 2: Relationship Explorer
- **Layout**: Force-directed for selected subgraph
- **Trigger**: Click node → show 1-hop neighborhood
- **Features**: Find shortest path, cluster detection, relationship type filters, multi-select (Shift+click)
- **Edge toggle**: Hierarchy only | Selected relationships | All relationships

### Mode 3: Timeline / Evolution
- **Layout**: Horizontal timeline (1995-2025)
- **Features**: Year scrubber animation, renamed/replaced transitions, swim lanes by type
- **Purpose**: Visualize portfolio growth over time

---

## Key Implementation Decisions

### 1. Progressive Disclosure
- **Initial render**: Top-level only (~100-150 nodes), NOT all 967
- **Why**: Reduces cognitive load, aligns with naming governance philosophy

### 2. Relationship Display
- **Default**: Hierarchy edges only
- **Reveal on**: Node selection, hover, explicit filter
- **Why**: 560 edges = visual hairball; show on demand

### 3. Hybrid Layout
- **Taxonomy mode**: Hierarchical tree
- **Relationship mode**: Force-directed for subgraph
- **Timeline mode**: Temporal horizontal axis
- **Why**: Data has both hierarchy AND cross-cutting relationships

### 4. Performance Strategy
- Lazy-load children on expand
- Debounce search/filters
- Compute centrality/pathing on demand (web worker)
- Force simulation only for focused subgraph
- Mobile: list/detail fallback

---

## Visual Design

### Node Styling
**Color by type:**
- `masterbrand` → eBay Blue (#0064D2)
- `category` → Green (#10B981)
- `advertising` → Orange (#F59E0B)
- `trust` → Purple (#8B5CF6)
- `impact` → Teal (#14B8A6)
- `developer` → Indigo (#6366F1)
- `regional` → Gray (#6B7280)

**Size by tier (Naming Hierarchy):**
- `master`/`umbrella` → 48px (largest)
- `t1` (Brand Badges: AG, Promoted Listings) → 36px
- `t2` (UX Badges: Best Offer, Buy It Now) → 28px
- `t3` (Labels: Free Shipping, Free Returns) → 20px

**Border by status:**
- `current` → Solid 2px
- `legacy` → Dashed
- `renamed` → Dotted with arrow

### Edge Styling
**Color by relationship:**
- `parent`/`child` → Gray (#9CA3AF)
- `integrates_with` → Blue (#3B82F6)
- `depends_on` → Red (#EF4444)
- `related_to` → Light Gray (#D1D5DB)
- `competes_with` → Orange (#F59E0B)
- `replaces`/`replaced_by` → Purple (#8B5CF6)
- `renamed_to`/`renamed_from` → Teal (#14B8A6)

**Directional arrows** for non-bidirectional relationships

---

## Tech Stack

**Primary:**
- **Graph library**: Cytoscape.js (recommended over D3/Sigma)
  - Better for graph interaction, neighborhoods, pathfinding
  - Compound/grouped node support for hierarchy
- **Framework**: React + TypeScript (Next.js compatible)
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **State**: Zustand

**Supporting:**
- **D3.js** for timeline, charts, legends only

---

## UI Layout

```
┌──────────────────────────────────────────────────┐
│  [Taxonomy] [Relationships] [Timeline]          │
├──────────────────────────────────────────────────┤
│  ● 967 Total  ● 152 Visible  ● 560 Relationships│
├─────────────────┬────────────────────────────────┤
│  Controls       │  Graph Canvas                  │
│  🔍 Search      │                                │
│  📊 Filters     │  [Interactive Graph]           │
│  🔗 Edge Toggle │                                │
│  🛠 Tools       ├────────────────────────────────┤
│                 │  Detail Panel                  │
└─────────────────┴────────────────────────────────┘
```

---

## Keyboard Shortcuts

- `Cmd+F` → Search
- `Esc` → Deselect
- `Shift+Click` → Multi-select
- `Space` → Expand/collapse selected
- `1/2/3` → Switch modes
- `H` → Toggle hierarchy edges
- `R` → Toggle relationship edges

---

## Export Features

1. PNG/SVG of current view
2. JSON/CSV of filtered data
3. Markdown report of selected nodes

---

## Example Data

```typescript
{
  id: 'ebay',
  name: 'eBay',
  type: 'masterbrand',
  tier: 'master',
  status: 'current',
  year: 1995,
  market: 'global'
},
{
  id: 'authenticity-guarantee',
  name: 'Authenticity Guarantee',
  type: 'trust',
  tier: 't1',  // T1 Brand Badge
  status: 'current',
  parent: 'trust-safety',
  year: 2020,
  market: ['US', 'UK', 'DE', 'global'],
  sourceUrl: 'https://pages.ebay.com/authenticity-guarantee/',
  relationships: [
    { target: 'trust-safety', type: 'integrates_with', year: 2020 },
    { target: 'managed-payments', type: 'depends_on', year: 2020 }
  ]
},
{
  id: 'best-offer',
  name: 'Best Offer',
  type: 'category',
  tier: 't2',  // T2 UX Badge
  status: 'current',
  year: 2005,
  market: 'global'
},
{
  id: 'free-shipping',
  name: 'Free Shipping',
  type: 'category',
  tier: 't3',  // T3 Label
  status: 'current',
  year: 2008,
  market: 'global'
}
```

---

## Design Principles

1. **Progressive disclosure** over overwhelming complexity
2. **Guided exploration** starting with top-level taxonomy
3. **Governed workflows** reflecting naming governance philosophy
4. **Performance = legibility** (usability over raw FPS)
5. **Keyboard-first** for power users
6. **Mobile-responsive** with graceful degradation

---

## Acceptance Criteria

✅ Default view shows ~100-150 top-level nodes (master/umbrella/t1)
✅ Hierarchy edges only by default
✅ Expand/collapse smooth (60fps)
✅ Node selection reveals 1-hop neighborhood in force layout
✅ "Find path" tool works between any two nodes
✅ Timeline animates year-by-year evolution
✅ Search auto-expands to matched nodes
✅ PNG/SVG/CSV export works
✅ Initial render < 1 second
✅ No jank when toggling 100+ edges

---

**Remember**: This is a **governance tool**, not an exploratory toy. Every design choice should reduce cognitive load and support structured decision-making.

**Data**: `lib/enriched-naming-data.ts` exports `ENRICHED_PROGRAMS` array with all 967 nodes.
