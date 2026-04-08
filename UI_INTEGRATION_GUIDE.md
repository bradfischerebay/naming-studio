# UI Integration Guide - API Changes
**For UI Developers**  
**Date**: 2026-04-06

---

## What Changed

The API layer now has stricter validation, better error handling, and new response fields. This guide shows what you need to update in the UI.

---

## 1. Classify Route - New Fallback Flag

### What Changed
The `/api/classify` endpoint now returns a `fallback` flag when it can't reach Chomsky (VPN down).

### Old Response
```json
{ "type": "brief" }
```

### New Response
```json
{
  "type": "brief",
  "fallback": true  // ← NEW FIELD
}
```

### UI Integration Required

**Show a warning when `fallback: true`:**

```typescript
const classifyInput = async (message: string) => {
  const response = await fetch('/api/classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  
  const { type, fallback } = await response.json();
  
  if (fallback) {
    // User should know classification didn't work
    toast.warning(
      'Unable to classify your input. Treating it as a brief. ' +
      'If this is a question, make sure you\'re connected to the eBay VPN.'
    );
  }
  
  return type; // "brief" or "question"
};
```

---

## 2. Brief Length Limit

### What Changed
Briefs are now capped at **50,000 characters** (~12,500 tokens).

### Error Response
```json
{
  "error": "Brief is too long. Maximum 50,000 characters allowed. Your brief is 75,234 characters."
}
```

### UI Integration Recommended

**Add character counter to brief input:**

```tsx
const [brief, setBrief] = useState('');
const MAX_LENGTH = 50000;

<textarea
  value={brief}
  onChange={(e) => setBrief(e.target.value)}
  maxLength={MAX_LENGTH}
/>
<div className="text-sm text-gray-500">
  {brief.length.toLocaleString()} / {MAX_LENGTH.toLocaleString()} characters
  {brief.length > MAX_LENGTH * 0.9 && (
    <span className="text-orange-600 ml-2">
      ⚠️ Approaching limit
    </span>
  )}
</div>
```

---

## 3. Chat Message Length Limit

### What Changed
Chat messages are now capped at **5,000 characters**.

### Error Response
```json
{
  "error": "Message is too long. Maximum 5,000 characters allowed. Your message is 7,842 characters."
}
```

### UI Integration Recommended
Same character counter as brief input, but with `MAX_LENGTH = 5000`.

---

## 4. Model Validation

### What Changed
Only specific models are allowed. Invalid models return 400 error.

### Allowed Models
```typescript
const ALLOWED_MODELS = [
  "azure-chat-completions-gpt-5-2-2025-12-11-sandbox",
  "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox",
  "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox",
  "gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox",
  "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox",
];
```

### Error Response
```json
{
  "error": "Invalid model: fake-model-123. Allowed models: azure-chat-completions-gpt-5-2-2025-12-11-sandbox, ..."
}
```

### UI Integration Required

**Import the model list from the new config file:**

```typescript
import { ALLOWED_MODELS } from '@/lib/config/models';

// For dropdowns
const modelOptions = ALLOWED_MODELS.map(model => {
  // Convert "azure-chat-completions-gpt-5-2-2025-12-11-sandbox"
  // to "GPT-5.2"
  const name = model.includes('gpt-5') ? 'GPT-5.2' :
               model.includes('claude-sonnet') ? 'Claude Sonnet 4.6' :
               model.includes('claude-opus') ? 'Claude Opus 4.6' :
               model.includes('gemini') ? 'Gemini 3.1 Pro' :
               'Unknown';
  
  return { label: name, value: model };
});

<Select options={modelOptions} />
```

---

## 5. Improved Error Handling

### What Changed
All routes now return proper HTTP status codes and user-friendly error messages.

### Status Codes Reference

| Code | Meaning | User Action |
|------|---------|-------------|
| 400 | Bad input (validation failed) | Fix input and retry |
| 422 | Valid request but can't process | Rephrase or retry |
| 429 | Rate limit exceeded | Wait and retry |
| 503 | Service unavailable (VPN/Chomsky) | Connect to VPN and retry |
| 504 | Request timed out | Simplify brief and retry |
| 500 | Server error | Retry or contact support |

### UI Integration Required

**Handle errors by status code:**

```typescript
const handleApiError = (response: Response, data: { error: string }) => {
  switch (response.status) {
    case 400: // Validation error
      toast.error(data.error);
      break;
      
    case 422: // Unprocessable (AI returned invalid format)
      toast.error(data.error);
      break;
      
    case 429: // Rate limit
      toast.warning(data.error + ' Please wait before trying again.');
      break;
      
    case 503: // VPN/Chomsky unreachable
      toast.error(
        data.error + '\n\n' +
        '🔧 Troubleshooting:\n' +
        '1. Confirm you\'re connected to eBay VPN\n' +
        '2. Try again in a few seconds\n' +
        '3. If issue persists, contact #naming-studio'
      );
      break;
      
    case 504: // Timeout
      toast.warning(
        data.error + '\n\n' +
        '💡 Try simplifying your brief or removing large documents.'
      );
      break;
      
    default: // 500 or other
      toast.error('Something went wrong. Please try again.');
      console.error('API error:', response.status, data);
  }
};

// Usage
const response = await fetch('/api/evaluate-v2', { ... });
const data = await response.json();

if (!response.ok) {
  handleApiError(response, data);
  return;
}

// Success path
```

---

## 6. Rate Limit Headers

### What Changed
All rate-limited routes now return standard headers.

### Response Headers
```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 2026-04-06T15:30:00.000Z
Retry-After: 45  // (only when rate limited)
```

### UI Integration Optional

**Show rate limit status to user:**

```typescript
const evaluateBrief = async (brief: string) => {
  const response = await fetch('/api/evaluate-v2', { ... });
  
  // Extract rate limit headers
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  
  if (remaining && parseInt(remaining) <= 2) {
    toast.info(`⏱️ ${remaining} evaluations remaining until ${new Date(reset!).toLocaleTimeString()}`);
  }
  
  // Handle response...
};
```

---

## 7. File Upload Changes

### What Changed
Upload route now validates both Content-Type AND file extension.

### New Behavior
- Rejects files if both MIME type and extension are unsupported
- More helpful error messages

### Error Examples
```json
{
  "error": "Unsupported file type: application/zip. Please upload PDF, DOCX, or TXT files."
}
```

### UI Integration - No Changes Required
Existing upload UI should continue to work. Users will get clearer errors if they try to upload unsupported files.

---

## 8. Lab Evaluate Route - Rate Limiting Added

### What Changed
The `/api/lab/evaluate` streaming endpoint now has a **10 requests/minute** rate limit.

### Error Response
```json
{
  "error": "Too many requests. Please try again later."
}
```

### UI Integration Required

**Disable "Run Evaluation" button when rate limited:**

```typescript
const [isRateLimited, setIsRateLimited] = useState(false);

const runLabEvaluation = async () => {
  const response = await fetch('/api/lab/evaluate', { ... });
  
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const seconds = parseInt(retryAfter || '60');
    
    setIsRateLimited(true);
    toast.warning(`Rate limit reached. Try again in ${seconds} seconds.`);
    
    setTimeout(() => setIsRateLimited(false), seconds * 1000);
    return;
  }
  
  // Handle response...
};

<Button disabled={isRateLimited}>
  {isRateLimited ? 'Rate Limited...' : 'Run Evaluation'}
</Button>
```

---

## 9. Timeout Behavior

### What Changed
All requests now timeout after **60 seconds** with a clear error.

### Error Response
```json
{
  "error": "Request timed out. The brief may be too complex or Chomsky is slow to respond."
}
```

### UI Integration Recommended

**Show loading state with timeout indicator:**

```tsx
const [isEvaluating, setIsEvaluating] = useState(false);
const [elapsedTime, setElapsedTime] = useState(0);

const evaluate = async () => {
  setIsEvaluating(true);
  setElapsedTime(0);
  
  const timer = setInterval(() => {
    setElapsedTime(t => t + 1);
  }, 1000);
  
  try {
    const response = await fetch('/api/evaluate-v2', { ... });
    // Handle response...
  } finally {
    clearInterval(timer);
    setIsEvaluating(false);
  }
};

{isEvaluating && (
  <div className="flex items-center gap-2">
    <Spinner />
    <span>Evaluating... ({elapsedTime}s)</span>
    {elapsedTime > 30 && (
      <span className="text-orange-600">
        Taking longer than usual...
      </span>
    )}
  </div>
)}
```

---

## Summary of Required UI Changes

### Must Do (Breaks functionality if not done)
1. ✅ Handle `fallback` flag from classify route
2. ✅ Enforce 50k char limit on brief input
3. ✅ Enforce 5k char limit on chat messages
4. ✅ Use model whitelist for dropdown
5. ✅ Update error handling to use status codes

### Should Do (Better UX)
6. ✅ Show character counter on inputs
7. ✅ Show rate limit status
8. ✅ Show elapsed time during evaluation
9. ✅ Disable buttons when rate limited

### Nice to Have (Polish)
10. Show retry countdown when rate limited
11. Show network status indicator
12. Add "Simplify brief" suggestions on timeout
13. Add example briefs at different lengths

---

## Testing Checklist

- [ ] Try submitting 51k char brief → expect 400 error with clear message
- [ ] Try invalid model → expect 400 error listing allowed models
- [ ] Disconnect VPN, classify input → expect `fallback: true`
- [ ] Trigger rate limit → expect 429 with Retry-After header
- [ ] Upload .exe file → expect 400 error
- [ ] Submit brief while offline → expect 503 error
- [ ] All error toasts show user-friendly messages (no stack traces)

---

**Questions?** Check `/API_AUDIT_REPORT.md` for full technical details or `/API_FIXES_IMPLEMENTED.md` for implementation notes.
