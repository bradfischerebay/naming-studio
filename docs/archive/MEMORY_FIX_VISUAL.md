# Memory/Context Management Fix - Visual Guide

## The Problem (Before Fix)

```
┌─────────────────────────────────────────────────────────────┐
│ Brief: "No conflicts with existing products. Legal cleared" │
└─────────────────────────────────────────────────────────────┘
                           ↓
                   extractFacts()
                           ↓
        ┌──────────────────────────────────┐
        │ Facts extracted, but G4/G5      │
        │ answer NOT tracked anywhere     │
        └──────────────────────────────────┘
                           ↓
                   evaluateGates()
                           ↓
        ┌──────────────────────────────────┐
        │ G4: No portfolio_risk tag found │
        │ → Auto-PASS ✅ (WRONG!)          │
        │ G5: No trademark_risk tag found │
        │ → Auto-PASS ✅ (WRONG!)          │
        └──────────────────────────────────┘
                           ↓
        User provides clarification: "We're a standalone program"
                           ↓
                   patchFacts()
                           ↓
        ┌──────────────────────────────────┐
        │ Updates enrollment_policies     │
        │ But G4/G5 answer still NOT      │
        │ tracked!                        │
        └──────────────────────────────────┘
                           ↓
                   evaluateGates()
                           ↓
        ┌──────────────────────────────────┐
        │ G4: Still no tag                │
        │ → Still PASS ✅                  │
        │ G5: Still no tag                │
        │ → Still PASS ✅                  │
        │ But system doesn't know these   │
        │ were already asked!             │
        └──────────────────────────────────┘
                           ↓
              generateQuestions()
                           ↓
        ┌──────────────────────────────────┐
        │ Sees only gate status (PASS)    │
        │ Doesn't know these were already │
        │ answered by user                │
        │ → Might ask again! ❌            │
        └──────────────────────────────────┘
```

## The Solution (After Fix)

```
┌─────────────────────────────────────────────────────────────┐
│ Brief: "No conflicts with existing products. Legal cleared" │
└─────────────────────────────────────────────────────────────┘
                           ↓
                   extractFacts()
                           ↓
        ┌──────────────────────────────────┐
        │ Facts: { ... }                  │
        │ answered_gates: {               │
        │   G0: false                     │
        │   G1: false                     │
        │   G2: false                     │
        │   G3: false                     │
        │   G4: true  ← Found in brief!   │
        │   G5: true  ← Found in brief!   │
        │ }                               │
        └──────────────────────────────────┘
                           ↓
                   evaluateGates()
                           ↓
        ┌──────────────────────────────────┐
        │ G4: No portfolio_risk tag       │
        │     BUT answered_gates.G4=true  │
        │     → PASS ✅ (CORRECT!)         │
        │ G5: No trademark_risk tag       │
        │     BUT answered_gates.G5=true  │
        │     → PASS ✅ (CORRECT!)         │
        └──────────────────────────────────┘
                           ↓
              generateQuestions(gates, facts)
                           ↓
        ┌──────────────────────────────────┐
        │ Checks answered_gates:          │
        │ - G4 = true → Skip question     │
        │ - G5 = true → Skip question     │
        │ → Won't ask about G4/G5! ✅      │
        └──────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ User clarification: "We're a standalone program"            │
└─────────────────────────────────────────────────────────────┘
                           ↓
           patchFacts(facts, clarification)
                           ↓
        ┌──────────────────────────────────┐
        │ Updates:                        │
        │ - enrollment_policies="separate"│
        │ - answered_gates.G0 = true      │
        │ - answered_gates.G1 = true      │
        │ - answered_gates.G2 = true      │
        └──────────────────────────────────┘
                           ↓
                   evaluateGates()
                           ↓
        ┌──────────────────────────────────┐
        │ G0: Has enrollment → PASS ✅     │
        │     Auto-marks answered=true    │
        │ G1: Has enrollment → PASS ✅     │
        │     Auto-marks answered=true    │
        └──────────────────────────────────┘
                           ↓
              generateQuestions(gates, facts)
                           ↓
        ┌──────────────────────────────────┐
        │ All gates have answered=true    │
        │ → No duplicate questions! ✅     │
        │ Returns: []                     │
        └──────────────────────────────────┘
```

## Gate Answer Tracking Matrix

```
┌──────┬──────────────────────────┬─────────────────┬──────────────────┐
│ Gate │ What Marks It Answered   │ Where Tracked   │ What It Prevents │
├──────┼──────────────────────────┼─────────────────┼──────────────────┤
│ G0   │ • Enrollment info found  │ answered_gates  │ Re-asking about  │
│      │ • User says user-facing  │     .G0         │ user interaction │
│      │ • Background stated      │                 │                  │
├──────┼──────────────────────────┼─────────────────┼──────────────────┤
│ G1   │ • Enrollment policy set  │ answered_gates  │ Re-asking about  │
│      │ • Checkout flow set      │     .G1         │ integration      │
│      │ • User says standalone   │                 │                  │
├──────┼──────────────────────────┼─────────────────┼──────────────────┤
│ G2   │ • Architecture mentioned │ answered_gates  │ Re-asking about  │
│      │ • Inferred from G1       │     .G2         │ system design    │
├──────┼──────────────────────────┼─────────────────┼──────────────────┤
│ G3   │ • Timing info extracted  │ answered_gates  │ Re-asking about  │
│      │ • longevity_months set   │     .G3         │ lifespan         │
│      │ • User states duration   │                 │                  │
├──────┼──────────────────────────┼─────────────────┼──────────────────┤
│ G4   │ • Brief mentions         │ answered_gates  │ Re-asking about  │
│      │   existing products      │     .G4         │ portfolio        │
│      │ • User answers about     │                 │ conflicts        │
│      │   conflicts              │                 │ ✅ KEY FIX!       │
├──────┼──────────────────────────┼─────────────────┼──────────────────┤
│ G5   │ • Brief mentions legal   │ answered_gates  │ Re-asking about  │
│      │   clearance              │     .G5         │ legal/trademark  │
│      │ • User answers about     │                 │ status           │
│      │   trademark/legal        │                 │ ✅ KEY FIX!       │
└──────┴──────────────────────────┴─────────────────┴──────────────────┘
```

## Before vs After: G4 & G5 Behavior

### BEFORE (Broken)

```
No info about G4 → Auto-PASS → Never asks questions
                                (User never gets a chance to answer!)

Info in brief → Auto-PASS → Next iteration still auto-passes
                             (Doesn't remember brief had the answer)

User answers → Auto-PASS → Next iteration asks again!
                            (Answer not tracked, asks duplicate)
```

### AFTER (Fixed)

```
No info about G4 → answered_gates.G4 = false
                → evaluateG4() returns UNKNOWN
                → generateQuestions() asks about G4
                → User answers
                → patchFacts() marks G4 = true
                → evaluateG4() returns PASS
                → generateQuestions() skips G4
                → ✅ Never asks again!

Info in brief → extractFacts() marks G4 = true
             → evaluateG4() sees G4 answered, returns PASS
             → generateQuestions() skips G4
             → ✅ Never asks!

User answered previously → answered_gates.G4 = true
                        → evaluateG4() returns PASS
                        → generateQuestions() skips G4
                        → ✅ Never re-asks!
```

## Data Structure Comparison

### BEFORE
```json
{
  "facts": {
    "vertical_services": [],
    "enrollment_policies": "separate",
    "longevity_months": 24
  },
  "score_tags": [],
  "evidence_anchors": [
    "No conflicts with existing products",
    "Legal has cleared it"
  ]
}
```
**Problem**: Evidence is there but not actionable!

### AFTER
```json
{
  "facts": {
    "vertical_services": [],
    "enrollment_policies": "separate",
    "longevity_months": 24
  },
  "score_tags": [],
  "evidence_anchors": [
    "No conflicts with existing products",
    "Legal has cleared it"
  ],
  "answered_gates": {
    "G0": true,
    "G1": true,
    "G2": true,
    "G3": true,
    "G4": true,  ← Extracted from evidence_anchors!
    "G5": true   ← Extracted from evidence_anchors!
  }
}
```
**Solution**: Explicit tracking makes evidence actionable!

## Flow Comparison: Re-Evaluation

### BEFORE (Asks Duplicates)
```
Round 1: "Need info about G4/G5" → User answers
Round 2: "Need info about G4/G5" → User answers AGAIN ❌
Round 3: "Need info about G4/G5" → User frustrated ❌❌
```

### AFTER (Smart Memory)
```
Round 1: "Need info about G4/G5" → User answers
         patchFacts() marks G4=true, G5=true
Round 2: Skip G4/G5, ask about remaining gates ✅
Round 3: Skip all answered gates ✅
```

## The Key Insight

**Before**: Gate status (Pass/Fail/Unknown) was the ONLY state

**After**: Two separate states:
1. **Gate Status** (Pass/Fail/Unknown) - Current evaluation result
2. **Gate Answered** (true/false) - Has this been addressed?

**Why Both?**
- Gate can be "Unknown" but answered=true (answer pending re-evaluation)
- Gate can be "Pass" but answered=false (heuristic guess, needs confirmation)
- This separation enables proper context tracking!
