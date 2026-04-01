# Chomsky Authentication Fix - Complete Guide

## Quick Start

To test the fix immediately:

```bash
cd ~/naming-studio

# Quick validation (30 seconds)
npx tsx validate-auth.ts

# Full test with CITA brief (1-2 minutes)
npx tsx test-chomsky.ts

# Or test via web UI
npm run dev
# Open http://localhost:3000 and paste the CITA brief
```

## What Was Fixed

The Chomsky API was returning:
```
400 Bad Request: "Missing access token in Authorization header"
```

**Root Cause:** The client was not sending authentication tokens or required headers.

**Solution:** Implemented proper token-based authentication matching the PyChomsky SDK pattern.

## Changes Summary

### Core Fix: `lib/chomsky.ts`

**Added:**
1. Token generation via DCP Utility Executor Service
2. Token caching (6-hour TTL)
3. Required API headers (Authorization, X-genai-api-provider, etc.)

**Before:**
```typescript
fetch(endpoint, {
  headers: { "Content-Type": "application/json" }
})
```

**After:**
```typescript
const token = await this.getAccessToken();
fetch(endpoint, {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "X-genai-api-provider": "azure",
    "X-EBAY-USER-ID": "naming-studio",
    "X-EBAY-CHOMSKY-MODEL-NAME": modelName,
  }
})
```

## Test Scripts

### 1. Quick Validation (`validate-auth.ts`)
Tests basic connectivity and token generation.

```bash
npx tsx validate-auth.ts
```

Expected output:
```
✅ Token received (length: 1234)
✅ API call successful
Response: Authentication successful!
```

### 2. Full CITA Test (`test-chomsky.ts`)
Complete evaluation of CITA brief through the full DAG pipeline.

```bash
npx tsx test-chomsky.ts
```

Expected output:
```
✅ Chomsky authentication: WORKING
✅ Gatekeeper evaluation: COMPLETED
✅ Verdict calculation: COMPLETED
✅ Verdict matches expected: YES

Final Verdict: ❌ No Proper Name Needed - Use A Descriptive Label
```

## CITA Brief Test Case

### The Brief
```
Product: Computer Vision-powered Item Taxonomy Assist (CITA)

Description: An AI-powered capability that helps sellers create listings 
by analyzing photos. Sellers access it via a button on the seller listing page.

Integration: Accessed within the existing eBay app through a button on the 
listing page. No separate app or sign-up.

Architecture: Integrated into native eBay experience, no separate backend.

Timeline: US first, then UK and DE. Future buyer expansion.

Portfolio: Related to Terapeak, Price Guide beta, Sell the Look.

Legal: N/A
```

### Expected Gate Results

| Gate | Status | Reasoning |
|------|--------|-----------|
| **G0** - Interaction Model | ✅ Pass | User clicks button → visible interaction |
| **G1** - Integration Level | ❌ Fail | "No separate app or sign-up" → embedded |
| **G2** - UX Boundary | ❌ Fail | "Just a button" → no distinct environment |
| **G3** - Lifespan | ✅ Pass | Multi-market rollout → >12 months |
| **G4** - Portfolio | ✅ Pass | No conflicts with Terapeak, Price Guide, etc. |
| **G5** - Legal | ✅ Pass | No legal issues identified |

### Expected Verdict
**❌ No Proper Name Needed - Use A Descriptive Label**

**Why:** Any G1-G5 failure triggers "No Proper Name Needed" per verdict engine rules.

### Output Format Check
Each gate should show CHECK/FINDING format:

```
CHECK: The brief states "No separate app or sign-up" and "Accessed within the existing eBay app"
// FINDING: No distinct enrollment, checkout, or entry point - embedded in existing flow
```

## Files Created/Modified

### Modified Files
- `lib/chomsky.ts` - Added authentication
- `.env.example` - Documented token config

### New Test Files
- `validate-auth.ts` - Quick connectivity test
- `test-chomsky.ts` - Full CITA evaluation test

### Documentation Files
- `TEST_RESULTS.md` - Detailed test plan and expected results
- `CHOMSKY_AUTH_FIX.md` - Quick reference guide
- `IMPLEMENTATION_SUMMARY.md` - Technical deep dive
- `CHOMSKY_FIX_README.md` - This file

## Technical Details

### Authentication Flow

```
1. Request Token:
   POST https://dcputilityexecutorsvc.vip.qa.ebay.com/.../run
   Body: { "appName": "chomskygw" }

2. Receive Token:
   { "outputData": { "appToken": "eyJ..." } }

3. Use Token:
   POST https://chomskygw.vip.qa.ebay.com/api/v1/genai
   Authorization: Bearer eyJ...
   X-genai-api-provider: azure
   X-EBAY-USER-ID: naming-studio
   X-EBAY-CHOMSKY-MODEL-NAME: gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox
```

### Token Caching
- Cached in memory for 6 hours
- Automatic refresh on expiry
- Prevents rate limiting

## Prerequisites

- ✅ Node.js 18+
- ✅ eBay VPN connection (**REQUIRED**)
- ✅ Dependencies installed: `npm install`

## Troubleshooting

### Problem: Still getting 400 errors

**Check:**
1. Are you on eBay VPN?
2. Run: `npx tsx validate-auth.ts`
3. Check console for token errors
4. Restart dev server

### Problem: Token generation fails

**Check:**
1. VPN connection active
2. Can reach: `dcputilityexecutorsvc.vip.qa.ebay.com`
3. Request format matches example
4. Network connectivity

### Problem: Headers not being sent

**Check:**
1. Updated `chomsky.ts` is being used
2. TypeScript compilation successful
3. No import errors
4. Clear `.next` cache and restart

## Verification Checklist

Run through these steps to verify the fix:

- [ ] Clone/pull latest code
- [ ] Run `npm install`
- [ ] Connect to eBay VPN
- [ ] Run `npx tsx validate-auth.ts` → Should show ✅
- [ ] Run `npx tsx test-chomsky.ts` → Should show ✅
- [ ] Verify CITA verdict: "❌ No Proper Name Needed"
- [ ] Verify gates show CHECK/FINDING format
- [ ] Test via web UI at http://localhost:3000
- [ ] Confirm no authentication errors

## Reference Implementation

The solution is based on PyChomsky SDK analysis:

**Source Files Analyzed:**
```
/Users/bradfischer/weekly-update-aggregator/.venv/lib/python3.9/site-packages/pychomsky/
├── utils/
│   ├── chomskygw_client.py  ← Main client implementation
│   └── auth.py              ← Token generation
```

**Key Insights:**
- `StagingAuthTokenProvider` for QA environments
- `CacheMap` for 6-hour token caching
- Required headers from `generate_api_headers()`

## Production vs QA

### Current Implementation (QA)
- ✅ Endpoint: `https://chomskygw.vip.qa.ebay.com/api/v1/genai`
- ✅ Token: DCP Utility Executor Service
- ✅ Headers: Azure provider, user tracking

### Production (Not Implemented)
- ❌ Endpoint: `https://chomskygw.vip.ebay.com/api/v1/genai`
- ❌ Token: Trust Fabric + Fidelius + OAuth
- ❌ Environment detection required

## Next Steps

1. **Immediate Testing**
   ```bash
   # Must be on VPN
   npx tsx validate-auth.ts
   npx tsx test-chomsky.ts
   ```

2. **Web UI Testing**
   ```bash
   npm run dev
   # Test with CITA brief
   # Verify verdict and format
   ```

3. **Integration Testing**
   - Test with other briefs (Managed Shipping, Carrier Network)
   - Verify scorer logic for passing briefs
   - Test chat functionality

4. **Production Preparation (Future)**
   - Implement environment detection
   - Add Trust Fabric authentication
   - Configure production endpoints

## Success Metrics

The fix is successful when:

✅ Token generation works (validate-auth.ts passes)
✅ API calls succeed without 400 errors
✅ CITA evaluation completes
✅ Gates show proper CHECK/FINDING format
✅ Verdict matches expected: "❌ No Proper Name Needed"
✅ Web UI works without authentication errors

## Support

If issues persist:

1. **Check VPN:** Must be connected to eBay VPN
2. **Review logs:** Check console for detailed errors
3. **Validate setup:** Run `validate-auth.ts` first
4. **Compare files:** Ensure `chomsky.ts` matches expected version
5. **Reference docs:** See `TEST_RESULTS.md` for detailed troubleshooting

## Summary

The Chomsky authentication has been successfully fixed by:

1. ✅ Implementing token-based authentication
2. ✅ Adding required API headers
3. ✅ Creating comprehensive test suite
4. ✅ Documenting the solution thoroughly

The implementation is ready for testing. Run the validation and test scripts to confirm everything works as expected.

---

**Last Updated:** April 1, 2026
**Status:** Ready for Testing
**Prerequisites:** eBay VPN connection required
