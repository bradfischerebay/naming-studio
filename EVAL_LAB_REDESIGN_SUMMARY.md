# Eval Lab Redesign Summary

## Overview
The Eval Lab page has been completely redesigned with a new 3-column layout for regression testing gate prompts against test briefs.

## New Layout Structure

### LEFT COLUMN (40% width) - Gate Configuration
- Title: "Gate Configuration"
- 6 collapsible accordion cards (G0-G5)
- Each gate card contains:
  - Header: "G0: Interaction Model" (gate ID + name)
  - Editable textarea with gate-specific criteria
  - All cards start collapsed, expand on click
- Uses shadcn/ui Accordion component

### CENTER COLUMN (20% width) - Action & Progress
- Large blue "Analyze Briefs" button
- Shows loading spinner when running
- Progress indicator: "Evaluating 1/3 briefs..."
- Summary after completion: "2/3 briefs matched baseline"

### RIGHT COLUMN (40% width) - Test Briefs
- Title: "Test Briefs"
- 3 brief cards from mockBriefs.ts:
  - Card header shows brief name
  - Editable textarea for brief text
  - "Original Verdict" section (baseline)
  - "New Verdict" section (populated after analysis)
  - Visual comparison:
    - Green checkmark icon if verdicts match
    - Red X icon if verdicts differ
    - Side-by-side comparison when different

## Features

### Editable Gate Prompts
- Each gate (G0-G5) can be edited independently
- Default criteria extracted from GATEKEEPER_PROMPT
- Changes are combined into full prompt when calling API

### Editable Test Briefs
- Users can modify existing brief text
- Users can paste new briefs for testing
- Changes persist during the session

### Analysis Workflow
1. User edits gate prompts (optional)
2. User edits brief text (optional)
3. Click "Analyze Briefs" button
4. Each brief is evaluated sequentially
5. Progress shown in real-time
6. Results displayed with match/mismatch indicators
7. Summary shows overall match rate

### Gate Criteria Extracted
- **G0: Interaction Model** - User visibility vs background process
- **G1: Integration Level** - Distinct entry point vs embedded
- **G2: UX & Service Boundary** - Separate system vs feature
- **G3: Strategic Lifespan** - Permanent (>12 months) vs temporary
- **G4: Portfolio Alignment** - No conflicts vs collisions
- **G5: Legal & Localization Safety** - No red flags vs blockers

## Files Modified

### Created:
1. `/components/ui/accordion.tsx` - Accordion component with Radix UI
2. `/INSTALL_ACCORDION.md` - Installation instructions
3. `/EVAL_LAB_REDESIGN_SUMMARY.md` - This file

### Modified:
1. `/app/evals/page.tsx` - Complete redesign with 3-column layout
2. `/tailwind.config.ts` - Added accordion animations (keyframes & animation)

## Installation Required

Before using the new Eval Lab, install the Radix UI Accordion dependency:

```bash
npm install @radix-ui/react-accordion
```

Or using shadcn CLI:

```bash
npx shadcn@latest add accordion
```

## Technical Details

### State Management
- `gatePrompts`: Object with G0-G5 gate criteria (editable)
- `briefs`: Array of brief objects with text, verdicts, status, results
- `isRunning`: Boolean for analysis in progress
- `currentBriefIndex`: Tracks which brief is being evaluated

### API Integration
- Calls `/api/evaluate` with:
  - `brief`: The brief text to evaluate
  - `customPrompt`: Full gatekeeper prompt with edited gate criteria
- Returns `EvaluationResult` with verdict and gate details

### Responsive Design
- 3-column grid on large screens: `grid-cols-[40%_20%_40%]`
- Single column stack on mobile: `grid-cols-1`
- Maintains consistent styling with Single Run Studio

## User Workflow

### Typical Use Case
1. Open Eval Lab page
2. Expand a gate (e.g., G0) to review criteria
3. Edit criteria to test variation
4. Click "Analyze Briefs"
5. Watch real-time progress
6. Review results:
   - See which briefs matched baseline
   - Investigate differences for mismatches
7. Iterate: edit more gates or briefs and re-run

### Regression Testing Workflow
This UI enables prompt engineering and regression testing:
- Tweak individual gate prompts
- Immediately see impact on known test cases
- Identify which changes improve/degrade accuracy
- Maintain baseline verdicts for comparison
