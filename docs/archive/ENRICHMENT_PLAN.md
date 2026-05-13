# eBay Naming Graph - Enrichment Plan
**Date:** 2026-04-17  
**Total Programs:** 1,494  
**Target:** Add full GraphNode metadata to all programs

---

## Current Status

✅ **Completed:** 1,494 programs with basic structure
- All 7 market translations (US, UK, DE, FR, IT, CA, AU)
- Type, tier, parent hierarchy
- Status indicators (confirmed/partial/global/research-needed)

🎯 **Needed:** Full GraphNode enrichment
- `id`: kebab-case identifiers
- `desc`: 1-2 sentence descriptions  
- `year`: Launch years from official sources
- `market`: Actual market availability (not just translations)
- `status`: current/legacy/renamed
- `renamedFrom/renamedTo`: Rename history

---

## Agent Analysis Summary

All 6 research agents completed and identified:

1. **File size challenge**: 430KB file with 1,494 programs
2. **Extraction need**: Systematic way to identify program ranges
3. **Research scope**: Each program needs 5-6 new metadata fields
4. **Source requirements**: Official eBay press releases, help pages, announcements

---

## Enrichment Strategy

### Phase 1: High-Value Programs First (Priority Batch)
Focus on most important programs with known details:

**Trust & Safety (Umbrella-level)**
- Money Back Guarantee
- Authenticity Guarantee
- Top Rated Seller
- VeRO Program
- Buyer Protection

**Advertising Portfolio**
- eBay Advertising (umbrella)
- Promoted Listings (all variants)
- Promoted Offsite
- Managed Display

**Major Seller Tools**
- Seller Hub
- eBay Stores
- Terapeak
- Selling Manager (legacy)

**Regional Exclusives** (need market specificity)
- eBay Plus (DE, AU only)
- eBay WOW! (DE only)
- eBay Imperdibili (IT only)
- eBay Vault (US only)
- Price Guide (US only)
- Trading Card Hub (US only)

**Deprecated Programs** (need status: "legacy")
- PowerSeller
- eBay Bucks  
- Promoted Listings Express
- Selling Manager/Pro (replaced by Seller Hub)
- Markdown Manager (merged into Discounts Manager)

### Phase 2: Systematic Batch Enrichment
Process remaining programs in batches of 50-100:
- Seller tools & features
- Shipping & logistics programs
- Payment methods & features
- Buyer experience features
- Category-specific programs

### Phase 3: Long-tail Programs
- Generic features (checkout, cart, etc.)
- UI elements (buttons, labels)
- Legal/policy terms

---

## Research Sources

### Primary Sources
1. **eBay Press Center**: press.ebay.com  
2. **eBay Seller Center**: ebay.com/sellercenter
3. **eBay Help Pages**: Official documentation per market
4. **Developer Documentation**: developer.ebay.com
5. **eBay for Business Blog**: ebayinc.com/stories

### Secondary Sources
1. **EcommerceBytes**: Industry coverage of eBay announcements
2. **TameBay**: eBay seller news
3. **eBay Community Forums**: Announcement archives
4. **ValueAddedResource**: eBay policy tracking

---

## Sample Enriched Output

```typescript
{
  id: "seller-hub",
  name: "Seller Hub",
  type: "category",
  tier: "platform",
  status: "current",
  parent: "sellertools",
  desc: "Centralized dashboard for managing eBay selling activities, listings, orders, and performance metrics",
  market: "global",
  year: 2017
}
```

---

## Market Availability Mapping

Programs with **partial** market availability:

| Program | Markets | Notes |
|---------|---------|-------|
| eBay Plus | DE, AU | Paid membership program |
| eBay WOW! | DE | Deals branding |
| eBay Imperdibili | IT | Deals with Best Price Guarantee |
| eBay Vault | US | Trading card storage |
| Price Guide | US | Collectibles pricing tool |
| Trading Card Hub | US | Category vertical |
| Simple Delivery | UK | C2C mandatory shipping |
| eBay Standard Envelope | US | Low-cost shipping option |
| Top-Service badge | DE | Seller performance badge |
| Premium Service badge | UK | Replaces Top Rated Plus |
| eBay Guaranteed Delivery | US, AU | Fast shipping guarantee |
| Certified Open Box | US | Condition program |
| eBay Mastercard | US | Ending March 2026 |
| eBay Balance | US, UK | Spendable funds |

---

## Recommended Next Steps

### Option A: Manual Batch Processing
I systematically research and enrich programs in batches of 50-100, outputting structured JSON/TypeScript for merging.

**Pros**: Highest quality, verified data  
**Cons**: Time-intensive (1,494 programs)  
**Timeline**: ~15-20 batches

### Option B: Semi-Automated with Validation
Create extraction scripts to auto-generate IDs and descriptions, then manually validate and research years/market data.

**Pros**: Faster baseline, focus research on complex fields  
**Cons**: Still requires significant research for years/markets  
**Timeline**: ~10-12 batches

### Option C: Tiered Approach
- **Tier 1** (200 programs): Full manual enrichment for high-value programs
- **Tier 2** (500 programs): Semi-automated with spot-checking
- **Tier 3** (794 programs): Automated baseline with flags for review

**Pros**: Best balance of quality and speed  
**Cons**: Creates quality tiers  
**Timeline**: ~8-10 batches

---

## Quality Standards

Every enriched program must have:

✅ **Verified ID**: kebab-case, unique, meaningful  
✅ **Clear desc**: 1-2 sentences explaining purpose/function  
✅ **Accurate year**: From official eBay source (with citation)  
✅ **Correct market**: "global" or specific market codes  
✅ **Current status**: Verified as of 2026-04-17  
✅ **Rename tracking**: If applicable, document renamedFrom/To

---

## File Output Structure

Create separate enrichment files by batch:
- `enriched-batch-01-priority.ts` (50 high-value programs)
- `enriched-batch-02-advertising.ts` (100 ad programs)
- `enriched-batch-03-seller-tools.ts` (100 seller programs)
- etc.

Each batch file exports:
```typescript
export const ENRICHED_BATCH_XX: GraphNode[] = [ /* data */ ];
```

Then merge all batches into main file after validation.

---

## Estimated Timeline

- **Option A**: 15-20 hours (full manual research)
- **Option B**: 10-12 hours (semi-automated)
- **Option C**: 6-8 hours (tiered approach)

**Recommendation**: Option C (Tiered Approach) for best balance

---

**Ready to proceed!** Awaiting user decision on approach.
