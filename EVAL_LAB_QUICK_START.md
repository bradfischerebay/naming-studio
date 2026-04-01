# Eval Lab - Quick Start Guide

## Installation

```bash
# Install the required dependency
npm install @radix-ui/react-accordion

# Start the dev server
npm run dev
```

## Access the New Eval Lab

Navigate to: **http://localhost:3000/evals**

## What Changed?

The Eval Lab has been completely redesigned from a table-based UI to a **3-column regression testing interface**.

### Old UI:
- Single large textarea for entire gatekeeper prompt
- Table showing brief names and verdicts
- Click to expand details

### New UI:
- **Left Column**: 6 editable gate configurations (collapsible)
- **Center Column**: Analysis button with progress indicator
- **Right Column**: 3 editable test brief cards with visual verdict comparison

## Quick Workflow

### 1. Review Gate Configurations (Left)
```
Click on any gate (G0-G5) to expand it
Edit the criteria text to test variations
```

### 2. Run Analysis (Center)
```
Click "Analyze Briefs" button
Watch progress: "Evaluating 1/3 briefs..."
```

### 3. Review Results (Right)
```
Each brief card shows:
  - Original Verdict (baseline)
  - New Verdict (from analysis)
  - Match/Mismatch indicator
```

## Example: Testing a Gate Change

**Scenario**: Make G0 stricter to see impact

1. Expand **G0: Interaction Model** in left column
2. Edit criteria to be more strict (e.g., require "primary interaction")
3. Click **Analyze Briefs** in center
4. Watch right column:
   - CITA: Previously ❌ → Still ❌ (match ✓)
   - Managed Shipping: Previously ❌ → Now ✅ (mismatch ✗)
   - Carrier Network: Previously ❌ → Still ❌ (match ✓)
5. Summary shows: "2/3 briefs matched baseline"

## Visual Indicators

- **✓ Green Checkmark** = Verdicts match (regression test passed)
- **✗ Red X** = Verdicts differ (regression detected)
- **Green Badge** = All briefs matched baseline
- **Yellow Badge** = Some briefs differ from baseline

## Key Features

### Independent Gate Editing
Each gate can be edited separately:
- G0: Interaction Model
- G1: Integration Level
- G2: UX & Service Boundary
- G3: Strategic Lifespan
- G4: Portfolio Alignment
- G5: Legal & Localization Safety

### Editable Test Briefs
You can:
- Modify existing brief text
- Paste new briefs to test
- Edit all 3 briefs independently

### Real-time Progress
- Button shows loading state
- Progress counter updates: 1/3, 2/3, 3/3
- Each brief shows spinner while loading
- Summary appears when complete

## Files You Can Explore

- `/app/evals/page.tsx` - Main Eval Lab component (redesigned)
- `/components/ui/accordion.tsx` - Accordion component (new)
- `/data/mockBriefs.ts` - Test briefs data
- `/app/api/evaluate/route.ts` - Evaluation API (unchanged)

## Troubleshooting

### "Module not found: @radix-ui/react-accordion"
```bash
npm install @radix-ui/react-accordion
```

### Accordion animations not working
Check that `/tailwind.config.ts` includes accordion animations (should be added automatically)

### Verdicts not updating
- Check browser console for API errors
- Verify `/api/evaluate` is working
- Try a single brief first

## Next Steps

1. Install dependency
2. Run dev server
3. Open http://localhost:3000/evals
4. Try editing a gate prompt
5. Click "Analyze Briefs"
6. Review the results!

## Documentation

- `EVAL_LAB_REDESIGN_SUMMARY.md` - Detailed redesign overview
- `EVAL_LAB_TESTING.md` - Complete testing checklist
- `EVAL_LAB_LAYOUT.txt` - ASCII layout diagram
