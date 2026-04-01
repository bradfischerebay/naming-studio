# QA Action Plan
## Priority-Ordered Task List for Development Team

**Generated:** 2026-04-01  
**Based on:** QA Final Report  
**Status:** Ready for Implementation

---

## Critical Priority (Complete ASAP)

### None - All critical issues were already fixed by other agents ✅

Previous critical issues resolved:
- ✅ File upload handler fixed
- ✅ Dependencies added to package.json

---

## High Priority (Before Production)

### Task #1: Add File Size Validation
**Estimated Time:** 30 minutes  
**Complexity:** Low  
**File:** `/app/api/upload/route.ts`

**Implementation:**
```typescript
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // ADD THIS CHECK
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const fileType = file.type;
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // ... rest of existing code
  }
}
```

**Testing:**
- Upload a file larger than 10MB
- Verify error message appears
- Verify smaller files still work

---

### Task #2: Add Unit Tests for Verdict Engine
**Estimated Time:** 2-3 hours  
**Complexity:** Medium  
**Files to Create:** `/tests/unit/verdict-engine.test.ts`

**Implementation:**
```typescript
import { describe, it, expect } from 'vitest';
import { calculateVerdict } from '@/lib/verdict-engine';
import type { GatekeeperResult, ScorerResult } from '@/lib/schemas';

describe('Verdict Engine', () => {
  describe('Rule 1: G0 Fail', () => {
    it('should return "Do Not Name" when G0 fails', () => {
      const gatekeeperResult: GatekeeperResult = {
        G0: { status: 'Fail', reasoning: 'Test' },
        G1: { status: 'Pass', reasoning: 'Test' },
        G2: { status: 'Pass', reasoning: 'Test' },
        G3: { status: 'Pass', reasoning: 'Test' },
        G4: { status: 'Pass', reasoning: 'Test' },
        G5: { status: 'Pass', reasoning: 'Test' },
      };

      const verdict = calculateVerdict(gatekeeperResult);
      expect(verdict).toBe('🚫 Do Not Name - Use Inline Action Copy');
    });
  });

  describe('Rule 2: Pending or Unknown', () => {
    it('should return "Need More Information" when any gate is Pending', () => {
      const gatekeeperResult: GatekeeperResult = {
        G0: { status: 'Pass', reasoning: 'Test' },
        G1: { status: 'Pending', reasoning: 'Test' },
        G2: { status: 'Pass', reasoning: 'Test' },
        G3: { status: 'Pass', reasoning: 'Test' },
        G4: { status: 'Pass', reasoning: 'Test' },
        G5: { status: 'Pass', reasoning: 'Test' },
      };

      const verdict = calculateVerdict(gatekeeperResult);
      expect(verdict).toBe('⚠️ Need More Information - Decision Deferred');
    });
  });

  describe('Rule 3: G1-G5 Fail', () => {
    it('should return "No Proper Name Needed" when G1 fails', () => {
      const gatekeeperResult: GatekeeperResult = {
        G0: { status: 'Pass', reasoning: 'Test' },
        G1: { status: 'Fail', reasoning: 'Test' },
        G2: { status: 'Pass', reasoning: 'Test' },
        G3: { status: 'Pass', reasoning: 'Test' },
        G4: { status: 'Pass', reasoning: 'Test' },
        G5: { status: 'Pass', reasoning: 'Test' },
      };

      const verdict = calculateVerdict(gatekeeperResult);
      expect(verdict).toBe('❌ No Proper Name Needed - Use A Descriptive Label');
    });
  });

  describe('Rule 4: All Pass, Score < 60', () => {
    it('should return "No Proper Name Needed" when score is below threshold', () => {
      const gatekeeperResult: GatekeeperResult = {
        G0: { status: 'Pass', reasoning: 'Test' },
        G1: { status: 'Pass', reasoning: 'Test' },
        G2: { status: 'Pass', reasoning: 'Test' },
        G3: { status: 'Pass', reasoning: 'Test' },
        G4: { status: 'Pass', reasoning: 'Test' },
        G5: { status: 'Pass', reasoning: 'Test' },
      };

      const scorerResult: ScorerResult = {
        standalone: 15,
        longevity: 15,
        legal: 10,
        global: 10,
        clarity: 0, // Total = 50
        reasoning: 'Test reasoning',
      };

      const verdict = calculateVerdict(gatekeeperResult, scorerResult);
      expect(verdict).toContain('❌ No Proper Name Needed');
      expect(verdict).toContain('50/70');
    });
  });

  describe('Rule 5: All Pass, Score >= 60', () => {
    it('should return "Proceed With Naming" when score meets threshold', () => {
      const gatekeeperResult: GatekeeperResult = {
        G0: { status: 'Pass', reasoning: 'Test' },
        G1: { status: 'Pass', reasoning: 'Test' },
        G2: { status: 'Pass', reasoning: 'Test' },
        G3: { status: 'Pass', reasoning: 'Test' },
        G4: { status: 'Pass', reasoning: 'Test' },
        G5: { status: 'Pass', reasoning: 'Test' },
      };

      const scorerResult: ScorerResult = {
        standalone: 25,
        longevity: 15,
        legal: 10,
        global: 10,
        clarity: 10, // Total = 70
        reasoning: 'Test reasoning',
      };

      const verdict = calculateVerdict(gatekeeperResult, scorerResult);
      expect(verdict).toContain('✅ Proceed With Naming');
      expect(verdict).toContain('70/70');
    });
  });
});
```

**Setup Required:**
1. Install Vitest: `npm install -D vitest`
2. Update `package.json`:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui"
     }
   }
   ```
3. Create `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';
   import path from 'path';

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './'),
       },
     },
   });
   ```

**Testing:**
- Run `npm test`
- Verify all tests pass
- Check code coverage

---

### Task #3: Add Integration Tests for API Routes
**Estimated Time:** 3-4 hours  
**Complexity:** Medium  
**Files to Create:** `/tests/integration/api-evaluate.test.ts`

**Implementation:**
```typescript
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('POST /api/evaluate', () => {
  it('should return 400 for empty brief', async () => {
    const response = await fetch('http://localhost:3000/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: '' }),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data.error).toContain('Brief text is required');
  });

  it('should return valid evaluation for valid brief', async () => {
    const testBrief = 'Product: Test\nDescription: Test description...';
    
    const response = await fetch('http://localhost:3000/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: testBrief }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    
    expect(data).toHaveProperty('verdict');
    expect(data).toHaveProperty('gatekeeperResult');
    expect(data.gatekeeperResult).toHaveProperty('G0');
    expect(data.gatekeeperResult).toHaveProperty('G1');
    expect(data.gatekeeperResult).toHaveProperty('G2');
    expect(data.gatekeeperResult).toHaveProperty('G3');
    expect(data.gatekeeperResult).toHaveProperty('G4');
    expect(data.gatekeeperResult).toHaveProperty('G5');
  });
});
```

**Note:** These tests require the dev server to be running

---

### Task #4: Add Rate Limiting
**Estimated Time:** 1-2 hours  
**Complexity:** Medium  
**Files to Create:** `/lib/rate-limiter.ts`

**Implementation:**
```typescript
import { NextRequest, NextResponse } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export function rateLimit(limit: number, windowMs: number) {
  return async (req: NextRequest): Promise<NextResponse | null> => {
    const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown';
    const key = `${ip}:${req.url}`;
    const now = Date.now();

    // Clean up old entries
    if (store[key] && now > store[key].resetTime) {
      delete store[key];
    }

    // Initialize or increment
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return null; // Allow request
    }

    store[key].count++;

    if (store[key].count > limit) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    return null; // Allow request
  };
}
```

**Usage in API Routes:**
```typescript
import { rateLimit } from '@/lib/rate-limiter';

const limiter = rateLimit(10, 60 * 1000); // 10 requests per minute

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limiter(req);
  if (rateLimitResponse) return rateLimitResponse;

  // ... rest of your handler
}
```

---

## Medium Priority (Next Sprint)

### Task #5: Add E2E Tests with Playwright
**Estimated Time:** 4-6 hours  
**Complexity:** High

**Setup:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Create:** `/tests/e2e/single-run-studio.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Single Run Studio', () => {
  test('should evaluate a brief successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const brief = `Product: Test Product
Description: Test description
Integration: Separate app
Architecture: Dedicated backend
Timeline: 24 months
Portfolio: No conflicts
Legal: No issues`;

    await page.fill('textarea', brief);
    await page.click('button:has-text("Evaluate Brief")');
    
    await expect(page.locator('text=Final Verdict')).toBeVisible({ timeout: 60000 });
    await expect(page.locator('table')).toBeVisible();
  });
});
```

---

### Task #6: Extract Magic Numbers to Constants
**Estimated Time:** 1 hour  
**Complexity:** Low

**Create:** `/lib/constants.ts`
```typescript
export const NAMING_THRESHOLD = 60;
export const MAX_TOTAL_SCORE = 70;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const TOKEN_CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export const SCORING = {
  STANDALONE_MAX: 25,
  LONGEVITY_MAX: 15,
  LEGAL_MAX: 10,
  GLOBAL_MAX: 10,
  CLARITY_MAX: 10,
} as const;
```

**Update:** `/lib/verdict-engine.ts`
```typescript
import { NAMING_THRESHOLD } from './constants';

// Replace hardcoded 60 with NAMING_THRESHOLD
if (totalScore < NAMING_THRESHOLD) {
  return `❌ No Proper Name Needed - Use A Descriptive Label (Score: ${totalScore}/${MAX_TOTAL_SCORE})`;
}
```

---

### Task #7: Add Error Tracking (Sentry)
**Estimated Time:** 2 hours  
**Complexity:** Medium

**Setup:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**Configure:** Follow Sentry wizard prompts

---

## Low Priority (Future Enhancements)

### Task #8: Add Conversation History to Brand Coach
**Estimated Time:** 3-4 hours  
**Complexity:** Medium

**Changes Required:**
- Store chat history in component state
- Pass full conversation to chat API
- Update API to maintain context across turns

---

### Task #9: Add Parallel Processing Option in Eval Lab
**Estimated Time:** 2-3 hours  
**Complexity:** Medium

**Changes Required:**
- Add toggle for sequential vs parallel
- Use Promise.all() for parallel processing
- Handle errors gracefully in parallel mode

---

### Task #10: Add Streaming LLM Responses
**Estimated Time:** 4-6 hours  
**Complexity:** High

**Changes Required:**
- Update Chomsky client to support streaming
- Modify API routes to use ReadableStream
- Update frontend to handle streaming responses

---

## Testing Checklist

After implementing each task:

- [ ] Task #1: File Size Validation
  - [ ] Manual test with large file
  - [ ] Verify error message
  - [ ] Test edge cases (exactly 10MB)

- [ ] Task #2: Unit Tests
  - [ ] All tests pass (`npm test`)
  - [ ] Code coverage > 80%
  - [ ] CI/CD integration

- [ ] Task #3: Integration Tests
  - [ ] All API endpoints tested
  - [ ] Tests pass in CI/CD
  - [ ] Error cases covered

- [ ] Task #4: Rate Limiting
  - [ ] Test rapid requests
  - [ ] Verify 429 status code
  - [ ] Check rate limit headers

---

## Success Criteria

### Definition of Done

For each task:
1. ✅ Code implemented and committed
2. ✅ Tests written and passing
3. ✅ Code reviewed by team member
4. ✅ Documentation updated
5. ✅ Deployed to staging environment
6. ✅ QA verified in staging
7. ✅ Product owner approved

### Metrics to Track

- **Test Coverage:** Target 80%+
- **Performance:** API response times < targets
- **Error Rate:** < 1% of requests
- **User Satisfaction:** > 4/5 stars

---

## Timeline Estimate

### High Priority Tasks (Week 1)
- Day 1: Task #1 (File Size Validation)
- Day 2-3: Task #2 (Unit Tests)
- Day 4-5: Task #3 (Integration Tests)

### High Priority Tasks (Week 2)
- Day 1-2: Task #4 (Rate Limiting)
- Day 3-5: Testing and bug fixes

### Medium Priority (Week 3-4)
- Week 3: Tasks #5-7
- Week 4: Testing and refinement

### Low Priority (Backlog)
- Schedule for future sprints based on priorities

---

## Resources Needed

### Tools & Services
- Vitest (testing framework)
- Playwright (E2E testing)
- Sentry (error tracking)
- CI/CD pipeline (GitHub Actions or similar)

### Team Members
- 1 Backend Developer (API improvements)
- 1 Frontend Developer (UI enhancements)
- 1 QA Engineer (testing)
- 1 DevOps Engineer (CI/CD setup)

---

## Risk Assessment

| Task | Risk Level | Mitigation |
|------|------------|------------|
| File Size Validation | Low | Simple implementation |
| Unit Tests | Low | Well-defined test cases |
| Integration Tests | Medium | Requires running server |
| Rate Limiting | Medium | Test thoroughly to avoid false positives |
| E2E Tests | High | Can be flaky, need retry logic |

---

## Questions for Product Team

1. **File Size Limit:** Is 10MB appropriate, or should it be different?
2. **Rate Limiting:** What limits are acceptable for production?
3. **Error Tracking:** Do we have a Sentry account/project?
4. **Testing Coverage:** What's the minimum acceptable coverage?
5. **Timeline:** Any hard deadlines for production deployment?

---

## Success Metrics

After implementing all high-priority tasks:

**Expected Outcomes:**
- ✅ 0 critical bugs
- ✅ 80%+ test coverage
- ✅ < 1% error rate
- ✅ Production-ready codebase
- ✅ Comprehensive documentation

---

## Next Steps

1. **Review this plan** with development team
2. **Prioritize tasks** based on business needs
3. **Assign owners** for each task
4. **Create tickets** in project management tool
5. **Start sprint planning** for Week 1 tasks

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-01  
**Owner:** QA Team  
**Status:** Ready for Implementation
