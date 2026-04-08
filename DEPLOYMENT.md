# Deployment Guide

## Production Deployment

### Prerequisites

- Node.js 18+
- eBay VPN access (for Chomsky gateway)
- Environment variables configured

### Environment Variables

Create `.env.production`:

```bash
# Chomsky LLM Gateway
CHOMSKY_ENDPOINT=https://chomskygw.vip.ebay.com/api/v1/genai
CHOMSKY_MODEL=gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox

# Token endpoint
CHOMSKY_TOKEN_ENDPOINT=https://dcputilityexecutorsvc.vip.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run

# Optional: Enable features
ENABLE_WEB_RESEARCH=false
MAX_RETRIES=1
```

### Build and Deploy

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build image
docker build -t naming-agent .

# Run container
docker run -p 3000:3000 --env-file .env.production naming-agent
```

## Monitoring

### Health Check

```bash
curl http://localhost:3000/api/evaluate-v2

# Response:
{
  "status": "ok",
  "version": "2.0",
  "description": "Naming Agent v2 - Modular Production System"
}
```

### Logging

Add structured logging:

```typescript
// lib/logger.ts
export function log(level: string, message: string, meta?: object) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  }));
}
```

Use in orchestrator:

```typescript
import { log } from './logger';

log('info', 'Evaluation started', { brief: briefId });
log('error', 'Gate evaluation failed', { error: err.message });
```

### Metrics

Track key metrics:

```typescript
// lib/metrics.ts
export const metrics = {
  evaluations_total: 0,
  evaluations_pass: 0,
  evaluations_fail: 0,
  evaluations_clarification: 0,
  avg_duration_ms: 0,
};

export function recordEvaluation(result: EvaluateResult, duration: number) {
  metrics.evaluations_total++;

  if (result.verdict.path === VerdictPath.PATH_C) {
    metrics.evaluations_pass++;
  } else if (result.verdict.path === VerdictPath.PATH_B) {
    metrics.evaluations_clarification++;
  } else {
    metrics.evaluations_fail++;
  }

  // Update average duration
  metrics.avg_duration_ms =
    (metrics.avg_duration_ms * (metrics.evaluations_total - 1) + duration) /
    metrics.evaluations_total;
}
```

Expose metrics endpoint:

```typescript
// app/api/metrics/route.ts
import { metrics } from '@/lib/metrics';

export async function GET() {
  return Response.json(metrics);
}
```

## Performance Optimization

### Caching

Cache parsed briefs:

```typescript
import { LRUCache } from 'lru-cache';

const briefCache = new LRUCache<string, ParsedBrief>({
  max: 100,
  ttl: 1000 * 60 * 60, // 1 hour
});

export async function parseBrief(rawText: string): Promise<ParsedBrief> {
  const cacheKey = hashString(rawText);

  const cached = briefCache.get(cacheKey);
  if (cached) return cached;

  const parsed = await actualParseBrief(rawText);
  briefCache.set(cacheKey, parsed);

  return parsed;
}
```

### Rate Limiting

```typescript
// lib/rate-limit.ts
import { RateLimiter } from 'limiter';

const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: 'minute',
});

export async function checkRateLimit() {
  const allowed = await limiter.tryRemoveTokens(1);
  if (!allowed) {
    throw new Error('Rate limit exceeded');
  }
}
```

## Migration from v1

### Side-by-Side Deployment

Both systems can run in parallel:

- **Old system**: `/api/evaluate` (existing)
- **New system**: `/api/evaluate-v2` (new)

### Gradual Rollout

```typescript
// Feature flag
const USE_V2 = process.env.USE_V2_AGENT === 'true';

export async function POST(request: NextRequest) {
  if (USE_V2) {
    return handleV2(request);
  } else {
    return handleV1(request);
  }
}
```

### A/B Testing

```typescript
// Random split
const useV2 = Math.random() < 0.5;

const result = useV2
  ? await evaluateV2(brief)
  : await evaluateV1(brief);

// Log for comparison
log('ab_test', 'Evaluation', { version: useV2 ? 'v2' : 'v1', result });
```

## Rollback Plan

If issues occur:

1. **Immediate**: Set `USE_V2=false` in environment
2. **Revert**: Restart service with old code
3. **Investigate**: Check logs and metrics
4. **Fix**: Address issues in v2
5. **Re-deploy**: Gradual rollout again

## Security

### Input Validation

```typescript
import { z } from 'zod';

const RequestSchema = z.object({
  brief: z.string().min(10).max(50000),
  skipWebResearch: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const validated = RequestSchema.parse(body);
    // ... proceed
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
```

### Rate Limiting

```typescript
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  await checkRateLimit(); // Throws if limit exceeded

  // ... proceed with evaluation
}
```

### CORS (if needed)

```typescript
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://your-app.ebay.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

## Troubleshooting

### Common Issues

**Issue**: Chomsky timeout
```
Solution: Increase maxDuration in route.ts
export const maxDuration = 120; // 2 minutes
```

**Issue**: Token expired
```
Solution: Token is auto-refreshed (6-hour cache). Check token endpoint availability.
```

**Issue**: Memory leak
```
Solution: Ensure LRU caches have max size limits
```

**Issue**: Test failures
```
Solution: Run tests in isolation
npm test -- --no-threads
```

## Support

- **Logs**: Check CloudWatch/Splunk for errors
- **Metrics**: Monitor `/api/metrics` endpoint
- **Health**: Monitor `/api/evaluate-v2` GET endpoint
- **Alerts**: Set up alerts for error rate > 5%

---

**Deployed**: Ready for production  
**Version**: 2.0  
**Next**: Monitor metrics and gather feedback
