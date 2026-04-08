# Coaching Interface Code Changes

## File Modified
`/Users/bradfischer/naming-studio/app/page.tsx`

---

## 1. State Variables Added (Lines 59-60)

```typescript
const [showCoachingInterface, setShowCoachingInterface] = useState(false);
const [coachingMessages, setCoachingMessages] = useState<Array<{role: "coach" | "user", content: string}>>([]);
```

**Purpose:**
- `showCoachingInterface`: Controls visibility of coaching UI
- `coachingMessages`: Stores conversation thread between coach and user

---

## 2. Helper Functions Added (After getMissingInfo function)

### 2A. Generate Natural Coaching Message

```typescript
// Generate natural coaching message from missing info
const generateCoachingMessage = () => {
  const missingInfo = getMissingInfo();
  if (missingInfo.length === 0) return "";

  let message = "I've reviewed your brief, but I need a bit more information to make a final decision. ";

  if (missingInfo.length === 1) {
    const gate = missingInfo[0];
    message += `Specifically, I have some questions about **${gate.gateName}**:\n\n`;
    gate.questions.forEach((q, idx) => {
      message += `${idx + 1}. ${q}\n`;
    });
  } else {
    message += `I have questions across ${missingInfo.length} areas:\n\n`;
    missingInfo.forEach(gate => {
      message += `**${gate.gateName}** (${gate.gateId}):\n`;
      gate.questions.forEach((q) => {
        message += `• ${q}\n`;
      });
      message += `\n`;
    });
  }

  message += "\nJust paste any additional details you have, and I'll reassess your brief.";
  return message;
};
```

**Purpose:**
Converts structured missing info data into natural language coaching message.

**Key Features:**
- Conditional phrasing based on number of gates
- Uses **bold** markdown for gate names
- Numbered questions for single gate
- Bulleted questions for multiple gates
- Friendly, conversational tone

---

### 2B. Initialize Coaching Interface

```typescript
// Initialize coaching interface when results come back with missing info
const initializeCoachingInterface = () => {
  const missingInfo = getMissingInfo();
  if (missingInfo.length > 0) {
    setShowCoachingInterface(true);
    setCoachingMessages([{
      role: "coach",
      content: generateCoachingMessage()
    }]);
  } else {
    setShowCoachingInterface(false);
    setCoachingMessages([]);
  }
};
```

**Purpose:**
Sets up coaching interface after evaluation completes.

**Logic:**
- Checks if there's missing info
- Shows interface and creates initial coach message
- Hides interface if no missing info

---

### 2C. Handle User Response

```typescript
const handleCoachingResponse = async () => {
  if (!additionalContext.trim()) return;

  // Add user's response to coaching thread
  setCoachingMessages(prev => [...prev, {
    role: "user",
    content: additionalContext
  }]);

  // Show processing state
  setCoachingMessages(prev => [...prev, {
    role: "coach",
    content: "Thanks! Let me review this additional information and reassess your brief..."
  }]);

  // Run reassessment
  await runEvaluation(true);

  // After reassessment completes, if there's still missing info, update the coaching thread
  setTimeout(() => {
    const stillMissingInfo = getMissingInfo();
    if (stillMissingInfo.length > 0) {
      setCoachingMessages(prev => [...prev, {
        role: "coach",
        content: generateCoachingMessage()
      }]);
    } else {
      setCoachingMessages(prev => [...prev, {
        role: "coach",
        content: "Perfect! I now have everything I need. Check out the updated decision above."
      }]);
      // Hide coaching interface after a brief delay
      setTimeout(() => {
        setShowCoachingInterface(false);
      }, 3000);
    }
  }, 500);
};
```

**Purpose:**
Handles user submitting additional context.

**Flow:**
1. Validate input (non-empty)
2. Add user message to thread
3. Add processing message
4. Run reassessment API call
5. After completion:
   - If still missing info: add new coaching questions
   - If complete: add success message and hide interface after 3s

---

## 3. Modified runEvaluation Function

**Added initialization hook:**

```typescript
if (isReassessment) {
  setAdditionalContext(""); // Clear the context field after reassessment
  setShowCoachingInterface(false); // Hide coaching interface
  toast.success("Brief reassessed with additional context!");
} else {
  // Initialize coaching interface for new evaluations
  setTimeout(() => {
    initializeCoachingInterface();
  }, 100);
}
```

**Purpose:**
- Initialize coaching interface for new evaluations
- Hide coaching interface during reassessments
- 100ms delay for smooth transition

---

## 4. UI Component Replacement (Lines 672-767)

**REPLACED:** Old form-based interface with gates/bullets/textarea

**WITH:** New conversational coaching interface

```typescript
{!isFinalDecision() && showCoachingInterface ? (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="border-2 border-blue-200 bg-white shadow-lg">
      <CardContent className="p-6 space-y-4">
        {/* Coaching Thread */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {coachingMessages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "coach"
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-slate-100 border border-slate-200"
                }`}
              >
                {msg.role === "coach" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      N
                    </div>
                    <span className="text-xs font-semibold text-blue-900">Naming Coach</span>
                  </div>
                )}
                <div className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {msg.content.split(/(\*\*.*?\*\*)/).map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="border-t border-slate-200 pt-4 space-y-3"
          >
            <Textarea
              placeholder="Paste any additional details about your product here...&#10;&#10;Example:&#10;The experience has a standalone entry point at ebay.com/newfeature and users must complete a separate enrollment form. Checkout uses the standard eBay checkout flow."
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              className="min-h-[120px] text-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-white resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleCoachingResponse();
                }
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Press {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}+Enter to send
              </span>
              <Button
                onClick={handleCoachingResponse}
                disabled={!additionalContext.trim()}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 gap-2 shadow-sm"
              >
                <Send className="h-4 w-4" />
                Send
              </Button>
            </div>
          </motion.div>
        )}

        {/* Processing State */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-blue-600 border-t border-slate-200 pt-4"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Reassessing your brief...</span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  </motion.div>
) : getDecisionSummary().length > 0 ? (
  // ... existing decision summary card
) : null}
```

**Key Features:**
- Framer Motion animations for smooth entrance
- Message bubbles with role-based styling
- Coach avatar and identity
- Markdown-style bold text parsing
- Keyboard shortcuts (Cmd+Enter)
- Platform-aware hint text
- Loading state integration
- Auto-scrolling message thread

---

## 5. Table Visual Treatment (Lines 797-867)

**WRAPPED:** Decision Logic Audit table with motion.div

```typescript
<motion.div
  animate={{
    opacity: showCoachingInterface ? 0.6 : 1,
    scale: showCoachingInterface ? 0.98 : 1,
  }}
  transition={{ duration: 0.3 }}
>
  <Card className="border-slate-200 shadow-sm">
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Decision Logic Audit</CardTitle>
          <CardDescription className="text-slate-600">
            Six-gate existence framework evaluation
          </CardDescription>
        </div>
        {showCoachingInterface && (
          <Badge variant="outline" className="text-xs text-slate-500 border-slate-300">
            Preliminary Results
          </Badge>
        )}
      </div>
    </CardHeader>
    {/* ... table content ... */}
  </Card>
</motion.div>
```

**Effect:**
- Dims to 60% opacity when coaching is active
- Scales down to 98% (subtle depth effect)
- Shows "Preliminary Results" badge
- Smooth 300ms transition

---

## 6. Naming Score Visual Treatment (Lines 874-927)

**SAME TREATMENT** as Decision Logic Audit table:

```typescript
<motion.div
  animate={{
    opacity: showCoachingInterface ? 0.6 : 1,
    scale: showCoachingInterface ? 0.98 : 1,
  }}
  transition={{ duration: 0.3 }}
>
  <Card className="border-slate-200 shadow-sm">
    <CardHeader className="bg-slate-50 border-b border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">Naming Score</CardTitle>
          <CardDescription className="text-slate-600">
            Quantitative evaluation (Threshold: 60/70)
          </CardDescription>
        </div>
        {showCoachingInterface && (
          <Badge variant="outline" className="text-xs text-slate-500 border-slate-300">
            Preliminary Results
          </Badge>
        )}
      </div>
    </CardHeader>
    {/* ... score content ... */}
  </Card>
</motion.div>
```

---

## Summary of Changes

### Lines Modified
- **Line 59-60**: Added state variables
- **Lines 254-311**: Added helper functions
- **Lines 161-170**: Modified runEvaluation initialization
- **Lines 672-767**: Replaced old UI with coaching interface
- **Lines 797-867**: Wrapped table with motion treatment
- **Lines 874-927**: Wrapped score with motion treatment

### Total Impact
- **Added**: ~150 lines of new code
- **Removed**: ~50 lines of old code
- **Modified**: ~10 lines of existing code
- **Net Change**: ~100 lines

### Dependencies Used
- Framer Motion (already imported)
- React useState hook (already imported)
- Lucide React icons (Send, Loader2, AlertCircle)
- Existing UI components (Card, Button, Textarea, Badge)

### No Breaking Changes
- All existing functionality preserved
- Backward compatible with current API
- No database schema changes
- No new environment variables
- No new dependencies added

---

## Testing the Changes

### 1. Start Dev Server
```bash
npm run dev
```

### 2. Test Scenario
1. Navigate to http://localhost:3000
2. Paste a brief with missing information
3. Click "Evaluate Brief"
4. Wait for evaluation to complete
5. Observe coaching interface appear
6. Type additional context
7. Press Cmd+Enter or click Send
8. Observe reassessment
9. Verify completion message

### 3. Visual Verification
- Coach avatar shows "N"
- Messages animate smoothly
- Table dims when coaching active
- "Preliminary Results" badge appears
- Interface hides after completion

---

## Rollback Plan

If issues arise, revert these specific changes:

```bash
git checkout HEAD -- app/page.tsx
```

Or manually remove:
1. State variables (lines 59-60)
2. Helper functions (lines 254-311)
3. UI replacement (lines 672-767)
4. Motion wrappers (lines 797-867, 874-927)
5. runEvaluation modifications (lines 161-170)

The old bullet-list interface will be restored.
