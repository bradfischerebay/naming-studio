# Usage Examples

## API Endpoint

### Basic Evaluation

```bash
curl -X POST http://localhost:3000/api/evaluate-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "eBay is introducing a managed shipping service that handles all logistics for sellers. Target customers are high-volume sellers in US and UK markets. Launch date: March 2025. This is a permanent feature integrated into the existing seller dashboard."
  }'
```

### Response (Pass Example)

```json
{
  "success": true,
  "result": {
    "verdict": {
      "path": "PATH_C",
      "title": "✅ Proceed With Naming - A Proper Name Is Recommended (Score: 65/70)",
      "summary": [
        "**The product naming brief meets the threshold for a proper name.**",
        "Total score (65/70) meets the 60-point threshold. Proceed with naming process."
      ],
      "audit_table": "...",
      "score_table": "..."
    },
    "requiresClarification": false
  }
}
```

### Response (Needs Clarification)

```json
{
  "success": true,
  "result": {
    "verdict": {
      "path": "PATH_B",
      "title": "⚠️ Need More Information - Decision Deferred"
    },
    "requiresClarification": true,
    "questions": [
      "Integration Level: Is this a standalone program with separate sign-up, or an integrated feature within existing flows?\n  Example: Standalone App vs. Feature Toggle",
      "Strategic Lifespan: Is this a permanent addition (>12 months), or a short-term campaign?\n  Example: Permanent Infrastructure vs. Seasonal Promo"
    ]
  }
}
```

### Retry with Clarification

```bash
curl -X POST http://localhost:3000/api/evaluate-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "...",
    "clarification": "This is an integrated feature within the seller dashboard, not a standalone app. It is permanent and will last indefinitely.",
    "previousResult": { ... }
  }'
```

## Node.js Usage

```typescript
import { orchestrator } from './lib/orchestrator';

// Simple evaluation
const result = await orchestrator.evaluate({
  brief: briefText,
  config: {
    skipWebResearch: false, // Set to true to skip landscape research
    maxRetries: 1,
  },
  onProgress: (phase, message) => {
    console.log(`[${phase}] ${message}`);
  },
});

console.log(result.verdict.title);
console.log(result.markdown); // Full formatted report

if (result.requiresClarification) {
  console.log('Questions:', result.questions);

  // Collect user input...
  const userInput = "This is a standalone app...";

  // Retry with clarification
  const retryResult = await orchestrator.evaluateWithClarification({
    brief: briefText,
    userClarification: userInput,
    previousResult: result,
  });

  console.log(retryResult.verdict.title);
}
```

## Direct Module Usage

### Parse Brief

```typescript
import { parseBrief } from './lib/modules/parser';

const parsed = await parseBrief(`
Offering: eBay managed shipping
Target: High-volume sellers
Markets: US, UK
Timing: March 2025
`);

console.log(parsed.compiled_brief.offering_description);
```

### Extract Facts

```typescript
import { extractFacts } from './lib/modules/extractor';

const facts = await extractFacts(compiledBrief, landscapeData);

console.log(facts.facts.enrollment_policies); // "shared" or "separate"
console.log(facts.score_tags); // ["global_big3", ...]
```

### Evaluate Gates (No LLM)

```typescript
import { evaluateGates } from './lib/modules/evaluator';

const gates = evaluateGates(facts);

console.log(gates.gate_results.G0.status); // "Pass", "Fail", or "Unknown"
console.log(gates.any_failures); // boolean
console.log(gates.missing_info); // boolean
```

### Calculate Score (No LLM)

```typescript
import { calculateScore } from './lib/modules/scorer';

const score = calculateScore(facts);

console.log(score.scores.total); // 0-70
console.log(score.scores.breakdown.standalone); // 0-25
console.log(score.math_scratchpad); // Step-by-step calculation
```

### Calculate Verdict (No LLM)

```typescript
import { calculateVerdict } from './lib/modules/verdict';

const verdict = calculateVerdict(gates, score);

console.log(verdict.path); // VerdictPath enum
console.log(verdict.title); // Human-readable title
console.log(verdict.summary); // Bullet points
```

## Testing Examples

### Run Tests

```bash
npm test
```

### Run Specific Test

```bash
npm test evaluator
npm test scorer
npm test verdict
```

### Test Coverage

```bash
npm run test:coverage
```

## Example Test Briefs

### Brief 1: Standalone Product (Should PASS)

```typescript
const brief = `
Global Product Marketing: eBay Product Marketing
Date: April 2, 2026
Product Naming brief: Authentication Vault

Primary contact: pmm@ebay.com

Offering Description: eBay is introducing a secure vault storage service for authenticated luxury items. Sellers can store their authenticated products in eBay-managed facilities with insurance and 24/7 monitoring.

Value Proposition: Peace of mind for luxury sellers with physical vault storage for high-value items.

Target Customer(s): Luxury item sellers with inventory over $50k

Target Geographies: US, UK, DE

Timing: Launch Q2 2026, permanent service

Naming Request: Need a proper name for this standalone service with separate enrollment and monthly subscription.
`;

const result = await orchestrator.evaluate({ brief });
// Expected: PATH_C (Proceed with naming)
// Expected score: 65-70 (standalone + longevity + global)
```

### Brief 2: Integrated Feature (Should FAIL)

```typescript
const brief = `
Offering Description: We are adding a new sorting algorithm that automatically arranges search results by relevance. This runs in the background and users don't explicitly interact with it.

Target Customer(s): All buyers

Timing: March 2025, permanent

Naming Request: Should we name this algorithm?
`;

const result = await orchestrator.evaluate({ brief });
// Expected: PATH_A0 (Do not name - ghost feature)
// Reason: G0 fails (no user interaction)
```

### Brief 3: Short-term Campaign (Should FAIL)

```typescript
const brief = `
Offering Description: Summer promotion offering discounted shipping for sellers.

Target Customer(s): All sellers

Target Geographies: US

Timing: June-August 2026 (3 months)

Naming Request: Should we name this promotion?
`;

const result = await orchestrator.evaluate({ brief });
// Expected: PATH_A2 (No proper name - low score)
// Reason: G3 fails (< 12 months), low score (< 60)
```

### Brief 4: Missing Information (Needs Clarification)

```typescript
const brief = `
Offering Description: New feature for sellers.

Target Customer(s): Sellers

Naming Request: Should we name this?
`;

const result = await orchestrator.evaluate({ brief });
// Expected: PATH_B (Need more information)
// Expected questions: Integration level, lifespan, etc.
```

## Integration with Existing App

### Update tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

### Create React Hook

```typescript
// hooks/useNamingEvaluation.ts
import { useState } from 'react';

export function useNamingEvaluation() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const evaluate = async (brief: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/evaluate-v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      setResult(data.result);
      return data.result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { evaluate, loading, result, error };
}
```

### Use in Component

```typescript
import { useNamingEvaluation } from '@/hooks/useNamingEvaluation';

export function NamingForm() {
  const { evaluate, loading, result } = useNamingEvaluation();

  const handleSubmit = async (brief: string) => {
    const result = await evaluate(brief);
    console.log('Verdict:', result.verdict.title);
  };

  return (
    <div>
      {loading && <p>Evaluating...</p>}
      {result && (
        <div>
          <h3>{result.verdict.title}</h3>
          <pre>{result.markdown}</pre>
        </div>
      )}
    </div>
  );
}
```

## Troubleshooting

### LLM Timeout

```typescript
// Increase timeout in chomsky.ts
const response = await fetch(endpoint, {
  // ... headers
  signal: AbortSignal.timeout(120000), // 2 minutes
});
```

### Missing Fields

```typescript
import { hasMinimumFields, getMissingFields } from './lib/models/brief';

if (!hasMinimumFields(brief)) {
  const missing = getMissingFields(brief);
  console.warn('Missing required fields:', missing);
}
```

### Debug Mode

```typescript
const result = await orchestrator.evaluate({
  brief,
  config: { verbose: true },
  onProgress: (phase, message) => {
    console.log(`[DEBUG] ${phase}: ${message}`);
  },
});
```
