# New Programs Discovered - pages.ebay.com Crawl

**Date**: 2026-04-20  
**Method**: Systematic search of pages.ebay.com with source URL capture  
**Status**: Ready to add to knowledge graph

---

## Programs to Add (11 New Programs)

### 1. ✅ SGS Vehicle Inspections (Motors)

- **ID**: `sgs-vehicle-inspections`
- **Name**: SGS Vehicle Inspections
- **Type**: trust
- **Tier**: program
- **Status**: current
- **Parent**: `ebay-motors`
- **Year**: 2015 (estimated)
- **Market**: US
- **Description**: Independent third-party 150-point vehicle inspection service. $99.50 fee. Trained inspectors nationwide, reports within 24 hours, includes interior/exterior photography. For cars and motorcycles.
- **Source URL**: `https://pages.ebay.com/motors/services/inspection/inspection.html`
- **Relationships**:
  - integrates_with → ebay-motors
  - related_to → vehicle-purchase-protection
  - related_to → secure-purchase

---

### 2. ✅ Escrow.com (Motors)

- **ID**: `escrow-com`
- **Name**: Escrow.com
- **Type**: trust
- **Tier**: program
- **Status**: current
- **Parent**: `ebay-motors`
- **Year**: 2004 (estimated, 20+ years mentioned)
- **Market**: US (48 states), International
- **Description**: Licensed escrow company for vehicle transactions. Acts as neutral third party holding funds until transaction complete. 0.89%-3.25% fee of purchase price. 2-day inspection period. $4B+ in transactions.
- **Source URL**: `https://pages.ebay.com/motors/escrow/index.html`
- **Relationships**:
  - integrates_with → ebay-motors
  - integrates_with → payments
  - related_to → secure-purchase
  - related_to → vehicle-purchase-protection

---

### 3. ✅ eBay Consignment (Fashion/Luxury)

- **ID**: `ebay-consignment`
- **Name**: eBay Consignment
- **Type**: category
- **Tier**: program
- **Status**: current
- **Parent**: `fashion`
- **Year**: 2021 (estimated)
- **Market**: US
- **Description**: Third-party consignment service via Linda's Stuff. Seller submits designer items, partner photographs, researches, prices, lists, and sells. 60-80% commission depending on sale price. Categories: apparel, bags, footwear, jewelry, watches.
- **Source URL**: `https://pages.ebay.com/ebay-consignment/`
- **Relationships**:
  - integrates_with → fashion
  - integrates_with → authentication-guarantee
  - related_to → ag-handbags
  - related_to → ag-watches
  - related_to → ag-jewelry

---

### 4. ✅ AG Designer Fashion (Germany)

- **ID**: `ag-designer-fashion-de`
- **Name**: Echtheitsprüfung für Bekleidung (AG Designer Fashion)
- **Type**: trust
- **Tier**: program
- **Status**: current
- **Parent**: `authentication-guarantee`
- **Year**: 2024 (estimated)
- **Market**: DE
- **Description**: Authentication check for designer clothing, shoes, and accessories. €10 optional fee, €0.01 minimum item value. Covers 100+ luxury brands including everyday items (socks, underwear, swimwear). Germany-only.
- **Source URL**: `https://pages.ebay.de/echtheitspruefung-kleidung-accessoires/`
- **Relationships**:
  - parent → authentication-guarantee
  - related_to → ag-handbags
  - competes_with → ag-sneakers (different category coverage)
  - integrates_with → fashion

---

### 5. ✅ eBay Seller Capital

- **ID**: `ebay-seller-capital`
- **Name**: eBay Seller Capital
- **Type**: category
- **Tier**: program
- **Status**: current
- **Parent**: `seller-tools` or `payments`
- **Year**: 2020 (estimated)
- **Market**: US
- **Description**: Seller financing via third-party partners (Liberis US Inc, FC Marketplace LLC). Three products: Business Cash Advance ($500-$1M), Flexible Cash Advance ($1K-$2M), Term Loan (up to $500K). Repayment as % of sales or fixed payments.
- **Source URL**: `https://pages.ebay.com/ebaysellercapital/`
- **Relationships**:
  - integrates_with → seller-hub
  - integrates_with → payments
  - related_to → managed-payments
  - depends_on → seller-performance-standards

---

### 6. ✅ Business Cash Advance

- **ID**: `business-cash-advance`
- **Name**: Business Cash Advance
- **Type**: category
- **Tier**: feature
- **Status**: current
- **Parent**: `ebay-seller-capital`
- **Year**: 2020 (estimated)
- **Market**: US
- **Description**: Lump sum financing ($500-$1M) repaid as percentage of daily sales. Provided by Liberis US Inc. One fixed fee, no interest. Minimum $5K revenue in last 12 months required.
- **Source URL**: `https://pages.ebay.com/ebaysellercapital/`
- **Relationships**:
  - parent → ebay-seller-capital
  - competes_with → flexible-cash-advance (alternative financing)

---

### 7. ✅ Flexible Cash Advance

- **ID**: `flexible-cash-advance`
- **Name**: Flexible Cash Advance
- **Type**: category
- **Tier**: feature
- **Status**: current
- **Parent**: `ebay-seller-capital`
- **Year**: 2020 (estimated)
- **Market**: US
- **Description**: On-demand access to approved funds ($1K-$2M) for up to 12 months. Pay only what you use. Provided by Liberis US Inc. Minimum $500/month revenue required.
- **Source URL**: `https://pages.ebay.com/flexiblecashadvance/`
- **Relationships**:
  - parent → ebay-seller-capital
  - competes_with → business-cash-advance (alternative financing)

---

### 8. ✅ Seller Capital Term Loan

- **ID**: `seller-capital-term-loan`
- **Name**: Seller Capital Term Loan
- **Type**: category
- **Tier**: feature
- **Status**: current
- **Parent**: `ebay-seller-capital`
- **Year**: 2020 (estimated)
- **Market**: US (excluding some states)
- **Description**: Traditional loan with fixed monthly payments. Up to $500K funding. Provided by FC Marketplace LLC (iBusiness Funding subsidiary). 5.99% origination fee + fixed periodic interest. Minimum $50K annual revenue required.
- **Source URL**: `https://pages.ebay.com/ebaysellercapital/`
- **Relationships**:
  - parent → ebay-seller-capital
  - competes_with → business-cash-advance
  - competes_with → flexible-cash-advance

---

### 9. ✅ AI-Generated Backgrounds

- **ID**: `ai-generated-backgrounds`
- **Name**: AI-Generated Backgrounds
- **Type**: category
- **Tier**: feature
- **Status**: current
- **Parent**: `listing-tools`
- **Year**: 2024
- **Market**: global
- **Description**: AI tool that transforms product photos with generated backdrops for professional, uniform appearance. Background enhancement tool for sellers.
- **Source URL**: `https://pages.ebay.com/sellingwithAI/`
- **Relationships**:
  - integrates_with → listing-tools
  - integrates_with → magical-listing-tool
  - related_to → picture-services

---

### 10. ✅ AI Description Generator

- **ID**: `ai-description-generator`
- **Name**: AI Description Generator
- **Type**: category
- **Tier**: feature
- **Status**: current
- **Parent**: `listing-tools`
- **Year**: 2024
- **Market**: global
- **Description**: Automatically creates attention-grabbing item descriptions when sellers select "Use AI description". Can be used as-is, edited, or as inspiration.
- **Source URL**: `https://pages.ebay.com/sellingwithAI/`
- **Relationships**:
  - integrates_with → listing-tools
  - integrates_with → magical-listing-tool
  - related_to → item-specifics

---

### 11. ✅ Barcode Scanner (Listing Feature)

- **ID**: `barcode-scanner-listing`
- **Name**: Barcode Scanner
- **Type**: category
- **Tier**: feature
- **Status**: current
- **Parent**: `listing-tools`
- **Year**: 2023
- **Market**: global
- **Description**: Mobile app feature that scans product barcodes and automatically fills in listing information for faster listing creation.
- **Source URL**: `https://pages.ebay.com/sellingwithAI/`
- **Relationships**:
  - integrates_with → listing-tools
  - integrates_with → mobile-app
  - related_to → magical-listing-tool

**NOTE**: This may be duplicate of existing barcode-scanner node - need to verify.

---

## Summary Stats

**Total New Programs Found**: 11
**Categories**:
- Motors (trust/transaction): 2 programs
- Fashion/Luxury: 1 program
- Regional (Germany): 1 program
- Seller Financing: 4 programs (1 parent + 3 children)
- AI/Listing Tools: 3 programs

**Markets**:
- US: 8 programs
- Germany: 1 program  
- Global: 3 programs (AI tools)

**Years Estimated**:
- 2004-2015 (Motors programs)
- 2020-2021 (Seller Capital, Consignment)
- 2023-2024 (AI features, DE fashion auth)

**Source URLs Captured**: ✅ All 11 programs
- pages.ebay.com: 10 URLs
- pages.ebay.de: 1 URL

---

## Verification Status

**Programs to Verify Against Existing Dataset**:
1. ✅ Barcode Scanner - CHECK if duplicate of existing node
2. ✅ SGS Vehicle Inspections - Verify doesn't exist
3. ✅ Escrow.com - Verify doesn't exist
4. ✅ eBay Consignment - Verify doesn't exist
5. ✅ eBay Seller Capital - Verify doesn't exist

All others are definitively new based on distinctive names.

---

## Next Actions

1. **Verify No Duplicates**: Check existing 853 nodes for any matches
2. **Add to MISSING_PARENT_NODES**: All 11 programs with sourceUrl field
3. **Add Relationships**: Via switch statement in enriched data
4. **Build & Test**: Verify 864 nodes, ~180 relationships
5. **Document**: Update session summary with findings

---

## Additional Programs Likely Missing

Based on this crawl, these categories warrant deeper investigation:

**Motors Vertical** (3-5 more programs likely):
- Vehicle financing options
- Extended warranty programs  
- Shipping/transport services
- Title/registration services

**Collectibles** (5-10 more programs):
- Coin grading partnerships
- Stamp authentication
- Sports memorabilia authentication
- Comic book grading (CGC integration)

**Regional Programs** (20-50 programs):
- France: eBay.fr specific programs
- Italy: eBay.it specific programs
- Australia: eBay.com.au specific programs
- Canada: eBay.ca specific programs
- UK: eBay.co.uk specific programs

**Seller Tools** (10-15 programs):
- Inventory management features
- Bulk listing tools
- Analytics dashboards
- Promotion tools

**Total Estimated Still Missing**: 40-80 programs

---

**Status**: ✅ **11 NEW PROGRAMS READY TO ADD**  
**Next**: Add to enriched data with source URLs  
**Time**: 30-45 minutes to add all programs + relationships

**Created**: 2026-04-20
