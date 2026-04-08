# AI vs Hardcoded Logic Breakdown

## Executive Summary

The Naming Decision Assistant uses a **hybrid architecture** that strategically combines AI (LLM) for semantic understanding with deterministic TypeScript logic for business decisions. This ensures reliability, testability, and transparency while leveraging AI only where it adds value.

---

## 🤖 Where AI (LLM) is Used

### 1. **Brief Parsing** (`lib/modules/parser.ts`)
**What it does:** Converts messy user input into structured data  
**Why AI:** Handles various formats (prose, bullet points, Google Docs exports, CSV-like text)  
**Input:** Raw text brief  
**Output:** Structured `CompiledBrief` object

```typescript
// AI extracts:
{
  offering_name: "Managed Shipping Service",
  target_audience: "High-volume sellers",
  markets: ["US", "UK", "DE"],
  timeline: "Q2 2026, permanent"
}
```

**AI Task:** Semantic understanding of unstructured text

---

### 2. **Landscape Research** (`lib/modules/researcher.ts`)
**What it does:** Analyzes competitive landscape and market context  
**Why AI:** Synthesizes web research, competitor data, market trends  
**Input:** Parsed brief  
**Output:** `LandscapeSynthesis` with competitor analysis

```typescript
// AI synthesizes:
{
  internal_conflicts: {
    exact_matches: ["eBay Shipping Program"],
    similar_concepts: ["Seller Hub Shipping"]
  },
  competitor_usage: [
    { competitor: "Amazon", term_used: "FBA Shipping" }
  ],
  is_industry_standard: true
}
```

**AI Task:** Web research + competitive intelligence synthesis

---

### 3. **Fact Extraction** (`lib/modules/extractor.ts`)
**What it does:** Extracts naming-relevant facts from brief + research  
**Why AI:** Infers implicit facts (e.g., "launching Q2" → longevity = 12+ months)  
**Input:** Parsed brief + landscape data  
**Output:** `NamingFacts` with score tags

```typescript
// AI extracts and infers:
{
  facts: {
    vertical_services: ["Shipping", "Logistics"],
    enrollment_policies: "separate",  // Inferred from "sellers must enroll"
    longevity_months: 24              // Inferred from "permanent"
  },
  score_tags: ["global_big3", "clarity_lift"],  // Applied based on brief
  evidence_anchors: [
    "Brief mentions separate enrollment process",
    "Described as permanent feature"
  ]
}
```

**AI Task:** Semantic inference + evidence extraction

---

### 4. **Question Generation** (`lib/modules/questioner.ts`)
**What it does:** Generates clarifying questions for missing information  
**Why AI:** Creates context-aware, educational questions with examples  
**Input:** Gate evaluation + facts  
**Output:** Structured questions

```typescript
// AI generates:
[
  {
    headline: "Integration Level",
    question: "Is this a standalone program with separate enrollment?",
    example: "Standalone: eBay Plus. Integrated: Best Match sort."
  }
]
```

**AI Task:** Natural language question generation

---

## 🔧 Where Hardcoded Logic is Used

### 1. **Gate Evaluation** (`lib/modules/evaluator.ts`)
**What it does:** Evaluates 6 architectural gates (G0-G5)  
**Why Hardcoded:** Deterministic business rules must be testable and auditable  
**Input:** `NamingFacts`  
**Output:** `GateEvaluation` (Pass/Fail/Pending/Unknown)

```typescript
// DETERMINISTIC LOGIC (No AI):
function evaluateG0(facts: NamingFacts): GateResult {
  // G0: Interaction Model
  // PASS: User actively selects/sees feature
  // FAIL: Invisible background process
  
  const userFacing = facts.facts.vertical_services.length > 0 ||
                     facts.facts.enrollment_policies === 'separate';
  
  if (userFacing) {
    return {
      status: 'Pass',
      reasoning: 'User actively interacts with this feature'
    };
  }
  
  return {
    status: 'Fail',
    reasoning: 'Background process, invisible to user'
  };
}
```

**Hardcoded Rules:**
- G0: `enrollment_policies === 'separate'` → Pass
- G1: `enrollment_policies === 'separate'` → Pass
- G2: `vertical_services.length > 0` → Pass  
- G3: `longevity_months >= 12` → Pass
- G4: `portfolio_risk` tag absent → Pass
- G5: `trademark_risk` tag absent → Pass

**Why Hardcoded:** These are **business policy decisions** that must be:
- ✅ Testable without LLM costs
- ✅ Consistent across runs
- ✅ Auditable with full trace
- ✅ Changeable via config (not prompt engineering)

---

### 2. **Scoring Calculation** (`lib/modules/scorer.ts`)
**What it does:** Calculates 0-70 point score  
**Why Hardcoded:** Pure math, must be deterministic  
**Input:** `NamingFacts`  
**Output:** `ScoringResult` with breakdown

```typescript
// DETERMINISTIC MATH (No AI):
function calculateScore(facts: NamingFacts): ScoringResult {
  let score = 0;
  const scratchpad = ['Start: 0'];
  
  // Standalone (25 points max)
  if (facts.facts.enrollment_policies === 'separate' ||
      facts.facts.vertical_services.length > 0) {
    score += 25;
    scratchpad.push('Step 1: +25 (standalone enrollment/vertical services)');
  }
  
  // Longevity (15 points max)
  if (facts.facts.longevity_months >= 12) {
    score += 15;
    scratchpad.push('Step 2: +15 (lifespan ≥12 months)');
  }
  
  // Legal clarity (10 points)
  if (facts.score_tags.includes('formal_legal')) {
    score += 10;
    scratchpad.push('Step 3: +10 (formal legal tag)');
  }
  
  // ... and so on
  
  return {
    scores: {
      standalone: 25,
      longevity: 15,
      legal: 10,
      global: 10,
      clarity: 10,
      total: score
    },
    math_scratchpad: scratchpad
  };
}
```

**Hardcoded Rules:**
- Standalone enrollment = +25 points
- Longevity ≥12 months = +15 points
- Formal legal tag = +10 points
- Global markets (US+UK+DE) = +10 points
- Clarity lift tag = +10 points
- Portfolio risk = -20 points (penalty)
- Trademark risk = -20 points (penalty)
- **Threshold: 60/70 to proceed with naming**

**Why Hardcoded:** Scoring is **pure arithmetic** - no AI needed.

---

### 3. **Verdict Routing** (`lib/modules/verdict.ts`)
**What it does:** Routes to 5 verdict paths (PATH_A0/A1/A2/B/C)  
**Why Hardcoded:** Deterministic decision tree  
**Input:** Gate evaluation + scoring  
**Output:** `VerdictOutput`

```typescript
// DETERMINISTIC DECISION TREE (No AI):
function calculateVerdict(
  gates: GateEvaluation,
  scoring?: ScoringResult
): VerdictOutput {
  
  // Priority 1: G5 Fail (legal blocker)
  if (gates.gate_results.G5.status === 'Fail') {
    return {
      path: VerdictPath.PATH_A1,
      title: 'No Proper Name - Legal/Regulatory Blocker',
      summary: ['Trademark or regulatory issues prevent naming']
    };
  }
  
  // Priority 2: G0 Fail (no user interaction)
  if (gates.gate_results.G0.status === 'Fail') {
    return {
      path: VerdictPath.PATH_A0,
      title: 'Do Not Name - Use Inline Copy',
      summary: ['Background process, invisible to users']
    };
  }
  
  // Priority 3: G1-G4 Fail
  if (gates.gate_results.G1.status === 'Fail' ||
      gates.gate_results.G2.status === 'Fail' ||
      gates.gate_results.G3.status === 'Fail' ||
      gates.gate_results.G4.status === 'Fail') {
    return {
      path: VerdictPath.PATH_A1,
      title: 'No Proper Name - Use Descriptive Label',
      summary: ['Embedded feature or short-term initiative']
    };
  }
  
  // Priority 4: Any Unknown/Pending
  if (gates.missing_info) {
    return {
      path: VerdictPath.PATH_B,
      title: 'Need More Information',
      summary: ['Cannot make final decision without clarification']
    };
  }
  
  // Priority 5: All pass but score < 60
  if (scoring && scoring.scores.total < 60) {
    return {
      path: VerdictPath.PATH_A2,
      title: 'No Proper Name - Low Strategic Value',
      summary: ['Passes gates but score below threshold (60/70)']
    };
  }
  
  // Priority 6: All pass + score ≥ 60
  return {
    path: VerdictPath.PATH_C,
    title: '✅ Proceed With Naming',
    summary: ['All gates passed with sufficient score']
  };
}
```

**Hardcoded Decision Tree:**
1. G5 Fail → PATH_A1 (legal blocker)
2. G0 Fail → PATH_A0 (no interaction)
3. G1-G4 Fail → PATH_A1 (embedded feature)
4. Any Unknown → PATH_B (need more info)
5. Score < 60 → PATH_A2 (low value)
6. All pass + Score ≥ 60 → PATH_C (proceed with naming)

**Why Hardcoded:** This is **business policy** - the exact conditions under which to name or not name a product.

---

## 📊 Architecture Diagram

```
USER INPUT (messy text)
   ↓
🤖 AI: Parse Brief → CompiledBrief
   ↓
🤖 AI: Research Landscape → LandscapeSynthesis
   ↓
🤖 AI: Extract Facts → NamingFacts (with score_tags)
   ↓
   ├─────────────────────────────────┐
   ↓                                 ↓
🔧 HARDCODED: Evaluate Gates    🔧 HARDCODED: Calculate Score
   (G0-G5 Pass/Fail)               (0-70 points)
   ↓                                 ↓
   └─────────────────────────────────┘
                  ↓
🔧 HARDCODED: Calculate Verdict
   (PATH_A0/A1/A2/B/C)
                  ↓
        ┌─────────┴─────────┐
        ↓                   ↓
   PATH_B?            Final Verdict
        ↓                   ↓
🤖 AI: Generate Questions   🤖 AI: Format Output
        ↓
   USER CLARIFICATION
        ↓
   [Loop back to Evaluate Gates]
```

---

## 🎯 Why This Hybrid Approach?

### AI is Used For:
✅ **Semantic understanding** (parsing unstructured text)  
✅ **Inference** (deriving implicit facts)  
✅ **Synthesis** (competitive landscape analysis)  
✅ **Natural language generation** (questions, formatting)

### Hardcoded Logic is Used For:
✅ **Business rules** (gate criteria)  
✅ **Scoring math** (point calculations)  
✅ **Decision routing** (verdict paths)  
✅ **Testability** (100% unit test coverage)  
✅ **Auditability** (full trace of reasoning)

---

## 💡 Key Benefits

1. **Reliability**: Critical decisions are deterministic, not probabilistic
2. **Testability**: Can unit test gates/scoring/verdict without LLM calls
3. **Transparency**: Every decision has a clear audit trail
4. **Cost Efficiency**: Only pay for LLM where semantic understanding needed
5. **Maintainability**: Change business rules via config, not prompt engineering
6. **Speed**: Deterministic steps run in <1 second

---

## 📝 Example Flow

**User Input:**
> "We're launching a new authentication service for sellers. It requires a separate sign-up and will be available in US, UK, and DE. This is a permanent addition to the platform."

### Step 1: 🤖 AI Parsing
```json
{
  "offering_name": "Authentication service for sellers",
  "markets": ["US", "UK", "DE"],
  "timeline": "permanent"
}
```

### Step 2: 🤖 AI Fact Extraction
```json
{
  "facts": {
    "enrollment_policies": "separate",
    "longevity_months": 24,
    "markets": ["US", "UK", "DE"]
  },
  "score_tags": ["global_big3"]
}
```

### Step 3: 🔧 Hardcoded Gate Evaluation
```
G0: Pass (separate enrollment = user-facing)
G1: Pass (separate enrollment)
G2: Pass (authentication = vertical service)
G3: Pass (permanent = 24 months)
G4: Pass (no portfolio conflicts detected)
G5: Pending (need legal clarity)
```

### Step 4: 🤖 AI Question Generation
```
"I need more information about Legal & Localization:
- Are there any trademark conflicts in US, UK, or DE?
- Any regulatory restrictions on the term 'authentication'?"
```

### Step 5: User Provides Clarification
> "No trademark conflicts. Legal has cleared the term 'authentication'."

### Step 6: 🔧 Hardcoded Re-evaluation
```
G5: Pass (legal cleared)
All gates: PASS
```

### Step 7: 🔧 Hardcoded Scoring
```
Standalone: +25 (separate enrollment)
Longevity: +15 (permanent)
Global: +10 (US, UK, DE)
Total: 50/70
```

### Step 8: 🔧 Hardcoded Verdict
```
PATH_A2: No Proper Name - Low Score
(Passes gates but score 50 < 60 threshold)
```

---

## 🔑 Key Takeaway

**AI is used for understanding, not deciding.**

- AI extracts and infers facts from messy input
- Hardcoded logic makes all final decisions
- This ensures reliability, testability, and transparency
- Users can trust the verdict because every step is auditable

---

## 📚 Code References

| Module | Type | File |
|--------|------|------|
| Brief Parsing | 🤖 AI | `lib/modules/parser.ts` |
| Landscape Research | 🤖 AI | `lib/modules/researcher.ts` |
| Fact Extraction | 🤖 AI | `lib/modules/extractor.ts` |
| Gate Evaluation | 🔧 Hardcoded | `lib/modules/evaluator.ts` |
| Scoring | 🔧 Hardcoded | `lib/modules/scorer.ts` |
| Verdict Routing | 🔧 Hardcoded | `lib/modules/verdict.ts` |
| Question Generation | 🤖 AI | `lib/modules/questioner.ts` |
| Orchestrator | 🎯 Coordinator | `lib/orchestrator.ts` |

---

**Built**: April 2026  
**Version**: 2.0  
**Architecture**: Hybrid (AI + Deterministic Logic)
