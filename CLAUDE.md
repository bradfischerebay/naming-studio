# Naming Studio - Developer Guide

**eBay AI Naming Studio & Eval Lab** - Internal governance application for evaluating product naming briefs using a hybrid agent system with eBay's Chomsky LLM gateway.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Agent Dispatch Protocol](#agent-dispatch-protocol)
3. [Project Architecture](#project-architecture)
4. [Technology Stack](#technology-stack)
5. [Development Setup](#development-setup)
6. [Testing Guide](#testing-guide)
7. [API Reference](#api-reference)
8. [Model Selection](#model-selection)
9. [Configuration](#configuration)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites
- Node.js 18+
- eBay VPN connection (required for Chomsky gateway access)
- Access to eBay's internal infrastructure

### Installation & Run

```bash
cd ~/naming-studio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Run Tests

```bash
npm test                  # Run all tests
npm run test:ui          # Interactive test UI
npm run test:coverage    # Coverage report
```

---

## Codebase Navigation — Read This First

This section teaches the dependency direction, the orchestrator's role, and how to trace impact before editing. Read it before touching any `lib/` file.

### Dependency Direction

Dependencies always flow **downward**. Nothing in a lower layer imports from a layer above it.

```
lib/models/         ← foundational types — no internal imports
lib/config/         ← business rules (GATE_DEFINITIONS, SCORING_RULES, VERDICT_LOGIC)
lib/prompts/        ← LLM prompt templates — imported by matching modules
lib/modules/        ← pipeline logic — imports models + config + prompts + chomsky
lib/orchestrator.ts ← wires all 8 pipeline modules together
app/api/            ← API routes — import orchestrator OR individual modules
app/**/page.tsx     ← UI pages — HTTP fetch() to API routes only, no lib imports
```

**If you find yourself importing upward (e.g., a module importing from an API route), that is a bug.**

### Orchestrator: The Hidden Hub

`lib/orchestrator.ts` is the full evaluation pipeline in one place. It imports 21 internal files — all 8 pipeline modules, all 7 model types, and the Chomsky client. This is the most connected file in the codebase.

**Only ONE production API route calls it:**

```
app/api/evaluate-v2/route.ts  →  lib/orchestrator.ts  →  (all 8 pipeline modules)
```

Editing any `lib/modules/` file means the change flows through the orchestrator to `evaluate-v2`. That is the blast radius for most module edits.

### Which Route Calls What

| Route | What it calls | Notes |
|---|---|---|
| `app/api/evaluate-v2/route.ts` | `lib/orchestrator.ts` | Full pipeline — only production eval route |
| `app/api/lab/evaluate/route.ts` | `lib/modules/gate-agents.ts` | Streaming Lab — bypasses orchestrator entirely |
| `app/api/evaluate/route.ts` | `lib/chomsky.ts` directly | **Legacy route** — do not extend |
| `app/api/chat/route.ts` | `lib/chomsky.ts` directly | Coaching + knowledge mode |
| `app/api/classify/route.ts` | `lib/chomsky.ts` directly | Intent classifier |
| `app/api/check-names/route.ts` | `lib/modules/name-checker.ts` | Name availability checking |
| `app/api/lab/save/route.ts` | `lib/lab-storage.ts` | Persists Lab runs to Redis |
| `app/api/lab/runs/route.ts` | `lib/lab-storage.ts` | Fetches Lab run history |
| `app/api/analytics/route.ts` | `lib/analytics.ts` | Analytics tracking |

**The Lab page and the main chat page use entirely separate code paths.** Changes to gate evaluation modules affect `evaluate-v2`; changes to `gate-agents.ts` affect the Lab.

### The Critical Pipeline (inside orchestrator)

```
parseBrief()        lib/modules/parser.ts       🤖 LLM
analyzeLandscape()  lib/modules/researcher.ts   🤖 LLM
extractFacts()      lib/modules/extractor.ts    🤖 LLM
    ↓
evaluateGates()     lib/modules/evaluator.ts    ✅ Pure TypeScript — no LLM
calculateScore()    lib/modules/scorer.ts       ✅ Pure TypeScript — no LLM
calculateVerdict()  lib/modules/verdict.ts      ✅ Pure TypeScript — no LLM
formatAsMarkdown()  lib/modules/formatter.ts    ✅ Pure TypeScript — no LLM
```

The **deterministic half** (evaluator, scorer, verdict, formatter) has no Chomsky dependency. You can test it without VPN. The **LLM half** (parser, researcher, extractor, questioner) requires VPN and incurs token costs.

### Test File Mapping

Convention: `tests/{name}.test.ts` maps 1:1 to `lib/modules/{name}.ts` or `lib/{name}.ts`.

| Test file | Source file | What it covers |
|---|---|---|
| `tests/evaluator.test.ts` | `lib/modules/evaluator.ts` | Gate evaluation (12 tests) |
| `tests/scorer.test.ts` | `lib/modules/scorer.ts` | Scoring logic (15 tests) |
| `tests/verdict.test.ts` | `lib/modules/verdict.ts` | Verdict routing (10 tests) |
| `tests/formatter.test.ts` | `lib/modules/formatter.ts` | Output formatting |
| `tests/researcher.test.ts` | `lib/modules/researcher.ts` | Landscape research |
| `tests/name-checker.test.ts` | `lib/modules/name-checker.ts` | Name availability |
| `tests/analytics.test.ts` | `lib/analytics.ts` | Analytics tracking |
| `tests/rate-limit.test.ts` | `lib/rate-limit.ts` | Rate limiting |

**No dedicated tests** for: `orchestrator.ts`, `chomsky.ts`, `gate-agents.ts`, `parser.ts`, `extractor.ts`, `questioner.ts`, or any API route (except upload).

### How to Trace Impact Before Editing

**Before editing any file in `lib/`, check its blast radius:**

```bash
# What files does this module transitively import?
npm run impact lib/modules/evaluator.ts

# What files will break if I change this interface?
npm run impact -- --reverse lib/chomsky.ts
npm run impact -- --reverse lib/models/gates.ts

# Verify import direction rules haven't been broken
npm run check-layers
```

**Manual approach when you don't want to run the script:**

1. Open the file. Read its `import` lines — those are the direct dependencies (what it calls).
2. Search for the file's name across the codebase — those are the reverse dependencies (what calls it).
3. For model type files (`lib/models/*.ts`): assume broad impact — these are imported by 10–40+ files. Always grep before changing a type shape.
4. For config changes (`lib/config/naming-rules.ts`): always run the 3 deterministic test suites (`npm test evaluator scorer verdict`) after any change there.

**Key blast-radius facts to know:**

- `lib/chomsky.ts` — 10 direct importers; all LLM-calling modules + 3 API routes
- `lib/models/gates.ts` — 17 transitive consumers (tests included)
- `lib/models/brief.ts` — similarly broad; foundational type
- `lib/orchestrator.ts` — only 1 API caller (`evaluate-v2`), but internally touches 21 files
- `lib/modules/gate-agents.ts` — only called by Lab evaluate route; isolated from main pipeline

### Architecture Guardrails

The import direction rules are enforced by `scripts/check-layers.ts`. Run it before merging:

```bash
npm run check-layers
```

**The 5 rules:**
1. `lib/models/` must not import from `lib/modules/`, `lib/orchestrator.ts`, or `app/`
2. `lib/config/` must not import from `lib/modules/`, `lib/orchestrator.ts`, or `app/`
3. `lib/prompts/` must not import from `lib/modules/`, `lib/orchestrator.ts`, or `app/`
4. `lib/modules/` must not import from `lib/orchestrator.ts` or `app/`
5. UI pages and components must not import from server-only `lib/` files

Types intended for use in both server and UI code belong in `lib/models/` (e.g., `lib/models/lab-run.ts`).

### Pipeline Registry

The evaluation pipeline steps are documented declaratively in `lib/config/pipeline.ts`. Read it to understand the full module chain without tracing the orchestrator manually. It lists each step's input, output, LLM dependency, skippability, and test file.

### Change Checklists for High-Blast-Radius Files

These files are imported broadly. Follow the checklist when editing them.

#### When editing `lib/models/brief.ts` or `lib/models/gates.ts`

These types have 17–18+ transitive consumers. A type shape change is not a local edit.

- [ ] Run `npm run impact -- --reverse lib/models/brief.ts` (or gates.ts) to see full scope
- [ ] Check every module that uses the type as a function input — not just type imports
- [ ] Check `lib/prompts/*.ts` — prompt builders serialize these types into LLM context strings
- [ ] Check `lib/modules/formatter.ts` — formats these types for output; shape changes break rendering
- [ ] Check `app/api/evaluate-v2/route.ts` — passes results through to the client response
- [ ] Run `npm test` — all 3 deterministic suites (evaluator, scorer, verdict) should still pass

#### When editing `lib/chomsky.ts`

10 files call this directly. It is the single point of failure for all LLM communication.

- [ ] Run `npm run impact -- --reverse lib/chomsky.ts` to see full scope
- [ ] If changing `generateText()` or `generateObject()` signatures: grep all callers
- [ ] If changing streaming behavior (`streamText`): test Lab page streaming manually
- [ ] If changing token handling or model selection: verify `max_completion_tokens` logic for GPT-5+ models
- [ ] Check `app/api/classify/route.ts` — uses `maxTokens: 50`; ensure parameter still threads through

#### When editing `lib/config/naming-rules.ts`

All 3 deterministic modules (evaluator, scorer, verdict) read from this file. It is the single source of truth for business logic.

- [ ] Run `npm test evaluator scorer verdict` after any change
- [ ] If changing gate definitions: verify the matching gate evaluation function in `lib/modules/evaluator.ts`
- [ ] If changing scoring rules: verify `lib/modules/scorer.ts` uses the same field names
- [ ] If changing verdict logic: verify `lib/modules/verdict.ts` priority order matches
- [ ] Update `lib/config/pipeline.ts` if the step sequence or conditionality changes

---

## Agent Dispatch Protocol

This system uses a **hybrid architecture**: LLM for semantic understanding, deterministic TypeScript for business logic.

### When to Use Specialized Agents

The naming evaluation system is divided into focused modules. Here's the dispatch protocol:

#### For Complex Multi-Domain Tasks

**Entry Point**: `lib/orchestrator.ts`
- Use when you need full end-to-end evaluation
- Automatically coordinates all specialized agents
- Handles retry logic and state management
- Returns complete evaluation with verdict

**Example**:
```typescript
import { orchestrator } from '@/lib/orchestrator';

const result = await orchestrator.evaluate({
  brief: userInput,
  config: { skipWebResearch: false },
});
```

#### For Specific Domain Tasks

**1. Brief Parsing** → `lib/modules/parser.ts`
- Use when: Converting messy text/documents into structured data
- LLM-powered with Zod schema validation
- Handles Google Docs exports, CSV-like formats, multi-line lists
- Returns: `CompiledBrief`

**2. Landscape Research** → `lib/modules/researcher.ts`
- Use when: Analyzing competitive landscape and market context
- LLM-powered with optional web search integration
- Synthesizes competitor data, market trends, portfolio analysis
- Returns: `LandscapeSynthesis`

**3. Fact Extraction** → `lib/modules/extractor.ts`
- Use when: Extracting structured facts from brief + research
- LLM-powered with intelligent inference (e.g., timing → longevity)
- Applies business rules to identify score tags
- Returns: `NamingFacts`

**4. Gate Evaluation** → `lib/modules/evaluator.ts`
- Use when: Deterministic evaluation of 6 architectural gates
- Pure TypeScript (no LLM costs)
- Unit testable, fully observable
- Returns: `GateEvaluation`

**5. Scoring Calculation** → `lib/modules/scorer.ts`
- Use when: Calculating 0-70 point score with breakdown
- Pure TypeScript (no LLM costs)
- Full audit trail with math scratchpad
- Returns: `ScoringResult`

**6. Verdict Routing** → `lib/modules/verdict.ts`
- Use when: Final decision routing through 6-priority hierarchy
- Pure TypeScript (no LLM costs)
- Deterministic PATH_A0/A1/A2/B/C routing
- Returns: `VerdictOutput`

**7. Question Generation** → `lib/modules/questioner.ts`
- Use when: Generating clarification questions for missing data
- LLM-powered with context-aware prompting
- Triggered when verdict is PATH_B
- Returns: `Question[]`

**8. Output Formatting** → `lib/modules/formatter.ts`
- Use when: Converting data to Markdown, Slack, or custom formats
- Supports audit tables, score breakdowns, escalation messages
- Returns: formatted strings

### Agent Communication Pattern

```
┌──────────────┐
│ Orchestrator │  ← Main coordinator
└──────┬───────┘
       │
       ├─► Parser      (LLM)      → CompiledBrief
       ├─► Researcher  (LLM+Web)  → LandscapeSynthesis
       ├─► Extractor   (LLM)      → NamingFacts
       │
       ├─► Evaluator   (TypeScript) → GateEvaluation
       ├─► Scorer      (TypeScript) → ScoringResult
       ├─► Verdict     (TypeScript) → VerdictOutput
       │
       └─► If PATH_B:
           ├─► Questioner (LLM)    → Questions
           └─► [User Input] → Retry from Evaluator
```

### Agent Selection Rules

| Task Type | Use Module | Reason |
|-----------|------------|--------|
| **End-to-end evaluation** | `orchestrator` | Full pipeline coordination |
| **Messy text → structured data** | `parser` | Semantic understanding needed |
| **Market/competitor analysis** | `researcher` | Web research + synthesis |
| **Extract facts from brief** | `extractor` | Inference + business rules |
| **Gate evaluation (G0-G5)** | `evaluator` | Deterministic, testable |
| **Score calculation (0-70)** | `scorer` | Deterministic, testable |
| **Final decision routing** | `verdict` | Deterministic, testable |
| **Generate clarification questions** | `questioner` | Context-aware prompting |
| **Format output** | `formatter` | Multiple output formats |

---

## Project Architecture

### Hybrid Design Philosophy

**Why Hybrid?**
- ✅ **Testable**: Unit test critical logic without LLM costs
- ✅ **Observable**: Trace every decision with structured audit trails
- ✅ **Maintainable**: Business rules in config, not prompts
- ✅ **Reliable**: Deterministic decisions prevent hallucination
- ✅ **Fast**: Only use LLM where semantic understanding needed

### 3-Step DAG Architecture

```
┌─────────────────┐
│  GATEKEEPER     │  ← LLM via generateObject
│  (G0-G5)        │    6 architectural gates
└────────┬────────┘    Pass/Fail/Pending/Unknown
         │
         ▼
┌─────────────────┐
│  SCORER         │  ← LLM via generateObject (conditional)
│  (0-70 points)  │    Only runs if ALL gates pass
└────────┬────────┘    5 scoring criteria
         │
         ▼
┌─────────────────┐
│  VERDICT ENGINE │  ← Pure TypeScript (NO LLM)
│  (PATH routing) │    Returns one of 5 exact verdicts
└─────────────────┘
```

### The 6 Gates (G0-G5)

| Gate | Criterion | Pass Condition | Fail Condition |
|------|-----------|----------------|----------------|
| **G0** | Interaction Model | User actively selects/sees feature | Invisible/automatic background process |
| **G1** | Integration Level | Standalone app with distinct enrollment | Embedded feature within existing platform |
| **G2** | Standalone Architecture | Microservice with distinct service boundaries | Shared platform architecture |
| **G3** | Strategic Lifespan | ≥12 months, permanent | <12 months, promotional, seasonal |
| **G4** | Portfolio Alignment | No internal name collisions | Conflicts with existing eBay products |
| **G5** | Legal & Localization | No trademark/regulatory blockers | Trademark issues, regulatory restrictions |

### The 5 Scoring Criteria (70 points max)

| Factor | Max Points | Condition |
|--------|------------|-----------|
| **Standalone** | 25 | Separate enrollment OR vertical services |
| **Longevity** | 15 | ≥12 months strategic lifespan |
| **Legal** | 10 | Has `formal_legal` tag (trademark, contracts) |
| **Global** | 10 | `global_big3` tag OR (US AND UK/DE markets) |
| **Clarity** | 10 | `clarity_lift` tag (complex concept needing name) |
| **Portfolio Risk** | -20 | `portfolio_risk` tag (name collision penalty) |
| **Trademark Risk** | -20 | `trademark_risk` tag (legal blocker penalty) |

**Threshold**: 60 points to proceed with naming

### The 5 Verdict Paths

Priority hierarchy (evaluated top-to-bottom):

1. **PATH_A0** (Do Not Name - Use Inline Copy)
   - Trigger: G0 Fail (no user interaction)
   - Example: Background algorithms, automatic processes

2. **PATH_A1** (No Proper Name - Use Descriptive Label)
   - Trigger: G5 Fail (legal blocker) OR G1-G4 Fail
   - Example: Embedded features, short-term campaigns

3. **PATH_B** (Need More Information)
   - Trigger: Any gate is Unknown/Pending
   - Action: Generate questions, wait for user clarification

4. **PATH_A2** (No Proper Name - Low Score)
   - Trigger: All gates pass but score < 60
   - Example: Integrated features with low strategic value

5. **PATH_C** (Proceed With Naming)
   - Trigger: All gates pass AND score ≥ 60
   - Example: Standalone products with strategic importance

### File Structure

```
naming-studio/
├── lib/
│   ├── models/              # Type-safe schemas (Zod)
│   │   ├── brief.ts        # Brief schemas and validation
│   │   ├── landscape.ts    # Research data models
│   │   ├── facts.ts        # Fact extraction schemas
│   │   ├── gates.ts        # Gate evaluation models
│   │   ├── scoring.ts      # Scoring calculation models
│   │   ├── verdict.ts      # Verdict decision models (5 paths)
│   │   └── workflow.ts     # Workflow state machine
│   │
│   ├── config/
│   │   └── naming-rules.ts # Business logic config (SINGLE SOURCE OF TRUTH)
│   │
│   ├── modules/            # Core business logic
│   │   ├── evaluator.ts   # ✅ Deterministic gate evaluation (G0-G5)
│   │   ├── scorer.ts      # ✅ Deterministic scoring (0-70 points)
│   │   ├── verdict.ts     # ✅ Deterministic routing (5-path hierarchy)
│   │   ├── parser.ts      # 🤖 LLM-powered brief parsing
│   │   ├── extractor.ts   # 🤖 LLM-powered fact extraction
│   │   ├── researcher.ts  # 🤖 LLM-powered landscape research
│   │   ├── questioner.ts  # 🤖 LLM-powered question generation
│   │   └── formatter.ts   # 🤖 Output formatting (Markdown/Slack)
│   │
│   ├── prompts/            # Deduplicated prompt templates
│   │   ├── parse-brief.ts
│   │   ├── extract-facts.ts
│   │   ├── synthesize-landscape.ts
│   │   └── generate-questions.ts
│   │
│   ├── orchestrator.ts     # Main state machine
│   ├── chomsky.ts          # Chomsky LLM client
│   └── rate-limit.ts       # Rate limiting for API calls
│
├── app/api/
│   ├── evaluate-v2/route.ts # ✅ New modular agent API
│   ├── evaluate/route.ts    # Legacy API (deprecated)
│   ├── chat/route.ts        # Chat interface
│   └── upload/route.ts      # Document upload handler
│
├── tests/
│   ├── evaluator.test.ts   # Gate evaluation tests (12 tests)
│   ├── scorer.test.ts      # Scoring calculation tests (15 tests)
│   ├── verdict.test.ts     # Verdict routing tests (10 tests)
│   ├── formatter.test.ts   # Output formatting tests
│   └── researcher.test.ts  # Landscape research tests
│
└── data/
    └── mockBriefs.ts       # Test data (CITA, Managed Shipping, etc.)
```

**Legend**: ✅ Complete | 🤖 LLM-powered | 🚧 In Progress

---

## Technology Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **React 18** - UI library
- **Tailwind CSS 3** - Styling

### LLM Integration
- **Chomsky Gateway** - eBay's internal LLM gateway
- **Supported Models**:
  - GPT-5.2 (recommended, 180 req/min)
  - Claude Sonnet 4.6 (highest quality, 6 req/min)
  - Claude Opus 4.6 (premium, 6 req/min)
  - Gemini 3.1 Pro (fastest, 300 req/min)

### Validation & Schemas
- **Zod 3** - Runtime type validation
- All data models use Zod schemas
- Schema-first design for API contracts

### Testing
- **Vitest 4** - Unit testing framework
- **Testing Library** - React component testing
- **37+ tests** with 100% coverage on deterministic logic

### Data & Caching
- **Upstash Redis** - Rate limiting and caching
- LRU cache for brief parsing (1 hour TTL)
- Token caching (6 hours TTL)

### Document Processing
- **Mammoth** - Word document parsing (.docx)
- **pdf-parse** - PDF document parsing

### UI Components
- **Radix UI** - Headless accessible components
- **Framer Motion** - Animations
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **react-dropzone** - File upload

---

## Development Setup

### Environment Variables

Create `.env.local` file:

```bash
# Chomsky LLM Gateway (eBay Internal)
# REQUIRED: Must be connected to eBay VPN

# Main API Endpoint
CHOMSKY_ENDPOINT=https://chomskygw.vip.qa.ebay.com/api/v1/genai

# Model Selection (choose one)
# RECOMMENDED: GPT-5.2 (best balance of quality + rate limit)
CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-2025-12-11-sandbox

# Alternative Models:
# Claude Sonnet 4.6 (highest quality, 6 req/min)
# CHOMSKY_MODEL=gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox

# Gemini 3.1 Pro (fastest rate limit, 300 req/min)
# CHOMSKY_MODEL=gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox

# Authentication (auto-configured)
# Token endpoint: https://dcputilityexecutorsvc.vip.qa.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run
# Tokens cached for 6 hours, auto-refreshed

# Optional Features
ENABLE_WEB_RESEARCH=false
MAX_RETRIES=1
```

### VPN Requirements

**CRITICAL**: You MUST be connected to eBay VPN for:
- Chomsky LLM gateway access
- Token endpoint authentication
- Internal API endpoints

**VPN Connection Check**:
```bash
curl https://chomskygw.vip.qa.ebay.com/api/v1/genai
# Should return authentication challenge, not connection error
```

### Installation Steps

```bash
# 1. Clone repository
cd ~/naming-studio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Verify VPN connection
# Connect to eBay VPN first!

# 5. Run development server
npm run dev

# 6. Run tests to verify setup
npm test
```

### Development Workflow

```bash
# Start development server
npm run dev

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Check test coverage
npm run test:coverage

# Lint code
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

---

## Testing Guide

### Test Structure

**37+ tests** covering:
- 12 gate evaluation tests (`evaluator.test.ts`)
- 15 scoring calculation tests (`scorer.test.ts`)
- 10 verdict routing tests (`verdict.test.ts`)
- Formatter tests (`formatter.test.ts`)
- Researcher tests (`researcher.test.ts`)

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test evaluator
npm test scorer
npm test verdict

# Watch mode (auto-rerun on changes)
npm test -- --watch

# UI mode (interactive)
npm run test:ui

# Coverage report
npm run test:coverage
```

### Unit Testing (No LLM Costs)

All deterministic modules are 100% unit testable without LLM calls:

```typescript
import { evaluateGates } from '@/lib/modules/evaluator';
import { calculateScore } from '@/lib/modules/scorer';
import { calculateVerdict } from '@/lib/modules/verdict';

describe('Gate Evaluation', () => {
  it('should pass G0 when enrollment is separate', () => {
    const facts = {
      facts: { enrollment_policies: 'separate' },
      score_tags: [],
      evidence_anchors: [],
    };
    
    const gates = evaluateGates(facts);
    expect(gates.gate_results.G0.status).toBe('Pass');
  });
});
```

### Integration Testing (With LLM)

End-to-end tests with real LLM calls:

```typescript
import { orchestrator } from '@/lib/orchestrator';

describe('Full Pipeline', () => {
  it('should evaluate Managed Shipping brief', async () => {
    const brief = `
      Offering: Managed Shipping Service
      Target: High-volume sellers
      Markets: US, UK, DE
      Timing: Q2 2026, permanent
    `;
    
    const result = await orchestrator.evaluate({ brief });
    
    expect(result.verdict.path).toBe(VerdictPath.PATH_A2);
    expect(result.scoringResult.scores.total).toBeLessThan(60);
  });
});
```

### Testing Best Practices

1. **Unit test deterministic logic first** (no LLM costs)
2. **Mock LLM responses** for integration tests
3. **Use test fixtures** from `data/mockBriefs.ts`
4. **Verify audit trails** (math scratchpad, reasoning)
5. **Test edge cases** (missing data, invalid input)
6. **Test error handling** (LLM timeout, invalid schema)

### Test Data

Located in `data/mockBriefs.ts`:

1. **CITA** - Expected: PATH_A1 (embedded feature, fails gates)
2. **Managed Shipping** - Expected: PATH_A2 (passes gates, fails score)
3. **Carrier Network** - Expected: PATH_A1 (embedded feature)
4. **Authentication Vault** - Expected: PATH_C (standalone, passes all)

---

## API Reference

### POST `/api/evaluate-v2`

New modular agent API endpoint.

**Request**:
```typescript
{
  brief: string;              // Required: naming brief text
  skipWebResearch?: boolean;  // Optional: skip landscape research
  clarification?: string;     // Optional: user clarification for retry
  previousResult?: object;    // Optional: previous result for retry
}
```

**Response (Success)**:
```typescript
{
  success: true;
  result: {
    verdict: {
      path: VerdictPath;           // PATH_A0/A1/A2/B/C
      title: string;                // Human-readable title
      summary: string[];            // Bullet point summary
      audit_table: string;          // Markdown table (gates)
      score_table?: string;         // Markdown table (scoring)
      missing_fields?: string[];    // For PATH_B
    };
    gateEvaluation: GateEvaluation;
    scoringResult?: ScoringResult;
    markdown: string;              // Full formatted report
  };
  requiresClarification: boolean;  // true if PATH_B
  questions?: string[];            // Clarification questions
}
```

**Response (Error)**:
```typescript
{
  success: false;
  error: string;
}
```

### GET `/api/evaluate-v2`

Health check endpoint.

**Response**:
```typescript
{
  status: "ok";
  version: "2.0";
  description: "Naming Agent v2 - Modular Production System";
}
```

### Usage Examples

**Basic Evaluation**:
```bash
curl -X POST http://localhost:3000/api/evaluate-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "eBay is introducing a managed shipping service for sellers..."
  }'
```

**Skip Web Research**:
```bash
curl -X POST http://localhost:3000/api/evaluate-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "...",
    "skipWebResearch": true
  }'
```

**Retry with Clarification**:
```bash
curl -X POST http://localhost:3000/api/evaluate-v2 \
  -H "Content-Type: application/json" \
  -d '{
    "brief": "...",
    "clarification": "This is a standalone app with separate enrollment.",
    "previousResult": { ... }
  }'
```

### Direct Module Usage

For advanced use cases, import modules directly:

```typescript
import { orchestrator } from '@/lib/orchestrator';

// Full pipeline
const result = await orchestrator.evaluate({
  brief: userInput,
  config: { skipWebResearch: false },
  onProgress: (phase, message) => {
    console.log(`[${phase}] ${message}`);
  },
});

// Individual modules
import { evaluateGates } from '@/lib/modules/evaluator';
import { calculateScore } from '@/lib/modules/scorer';

const gates = evaluateGates(facts);      // No LLM cost
const score = calculateScore(facts);     // No LLM cost
```

---

## Model Selection

### Available Models

eBay's Chomsky gateway supports multiple LLM providers:

| Model | Provider | Rate Limit | Context | Best For |
|-------|----------|------------|---------|----------|
| **GPT-5.2** | Azure OpenAI | 180 req/min | 128K | **Recommended** - Best balance |
| **Claude Sonnet 4.6** | Anthropic GCP | 6 req/min | 200K | Highest quality |
| **Claude Opus 4.6** | Anthropic GCP | 6 req/min | 200K | Premium quality |
| **Gemini 3.1 Pro** | Google GCP | 300 req/min | 1M | Fastest rate limit |
| GPT-5.2 Chat | Azure OpenAI | 180 req/min | 128K | Conversational |

### Model Selection Guide

**For Production**:
- **Default**: GPT-5.2 (best balance of quality and rate limit)
- **High Quality Needed**: Claude Sonnet 4.6 (but watch rate limits)
- **High Volume**: Gemini 3.1 Pro (fastest rate limit)

**For Development**:
- **Testing**: GPT-5.2 (fast feedback loop)
- **Quality Checks**: Claude Sonnet 4.6 (verify edge cases)

**For Specific Tasks**:
- **Brief Parsing**: GPT-5.2 or Gemini 3.1 Pro (speed matters)
- **Fact Extraction**: Claude Sonnet 4.6 (accuracy matters)
- **Question Generation**: Claude Sonnet 4.6 (natural language)
- **Research Synthesis**: Gemini 3.1 Pro (large context window)

### Switching Models

Edit `.env.local`:

```bash
# Option 1: GPT-5.2 (recommended)
CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-2025-12-11-sandbox

# Option 2: Claude Sonnet 4.6
CHOMSKY_MODEL=gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox

# Option 3: Gemini 3.1 Pro
CHOMSKY_MODEL=gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox
```

Restart the dev server after changing models.

### Rate Limit Handling

The system includes automatic rate limiting:

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

// Usage in API route
const { success } = await ratelimit.limit(identifier);
if (!success) {
  return NextResponse.json(
    { error: 'Rate limit exceeded' },
    { status: 429 }
  );
}
```

---

## Configuration

### Business Rules Configuration

**Single source of truth**: `lib/config/naming-rules.ts`

All business logic is centralized here - NO PROMPT CHANGES NEEDED for rule updates.

#### Gate Definitions

```typescript
export const GATE_DEFINITIONS = {
  G0: {
    label: "Interaction Model",
    description: "Does the user actively select, toggle, or see this feature?",
    passConditions: [
      "User makes an active choice",
      "Name displayed as trust signal",
    ],
    failConditions: [
      "Automatic/background process",
      "Invisible to user",
    ],
  },
  // ... G1-G5
};
```

#### Scoring Rules

```typescript
export const SCORING_RULES = {
  standalone: {
    label: "Standalone purchase behavior",
    maxPoints: 25,
    tiers: [
      { 
        points: 25, 
        condition: "Separate enrollment OR vertical services" 
      },
      { 
        points: 0, 
        condition: "None of the above" 
      },
    ],
  },
  longevity: {
    label: "Longevity",
    maxPoints: 15,
    tiers: [
      { points: 15, condition: "≥12 months" },
      { points: 0, condition: "<12 months" },
    ],
  },
  // ... legal, global, clarity
};
```

#### Verdict Logic

```typescript
export const VERDICT_LOGIC = {
  priority: [
    { path: "PATH_A1", trigger: "G5 Fail (legal blocker)" },
    { path: "PATH_A0", trigger: "G0 Fail (no interaction)" },
    { path: "PATH_A1", trigger: "G1-G4 Fail" },
    { path: "PATH_B", trigger: "Any Unknown/Pending" },
    { path: "PATH_A2", trigger: "Score < 60" },
    { path: "PATH_C", trigger: "All pass + Score ≥ 60" },
  ],
};
```

### Modifying Business Rules

**To change a gate criterion**:
1. Edit `GATE_DEFINITIONS` in `naming-rules.ts`
2. Update evaluation logic in `lib/modules/evaluator.ts`
3. Add test in `tests/evaluator.test.ts`
4. No prompt changes needed

**To change scoring**:
1. Edit `SCORING_RULES` in `naming-rules.ts`
2. Update calculation in `lib/modules/scorer.ts`
3. Add test in `tests/scorer.test.ts`
4. No prompt changes needed

**To change verdict routing**:
1. Edit `VERDICT_LOGIC` in `naming-rules.ts`
2. Update routing in `lib/modules/verdict.ts`
3. Add test in `tests/verdict.test.ts`
4. No prompt changes needed

### Adding a New Gate (Example: G6)

```typescript
// 1. Add to naming-rules.ts
export const GATE_DEFINITIONS = {
  // ... existing gates
  G6: {
    label: "Competitive Differentiation",
    description: "Does this differentiate from competitors?",
    passConditions: ["Unique value proposition"],
    failConditions: ["Commodity feature"],
  },
};

// 2. Update models/gates.ts
export const GateResultSchema = z.object({
  G0: GateStatusSchema,
  // ... existing gates
  G6: GateStatusSchema,
});

// 3. Update modules/evaluator.ts
export function evaluateGates(facts: NamingFacts): GateEvaluation {
  // ... existing gates
  
  const G6 = evaluateG6(facts);
  
  return {
    gate_results: { G0, G1, G2, G3, G4, G5, G6 },
    // ...
  };
}

// 4. Add tests
describe('G6: Competitive Differentiation', () => {
  it('should pass when value prop is unique', () => {
    // ...test
  });
});
```

---

## Deployment

### Production Checklist

- [ ] Run tests: `npm test` (expect 37+ passing)
- [ ] Build: `npm run build` (expect no errors)
- [ ] Test locally: `npm run dev` → test API
- [ ] Review environment variables in `.env`
- [ ] Verify VPN connectivity requirements
- [ ] Deploy to staging environment
- [ ] Run smoke tests on staging
- [ ] Monitor metrics and logs
- [ ] Deploy to production
- [ ] Gradual rollout (A/B test with v1)

### Build & Deploy

```bash
# Install dependencies
npm ci --only=production

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables (Production)

```bash
# Chomsky LLM Gateway
CHOMSKY_ENDPOINT=https://chomskygw.vip.ebay.com/api/v1/genai
CHOMSKY_MODEL=azure-chat-completions-gpt-5-2-2025-12-11-sandbox

# Token endpoint
CHOMSKY_TOKEN_ENDPOINT=https://dcputilityexecutorsvc.vip.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run

# Optional features
ENABLE_WEB_RESEARCH=true
MAX_RETRIES=2

# Monitoring
NODE_ENV=production
```

### Docker Deployment

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

### Monitoring & Observability

**Health Check**:
```bash
curl http://localhost:3000/api/evaluate-v2
# Expected: {"status":"ok","version":"2.0"}
```

**Structured Logging**:
```typescript
// Every evaluation produces audit trail
{
  "timestamp": "2026-04-02T10:30:00Z",
  "phase": "verdict",
  "gates": {
    "G0": { "status": "Pass", "reasoning": "..." },
    // ... G1-G5
  },
  "scoring": {
    "total": 65,
    "breakdown": { "standalone": 25, ... },
    "math_scratchpad": ["Start: 0", "Step 1: +25", ...]
  },
  "verdict": {
    "path": "PATH_C",
    "title": "✅ Proceed With Naming..."
  }
}
```

### Migration from v1

Both systems can run in parallel:

- **Old system**: `/api/evaluate` (existing)
- **New system**: `/api/evaluate-v2` (new)

**Gradual Rollout**:
```typescript
const USE_V2 = process.env.USE_V2_AGENT === 'true';

export async function POST(request: NextRequest) {
  if (USE_V2) {
    return handleV2(request);
  } else {
    return handleV1(request);
  }
}
```

**Rollback Plan**:
1. Set `USE_V2=false` in environment
2. Restart service with old code
3. Investigate logs and metrics
4. Fix issues in v2
5. Re-deploy with gradual rollout

---

## Troubleshooting

### Common Issues

#### Chomsky Timeout

**Symptom**: Request times out after 60 seconds

**Solution**: Increase timeout in API route
```typescript
// app/api/evaluate-v2/route.ts
export const maxDuration = 120; // 2 minutes
```

Or skip web research for faster evaluation:
```typescript
const result = await orchestrator.evaluate({
  brief,
  config: { skipWebResearch: true },
});
```

#### VPN Connection Issues

**Symptom**: `ECONNREFUSED` or `ETIMEDOUT` errors

**Solution**: 
1. Verify VPN connection: `curl https://chomskygw.vip.qa.ebay.com/api/v1/genai`
2. Check endpoint in `.env.local`
3. Try production endpoint: `https://chomskygw.vip.ebay.com/api/v1/genai`

#### Token Expired

**Symptom**: `401 Unauthorized` from Chomsky

**Solution**: Tokens auto-refresh (6-hour cache). Check token endpoint availability:
```bash
curl -X POST https://dcputilityexecutorsvc.vip.qa.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run
```

#### Rate Limit Exceeded

**Symptom**: `429 Too Many Requests`

**Solution**:
1. Switch to model with higher rate limit (Gemini 3.1 Pro: 300 req/min)
2. Implement request queuing
3. Use caching for repeated briefs

```typescript
// Check rate limits by model
const rateLimits = {
  'gpt-5-2': '180 req/min',
  'claude-sonnet-4.6': '6 req/min',
  'gemini-3.1-pro': '300 req/min',
};
```

#### Test Failures

**Symptom**: Tests fail with LLM errors

**Solution**:
1. Verify VPN connection
2. Check `.env.local` configuration
3. Run tests in isolation: `npm test -- --no-threads`
4. Skip integration tests: `npm test -- --grep "^(?!.*Integration)"`

#### Missing Fields in Brief

**Symptom**: Brief validation error

**Solution**: Use validation helpers
```typescript
import { hasMinimumFields, getMissingFields } from '@/lib/models/brief';

if (!hasMinimumFields(brief)) {
  const missing = getMissingFields(brief);
  console.warn('Missing required fields:', missing);
}
```

#### Memory Leak

**Symptom**: High memory usage over time

**Solution**: Ensure caches have size limits
```typescript
const briefCache = new LRUCache<string, ParsedBrief>({
  max: 100,        // Max 100 items
  ttl: 3600000,    // 1 hour TTL
});
```

### Debug Mode

Enable verbose logging:

```typescript
const result = await orchestrator.evaluate({
  brief,
  config: { verbose: true },
  onProgress: (phase, message) => {
    console.log(`[DEBUG] ${phase}: ${message}`);
  },
});
```

### Getting Help

1. **Check logs**: Server logs show detailed error messages
2. **Review audit trail**: Every evaluation produces structured output
3. **Run tests**: `npm test` verifies system health
4. **Check VPN**: Most issues stem from VPN connectivity
5. **Consult docs**: This file, `AGENT_README.md`, `DEPLOYMENT.md`

---

## Key Metrics & Success Criteria

### Code Quality
- ✅ **Type Safety**: 100% (full TypeScript coverage)
- ✅ **Test Coverage**: 100% (deterministic logic fully tested)
- ✅ **Documentation**: Comprehensive guides
- ✅ **Modularity**: 8 focused modules with single responsibility

### Performance
- ⚡ **Evaluation Time**: ~10-15 seconds (with LLM calls)
- ⚡ **Deterministic Steps**: <1 second (gates + scoring + verdict)
- ⚡ **Tests**: <2 seconds (37 tests, no LLM)

### Maintainability
- 📊 **Lines of Code**: ~2,500 (modular design)
- 📊 **Complexity**: Low (clear separation of concerns)
- 📊 **Technical Debt**: Minimal (clean architecture)

---

## Quick Reference

### Essential Commands

```bash
npm run dev              # Start dev server
npm test                 # Run all tests
npm run build            # Build for production
npm start                # Start production server
```

### Key Files

| File | Purpose |
|------|---------|
| `lib/orchestrator.ts` | Main entry point |
| `lib/config/naming-rules.ts` | Business rules (SINGLE SOURCE OF TRUTH) |
| `app/api/evaluate-v2/route.ts` | API endpoint |
| `lib/modules/evaluator.ts` | Gate evaluation logic |
| `lib/modules/scorer.ts` | Scoring calculation |
| `lib/modules/verdict.ts` | Verdict routing |

### Data Flow Summary

```
Raw Brief
  → [LLM] Parser → CompiledBrief
  → [LLM] Researcher → LandscapeSynthesis
  → [LLM] Extractor → NamingFacts
  → [TypeScript] Evaluator → GateEvaluation
  → [TypeScript] Scorer → ScoringResult
  → [TypeScript] Verdict → VerdictOutput
  → If PATH_B:
      [LLM] Questioner → Questions
      [User Input] → Re-run from Evaluator
  → [Formatter] → Markdown/Slack
```

### Verdict Paths

| Path | Meaning | Trigger |
|------|---------|---------|
| PATH_A0 | Do Not Name | G0 Fail (no interaction) |
| PATH_A1 | No Proper Name | Gate failure (G1-G5) |
| PATH_A2 | No Proper Name | Score < 60 |
| PATH_B | Need More Info | Unknown/Pending gates |
| PATH_C | Proceed With Naming | All pass + Score ≥ 60 |

---

## Additional Resources

### Documentation Files

- **AGENT_README.md** - Complete system documentation
- **QUICK_START_AGENT.md** - Quick reference guide
- **USAGE_EXAMPLES.md** - Code examples and patterns
- **DEPLOYMENT.md** - Production deployment guide
- **IMPLEMENTATION_PLAN.md** - Architecture and roadmap
- **BUILD_COMPLETE.md** - Build summary and checklist

### Legacy Files (Can Archive)

- **GAP_FIXES_SUMMARY.md** - Historical technical fixes
- **TECHNICAL_GAPS_FIX_SUMMARY.md** - Historical gap analysis
- **TECHNICAL_FIXES.md** - Historical technical documentation
- **Naming-Flow-with-prompts.md** - Original 115-step workflow (preserved for reference)

### Test Data

- **data/mockBriefs.ts** - Test briefs (CITA, Managed Shipping, Carrier Network)
- **extracted-prompts.json** - All 41 original prompts preserved

---

**Built**: April 2026  
**Version**: 2.0  
**Status**: Production Ready  
**Tests**: 37+ passing (100% coverage on deterministic logic)  
**Documentation**: Complete

For questions or issues, refer to the troubleshooting section or consult the additional documentation files.