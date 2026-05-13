# Memory/Context Management Fix

## Problem Summary

The naming evaluation system was asking duplicate questions because:

1. **G4 & G5 Auto-Pass**: Gates G4 (Portfolio Alignment) and G5 (Legal & Localization) defaulted to PASS even when no information was provided
2. **No Context Awareness**: Question generator didn't check if questions were already answered in the brief
3. **Poor Fact Patching**: User clarifications didn't mark gates as "definitively answered"
4. **Lost Brief Data**: Information in the brief wasn't being tracked as "answered" during extraction

## Solution Architecture

### 1. Gate Answer Tracking System

**New Field in `NamingFacts`:**
```typescript
answered_gates: {
  G0: boolean,  // User Interaction
  G1: boolean,  // Integration Level
  G2: boolean,  // Architecture
  G3: boolean,  // Lifespan
  G4: boolean,  // Portfolio Alignment
  G5: boolean,  // Legal & Localization
}
```

**Purpose:** Explicitly track which gates have been answered, separate from gate evaluation results.

### 2. Fixed G4/G5 Default Behavior

**Before:**
- G4: Defaulted to PASS if no `portfolio_risk` tag
- G5: Defaulted to PASS if no `trademark_risk` tag

**After:**
- G4: Returns UNKNOWN unless explicitly answered or portfolio_risk detected
- G5: Returns UNKNOWN unless explicitly answered or trademark_risk detected

**Code Changes in `/lib/modules/evaluator.ts`:**
```typescript
// G4 now checks if explicitly answered
if (wasExplicitlyAnswered) {
  return PASS
}
return UNKNOWN  // Instead of auto-PASS

// Same for G5
```

### 3. Enhanced Fact Extraction

**Updated `/lib/prompts/extract-facts.ts`:**

Added gate answer tracking logic:
- G0: Mark TRUE if found evidence of user interaction OR background operation
- G1: Mark TRUE if enrollment_policies OR checkout_flow has value
- G2: Mark TRUE if architectural information found
- G3: Mark TRUE if longevity_months is non-null
- G4: Mark TRUE ONLY if brief explicitly mentions portfolio conflicts/lack thereof
- G5: Mark TRUE ONLY if brief explicitly mentions legal/trademark status

**Example:**
```json
{
  "facts": { ... },
  "answered_gates": {
    "G0": true,   // Found enrollment info
    "G1": true,   // Found enrollment info
    "G2": false,  // No architecture details
    "G3": true,   // Found timing
    "G4": true,   // Brief said "no conflicts"
    "G5": true    // Brief said "legal approved"
  }
}
```

### 4. Smarter Fact Patching

**Updated `/lib/modules/extractor.ts` - `patchFacts()`:**

Now includes explicit gate marking instructions:
- When user says "standalone" → mark G1 = true
- When user answers about conflicts → mark G4 = true
- When user answers about legal → mark G5 = true
- Etc.

**Example Clarification Flow:**
```
User: "No conflicts with existing products. Legal cleared it."

Patch Result:
- answered_gates.G4 = true
- answered_gates.G5 = true
- No portfolio_risk or trademark_risk tags added
```

### 5. Context-Aware Question Generation

**Updated `/lib/modules/questioner.ts`:**

Now filters questions by:
1. Gate status (Unknown/Pending)
2. `answered_gates` tracking (skip if true)
3. Evidence anchors (check what was already extracted)

**Flow:**
```typescript
// Get pending gates
const pendingGates = ["G0", "G4", "G5"];

// Filter by answered_gates
const trulyPending = pendingGates.filter(
  gate => !isGateAnswered(facts, gate)
);
// Result: ["G0"] if G4/G5 were answered

// Only generate questions for trulyPending
```

**Updated `/lib/prompts/generate-questions.ts`:**

Added anti-duplication rules:
- Check answered_gates before asking
- Check evidence_anchors for existing data
- Only ask about TRULY missing information

### 6. Auto-Marking in Evaluator

**Updated `/lib/modules/evaluator.ts` - `evaluateGates()`:**

Now marks gates as answered when evaluation produces definitive results:

```typescript
if (g0.status !== "Unknown" && g0.status !== "Pending") {
  markGateAnswered(facts, "G0");
}
// Same for G1-G5
```

This ensures that once a gate is evaluated (Pass/Fail), we won't ask about it again.

## Data Flow

### Initial Evaluation
```
Brief
  ↓
extractFacts() 
  → Parses brief
  → Marks answered_gates for info found in brief
  → Returns NamingFacts with answered_gates tracking
  ↓
evaluateGates(facts)
  → Evaluates each gate
  → G4/G5 check answered_gates before defaulting
  → Marks gates as answered when definitive
  → Returns GateEvaluation
  ↓
generateQuestions(gates, facts)
  → Filters by gate status AND answered_gates
  → Only asks about truly missing info
  → Returns ClarifyingQuestion[]
```

### Re-Evaluation After Clarification
```
User Clarification
  ↓
patchFacts(originalFacts, clarification)
  → Interprets user's answer
  → Updates fact fields
  → MARKS answered_gates for each answer provided
  → Returns updated NamingFacts
  ↓
evaluateGates(facts)
  → Re-evaluates with new facts
  → Checks answered_gates for G4/G5
  → Returns updated GateEvaluation
  ↓
generateQuestions(gates, facts)
  → Filters by answered_gates (now includes G4/G5)
  → Won't re-ask answered questions
  → Returns remaining questions OR empty array
```

## Key Behaviors

### ✅ What This Fixes

1. **No Duplicate Questions**: Once a gate is answered (via brief or clarification), it won't be asked again
2. **G4/G5 Properly Gated**: These gates now default to UNKNOWN, requiring explicit confirmation
3. **Context Preservation**: Information in the brief is tracked and remembered
4. **Smart Re-Evaluation**: System understands which gates have been addressed

### ⚠️ Important Notes

1. **answered_gates is separate from gate status**: A gate can be "Unknown" but answered=true (meaning we have the answer but haven't re-evaluated yet)
2. **LLM Extraction Required**: The system relies on LLM to correctly interpret brief and mark gates - verify extraction quality
3. **Evidence Anchors**: Still used for transparency, showing what text was used for decisions

## Testing

Run the memory fix test:
```bash
npm run test tests/memory-fix-test.ts
```

### Test Scenarios

1. **Brief with explicit G4/G5 info** → Should mark as answered and not ask questions
2. **User clarification** → Should mark newly answered gates and not re-ask
3. **Missing info** → G4/G5 should be UNKNOWN and trigger questions

## Migration Notes

**Existing data compatibility:**
- If `answered_gates` is missing, it defaults to all false
- Old facts will trigger questions (safe default)
- New evaluations will populate answered_gates correctly

**No breaking changes:**
- All existing code continues to work
- New field is optional in schema
- Gradual enhancement as facts are re-extracted

## Future Enhancements

1. **Explicit Brief Parsing**: Add structured brief parser that marks gates during parsing
2. **Answer Confidence**: Track confidence level for each answered gate
3. **Answer History**: Keep audit trail of how each gate was answered
4. **Smart Re-Asking**: Ask again if answer was low-confidence or contradictory new info appears
