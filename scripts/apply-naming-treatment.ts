#!/usr/bin/env tsx
/**
 * apply-naming-treatment.ts
 *
 * Adds namingTreatment and countsAsManagedName fields to classified nodes
 * in enriched-consolidated-DEDUPLICATED.ts.
 *
 * Classification strategy:
 *   - owned_marketing_name: nodes with brandTier t1, t2_badge, or t2_name
 *     (excluding legacy/renamed/umbrella/master/legal/organization tier nodes)
 *   - partner_brand: known external brands eBay does not own
 *   - functional_label: UI actions, navigation, functional phrases (brandTier t3, non-legal tier)
 *   - internal_label: backend algorithms, internal systems
 *   - descriptive_label: descriptive policy parameters (handling times, return windows)
 *   - Skipped: umbrella/master/legal/organization tier; legacy/renamed status; ambiguous cases
 *
 * Run: npx tsx scripts/apply-naming-treatment.ts
 */

import fs from "fs"
import path from "path"

const FILE = path.resolve(
  __dirname,
  "../app/naming-graph/enriched-consolidated-DEDUPLICATED.ts"
)

// ─── NamingTreatment type ─────────────────────────────────────────────────────

type NamingTreatment =
  | "owned_marketing_name"
  | "partner_brand"
  | "descriptive_label"
  | "functional_label"
  | "internal_label"
  | "unknown"

interface Classification {
  id: string
  namingTreatment: NamingTreatment
  countsAsManagedName: boolean
}

// ─── Classification table ─────────────────────────────────────────────────────
//
// Conservative pass: only classify nodes where confidence is clearly high.
//
// Skipped entirely:
//   - tier: umbrella | master → structural scaffolding
//   - tier: legal | organization → governance nodes
//   - status: legacy | renamed → historical records
//   - Ambiguous cases → left unclassified
//
// ─────────────────────────────────────────────────────────────────────────────

const CLASSIFICATIONS: Classification[] = [

  // ── owned_marketing_name: brandTier t1 ───────────────────────────────────────
  // Primary signal: brandTier t1 = flagship differentiator, full-funnel marketing
  {
    id: "ebay-money-back-guarantee",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "authenticity-guarantee",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-international-shipping",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-live",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-refurbished",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "promoted-listings",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },

  // ── owned_marketing_name: brandTier t2_badge ─────────────────────────────────
  // Strong conversion drivers with icon + name treatment
  {
    id: "authenticity-guarantee-handbags",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "authenticity-guarantee-jewelry",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "authenticity-guarantee-sneakers",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "authenticity-guarantee-streetwear",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "authenticity-guarantee-trading-cards",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "authenticity-guarantee-watches",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "certified-open-box",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-assured-fit",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-guaranteed-delivery",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-guaranteed-fit",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-refurbished-warranty",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "fast-and-free",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "pre-loved-partner-program",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "top-rated-plus",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "top-rated-plus-badge",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "top-rated-seller",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "top-rated-seller-multi-market",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  // Note: preloved-partner-program is a dupe variant of pre-loved-partner-program
  {
    id: "preloved-partner-program",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },

  // ── owned_marketing_name: brandTier t2_name ──────────────────────────────────
  // Named eBay-owned programs with unique identity; not badge-treated but managed names
  {
    id: "background-enhancement",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "business-equipment-purchase-protection",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "circular-fashion-fund",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-for-charity",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-for-charity-multi-market",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-partner-network",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-plus",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-plus-membership",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-plus-multi-market",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-standard-envelope",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "express-payouts",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "express-payouts-multi-currency",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "fitment-plus",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "fitment-plus-auto",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "issue-resolution-center",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "magical-listing",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "managed-payments",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "payouts-on-demand",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "promoted-listings-general",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "promoted-listings-priority",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "promoted-offsite",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "promoted-stores",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "seller-hub",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "selling-with-ai",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  // Wave 6 t2_name nodes
  {
    id: "agentic-search",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ai-shopping-agent",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-explore",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "finances-copilot",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-consignment",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "fitment-finder",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-ambassador-program",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "offers-dashboard",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "business-cash-advance",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "flexible-growth-financing",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "ebay-merchant-financing",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  // Additional t2_name nodes identified in apply-brand-tiers.ts
  {
    id: "ebay-certified-open-box",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },
  {
    id: "promoted-listings-automated-campaigns",
    namingTreatment: "owned_marketing_name",
    countsAsManagedName: true,
  },

  // ── partner_brand: External brands eBay does not own ─────────────────────────
  // Customer-visible, freestanding brands with their own identity
  // Only classifying current (non-legacy, non-renamed) nodes
  // Not classifying legacy nodes (paypal, paypal-checkout) per rule 7
  // Not classifying organization-tier nodes (caramel-dealer-services, beckett, sgc, sneaker-con, certified-collectibles-group) per rule 6
  {
    id: "klarna",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "apple-pay",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "google-pay",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  // Freestanding acquired brands operating under their own identity
  {
    id: "goldin",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "depop",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tcgplayer",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tise",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "caramel",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  // Sub-products of partner brands — still under the partner brand identity
  // Only current, non-organization-tier sub-products
  {
    id: "goldin-marketplace",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "goldin-vault",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "goldin-weekly-auctions",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "goldin-elite-auctions",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "goldin-auctions",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "depop-payments",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "depop-shipping",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "depop-protection",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "depop-outfits",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tcgplayer-direct",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tcgplayer-pro",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tcgplayer-subscription",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tcgplayer-market-price",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tcgplayer-infinite",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },
  {
    id: "tise-cash",
    namingTreatment: "partner_brand",
    countsAsManagedName: false,
  },

  // ── functional_label: UI actions, navigation elements ────────────────────────
  // brandTier t3 nodes that are clearly UI actions or navigation
  // Skipping legal-tier t3 nodes (ccpa-compliance, gdpr-compliance, copyright, trademark,
  //   eu-consumer-rights-directive, privacy-policy, terms-of-service, user-agreement) per rule 6
  // Skipping organization-tier nodes (ebay-ventures) per rule 6
  // Skipping legacy nodes (resolution-center) per rule 7
  {
    id: "buy-it-now",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "best-offer",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "shopping-cart",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "checkout",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "watchlist",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "my-ebay",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "saved-searches",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "search-filters",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "message-center",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "notification-preferences",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "purchase-history",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "my-garage",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "seller-hub-reports",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "shipping-labels",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "image-search",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "best-match",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },
  {
    id: "help-center",
    namingTreatment: "functional_label",
    countsAsManagedName: false,
  },

  // ── internal_label: Backend algorithms, internal systems ──────────────────────
  // Not customer-facing as a named entity; algorithmic/backend
  {
    id: "cassini",
    namingTreatment: "internal_label",
    countsAsManagedName: false,
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeForRegex(s: string): string {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

/**
 * Given the text content of the file and a node id, find the object block
 * for that node and return [startIndex, endIndex] of the closing brace.
 */
function findNodeBlock(text: string, id: string): [number, number] | null {
  const pattern = new RegExp(
    `(?:"id"|id)\\s*:\\s*"${escapeForRegex(id)}"`,
    "g"
  )
  const match = pattern.exec(text)
  if (!match) return null

  // Walk backwards to find the opening brace of this object
  let openBrace = match.index
  while (openBrace > 0 && text[openBrace] !== "{") openBrace--

  // Walk forward to find the matching closing brace
  let depth = 0
  let i = openBrace
  while (i < text.length) {
    if (text[i] === "{") depth++
    else if (text[i] === "}") {
      depth--
      if (depth === 0) {
        return [openBrace, i]
      }
    }
    i++
  }
  return null
}

/**
 * Insert namingTreatment and countsAsManagedName before the closing brace of a node block.
 * Skips if either field already exists in the block.
 */
function patchNodeBlock(
  block: string,
  namingTreatment: NamingTreatment,
  countsAsManagedName: boolean
): string {
  // Check if already patched
  if (/namingTreatment\s*:/.test(block)) {
    return block
  }

  const closingBraceIdx = block.lastIndexOf("}")
  const beforeClose = block.substring(0, closingBraceIdx)

  // Determine indentation from existing fields
  const indentMatch = block.match(/\n(\s+)(?:"id"|id)\s*:/)
  const indent = indentMatch ? indentMatch[1] : "    "

  // Check if last field has trailing comma
  const trimmedBefore = beforeClose.trimEnd()
  const needsComma = !trimmedBefore.endsWith(",")

  const managedStr = countsAsManagedName ? "true" : "false"
  const insertion =
    `${needsComma ? "," : ""}\n${indent}namingTreatment: '${namingTreatment}',\n${indent}countsAsManagedName: ${managedStr}`

  return trimmedBefore + insertion + "\n" + block.substring(closingBraceIdx)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("Reading file...")
  let text = fs.readFileSync(FILE, "utf8")

  console.log("\nApplying namingTreatment classifications...")

  let applied = 0
  let notFound = 0
  const notFoundIds: string[] = []
  const treatmentCounts: Record<NamingTreatment, number> = {
    owned_marketing_name: 0,
    partner_brand: 0,
    descriptive_label: 0,
    functional_label: 0,
    internal_label: 0,
    unknown: 0,
  }
  const classifiedIds: Record<NamingTreatment, string[]> = {
    owned_marketing_name: [],
    partner_brand: [],
    descriptive_label: [],
    functional_label: [],
    internal_label: [],
    unknown: [],
  }

  for (const { id, namingTreatment, countsAsManagedName } of CLASSIFICATIONS) {
    const bounds = findNodeBlock(text, id)
    if (!bounds) {
      notFound++
      notFoundIds.push(id)
      continue
    }

    const [start, end] = bounds
    const originalBlock = text.substring(start, end + 1)
    const patchedBlock = patchNodeBlock(originalBlock, namingTreatment, countsAsManagedName)

    text = text.substring(0, start) + patchedBlock + text.substring(end + 1)
    applied++
    treatmentCounts[namingTreatment]++
    classifiedIds[namingTreatment].push(id)

    console.log(`  ✓ ${id}: ${namingTreatment}`)
  }

  console.log("\nWriting updated file...")
  fs.writeFileSync(FILE, text, "utf8")
  console.log("  ✓ File written")

  console.log("\n═══════════════════════════════════════════════════════")
  console.log("SUMMARY")
  console.log("═══════════════════════════════════════════════════════")
  console.log(`Nodes classified: ${applied}`)
  console.log(`Nodes not found:  ${notFound}`)
  if (notFoundIds.length) {
    console.log(`  Not found IDs: ${notFoundIds.join(", ")}`)
  }
  console.log("\nnamingTreatment distribution:")
  for (const [k, v] of Object.entries(treatmentCounts)) {
    if (v > 0) console.log(`  ${k}: ${v}`)
  }

  // Write report data to stdout for capture
  console.log("\n── classifiedIds ──────────────────────────────────────")
  for (const [treatment, ids] of Object.entries(classifiedIds)) {
    if (ids.length > 0) {
      console.log(`  ${treatment}: ${ids.join(", ")}`)
    }
  }
}

main()
