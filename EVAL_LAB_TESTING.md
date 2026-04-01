# Eval Lab Testing Checklist

## Pre-Testing Setup

1. Install the Radix UI Accordion dependency:
   ```bash
   npm install @radix-ui/react-accordion
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Navigate to: http://localhost:3000/evals

## Visual Testing

### Layout (Desktop)
- [ ] Page has 3 distinct columns
- [ ] Left column (40% width) shows "Gate Configuration"
- [ ] Center column (20% width) shows "Analyze Briefs" button
- [ ] Right column (40% width) shows "Test Briefs"
- [ ] All columns are properly aligned
- [ ] Header matches Single Run Studio style

### Layout (Mobile)
- [ ] Columns stack vertically on mobile screens
- [ ] Gate Configuration appears first
- [ ] Analyze button appears second
- [ ] Test Briefs appear last
- [ ] All content is readable and accessible

### Left Column - Gate Configuration
- [ ] Title "Gate Configuration" is visible
- [ ] 6 accordion items visible (G0-G5)
- [ ] Each shows: "G0: Interaction Model" format
- [ ] All accordions start collapsed
- [ ] Click expands accordion smoothly
- [ ] Textarea appears with gate criteria
- [ ] Can edit text in textarea
- [ ] Font is monospace for better readability
- [ ] Criteria matches GATEKEEPER_PROMPT format

### Center Column - Action Button
- [ ] "Analyze Briefs" button is large and prominent
- [ ] Button is blue (bg-blue-600)
- [ ] Button is centered vertically at top
- [ ] Clicking disables button
- [ ] Shows loading spinner when running
- [ ] Text changes to "Analyzing..." when running
- [ ] Progress text appears: "Evaluating 1/3 briefs..."
- [ ] Progress updates as briefs are processed
- [ ] Summary appears after completion
- [ ] Summary shows match count (e.g., "2/3 briefs matched baseline")
- [ ] Summary badge is green if all match, yellow if some differ

### Right Column - Test Briefs
- [ ] Title "Test Briefs" is visible
- [ ] 3 brief cards are visible
- [ ] Card headers show brief names:
  - CITA (AI-powered seller listing tool)
  - Managed Shipping
  - Carrier Network (Multi-Carrier Delivery)
- [ ] Each card shows brief text in textarea
- [ ] Brief text is editable
- [ ] "Original Verdict" section is visible
- [ ] Original verdict matches baseline from mockBriefs.ts
- [ ] Textarea is disabled during analysis

## Functional Testing

### Gate Editing
- [ ] Click on G0 accordion
- [ ] Edit some text in the criteria
- [ ] Collapse and re-expand - text persists
- [ ] Edit multiple gates (G0, G1, G2)
- [ ] All edits are maintained

### Brief Editing
- [ ] Click in a brief textarea
- [ ] Edit or replace brief text
- [ ] Edits are maintained
- [ ] Try editing all 3 briefs
- [ ] Paste in new brief text

### Analysis Workflow
- [ ] With default gate prompts, click "Analyze Briefs"
- [ ] Button shows loading state
- [ ] Progress indicator updates (1/3, 2/3, 3/3)
- [ ] First brief shows loading spinner
- [ ] First brief completes, shows "New Verdict"
- [ ] Second brief starts loading
- [ ] Second brief completes
- [ ] Third brief starts and completes
- [ ] All briefs show "New Verdict" section
- [ ] Button returns to enabled state
- [ ] Summary appears with match count

### Verdict Comparison
- [ ] After analysis, check each brief card
- [ ] If verdicts match:
  - Green checkmark icon appears
  - "Verdicts Match" text shows
- [ ] If verdicts differ:
  - Red X icon appears
  - "Verdicts Differ" text shows
  - Grid shows "Original:" and "New:" side by side
  - Both verdicts are readable

### Error Handling
- [ ] Turn off API (kill server temporarily)
- [ ] Click "Analyze Briefs"
- [ ] Briefs show error state in red
- [ ] Restart server, try again - works correctly

### Regression Testing Flow
1. [ ] Edit G0 criteria (make it stricter)
2. [ ] Click "Analyze Briefs"
3. [ ] Check if any verdicts changed
4. [ ] Review differences
5. [ ] Reset G0 to original
6. [ ] Click "Analyze Briefs" again
7. [ ] Verdicts should match baseline again

## Edge Cases

- [ ] Edit all 6 gates with custom text
- [ ] Run analysis - should use custom prompts
- [ ] Clear a gate's criteria completely
- [ ] Run analysis - should still work (though may get different results)
- [ ] Edit brief to be very short (one line)
- [ ] Run analysis - should still work
- [ ] Edit brief to be very long (multiple paragraphs)
- [ ] Run analysis - should handle correctly
- [ ] Rapidly click "Analyze Briefs" multiple times
- [ ] Should be disabled and prevent duplicate runs

## Performance

- [ ] Accordion animations are smooth
- [ ] Page loads quickly
- [ ] No console errors
- [ ] No console warnings (except expected ones)
- [ ] Analysis completes in reasonable time (~30-60 seconds for 3 briefs)

## Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari

## Known Requirements

After testing, confirm:
- All 3 mockBriefs are loaded correctly
- Gate criteria are accurate from GATEKEEPER_PROMPT
- API integration works with customPrompt parameter
- Responsive design works on mobile, tablet, desktop
- Matches the styling of Single Run Studio

## Issues to Report

Document any issues found:
- Layout problems
- Functionality bugs
- Performance issues
- UX improvements
