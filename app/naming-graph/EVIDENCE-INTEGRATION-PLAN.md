# eBay Naming Graph - Evidence Integration Plan

**Date:** 2026-04-20  
**Status:** Architecture Complete, Ready for Phase 1 Implementation

---

## Executive Summary

Created **evidence sidecar architecture** to integrate April 16, 2026 research (45 items with evidence URLs) into the production naming graph (831 nodes).

**Key Finding:** The 45 researched items are **net-new discoveries not yet in the production dataset**. They exist only in the April 16 JSON research files.

---

## Architecture Decision

**REJECTED:** Simple `evidence_url?: string` field on GraphNode  
**APPROVED:** Separate evidence layer with robust provenance tracking

### Why Separate Evidence Layer?

1. **Separation of concerns** - Production graph stays lean
2. **Multiple sources support** - One node can have many evidence URLs
3. **Provenance tracking** - Know when/how/who verified each item
4. **Confidence levels** - High/medium/low based on source quality
5. **Mapping audit trail** - Document exact/fuzzy/manual matching methods
6. **Scalability** - Easy to add 750+ more evidence records without touching graph schema

---

## Current State Analysis

### Dataset 1: Production Graph (831 nodes)
**Location:** `enriched-consolidated-DEDUPLICATED.ts`  
**Structure:** GraphNode[] with id, name, desc, year, market, parent, tier, status, type  
**Evidence:** None (no evidence_url field)

### Dataset 2: April 16 Research (45 items with evidence)
**Location:** Multiple JSON files  
- `ebay-naming-v2-agent-1c-results.json` (23 items)
- `ebay-naming-v2-agent-1d-results.json` (29 items)  
- `ebay-naming-v2-agent-2a-results.json` (21 items)
- `ebay-naming-v2-phase2-merged.json` (24 items)

**Deduplicated:** 45 unique items  
**Structure:** canonical_name, evidence_url, first_seen, notes, market, status

### Dataset 3: Obsidian Documentation (438 items)
**Location:** `~/Obsidian/Claude Brain/Knowledge/eBay Naming Graph - Complete Hierarchy V2.md`  
**Evidence:** 28 items with footnote citations  
**Purpose:** Documentation/summary layer, not production data

---

## The Gap

**Items in Research but NOT in Production Graph:**

All 45 researched items are net-new discoveries:
- About Me
- Billpoint
- Butterfield & Butterfield  
- Feedback Forum
- TCGplayer
- KnownOrigin
- Magical Bulk Listing Tool
- eBay Playbook
- Things.People.Love
- ... and 36 more

**Items in Production Graph without Evidence:** 831 nodes (100%)

---

## Implementation Plan

### Phase 1: Add Research Items to Production Graph (FIRST)

**Before** we can map evidence, we must add the 45 research items to the production dataset.

**Actions:**
1. Extract 45 research items from `research-items-april-16.json`
2. Enrich each with GraphNode metadata:
   - Generate kebab-case `id`
   - Write functional `desc`
   - Research `year` (already have first_seen)
   - Determine `market`, `tier`, `status`, `type`
   - Assign `parent` in hierarchy
3. Add to `enriched-consolidated-DEDUPLICATED.ts`
4. Update count: 831 → 876 nodes

**Output:** `enriched-wave5-research-items.ts` (45 new nodes)

### Phase 2: Create Evidence Sidecar

**After** adding nodes, map evidence URLs to node IDs.

**Actions:**
1. Use mapping logic from `map-evidence.ts`
2. Match canonical_name → node.id via:
   - Exact ID match (kebab-case)
   - Exact name match
   - Normalized fuzzy match (>90% similarity)
3. Generate `NodeEvidence` records with:
   - Source URL
   - Source type (press_release, ebay_official, etc.)
   - Provenance ("April 16, 2026 multi-agent research")
   - Confidence level (high/medium/low)
   - Mapping method (exact_id, normalized_name, etc.)
4. Save to `node-evidence.json`

**Output:** 
- `node-evidence.json` (45 evidence records)
- `evidence-mapping-report.json` (match statistics)

### Phase 3: Extend to Obsidian Citations

**After** Phase 2, integrate the 28 Obsidian footnote citations.

**Actions:**
1. Extract citations from V2.md ([^1] through [^28])
2. Map to node IDs
3. Add to `node-evidence.json`

**Output:** 73 total evidence records (45 + 28)

### Phase 4: Gap Reporting & Prioritization

**After** Phases 2-3, document remaining ~800 nodes without evidence.

**Actions:**
1. Generate unmapped nodes report
2. Prioritize by tier (T1/T2 first)
3. Separate regional variants
4. Create research backlog

**Output:** `EVIDENCE-GAP-REPORT.md`

---

## Schema Design

### GraphNode (Production) - **MINIMAL CHANGE**

```ts
export interface GraphNode {
  id: string
  name: string
  desc?: string
  year?: number
  market?: string | string[]
  parent?: string
  tier?: string
  status?: string
  type?: string
  
  // Optional: lightweight reference to evidence layer
  evidence_ref?: string  // "ev-{node_id}"
}
```

### NodeEvidence (Sidecar) - **ROBUST AUDIT LAYER**

```ts
export interface NodeEvidence {
  id: string              // "ev-{node_id}"
  node_id: string         // References GraphNode.id
  canonical_name?: string // Original name from research (if different)
  
  sources: Array<{
    url: string
    title?: string
    source_type: "json_research" | "ebay_official" | "press_release" | etc.
    captured_at: string   // ISO date
    provenance?: string   // "April 16, 2026 multi-agent research"
    notes?: string
  }>
  
  confidence: "high" | "medium" | "low"
  mapping_method: "exact_id" | "exact_name" | "normalized_name" | "manual" | "ambiguous"
  mapped_at: string       // ISO date
  mapped_by: string       // "automated" | "human"
  review_notes?: string
}
```

---

## Files Created

1. **`evidence-types.ts`** - TypeScript type definitions
2. **`map-evidence.ts`** - Mapping logic (exact, fuzzy, ambiguous)
3. **`research-items-april-16.json`** - 45 extracted items with evidence URLs
4. **`run-evidence-mapping-simple.js`** - Node.js mapping script (ready to run after Phase 1)

---

## Next Steps

**IMMEDIATE (Phase 1):**
1. ✅ Create 45 new GraphNode entries for research items
2. Add them to enriched-consolidated-DEDUPLICATED.ts
3. Verify no duplicates
4. Update total count to 876

**THEN (Phase 2):**
5. Run evidence mapping script
6. Generate node-evidence.json
7. Review mapping report

**THEN (Phase 3):**
8. Extract Obsidian citations
9. Map to node IDs
10. Merge into node-evidence.json

**THEN (Phase 4):**
11. Generate gap report
12. Prioritize remaining 800+ unmapped nodes
13. Plan Phase 5+ research sprints

---

## Success Criteria

**Phase 1 Complete:**
- 45 new nodes added to production graph
- Total nodes: 876
- All nodes have complete GraphNode metadata

**Phase 2 Complete:**
- 45 evidence records created
- Mapping report shows match statistics
- All April 16 research integrated

**Phase 3 Complete:**
- 73 total evidence records (45 + 28)
- Both JSON research and Obsidian citations integrated

**Phase 4 Complete:**
- Gap report generated
- High-priority unmapped nodes identified
- Research backlog prioritized

---

## Why This Approach is Better

**Aligns with Internal Naming Governance Goals:**
- Canonical registry ✅
- Normalized master ✅
- Reduces fragmentation ✅
- Explicit provenance ✅
- Auditable decisions ✅
- Repeatable system ✅

**Technical Benefits:**
- Clean separation of concerns
- Multiple sources per node
- Scalable to 1,000+ evidence records
- Confidence tracking
- Mapping method audit trail
- Easy to query/filter/report

**Governance Benefits:**
- Know exactly when/how each item was verified
- Track source quality (official vs secondary)
- Document review decisions
- Build institutional knowledge
- Support future naming decisions

---

**Status:** Architecture complete, ready to begin Phase 1
**Blocker:** None
**Next Action:** Create 45 GraphNode entries for research items
