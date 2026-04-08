# Naming Agent - Production Implementation Plan

## Overview

Rebuilding the naming workflow as a **hybrid agent system**: LLM for semantic extraction, deterministic TypeScript for business logic.

## Architecture Decision: Hybrid > Pure Agent

**Why hybrid?**
- ✅ **Testable**: Unit test gates & scoring without LLM costs
- ✅ **Observable**: Trace every decision with structured logs
- ✅ **Maintainable**: Business rules in config, not scattered prompts
- ✅ **Reliable**: Deterministic logic prevents hallucination in critical decisions
- ✅ **Fast**: Only use LLM where semantic understanding is needed

**What uses LLM:**
1. Brief parsing (messy table → structured JSON)
2. Landscape synthesis (web research → insights)
3. Fact extraction (brief + research → tags & metadata)
4. Question generation (missing data → natural language questions)
5. Formatting (data → markdown/Slack)

**What uses TypeScript:**
1. Gate evaluation (facts → Pass/Fail/Unknown)
2. Scoring calculation (facts → 0-70 points)
3. Verdict routing (gates + score → decision path)
4. Retry logic (missing info → patch → re-evaluate)

## Project Structure

```
naming-studio/
├── lib/
│   ├── models/              # Pydantic-style Zod schemas
│   │   ├── brief.ts         # CompiledBrief, ParsedBrief
│   │   ├── landscape.ts     # LandscapeSynthesis
│   │   ├── facts.ts         # NamingFacts, score tags
│   │   ├── gates.ts         # GateEvaluation, GateResult
│   │   ├── scoring.ts       # ScoringResult, breakdowns
│   │   ├── verdict.ts       # VerdictOutput, VerdictPath
│   │   └── workflow.ts      # WorkflowState, phases
│   │
│   ├── config/
│   │   └── naming-rules.ts  # Business rules (gates, scoring, brief fields)
│   │
│   ├── modules/
│   │   ├── parser.ts        # LLM: Raw text → CompiledBrief
│   │   ├── researcher.ts    # LLM: Brief → Landscape (web search)
│   │   ├── extractor.ts     # LLM: Brief + Landscape → NamingFacts
│   │   ├── evaluator.ts     # TS: NamingFacts → GateEvaluation
│   │   ├── scorer.ts        # TS: NamingFacts → ScoringResult
│   │   ├── verdict.ts       # TS: Gates + Score → VerdictOutput
│   │   ├── questioner.ts    # LLM: GateEvaluation → Questions
│   │   └── formatter.ts     # LLM/TS: Data → Markdown/Slack
│   │
│   ├── orchestrator.ts      # State machine, main entry point
│   ├── prompts/             # Deduplicated prompt templates
│   │   ├── parse-brief.ts
│   │   ├── extract-facts.ts
│   │   ├── synthesize-landscape.ts
│   │   └── generate-questions.ts
│   │
│   ├── chomsky.ts           # ✅ Already exists
│   ├── verdict-engine.ts    # ✅ Already exists (can be replaced by modules/verdict.ts)
│   └── schemas.ts           # ✅ Already exists (can be replaced by models/)
│
├── app/api/
│   ├── evaluate/route.ts    # Main API endpoint
│   └── chat/route.ts        # Chat interface (if needed)
│
└── tests/
    ├── evaluator.test.ts    # Unit: Gate logic
    ├── scorer.test.ts       # Unit: Scoring math
    ├── verdict.test.ts      # Unit: Decision routing
    └── integration.test.ts  # E2E: Full pipeline
```

## Implementation Progress

### ✅ Phase 1: Models & Config (COMPLETE)
- [x] `lib/models/brief.ts` - Brief schemas
- [x] `lib/models/landscape.ts` - Research schemas
- [x] `lib/models/facts.ts` - Fact extraction schemas
- [x] `lib/models/gates.ts` - Gate evaluation schemas
- [x] `lib/models/scoring.ts` - Scoring schemas
- [x] `lib/models/verdict.ts` - Verdict schemas
- [x] `lib/models/workflow.ts` - Workflow state machine
- [x] `lib/config/naming-rules.ts` - Business rules config

### ✅ Phase 2: Deterministic Modules (COMPLETE)
- [x] `lib/modules/evaluator.ts` - Gate evaluation (pure TS)
- [x] `lib/modules/scorer.ts` - Scoring calculation (pure TS)
- [x] `lib/modules/verdict.ts` - Decision routing (pure TS)

### 🚧 Phase 3: LLM Modules (IN PROGRESS)
- [x] `lib/prompts/parse-brief.ts` - Brief parser prompt
- [ ] `lib/prompts/extract-facts.ts` - Fact extraction prompt
- [ ] `lib/prompts/synthesize-landscape.ts` - Research synthesis prompt
- [ ] `lib/prompts/generate-questions.ts` - Question generation prompt
- [ ] `lib/modules/parser.ts` - Brief parsing (LLM)
- [ ] `lib/modules/extractor.ts` - Fact extraction (LLM)
- [ ] `lib/modules/researcher.ts` - Landscape research (LLM + web)
- [ ] `lib/modules/questioner.ts` - Question generation (LLM)
- [ ] `lib/modules/formatter.ts` - Output formatting

### 📝 Phase 4: Orchestrator & Intake (PENDING)
- [ ] `lib/orchestrator.ts` - Main state machine
- [ ] Input validation & guardrails
- [ ] Retry/patch logic
- [ ] Checkpointing (optional)
- [ ] Error handling

### 🧪 Phase 5: Tests & Guardrails (PENDING)
- [ ] Unit tests for evaluator
- [ ] Unit tests for scorer
- [ ] Unit tests for verdict
- [ ] Integration tests
- [ ] Example test briefs
- [ ] Error recovery tests

### 📚 Phase 6: Documentation & CLI (PENDING)
- [ ] API documentation
- [ ] Usage examples
- [ ] CLI interface (optional)
- [ ] Deployment guide

## Data Flow

```
1. INTAKE
   Raw brief text/URL
   ↓
2. PARSE (LLM)
   parser.parseBrief(rawText) → CompiledBrief
   ↓
3. RESEARCH (LLM + Web)
   researcher.analyzeLandscape(brief) → LandscapeSynthesis
   ↓
4. EXTRACT (LLM)
   extractor.extractFacts(brief, landscape) → NamingFacts
   ↓
5. EVALUATE (TypeScript)
   evaluator.evaluateGates(facts) → GateEvaluation
   ↓
6. SCORE (TypeScript)
   scorer.calculateScore(facts) → ScoringResult
   ↓
7. DECIDE (TypeScript)
   verdict.calculateVerdict(gates, score) → VerdictOutput
   ↓
8. CHECK (TypeScript)
   If verdict.path === PATH_B:
     questioner.generateQuestions(gates) → Questions
     [Wait for user input]
     patcher.mergePatchedData(facts, userInput) → UpdatedFacts
     [Re-run from step 5]
   ↓
9. FORMAT
   formatter.toMarkdown(verdict) → Markdown
   formatter.toSlack(verdict) → Slack payload
```

## Brittle Points Addressed

| Original Issue | Solution |
|----------------|----------|
| Massive prompt duplication (steps 33/34, 53/83, 57/86) | Single prompt per module in `lib/prompts/` |
| Fragile text parsing ("messy table" heuristics) | Zod schema validation + LLM extraction with fallbacks |
| Implicit state passing ("Memory references") | Explicit function parameters with TypeScript types |
| String-based routing (`[PATH_A0]` tokens) | Enum-based VerdictPath |
| Retry path duplicates entire pipeline (79-115) | Shared evaluator/scorer modules, orchestrator handles retry |
| No input validation | Zod schemas + `hasMinimumFields()` guard |
| Hard-coded rules in prompts | `naming-rules.ts` config file |
| No rollback on failure | Workflow state checkpointing |
| No observability | Structured logging + audit trails |
| Assumption-heavy defaults | Explicit "Unknown" states |

## Next Steps

1. **Complete Phase 3**: Build remaining LLM modules (parser, extractor, researcher, questioner, formatter)
2. **Build Phase 4**: Orchestrator state machine
3. **Add Phase 5**: Comprehensive test suite
4. **Document Phase 6**: Usage guides and examples

## Migration Path

**Option A: Gradual Migration** (Recommended)
1. Keep existing `app/page.tsx` UI
2. Replace `lib/verdict-engine.ts` with `lib/modules/verdict.ts`
3. Add new modules alongside existing code
4. Create new API endpoint `/api/evaluate-v2`
5. A/B test both pipelines
6. Deprecate old pipeline after validation

**Option B: Clean Slate**
1. Build complete new system in parallel
2. Thorough testing with example briefs
3. Switch over all at once
4. Remove old code

**Recommended: Option A** for safer rollout and validation.
