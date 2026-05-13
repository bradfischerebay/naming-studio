#!/usr/bin/env npx tsx
/**
 * apply-brand-tiers.ts
 *
 * Migrates enriched-consolidated-DEDUPLICATED.ts to add the new `brandTier` field
 * to the GraphNode interface, reclassifies the two nodes incorrectly using
 * structural tier "t1"/"t2", and assigns brandTier to all confidently classifiable nodes.
 *
 * Run:  npx tsx scripts/apply-brand-tiers.ts
 */

import fs from "fs"
import path from "path"

const FILE = path.resolve(
  __dirname,
  "../app/naming-graph/enriched-consolidated-DEDUPLICATED.ts"
)

// ─── Classification table ─────────────────────────────────────────────────────
// Only nodes where classification is clear and defensible are included.
// Absent = undefined (do not assign brandTier).
//
// Rules applied:
//   t1         — Most motivating flagship differentiators; full-funnel marketing;
//                heavily invested; icon + descriptive name
//   t2_badge   — Strong conversion drivers; icon + name; narrower than T1
//   t2_name    — Unique eBay value prop but not badge-worthy; Capitalized, no icon
//   t3         — Generic functional UI label or descriptive term; not a proper brand name
//   unclassified — Genuinely cannot determine without human judgment
// ─────────────────────────────────────────────────────────────────────────────

type BrandTier = "t1" | "t2_badge" | "t2_name" | "t3" | "unclassified"

interface Classification {
  id: string
  brandTier: BrandTier
  // If the node's structural tier field is currently "t1"/"t2"/"t3" (wrong),
  // provide the correct structural tier to replace it with.
  fixStructuralTier?: string
}

const CLASSIFICATIONS: Classification[] = [
  // ── T1: Flagship differentiators — full-funnel, most consumer-visible ───────
  {
    id: "authenticity-guarantee",
    brandTier: "t1",
  },
  {
    id: "ebay-live",
    brandTier: "t1",
  },
  {
    id: "ebay-money-back-guarantee",
    brandTier: "t1",
    fixStructuralTier: "program", // was incorrectly "t2" — EMBG is a program-level node
  },
  {
    id: "ebay-international-shipping",
    brandTier: "t1",
  },
  {
    id: "ebay-refurbished",
    brandTier: "t1",
  },
  {
    id: "promoted-listings",
    brandTier: "t1",
    fixStructuralTier: "product", // was incorrectly "t1" (brand tier bled into structural tier)
  },

  // ── T2 badge: Conversion drivers with icon + name treatment ──────────────────
  {
    id: "top-rated-seller",
    brandTier: "t2_badge",
  },
  {
    id: "top-rated-seller-multi-market",
    brandTier: "t2_badge",
  },
  {
    id: "top-rated-plus",
    brandTier: "t2_badge",
  },
  {
    id: "top-rated-plus-badge",
    brandTier: "t2_badge",
  },
  {
    id: "ebay-guaranteed-fit",
    brandTier: "t2_badge",
  },
  {
    id: "ebay-assured-fit",
    brandTier: "t2_badge",
  },
  {
    id: "certified-open-box",
    brandTier: "t2_badge",
  },
  {
    id: "ebay-certified-open-box",
    brandTier: "t2_badge",
  },
  {
    id: "ebay-refurbished-warranty",
    brandTier: "t2_badge",
  },
  {
    id: "pre-loved-partner-program",
    brandTier: "t2_badge",
  },
  {
    id: "preloved-partner-program",
    brandTier: "t2_badge",
  },
  {
    id: "trusted-seller",
    brandTier: "t2_badge",
  },
  {
    id: "fast-and-free",
    brandTier: "t2_badge",
  },
  {
    id: "ebay-guaranteed-delivery",
    brandTier: "t2_badge",
  },
  // Authenticity Guarantee verticals — badge treatment inherited from parent
  {
    id: "authenticity-guarantee-handbags",
    brandTier: "t2_badge",
  },
  {
    id: "authenticity-guarantee-jewelry",
    brandTier: "t2_badge",
  },
  {
    id: "authenticity-guarantee-sneakers",
    brandTier: "t2_badge",
  },
  {
    id: "authenticity-guarantee-streetwear",
    brandTier: "t2_badge",
  },
  {
    id: "authenticity-guarantee-trading-cards",
    brandTier: "t2_badge",
  },
  {
    id: "authenticity-guarantee-watches",
    brandTier: "t2_badge",
  },

  // ── T2 name: Named features without badge, capitalized, unique eBay prop ─────
  {
    id: "magical-listing",
    brandTier: "t2_name",
  },
  {
    id: "magical-bulk-listing-tool",
    brandTier: "t2_name",
  },
  {
    id: "background-enhancement",
    brandTier: "t2_name",
  },
  {
    id: "agentic-search",
    brandTier: "t2_name",
  },
  {
    id: "ai-shopping-agent",
    brandTier: "t2_name",
  },
  {
    id: "ebay-explore",
    brandTier: "t2_name",
  },
  {
    id: "finances-copilot",
    brandTier: "t2_name",
  },
  {
    id: "managed-payments",
    brandTier: "t2_name",
  },
  {
    id: "ebay-consignment",
    brandTier: "t2_name",
  },
  {
    id: "fitment-plus",
    brandTier: "t2_name",
  },
  {
    id: "fitment-plus-auto",
    brandTier: "t2_name",
  },
  {
    id: "fitment-finder",
    brandTier: "t2_name",
  },
  {
    id: "ebay-ambassador-program",
    brandTier: "t2_name",
  },
  {
    id: "offers-dashboard",
    brandTier: "t2_name",
  },
  {
    id: "express-payouts",
    brandTier: "t2_name",
  },
  {
    id: "express-payouts-multi-currency",
    brandTier: "t2_name",
  },
  {
    id: "payouts-on-demand",
    brandTier: "t2_name",
  },
  {
    id: "ebay-seller-capital",
    brandTier: "t2_name",
  },
  {
    id: "business-cash-advance",
    brandTier: "t2_name",
  },
  {
    id: "flexible-growth-financing",
    brandTier: "t2_name",
  },
  {
    id: "ebay-merchant-financing",
    brandTier: "t2_name",
  },
  {
    id: "seller-hub",
    brandTier: "t2_name",
  },
  {
    id: "terapeak",
    brandTier: "t2_name",
  },
  {
    id: "selling-with-ai",
    brandTier: "t2_name",
  },
  {
    id: "issue-resolution-center",
    brandTier: "t2_name",
  },
  {
    id: "ebay-standard-envelope",
    brandTier: "t2_name",
  },
  {
    id: "ebay-partner-network",
    brandTier: "t2_name",
  },
  // Promoted Listings sub-products — named products in the PL family
  {
    id: "promoted-listings-general",
    brandTier: "t2_name",
  },
  {
    id: "promoted-listings-priority",
    brandTier: "t2_name",
  },
  {
    id: "promoted-offsite",
    brandTier: "t2_name",
  },
  {
    id: "promoted-stores",
    brandTier: "t2_name",
  },
  {
    id: "ebay-for-charity",
    brandTier: "t2_name",
  },
  {
    id: "ebay-for-charity-multi-market",
    brandTier: "t2_name",
  },
  {
    id: "circular-fashion-fund",
    brandTier: "t2_name",
  },
  {
    id: "ebay-plus",
    brandTier: "t2_name",
  },
  {
    id: "ebay-plus-membership",
    brandTier: "t2_name",
  },
  {
    id: "ebay-plus-multi-market",
    brandTier: "t2_name",
  },
  {
    id: "business-equipment-purchase-protection",
    brandTier: "t2_name",
  },
  {
    id: "ebay-valet",
    brandTier: "t2_name",
  },
  // AI and innovation features
  {
    id: "automated-promoted-listings-campaigns",
    brandTier: "t2_name",
  },
  {
    id: "promoted-listings-automated-campaigns",
    brandTier: "t2_name",
  },

  // ── T3: Generic functional/descriptive UI labels ──────────────────────────────
  // These are labels or policy/org nodes — not proper product brand names.
  // Selected from structural tiers: legal, organization, publication, event
  // plus clearly generic functional labels that have never been brand-named.
  {
    id: "feedback-forum",
    brandTier: "t3",
  },
  {
    id: "user-agreement",
    brandTier: "t3",
  },
  {
    id: "privacy-policy",
    brandTier: "t3",
  },
  {
    id: "terms-of-service",
    brandTier: "t3",
  },
  {
    id: "copyright",
    brandTier: "t3",
  },
  {
    id: "trademark",
    brandTier: "t3",
  },
  {
    id: "gdpr-compliance",
    brandTier: "t3",
  },
  {
    id: "ccpa-compliance",
    brandTier: "t3",
  },
  {
    id: "eu-consumer-rights-directive",
    brandTier: "t3",
  },
  {
    id: "ebay-newsroom",
    brandTier: "t3",
  },
  {
    id: "ebay-ventures",
    brandTier: "t3",
  },
  // Generic UI action labels
  {
    id: "buy-it-now",
    brandTier: "t3",
  },
  {
    id: "best-offer",
    brandTier: "t3",
  },
  {
    id: "shopping-cart",
    brandTier: "t3",
  },
  {
    id: "watchlist",
    brandTier: "t3",
  },
  {
    id: "my-ebay",
    brandTier: "t3",
  },
  {
    id: "best-match",
    brandTier: "t3",
  },
  {
    id: "resolution-center",
    brandTier: "t3",
  },
  {
    id: "help-center",
    brandTier: "t3",
  },
  {
    id: "checkout",
    brandTier: "t3",
  },
  {
    id: "search-filters",
    brandTier: "t3",
  },
  {
    id: "seller-hub-reports",
    brandTier: "t3",
  },
  {
    id: "shipping-labels",
    brandTier: "t3",
  },
  {
    id: "message-center",
    brandTier: "t3",
  },
  {
    id: "notification-preferences",
    brandTier: "t3",
  },
  {
    id: "my-garage",
    brandTier: "t3",
  },
  {
    id: "purchase-history",
    brandTier: "t3",
  },
  {
    id: "saved-searches",
    brandTier: "t3",
  },
  {
    id: "vero-program",
    brandTier: "t3",
  },
  {
    id: "image-search",
    brandTier: "t3",
  },
  {
    id: "cassini",
    brandTier: "t3",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeForRegex(s: string): string {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

/**
 * Given the text content of the file and a node id, find the object block
 * for that node and return [startIndex, endIndex] of the closing brace.
 *
 * Strategy: find `"id": "TARGET"` or `id: "TARGET"`, then walk forward to
 * the matching closing brace of that object.
 */
function findNodeBlock(
  text: string,
  id: string
): [number, number] | null {
  // Match both quoted-key and unquoted-key styles
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
 * Insert `brandTier: "VALUE"` just before the closing brace of a node block.
 * Also optionally fix the structural tier field.
 */
function patchNodeBlock(
  block: string,
  brandTier: BrandTier,
  fixStructuralTier?: string
): string {
  let result = block

  // Fix structural tier if needed (t1/t2/t3 in the tier field)
  if (fixStructuralTier) {
    result = result.replace(
      /("tier"\s*:\s*)"t[123]"/,
      `$1"${fixStructuralTier}"`
    )
    // Also handle unquoted key style
    result = result.replace(
      /(tier\s*:\s*)"t[123]"/,
      `tier: "${fixStructuralTier}"`
    )
  }

  // Check if brandTier already exists in this block
  if (/"brandTier"\s*:/.test(result) || /brandTier\s*:/.test(result)) {
    // Already has brandTier — update it
    result = result.replace(
      /("brandTier"\s*:\s*)"[^"]*"/,
      `$1"${brandTier}"`
    )
    result = result.replace(
      /(brandTier\s*:\s*)"[^"]*"/,
      `brandTier: "${brandTier}"`
    )
    return result
  }

  // Insert brandTier before the closing brace
  // Find the last non-whitespace character before the closing brace
  const closingBraceIdx = result.lastIndexOf("}")
  const beforeClose = result.substring(0, closingBraceIdx)
  const afterClose = result.substring(closingBraceIdx)

  // Determine indentation from existing fields
  const indentMatch = result.match(/\n(\s+)"(?:id|tier|status|name)"\s*:/)
  const indent = indentMatch ? indentMatch[1] : "    "

  // Check if there's a trailing comma issue (last field before closing brace)
  // Find what's right before the closing brace (ignoring whitespace)
  const trimmedBefore = beforeClose.trimEnd()
  const needsComma = !trimmedBefore.endsWith(",")

  const insertion = `${needsComma ? "," : ""}\n${indent}"brandTier": "${brandTier}"`

  return beforeClose.trimEnd() + insertion + "\n" + afterClose.trimStart()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log("Reading file...")
  let text = fs.readFileSync(FILE, "utf8")

  // Step 1: Update the GraphNode interface to add brandTier and remove t1/t2/t3 from tier
  console.log("\nStep 1: Updating GraphNode interface...")

  // Remove "t1" | "t2" | "t3" from the tier union type
  const oldTierType =
    `tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"`
  const newTierType =
    `tier: "master" | "umbrella" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"`

  if (text.includes(oldTierType)) {
    text = text.replace(oldTierType, newTierType)
    console.log("  ✓ Removed t1/t2/t3 from tier union type")
  } else {
    console.log("  ⚠ Could not find exact tier type string to update — check manually")
  }

  // Add brandTier field after the tier field in the interface
  const tierFieldPattern = /(\s+tier:\s+"master"[^;]+;)/
  const brandTierAddition = `\n  brandTier?: "t1" | "t2_badge" | "t2_name" | "t3" | "unclassified"`
  if (!text.includes("brandTier?:")) {
    text = text.replace(newTierType, newTierType + brandTierAddition)
    console.log("  ✓ Added brandTier? field to GraphNode interface")
  } else {
    console.log("  ✓ brandTier? field already present in interface")
  }

  // Step 2: Apply classifications
  console.log("\nStep 2: Applying brandTier classifications...")

  let applied = 0
  let notFound = 0
  const notFoundIds: string[] = []
  const tierCounts: Record<BrandTier, number> = {
    t1: 0,
    t2_badge: 0,
    t2_name: 0,
    t3: 0,
    unclassified: 0,
  }

  for (const { id, brandTier, fixStructuralTier } of CLASSIFICATIONS) {
    const bounds = findNodeBlock(text, id)
    if (!bounds) {
      notFound++
      notFoundIds.push(id)
      continue
    }

    const [start, end] = bounds
    const originalBlock = text.substring(start, end + 1)
    const patchedBlock = patchNodeBlock(originalBlock, brandTier, fixStructuralTier)

    text = text.substring(0, start) + patchedBlock + text.substring(end + 1)
    applied++
    tierCounts[brandTier]++

    const fixNote = fixStructuralTier ? ` (structural tier fixed → ${fixStructuralTier})` : ""
    console.log(`  ✓ ${id}: ${brandTier}${fixNote}`)
  }

  // Step 3: Write the file back
  console.log("\nStep 3: Writing updated file...")
  fs.writeFileSync(FILE, text, "utf8")
  console.log("  ✓ File written")

  // Step 4: Summary
  console.log("\n═══════════════════════════════════════════════════════")
  console.log("SUMMARY")
  console.log("═══════════════════════════════════════════════════════")
  console.log(`Nodes classified: ${applied}`)
  console.log(`Nodes not found:  ${notFound}`)
  if (notFoundIds.length) {
    console.log(`  Not found IDs: ${notFoundIds.join(", ")}`)
  }
  console.log("\nbrandTier distribution:")
  console.log(`  t1        : ${tierCounts.t1}`)
  console.log(`  t2_badge  : ${tierCounts.t2_badge}`)
  console.log(`  t2_name   : ${tierCounts.t2_name}`)
  console.log(`  t3        : ${tierCounts.t3}`)
  console.log(`  unclassified: ${tierCounts.unclassified}`)
  console.log(`  TOTAL     : ${applied}`)

  // Step 5: Verify no structural tier still has t1/t2/t3
  const remainingBadTiers = (text.match(/"tier":\s*"t[123]"/g) || [])
    .concat(text.match(/\btier:\s*"t[123]"/g) || [])
  if (remainingBadTiers.length) {
    console.log(`\n⚠ WARNING: ${remainingBadTiers.length} nodes still have t1/t2/t3 as structural tier:`)
    // Find which ones
    const badMatches = [...text.matchAll(/(?:"tier":|tier:)\s*"t[123]"/g)]
    for (const m of badMatches) {
      // Find context around it
      const contextStart = Math.max(0, m.index! - 100)
      const context = text.substring(contextStart, m.index! + 30)
      const idMatch = context.match(/"id":\s*"([^"]+)"/)
      console.log(`  - ${idMatch ? idMatch[1] : "unknown"}: ${m[0]}`)
    }
  } else {
    console.log("\n✓ No structural tiers remaining with t1/t2/t3 values")
  }
}

main()
