# eBay Name Checker Integration Guide

Complete implementation for checking product names against eBay marketplace and trademark databases.

## Overview

This system provides automated name conflict detection for the G4 (Portfolio Alignment) gate by:

1. **eBay Marketplace Analysis** - Searches existing eBay product listings
2. **Portfolio Conflict Detection** - Checks against known eBay products/brands
3. **Trademark Verification** - Queries USPTO database for registered marks
4. **Risk Assessment** - Calculates conflict severity and recommendations

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    API Endpoint                          │
│              /app/api/check-names                        │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│              Name Checker Service                        │
│           /lib/modules/name-checker.ts                   │
└─────┬──────────────────────────────────┬────────────────┘
      │                                  │
      ▼                                  ▼
┌─────────────────┐              ┌──────────────────┐
│  eBay Client    │              │ Trademark Client │
│ ebay-client.ts  │              │trademark-client.ts│
└─────────────────┘              └──────────────────┘
      │                                  │
      ▼                                  ▼
┌─────────────────────────────────────────────────────────┐
│                   Cache Layer                            │
│            /lib/modules/name-check-cache.ts              │
│   (In-Memory for dev, Redis for production)             │
└─────────────────────────────────────────────────────────┘
```

## Setup Instructions

### 1. Environment Variables

Add to your `.env.local` file:

```bash
# Required for eBay API access
EBAY_APP_ID=your_ebay_application_id

# Optional: For production caching (already configured)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### 2. Get eBay API Credentials

1. Visit [eBay Developers Program](https://developer.ebay.com/)
2. Sign up for a free developer account
3. Create a new application
4. Copy your **Application ID (App ID)**
5. Add to `.env.local` as `EBAY_APP_ID`

**Note:** eBay Finding API is free with rate limits of 5,000 calls/day.

### 3. USPTO Trademark API

No API key required. The USPTO provides free public access to their trademark database.

**Rate limits:** ~120 requests/minute (conservative estimate)

## API Usage

### Endpoint: `/api/check-names`

#### POST - Check Single or Multiple Names

**Request:**
```json
{
  "names": "eBay AutoList",
  "options": {
    "checkEbay": true,
    "checkTrademarks": true,
    "maxEbayResults": 20,
    "useCache": true
  }
}
```

**Or batch check:**
```json
{
  "names": ["eBay AutoList", "QuickSell Pro", "SmartList"],
  "options": {
    "checkEbay": true,
    "checkTrademarks": true
  }
}
```

**Response:**
```json
{
  "results": [
    {
      "name": "eBay AutoList",
      "isAvailable": false,
      "conflicts": [
        {
          "type": "portfolio",
          "severity": "high",
          "description": "Conflicts with existing eBay product: \"ebay\"",
          "source": "eBay Portfolio Database",
          "details": {
            "product": "ebay",
            "similarity": 0.95
          }
        }
      ],
      "riskLevel": "critical",
      "recommendations": [
        "Strong recommendation to choose a different name.",
        "Conflicts with existing eBay product portfolio - this will fail G4 gate."
      ],
      "ebayData": {
        "totalProducts": 1247,
        "sampleProducts": [...],
        "searchUrl": "https://www.ebay.com/sch/i.html?_nkw=eBay%20AutoList"
      },
      "trademarkData": {
        "searchTerm": "eBay AutoList",
        "hasConflicts": true,
        "riskLevel": "high",
        "conflicts": [...]
      },
      "timestamp": 1712074800000,
      "cachedResult": false
    }
  ],
  "summary": {
    "totalChecked": 1,
    "available": 0,
    "conflicts": 1,
    "highRisk": 1
  }
}
```

#### GET - Quick Single Name Check

**Request:**
```
GET /api/check-names?name=SmartList
```

**Response:**
```json
{
  "name": "SmartList",
  "isAvailable": true,
  "conflicts": [],
  "riskLevel": "low",
  "recommendations": [
    "Name appears to be available with minimal conflicts.",
    "Conduct formal trademark search before finalizing."
  ],
  "timestamp": 1712074800000,
  "cachedResult": false
}
```

## Integration with G4 Gate

### Option 1: Automatic Enhancement (Recommended)

Enhance the existing `/api/evaluate` endpoint to automatically check names:

```typescript
import { augmentG4WithNameCheck } from '@/lib/modules/g4-integration';

// Inside your evaluate route, after gatekeeper runs:
const g4Enhancement = await augmentG4WithNameCheck(
  brief,
  gatekeeperResult.object.G4
);

if (g4Enhancement) {
  // Override or augment G4 reasoning
  gatekeeperResult.object.G4 = {
    status: g4Enhancement.status,
    reasoning: g4Enhancement.reasoning,
  };
}
```

### Option 2: Manual API Call

Call the name checker API directly from your frontend:

```typescript
const response = await fetch('/api/check-names', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    names: proposedName,
    options: { checkEbay: true, checkTrademarks: true }
  })
});

const data = await response.json();

if (data.results[0].riskLevel === 'critical') {
  // Show warning to user
  alert('This name conflicts with existing eBay products!');
}
```

### Option 3: Pre-flight Check

Add a name validation step before evaluation:

```typescript
// In your form submission handler
const nameCheckResponse = await fetch('/api/check-names', {
  method: 'POST',
  body: JSON.stringify({ names: proposedName })
});

const nameCheck = await nameCheckResponse.json();

if (nameCheck.results[0].riskLevel === 'high' || 
    nameCheck.results[0].riskLevel === 'critical') {
  // Warn user before proceeding to full evaluation
  const proceed = confirm(
    'This name has conflicts. Do you want to proceed anyway?'
  );
  if (!proceed) return;
}

// Continue with normal evaluation
```

## G4 Integration Module

Use the G4 integration helper for enhanced evaluations:

```typescript
import { 
  enhanceG4Evaluation,
  enhanceG4BatchEvaluation,
  generateG4Summary 
} from '@/lib/modules/g4-integration';

// Single name enhancement
const g4Result = await enhanceG4Evaluation('eBay SmartSell');
console.log(g4Result.status); // 'Pass', 'Fail', or 'Pending'
console.log(g4Result.reasoning); // Formatted CHECK/FINDING reasoning

// Batch evaluation for comparing alternatives
const candidates = ['SmartSell', 'QuickList', 'AutoPost'];
const results = await enhanceG4BatchEvaluation(candidates);
console.log(generateG4Summary(results));
```

## Caching

### Development (Default)

Uses in-memory caching:
- Fast and simple
- No external dependencies
- Lost on server restart
- Not suitable for production multi-instance deployments

### Production (Redis)

Configure Redis caching for production:

```typescript
import { Redis } from '@upstash/redis';
import { getNameCheckCache, RedisCacheStorage } from '@/lib/modules/name-check-cache';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
});

const cache = getNameCheckCache({
  storage: new RedisCacheStorage(redis),
  ttl: 86400 // 24 hours
});
```

**Benefits:**
- Distributed caching across all server instances
- Persists across deployments
- Reduces external API calls
- 24-hour TTL by default

## Rate Limiting

Built-in rate limiting protects against API abuse:

### API Endpoint Limits
- **POST /api/check-names**: 20 requests/minute
- **GET /api/check-names**: 30 requests/minute
- **Maximum batch size**: 10 names per request

### External API Limits
- **eBay Finding API**: 5,000 requests/day (handled internally)
- **USPTO API**: ~120 requests/minute (conservative limit)

Rate limits are automatically enforced. Exceeded limits return 429 status.

## Error Handling

The system gracefully handles failures:

```typescript
try {
  const result = await nameChecker.checkName('Test Name');
} catch (error) {
  // Specific error cases:
  // - "eBay API not configured" → EBAY_APP_ID missing
  // - "rate limit exceeded" → Too many requests
  // - Network errors → External API unavailable
}
```

API returns appropriate HTTP status codes:
- `400` - Invalid request (missing/invalid parameters)
- `429` - Rate limit exceeded
- `503` - Service unavailable (eBay API not configured)
- `500` - Internal server error

## Testing

### Test the API Endpoint

```bash
# Test single name check
curl -X POST http://localhost:3000/api/check-names \
  -H "Content-Type: application/json" \
  -d '{"names": "TestProduct"}'

# Test batch check
curl -X POST http://localhost:3000/api/check-names \
  -H "Content-Type: application/json" \
  -d '{"names": ["Product1", "Product2", "Product3"]}'

# Test GET endpoint
curl "http://localhost:3000/api/check-names?name=TestProduct"
```

### Test Without eBay API Key

The system works in degraded mode without `EBAY_APP_ID`:
- Portfolio conflict checking still works
- Trademark checking still works
- eBay marketplace search returns service unavailable
- G4 evaluation can still proceed with available data

## Known eBay Portfolio

The system includes a built-in database of known eBay products:

```typescript
const EBAY_PORTFOLIO = [
  'ebay', 'ebay motors', 'ebay stores', 'seller hub',
  'terapeak', 'price guide', 'paypal', 'stubhub',
  // ... and more
];
```

**To update:** Edit `/lib/modules/name-checker.ts` and add to `EBAY_PORTFOLIO` array.

## Customization

### Adjust Similarity Threshold

Edit `name-checker.ts`:

```typescript
// Line ~200
const similarity = this.calculateSimilarity(normalized, product);
if (similarity > 0.8) {  // Change threshold here
  // Conflict detected
}
```

### Add Custom Conflict Sources

Extend the `NameConflict` type:

```typescript
export interface NameConflict {
  type: 'ebay' | 'trademark' | 'portfolio' | 'custom';
  // ... existing fields
}
```

### Modify Cache TTL

```typescript
const cache = getNameCheckCache({
  ttl: 3600 // 1 hour instead of 24
});
```

## Production Deployment Checklist

- [ ] Set `EBAY_APP_ID` environment variable
- [ ] Configure Redis cache (Upstash recommended)
- [ ] Update `EBAY_PORTFOLIO` with latest eBay products
- [ ] Replace mock trademark implementation with real USPTO API
- [ ] Set up monitoring for API rate limits
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Test rate limiting under load
- [ ] Document any custom conflict sources

## Future Enhancements

### Short-term
1. **Real USPTO API Integration** - Replace mock with actual TSDR API calls
2. **International Trademarks** - Add WIPO Global Brand Database
3. **NLP Name Extraction** - Better parsing of proposed names from briefs
4. **Conflict Severity Scoring** - More sophisticated risk algorithms

### Long-term
1. **Machine Learning** - Train model on historical naming decisions
2. **Semantic Search** - Find conceptually similar names, not just string matches
3. **Real-time Monitoring** - Track new trademark filings
4. **Competitor Analysis** - Check names against Amazon, Walmart, etc.
5. **Domain Availability** - Check DNS availability for web products

## Support & Troubleshooting

### Common Issues

**"eBay API not configured"**
- Solution: Add `EBAY_APP_ID` to environment variables

**"Rate limit exceeded"**
- Solution: Wait 1 minute and retry, or implement exponential backoff

**Slow responses**
- Solution: Enable Redis caching for production
- Check network latency to eBay/USPTO APIs

**Cache not working**
- Solution: Verify Redis connection (if using)
- Check TTL settings aren't too short

### Debug Mode

Enable detailed logging:

```typescript
// In name-checker.ts
console.log('Checking name:', name);
console.log('Options:', options);
console.log('Cache hit:', cachedResult);
```

## API Reference Summary

### `/api/check-names` (POST)
- **Input**: `{ names: string | string[], options?: NameCheckOptions }`
- **Output**: `{ results: NameCheckResult[], summary: {} }`
- **Rate limit**: 20 req/min

### `/api/check-names` (GET)
- **Input**: `?name=string`
- **Output**: `NameCheckResult`
- **Rate limit**: 30 req/min

### G4 Integration Functions

```typescript
// Single name check
enhanceG4Evaluation(name: string): Promise<G4EnhancedResult>

// Batch check
enhanceG4BatchEvaluation(names: string[]): Promise<Map<string, G4EnhancedResult>>

// Auto-extract from brief
augmentG4WithNameCheck(brief: string): Promise<G4EnhancedResult | null>
```

## License & Attribution

This implementation uses:
- **eBay Finding API** - [eBay Developer Program](https://developer.ebay.com/)
- **USPTO TSDR API** - Public domain
- Built for eBay Naming Studio evaluation framework

---

**Last Updated:** April 2, 2026
**Version:** 1.0.0
**Maintainer:** Data Engineering Team
