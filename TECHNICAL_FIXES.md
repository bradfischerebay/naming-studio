# Technical Fixes - Naming Agent

## Summary

Fixed 3 technical gaps in the naming agent to align with the original workflow specification.

## Gap 1: Escalation Output Format

**Location:** `/Users/bradfischer/naming-studio/lib/orchestrator.ts` and `/Users/bradfischer/naming-studio/lib/modules/formatter.ts`

**Issue:** When retry fails (still PATH_B after user clarification), the system needed a specialized escalation output format instead of the standard output.

**Fix Implemented:**

1. Added `formatAsEscalation()` function to `formatter.ts` (lines 162-224)
   - Generates user-friendly escalation output with conversational tone
   - Shows "What I tried" section with attempt history
   - Includes quoted user clarification
   - Explains "Why I'm still stuck" with remaining gaps
   - Lists "What I know so far" from the brief
   - Shows current gate evaluation with status emojis
   - Provides actionable "Next steps" recommendation

2. Updated `orchestrator.ts` `evaluateWithClarification()` (lines 197-220)
   - Detects when still PATH_B after retry and retry limit is reached
   - Automatically switches to escalation format instead of standard markdown
   - Extracts pending gates to show remaining gaps

**Test Coverage:**
- `tests/formatter.test.ts` - 2 test cases for escalation formatting
- Verifies all required sections are present
- Confirms gate evidence is included when available

---

## Gap 2: Portfolio Risk Exception

**Location:** `/Users/bradfischer/naming-studio/lib/modules/researcher.ts` and `/Users/bradfischer/naming-studio/lib/prompts/synthesize-landscape.ts`

**Issue:** Should set `portfolio_risk` tag when exact matches are found, BUT remove it if the brief indicates the product is "replacing", "migrating", "sunsetting", or the "next generation" of the existing match.

**Fix Implemented:**

1. Updated `synthesize-landscape.ts` prompt (line 22)
   - Added PORTFOLIO RISK EXCEPTION rule to the landscape synthesis instructions
   - Instructs the LLM to NOT flag exact matches when replacement keywords are detected
   - Aligned with steps 537-539 of original workflow

2. Updated `extract-facts.ts` prompt (already had the exception at line 19)
   - Confirmed the exception rule was already present in fact extraction
   - Ensures consistency across both stages

3. Added `isReplacementScenario()` function to `researcher.ts` (lines 100-120)
   - Checks brief for replacement keywords: "replacing", "migrating", "sunsetting", "next generation", "migration from", "replaces", "sunset"
   - Case-insensitive detection
   - Searches across multiple brief fields (offering_description, value_proposition, benefits, naming_request)

**Test Coverage:**
- `tests/researcher.test.ts` - 12 test cases for replacement scenario detection
- Tests all replacement keywords
- Verifies case-insensitivity
- Confirms multi-field checking
- Tests edge cases (undefined fields, no keywords)

---

## Gap 3: G2 Default Inference

**Location:** `/Users/bradfischer/naming-studio/lib/modules/evaluator.ts`

**Issue:** G2 (Standalone Architecture) should ASSUME FAIL if G1 (Integration Level) failed and G2 has no architecture data.

**Fix Implemented:**

1. Updated `evaluateG2()` function signature (line 132)
   - Now accepts `g1Result: GateResult` as second parameter
   - Enables cross-gate logic dependencies

2. Updated `evaluateGates()` to pass G1 result to G2 (line 19)
   - Changed: `const g2 = evaluateG2(facts, g1);`

3. Added default inference logic to `evaluateG2()` (lines 157-163)
   - After explicit PASS and FAIL checks
   - Before returning UNKNOWN
   - If G1.status === "Fail" and no architecture data → G2 returns Fail
   - Reasoning: "Architecture assumed to be integrated based on G1 failure"
   - Evidence: "G1 (Integration Level) failed; lacking separate architecture indicators"

**Test Coverage:**
- `tests/evaluator.test.ts` - Added 6 test cases for G2 evaluation
- Tests explicit PASS (separate enrollment)
- Tests explicit FAIL (shared enrollment)
- Tests default inference when G1 fails
- Tests UNKNOWN when G1 doesn't fail and no data

---

## Files Modified

### Core Implementation
- `/Users/bradfischer/naming-studio/lib/orchestrator.ts`
- `/Users/bradfischer/naming-studio/lib/modules/formatter.ts`
- `/Users/bradfischer/naming-studio/lib/modules/researcher.ts`
- `/Users/bradfischer/naming-studio/lib/modules/evaluator.ts`
- `/Users/bradfischer/naming-studio/lib/prompts/synthesize-landscape.ts`

### Test Files
- `/Users/bradfischer/naming-studio/tests/evaluator.test.ts` (updated)
- `/Users/bradfischer/naming-studio/tests/formatter.test.ts` (new)
- `/Users/bradfischer/naming-studio/tests/researcher.test.ts` (new)

---

## Test Results

All tests pass:
```
Test Files  3 passed (3)
Tests       29 passed (29)
```

Test breakdown:
- Gate Evaluator: 15 tests (including 6 new G2 tests)
- Formatter: 2 tests (new)
- Researcher: 12 tests (new)

---

## Alignment with Original Workflow

All fixes align with the original workflow specification in `Naming-Flow-with-prompts.md`:

1. **Escalation Format** - Lines 1738-1765: Exact format match for escalated assessments
2. **Portfolio Risk Exception** - Lines 537-539: EXCEPTION rule for replacement scenarios
3. **G2 Default Inference** - Lines 610-615: DEFAULT logic when G1 fails and G2 lacks data

---

## Next Steps

The naming agent now correctly handles:
- ✅ Escalation output when retry fails
- ✅ Portfolio risk exceptions for replacement scenarios
- ✅ G2 default inference based on G1 results

All three technical gaps have been addressed and verified with comprehensive test coverage.
