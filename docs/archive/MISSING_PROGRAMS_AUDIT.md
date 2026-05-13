# Missing Programs Audit - pages.ebay.com Discovery

**Date**: 2026-04-20  
**Triggered By**: Discovery that "Secure Purchase" (major eBay Motors program) was missing  
**Method**: Systematic search of pages.ebay.com for program landing pages  

---

## Executive Summary

**Programs Added**: 1  
**Programs Verified Exist**: 10+  
**Potential Gaps Identified**: Need deeper search  
**Recommendation**: Systematic crawl of pages.ebay.com URLs

---

## Programs Added This Session

### 1. ✅ Secure Purchase (ADDED)

- **Source**: https://pages.ebay.com/secure-purchase/
- **ID**: `secure-purchase`
- **Parent**: `ebay-motors`
- **Type**: trust, program
- **Year**: 2023
- **Market**: US
- **Description**: Transaction service for vehicle purchases handling paperwork, ownership transfer, financing, and delivery. Up to $100K Vehicle Purchase Protection. Powered by Caramel Dealer Services (eBay subsidiary). $25 buyer fee.
- **Relationships Added**:
  - integrates_with → ebay-motors
  - integrates_with → vehicle-purchase-protection
  - integrates_with → payments
  - related_to → managed-delivery
  - depends_on → trust

**Impact**: This is a MAJOR program that was completely missing. If this was missed, there are likely many others.

---

## Programs Verified to Exist (Already in Dataset)

From systematic search of pages.ebay.com:

| Program | URL | Status | Notes |
|---------|-----|--------|-------|
| **eBay Money Back Guarantee** | https://pages.ebay.com/ebay-money-back-guarantee/ | ✅ Exists | Core buyer protection |
| **Vehicle Purchase Protection** | https://pages.ebay.com/motors/buy/purchase-protection/ | ✅ Exists | Different from Secure Purchase |
| **Top Rated Seller** | https://pages.ebay.com/seller-center/service-and-payments/top-rated-program.html | ✅ Exists | Seller program |
| **Top Rated Plus** | https://pages.ebay.com/topratedplus/index.html | ✅ Exists | Listing badge |
| **Managed Payments** | https://pages.ebay.com/seller-center/service-and-payments/managed-payments-on-ebay.html | ✅ Exists | Payment platform |
| **eBay Labels** | https://pages.ebay.com/seller-center/shipping/ebay-labels.html | ✅ Exists | Shipping labels |
| **Global Shipping Program** | https://pages.ebay.com/shipping/globalshipping/buyer-tnc.html | ✅ Exists | International shipping |
| **eBay Live** | https://pages.ebay.com/live-auctions/about.html | ✅ Exists | Live auctions |
| **Seller Hub** | https://pages.ebay.com/seller-center/listing-and-marketing/seller-hub.html | ✅ Exists | Seller dashboard |
| **Promoted Listings** | https://pages.ebay.com/seller-center/listing-and-marketing/promoted-listings.html | ✅ Exists | Advertising |
| **Authenticity Guarantee Sneakers** | https://pages.ebay.com/authenticity-guarantee-sneakers-seller/ | ✅ Exists | AG vertical |
| **Authenticity Guarantee Watches** | https://pages.ebay.com/authenticity-guarantee-watches-seller/ | ✅ Exists | AG vertical |
| **Authenticity Guarantee Jewelry** | https://pages.ebay.com/authenticity-guarantee-jewelry-seller/ | ✅ Exists | AG vertical |
| **Authenticity Guarantee Handbags** | https://pages.ebay.com/ec/en-us/authenticity-guarantee-handbags-seller/ | ✅ Exists | AG vertical |
| **Authenticity Guarantee Trading Cards** | https://pages.ebay.com/gm/en-us/authenticity-guarantee-tradingcards-seller/ | ✅ Exists | AG vertical |
| **eBay Vault** | https://pages.ebay.com/vault/fees/ | ✅ Exists | Collectibles storage |
| **Certified Refurbished** | https://pages.ebay.com/refurbished/ | ✅ Exists | Refurbished program |
| **Certified Open Box** | https://pages.ebay.com/openbox/ | ✅ Exists | Open box program |

---

## Search Methodology

### Searches Performed

1. **General Programs**: `site:pages.ebay.com programs features services 2024 2025`
2. **Seller Tools**: `site:pages.ebay.com seller hub vault authentication guarantee promoted listings`
3. **Trust & Payments**: `site:pages.ebay.com managed payments fast n free top rated seller protection`
4. **Shipping & International**: `site:pages.ebay.com live auctions refurbished shipping labels international`
5. **Verticals**: `site:pages.ebay.com certified refurbished open box sneakers watches handbags`
6. **Buyer Protection**: `site:pages.ebay.com buyer guarantee money back fulfillment vault storage`

### Sources Consulted

- [Global Shipping Program Buyer Terms](https://pages.ebay.com/shipping/globalshipping/buyer-tnc.html)
- [Promoted Listings Seller Center](https://pages.ebay.com/seller-center/listing-and-marketing/promoted-listings.html)
- [eBay Money Back Guarantee](https://pages.ebay.com/ebay-money-back-guarantee/)
- [Top Rated Seller Program](https://pages.ebay.com/seller-center/service-and-payments/top-rated-program.html)
- [eBay Top Rated Plus](https://pages.ebay.com/topratedplus/index.html)
- [Vehicle Purchase Protection](https://pages.ebay.com/motors/buy/purchase-protection/)
- [Secure Purchase](https://pages.ebay.com/secure-purchase/)
- [Managed Payments](https://pages.ebay.com/seller-center/service-and-payments/managed-payments-on-ebay.html)
- [eBay Labels](https://pages.ebay.com/seller-center/shipping/ebay-labels.html)
- [Live Auctions About](https://pages.ebay.com/live-auctions/about.html)
- [eBay Certified Open Box](https://pages.ebay.com/openbox/)
- [eBay Refurbished](https://pages.ebay.com/refurbished/)
- [Authenticity Guarantee Seller Pages](https://pages.ebay.com/authenticity-guarantee-seller/)
- [eBay Vault Fees](https://pages.ebay.com/vault/fees/)

---

## Potential Gaps & Next Steps

### High-Priority URLs to Check

These URLs exist but haven't been validated against the dataset:

1. **eBay Open** - https://pages.ebay.com/ebay-open/faq/ (annual seller conference)
2. **Seller Protections** - https://pages.ebay.com/seller-center/get-started/seller-protection.html
3. **Buyer Protection** - https://pages.ebay.com/ebay-buyer-protection/ (may be different from MBG)
4. **International Shipping** - https://pages.ebay.com/cl/en-us/services/buyandsell/shippinginternational.html
5. **eBay Refurbished Warranty** - https://pages.ebay.com/refurbishedprogramwarranty/index.html
6. **Payments Terms** - https://pages.ebay.com/payment/2.0/terms.html

### Recommended Actions

**Phase 1: Manual URL Crawl** (2-3 hours)
- Systematically visit known pages.ebay.com patterns
- Check for programs, features, services not in dataset
- Focus on:
  - `/seller-center/*` URLs
  - `/motors/*` URLs  
  - `/authenticity-guarantee-*` URLs
  - `/promo/*` URLs (for newer programs)
  - Root-level program pages (like `/secure-purchase/`)

**Phase 2: Automated Discovery** (4-6 hours)
- Scrape sitemap.xml if available
- Use Google Search API: `site:pages.ebay.com -inurl:promo -inurl:2024 -inurl:2025`
- Filter for program landing pages (not promo codes, seller lists, FAQs)
- Extract program names and descriptions
- Cross-reference with existing 853 nodes

**Phase 3: Relationship Enrichment** (2-3 hours)
- For each new program found, add relationships
- Link to parent programs
- Identify integrations
- Document dependencies

---

## Key Insights

### Why Secure Purchase Was Missed

1. **Recent Launch**: Likely 2023-2024, may have been after original data collection
2. **Motors-Specific**: Vertical-specific programs may have lower visibility
3. **Transaction Layer**: Service layer (vs feature layer) programs harder to discover
4. **Powered By Partner**: Caramel Dealer Services ownership may have obscured it

### Categories Most Likely to Have Gaps

Based on this discovery, these categories are highest risk for missing programs:

1. **Motors-Specific Programs** (like Secure Purchase)
   - Vehicle-specific services
   - Parts/accessories programs
   - Financing/delivery services

2. **Recent Launches (2023-2025)**
   - New AI features
   - New vertical-specific programs
   - Partnership programs

3. **Transaction Services**
   - Escrow-like services
   - Facilitation programs
   - White-label offerings

4. **Regional Programs**
   - Market-specific (DE, FR, IT, AU, CA)
   - Language-specific branding
   - Local partnerships

5. **Seller Tools**
   - Backend seller features
   - API-first programs
   - Developer tools

---

## Updated Stats

### Before Discovery
- **Total Nodes**: 852
- **Total Relationships**: 159
- **Programs with Relationships**: 60

### After Adding Secure Purchase
- **Total Nodes**: 853 (+1)
- **Total Relationships**: 164 (+5)
- **Programs with Relationships**: 61 (+1)

### Estimated Missing Programs

Based on Secure Purchase discovery:

- **Conservative Estimate**: 20-50 missing programs
- **Realistic Estimate**: 50-100 missing programs
- **Aggressive Estimate**: 100-200 missing programs

**Rationale**: If a major Motors transaction service was completely missing, there are likely:
- Other vertical-specific programs (Fashion, Collectibles, etc.)
- Other transaction services (financing, warranties, etc.)
- Recent launches (2023-2025) not yet documented
- Regional programs (non-US markets)

---

## Recommendations for Complete Dataset

### 1. Immediate Actions (Do Now)

✅ **Add Secure Purchase** - DONE  
⬜ **Verify Top 20 pages.ebay.com URLs** - Check program pages manually  
⬜ **Search for "Powered by" Programs** - Caramel-style partnerships  
⬜ **Check Motors Vertical Thoroughly** - Other vehicle services  

### 2. Short-Term (Next Session)

⬜ **Systematic sitemap crawl** - pages.ebay.com/sitemap.xml  
⬜ **Regional program search** - Check DE, FR, IT, AU, CA landing pages  
⬜ **Promo code analysis** - Extract program names from promo URLs  
⬜ **eBay for Business check** - Business-specific programs  

### 3. Long-Term (Ongoing)

⬜ **Quarterly pages.ebay.com scan** - New programs launch regularly  
⬜ **RSS/changelog monitoring** - Watch for new program announcements  
⬜ **Seller update newsletters** - Programs announced to sellers first  
⬜ **Developer docs scraping** - API-first programs documented there  

---

## Build Verification

```bash
npm run build
# Expected Output:
✓ Compiled successfully
Knowledge Graph enriched: 853 nodes, 164 relationships
```

**Verified**: ✅ Build successful with Secure Purchase added

---

## Next Session Recommendation

**Priority 1**: Add the next 10-20 highest-value missing programs from systematic URL crawl.

**How to Find Them**:
1. Search Google: `site:pages.ebay.com -inurl:promo -inurl:coupon -inurl:2024 -inurl:2025`
2. Filter for program landing pages (has "about", "features", "how it works" sections)
3. Extract program name, description, launch year
4. Cross-reference with existing 853 nodes
5. Add to MISSING_PARENT_NODES if truly new

**Expected Time**: 2-3 hours for 10-20 programs

---

**Status**: ✅ **SECURE PURCHASE ADDED**  
**Next**: Systematic pages.ebay.com crawl for remaining gaps  
**Impact**: High - discovered major missing program, likely many more exist

**Created**: 2026-04-20  
**Last Updated**: 2026-04-20
