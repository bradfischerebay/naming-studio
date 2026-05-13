# Cleanup Guide: Remove "Not available" Data Pollution

**Issue:** 489 instances of `'Not available'` string polluting the translation data  
**Impact:** Shows fake text in UI instead of indicating true market unavailability  
**Solution:** Make market fields optional and remove all "Not available" lines

---

## Step 1: Update the Interface

**File:** `translations.ts`

**BEFORE:**
```typescript
export interface ProgramTranslation {
  US: string;      // Required
  UK: string;      // Required
  DE: string;      // Required
  FR: string;      // Required
  IT: string;      // Required
  CA: string;      // Required
  AU: string;      // Required
  status: 'confirmed' | 'partial' | 'research-needed' | 'global';
  type: 'masterbrand' | 'category' | 'advertising' | 'trust' | 'impact' | 'developer' | 'regional';
  tier: 'master' | 'umbrella' | 't1' | 't2' | 't3' | 'product' | 'program' | 'feature' | 'legal' | 'organization' | 'publication' | 'event' | 'campaign' | 'vertical' | 'platform' | 'variant';
  parent?: string;
}
```

**AFTER:**
```typescript
export interface ProgramTranslation {
  US?: string;     // Optional - only present if available in US
  UK?: string;     // Optional - only present if available in UK
  DE?: string;     // Optional - only present if available in Germany
  FR?: string;     // Optional - only present if available in France
  IT?: string;     // Optional - only present if available in Italy
  CA?: string;     // Optional - only present if available in Canada
  AU?: string;     // Optional - only present if available in Australia
  status: 'confirmed' | 'partial' | 'research-needed' | 'global';
  type: 'masterbrand' | 'category' | 'advertising' | 'trust' | 'impact' | 'developer' | 'regional';
  tier: 'master' | 'umbrella' | 't1' | 't2' | 't3' | 'product' | 'program' | 'feature' | 'legal' | 'organization' | 'publication' | 'event' | 'campaign' | 'vertical' | 'platform' | 'variant';
  parent?: string;
}
```

---

## Step 2: Run the Cleanup Script

```bash
cd /Users/bradfischer/naming-studio/app/naming-graph
./cleanup-not-available.sh
```

This will:
- ✅ Create automatic backup
- ✅ Remove all 489 "Not available" lines
- ✅ Verify TypeScript syntax
- ✅ Show before/after comparison

---

## Step 3: Examples of Clean Data

### Before Cleanup

```typescript
'eBay Plus': {
  US: 'Not available',      // ❌ Polluted data
  UK: 'Not available',      // ❌ Polluted data
  DE: 'eBay Plus',          // ✅ Real translation
  FR: 'Not available',      // ❌ Polluted data
  IT: 'Not available',      // ❌ Polluted data
  CA: 'Not available',      // ❌ Polluted data
  AU: 'eBay Plus',          // ✅ Real translation
  status: 'partial',
  type: 'category',
  tier: 'program',
  parent: 'buyer'
}
```

### After Cleanup

```typescript
'eBay Plus': {
  DE: 'eBay Plus',          // ✅ Only markets where it exists
  AU: 'eBay Plus',          // ✅ Field presence = availability
  status: 'partial',
  type: 'category',
  tier: 'program',
  parent: 'buyer'
}
```

### Global Program (No Change)

```typescript
'Seller Hub': {
  US: 'Seller Hub',
  UK: 'Seller Hub',
  DE: 'Verkäufer-Cockpit Pro',
  FR: 'Hub vendeur',
  IT: 'Console venditori',
  CA: 'Seller Hub',
  AU: 'Seller Hub',
  status: 'confirmed',
  type: 'category',
  tier: 'product',
  parent: 'sellertools'
}
// No change - all 7 markets have real translations
```

---

## Step 4: Update UI Code

**Pattern to use in components:**

```typescript
// Get available markets for a program
function getAvailableMarkets(program: ProgramTranslation): string[] {
  const markets = ['US', 'UK', 'DE', 'FR', 'IT', 'CA', 'AU'];
  return markets.filter(market => program[market as keyof ProgramTranslation]);
}

// Example usage
const markets = getAvailableMarkets(programTranslations['eBay Plus']);
console.log(markets); // ['DE', 'AU']

// Check if available in specific market
if (program.DE) {
  console.log(`German name: ${program.DE}`);
}

// Iterate only over available markets
Object.entries(program)
  .filter(([key]) => ['US', 'UK', 'DE', 'FR', 'IT', 'CA', 'AU'].includes(key))
  .forEach(([market, name]) => {
    if (name) {
      console.log(`${market}: ${name}`);
    }
  });
```

---

## Impact Summary

### Programs Affected (~70 regional exclusives)

**US-only:**
- eBay Vault
- Fitment Plus Auto
- Certified Open Box
- Trading Card Hub
- eBay Standard Envelope

**DE-only:**
- eBay WOW!
- Top-Service badge
- Platin Store tier

**IT-only:**
- eBay Imperdibili
- Premium Plus Store tier
- Logistica eBay by Orange Connex

**UK-only:**
- Simple Delivery
- Premium Service badge

**DE/AU-only:**
- eBay Plus

**US/CA-only:**
- Trading Cards Authentication (PSA)

---

## Benefits After Cleanup

✅ **Clean data** - No fake "Not available" strings  
✅ **Semantic correctness** - Field presence indicates availability  
✅ **Easier filtering** - `if (program.DE)` just works  
✅ **Smaller file size** - Remove 489 unnecessary lines  
✅ **Matches GraphNode** - Enriched data already uses this pattern  
✅ **Better UX** - UI won't show "Not available" text

---

## Verification Checklist

After cleanup, verify:

- [ ] TypeScript compiles without errors
- [ ] No "Not available" strings remain (`grep -c "Not available" translations.ts` = 0)
- [ ] Regional exclusives show only actual markets (eBay Plus has only DE, AU)
- [ ] Global programs still have all 7 markets
- [ ] UI components handle optional fields correctly
- [ ] Naming graph filters work with new structure

---

## Rollback Plan

If issues arise:

```bash
# Restore from automatic backup
cp /Users/bradfischer/naming-studio/app/naming-graph/translations.ts.backup-YYYYMMDD-HHMMSS \
   /Users/bradfischer/naming-studio/app/naming-graph/translations.ts
```

---

**Ready to clean?** Run `./cleanup-not-available.sh` when ready!
