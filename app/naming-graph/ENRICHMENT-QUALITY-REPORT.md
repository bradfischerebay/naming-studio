# eBay Naming Graph - Enrichment Quality Report
**Generated**: 2026-04-17  
**Analyst**: Claude Code  
**Status**: ⚠️ CRITICAL ISSUES DETECTED

---

## Executive Summary

### Overview
- **Total Program Entries**: 446 across 8 batch files
- **Unique Program IDs**: 238 
- **Duplicate IDs**: 120 (CRITICAL ISSUE)
- **Files Analyzed**: 8 enriched batch files
- **Data Completeness**: ~98% (minor gaps in optional metadata)

### Quality Status

| Metric | Status | Count | Notes |
|--------|--------|-------|-------|
| **Duplicate IDs** | ⛔ CRITICAL | 120 duplicates | Batch 01 overlaps with all other batches |
| **Missing Years** | ⚠️ MINOR | 0 | All programs have year metadata ✅ |
| **Missing Descriptions** | ⚠️ MINOR | 0 | All programs have descriptions ✅ |
| **Missing Market Data** | ⚠️ MINOR | 0 | All programs have market data ✅ |
| **Invalid Status Values** | ✅ PASS | 0 | All status values valid |
| **Year Range Validity** | ✅ PASS | All years 1995-2026 | Reasonable range |
| **Market Values** | ⚠️ MINOR | 1 invalid | China ("CN") not in valid markets |

---

## Critical Issue: Duplicate Program IDs

### Root Cause
**Batch 01 (enriched-batch-01-priority.ts)** contains 231 programs that significantly overlap with later batches. This creates 120 duplicate IDs across the dataset.

### Impact
- **238 unique programs** represented by **446 total entries** = **87.6% data duplication rate**
- Graph construction will fail or create duplicate nodes
- Impossible to determine canonical source for each program
- Data integrity compromised for downstream consumers

### Most Duplicated Programs

| Program ID | Occurrences | Files |
|------------|-------------|-------|
| `store-newsletters` | 5 | batch-01, batch-04B, batch-05, batch-05B, batch-05-final |
| `markdown-manager` | 5 | batch-01, batch-02B, batch-04B, batch-05, batch-05-final |
| `simple-delivery` | 4 | batch-01, batch-02B, batch-03, batch-04 |
| `best-offer` | 4 | batch-01, batch-02B, batch-04, batch-04B |
| `discounts-manager` | 4 | batch-01, batch-04, batch-04B, batch-05 |
| `promotions-manager` | 4 | batch-01, batch-04B, batch-05, batch-05-final |
| `coded-coupons` | 4 | batch-01, batch-04B, batch-05, batch-05-final |
| `seller-initiated-offers` | 4 | batch-01, batch-04B, batch-05, batch-05-final |
| `ebay-refurbished` | 3 | batch-01, batch-02B, batch-03 |
| `ebay-motors` | 3 | batch-01, batch-02B, batch-03 |

**Full duplicate list**: 120 programs affected (see Appendix A)

---

## Data Completeness Analysis

### Status Distribution

| Status | Count | Percentage | Notes |
|--------|-------|------------|-------|
| **current** | 406 | 91.0% | Active programs |
| **legacy** | 39 | 8.7% | Deprecated programs |
| **renamed** | 1 | 0.2% | Programs renamed to new IDs |

**Finding**: Good balance showing historical context while maintaining current state.

### Market Coverage

| Market | Program Count | Coverage Level |
|--------|---------------|----------------|
| **Global** | 281 | Universal programs |
| **US** | 112 | Largest single market |
| **UK** | 48 | Second largest |
| **DE** (Germany) | 24 | Third largest |
| **AU** (Australia) | 21 | Fourth largest |
| **CA** (Canada) | 18 | Fifth largest |
| **IT** (Italy) | 13 | Sixth largest |
| **FR** (France) | 10 | Seventh largest |
| **CN** (China) | 1 | ⚠️ Invalid market code |

**Finding**: Comprehensive market coverage with one invalid market code ("CN" for China - should use "global" or be removed from valid markets list).

### Launch Year Distribution

| Decade | Programs | Notable Launches |
|--------|----------|------------------|
| **1990s** | 14 (3.1%) | eBay core features, feedback, auction formats |
| **2000s** | 98 (22.0%) | Stores, advertising, TRS, PowerSeller era |
| **2010s** | 203 (45.5%) | Promoted Listings, mobile features, authentication |
| **2020s** | 131 (29.4%) | AI features, Vault, live shopping, SpeedPAK |

**Finding**: Realistic distribution showing eBay's evolution. Heavy concentration in 2010s reflects digital transformation period.

---

## Data Quality Issues

### 1. Invalid Market Code (MINOR)
- **Program**: `ebay-speedpak` (batch-02B)
- **Issue**: Market value includes "CN" (China)
- **Fix**: Change to `["DE", "global"]` or add "CN" to valid markets list

### 2. Suspicious Years (None Detected)
All 446 program entries have years within the valid range (1995-2026). No anomalies detected. ✅

### 3. Missing Metadata (None Detected)
All programs have complete required metadata:
- ✅ All have `id`
- ✅ All have `name`
- ✅ All have `desc`
- ✅ All have `year`
- ✅ All have `market`
- ✅ All have `status`

---

## File-by-File Breakdown

| Batch File | Programs | Status | Issues |
|------------|----------|--------|--------|
| `enriched-batch-01-priority.ts` | 231 | ⚠️ OVERLAPS | Source of 120 duplicates |
| `enriched-batch-02B-programs-401-500.ts` | 70 | ⚠️ DUPLICATES | 53 duplicates with batch-01 |
| `enriched-batch-03-programs-501-750.ts` | 28 | ⚠️ DUPLICATES | 22 duplicates with batch-01 |
| `enriched-batch-04-programs-751-900.ts` | 27 | ⚠️ DUPLICATES | 3 duplicates with batch-01 |
| `enriched-batch-04B-programs-901-1000.ts` | 20 | ⚠️ DUPLICATES | 16 duplicates with batch-01 |
| `enriched-batch-05-programs-1001-1150.ts` | 15 | ⚠️ DUPLICATES | 14 duplicates with batch-01 |
| `enriched-batch-05B-programs-1151-1250.ts` | 29 | ⚠️ DUPLICATES | 16 duplicates with batch-01 |
| `enriched-batch-05-programs-1251-1494.ts` | 26 | ⚠️ DUPLICATES | 10 duplicates with batch-01 |
| **TOTAL** | **446** | | **238 unique** |

---

## Recommendations

### CRITICAL: Resolve Duplicate IDs (PRIORITY 1)

**Strategy**: Choose ONE canonical source per program and remove duplicates.

#### Option 1: Keep Batch-01 Only (RECOMMENDED)
- **Action**: Delete duplicate entries from batches 02B, 03, 04, 04B, 05, 05B, 05-final
- **Rationale**: Batch-01 is labeled "priority" and appears to be the authoritative source
- **Impact**: Reduces dataset from 446 to ~238 unique programs
- **Effort**: Medium (requires deduplication script)

#### Option 2: Keep Later Batches, Remove Batch-01 Duplicates
- **Action**: Remove overlapping entries from Batch-01, keep later batches as canonical
- **Rationale**: Later batches may have more recent/accurate metadata
- **Impact**: Keeps ~238 unique programs with potentially fresher data
- **Effort**: High (requires careful comparison of metadata quality)

#### Option 3: Merge and Deduplicate
- **Action**: Create master deduplication script that:
  1. Identifies all duplicates
  2. Compares metadata quality (completeness, accuracy, recency)
  3. Selects best version of each program
  4. Generates single canonical batch file
- **Rationale**: Ensures highest quality metadata for each program
- **Impact**: Creates authoritative dataset
- **Effort**: High (requires sophisticated merge logic)

### MINOR: Fix Invalid Market Code (PRIORITY 2)

**File**: `enriched-batch-02B-programs-401-500.ts`  
**Program**: `ebay-speedpak`  
**Current**: `market: ["DE", "CN"]`  
**Fix**: `market: ["DE"]` or add "CN" to valid markets enum

### VERIFICATION: Run Post-Fix Quality Check (PRIORITY 3)

After deduplication, re-run quality check to verify:
- ✅ Zero duplicate IDs
- ✅ All market codes valid
- ✅ 238 unique programs with complete metadata
- ✅ Year range still 1995-2026
- ✅ Status distribution unchanged (~91% current, ~9% legacy/renamed)

---

## Deduplication Script (Recommended Approach)

```bash
#!/bin/bash
# Simple deduplication: Keep batch-01, remove duplicates from other batches

# 1. Extract all IDs from batch-01
grep -o 'id: "[^"]*"' enriched-batch-01-priority.ts | \
  sed 's/id: "//;s/"//' > batch-01-ids.txt

# 2. For each other batch file, remove entries with duplicate IDs
# (This is a manual process - review each duplicate carefully)

# 3. Verify uniqueness
for f in enriched-batch-*.ts; do
  echo "$f:"
  grep -o 'id: "[^"]*"' "$f" | wc -l
done

# 4. Check for remaining duplicates
cat enriched-batch-*.ts | grep -o 'id: "[^"]*"' | \
  sort | uniq -d | wc -l
# Should output: 0
```

**Note**: Manual review recommended before deletion to preserve any unique metadata in duplicate entries.

---

## Metadata Quality Highlights

### ✅ Strengths
1. **Complete metadata**: All required fields populated
2. **Realistic years**: Launch years span 1995-2026, matching eBay's history
3. **Rich descriptions**: All programs have detailed, informative descriptions
4. **Clear status**: Proper tracking of current/legacy/renamed states
5. **Market specificity**: Good granularity on regional vs. global programs

### ⚠️ Improvement Opportunities
1. **Deduplication**: Eliminate 120 duplicate IDs (critical)
2. **Market codes**: Standardize valid market list (add CN or remove from data)
3. **Batch organization**: Consider consolidating into fewer, more logical batches
4. **Naming consistency**: Some programs use American English (e.g., "Certified"), others British (e.g., "Centre")

---

## Appendix A: Complete Duplicate ID List

(Showing first 50 of 120 duplicates - see full report in quality-check.py output)

1. `ebay-refurbished` (3 files)
2. `excellent-refurbished` (3 files)
3. `very-good-refurbished` (3 files)
4. `good-refurbished` (3 files)
5. `certified-open-box` (2 files)
6. `ebay-guaranteed-fit` (3 files)
7. `ebay-plus` (2 files)
8. `ebay-wow` (2 files)
9. `ebay-imperdibili` (2 files)
10. `bons-plans` (2 files)
11. `ebay-vault` (2 files)
12. `top-rated-plus` (3 files)
13. `ebay-premium-service` (3 files)
14. `ebay-top-service` (3 files)
15. `above-standard` (2 files)
16. `below-standard` (2 files)
17. `resolution-center` (3 files)
18. `global-shipping-program` (3 files)
19. `ebay-international-shipping` (2 files)
20. `ebay-speedpak` (2 files)
21. `simple-delivery` (4 files)
22. `ebay-standard-envelope` (2 files)
23. `ebay-guaranteed-delivery` (2 files)
24. `shipping-labels` (3 files)
25. `local-pickup` (3 files)
26. `click-and-collect` (3 files)
27. `ebay-collection-points` (3 files)
28. `in-store-pickup` (3 files)
29. `managed-delivery` (3 files)
30. `logistica-ebay-orange-connex` (3 files)
31. `free-2-day-shipping` (3 files)
32. `free-3-day-shipping` (3 files)
33. `free-4-day-shipping` (3 files)
34. `ebay-for-charity` (3 files)
35. `circular-fashion-fund` (2 files)
36. `preloved-partner-program` (3 files)
37. `certified-recycler-program` (3 files)
38. `ebay-live` (3 files)
39. `watchlist` (3 files)
40. `saved-searches` (2 files)
41. `recently-viewed` (2 files)
42. `best-match` (2 files)
43. `image-search` (2 files)
44. `find-it-on-ebay` (2 files)
45. `ebay-motors` (3 files)
46. `my-garage` (3 files)
47. `trading-card-hub` (2 files)
48. `goldin-auctions` (2 files)
49. `ebay-academy` (3 files)
50. `export-academy` (2 files)

... and 70 more duplicates.

**Full list available in quality-check.py output.**

---

## Appendix B: Quality Check Script

Python quality check script saved to:  
`/Users/bradfischer/naming-studio/app/naming-graph/quality-check.py`

To re-run quality check:
```bash
cd /Users/bradfischer/naming-studio/app/naming-graph
python3 quality-check.py
```

---

## Sign-off

**Data Quality Assessment**: ⚠️ CONDITIONAL PASS  
**Blockers**: 120 duplicate IDs must be resolved before production use  
**Recommendation**: Execute Option 1 (keep batch-01 only) or Option 3 (intelligent merge)  
**Timeline**: 2-4 hours for deduplication + verification  
**Risk**: HIGH if used as-is (graph will contain duplicate nodes)

**Reviewed by**: Claude Code  
**Date**: 2026-04-17  
**Next Review**: After deduplication fix
