# Conversation Flow Example

## Scenario: User submits brief missing info for G1 and G4

---

## Step 1: Initial Evaluation Complete

```
┌────────────────────────────────────────────────────────────┐
│  ✅  Proper Name Recommended                               │
│                                                             │
│  Decision cannot be completed yet                          │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  I've reviewed your brief, but I need a bit more       │ │
│  │  information to make a final decision. I have          │ │
│  │  questions across 2 areas:                             │ │
│  │                                                         │ │
│  │  Integration Level (G1):                               │ │
│  │  • Confirm the primary user entry point (standalone   │ │
│  │    vs. embedded)                                       │ │
│  │  • Clarify whether users must enroll, apply, or be    │ │
│  │    approved separately                                 │ │
│  │  • Confirm whether checkout is distinct or uses       │ │
│  │    standard platform checkout                          │ │
│  │                                                         │ │
│  │  Portfolio Alignment (G4):                             │ │
│  │  • Identify any existing eBay products that might     │ │
│  │    conflict with this name                             │ │
│  │  • Confirm positioning relative to existing portfolio │ │
│  │                                                         │ │
│  │  Just paste any additional details you have, and I'll │ │
│  │  reassess your brief.                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Paste any additional details about your product      │ │
│  │  here...                                               │ │
│  │                                                         │ │
│  │  Example:                                              │ │
│  │  The experience has a standalone entry point at...    │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  Press ⌘+Enter to send                    [   Send →   ]  │
└────────────────────────────────────────────────────────────┘
```

**User sees:**
- Clean chat interface
- Coach avatar and identity
- Natural language questions
- Clear example
- Keyboard shortcut hint

---

## Step 2: User Types Response

**User types:**
```
The experience has a standalone entry point at ebay.com/newfeature.
Users must complete a separate enrollment form to access the feature.
Checkout uses the standard eBay checkout flow.

This doesn't conflict with any existing eBay products - it's a 
brand new category we're launching.
```

**User presses:** Cmd+Enter

---

## Step 3: Message Sent, Processing

```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  I've reviewed your brief, but I need a bit more...   │ │
│  │  [previous message truncated for space]                │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│                   ┌────────────────────────────────────┐   │
│                   │  The experience has a standalone    │   │
│                   │  entry point at ebay.com/newfeature.│   │
│                   │  Users must complete a separate     │   │
│                   │  enrollment form to access the      │   │
│                   │  feature. Checkout uses the         │   │
│                   │  standard eBay checkout flow.       │   │
│                   │                                      │   │
│                   │  This doesn't conflict with any     │   │
│                   │  existing eBay products - it's a    │   │
│                   │  brand new category we're launching.│   │
│                   └────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  Thanks! Let me review this additional information    │ │
│  │  and reassess your brief...                            │ │
│  │                                                         │ │
│  │  ⏳ Reassessing your brief...                         │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**Animation sequence:**
1. User message slides in from right (200ms)
2. Coach processing message fades in (200ms delay)
3. Spinner appears
4. Input area is disabled

---

## Step 4A: Reassessment Complete - All Info Provided

```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  I've reviewed your brief, but I need a bit more...   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│                   ┌────────────────────────────────────┐   │
│                   │  The experience has a standalone... │   │
│                   │  [user message truncated]           │   │
│                   └────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  Thanks! Let me review this additional information... │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  Perfect! I now have everything I need. Check out the │ │
│  │  updated decision above.                               │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘

[Interface fades out after 3 seconds]

Toast notification: "Brief reassessed with additional context!"
```

**Result:**
- Final success message
- Clear instruction to check decision
- Interface auto-hides
- Success toast
- Table returns to full opacity
- "Preliminary Results" badge disappears

---

## Step 4B: Reassessment Complete - Still Missing Info

```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  I've reviewed your brief, but I need a bit more...   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│                   ┌────────────────────────────────────┐   │
│                   │  The experience has a standalone... │   │
│                   └────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  Thanks! Let me review this additional information... │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  Thanks for that information! I still need a bit more │ │
│  │  clarity on Strategic Lifespan:                        │ │
│  │                                                         │ │
│  │  Strategic Lifespan (G3):                              │ │
│  │  • Confirm the strategic timeline (permanent >12      │ │
│  │    months vs. short-term)                              │ │
│  │  • Provide launch timeline and market rollout plan    │ │
│  │                                                         │ │
│  │  Just paste any additional details you have, and I'll │ │
│  │  reassess your brief.                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  Paste any additional details...                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  Press ⌘+Enter to send                    [   Send →   ]  │
└────────────────────────────────────────────────────────────┘
```

**Result:**
- New coach message with remaining questions
- Conversation thread preserved
- Input area re-enabled
- User can continue dialogue
- Progress is visible in thread

---

## Step 5: Multiple Reassessment Cycles

**Complete conversation thread:**

```
┌────────────────────────────────────────────────────────────┐
│  [Scrollable conversation history]                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │  I've reviewed your brief, but I need a bit more...   │ │
│  │  [G1 and G4 questions]                                 │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│                   ┌────────────────────────────────────┐   │
│                   │  [User's first response about G1   │   │
│                   │   and G4]                           │   │
│                   └────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │  Thanks! Let me review...                              │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │  Thanks for that! I still need clarity on G3...        │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│                   ┌────────────────────────────────────┐   │
│                   │  [User's second response about G3]  │   │
│                   └────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │  Perfect! I now have everything I need.                │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**User experience:**
- Clear conversation history
- Progress is visible
- Each exchange is documented
- Natural back-and-forth dialogue
- No lost context

---

## Key UX Moments

### 1. First Coach Message
**Tone:** Professional but approachable
```
"I've reviewed your brief, but I need a bit more information 
to make a final decision."
```
- Uses "I" and "your" (personal)
- Acknowledges work done ("reviewed")
- Explains why ("to make a final decision")

### 2. Presenting Questions
**Organized by context:**
```
Integration Level (G1):
• Question 1
• Question 2

Portfolio Alignment (G4):
• Question 1
• Question 2
```
- Gate name first, ID in parentheses
- Bulleted for scannability
- Grouped logically

### 3. Closing with Action
**Clear next step:**
```
"Just paste any additional details you have, and I'll 
reassess your brief."
```
- Low barrier ("just paste")
- Any format accepted ("additional details")
- Clear outcome ("reassess your brief")

### 4. Processing Acknowledgment
**Immediate feedback:**
```
"Thanks! Let me review this additional information and 
reassess your brief..."
```
- Gratitude ("Thanks!")
- Transparent process ("review... reassess")
- Shows work is happening

### 5. Completion Message
**Celebratory tone:**
```
"Perfect! I now have everything I need. Check out the 
updated decision above."
```
- Positive reinforcement ("Perfect!")
- Closure ("everything I need")
- Direction ("Check out... above")

---

## Animation Timeline

### Message Entrance
```
0ms   - Message starts invisible (opacity: 0, y: 5)
200ms - Message fades in and slides up (opacity: 1, y: 0)
```

### Staggered Messages
```
0ms   - Message 1 starts
100ms - Message 1 complete, Message 2 starts
200ms - Message 2 complete, Message 3 starts
300ms - Message 3 complete
```

### Interface Transition
```
0ms   - Coaching interface triggered
100ms - Interface appears (opacity: 0 → 1, y: 10 → 0)
400ms - Animation complete
```

### Table Dimming
```
0ms   - showCoachingInterface becomes true
300ms - Table opacity: 1 → 0.6, scale: 1 → 0.98
```

### Interface Exit
```
0ms   - Final message appears
3000ms - Interface starts fading out
3300ms - Interface completely hidden
```

---

## Responsive Behavior

### Desktop (>1024px)
- Message bubbles max-width: 85%
- Coaching thread max-height: 500px
- Full keyboard shortcuts
- Hover states on buttons

### Tablet (768px - 1024px)
- Message bubbles max-width: 90%
- Coaching thread max-height: 400px
- Touch-optimized buttons
- Larger tap targets

### Mobile (<768px)
- Message bubbles max-width: 95%
- Coaching thread max-height: 300px
- Simplified keyboard hint
- Full-width send button

---

## Accessibility Features

### Screen Reader Announcements
```
"Naming Coach says: I've reviewed your brief..."
"You said: The experience has a standalone..."
"Naming Coach says: Perfect! I now have everything I need."
```

### Keyboard Navigation
- Tab through messages
- Focus on textarea
- Tab to Send button
- Enter to submit (when focused)
- Cmd+Enter from anywhere

### Visual Indicators
- Focus rings on interactive elements
- Clear button states (enabled/disabled)
- Loading spinner with text
- Color contrast meets WCAG AA

---

## Error Handling

### Network Error During Reassessment
```
┌────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────┐ │
│  │  [N] Naming Coach                                      │ │
│  │                                                         │ │
│  │  ⚠️ Hmm, something went wrong while reassessing your  │ │
│  │  brief. Please try again.                              │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  [Input area re-enabled]                                   │
│  Press ⌘+Enter to send                    [   Send →   ]  │
└────────────────────────────────────────────────────────────┘

Toast notification: "Evaluation failed - please try again"
```

### Empty Input Attempt
- Send button remains disabled
- No error message shown
- Textarea shows placeholder
- Keyboard shortcut doesn't trigger

---

## Real-World Example

### Original Brief (Missing Info)
```
We're launching a new checkout experience for high-value items.
Users will see a premium checkout flow with white-glove service.
```

### Coach's First Message
```
I've reviewed your brief, but I need a bit more information to 
make a final decision. I have questions across 3 areas:

Integration Level (G1):
• Confirm the primary user entry point (standalone vs. embedded)
• Clarify whether users must enroll, apply, or be approved separately
• Confirm whether checkout is distinct or uses standard platform checkout

UX & Service Boundary (G2):
• Confirm whether this is a separate destination or embedded module
• Clarify the system architecture and backend boundaries

Strategic Lifespan (G3):
• Confirm the strategic timeline (permanent >12 months vs. short-term)
• Provide launch timeline and market rollout plan

Just paste any additional details you have, and I'll reassess your brief.
```

### User's Response
```
This is accessed through the existing checkout flow, not a separate 
entry point. When an item is over $1000, users automatically see this 
premium experience.

It's a permanent feature launching in Q2 2024 across all markets. 
Backend uses the same checkout service but with enhanced validation 
rules.
```

### Coach's Final Message
```
Perfect! I now have everything I need. Check out the updated decision above.
```

---

## Summary

The conversational coaching interface transforms what was a **form-filling chore** into a **guided dialogue**. Users now experience:

1. **Clear guidance** from a knowledgeable coach
2. **Natural language** instead of technical jargon
3. **Progressive disclosure** of information needs
4. **Visual progress** through conversation thread
5. **Immediate feedback** at every step

The result is a **friction-free experience** that feels professional, modern, and human-centered.
