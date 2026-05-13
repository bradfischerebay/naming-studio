#!/usr/bin/env tsx
/**
 * Registry Integrity Validator
 * Validates enriched-consolidated-DEDUPLICATED.ts against defined rules.
 *
 * Usage: npx tsx scripts/validate-registry.ts
 */

import { ENRICHED_PROGRAMS, GraphNode } from '../app/naming-graph/enriched-consolidated-DEDUPLICATED'

// ─── Valid enum values ────────────────────────────────────────────────────────

const VALID_TYPES = new Set<string>([
  'masterbrand', 'category', 'advertising', 'trust', 'impact', 'developer', 'regional',
])

const VALID_NAMING_TREATMENTS = new Set<string>([
  'owned_marketing_name', 'partner_brand', 'descriptive_label',
  'functional_label', 'internal_label', 'unknown',
])

const VALID_TIERS = new Set<string>([
  'master', 'umbrella', 'product', 'program', 'feature',
  'legal', 'organization', 'publication', 'event', 'campaign',
  'vertical', 'platform', 'variant',
])

const VALID_STATUSES = new Set<string>(['current', 'legacy', 'renamed', 'unknown'])

const VALID_BRAND_TIERS = new Set<string>(['t1', 't2_badge', 't2_name', 't3', 'unclassified'])

const VALID_UMBRELLA_TYPES = new Set<string>(['brand-architecture', 'navigation-taxonomy'])

const VALID_MARKET_CODES = new Set<string>(['US', 'UK', 'DE', 'FR', 'IT', 'AU', 'CA', 'global'])

const RELEASED_PATTERN = /^\d{4}(-\d{2}(-\d{2})?)?$/

// ─── Issue types ──────────────────────────────────────────────────────────────

interface Issue {
  rule: string
  id: string
  detail: string
  severity: 'ERROR' | 'WARN' | 'INFO'
}

const issues: Issue[] = []

function error(rule: string, id: string, detail: string) {
  issues.push({ rule, id, detail, severity: 'ERROR' })
}

function warn(rule: string, id: string, detail: string) {
  issues.push({ rule, id, detail, severity: 'WARN' })
}

// ─── Rule 1: Required fields ──────────────────────────────────────────────────

function checkRequiredFields(nodes: GraphNode[]) {
  for (const n of nodes) {
    const missing: string[] = []
    if (!n.id || typeof n.id !== 'string') missing.push('id')
    if (!n.name || typeof n.name !== 'string') missing.push('name')
    if (!n.type) missing.push('type')
    if (!n.tier) missing.push('tier')
    if (!n.status) missing.push('status')
    if (!n.desc || typeof n.desc !== 'string') missing.push('desc')
    if (missing.length > 0) {
      error('REQUIRED_FIELDS', n.id || '(no id)', `Missing required fields: ${missing.join(', ')}`)
    }
  }
}

// ─── Rule 2: No duplicate IDs ─────────────────────────────────────────────────

function checkDuplicateIds(nodes: GraphNode[]): Set<string> {
  const seen = new Map<string, number>()
  for (const n of nodes) {
    seen.set(n.id, (seen.get(n.id) || 0) + 1)
  }
  const idSet = new Set(nodes.map(n => n.id))
  for (const [id, count] of seen.entries()) {
    if (count > 1) {
      error('DUPLICATE_ID', id, `ID appears ${count} times`)
    }
  }
  return idSet
}

// ─── Rule 3: No self-parent cycles ───────────────────────────────────────────

function checkSelfParentCycles(nodes: GraphNode[]) {
  for (const n of nodes) {
    if (n.parent === n.id) {
      error('SELF_PARENT_CYCLE', n.id, `parent === id (self-reference)`)
    }
  }
}

// ─── Rule 4: No invalid parent references ────────────────────────────────────

function checkParentRefs(nodes: GraphNode[], idSet: Set<string>) {
  for (const n of nodes) {
    if (n.parent && !idSet.has(n.parent)) {
      error('INVALID_PARENT_REF', n.id, `parent "${n.parent}" does not exist in registry`)
    }
  }
}

// ─── Rule 5: Market value validity ───────────────────────────────────────────

function checkMarketValues(nodes: GraphNode[]) {
  for (const n of nodes) {
    if (n.market === undefined) continue
    if (Array.isArray(n.market)) {
      const bad = n.market.filter(m => typeof m !== 'string' || m.length === 0)
      if (bad.length > 0) {
        warn('MARKET_INVALID', n.id, `market array contains invalid entries: ${bad.join(', ')}`)
      }
    } else if (typeof n.market === 'string') {
      // Allow valid codes + any two-letter ISO code (for regional nodes like NO, SE, DK, FI)
      if (!VALID_MARKET_CODES.has(n.market) && !/^[A-Z]{2}$/.test(n.market)) {
        warn('MARKET_INVALID', n.id, `market "${n.market}" is not a recognized market code`)
      }
    } else {
      warn('MARKET_INVALID', n.id, `market is not a string or string[]`)
    }
  }
}

// ─── Rule 6: Rename chain consistency ────────────────────────────────────────

function checkRenameConsistency(nodes: GraphNode[], idSet: Set<string>) {
  const nodeMap = new Map<string, GraphNode>(nodes.map(n => [n.id, n]))

  for (const n of nodes) {
    if (n.renamedTo) {
      if (!idSet.has(n.renamedTo)) {
        error('RENAME_BROKEN', n.id, `renamedTo "${n.renamedTo}" does not exist in registry`)
      } else {
        const target = nodeMap.get(n.renamedTo)!
        if (target.renamedFrom !== n.id) {
          warn('RENAME_ASYMMETRIC', n.id, `renamedTo="${n.renamedTo}" but ${n.renamedTo}.renamedFrom="${target.renamedFrom || '(missing)'}" — expected "${n.id}"`)
        }
      }
    }
    if (n.renamedFrom) {
      if (!idSet.has(n.renamedFrom)) {
        error('RENAME_BROKEN', n.id, `renamedFrom "${n.renamedFrom}" does not exist in registry`)
      } else {
        const source = nodeMap.get(n.renamedFrom)!
        if (source.renamedTo !== n.id) {
          warn('RENAME_ASYMMETRIC', n.id, `renamedFrom="${n.renamedFrom}" but ${n.renamedFrom}.renamedTo="${source.renamedTo || '(missing)'}" — expected "${n.id}"`)
        }
      }
    }
  }
}

// ─── Rule 7: Optional field type safety ──────────────────────────────────────

function checkOptionalFieldTypes(nodes: GraphNode[]) {
  for (const n of nodes) {
    if (n.released !== undefined) {
      if (typeof n.released !== 'string' || !RELEASED_PATTERN.test(n.released)) {
        warn('RELEASED_FORMAT', n.id, `released "${n.released}" does not match YYYY(-MM(-DD)?) format`)
      }
    }
    if (n.sourceUrl !== undefined) {
      if (typeof n.sourceUrl !== 'string' || !n.sourceUrl.startsWith('https://')) {
        warn('SOURCE_URL_FORMAT', n.id, `sourceUrl "${n.sourceUrl}" does not start with "https://"`)
      }
    }
    if (n.relationships !== undefined) {
      if (!Array.isArray(n.relationships)) {
        error('RELATIONSHIPS_TYPE', n.id, `relationships must be an array`)
      } else {
        n.relationships.forEach((rel, i) => {
          if (!rel.target) {
            error('RELATIONSHIPS_MISSING_TARGET', n.id, `relationships[${i}] missing "target" field`)
          }
          if (!rel.type) {
            error('RELATIONSHIPS_MISSING_TYPE', n.id, `relationships[${i}] missing "type" field`)
          }
        })
      }
    }
  }
}

// ─── Rule 8: Status "unknown" audit ──────────────────────────────────────────

function checkUnknownStatus(nodes: GraphNode[]) {
  const unknownNodes = nodes.filter(n => n.status === 'unknown')
  if (unknownNodes.length > 3) {
    warn('UNKNOWN_STATUS_OVERUSE', 'REGISTRY',
      `${unknownNodes.length} nodes have status "unknown" — exceeds threshold of 3. Review: ${unknownNodes.map(n => n.id).join(', ')}`)
  }
  unknownNodes.forEach(n => {
    warn('UNKNOWN_STATUS', n.id, `status is "unknown" — review whether this should be "legacy" or another status`)
  })
}

// ─── Rule 9: Enum value validation ───────────────────────────────────────────

function checkEnumValues(nodes: GraphNode[]) {
  for (const n of nodes) {
    if (n.type && !VALID_TYPES.has(n.type)) {
      error('INVALID_TYPE', n.id, `type "${n.type}" is not a valid enum value`)
    }
    if (n.tier && !VALID_TIERS.has(n.tier)) {
      error('INVALID_TIER', n.id, `tier "${n.tier}" is not a valid enum value`)
    }
    if (n.status && !VALID_STATUSES.has(n.status)) {
      error('INVALID_STATUS', n.id, `status "${n.status}" is not a valid enum value`)
    }
  }
}

// ─── Rule 10: brandTier validation ──────────────────────────────────────────

function checkBrandTierValues(nodes: GraphNode[]) {
  for (const n of nodes) {
    if (n.brandTier !== undefined && !VALID_BRAND_TIERS.has(n.brandTier)) {
      error('INVALID_BRAND_TIER', n.id, `brandTier "${n.brandTier}" is not a valid value`)
    }
  }
}

// ─── Rule 11: umbrellaType validation ────────────────────────────────────────

function checkUmbrellaTypeValues(nodes: GraphNode[]) {
  for (const n of nodes) {
    const umbrellaType = (n as any).umbrellaType
    if (umbrellaType !== undefined && !VALID_UMBRELLA_TYPES.has(umbrellaType)) {
      error('INVALID_UMBRELLA_TYPE', n.id, `umbrellaType "${umbrellaType}" is not a valid value`)
    }
    if (umbrellaType && n.tier !== 'umbrella') {
      warn('UMBRELLA_TYPE_WRONG_TIER', n.id, `umbrellaType is set but tier is "${n.tier}" (expected "umbrella")`)
    }
  }
}

// ─── Rule 12: Broken relationship target references ───────────────────────────

function checkRelationshipRefs(nodes: GraphNode[], idSet: Set<string>) {
  for (const n of nodes) {
    if (!n.relationships) continue
    for (const rel of n.relationships) {
      if (rel.target && !idSet.has(rel.target)) {
        error('BROKEN_RELATIONSHIP_REF', n.id, `relationships target "${rel.target}" does not exist in registry`)
      }
    }
  }
}

// ─── Rule 13: namingTreatment enum validation ─────────────────────────────────

function checkNamingTreatmentValues(nodes: GraphNode[]) {
  for (const n of nodes) {
    const nt = (n as any).namingTreatment
    if (nt !== undefined && !VALID_NAMING_TREATMENTS.has(nt)) {
      error('INVALID_NAMING_TREATMENT', n.id, `namingTreatment "${nt}" is not a valid enum value`)
    }
  }
}

// ─── Rule 14: countsAsManagedName consistency with namingTreatment ────────────

function checkNamingTreatmentManagedMismatch(nodes: GraphNode[]) {
  for (const n of nodes) {
    const nt = (n as any).namingTreatment
    const cam = (n as any).countsAsManagedName
    if (cam === undefined) continue
    if (nt === 'owned_marketing_name' && cam !== true) {
      error('NAMING_TREATMENT_MANAGED_MISMATCH', n.id,
        `namingTreatment="owned_marketing_name" but countsAsManagedName=${cam} (expected true)`)
    }
    if (nt !== 'owned_marketing_name' && nt !== undefined && cam !== false) {
      error('NAMING_TREATMENT_MANAGED_MISMATCH', n.id,
        `namingTreatment="${nt}" (not owned_marketing_name) but countsAsManagedName=${cam} (expected false)`)
    }
  }
}

// ─── Soft warning: brandTier set but namingTreatment absent ──────────────────

function warnBrandTierWithoutNamingTreatment(nodes: GraphNode[]) {
  for (const n of nodes) {
    const nt = (n as any).namingTreatment
    if (n.brandTier !== undefined && nt === undefined) {
      warn('BRAND_TIER_WITHOUT_NAMING_TREATMENT', n.id,
        `brandTier="${n.brandTier}" is set but namingTreatment is absent — informational only`)
    }
  }
}

// ─── Run all checks ───────────────────────────────────────────────────────────

function validate(nodes: GraphNode[]) {
  console.log(`\n=== eBay Naming Registry Integrity Validator ===`)
  console.log(`Registry: enriched-consolidated-DEDUPLICATED.ts`)
  console.log(`Total nodes parsed: ${nodes.length}`)
  console.log(`Running validation checks...\n`)

  checkRequiredFields(nodes)
  const idSet = checkDuplicateIds(nodes)
  checkSelfParentCycles(nodes)
  checkParentRefs(nodes, idSet)
  checkMarketValues(nodes)
  checkRenameConsistency(nodes, idSet)
  checkOptionalFieldTypes(nodes)
  checkUnknownStatus(nodes)
  checkEnumValues(nodes)
  checkBrandTierValues(nodes)
  checkUmbrellaTypeValues(nodes)
  checkRelationshipRefs(nodes, idSet)
  checkNamingTreatmentValues(nodes)
  checkNamingTreatmentManagedMismatch(nodes)
  warnBrandTierWithoutNamingTreatment(nodes)

  const errors = issues.filter(i => i.severity === 'ERROR')
  const warnings = issues.filter(i => i.severity === 'WARN')

  // ── Summary ──
  console.log(`=== RESULTS ===`)
  console.log(`Errors:   ${errors.length}`)
  console.log(`Warnings: ${warnings.length}`)

  if (errors.length > 0) {
    console.log(`\n── ERRORS ──────────────────────────────────`)
    errors.forEach(e => {
      console.log(`  [${e.rule}] ${e.id}: ${e.detail}`)
    })
  }

  if (warnings.length > 0) {
    console.log(`\n── WARNINGS ────────────────────────────────`)
    warnings.forEach(w => {
      console.log(`  [${w.rule}] ${w.id}: ${w.detail}`)
    })
  }

  // ── Status breakdown ──
  console.log(`\n── STATUS BREAKDOWN ────────────────────────`)
  const statusMap = new Map<string, number>()
  for (const n of nodes) {
    statusMap.set(n.status, (statusMap.get(n.status) || 0) + 1)
  }
  for (const [k, v] of [...statusMap.entries()].sort()) {
    console.log(`  ${k}: ${v}`)
  }

  // ── Type breakdown ──
  console.log(`\n── TYPE BREAKDOWN ──────────────────────────`)
  const typeMap = new Map<string, number>()
  for (const n of nodes) {
    typeMap.set(n.type || 'MISSING', (typeMap.get(n.type || 'MISSING') || 0) + 1)
  }
  for (const [k, v] of [...typeMap.entries()].sort()) {
    console.log(`  ${k}: ${v}`)
  }

  // ── Tier breakdown ──
  console.log(`\n── TIER BREAKDOWN ──────────────────────────`)
  const tierMap = new Map<string, number>()
  for (const n of nodes) {
    tierMap.set(n.tier || 'MISSING', (tierMap.get(n.tier || 'MISSING') || 0) + 1)
  }
  for (const [k, v] of [...tierMap.entries()].sort()) {
    console.log(`  ${k}: ${v}`)
  }

  // ── brandTier breakdown ──
  console.log(`\n── BRAND TIER BREAKDOWN ────────────────────`)
  const brandTierMap = new Map<string, number>()
  for (const n of nodes) {
    const bt = n.brandTier || 'unset'
    brandTierMap.set(bt, (brandTierMap.get(bt) || 0) + 1)
  }
  for (const [k, v] of [...brandTierMap.entries()].sort()) {
    console.log(`  ${k}: ${v}`)
  }

  console.log(`\n── UNKNOWN STATUS NODES ────────────────────`)
  nodes.filter(n => n.status === 'unknown').forEach(n => {
    console.log(`  ${n.id} (${n.name})`)
  })

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`\n✓ Registry is valid — no issues found.`)
  } else {
    console.log(`\n✗ Registry has ${errors.length} error(s) and ${warnings.length} warning(s).`)
    if (errors.length > 0) {
      process.exit(1)
    }
  }
}

validate(ENRICHED_PROGRAMS)
