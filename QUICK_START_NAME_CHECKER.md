# Quick Start - eBay Name Checker

Get started with the name checking system in 5 minutes.

## Setup (2 minutes)

### 1. Get eBay API Key

1. Go to https://developer.ebay.com/
2. Sign up (free)
3. Create new application
4. Copy your **App ID**

### 2. Configure Environment

Add to `.env.local`:

```bash
EBAY_APP_ID=paste_your_app_id_here
```

### 3. Start Server

```bash
npm run dev
```

## Test It (1 minute)

### Check a Name

```bash
curl -X POST http://localhost:3000/api/check-names \
  -H "Content-Type: application/json" \
  -d '{"names": "SmartSell Pro"}'
```

### Check for Conflict

```bash
curl -X POST http://localhost:3000/api/check-names \
  -H "Content-Type: application/json" \
  -d '{"names": "eBay AutoList"}'
```

Expected: `riskLevel: "critical"` with portfolio conflict

## Use It (2 minutes)

### In Your Code

```typescript
// Check a name
const response = await fetch('/api/check-names', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ names: 'MyProduct' })
});

const data = await response.json();
const result = data.results[0];

if (result.riskLevel === 'critical') {
  alert('This name conflicts with existing products!');
}
```

### Check Multiple Names

```typescript
const response = await fetch('/api/check-names', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    names: ['Product A', 'Product B', 'Product C']
  })
});

const data = await response.json();

// Find best option (lowest risk)
const best = data.results
  .filter(r => r.isAvailable)
  .sort((a, b) => {
    const levels = { low: 0, medium: 1, high: 2, critical: 3 };
    return levels[a.riskLevel] - levels[b.riskLevel];
  })[0];

console.log('Recommended:', best.name);
```

## Response Format

```json
{
  "results": [{
    "name": "SmartSell Pro",
    "isAvailable": true,
    "riskLevel": "low",
    "conflicts": [],
    "recommendations": [
      "Name appears to be available",
      "Conduct formal trademark search before finalizing"
    ],
    "ebayData": {
      "totalProducts": 12,
      "searchUrl": "https://ebay.com/sch/..."
    }
  }],
  "summary": {
    "totalChecked": 1,
    "available": 1,
    "conflicts": 0,
    "highRisk": 0
  }
}
```

## Risk Levels

- **low** - No conflicts, name is available ✅
- **medium** - Minor conflicts, review recommended ⚠️
- **high** - Significant conflicts, choose alternative ❌
- **critical** - Direct eBay portfolio conflict, will fail G4 🛑

## Common Use Cases

### 1. Pre-flight Check

```typescript
// Before evaluation
const nameCheck = await fetch('/api/check-names', {
  method: 'POST',
  body: JSON.stringify({ names: proposedName })
});

const result = await nameCheck.json();

if (result.results[0].riskLevel === 'high') {
  if (!confirm('Name has conflicts. Continue?')) return;
}

// Continue with evaluation
```

### 2. Batch Comparison

```typescript
const candidates = ['Option A', 'Option B', 'Option C'];
const response = await fetch('/api/check-names', {
  method: 'POST',
  body: JSON.stringify({ names: candidates })
});

const data = await response.json();

// Sort by risk
const sorted = data.results.sort((a, b) => {
  const levels = { low: 0, medium: 1, high: 2, critical: 3 };
  return levels[a.riskLevel] - levels[b.riskLevel];
});

console.log('Best to worst:', sorted.map(r => r.name));
```

### 3. G4 Integration

```typescript
import { augmentG4WithNameCheck } from '@/lib/modules/g4-integration';

// Auto-enhance G4 gate
const brief = `Launching "QuickSell Pro" for automated listings...`;
const g4Result = await augmentG4WithNameCheck(brief);

console.log('G4 Status:', g4Result.status);
console.log('Reasoning:', g4Result.reasoning);
```

## Troubleshooting

### "eBay API not configured"

Add `EBAY_APP_ID` to `.env.local`

### "Rate limit exceeded"

Wait 1 minute, or enable Redis caching

### Slow responses

- Enable caching (Redis for production)
- Results are cached for 24 hours

## Next Steps

- **Full Documentation:** `EBAY_NAME_CHECKER_GUIDE.md`
- **Integration Guide:** `INTEGRATION_EXAMPLE.md`
- **Code Examples:** `examples/name-checker-usage.ts`
- **Deployment:** `NAME_CHECKER_DEPLOYMENT_CHECKLIST.md`

## API Reference

### POST /api/check-names

**Request:**
```json
{
  "names": "Name" | ["Name1", "Name2"],
  "options": {
    "checkEbay": true,
    "checkTrademarks": true,
    "maxEbayResults": 20,
    "useCache": true
  }
}
```

**Limits:**
- Max 10 names per request
- 20 requests/minute

### GET /api/check-names?name=ProductName

Quick single name check (30 req/min)

## Support

- **Issues:** Check `EBAY_NAME_CHECKER_GUIDE.md` troubleshooting section
- **Examples:** See `examples/name-checker-usage.ts` for 13 examples
- **Tests:** Run `npm run test tests/name-checker.test.ts`

---

**Ready to use!** 🚀

Start checking names now with the commands above.
