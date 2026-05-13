# Overnight Registry Scan — Master Summary
# Scan Date: 2026-04-29
# Agent: Overnight Registry Scan (5 parallel web agents + Glean MCP)

---

## Overview

| Metric | Count |
|--------|-------|
| Existing registry entries verified | ~900 nodes (via structured batches) |
| Status changes confirmed | 13 confirmed + 6 in ADDITIONAL_CANDIDATES |
| Net-new candidates identified | 32 |
| Deprecated entries | 6 confirmed, 1 partial (eBay Academy — verify) |
| Renamed entries | 5 confirmed |
| Name corrections | 4 |
| False positives | 1 (eBay Auto) |
| Complex/flag-for-review | 2 (eBay Vault, PSA Vault) |
| Evidence quality A | 21 records |
| Evidence quality B | 8 records |
| Evidence quality C | 6 records |
| Evidence quality D | 1 record |

---

## Agent Coverage

Five parallel background agents ran concurrently. Glean MCP was available in the parent session only — sub-agents fell back to web search. Key findings from each:

### Agent 1 — Trust & Safety
Batches covered: eBay Money Back Guarantee, Authenticity Guarantee, ShipCover, Vehicle Purchase Protection
Key finding: **Secure Purchase** is a live product not in registry (Evidence A)
Key deprecation: eBay Authenticate folded into Authenticity Guarantee

### Agent 2 — Seller Hub & Advertising
Batches covered: Seller Hub tools, Promoted Listings, Promotions Manager, research tools
Key finding: Promoted Listings Standard → **Promoted Listings General** (PLG) and Promoted Listings Advanced → **Promoted Listings Priority** (PLP) — both renamed Summer 2024 (Evidence A)
Key finding: Promotions Manager → **Seller Hub Discounts** (Evidence A)
Key finding: Terapeak → **Product Research** (Evidence C — complete absence of old name)
Key finding: **Team Access** is a live Seller Hub feature not in registry (Evidence A)

### Agent 3 — Motors, Refurbished & International
Batches covered: eBay Motors, eBay Refurbished, international shipping programs
Key finding: Global Shipping Program → **eBay International Shipping** confirmed (Evidence A)
Key finding: **Fitment Plus Auto** not in registry (Evidence B)
Key finding: eBay Certified Refurbished URL correction (old URL resolves to shoe category)
Key finding: eBay Auto is a **false positive** — official brand is eBay Motors (Evidence A)

### Agent 4 — Newsroom, Campaigns & Events
Batches covered: eBay newsroom, brand campaigns, fashion/sustainability, live commerce
Key finding: **eBay Stories** campaign (launched Sep–Oct 2025, global) not in registry (Evidence A)
Key finding: **Pre-Loved Fashion Week** event (2024+, CFDA/BFC co-branded) not in registry (Evidence A)
Key finding: **eBay Live on Tour** not in registry (Evidence A)
Key finding: Top Star deprecated March 31, 2025 — confirmed (Evidence A)
Key finding: KnownOrigin fully shut down mid-2024 (Evidence A)

### Agent 5 — Glean + AI Features + Acquisitions
Batches covered: AI tools, acquired brands, regional programs
Key finding: **AI Activate** is a live seller onboarding AI tool not in registry (Evidence A)
Key finding: **Depoponomics** campaign (Depop, Feb 2026) — Depop-branded, under eBay portfolio (Evidence B)
Key finding: **eBay Extra** (FR/IT coupon program) not in registry (Evidence B)
Key finding: **Flexible Cash Advance** and **Flexible Growth Financing** confirmed live (Evidence A)
Key finding: "Magical Listing" is NOT a proper name — descriptive language only; "Magical Bulk Listing Tool" IS capitalized properly

---

## Status Changes — Action List

See `status-changes.ts` for full records with evidence sources and action_required text.

### Confirmed Deprecated (6)
| Registry ID | Canonical Name | Deprecated Date | Evidence |
|-------------|---------------|-----------------|----------|
| top-star | Top Star | 2025-03-31 | A |
| known-origin | KnownOrigin | 2024-07-01 | A |
| fast-n-free | Fast 'N Free | Unknown | C |
| selling-manager | Selling Manager | Unknown | B |
| auto-price-reduction | Auto Price Reduction | 2026-02-01 | C |
| ebay-managed-payments | eBay Managed Payments | (brand retired) | B |

### Needs Internal Verification (1)
| Registry ID | Canonical Name | Flag |
|-------------|---------------|------|
| ebay-academy | eBay Academy | Returns 404, domain unreachable — may be renamed to "Seller Clinics" or discontinued |

### Confirmed Renamed (5)
| Registry ID | Old Name | New Name | Date | Evidence |
|-------------|----------|----------|------|----------|
| promoted-listings-standard | Promoted Listings Standard | Promoted Listings General | 2024-07 | A |
| promoted-listings-advanced | Promoted Listings Advanced | Promoted Listings Priority | 2024-07 | A |
| promotions-manager | Promotions Manager | Seller Hub Discounts | Unknown | A |
| terapeak | Terapeak | Product Research | Unknown | C |
| global-shipping-program | Global Shipping Program | eBay International Shipping | 2024 | A |

### Name Corrections (4)
| Registry ID | Issue | Correction |
|-------------|-------|-----------|
| ebay-managed-payments | Brand name retired | Mark as deprecated brand; underlying system is "Payments" |
| ebay-guaranteed-fit | Missing "eBay" prefix | Full name is "eBay Guaranteed Fit" |
| ebay-wow-de | Missing exclamation mark | Official name is "eBay WOW!" with market: ['DE'] |
| ebay-live-url | Wrong URL path | /ebay-live → /ebaylive (no hyphen) |

### False Positives (1)
| Registry ID | Notes |
|-------------|-------|
| ebay-auto | Not an official eBay brand. Official automotive brand is "eBay Motors." |

### Complex / Flag for Review (2)
| Registry ID | Status |
|-------------|--------|
| ebay-vault | Brand live at ebay.com/vault; operations sold to PSA May 2024; "PSA Vault" appearing in My eBay nav. Do NOT deprecate — document dual naming. |
| ebay-academy | Returns 404; domain unreachable. May be renamed "Seller Clinics" — internal verification needed. |

---

## Net-New Candidates — Priority Queue

See `new-candidates.ts` for full structured records. Listed here by priority:

### Tier 1 — Add Immediately (Evidence A, clear naming)
| Name | Entity Type | Parent | Notes |
|------|------------|--------|-------|
| Secure Purchase | Product | eBay Motors | Vehicle checkout solution; powered by Caramel |
| AI Activate | Feature | Seller Hub | AI-guided seller onboarding |
| Team Access | Feature | Seller Hub | Multi-user account access |
| Seller Hub Discounts | Product | Seller Hub | Successor to Promotions Manager |
| Promoted Listings General | Product | eBay Advertising | Successor to PL Standard (CPS) |
| Promoted Listings Priority | Product | eBay Advertising | Successor to PL Advanced (CPC) |
| Product Research | Product | Seller Hub | Successor to Terapeak |
| eBay International Shipping | Product | eBay Shipping | Successor to GSP + International Standard Delivery |
| eBay Stories | Campaign | eBay Brand | Global campaign Sep–Oct 2025 |
| eBay Live on Tour | Event | eBay Live | Live commerce event series |
| Pre-Loved Fashion Week | Event | eBay Fashion | Annual event, CFDA/BFC co-branded |
| Flexible Cash Advance | Product | eBay Financing | Seller capital product |
| Flexible Growth Financing | Product | eBay Financing | Seller capital product |

### Tier 2 — Add with Verification (Evidence B)
| Name | Entity Type | Notes |
|------|------------|-------|
| Fitment Plus Auto | Feature | eBay Motors auto-fill for vehicle fitment |
| PSA Vault | Feature/Integration | Third-party integration, not eBay product |
| Automated Feedback | Feature | Seller Hub — auto feedback sending |
| Seller INR Protection | Program | Seller protection for "Item Not Received" |
| Offers in Messaging | Feature | Cross-sell/upsell in eBay messages |
| eBay Extra | Program | FR/IT coupon program — verify market scope |
| Simple Delivery | Product | UK-only shipping product |
| Video Receipt | Feature | Post-purchase video confirmation |
| Depoponomics | Campaign | Depop brand campaign, Feb 2026 |
| SpeedPAK | Program/Third-party | Verify: eBay-branded or third-party logistics? |

### Tier 3 — Investigate Before Adding (Evidence C/D or ambiguous)
| Name | Notes |
|------|-------|
| eBay.ai | Possible hub/portal — verify if this is a product or a navigation section |
| AI Assistant (messaging) | Not confirmed as a standalone product name |
| Finances Copilot | Internal codename or feature label — unconfirmed |
| Inventory Mapping API | Developer tool — verify naming and classification |
| Shop the Look | Fashion feature — confirm naming is official |
| My Collection | Collectibles portfolio tracker — confirm as distinct product name |
| Listing Inspiration | Single third-party mention only (Evidence D) |
| Promoted Listings Priority Video Ads | Ad format — confirm as distinct named product |
| Promoted Stores Custom | Ad format — confirm as distinct named product |

### Campaigns — Register, Don't Add as Product Nodes
| Name | Notes |
|------|-------|
| eBay Stories | Add as Campaign node |
| Pre-Loved Fashion Week | Add as Event/Campaign node |
| Depoponomics | Add under Depop brand |
| 48 Hours of Drops | Limited-time event — if recurring, add |
| The 30/30 Collection | Single event — confirm cadence |

---

## Registry Data Quality Issues (Pre-Existing)

Flagged during scan as structural issues to address separately:

1. **Duplicate node IDs:** `ebay-advertising` (null parent), `ebay-stores` (cycle), `ebay-motors` (umbrella+vertical conflict)
2. **Mis-parented nodes:** Vehicle Purchase Protection → should be Motors; eBay Refurbished Warranty → Refurbished; Collectibles Price Guide → Collectibles; Managed Returns → Trust
3. **Floating node:** `ebay-auto` — was a candidate for re-parenting, now confirmed false positive → remove
4. **URL drift:** eBay Certified Refurbished URL uses old browse node; eBay Live URL uses hyphenated form

---

## Files Produced

| File | Description |
|------|-------------|
| `new-candidates.ts` | 32 structured new candidate records |
| `status-changes.ts` | 13 confirmed status changes + 6 additional candidates |
| `checkpoints/batch-01-trust-safety.md` | Trust & Safety batch verification |
| `checkpoints/batch-02-advertising-seller.md` | Advertising & Seller Hub batch |
| `checkpoints/batch-03-motors-international.md` | Motors, Refurbished & International batch |
| `checkpoints/batch-04-new-candidates.md` | New candidates cross-reference |
| `scan-summary.md` | This file |

---

## Next Steps

1. **Apply status-changes.ts** → update `enriched-consolidated-DEDUPLICATED.ts` with all deprecated/renamed flags
2. **Add Tier 1 candidates** → create new nodes in enriched-consolidated-DEDUPLICATED.ts
3. **Verify Tier 2 candidates** → internal research, then add
4. **Remove eBay Auto** → confirmed false positive, remove node
5. **Fix structural issues** → duplicate IDs, mis-parented nodes (separate pass)
6. **Internal check: eBay Academy** → verify deprecated vs. renamed to Seller Clinics

---

*Scan completed: 2026-04-29. All public web evidence verified by parallel agent crawl. Glean MCP used in parent session for internal context; sub-agents used web search proxy. Evidence grades reflect direct page verification (A), navigation confirmation (B), inference from absence (C), single external mention (D).*
