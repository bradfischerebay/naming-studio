# How to Test the Upload Fix

## Quick Start

### 1. Run the Live Diagnostic (Recommended)

This tests the exact bug scenario: 3 rapid consecutive uploads.

```bash
# Terminal 1: Start the dev server
npm run dev

# Terminal 2: Run the diagnostic
npx tsx tests/upload-diagnostic.ts
```

**Expected Output:**
```
🔍 Upload Reliability Diagnostic
================================

📝 Test file created: /tmp/test-brief.txt
   Content length: 234 characters

Test 1: Single upload (baseline)
--------------------------------------------------
  Attempt 1: ✅ SUCCESS (150ms)
  Extracted 234 characters

Test 2: Three rapid consecutive uploads (bug scenario)
--------------------------------------------------
  Attempt 1: ✅ SUCCESS (145ms)
    Extracted 234 characters
  Attempt 2: ✅ SUCCESS (148ms)
    Extracted 234 characters
  Attempt 3: ✅ SUCCESS (142ms)
    Extracted 234 characters

Results Summary
==================================================
  Total attempts: 3
  Successful: 3
  Failed: 0
  Success rate: 100.0%

✅ ALL TESTS PASSED - Upload is 100% reliable!
```

### 2. Run Unit Tests

```bash
# Test the rate limiter fix
npm test tests/rate-limit.test.ts

# Test the upload API
npm test tests/upload.integration.test.ts

# Run all tests
npm test
```

### 3. Manual Testing in Browser

1. Start dev server: `npm run dev`
2. Open http://localhost:3000
3. Upload a brief file 3 times in quick succession
4. All 3 should succeed immediately

## What Was Fixed

### The Bug
- **Symptom:** File upload failed the first 2 times, succeeded on the 3rd attempt
- **Root Cause:** Race condition in `InMemoryStorage.increment()` method
- **Impact:** Affected all API routes using rate limiting (upload, chat, evaluate)

### The Fix
- Fixed `lib/rate-limit.ts` `increment()` method to initialize entries properly
- Added comprehensive error handling and logging to `app/api/upload/route.ts`
- Rate limiter now fails open if it encounters errors (uploads still work)

## Monitoring in Production

### Check Logs

After deploying, watch for these log patterns:

```bash
# Successful uploads
[Upload] Request received at 2026-04-02T...
[Upload] Rate limit check: { success: true, remaining: 4, limit: 5 }
[Upload] File received: { name: 'brief.pdf', type: 'application/pdf', size: 15234 }
[Upload] File buffer created, size: 15234
[Upload] Validating magic bytes for type: application/pdf
[Upload] Parsing PDF file
[Upload] PDF parsed successfully, text length: 1234
[Upload] Success! Processed in 156ms, extracted 1234 characters

# Rate limit exceeded (expected)
[Upload] Rate limit check: { success: false, remaining: 0, limit: 5 }
[Upload] Rate limit exceeded

# Errors (investigate these)
[Upload] Rate limiter error (allowing request to proceed): [error details]
[Upload] Failed after 234ms: { error: '...', type: 'Error' }
```

### Success Metrics

Monitor these in your observability platform:
- **Upload Success Rate:** Should be >99%
- **Upload Latency P95:** Should be <500ms for typical files
- **Rate Limit Hit Rate:** Track legitimate vs malicious traffic

## Troubleshooting

### Tests Fail Locally

If tests fail with rate limiting errors:
```bash
# Wait 60 seconds for rate limit to reset, then retry
sleep 60 && npm test
```

### Diagnostic Shows Failures

If the diagnostic shows <100% success rate:
1. Check that the fix is applied: `git diff lib/rate-limit.ts`
2. Restart the dev server
3. Check for port conflicts: `lsof -i :3000`
4. Review logs for actual error messages

### Production Issues

If uploads fail in production:
1. Check logs for `[Upload] Failed after...` messages
2. Verify rate limiter storage (use Upstash for production, not InMemoryStorage)
3. Check file size limits and parsing library versions
4. Verify network/timeout configuration

## Additional Resources

- **Fix Summary:** `tests/UPLOAD_FIX_SUMMARY.md`
- **Rate Limit Tests:** `tests/rate-limit.test.ts`
- **Upload Tests:** `tests/upload.integration.test.ts`
- **Diagnostic Script:** `tests/upload-diagnostic.ts`
