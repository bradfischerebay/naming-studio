# Chomsky Authentication Fix - Quick Reference

## What Was Fixed

The Chomsky client now properly authenticates with the Chomsky Gateway API by:
1. Requesting bearer tokens from the DCP Utility Executor Service
2. Caching tokens for 6 hours
3. Including required headers in all API requests

## Changes Made

### File: `/Users/bradfischer/naming-studio/lib/chomsky.ts`

**Added:**
- `getAccessToken()` - Retrieves and caches bearer tokens
- `tokenCache` - In-memory token storage with TTL
- Required headers: `Authorization`, `X-genai-api-provider`, `X-EBAY-USER-ID`, `X-EBAY-CHOMSKY-MODEL-NAME`

**Before:**
```typescript
const response = await fetch(this.config.endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({...})
});
```

**After:**
```typescript
const token = await this.getAccessToken();
const response = await fetch(this.config.endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    "X-genai-api-provider": "azure",
    "X-EBAY-USER-ID": process.env.USER || "naming-studio",
    "X-EBAY-CHOMSKY-MODEL-NAME": modelName,
  },
  body: JSON.stringify({...})
});
```

## How to Test

### Option 1: Run Test Script
```bash
cd ~/naming-studio
npx tsx test-chomsky.ts
```

### Option 2: Use Web UI
```bash
cd ~/naming-studio
npm run dev
# Open http://localhost:3000
# Paste CITA brief (see TEST_RESULTS.md)
# Click "Run Evaluation"
```

## Expected Results for CITA Brief

**Verdict:** ❌ No Proper Name Needed - Use A Descriptive Label

**Why:**
- G0 (Interaction Model): ✅ Pass - User clicks a button
- G1 (Integration Level): ❌ Fail - No separate enrollment
- G2 (UX Boundary): ❌ Fail - Just a button on existing page
- G3 (Lifespan): ✅ Pass - Multi-year roadmap
- G4 (Portfolio): ✅ Pass - No naming conflicts
- G5 (Legal): ✅ Pass or ❓ Unknown - No legal issues

**Rule Applied:** Any G1-G5 failure → "No Proper Name Needed"

## Troubleshooting

### Still getting 400 error?
1. Verify you're connected to eBay VPN
2. Check that the token endpoint is accessible
3. Review console logs for token generation errors

### Token endpoint failing?
- Endpoint: `https://dcputilityexecutorsvc.vip.qa.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run`
- Must be on VPN
- Should return JSON with `outputData.appToken`

### Headers not being sent?
- Verify the updated chomsky.ts file is being used
- Check that TypeScript compilation is working
- Restart the Next.js dev server

## Production Deployment

**Note:** This implementation is for QA/staging environments. Production deployment would require:
1. Environment detection (`ENV_CHOMSKY_KRYLOV_WORKSPACE`)
2. Trust Fabric authentication
3. Production endpoint: `https://chomskygw.vip.ebay.com/api/v1/genai`

## References

- PyChomsky SDK: `/Users/bradfischer/weekly-update-aggregator/.venv/lib/python3.9/site-packages/pychomsky/`
- Test Results: `/Users/bradfischer/naming-studio/TEST_RESULTS.md`
- Chomsky Client: `/Users/bradfischer/naming-studio/lib/chomsky.ts`
