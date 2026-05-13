# Batch 04 — New Candidates Cross-Reference
# Scan Date: 2026-04-29
# Agent: Overnight Registry Scan

## Purpose

This checkpoint consolidates and cross-references all net-new candidate names discovered across all 5 parallel agents. Each entry is classified for immediate action. Full structured data is in `new-candidates.ts`.

---

## Tier 1 — Add Immediately (Evidence A, clear naming)

These items have Evidence A (directly verified on live official eBay pages) and clear, unambiguous naming. Add to registry in the next update pass.

| Name | Entity Type | Parent | Evidence | Source |
|------|------------|--------|----------|--------|
| Secure Purchase | Product | eBay Motors | A | ebay.com/secure-purchase |
| AI Activate | Feature | Seller Hub | A | pages.ebay.com/selleractivate/ (AI-guided version) |
| Team Access | Feature | Seller Hub | A | ebay.com/sellercenter/selling (multi-user account) |
| Seller Hub Discounts | Product | Seller Hub | A | ebay.com/sellercenter/growth/seller-hub-promotions |
| Promoted Listings General | Product | eBay Advertising | A | ebay.com/sellercenter/growth/ebay-advertising |
| Promoted Listings Priority | Product | eBay Advertising | A | ebay.com/sellercenter/growth/ebay-advertising |
| Product Research | Product | Seller Hub | A (inferred) | Terapeak name fully absent |
| eBay International Shipping | Product | eBay Shipping | A | ebay.com/sellercenter/shipping/ebay-international-shipping |
| eBay Stories | Campaign | eBay Brand | A | Official campaign launch press Sep–Oct 2025 |
| eBay Live on Tour | Event | eBay Live | A | Live event series confirmed 2025 |
| Pre-Loved Fashion Week | Event | eBay Fashion | A | CFDA/BFC co-branded, 2024+ |
| Flexible Cash Advance | Product | eBay Capital | A | Seller financing product |
| Flexible Growth Financing | Product | eBay Capital | A | Seller financing product |

---

## Tier 2 — Add with Verification (Evidence B)

These items have two-source or strong single-source confirmation but require internal verification before adding. Priority add-next-week candidates.

| Name | Entity Type | Market | Flag | Notes |
|------|------------|--------|------|-------|
| Fitment Plus Auto | Feature | US | — | Confirm naming precision on official page |
| PSA Vault | Feature/Integration | US | THIRD-PARTY | Not an eBay product name; classify as integration |
| Automated Feedback | Feature | US | — | Verify exact name on Seller Hub UI |
| Seller INR Protection | Program | US | — | Verify on Seller Center |
| Offers in Messaging | Feature | US | — | Cross-sell in messages; confirm as distinct feature name |
| eBay Extra | Program | FR, IT | — | Confirm market scope |
| eBay réparation | Program | FR | — | French-market repair program |
| Simple Delivery | Product | UK | — | UK managed shipping; confirm distinct name from US programs |
| Video Receipt | Feature | US | — | Post-purchase video; confirm as Feature Name |
| Depoponomics | Campaign | US | DEPOP | Under Depop brand, not eBay brand directly |
| SpeedPAK | Program/3P | DE | BRAND OWNER? | Verify if eBay-branded or third-party logistics |

---

## Tier 3 — Investigate Before Adding (Evidence C/D or ambiguous classification)

These items need additional research or internal confirmation before any registry action.

| Name | Evidence | Issue |
|------|----------|-------|
| eBay.ai | C | May be hub/portal, not a named product |
| AI Assistant (messaging) | C | Possibly a functional label, not a Product Name |
| Finances Copilot | C | May be internal term; not found on live Seller Center |
| Inventory Mapping API | C | Developer tool — confirm naming and whether it belongs in registry |
| Shop the Look | C | Fashion feature — confirm naming is official, not descriptive |
| My Collection | B | Collectibles portfolio tool — confirm as distinct from existing nodes |
| Listing Inspiration | D | Single third-party mention only — do not add without confirmation |
| Promoted Listings Priority Video Ads | B | Confirm as distinct named ad format |
| Promoted Stores Custom | C | Confirm as distinct named product tier |

---

## Campaigns — Register as Campaign Nodes (Not Product Nodes)

These are confirmed eBay marketing campaigns. If the registry includes Campaign nodes, add them. Do not add as Product or Program nodes.

| Name | Campaign Type | Date | Evidence |
|------|--------------|------|----------|
| eBay Stories | Brand campaign | Sep 2025 (UK), Oct 2025 (US/DE) | A |
| Pre-Loved Fashion Week | Event/Campaign | 2024+ annual | A |
| Depoponomics | Brand campaign (Depop) | Feb 2026 | B |
| 48 Hours of Drops | Sales event | Recurring | B |
| The 30/30 Collection | Sales event | One-off or recurring | B |

---

## Items Confirmed NOT to Add

These were surfaced during the scan but should not be added to the eBay naming registry.

| Name | Reason |
|------|--------|
| eBay Auto | False positive — not an official brand name. "eBay Motors" is the official brand. |
| Magical Listing | Descriptive language, not a proper name. "Magical Bulk Listing Tool" IS a proper name (if confirmed). |
| PSA Vault | PSA-owned integration, not an eBay product name. Document as third-party integration note on eBay Vault node. |
| Selling with AI | Navigation/hub label at pages.ebay.com/sellingwithAI/ — functional label, not a product name. Could add as Functional Label node if taxonomy supports it. |

---

## Cross-Reference: Status Changes Triggered by New Candidates

These new candidates trigger corresponding status change actions on existing nodes:

| New Candidate | Triggers Status Change On |
|---------------|--------------------------|
| Promoted Listings General | Promoted Listings Standard → renamed |
| Promoted Listings Priority | Promoted Listings Advanced → renamed |
| Seller Hub Discounts | Promotions Manager → renamed |
| Product Research | Terapeak → renamed |
| eBay International Shipping | Global Shipping Program → renamed; International Standard Delivery → consolidated |
| Secure Purchase | Vehicle Purchase Protection — update notes re: $100K coverage w/ Secure Purchase |

---

## Graph Structural Recommendations

After adding Tier 1 candidates, the following graph structural changes are also recommended:

1. **Add eBay Capital** as a new parent node for Flexible Cash Advance + Flexible Growth Financing (if not already present)
2. **Add eBay Live** as the parent node for eBay Live on Tour (event child)
3. **Confirm eBay Advertising** umbrella correctly contains both PLG and PLP as children
4. **Confirm Seller Hub** umbrella correctly contains Team Access, AI Activate, Product Research, Seller Hub Discounts as children
5. **Confirm eBay Motors** umbrella correctly contains Secure Purchase, Fitment Plus Auto, Vehicle Purchase Protection as children
