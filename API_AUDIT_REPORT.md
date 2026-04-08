# API Layer Audit Report
**Date**: 2026-04-06  
**Scope**: All API routes in `/app/api/` + `lib/chomsky.ts` + `lib/rate-limit.ts`

---

## Executive Summary

**Routes Audited**: 15  
**Issues Found**: 12  
**Critical**: 3  
**High**: 4  
**Medium**: 5

---

## Critical Issues

### 1. Missing Fallback in Classify Route for Chomsky Failure
**File**: `app/api/classify/route.ts`  
**Lines**: 54-57  
**Issue**: When Chomsky is unreachable (VPN down), the catch block returns `{"type":"brief"}` silently. This is correct behavior, but there's no distinction between "Chomsky failed" vs "Chomsky succeeded and returned brief". The user gets no feedback that classification didn't work.

**Impact**: User won't know their VPN is down until they submit the brief and evaluation fails.

**Current Code**:
```typescript
} catch {
  // Any error — default to brief
  return Response.json({ type: "brief" });
}
```

**Fix**: Add a `fallback: true` flag when Chomsky fails so UI can show a warning.

---

### 2. No Input Validation on Brief Length in evaluate-v2
**File**: `app/api/evaluate-v2/route.ts`  
**Lines**: 32-37  
**Issue**: Only checks `!brief || typeof brief !== "string" || !brief.trim()`. No maximum length validation. A 1MB brief would be sent to Chomsky and likely fail or timeout.

**Impact**: Could cause timeouts, high token costs, or API errors.

**Fix**: Add `MAX_BRIEF_LENGTH = 50000` (50k chars ~ 12.5k tokens) with clear error message.

---

### 3. Model Parameter Not Validated in evaluate-v2
**File**: `app/api/evaluate-v2/route.ts`  
**Lines**: 25, 40, 47  
**Issue**: User can pass any `model` string via request body. No whitelist check. Could pass invalid model names or attempt to abuse billing.

**Impact**: API errors from Chomsky, potential cost abuse, unclear error messages.

**Fix**: Add model whitelist validation.

---

## High Priority Issues

### 4. Lab Evaluate Route Has No Rate Limiting
**File**: `app/api/lab/evaluate/route.ts`  
**Issue**: SSE streaming endpoint with 0 rate limiting. This route makes 6-8 LLM calls per request.

**Impact**: Could be abused for DoS or run up costs.

**Fix**: Add rate limiting at 10 req/min (same as evaluate-v2).

---

### 5. Error Responses Leak Internal Details in Multiple Routes
**Files**: 
- `app/api/evaluate-v2/route.ts:167-177` (exposes error message verbatim)
- `app/api/lab/simulate/route.ts:200` (exposes full error as string)
- `app/api/generate-conditions/route.ts:78` (generic "Failed to generate conditions")

**Issue**: Chomsky errors may contain internal URLs, stack traces, or auth token details.

**Current Code (evaluate-v2)**:
```typescript
const message = error instanceof Error ? error.message : String(error);
// ...
return NextResponse.json({
  success: false,
  error: isVpn
    ? "Cannot reach the Chomsky gateway — make sure you're on the eBay VPN."
    : message, // ← LEAKS INTERNAL ERROR
}, { status: 500 });
```

**Fix**: Sanitize error messages before sending to client. Only expose known safe error types.

---

### 6. Chat Route Missing Input Length Validation
**File**: `app/api/chat/route.ts`  
**Lines**: 88-104, 112  
**Issue**: Message is truncated to 2000 chars for knowledge mode (`message.slice(0, 2000)`) but no truncation for coaching mode. If user sends 100k chars, it's sent to Chomsky verbatim.

**Impact**: Token waste, potential timeout, unclear billing.

**Fix**: Add consistent max length validation at route entry (400 error if > 5000 chars).

---

### 7. Upload Route Magic Bytes Validation Insufficient
**File**: `app/api/upload/route.ts`  
**Lines**: 8-22  
**Issue**: Only validates first 4 bytes. A malicious file could have PDF header but contain executable code after byte 5.

**Impact**: Low security risk (server doesn't execute files), but could be used to bypass file type restrictions.

**Fix**: Document this limitation. For production, consider rejecting files if body contains suspicious patterns.

---

## Medium Priority Issues

### 8. Inconsistent HTTP Status Codes
**Files**: Multiple  
**Issue**: Some routes return 500 for validation errors that should be 400.

Examples:
- `app/api/lab/presets/route.ts:86` - Returns 500 for "Failed to save preset" (could be transient Redis issue OR validation issue)
- `app/api/generate-conditions/route.ts:66` - Returns 500 for JSON parse failure (should be 422 or 400)

**Fix**: Use 400 for client errors, 500 only for server errors, 503 for external service unavailable.

---

### 9. Chomsky Client Missing Timeout Configuration
**File**: `lib/chomsky.ts`  
**Lines**: All fetch() calls  
**Issue**: No timeout on fetch(). If Chomsky hangs, the request waits until Next.js route timeout (240s).

**Impact**: Poor UX, wasted connections.

**Fix**: Add AbortController with 30-60s timeout to all fetch() calls.

---

### 10. Rate Limit Storage Race Condition in Memory Mode
**File**: `lib/rate-limit.ts`  
**Lines**: 165-174  
**Issue**: `get()`, `set()`, `increment()` are 3 separate async operations. Between `set()` and `increment()`, another request could reset the counter.

**Current Flow**:
```typescript
const current = await storage.get(identifier);
if (!current || current.resetTime < now) {
  await storage.set(identifier, { count: 0, resetTime }); // ← RACE WINDOW
}
await storage.increment(identifier); // ← Could increment wrong window
```

**Impact**: In development (InMemoryStorage), concurrent requests could bypass rate limit.

**Fix**: Use atomic test-and-set in InMemoryStorage or document limitation.

---

### 11. No Model Parameter Validation in Other Routes
**Files**: 
- `app/api/lab/evaluate/route.ts:28`
- `app/api/evaluate/route.ts:119`

**Issue**: Same as evaluate-v2 — model parameter accepted but not validated.

**Fix**: Extract model whitelist to shared constant, validate in all routes.

---

### 12. Missing Content-Type Validation in Upload Route
**File**: `app/api/upload/route.ts`  
**Lines**: 46-79  
**Issue**: Relies on `file.type` and extension, but browsers can send arbitrary Content-Type headers. Magic bytes check is good, but no explicit Content-Type allowlist.

**Impact**: Could accept files with weird MIME types if magic bytes pass.

**Fix**: Explicitly check Content-Type header against allowlist before processing.

---

## Positive Findings

1. All routes that should have rate limiting DO have it (except lab/evaluate)
2. Rate limiting uses headers correctly (`X-RateLimit-*` and `Retry-After`)
3. Error handling generally present (try/catch blocks in all routes)
4. VPN detection in evaluate-v2 is good UX
5. Upload route has comprehensive error messages
6. Chomsky client properly caches tokens (6hr TTL)
7. Chomsky client correctly handles GPT-5+ `max_completion_tokens` parameter
8. All routes return proper JSON (no HTML responses)

---

## Recommended Fixes (Implementation Priority)

### Phase 1: Critical (Implement Now)
1. Add brief length validation to evaluate-v2 (MAX 50k chars)
2. Add model whitelist validation to all routes that accept `model`
3. Add rate limiting to lab/evaluate route

### Phase 2: High (Implement Before Production)
4. Sanitize error messages in all catch blocks
5. Add consistent input length validation to chat route
6. Add request timeouts to Chomsky client fetch() calls

### Phase 3: Medium (Improvement)
7. Fix HTTP status codes for client vs server errors
8. Document upload route magic bytes limitation
9. Add Content-Type allowlist to upload route
10. Fix rate limit race condition or document limitation

---

## Model Whitelist (Proposed)

```typescript
// lib/config/models.ts
export const ALLOWED_MODELS = [
  "azure-chat-completions-gpt-5-2-2025-12-11-sandbox",
  "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox",
  "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox",
  "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox",
  "gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox",
] as const;

export type AllowedModel = typeof ALLOWED_MODELS[number];

export function isValidModel(model: unknown): model is AllowedModel {
  return typeof model === "string" && ALLOWED_MODELS.includes(model as AllowedModel);
}

export function getDefaultModel(): string {
  return process.env.CHOMSKY_MODEL || ALLOWED_MODELS[0];
}
```

---

## Files Requiring Changes

1. `app/api/evaluate-v2/route.ts` - Add brief length + model validation
2. `app/api/lab/evaluate/route.ts` - Add rate limiting + model validation
3. `app/api/lab/simulate/route.ts` - Sanitize error messages
4. `app/api/classify/route.ts` - Add fallback flag
5. `app/api/chat/route.ts` - Add input length validation
6. `app/api/upload/route.ts` - Add Content-Type allowlist
7. `app/api/generate-conditions/route.ts` - Fix HTTP status codes
8. `lib/chomsky.ts` - Add request timeouts
9. `lib/rate-limit.ts` - Document race condition limitation
10. `lib/config/models.ts` - NEW FILE for model whitelist

---

**Audit completed**: 2026-04-06
