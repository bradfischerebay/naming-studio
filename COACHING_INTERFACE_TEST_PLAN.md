# Coaching Interface Testing Plan

## Test Scenarios

### 1. Happy Path - Single Missing Gate
**Setup:**
- Submit a brief that's missing info for only G1 (Integration Level)

**Expected Behavior:**
1. ✅ Evaluation completes successfully
2. ✅ Verdict shows "Need More Information"
3. ✅ Coaching interface appears with animation
4. ✅ Coach message reads: "I've reviewed your brief, but I need a bit more information to make a final decision. Specifically, I have some questions about **Integration Level**:"
5. ✅ Questions are numbered (1., 2., 3.)
6. ✅ Decision Logic Audit table dims to 60% opacity
7. ✅ "Preliminary Results" badge appears on table
8. ✅ Textarea shows example placeholder
9. ✅ Keyboard hint shows "Press ⌘+Enter to send" (or Ctrl on Windows)

**User Actions:**
1. Type additional context in textarea
2. Press Cmd+Enter or click Send

**Expected Behavior:**
1. ✅ User's message appears as bubble on right side
2. ✅ Coach message appears: "Thanks! Let me review this..."
3. ✅ Loading indicator shows "Reassessing your brief..."
4. ✅ Reassessment API call is made
5. ✅ If complete: "Perfect! I now have everything I need."
6. ✅ Coaching interface fades out after 3 seconds
7. ✅ Table returns to 100% opacity
8. ✅ "Preliminary Results" badge disappears
9. ✅ Toast shows "Brief reassessed with additional context!"

---

### 2. Multiple Missing Gates
**Setup:**
- Submit a brief missing info for G1, G4, and G5

**Expected Behavior:**
1. ✅ Coaching interface appears
2. ✅ Coach message reads: "I have questions across 3 areas:"
3. ✅ Each gate section shows:
   - **Gate Name** (Gate ID)
   - Bulleted questions
   - Blank line separator between gates
4. ✅ All gates are listed in order (G1, G4, G5)

**User Actions:**
1. Provide partial information (answers only G1 and G4)

**Expected Behavior:**
1. ✅ Reassessment runs
2. ✅ New coach message appears with G5 questions only
3. ✅ Previous messages remain visible in thread
4. ✅ User can scroll through conversation history

---

### 3. Keyboard Shortcuts
**User Actions:**
1. Type in textarea
2. Press Cmd+Enter (Mac) or Ctrl+Enter (Windows)

**Expected Behavior:**
1. ✅ Message is sent (same as clicking Send button)
2. ✅ Textarea is cleared
3. ✅ User message appears in thread
4. ✅ Coach response is generated

---

### 4. Empty Input Validation
**User Actions:**
1. Click Send with empty textarea
2. Press Cmd+Enter with whitespace-only input

**Expected Behavior:**
1. ✅ Send button is disabled when textarea is empty
2. ✅ Send button is disabled when textarea has only spaces/newlines
3. ✅ No API call is made
4. ✅ No new messages appear in thread

---

### 5. Visual Animations
**Expected Behavior:**
1. ✅ Coaching interface fades in (opacity 0 → 1)
2. ✅ Coaching interface slides up slightly (y: 10 → 0)
3. ✅ Each message has staggered animation (delay based on index)
4. ✅ Table dims smoothly (300ms transition)
5. ✅ Table scales down smoothly (300ms transition)
6. ✅ All animations use easing functions (not linear)

---

### 6. Message Formatting
**Setup:**
- Coach message contains **bold text** markers

**Expected Behavior:**
1. ✅ Text wrapped in \*\*text\*\* renders as bold
2. ✅ Bold text has proper CSS class (font-semibold text-slate-900)
3. ✅ Regular text renders normally
4. ✅ Multiple bold sections in same message work correctly
5. ✅ Newlines are preserved (whitespace-pre-wrap)

---

### 7. Loading States
**User Actions:**
1. Submit additional context
2. Observe loading state

**Expected Behavior:**
1. ✅ Send button becomes disabled during loading
2. ✅ Textarea input is blocked during loading
3. ✅ Loading message appears at bottom: "⏳ Reassessing your brief..."
4. ✅ Loader icon spins
5. ✅ Loading state clears after reassessment completes

---

### 8. Final Decision (No More Missing Info)
**User Actions:**
1. Provide all required information
2. Reassessment completes with no pending gates

**Expected Behavior:**
1. ✅ Coach message: "Perfect! I now have everything I need. Check out the updated decision above."
2. ✅ Coaching interface remains visible for 3 seconds
3. ✅ Interface fades out smoothly
4. ✅ `showCoachingInterface` state becomes false
5. ✅ Table returns to full opacity
6. ✅ Decision summary appears (not coaching interface)

---

### 9. Immediate Reassessment
**User Actions:**
1. Coaching interface is showing
2. Submit additional context
3. Immediately submit again before reassessment completes

**Expected Behavior:**
1. ✅ Second submission is blocked (disabled button during loading)
2. ✅ No race condition occurs
3. ✅ Messages appear in correct order
4. ✅ State remains consistent

---

### 10. State Persistence
**User Actions:**
1. Coaching interface is active
2. Scroll down to view table
3. Submit additional context
4. Scroll back up

**Expected Behavior:**
1. ✅ Coaching messages remain visible
2. ✅ Scroll position is maintained in coaching thread
3. ✅ Message history doesn't disappear
4. ✅ New messages appear at bottom of thread

---

### 11. Coach Avatar
**Expected Behavior:**
1. ✅ Coach messages show blue circular avatar
2. ✅ Avatar contains "N" (for Naming Coach)
3. ✅ Avatar has white text on blue-600 background
4. ✅ Avatar is 24px × 24px (w-6 h-6)
5. ✅ "Naming Coach" label appears next to avatar
6. ✅ User messages don't show avatar

---

### 12. Initial Brief Submission
**User Actions:**
1. Submit brand new brief with missing info

**Expected Behavior:**
1. ✅ `initializeCoachingInterface()` is called
2. ✅ 100ms delay before showing interface (smooth transition)
3. ✅ Coaching interface appears after evaluation completes
4. ✅ First message is from coach
5. ✅ No user messages in initial thread

---

### 13. Reassessment vs New Evaluation
**Setup:**
1. Submit new brief → coaching interface appears
2. Provide context → reassessment runs

**Expected Behavior:**
1. ✅ First evaluation: coaching interface shows
2. ✅ Reassessment: coaching interface hides (`setShowCoachingInterface(false)`)
3. ✅ Textarea value is cleared after reassessment
4. ✅ Toast notification appears
5. ✅ If still missing info: new coaching interface appears with updated questions
6. ✅ Message thread starts fresh (previous messages cleared)

---

### 14. Preliminary Results Badge
**Expected Behavior:**
1. ✅ Badge appears on Decision Logic Audit when `showCoachingInterface === true`
2. ✅ Badge text: "Preliminary Results"
3. ✅ Badge uses outline variant with slate colors
4. ✅ Badge disappears when coaching interface closes
5. ✅ Badge also appears on Naming Score section (if present)

---

### 15. Mobile/Responsive
**Expected Behavior:**
1. ✅ Message bubbles are max-width 85% (not full width)
2. ✅ Textarea is responsive
3. ✅ Send button is accessible on mobile
4. ✅ Keyboard shortcut hint adapts to platform
5. ✅ Coach avatar and label stack properly

---

### 16. Accessibility
**Expected Behavior:**
1. ✅ Textarea has proper placeholder
2. ✅ Send button has descriptive text
3. ✅ Loading states are announced
4. ✅ Message roles are semantically correct
5. ✅ Keyboard navigation works throughout

---

## Edge Cases

### EC1: No Missing Info
**Setup:**
- Submit complete brief with all info

**Expected Behavior:**
1. ✅ `getMissingInfo().length === 0`
2. ✅ Coaching interface never appears
3. ✅ Decision summary shows instead
4. ✅ Table remains at full opacity

### EC2: All Gates Pending
**Setup:**
- Submit extremely minimal brief (all gates = Pending)

**Expected Behavior:**
1. ✅ Coach message lists all 6 gates
2. ✅ Message is still readable and well-formatted
3. ✅ No UI breakage from long message
4. ✅ Thread is scrollable if needed

### EC3: Very Long User Response
**Setup:**
- Paste 5000 words into textarea

**Expected Behavior:**
1. ✅ Textarea expands to show content
2. ✅ Send button remains accessible
3. ✅ Message bubble handles long content
4. ✅ Message is scrollable in thread
5. ✅ No layout breakage

### EC4: Rapid Clicks
**Setup:**
- Click Send button 10 times rapidly

**Expected Behavior:**
1. ✅ Button disables after first click
2. ✅ Only one message is sent
3. ✅ No duplicate API calls
4. ✅ No duplicate messages in thread

---

## Integration Points

### IP1: API Call
**Verify:**
1. ✅ `runEvaluation(true)` is called with reassessment flag
2. ✅ Brief includes original + additional context
3. ✅ Proper separator: "\n\n--- ADDITIONAL CONTEXT PROVIDED ---\n"
4. ✅ Model selection is preserved

### IP2: State Management
**Verify:**
1. ✅ `additionalContext` state is cleared after successful reassessment
2. ✅ `showCoachingInterface` toggles correctly
3. ✅ `coachingMessages` array updates properly
4. ✅ No memory leaks from event listeners

### IP3: Error Handling
**Setup:**
- Force API error during reassessment

**Expected Behavior:**
1. ✅ Error is caught gracefully
2. ✅ Loading state clears
3. ✅ User can retry
4. ✅ Coach message doesn't show success
5. ✅ Error toast appears

---

## Browser Compatibility

### Chrome/Edge
1. ✅ All animations smooth
2. ✅ Cmd/Ctrl detection works
3. ✅ Framer Motion renders correctly

### Firefox
1. ✅ Border radius renders correctly
2. ✅ Transitions work smoothly
3. ✅ Flexbox layout correct

### Safari
1. ✅ Backdrop blur works (if used)
2. ✅ Transitions don't flicker
3. ✅ Touch events work on iPad

---

## Performance

### P1: Animation Performance
**Measure:**
1. ✅ 60fps during transitions
2. ✅ No layout thrashing
3. ✅ GPU acceleration active

### P2: Re-render Optimization
**Measure:**
1. ✅ Message list only re-renders when messages change
2. ✅ Table doesn't re-render during textarea input
3. ✅ State updates are batched

### P3: Memory
**Measure:**
1. ✅ No memory leaks after multiple reassessments
2. ✅ Event listeners cleaned up
3. ✅ Old messages garbage collected

---

## Manual Testing Checklist

- [ ] Test on macOS with Chrome
- [ ] Test on Windows with Edge
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test keyboard shortcuts on Mac
- [ ] Test keyboard shortcuts on Windows
- [ ] Test with screen reader
- [ ] Test with reduced motion preference
- [ ] Test with very long brief
- [ ] Test with minimal brief
- [ ] Test rapid interactions
- [ ] Test network errors
- [ ] Test slow 3G connection
- [ ] Test with browser dev tools animations panel

---

## Automated Testing (Future)

### Unit Tests
```typescript
describe('generateCoachingMessage', () => {
  it('generates single gate message', () => {});
  it('generates multiple gate message', () => {});
  it('returns empty string when no missing info', () => {});
});

describe('handleCoachingResponse', () => {
  it('adds user message to thread', () => {});
  it('calls runEvaluation with reassessment flag', () => {});
  it('handles empty input', () => {});
});
```

### Integration Tests
```typescript
describe('Coaching Interface', () => {
  it('shows after evaluation with missing info', () => {});
  it('hides after complete reassessment', () => {});
  it('handles multiple reassessment cycles', () => {});
});
```

### E2E Tests
```typescript
describe('User Journey', () => {
  it('completes full coaching conversation', () => {});
  it('handles keyboard shortcuts', () => {});
  it('maintains state through interactions', () => {});
});
```
