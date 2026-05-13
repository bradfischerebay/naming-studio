// Overnight Registry Scan — Status Changes for Existing Registry Entries
// Scan Date: 2026-04-29
// These entries already exist in the naming repository but have changed status.
// Apply these changes to enriched-consolidated-DEDUPLICATED.ts

export interface StatusChangeRecord {
  registry_id: string
  canonical_name: string
  change_type: "deprecated" | "renamed" | "name_correction" | "status_update" | "false_positive" | "verify_status"
  old_status?: string
  new_status?: string
  old_name?: string
  new_name?: string
  effective_date?: string
  evidence_quality: "A" | "B" | "C" | "D" | "E"
  evidence_sources: string[]
  notes: string
  action_required: string
  scan_date: string
}

export const STATUS_CHANGES: StatusChangeRecord[] = [

  // ─── CONFIRMED DEPRECATED ─────────────────────────────────────────────────

  {
    registry_id: "top-star",
    canonical_name: "Top Star",
    change_type: "deprecated",
    old_status: "live",
    new_status: "deprecated",
    effective_date: "2025-03-31",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.valueaddedresource.net/ebay-ends-top-star-sneaker-buyer-loyalty-program/",
      "https://www.soleretriever.com/news/articles/ebay-top-star-sneaker-program-explained-everything-you-need-to-know",
    ],
    notes: "eBay officially closed Top Star (invite-only sneaker/watch buyer loyalty program) on March 31, 2025. Program ran May 2021 – March 31, 2025. Landing page was topstar.ebay.com. eBay stated they were 'shifting focus onto new sneaker initiatives.' No successor program announced.",
    action_required: "Update live_status → 'deprecated'. Add end_date: '2025-03-31'. Add date_range: '2021–2025'. Move to Legacy section.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "known-origin",
    canonical_name: "KnownOrigin",
    change_type: "deprecated",
    old_status: "live",
    new_status: "deprecated",
    effective_date: "2024-07-01",
    evidence_quality: "A",
    evidence_sources: [
      "https://techcrunch.com/ (2024 closure reporting)",
    ],
    notes: "eBay acquired KnownOrigin (NFT/digital art marketplace) in June 2022. Laid off 30% of staff in February 2024 and fully shut down mid-2024. Cited 'shifts in the NFT market.' The brand and platform are no longer active.",
    action_required: "Update live_status → 'deprecated'. Add end_date: '2024-07-01'. Mark nameClass → 'Legacy Residue'.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "fast-n-free",
    canonical_name: "Fast 'N Free",
    change_type: "deprecated",
    old_status: "unknown",
    new_status: "deprecated",
    evidence_quality: "C",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/resources (not mentioned in any current nav)",
    ],
    notes: "Fast 'N Free does not appear on any live Seller Center page, help page, or shipping page. Seller Center resources shipping section lists only EIS, ShipCover, eBay Standard Envelope, and carrier label programs. Consistent with known deprecation. No explicit deprecation notice found — inferred from complete absence.",
    action_required: "Update live_status → 'deprecated' (or 'unknown' if team prefers absence-based inference to be flagged). Evidence is absence.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "selling-manager",
    canonical_name: "Selling Manager",
    change_type: "deprecated",
    old_status: "unknown",
    new_status: "deprecated",
    evidence_quality: "B",
    evidence_sources: [
      "https://www.ebay.com/help/selling/selling-tools/seller-hub?id=4095",
    ],
    notes: "Selling Manager is referenced in Seller Hub help documentation only as a legacy tool being compared to Seller Hub. No standalone Selling Manager pages exist. Replaced by Seller Hub.",
    action_required: "Update live_status → 'deprecated'. Mark renamedTo: 'seller-hub'.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "ebay-academy",
    canonical_name: "eBay Academy",
    change_type: "verify_status",
    old_status: "live",
    new_status: "unknown",
    evidence_quality: "C",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/ebay-academy (returns 404)",
      "https://www.ebay.academy (ECONNREFUSED)",
    ],
    notes: "eBay Academy Seller Center URL returns 404. eBay.academy domain is unreachable. Not listed in current Seller Center resources navigation. May have been renamed to 'Seller Clinics' or discontinued. Cannot confirm from public sources.",
    action_required: "Flag for internal verification. If deprecated, mark and add end_date. If renamed, add renamedTo pointer.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "auto-price-reduction",
    canonical_name: "Auto Price Reduction",
    change_type: "deprecated",
    old_status: "live",
    new_status: "deprecated",
    effective_date: "2026-02-01",
    evidence_quality: "C",
    evidence_sources: [
      "https://www.ecommercebytes.com/ (February 2026 discontinuation coverage)",
      "https://community.ebay.com/ (community threads confirming removal)",
    ],
    notes: "Feature to automatically reduce fixed-price listing prices over time. Launched 2025, discontinued February 2026. Was only available in Simple Listing Tool (not Seller Hub). Short-lived program.",
    action_required: "If in registry, update live_status → 'deprecated'. Add end_date: '2026-02-01'. Mark as one-off/short-lived.",
    scan_date: "2026-04-29",
  },

  // ─── CONFIRMED RENAMED ────────────────────────────────────────────────────

  {
    registry_id: "promoted-listings-standard",
    canonical_name: "Promoted Listings Standard",
    change_type: "renamed",
    old_name: "Promoted Listings Standard",
    new_name: "Promoted Listings General",
    effective_date: "2024-07-01",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/growth/ebay-advertising/promoted-listings",
      "https://www.valueaddedresource.net/ebay-july-2024-seller-news/",
    ],
    notes: "Renamed from 'Promoted Listings Standard' (PLS) to 'Promoted Listings General' (PLG) in Summer 2024. CPS (cost-per-sale) model. Seller Center page now uses 'general strategy' as the descriptor within Promoted Listings, but official product name is 'Promoted Listings General'. Note: the Seller Center page describes tiers as 'General Strategy' and 'Priority Strategy' but the product names in the July 2024 update are 'Promoted Listings General' and 'Promoted Listings Priority'.",
    action_required: "Add renamedTo: 'promoted-listings-general'. Mark Promoted Listings Standard as renamed. Add new node 'promoted-listings-general' if not already present.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "promoted-listings-advanced",
    canonical_name: "Promoted Listings Advanced",
    change_type: "renamed",
    old_name: "Promoted Listings Advanced",
    new_name: "Promoted Listings Priority",
    effective_date: "2024-07-01",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/growth/ebay-advertising/promoted-listings",
      "https://www.valueaddedresource.net/ebay-july-2024-seller-news/",
    ],
    notes: "Renamed from 'Promoted Listings Advanced' (PLA) to 'Promoted Listings Priority' (PLP) in Summer 2024. CPC (cost-per-click) model. Exclusive top ad slots added January 13, 2026. The /sellercenter/growth/promoted-listings-advanced URL now returns 404.",
    action_required: "Add renamedTo: 'promoted-listings-priority'. Mark Promoted Listings Advanced as renamed. Confirm Promoted Listings Priority is already in registry.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "promotions-manager",
    canonical_name: "Promotions Manager",
    change_type: "renamed",
    old_name: "Promotions Manager",
    new_name: "Seller Hub Discounts",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/growth/seller-hub-promotions",
    ],
    notes: "The old 'Promotions Manager' URL (pages.ebay.com/promotionsmanager) redirects to /sellercenter/growth/seller-hub-promotions. The tool is consistently called 'Seller Hub Discounts' on the live page. Sub-features include Volume Pricing, Sale Event, Coupons, Automated Offer, Order Discount, and Shipping Discounts.",
    action_required: "Add renamedTo: 'seller-hub-discounts'. Mark Promotions Manager as renamed. Seller Hub Discounts is a new node to add.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "terapeak",
    canonical_name: "Terapeak",
    change_type: "renamed",
    old_name: "Terapeak",
    new_name: "Product Research",
    evidence_quality: "C",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/resources (Terapeak not mentioned in nav)",
      "Terapeak Seller Center URL redirects to error",
    ],
    notes: "The Terapeak name does not appear on any live Seller Center page. Seller Center lists 'Research Tools' as the section label under Growth. The old Terapeak Seller Center URL redirects to eBay error page. Consistent with known rename to 'Product Research'. No page explicitly confirming the new name was directly accessible, but Terapeak is entirely absent from all live references.",
    action_required: "Mark Terapeak as renamed. Add renamedTo: 'product-research'. If Product Research node doesn't exist in registry, add it. Evidence is absence-based (C quality) — confirm internally.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "global-shipping-program",
    canonical_name: "Global Shipping Program",
    change_type: "renamed",
    old_name: "Global Shipping Program",
    new_name: "eBay International Shipping",
    effective_date: "2024-01-01",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/sellercenter/shipping/ebay-international-shipping",
      "https://export.ebay.com/en/services-tools/shipping/ebay-international-shipping/",
    ],
    notes: "Global Shipping Program (GSP) consolidated with International Standard Delivery into unified 'eBay International Shipping' (eIS) program in 2024. Both legacy names effectively deprecated. eBay International Shipping now handles all cross-border logistics.",
    action_required: "Mark Global Shipping Program as renamed. Add renamedTo: 'ebay-international-shipping'. Ensure eBay International Shipping is confirmed live in registry.",
    scan_date: "2026-04-29",
  },

  // ─── NAME CORRECTIONS ─────────────────────────────────────────────────────

  {
    registry_id: "ebay-managed-payments",
    canonical_name: "eBay Managed Payments",
    change_type: "name_correction",
    notes: "The branded program name 'eBay Managed Payments' is no longer used in live Seller Center or help pages. eBay's payment system is now referred to only as 'Payments' in navigation (My eBay → Payments) and 'Payments Terms of Use' in legal footers. The branded program name has been retired as a marketing term (payments are now mandatory for all sellers, so there's nothing to 'manage' separately). The underlying payment infrastructure remains; the name is deprecated.",
    evidence_quality: "B",
    evidence_sources: [
      "https://www.ebay.com/help/selling/getting-paid/getting-paid-items-youve-sold",
    ],
    action_required: "Mark as deprecated brand name. Underlying payment system is 'Payments'. Consider nameClass update to 'Legacy Residue'.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "ebay-guaranteed-fit",
    canonical_name: "eBay Guaranteed Fit",
    change_type: "name_correction",
    old_name: "Guaranteed Fit",
    new_name: "eBay Guaranteed Fit",
    evidence_quality: "A",
    evidence_sources: [
      "https://pages.ebay.com/motors/ebay-guaranteed-fit/",
      "https://www.ebay.com/sellercenter/protections/ebay-guaranteed-fit",
    ],
    notes: "The full and official name is 'eBay Guaranteed Fit' — not just 'Guaranteed Fit'. Both the buyer-facing page and Seller Center consistently use the 'eBay' prefix. Registry entry should reflect the full name.",
    action_required: "Update canonical name to 'eBay Guaranteed Fit' if registry shows 'Guaranteed Fit' or 'Guaranteed Fit Program'.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "ebay-wow-de",
    canonical_name: "eBay WOW (DE)",
    change_type: "name_correction",
    old_name: "eBay WOW (DE)",
    new_name: "eBay WOW!",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.de/deals",
    ],
    notes: "The exact branding on the official eBay Germany deals page includes an exclamation mark: 'eBay WOW!' — full page title is 'eBay WOW! des Tages | Angebote und Schnäppchen, versandkostenfrei!'. The registry name 'eBay WOW (DE)' lacks the exclamation mark and market qualifier.",
    action_required: "Update canonical name to 'eBay WOW!' and add market: ['DE'] attribute. Or retain 'eBay WOW (DE)' with a note that official spelling includes exclamation mark.",
    scan_date: "2026-04-29",
  },

  {
    registry_id: "ebay-live-url",
    canonical_name: "eBay Live",
    change_type: "status_update",
    notes: "URL correction: ebay.com/ebay-live (hyphenated) is broken/redirects to error. Working canonical URL is ebay.com/ebaylive (no hyphen). Seller Center URL is valid: ebay.com/sellercenter/selling/how-to-sell/ebay-live.",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/ebaylive",
      "https://www.ebay.com/sellercenter/selling/how-to-sell/ebay-live",
    ],
    action_required: "Update any stored canonical_url references from /ebay-live to /ebaylive. Status remains live.",
    scan_date: "2026-04-29",
  },

  // ─── FALSE POSITIVES ──────────────────────────────────────────────────────

  {
    registry_id: "ebay-auto",
    canonical_name: "eBay Auto",
    change_type: "false_positive",
    notes: "No evidence found of 'eBay Auto' as a distinct official brand name separate from 'eBay Motors'. The term appears informally in third-party writing (e.g., 'eBay Auto Motors') but eBay's official automotive marketplace branding is consistently 'eBay Motors'. 'eBay Auto' should be marked as a false positive or informal alias — not a registered eBay product name.",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/motors",
      "Web search: no official brand usage of 'eBay Auto' found",
    ],
    action_required: "If 'eBay Auto' exists as a node in the registry, mark as false_positive or remove. The official brand is 'eBay Motors'.",
    scan_date: "2026-04-29",
  },

  // ─── VAULT STATUS (COMPLEX) ───────────────────────────────────────────────

  {
    registry_id: "ebay-vault",
    canonical_name: "eBay Vault",
    change_type: "status_update",
    notes: "eBay Vault has complex status. The 'eBay Vault' brand name remains live at ebay.com/vault. However, eBay sold the physical vault operation to PSA (Collectors) in May 2024 as part of the Goldin acquisition swap. The vault is now operated by PSA but continues to use the 'eBay Vault' branding on the consumer page. The My eBay navigation menu separately shows 'PSA Vault' as the vault navigation label — indicating a possible gradual name transition in user-facing contexts. 'Send to PSA Vault' checkout feature launched November 2025.",
    evidence_quality: "A",
    evidence_sources: [
      "https://www.ebay.com/vault",
      "https://investors.ebayinc.com/investor-news/press-release-details/2024/ (Collectors transaction)",
      "My eBay navigation menu (PSA Vault label)",
    ],
    action_required: "Flag as complex: eBay Vault brand name active at ebay.com/vault; PSA Vault appearing in UI navigation. Add a note about the operational ownership change (May 2024). Add 'PSA Vault' as an alias or successor entry. Do not mark as deprecated — consumer-facing brand is still live.",
    scan_date: "2026-04-29",
  },

]

// ─── ADDITIONAL CANDIDATES FROM GLEAN AGENT ──────────────────────────────────
// These items appeared in the Glean agent final report as potential additions.
// Lower confidence than STATUS_CHANGES above — review before acting.

export const ADDITIONAL_CANDIDATES_FROM_GLEAN = [
  {
    name: "Selling with AI",
    notes: "Umbrella landing page at pages.ebay.com/sellingwithAI/ (US) and pages.ebay.co.uk/sellingwithai/ (UK). Not a single branded product name — functions as a navigation/hub page. Consider adding as Functional Label or Hub node.",
    evidence_quality: "A",
    action: "Add as hub/landing page node if naming taxonomy includes site sections",
  },
  {
    name: "eBay Stories",
    notes: "2025 global brand campaign launched September 2025 (UK), October 2025 (US), October 2025 (DE). Follow-on to 'Things.People.Love.' marketing platform. Add as Campaign node.",
    evidence_quality: "A",
    action: "Add as Campaign node under brand campaigns",
  },
  {
    name: "Pre-Loved Fashion Week",
    notes: "Annual event co-branded with CFDA and British Fashion Council. First edition 2024. Event/campaign classification.",
    evidence_quality: "A",
    action: "Add as Event/Campaign node under eBay Fashion umbrella",
  },
  {
    name: "Listing Inspiration",
    notes: "Single third-party mention as 'new trending categories resource in eBay's mobile app selling tab' (April 2026). Not confirmed on official eBay page. Evidence D.",
    evidence_quality: "D",
    action: "Low confidence — verify on official Seller Center before adding",
  },
  {
    name: "Depoponomics",
    notes: "Depop-owned brand campaign, February 2026, national US advertising. Post-acquisition, may become part of eBay brand portfolio. Campaign classification.",
    evidence_quality: "B",
    action: "Add as Campaign under Depop brand node (once acquisition confirmed closed)",
  },
  {
    name: "SpeedPAK",
    notes: "Cross-border shipping service mentioned in German eBay January 2026 seller update. May be a pre-existing third-party logistics network name being applied to eBay Germany cross-border service. Verify brand ownership before adding as eBay name.",
    evidence_quality: "B",
    action: "Verify whether SpeedPAK is an eBay-branded service or a third-party logistics network name",
  },
]

export default STATUS_CHANGES
