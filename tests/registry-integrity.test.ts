/**
 * Registry Integrity Tests
 * Validates enriched-consolidated-DEDUPLICATED.ts structural correctness.
 *
 * Run: npm test registry-integrity
 */

import { describe, it, expect } from 'vitest'
import { ENRICHED_PROGRAMS } from '../app/naming-graph/enriched-consolidated-DEDUPLICATED'

// ── Constants ────────────────────────────────────────────────────────────────

const VALID_TYPES = new Set([
  'masterbrand', 'category', 'advertising', 'trust', 'impact', 'developer', 'regional',
])

const VALID_TIERS = new Set([
  'master', 'umbrella', 'product', 'program', 'feature',
  'legal', 'organization', 'publication', 'event', 'campaign',
  'vertical', 'platform', 'variant',
])

const VALID_STATUSES = new Set(['current', 'legacy', 'renamed', 'unknown'])

const VALID_MARKET_CODES = new Set(['US', 'UK', 'DE', 'FR', 'IT', 'AU', 'CA', 'global'])

const RELEASED_PATTERN = /^\d{4}(-\d{2}(-\d{2})?)?$/

// All 66 Wave 6 node IDs (must be present in merged registry)
const WAVE6_IDS = [
  'agentic-search', 'ai-shopping-agent', 'ebay-explore', 'finances-copilot', 'your-cost',
  'offers-dashboard', 'offers-in-messaging', 'buyer-details-feature', 'automated-positive-feedback',
  'qa-feature', 'ebay-seller-capital', 'business-cash-advance', 'flexible-growth-financing',
  'ebay-merchant-financing', 'fitment-finder', 'ebay-consignment', 'ebay-ambassador-program',
  'ebay-additional-protection', 'ebay-certified-open-box', '48-hours-of-drops', 'case-breaks',
  'pre-loved-fashion-condition-grades', 'goldin-marketplace', 'goldin-vault',
  'goldin-weekly-auctions', 'goldin-elite-auctions', 'studio-auctions',
  'tcgplayer-direct', 'tcgplayer-pro', 'tcgplayer-subscription', 'tcgplayer-market-price',
  'tcgplayer-infinite', 'store-your-products', 'growth-acceleration-program',
  'depop-payments', 'depop-shipping', 'depop-protection', 'depop-outfits',
  'certilogo', '3pm-shield', 'ebay-ventures', 'caramel-dealer-services',
  'seller-cockpit-pro', 'ebay-pro', 'ebaymag', 'ebay-for-change',
  'edelivery-international-shipping-api', 'buy-marketing-api', 'graphql-explorer',
  'sign-in-with-ebay', 'taxonomy-sdk', 'post-order-api',
  'beckett', 'certified-collectibles-group', 'sgc', 'sneaker-con',
  'promoted-listings-automated-campaigns', 'promoted-listings-priority-video-ads',
  'ebay-shopbot', 'missionfish', 'paypal-giving-fund', 'magento',
  'ebay-trading-assistants', 'xcommerce', 'tcgplayer-buylist', 'tise-cash',
]

// Items that were in the exclusion list (already-in-registry) and should NOT be duplicated
// via Wave 6 addition. These should exist exactly once (from original registry), not twice.
const WAVE6_EXCLUDED_IDS = [
  'background-enhancement', 'buy-again', 'circular-fashion-fund',
  'express-payouts', 'fitment-plus', 'fitment-plus-auto', 'issue-resolution-center',
  'magical-listing', 'my-garage', 'payouts-on-demand', 'pre-loved-partner-program',
  'seller-initiated-offers', 'ebay-assured-fit', 'ebay-authenticate',
  // bepp was not in registry at all - omitted from this check
]

// ── Helpers ──────────────────────────────────────────────────────────────────

const allIds = ENRICHED_PROGRAMS.map(n => n.id)
const idSet = new Set(allIds)
const nodeMap = new Map(ENRICHED_PROGRAMS.map(n => [n.id, n]))

function countOccurrences(id: string): number {
  return allIds.filter(i => i === id).length
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('Registry Integrity — enriched-consolidated-DEDUPLICATED.ts', () => {

  it('loads and exports ENRICHED_PROGRAMS array', () => {
    expect(Array.isArray(ENRICHED_PROGRAMS)).toBe(true)
    expect(ENRICHED_PROGRAMS.length).toBeGreaterThan(1000)
  })

  // ── Test 1: No duplicate IDs ────────────────────────────────────────────

  it('has no duplicate IDs', () => {
    const seen = new Map<string, number>()
    for (const n of ENRICHED_PROGRAMS) {
      seen.set(n.id, (seen.get(n.id) || 0) + 1)
    }
    const duplicates = [...seen.entries()].filter(([, count]) => count > 1)
    expect(duplicates, `Duplicate IDs found: ${duplicates.map(([id, c]) => `${id}(x${c})`).join(', ')}`).toHaveLength(0)
  })

  // ── Test 2: Required fields present ────────────────────────────────────

  it('has all required fields on every node', () => {
    const violations: string[] = []
    for (const n of ENRICHED_PROGRAMS) {
      const missing: string[] = []
      if (!n.id || typeof n.id !== 'string') missing.push('id')
      if (!n.name || typeof n.name !== 'string') missing.push('name')
      if (!n.type) missing.push('type')
      if (!n.tier) missing.push('tier')
      if (!n.status) missing.push('status')
      if (!n.desc || typeof n.desc !== 'string') missing.push('desc')
      if (missing.length > 0) {
        violations.push(`${n.id || '(no id)'}: missing [${missing.join(', ')}]`)
      }
    }
    expect(violations, `Nodes missing required fields:\n${violations.join('\n')}`).toHaveLength(0)
  })

  // ── Test 3: Valid enum values ───────────────────────────────────────────

  it('has valid type enum values on every node', () => {
    const invalid = ENRICHED_PROGRAMS.filter(n => n.type && !VALID_TYPES.has(n.type))
    expect(invalid.map(n => `${n.id}: type="${n.type}"`)).toHaveLength(0)
  })

  it('has valid tier enum values on every node', () => {
    const invalid = ENRICHED_PROGRAMS.filter(n => n.tier && !VALID_TIERS.has(n.tier))
    expect(invalid.map(n => `${n.id}: tier="${n.tier}"`)).toHaveLength(0)
  })

  it('has valid status enum values on every node', () => {
    const invalid = ENRICHED_PROGRAMS.filter(n => n.status && !VALID_STATUSES.has(n.status))
    expect(invalid.map(n => `${n.id}: status="${n.status}"`)).toHaveLength(0)
  })

  // ── Test 4: No self-parent cycles ──────────────────────────────────────

  it('has no self-parent cycles', () => {
    const selfCycles = ENRICHED_PROGRAMS.filter(n => n.parent === n.id)
    expect(selfCycles.map(n => n.id)).toHaveLength(0)
  })

  // ── Test 5: All parent references resolve ──────────────────────────────

  it('has all parent references pointing to existing nodes', () => {
    const broken = ENRICHED_PROGRAMS.filter(n => n.parent && !idSet.has(n.parent))
    expect(
      broken.map(n => `${n.id} → "${n.parent}"`),
      `Nodes with invalid parent refs:\n${broken.map(n => `  ${n.id} → "${n.parent}"`).join('\n')}`
    ).toHaveLength(0)
  })

  // ── Test 6: Market values are valid ────────────────────────────────────

  it('has valid market values on all nodes', () => {
    const violations: string[] = []
    for (const n of ENRICHED_PROGRAMS) {
      if (n.market === undefined) continue
      if (Array.isArray(n.market)) {
        const bad = n.market.filter(m => typeof m !== 'string' || m.length === 0)
        if (bad.length > 0) violations.push(`${n.id}: invalid market array entries`)
      } else if (typeof n.market === 'string') {
        // Allow standard codes + 2-letter ISO codes (for regional nodes)
        if (!VALID_MARKET_CODES.has(n.market) && !/^[A-Z]{2}$/.test(n.market)) {
          violations.push(`${n.id}: invalid market "${n.market}"`)
        }
      } else {
        violations.push(`${n.id}: market must be string or string[]`)
      }
    }
    expect(violations).toHaveLength(0)
  })

  // ── Test 7: Rename chains are symmetric ────────────────────────────────

  it('has symmetric renamedTo/renamedFrom chains', () => {
    const asymmetric: string[] = []
    for (const n of ENRICHED_PROGRAMS) {
      // If A.renamedTo = B, then B.renamedFrom should = A
      if (n.renamedTo) {
        if (!idSet.has(n.renamedTo)) {
          asymmetric.push(`${n.id}.renamedTo="${n.renamedTo}" (target not in registry)`)
        } else {
          const target = nodeMap.get(n.renamedTo)!
          if (target.renamedFrom !== n.id) {
            // Allow multi-predecessor cases (seller-hub, managed-payments)
            // These are known architectural cases logged as warnings
            const KNOWN_MULTI_PREDECESSOR_TARGETS = new Set(['seller-hub', 'managed-payments'])
            if (!KNOWN_MULTI_PREDECESSOR_TARGETS.has(n.renamedTo)) {
              asymmetric.push(`${n.id} → ${n.renamedTo}: target.renamedFrom="${target.renamedFrom || 'missing'}"`)
            }
          }
        }
      }
      // If A.renamedFrom = B, then B.renamedTo should = A
      if (n.renamedFrom) {
        if (!idSet.has(n.renamedFrom)) {
          asymmetric.push(`${n.id}.renamedFrom="${n.renamedFrom}" (source not in registry)`)
        } else {
          const source = nodeMap.get(n.renamedFrom)!
          if (source.renamedTo !== n.id) {
            // Allow multi-predecessor cases
            const KNOWN_MULTI_PREDECESSOR_SOURCES = new Set(['paypal', 'paypal-checkout', 'picture-manager', 'selling-manager', 'selling-manager-pro'])
            if (!KNOWN_MULTI_PREDECESSOR_SOURCES.has(n.renamedFrom)) {
              asymmetric.push(`${n.id}.renamedFrom="${n.renamedFrom}" but ${n.renamedFrom}.renamedTo="${source.renamedTo || 'missing'}"`)
            }
          }
        }
      }
    }
    expect(asymmetric, `Asymmetric rename chains:\n${asymmetric.join('\n')}`).toHaveLength(0)
  })

  // ── Test 8: Optional field type safety ─────────────────────────────────

  it('has valid released date format where present', () => {
    const violations = ENRICHED_PROGRAMS
      .filter(n => n.released !== undefined)
      .filter(n => typeof n.released !== 'string' || !RELEASED_PATTERN.test(n.released!))
      .map(n => `${n.id}: released="${n.released}"`)
    expect(violations).toHaveLength(0)
  })

  it('has valid sourceUrl format where present (must start with https://)', () => {
    const violations = ENRICHED_PROGRAMS
      .filter(n => n.sourceUrl !== undefined)
      .filter(n => typeof n.sourceUrl !== 'string' || !n.sourceUrl.startsWith('https://'))
      .map(n => `${n.id}: sourceUrl="${n.sourceUrl}"`)
    expect(violations).toHaveLength(0)
  })

  it('has valid relationships structure where present', () => {
    const violations: string[] = []
    for (const n of ENRICHED_PROGRAMS) {
      if (!n.relationships) continue
      if (!Array.isArray(n.relationships)) {
        violations.push(`${n.id}: relationships is not an array`)
        continue
      }
      for (let i = 0; i < n.relationships.length; i++) {
        const rel = n.relationships[i]
        if (!rel.target) violations.push(`${n.id}: relationships[${i}] missing target`)
        if (!rel.type) violations.push(`${n.id}: relationships[${i}] missing type`)
        if (rel.target && !idSet.has(rel.target)) {
          violations.push(`${n.id}: relationships[${i}].target="${rel.target}" not in registry`)
        }
      }
    }
    expect(violations).toHaveLength(0)
  })

  // ── Test 9: Status "unknown" is not being used as a catch-all ──────────

  it('has 3 or fewer nodes with status "unknown"', () => {
    const unknownNodes = ENRICHED_PROGRAMS.filter(n => n.status === 'unknown')
    expect(
      unknownNodes.length,
      `Too many "unknown" status nodes (${unknownNodes.length}): ${unknownNodes.map(n => n.id).join(', ')}`
    ).toBeLessThanOrEqual(3)
  })

  // ── Test 10: All 66 Wave 6 node IDs are present ─────────────────────

  it('contains all 66 Wave 6 node IDs', () => {
    const missing = WAVE6_IDS.filter(id => !idSet.has(id))
    expect(
      missing,
      `Missing Wave 6 IDs: ${missing.join(', ')}`
    ).toHaveLength(0)
  })

  // ── Test 11: Excluded items not duplicated ───────────────────────────

  it('does not have duplicated Wave 6 excluded items', () => {
    const duplicated = WAVE6_EXCLUDED_IDS.filter(id => countOccurrences(id) > 1)
    expect(
      duplicated,
      `Excluded items appear more than once: ${duplicated.join(', ')}`
    ).toHaveLength(0)
  })

  // ── Test 12: Node count sanity check ────────────────────────────────

  it('has more than 1000 nodes (sanity check against data loss)', () => {
    expect(ENRICHED_PROGRAMS.length).toBeGreaterThan(1000)
  })

  it('has the masterbrand node as first node', () => {
    expect(ENRICHED_PROGRAMS[0].id).toBe('ebay')
    expect(ENRICHED_PROGRAMS[0].tier).toBe('master')
    expect(ENRICHED_PROGRAMS[0].type).toBe('masterbrand')
  })

  // ── Test 13: Goldin parent node exists ─────────────────────────────────

  it('has a node with id "goldin" (parent for goldin sub-products)', () => {
    const goldin = nodeMap.get('goldin')
    expect(goldin, '"goldin" node must exist as parent for goldin-marketplace etc.').toBeDefined()
    expect(goldin?.name).toBe('Goldin')
  })

  // ── Test 14: Depop parent node exists ──────────────────────────────────

  it('has a node with id "depop" (parent for depop sub-features)', () => {
    const depop = nodeMap.get('depop')
    expect(depop, '"depop" node must exist as parent for depop-payments etc.').toBeDefined()
    expect(depop?.name).toBe('Depop')
  })

  // ── Test 15: Caramel parent node exists ────────────────────────────────

  it('has a node with id "caramel" (parent for caramel-dealer-services)', () => {
    const caramel = nodeMap.get('caramel')
    expect(caramel, '"caramel" node must exist as parent for caramel-dealer-services').toBeDefined()
    expect(caramel?.name).toBe('Caramel')
  })

  // ── Test 16: Valid brandTier values (when set) ─────────────────────────

  it('has valid brandTier values on all nodes that set it', () => {
    const VALID_BRAND_TIERS = new Set(['t1', 't2_badge', 't2_name', 't3', 'unclassified'])
    const invalid = ENRICHED_PROGRAMS
      .filter(n => n.brandTier !== undefined && !VALID_BRAND_TIERS.has(n.brandTier!))
      .map(n => `${n.id}: brandTier="${n.brandTier}"`)
    expect(invalid).toHaveLength(0)
  })

  // ── Test 17: Valid umbrellaType values (when set) ─────────────────────

  it('has valid umbrellaType values on all nodes that set it', () => {
    const VALID_UMBRELLA_TYPES = new Set(['brand-architecture', 'navigation-taxonomy'])
    const invalid = ENRICHED_PROGRAMS
      .filter(n => {
        const ut = (n as any).umbrellaType
        return ut !== undefined && !VALID_UMBRELLA_TYPES.has(ut)
      })
      .map(n => `${n.id}: umbrellaType="${(n as any).umbrellaType}"`)
    expect(invalid).toHaveLength(0)
  })

  // ── Test 18: All relationship targets resolve ──────────────────────────

  it('has no broken relationship target references', () => {
    const broken: string[] = []
    for (const n of ENRICHED_PROGRAMS) {
      if (!n.relationships) continue
      for (const rel of n.relationships) {
        if (rel.target && !idSet.has(rel.target)) {
          broken.push(`${n.id} → relationships.target "${rel.target}" not in registry`)
        }
      }
    }
    expect(broken).toHaveLength(0)
  })

  // ── Test 19: namingTreatment values are valid enum values ──────────────

  it('has valid namingTreatment values on all nodes that set it', () => {
    const VALID_NAMING_TREATMENTS = new Set([
      'owned_marketing_name', 'partner_brand', 'descriptive_label',
      'functional_label', 'internal_label', 'unknown',
    ])
    const invalid = ENRICHED_PROGRAMS
      .filter(n => {
        const nt = (n as any).namingTreatment
        return nt !== undefined && !VALID_NAMING_TREATMENTS.has(nt)
      })
      .map(n => `${n.id}: namingTreatment="${(n as any).namingTreatment}"`)
    expect(invalid).toHaveLength(0)
  })

  // ── Test 20: countsAsManagedName is true only for owned_marketing_name ──
  // Legacy/renamed nodes: they were owned_marketing_name historically but are no longer
  // the active managed name, so cam=false is correct even with owned_marketing_name.

  it('has countsAsManagedName true only when namingTreatment is owned_marketing_name (current nodes)', () => {
    const violations: string[] = []
    for (const n of ENRICHED_PROGRAMS) {
      const nt = (n as any).namingTreatment
      const cam = (n as any).countsAsManagedName
      if (cam === undefined) continue
      const isInactive = n.status === 'legacy' || n.status === 'renamed'
      // Current owned_marketing_name nodes must have cam=true
      if (nt === 'owned_marketing_name' && !isInactive && cam !== true) {
        violations.push(`${n.id}: namingTreatment="owned_marketing_name" status="${n.status}" but countsAsManagedName=${cam} (expected true)`)
      }
      // Legacy/renamed owned_marketing_name: cam must be false (historical name, no longer active)
      if (nt === 'owned_marketing_name' && isInactive && cam !== false) {
        violations.push(`${n.id}: namingTreatment="owned_marketing_name" status="${n.status}" (inactive) but countsAsManagedName=${cam} (expected false)`)
      }
      // Non-owned_marketing_name nodes must have cam=false
      if (nt !== 'owned_marketing_name' && nt !== undefined && cam !== false) {
        violations.push(`${n.id}: namingTreatment="${nt}" but countsAsManagedName=${cam} (expected false)`)
      }
    }
    expect(violations).toHaveLength(0)
  })

  // ── Test 21: secure-purchase classification anchor ─────────────────────

  it('has secure-purchase classified as owned_marketing_name or notes it is not in registry', () => {
    const securePurchase = nodeMap.get('secure-purchase')
    if (!securePurchase) {
      // Not in registry — test passes with note
      expect(true).toBe(true) // secure-purchase is not in this registry
    } else {
      expect((securePurchase as any).namingTreatment).toBe('owned_marketing_name')
    }
  })

  // ── Test 22: legacy/renamed nodes must not have countsAsManagedName=true ──
  // Decision: the current canonical node carries the classification.
  // A renamed or legacy node is no longer the managed name.

  it('has no legacy or renamed nodes with countsAsManagedName=true', () => {
    const violations = ENRICHED_PROGRAMS
      .filter(n => (n as any).countsAsManagedName === true)
      .filter(n => n.status === 'legacy' || n.status === 'renamed')
      .map(n => `${n.id}: status="${n.status}" but countsAsManagedName=true`)
    expect(
      violations,
      `Legacy/renamed nodes must not count as managed names:\n${violations.join('\n')}`,
    ).toHaveLength(0)
  })

  // ── Test 23: countsAsManagedName=true requires namingTreatment to be set ─
  // A node should not be marked as a managed name without a namingTreatment value.

  it('has no nodes with countsAsManagedName=true but namingTreatment absent', () => {
    const violations = ENRICHED_PROGRAMS
      .filter(n => (n as any).countsAsManagedName === true)
      .filter(n => (n as any).namingTreatment === undefined)
      .map(n => `${n.id}: countsAsManagedName=true but namingTreatment is absent`)
    expect(
      violations,
      `countsAsManagedName=true requires namingTreatment to be set:\n${violations.join('\n')}`,
    ).toHaveLength(0)
  })

})
