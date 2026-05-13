Create this new project off of naming-Graph-2 but make it on a new page naming-graph-v3:

## Project Context

I'm building an interactive knowledge graph visualization tool for eBay's product naming portfolio. The graph contains **967 programs** (nodes) and **560 relationships** (edges) representing dependencies, integrations, replacements, and other connections between eBay's products and features.

**Product Philosophy**: Naming Studio is a governed, structured decision-support system with progressive workflows and auditability. The visualization should reflect this philosophy - reducing cognitive load through progressive disclosure, not overwhelming users with raw complexity.

## Data Model

**GraphNode Interface:**
```typescript
interface GraphNode {
  id: string;                    // Unique identifier (e.g., 'authenticity-guarantee')
  name: string;                  // Display name (e.g., 'Authenticity Guarantee')
  type: 'masterbrand' | 'category' | 'advertising' | 'trust' | 'impact' | 'developer' | 'regional';
  tier: 'master' | 'umbrella' | 't1' | 't2' | 't3' | 'product' | 'program' | 'feature' | 'legal' | 'organization' | 'publication' | 'event' | 'campaign' | 'vertical' | 'platform' | 'variant';
  status: 'current' | 'legacy' | 'renamed';
  parent?: string;               // Parent node ID (hierarchy)
  desc?: string;                 // Description text
  year?: number;                 // Launch year (1995-2025)
  market?: string | string[];    // Markets (e.g., 'US', 'global', or ['US', 'UK', 'DE'])
  sourceUrl?: string;            // Verification URL
  relationships?: GraphRelationship[];
}
```

**GraphRelationship Interface:**
```typescript
interface GraphRelationship {
  target: string;                // Target node ID
  type: 'renamed_from' | 'renamed_to' | 'replaced_by' | 'replaces' 
       | 'related_to' | 'integrates_with' | 'competes_with' | 'depends_on' 
       | 'parent' | 'child';
  year?: number;                 // Relationship established year
  desc?: string;                 // Relationship description
  bidirectional?: boolean;       // If true, shows arrow on both ends
}
```

**Data Location:**
The data lives in a TypeScript file at `lib/enriched-naming-data.ts` with two arrays:
- `BASE_PROGRAMS` (831 original programs)
- `MISSING_PARENT_NODES` (136 added programs)

Combined via: `export const ENRICHED_PROGRAMS = [...BASE_PROGRAMS, ...MISSING_PARENT_NODES];`

## Application Modes

Build three distinct modes, not one giant graph:

### Mode 1: Taxonomy Explorer (Default Landing)
**Purpose**: Navigate the hierarchical structure of eBay's product portfolio

**Features:**
- Hierarchical tree layout showing parent-child relationships
- Expand/collapse nodes to reveal children
- Search by name with auto-expand to match
- Filter by: type, tier, status, year range, market
- Detail panel on node click showing full metadata
- KPI strip: total nodes, visible nodes, total relationships, visible relationships

**Initial State:**
- Show only: `tier: 'master'` + `tier: 'umbrella'` + `tier: 't1'` nodes
- Hide: `tier: 't2'`, `tier: 't3'`, and `tier: 'feature'` until expanded
- Show only hierarchy edges (parent-child)
- No cross-cutting relationships visible initially

### Mode 2: Relationship Explorer
**Purpose**: Analyze dependencies, integrations, and connections

**Features:**
- Select a node → show 1-hop neighborhood with force-directed layout
- Relationship type filter (integrates_with, depends_on, etc.)
- "Find path" tool: select two nodes → show shortest path
- Cluster/community detection visualization
- Inbound vs outbound relationship breakdown
- Multi-select mode (Shift+click) for bulk subgraph analysis

**Edge Display Logic:**
- Default: hierarchy only
- On node select: reveal all relationships for selected node
- Toggle options:
  - "Hierarchy only"
  - "Selected node relationships"
  - "All visible relationships"

### Mode 3: Timeline / Evolution View
**Purpose**: Understand program launches and portfolio evolution over time

**Features:**
- Horizontal timeline (1995-2025) with programs plotted by launch year
- Year scrubber to animate graph evolution
- Show renamed_to/replaced_by relationships as timeline transitions
- Filter by year range
- "Programs launched this year" detail panel

**Layout:**
- Separate view (not same graph layout as taxonomy)
- Timeline axis with vertical swim lanes by type/category
- Animated transitions when scrubbing years

## Implementation Decisions

### 1. Initial View
**Default to top-level taxonomy nodes only:**
- Show: `tier: 'master'`, `tier: 'umbrella'`, and `tier: 't1'` nodes (Brand Badges)
- Hide: `tier: 't2'` (UX Badges), `tier: 't3'` (Labels), and other lower-tier nodes until expanded
- Rationale: Progressive disclosure over overwhelming complexity. Start with branded programs (T1), reveal descriptive features (T2/T3) on demand.

### 2. Relationship Display
**Default to hierarchy edges only:**
- Initial load: show only parent-child edges
- Reveal non-hierarchy relationships on:
  - Node selection/hover
  - Neighborhood mode
  - Explicit relationship-type filter toggle
- Add edge display toggle:
  - ☑ Hierarchy only
  - ☐ Selected node relationships
  - ☐ All visible relationships
- Rationale: 560 edges across 967 nodes creates visual hairball. Progressive disclosure maintains interpretability.

### 3. Layout Algorithm
**Use hybrid layout approach:**
- **Base layer**: Hierarchical/tree layout for taxonomy browsing (parent-child structure)
- **Overlay mode**: Local force-directed layout for selected neighborhoods and relationship subgraphs
- **Timeline mode**: Separate temporal layout (horizontal axis = year)

**When to use each:**
- Taxonomy browsing → hierarchical layout
- Dependency analysis → force-directed layout for selected subgraph
- Evolution view → timeline layout

**Rationale**: Data contains both strict hierarchy (parent field) and cross-cutting relationships (integrates_with, depends_on). Pure tree hides cross-links; pure force layout obscures taxonomy. Hybrid preserves both.

### 4. Performance Strategy
**Progressive rendering over brute-force:**
- Initial render: top-level nodes only (~100-150 nodes)
- Lazy-load: expand children on demand
- Debounce: search and filter operations
- Compute on demand: centrality, pathfinding, clustering (optionally in web worker)
- Focused simulation: run force layout only on active subgraph, not entire dataset
- Mobile fallback: list/detail view, not full graph

**Rationale**: Usability = legibility + interaction speed, not just FPS. Staged rendering reduces cognitive load and keeps interactions responsive.

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Mode Tabs: [Taxonomy] [Relationships] [Timeline]          │
├─────────────────────────────────────────────────────────────┤
│  KPI Strip:                                                 │
│  ● 967 Total Programs  ● 152 Visible  ● 560 Relationships │
├──────────────────────┬──────────────────────────────────────┤
│  Controls Panel      │  Graph Canvas                        │
│  ─────────────       │                                      │
│  🔍 Search           │                                      │
│  📊 Filters:         │      [Interactive Graph]             │
│    Type ▼            │                                      │
│    Tier ▼            │                                      │
│    Status ▼          │                                      │
│    Year Range        │                                      │
│    Market ▼          │                                      │
│                      │                                      │
│  🔗 Edges:           │                                      │
│    ☑ Hierarchy       │                                      │
│    ☐ Dependencies    │                                      │
│    ☐ Integrations    │                                      │
│                      │                                      │
│  🛠 Tools:           │                                      │
│    Find Path         │                                      │
│    Clusters          │                                      │
│    Centrality        │                                      │
│                      ├──────────────────────────────────────┤
│                      │  Detail Panel (on node select)       │
│                      │  ──────────────────────────────────  │
│                      │  ▸ Name, Type, Tier, Status          │
│                      │  ▸ Description                       │
│                      │  ▸ Year, Markets, Source URL         │
│                      │  ▸ Relationships (12 inbound, 8 out) │
└──────────────────────┴──────────────────────────────────────┘
```

## Tech Stack

- **Graph Library**: **Cytoscape.js** (recommended)
  - Better fit for graph interaction, filtering, neighborhoods, pathfinding
  - Supports compound/grouped nodes for hierarchy
  - More practical than Sigma for controlled layouts
  - More app-like than raw D3
- **UI Framework**: React + TypeScript (Next.js compatible)
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI for controls, dialogs, filters
- **State Management**: Zustand (simple, no boilerplate)
- **Supporting Charts**: D3.js for timeline, KPI visualizations, legends

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
- `master` / `umbrella` → Largest (48px) - Top-level brands
- `t1` (Brand Badges) → Large (36px) - Authenticity Guarantee, Promoted Listings
- `t2` (UX Badges) → Medium (28px) - Best Offer, Buy It Now, Top-Rated Seller
- `t3` (Labels) → Small (20px) - Free Shipping, Free Returns
- `product` / `program` → Medium (28px)
- `feature` → Small (20px)

**Border style by status:**
- `current` → Solid border (2px)
- `legacy` → Dashed border
- `renamed` → Dotted border with arrow indicator

### Edge Styling
**Color by relationship type:**
- `parent` / `child` → Gray (#9CA3AF) - Hierarchy edges
- `integrates_with` → Blue (#3B82F6) - Technical integration
- `depends_on` → Red (#EF4444) - Critical dependency
- `related_to` → Light Gray (#D1D5DB) - Soft connection
- `competes_with` → Orange (#F59E0B) - Competitive
- `replaces` / `replaced_by` → Purple (#8B5CF6) - Succession
- `renamed_to` / `renamed_from` → Teal (#14B8A6) - Identity change

**Arrow directionality:**
- Directional relationships show arrows (A → B)
- Bidirectional relationships show double arrows (A ↔ B)

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + F` | Focus search |
| `Esc` | Deselect all |
| `Shift + Click` | Multi-select nodes |
| `Cmd/Ctrl + A` | Select all visible |
| `Space` | Toggle expand/collapse on selected |
| `1` / `2` / `3` | Switch to Mode 1/2/3 |
| `H` | Toggle hierarchy edges |
| `R` | Toggle relationship edges |

## Export Capabilities

1. **Export current view as PNG/SVG**
2. **Export filtered data as JSON/CSV**
3. **Generate markdown report** for selected nodes:
   ```markdown
   # Selected Programs (5)
   
   ## Authenticity Guarantee
   - Type: Program
   - Tier: Core
   - Status: Current
   - Year: 2020
   - Markets: US, UK, DE, global
   - Relationships: 3 integrations, 1 dependency
   
   [... repeat for each selected node]
   ```

## Example Use Cases

1. **Product Manager**: 
   - Mode: Taxonomy Explorer
   - Action: Expand "Trust & Safety" → select "Authenticity Guarantee" → view integrations
   - Expected: See all programs that integrate with AG

2. **Naming Team**: 
   - Mode: Timeline
   - Action: Filter year = 2024 → export list
   - Expected: See all programs launched in 2024 to check for naming conflicts

3. **Architect**: 
   - Mode: Relationship Explorer
   - Action: Select "Managed Payments" + "Promoted Listings" → "Find Path"
   - Expected: See shortest dependency path between two programs

4. **Executive**: 
   - Mode: Timeline
   - Action: Scrub years 2020-2025
   - Expected: Animated view of Trust & Safety ecosystem growth

## Data Sample (first 4 nodes for reference)

```typescript
{
  id: 'ebay',
  name: 'eBay',
  type: 'masterbrand',
  tier: 'master',
  status: 'current',
  desc: 'eBay masterbrand - top-level corporate identity',
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
  desc: 'Third-party authentication service for luxury goods',
  year: 2020,
  market: ['US', 'UK', 'DE', 'global'],
  sourceUrl: 'https://pages.ebay.com/authenticity-guarantee/',
  relationships: [
    { target: 'trust-safety', type: 'integrates_with', year: 2020 },
    { target: 'managed-payments', type: 'depends_on', year: 2020 },
    { target: 'seller-hub', type: 'integrates_with', year: 2021 }
  ]
},
{
  id: 'best-offer',
  name: 'Best Offer',
  type: 'category',
  tier: 't2',  // T2 UX Badge/Feature Name
  status: 'current',
  parent: 'buying-features',
  desc: 'Negotiation feature allowing buyers to propose lower prices',
  year: 2005,
  market: 'global',
  sourceUrl: 'https://www.ebay.com/help/buying/buy-now/making-best-offer?id=4019'
},
{
  id: 'free-shipping',
  name: 'Free Shipping',
  type: 'category',
  tier: 't3',  // T3 Label
  status: 'current',
  desc: 'Shipping cost indicator - purely descriptive label',
  year: 2008,
  market: 'global'
}
```

## Design Philosophy

- **Progressive disclosure**: Don't overwhelm users with all 967 nodes and 560 edges at once
- **Guided exploration**: Default to interpretable taxonomy view, reveal complexity on demand
- **Governed workflows**: Reflect Naming Studio's philosophy of structured decision-support
- **Clean, professional UI**: Suitable for eBay stakeholders and executive presentations
- **Performance = legibility**: Optimize for interaction speed and cognitive load, not just FPS
- **Keyboard-friendly**: Power users should never need to reach for the mouse
- **Mobile-responsive**: Graceful degradation to list/detail view on small screens

## Acceptance Criteria

✅ **Mode 1 (Taxonomy)**: 
- Default view shows ~100-150 top-level nodes (platform/category/core)
- Hierarchy edges only by default
- Expand/collapse works smoothly
- Search auto-expands to matched nodes

✅ **Mode 2 (Relationships)**:
- Selecting a node reveals its 1-hop neighborhood
- Force-directed layout for subgraph is readable
- Edge type filter works (hide/show by relationship type)
- "Find path" tool shows shortest path between two nodes

✅ **Mode 3 (Timeline)**:
- Programs plotted correctly by launch year (1995-2025)
- Year scrubber animates graph evolution
- renamed_to/replaced_by relationships shown as timeline transitions

✅ **Performance**:
- Initial render < 1 second
- Expand/collapse animation smooth (60fps)
- Search debounced, results instant
- No jank when toggling 100+ edges

✅ **Export**:
- PNG/SVG export works with current zoom/pan
- CSV export includes filtered nodes with all metadata
- Markdown report generates correctly for selected nodes

---

Build a production-quality knowledge graph visualization tool that helps eBay stakeholders understand the product naming portfolio through **progressive disclosure** and **guided exploration**, not overwhelming raw complexity.

**Remember**: This is a governance tool, not an exploratory toy. Every design choice should reduce cognitive load and support structured decision-making.
