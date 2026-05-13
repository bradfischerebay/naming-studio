#!/usr/bin/env tsx
/**
 * naming-classification-report.ts
 *
 * Cross-layer schema-stabilization report for naming classification.
 * Loads both the core registry and Enrichment V2 data, checks alignment
 * between namingTreatment and nameClass, and produces a JSON artifact.
 *
 * Usage: npx tsx scripts/naming-classification-report.ts
 * Output: app/naming-graph/overnight-runs/naming-schema-stabilization-report-<date>.json
 */

import * as fs from 'fs'
import * as path from 'path'
import { ENRICHED_PROGRAMS, type GraphNode } from '../app/naming-graph/enriched-consolidated-DEDUPLICATED'
import { ENRICHMENT_V2_COMPLETE } from '../app/naming-graph/enriched-v2-COMPLETE'
import { checkNameClassAlignment, NAME_CLASS_TO_NAMING_TREATMENT, type AlignmentResult } from './nameclass-mapping'

// ─── Build lookup map from V2 enrichment ─────────────────────────────────────

const v2Map = new Map<string, { id: string; nameClass: string }>(
  (ENRICHMENT_V2_COMPLETE as any[]).map((e: any) => [e.id, e]),
)

// ─── Core registry analysis ───────────────────────────────────────────────────

const ntCounts: Record<string, number> = {}
let withNamingTreatment = 0
let countsAsManagedNameTrue = 0
const legacyOrRenamedWithManagedTrue: string[] = []

for (const n of ENRICHED_PROGRAMS) {
  const nt = (n as any).namingTreatment as string | undefined
  const cam = (n as any).countsAsManagedName as boolean | undefined

  const key = nt ?? 'unclassified'
  ntCounts[key] = (ntCounts[key] ?? 0) + 1

  if (nt) withNamingTreatment++
  if (cam === true) {
    countsAsManagedNameTrue++
    if (n.status === 'legacy' || n.status === 'renamed') {
      legacyOrRenamedWithManagedTrue.push(n.id)
    }
  }
}

// ─── Cross-layer alignment analysis ──────────────────────────────────────────

interface AlignmentEntry {
  id: string
  nameClass: string
  namingTreatment: string
  alignment: AlignmentResult
}

const withBoth: AlignmentEntry[] = []
const withV2Only: string[] = []
const withNTOnly: string[] = []
const withNeither: string[] = []

const v2IdSet = new Set(v2Map.keys())
const coreIdSet = new Set(ENRICHED_PROGRAMS.map(n => n.id))

// Nodes with both fields set — check alignment
for (const n of ENRICHED_PROGRAMS) {
  const nt = (n as any).namingTreatment as string | undefined
  const v2 = v2Map.get(n.id) as any

  if (nt && v2?.nameClass) {
    withBoth.push({
      id: n.id,
      nameClass: v2.nameClass,
      namingTreatment: nt,
      alignment: checkNameClassAlignment(v2.nameClass, nt),
    })
  } else if (!nt && v2?.nameClass) {
    withV2Only.push(n.id)
  } else if (nt && !v2?.nameClass) {
    withNTOnly.push(n.id)
  } else {
    withNeither.push(n.id)
  }
}

const aligned = withBoth.filter(e => e.alignment === 'aligned')
const conflicts = withBoth.filter(e => e.alignment === 'conflict')
const needsReview = withBoth.filter(e => e.alignment === 'needs-review')

// ─── V2 nameClass distribution ───────────────────────────────────────────────

const nameClassCounts: Record<string, number> = {}
for (const e of ENRICHMENT_V2_COMPLETE as any[]) {
  if (e.nameClass) {
    nameClassCounts[e.nameClass] = (nameClassCounts[e.nameClass] ?? 0) + 1
  }
}

// ─── Report ───────────────────────────────────────────────────────────────────

const report = {
  generatedAt: new Date().toISOString().slice(0, 10),
  passName: 'schema-stabilization-2026-04-29',
  filesModified: [
    'scripts/nameclass-mapping.ts (created)',
    'scripts/naming-classification-report.ts (created)',
    'tests/registry-integrity.test.ts (2 tests added)',
  ],
  nodesChangedInThisPass: [],
  schemaState: {
    namingTreatmentField: 'present in GraphNode interface — canonical',
    countsAsManagedNameField: 'present in GraphNode interface',
    nameClassField: 'present in Enrichment V2 layer only — informational',
  },
  mapping: {
    description: 'nameClass → namingTreatment canonical mapping (scripts/nameclass-mapping.ts)',
    rules: NAME_CLASS_TO_NAMING_TREATMENT,
    featureNameResolution: 'null — no automatic mapping; resolve per node context',
  },
  coreRegistry: {
    totalNodes: ENRICHED_PROGRAMS.length,
    withNamingTreatment,
    unclassified: ntCounts['unclassified'] ?? 0,
    countsAsManagedNameTrue,
    byNamingTreatment: ntCounts,
    dataIntegrityFlags: {
      legacyOrRenamedWithManagedNameTrue: legacyOrRenamedWithManagedTrue,
    },
  },
  v2Enrichment: {
    totalRecords: ENRICHMENT_V2_COMPLETE.length,
    byNameClass: nameClassCounts,
  },
  crossLayerAlignment: {
    nodesWithBothFields: withBoth.length,
    aligned: aligned.length,
    conflict: conflicts.length,
    needsReview: needsReview.length,
    withV2NameClassOnly: withV2Only.length,
    withNamingTreatmentOnly: withNTOnly.length,
    withNeitherField: withNeither.length,
    conflicts: conflicts.map(e => ({
      id: e.id,
      nameClass: e.nameClass,
      namingTreatment: e.namingTreatment,
      note: 'namingTreatment is authoritative — update nameClass in V2 if needed',
    })),
    needsReviewNodes: needsReview.map(e => ({
      id: e.id,
      nameClass: e.nameClass,
      namingTreatment: e.namingTreatment,
      note: 'Feature Name has no automatic mapping — resolve per node context',
    })),
  },
  openGovernanceQuestions: [
    'best-offer, buy-it-now, my-ebay, watchlist: V2 says Product Name, core says functional_label — which is authoritative? (Brand/PMM)',
    'certified-open-box, issue-resolution-center, offers-dashboard: V2 says Functional Label, core says owned_marketing_name — confirm classification (PMM)',
    '27 Feature Name nodes with namingTreatment set need per-node resolution — batch review recommended',
    'partner_brand treatment for Depop, Goldin, TCGplayer sub-products is provisional — confirm with Brand strategy',
    'legal-tier nodes (GDPR, CCPA, T&C) remain unclassified — confirm approach with Legal',
    'organization-tier AG partners (Beckett, SGC, Sneaker Con, CCG) unclassified — confirm partner_brand treatment with GCI',
  ],
}

// ─── Write output ─────────────────────────────────────────────────────────────

const outDir = path.join(process.cwd(), 'app/naming-graph/overnight-runs')
const outFile = path.join(outDir, `naming-schema-stabilization-report-2026-04-29.json`)

fs.writeFileSync(outFile, JSON.stringify(report, null, 2))

// ─── Console summary ──────────────────────────────────────────────────────────

console.log('\n=== Naming Classification Schema-Stabilization Report ===\n')
console.log(`Core registry:  ${ENRICHED_PROGRAMS.length} total nodes`)
console.log(`  With namingTreatment: ${withNamingTreatment} (${ENRICHED_PROGRAMS.length - withNamingTreatment} unclassified)`)
console.log(`  countsAsManagedName=true: ${countsAsManagedNameTrue}`)
console.log()
console.log('By namingTreatment:')
Object.entries(ntCounts).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`))
console.log()
console.log(`V2 enrichment: ${ENRICHMENT_V2_COMPLETE.length} records`)
console.log('By nameClass:')
Object.entries(nameClassCounts).sort().forEach(([k, v]) => console.log(`  ${k}: ${v}`))
console.log()
console.log(`Cross-layer alignment (${withBoth.length} nodes have both fields):`)
console.log(`  Aligned:       ${aligned.length}`)
console.log(`  Conflict:      ${conflicts.length}`)
console.log(`  Needs-review:  ${needsReview.length} (all Feature Name)`)
console.log()
if (conflicts.length > 0) {
  console.log('Conflicts (namingTreatment is authoritative):')
  conflicts.forEach(c => console.log(`  ${c.id}: nameClass="${c.nameClass}" vs namingTreatment="${c.namingTreatment}"`))
  console.log()
}
if (legacyOrRenamedWithManagedTrue.length > 0) {
  console.log('⚠ Data integrity: legacy/renamed nodes with countsAsManagedName=true:')
  legacyOrRenamedWithManagedTrue.forEach(id => console.log(`  ${id}`))
  console.log()
}
console.log(`Report written to: ${path.relative(process.cwd(), outFile)}`)
