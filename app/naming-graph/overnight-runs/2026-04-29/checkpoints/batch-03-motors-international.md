# Batch 03 — Motors, Refurbished & International Programs
# Scan Date: 2026-04-29
# Agent: Overnight Registry Scan

## Coverage
- eBay Motors and sub-programs
- eBay Refurbished and warranty programs
- International shipping programs (GSP, eIS, Simple Delivery)
- Cross-border commerce tools
- Regional programs (UK, FR, IT, DE)

---

## Verified Live

### eBay Motors
- **Evidence:** A — live at ebay.com/motors
- **Status:** live_validated
- **Recommendation:** keep
- **Notes:** Official automotive brand. "eBay Auto" is a false positive — not an official brand name.

### Vehicle Purchase Protection
- **Evidence:** A — live at pages.ebay.com/motors/buy/purchase-protection/
- **Status:** live_validated
- **Recommendation:** keep — NOTE: should be re-parented under Motors umbrella in graph
- **Notes:** Coverage up to $50,000 for standard purchases; up to $100,000 when using Secure Purchase. This node is currently mis-parented in the registry.

### eBay Refurbished
- **Evidence:** A — live refurbished landing page confirmed
- **Status:** live_validated
- **Recommendation:** keep

### eBay Certified Refurbished
- **Evidence:** A — live at ebay.com/b/Certified-Refurbished/[browse-node]
- **Status:** live_validated — URL CORRECTION NEEDED
- **Recommendation:** keep; update URL in registry
- **Notes:** The old browse node URL (bn_7116848450) now resolves to a shoe category. Correct browse node is bn_7040708936. Registry URL should be updated.

### eBay International Shipping (eIS)
- **Evidence:** A — live at ebay.com/sellercenter/shipping/ebay-international-shipping
- **Status:** live_validated — successor to GSP
- **Recommendation:** confirm as live successor; mark GSP as renamed
- **Notes:** Consolidates old Global Shipping Program and International Standard Delivery into a single unified service. All cross-border logistics handled through eIS.

### Simple Delivery (UK)
- **Evidence:** A — live at ebay.co.uk; UK-specific managed delivery program
- **Status:** candidate_new — NOT confirmed in registry as UK-specific entry
- **Recommendation:** add as regional product
- **entity_type:** Product
- **nameClass:** Product Name
- **market:** ['UK']
- **Notes:** UK equivalent of eBay's managed shipping approach. Distinct enough from US programs to warrant a separate registry node with market: ['UK'].

### eBay Extra (FR/IT)
- **Evidence:** B — referenced in French and Italian eBay seller documentation; coupon/rewards program
- **Status:** candidate_new — verify market scope
- **Recommendation:** verify then add as regional program
- **entity_type:** Program
- **nameClass:** Product Name
- **market:** ['FR', 'IT']
- **Notes:** Regional coupon/loyalty program in France and Italy. Verify whether it also operates in other markets.

### eBay réparation (FR)
- **Evidence:** B — referenced in French sustainability reporting; repair/refurbishment program
- **Status:** candidate_new
- **Recommendation:** verify then add as regional program
- **entity_type:** Program
- **nameClass:** Product Name
- **market:** ['FR']
- **Notes:** French-market repair program. Note use of French diacritic in name — preserve in canonical name if confirmed.

---

## Newly Verified (2025–2026)

### Secure Purchase
- **Evidence:** A — live at ebay.com/secure-purchase; documented in 2024 press release; Caramel acquisition confirmed
- **Status:** candidate_new — NOT in current registry
- **Recommendation:** add
- **entity_type:** Product
- **nameClass:** Product Name
- **parent_id:** ebay-motors
- **Notes:** Vehicle checkout solution. Manages payment, financing, registration, ownership transfer, and transport in one flow. Powered by Caramel (eBay subsidiary — Caramel Dealer Services LLC, acquired 2024). $25 buyer fee. Vehicle Purchase Protection at no extra charge up to $100,000. Available for: cars, trucks, boats, ATVs, motorcycles, RVs, commercial vehicles. Launched 2024.

### Fitment Plus Auto
- **Evidence:** B — documented in eBay Motors seller resources as an auto-fitment data tool
- **Status:** candidate_new — NOT in current registry
- **Recommendation:** verify then add
- **entity_type:** Feature
- **nameClass:** Feature Name
- **parent_id:** ebay-motors
- **Notes:** Automatically populates vehicle fitment compatibility data for parts and accessories listings. Reduces seller data entry burden.

### SpeedPAK
- **Evidence:** B — mentioned in German eBay January 2026 seller update as cross-border shipping service
- **Status:** candidate_new — brand ownership unclear
- **Recommendation:** verify brand ownership before adding
- **Flag:** May be a third-party logistics network name being applied to eBay Germany cross-border delivery. If eBay is using the name under license or co-branding, add as Feature Name. If purely third-party, do not add to eBay naming registry.
- **market:** ['DE']

---

## Verified Deprecated / Renamed

### Global Shipping Program (GSP)
- **Evidence:** A — official Seller Center now redirects all shipping to eBay International Shipping
- **Status:** renamed
- **Recommendation:** mark as renamed → ebay-international-shipping
- **Effective date:** 2024-01-01
- **Notes:** GSP and International Standard Delivery both consolidated into eIS. Neither legacy name appears on live Seller Center pages.

### International Standard Delivery
- **Evidence:** A — absorbed into eBay International Shipping
- **Status:** renamed (consolidated)
- **Recommendation:** if in registry, mark as deprecated/consolidated into ebay-international-shipping

---

## False Positives

### eBay Auto
- **Evidence:** A — no official brand usage found; eBay's automotive brand is consistently "eBay Motors"
- **Status:** false_positive
- **Recommendation:** remove from registry if present as a node; "eBay Auto" only appears informally in third-party writing
- **Notes:** No official brand page, no Seller Center mention, no press release uses "eBay Auto" as a distinct product name.

---

## Structural / Re-parenting Notes

The following nodes appear to be mis-parented in the current registry. These are pre-existing issues, not scan discoveries, but noted here for the fixing pass:

- **Vehicle Purchase Protection** → should be child of `ebay-motors` (not general trust/protection umbrella)
- **eBay Refurbished Warranty** → should be child of `ebay-refurbished`

---

## Flagged for Review

### eBay International Shipping — market scope
- **Flag:** Confirm whether eIS operates in all markets or is US-centric for outbound international. Some markets may have separate cross-border programs (DE SpeedPAK, UK Simple Delivery).
- **Recommendation:** add market scoping to eIS node; confirm it doesn't incorrectly absorb UK/DE regional programs.
