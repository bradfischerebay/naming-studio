# Follow-Up Batch 02 — International, Subsidiaries, Buyer-Side Gaps
# Scan Date: 2026-04-29
# Agent: Follow-up scan — international, subsidiaries, and buyer-side gaps

---

## New Candidates — Goldin Sub-Products (5)

| Name | Evidence | Notes |
|------|----------|-------|
| Goldin Marketplace | A | Always-on fixed-price/offer marketplace; distinct from auction formats; registry has only a single "Goldin" parent node |
| Goldin Vault | A | Secure storage for graded collectibles; distinct from PSA Vault; goldin.co/vault.html |
| Goldin Weekly Auctions | A | Lower-threshold ($5+ start) recurring auctions; distinct named format |
| Goldin Elite Auctions | A | High-value ($5K+ items) monthly auctions; officially distinct from Weekly Auctions |
| Studio Auctions | A | Goldin sub-acquisition (June 2025) for Hollywood props/memorabilia; now named Goldin sub-brand |

**Structural recommendation:** Expand "Goldin" registry node into a sub-graph: Goldin → [Goldin Marketplace, Goldin Vault, Goldin Weekly Auctions, Goldin Elite Auctions, Studio Auctions]

---

## New Candidates — TCGplayer Sub-Products (4)

| Name | Evidence | Notes |
|------|----------|-------|
| Direct by TCGplayer | A | Fulfillment program; sellers ship to TCGplayer warehouse; also called "TCGplayer Direct" (both forms official) |
| TCGplayer Infinite | B | Content/community hub at infinite.tcgplayer.com; distinct subdomain |
| TCGplayer Market Price | A | Named pricing feature using real-transaction averages; basis of industry pricing data |
| Store Your Products (SYP) | A | Named inventory storage program; distinct from Direct; had policy changes June 2024 |

**Also confirmed legacy:** TCGplayer Buylist — sunset July 17, 2024 → add as legacy node

---

## New Candidates — Caramel Entities (3)

| Name | Evidence | Notes |
|------|----------|-------|
| Secure Purchase (2025 relaunch) | A | Relaunched/expanded July 29, 2025; registry may have pre-2025 version — confirm node reflects current product |
| Caramel Dealer Services, LLC | A | Legal operating entity name; referenced in eBay terms; distinct from parent Caramel node |
| Caramel Insurance Services, LLC | B | Named trademark entity for Caramel's insurance functions |

---

## New Candidates — Depop Sub-Features (3)

| Name | Evidence | Notes |
|------|----------|-------|
| Depop Payments | A | Named in Depop Terms of Service; covers Stripe, Apple/Google Pay, Klarna (UK/US/AU) |
| Depop Shipping | A | Named prepaid label service; market-specific carriers (USPS/US, Evri/UK, Sendle/AU) |
| Depop Protection | A | Official buyer+seller protection program (NOT "Depop Buyer Protection" — exact name matters) |

---

## New Candidates — Tise (1)

| Name | Evidence | Notes |
|------|----------|-------|
| Tise Cash | B | In-app green currency program; earned for posting/buying/following; redeemable for rewards |

---

## New Candidates — International / Regional (6)

| Name | Market | Evidence | Notes |
|------|--------|----------|-------|
| eBay Pro | AU | A | Named replacement for eBay Stores in Australia; tiered plans including Pro Starter |
| eBaymag | Global | A | Free cross-border listing tool at export.ebay.com/en/growth/ebaymag/; own subdomain help.ebaymag.com; lists on 8 eBay international sites with auto-translation |
| eBay International Shipping (CA) | CA | A | Distinct rollout with hub in Greater Toronto Area (late 2023); may warrant CA-variant node |
| PayBright | CA | B | Named BNPL on eBay.ca ($200+, monthly installments); **verify if eBay-owned or third-party partner** |
| eBay for Change | UK | A | UK program for social enterprises; zero fees + training; partnered with Social Enterprise UK |
| eBay Assured Fit | UK | A | UK localization of eBay Guaranteed Fit; launched Sep 25, 2023; distinct node warranted (DE equivalent Fahrzeugteile-Versprechen already identified) |

---

## New Candidates — SMB / Programs (2)

| Name | Evidence | Notes |
|------|----------|-------|
| SBAN (Small Business Advocacy Network) | A | ebaymainstreet.com/sban; named program for advocacy network members; distinct from general eBay Main Street |
| eBay Club Extra | B | Variant name used in Italian-facing materials for eBay Extra loyalty program; may be a sub-variant node |

---

## New Candidates — Legacy Nodes Missing (5)

| Name | Evidence | Notes |
|------|----------|-------|
| MissionFish | A | Original charity backend (2003); became Points of Light → PayPal Giving Fund ~2013; should be in registry as legacy predecessor to eBay Giving Works |
| PayPal Giving Fund | A | Operational name after MissionFish rebrand; still referenced in eBay for Charity docs |
| Magento | A | eBay-owned 2011–2015; spun out; named eBay property during that period |
| eBay Trading Assistants | A | Official program 2002–2013 (thousands of participants); retired Sep 20, 2013; not in registry |
| X.commerce | A | eBay's 2011–2013 unified developer commerce platform; referenced in prior research but no explicit node |

---

## New Candidates — Protection & Refurbished (3)

| Name | Evidence | Notes |
|------|----------|-------|
| Business Equipment Purchase Protection (BEPP) | A | Named program; up to $100K; doubled Sep 2024; sibling to Vehicle Purchase Protection (which IS in registry); glaring gap |
| eBay Certified Open Box | A | Named certification tier within eBay Refurbished family; launched May 2025; pages.ebay.com/openbox/ |
| eBay Consignment | A | 2023 relaunch of consignment program; predecessor "eBay Valet" IS in registry as legacy; new node needed for current product |

---

## Confirmed Already in Registry (from this scan)

These were checked and found to already have nodes — no action needed:

Shop the Look, Image Search, Trading Card Hub, Price Guide & Collection, eBay Seller Capital, Vehicle Purchase Protection, Certified by Brand, eBay Foundation, Global Give Program, PayPal (legacy), Skype, StubHub, eBay Valet, eBay Bucks, Up & Running Grants

**Note:** Agent cross-referenced against `/Users/bradfischer/ebay-naming-graph-data-CORRECTED.ts` — some of these may be in that file but not in the primary `enriched-consolidated-DEDUPLICATED.ts`. Verify against the canonical file before marking as confirmed present.

---

## False Positives / Not Proper Names

| Name | Reason |
|------|--------|
| TCGplayer Authentication Center | Thin evidence; likely a descriptor referencing PSA grading integration, not a formal product name |
| Shop for a Cause | Generic descriptor used by charities; not an eBay brand |
| Voice search / Alexa integration | No official product name found |
| eBay Spain-specific programs | eBay.es runs standard global programs; no ES-unique names found |
| PayBright | Flag: may be third-party partner, not eBay-owned name — verify before adding |

---

## Graph Structural Recommendations

1. **Goldin sub-graph:** Expand single Goldin node into parent + 5 children
2. **TCGplayer sub-graph:** Add 4 sub-product children + 1 legacy (Buylist)
3. **Depop sub-graph:** Add 3 named sub-features as children of Depop node
4. **eBay Refurbished sub-graph:** Add eBay Certified Open Box as new tier alongside eBay Certified Refurbished
5. **BEPP:** Add as sibling node to Vehicle Purchase Protection under trust/protection umbrella
6. **eBaymag:** Add under international/cross-border umbrella

---

*Total new candidates: 34 | Confirmed false positives/not-proper-names: 5*
