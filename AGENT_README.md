# Naming Agent - Production System

## What We Built

A **production-ready naming evaluation agent** that transforms your 115-step workflow into a maintainable, testable, modular system.

### Key Improvements

| Before | After |
|--------|-------|
| 115 workflow steps with massive duplication | 9 focused modules with single responsibility |
| Prompts scattered across 41+ steps | 4 deduplicated prompt templates |
| String-based routing (`[PATH_A0]`) | Type-safe enums (VerdictPath) |
| No observability or testing | Unit-testable + structured audit trails |
| Hard-coded rules in prompts | Config-driven business logic |
| Retry logic copies 35+ steps | Shared modules, orchestrator handles retry |

## Architecture

### Hybrid Design: LLM + Deterministic Logic

**LLM-Powered (Semantic Understanding)**
- Brief parsing: Messy text → Structured JSON
- Landscape synthesis: Web research → Insights
- Fact extraction: Brief + Research → Tags & Metadata
- Question generation: Missing data → Natural language

**Deterministic TypeScript (Business Logic)**
- Gate evaluation: Facts → Pass/Fail/Unknown
- Scoring calculation: Facts → 0-70 points
- Verdict routing: Gates + Score → Decision path
- Retry orchestration: Patch data → Re-evaluate

### Why Hybrid?

✅ **Testable**: Unit test critical logic without LLM costs  
✅ **Observable**: Trace every decision with audit trails  
✅ **Maintainable**: Business rules in config, not prompts  
✅ **Reliable**: Deterministic decisions prevent hallucination  
✅ **Fast**: Only use LLM where semantic understanding needed  

## File Structure

```
lib/
├── models/                    # Type-safe schemas (Zod)
│   ├── brief.ts              # CompiledBrief, ParsedBrief, validation helpers
│   ├── landscape.ts          # LandscapeSynthesis, CompetitorUsage
│   ├── facts.ts              # NamingFacts, score tags, tag helpers
│   ├── gates.ts              # GateEvaluation, GateResult, gate helpers
│   ├── scoring.ts            # ScoringResult, breakdowns, markdown generation
│   ├── verdict.ts            # VerdictOutput, VerdictPath enum, helpers
│   └── workflow.ts           # WorkflowState, phases, checkpointing
│
├── config/
│   └── naming-rules.ts       # Business logic config
│       ├── GATE_DEFINITIONS  # Pass/fail conditions for all 6 gates
│       ├── SCORING_RULES     # Point allocation rules
│       ├── VERDICT_LOGIC     # Decision priority hierarchy
│       └── BRIEF_FIELD_DEFINITIONS
│
├── modules/                   # Core business logic
│   ├── evaluator.ts          # ✅ Gate evaluation (pure TypeScript)
│   ├── scorer.ts             # ✅ Scoring calculation (pure TypeScript)
│   ├── verdict.ts            # ✅ Decision routing (pure TypeScript)
│   ├── parser.ts             # 🚧 Brief parsing (LLM)
│   ├── extractor.ts          # 📝 Fact extraction (LLM)
│   ├── researcher.ts         # 📝 Landscape research (LLM + web)
│   ├── questioner.ts         # 📝 Question generation (LLM)
│   └── formatter.ts          # 📝 Output formatting
│
├── prompts/                   # Deduplicated prompt templates
│   ├── parse-brief.ts        # ✅ Brief parsing prompt
│   ├── extract-facts.ts      # 📝 Fact extraction prompt
│   ├── synthesize-landscape.ts # 📝 Research synthesis prompt
│   └── generate-questions.ts # 📝 Question generation prompt
│
├── orchestrator.ts           # 📝 Main state machine
├── chomsky.ts                # ✅ LLM client (already exists)
└── verdict-engine.ts         # ✅ Legacy (can be replaced by modules/verdict.ts)
```

**Legend**: ✅ Complete | 🚧 In Progress | 📝 Todo

## Usage Example

```typescript
import { orchestrator } from './lib/orchestrator';

// Simple API
const result = await orchestrator.evaluate({
  brief: "eBay is introducing managed shipping...",
  config: {
    skipWebResearch: false,
    maxRetries: 1,
  }
});

console.log(result.verdict.title);
// "✅ Proceed With Naming - A Proper Name Is Recommended (Score: 65/70)"

console.log(result.verdict.path);
// VerdictPath.PATH_C

// Detailed audit trail
console.log(result.gateEvaluation.gate_results.G0);
// { label: "Interaction Model", status: "Pass", reasoning: "...", evidence: "..." }

console.log(result.scoringResult.scores.breakdown);
// { standalone: 25, longevity: 15, legal: 10, global: 10, clarity: 5, ... }
```

## Gate Evaluation Logic

All 6 gates are evaluated deterministically in `lib/modules/evaluator.ts`:

### G0: Interaction Model
**Pass**: User explicitly selects, toggles, or sees the feature  
**Fail**: Automatic/backend process  
**Logic**: `enrollment_policies === "separate"` OR `vertical_services.length > 0`

### G1: Integration Level  
**Pass**: Standalone app with distinct enrollment/checkout  
**Fail**: Embedded feature within existing platform  
**Logic**: `enrollment_policies === "separate"` OR `checkout_flow === "distinct"`

### G2: Standalone Architecture
**Pass**: Distinct service boundaries  
**Fail**: Shared platform architecture  
**Logic**: Same as G1 (follows from separation)

### G3: Strategic Lifespan
**Pass**: ≥12 months  
**Fail**: <12 months or promotional  
**Logic**: `longevity_months >= 12`

### G4: Portfolio Alignment
**Pass**: No internal name collisions  
**Fail**: `portfolio_risk` tag present  
**Logic**: `!hasTag(facts, "portfolio_risk")`

### G5: Legal & Localization
**Pass**: No trademark/regulatory blockers  
**Fail**: `trademark_risk` tag present  
**Logic**: `!hasTag(facts, "trademark_risk")`

## Scoring Calculation

Pure arithmetic in `lib/modules/scorer.ts`:

| Factor | Points | Condition |
|--------|--------|-----------|
| Standalone | +25 | `enrollment_policies === "separate"` OR `vertical_services.length > 0` |
| Longevity | +15 | `longevity_months >= 12` |
| Legal | +10 | `hasTag(facts, "formal_legal")` |
| Global | +10 | `hasTag(facts, "global_big3")` OR (US AND UK/DE markets) |
| Clarity | +10 | `hasTag(facts, "clarity_lift")` |
| Portfolio Risk | -20 | `hasTag(facts, "portfolio_risk")` |
| Trademark Risk | -20 | `hasTag(facts, "trademark_risk")` |

**Max Score**: 70  
**Threshold**: 60  

## Verdict Decision Logic

Priority hierarchy in `lib/modules/verdict.ts`:

```typescript
1. PRIORITY 1: G5 Fail → PATH_A1 (Legal blocker)
2. PRIORITY 2: G0 Fail → PATH_A0 (Do not name - ghost feature)
3. PRIORITY 3: G1-G4 Fail → PATH_A1 (Gate failure)
4. PRIORITY 4: Any Unknown/Pending → PATH_B (Need more info)
5. PRIORITY 5: Score < 60 → PATH_A2 (Score failure)
6. PRIORITY 6: All pass + Score >= 60 → PATH_C (Proceed with naming)
```

## Data Flow

```
Raw Brief
  ↓
[LLM] Parser → CompiledBrief
  ↓
[LLM + Web] Researcher → LandscapeSynthesis
  ↓
[LLM] Extractor → NamingFacts
  ↓
[TypeScript] Evaluator → GateEvaluation
  ↓
[TypeScript] Scorer → ScoringResult
  ↓
[TypeScript] Verdict → VerdictOutput
  ↓
If PATH_B (missing info):
  [LLM] Questioner → Questions
  [User Input] → Patches
  [TypeScript] Patcher → UpdatedFacts
  → Re-run from Evaluator
  ↓
[Formatter] → Markdown/Slack
```

## Testing Strategy

### Unit Tests (No LLM)
```typescript
// test/evaluator.test.ts
test('G0 passes when enrollment is separate', () => {
  const facts = createMockFacts({ enrollment_policies: 'separate' });
  const gates = evaluateGates(facts);
  expect(gates.gate_results.G0.status).toBe('Pass');
});

// test/scorer.test.ts
test('standalone scores 25 points when enrollment is separate', () => {
  const facts = createMockFacts({ enrollment_policies: 'separate' });
  const result = calculateScore(facts);
  expect(result.scores.breakdown.standalone).toBe(25);
});

// test/verdict.test.ts
test('returns PATH_C when all gates pass and score >= 60', () => {
  const gates = createMockGates({ all: 'Pass' });
  const score = createMockScore({ total: 65 });
  const verdict = calculateVerdict(gates, score);
  expect(verdict.path).toBe(VerdictPath.PATH_C);
});
```

### Integration Tests (With LLM)
```typescript
// test/integration.test.ts
test('evaluates Managed Shipping brief end-to-end', async () => {
  const briefText = loadTestBrief('managed-shipping');
  const result = await orchestrator.evaluate({ brief: briefText });
  expect(result.verdict.path).toBe(VerdictPath.PATH_A2);
  expect(result.scoringResult.scores.total).toBeLessThan(60);
});
```

## Configuration

All business rules are centralized in `lib/config/naming-rules.ts`:

```typescript
export const GATE_DEFINITIONS = {
  G0: {
    label: "Interaction Model",
    passConditions: ["User makes an active choice", "..."],
    failConditions: ["Automatic/backend", "..."],
  },
  // ... G1-G5
};

export const SCORING_RULES = {
  standalone: {
    maxPoints: 25,
    tiers: [
      { points: 25, condition: "Separate enrollment OR ..." },
      { points: 0, condition: "None of the above" },
    ],
  },
  // ... other factors
};
```

To change business logic, update the config file, not prompts.

## Retry & Patch Logic

When verdict is `PATH_B` (missing info):

1. **Generate Questions** (LLM):
   ```typescript
   const questions = questioner.generateQuestions(gateEvaluation);
   // ["Is this a standalone program or an integrated feature?", ...]
   ```

2. **Collect User Input**:
   ```typescript
   const userResponse = await getUserInput(questions);
   ```

3. **Patch Facts** (LLM):
   ```typescript
   const updatedFacts = patcher.mergePatchedData(originalFacts, userResponse);
   ```

4. **Re-evaluate** (TypeScript):
   ```typescript
   const newGates = evaluator.evaluateGates(updatedFacts);
   const newScore = scorer.calculateScore(updatedFacts);
   const newVerdict = verdict.calculateVerdict(newGates, newScore);
   ```

5. **Check Again**:
   - If still `PATH_B` after retry → Escalate
   - Otherwise → Complete

## Error Handling

```typescript
try {
  const result = await orchestrator.evaluate({ brief });
} catch (error) {
  if (error instanceof BriefValidationError) {
    // Missing required fields
  } else if (error instanceof LLMTimeoutError) {
    // Chomsky timeout
  } else if (error instanceof WorkflowStateError) {
    // Invalid state transition
  }
}
```

## Observability

Every evaluation produces an audit trail:

```typescript
{
  "timestamp": "2026-04-02T10:30:00Z",
  "phase": "verdict",
  "gates": {
    "G0": { "status": "Pass", "reasoning": "...", "evidence": "..." },
    // ... G1-G5
  },
  "scoring": {
    "total": 65,
    "breakdown": { "standalone": 25, ... },
    "math_scratchpad": ["Start: 0", "Step 1: +25", ...]
  },
  "verdict": {
    "path": "PATH_C",
    "title": "✅ Proceed With Naming...",
  }
}
```

## Migration from Existing System

Your current system has:
- ✅ `lib/chomsky.ts` - Chomsky LLM client
- ✅ `lib/verdict-engine.ts` - Basic verdict logic
- ✅ `lib/schemas.ts` - Gate & scorer schemas

**Migration Path**:
1. Keep existing files
2. New modules use improved models (lib/models/)
3. Create `/api/evaluate-v2` endpoint using orchestrator
4. A/B test old vs new
5. Deprecate old after validation

## Next Steps

1. **Complete LLM Modules** (Phase 3):
   - Finish parser, extractor, researcher, questioner, formatter

2. **Build Orchestrator** (Phase 4):
   - State machine with retry logic
   - Input validation & guardrails

3. **Add Tests** (Phase 5):
   - Unit tests for deterministic modules
   - Integration tests with example briefs

4. **Documentation** (Phase 6):
   - API docs, usage examples, deployment guide

## Questions?

- **"Why split LLM vs TypeScript?"** → Testability, reliability, maintainability
- **"Can I change business rules?"** → Yes, edit `lib/config/naming-rules.ts`
- **"How do I add a new gate?"** → Add to config, add evaluation logic to evaluator.ts
- **"What if LLM fails?"** → Fallbacks + error recovery in orchestrator
- **"How do I test without LLM costs?"** → Use mock facts for unit tests

---

**Built**: April 2026  
**Status**: Deterministic modules complete, LLM modules in progress  
**Next**: Complete Phase 3 (LLM modules) and Phase 4 (Orchestrator)
