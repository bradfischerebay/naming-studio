# Technical Gaps Fix Summary

## Date: April 2, 2026

## Fixed Gaps

### Gap 4: Enhanced Messy Table Parsing
**Location:** `/Users/bradfischer/naming-studio/lib/prompts/parse-brief.ts`

**Changes Made:**
1. Added explicit instruction to strip helper text from headers (e.g., "Timing Please provide the date..." → just capture the date)
2. Enhanced multi-line list consolidation logic with specific example:
   - Bad: "Initial Name Ideas\nName 1\nName 2\nName 3" (20 lines)
   - Good: "Name 1, Name 2, Name 3" (consolidated)
3. Added new section "HANDLE MESSY FORMATS" covering:
   - CSV-like rows: "Field,Value,Field,Value"
   - Quote-separated text with excessive quotes
   - Multi-line lists spanning 20+ lines
4. Enhanced smart field matching to use semantic understanding, not just position

**Implementation Details:**
- Updated the CRITICAL PARSING STRATEGY section with 4 numbered steps
- Added concrete examples showing before/after transformations
- Maintained backward compatibility with existing brief parsing

### Gap 5: Timing → Longevity Calculation
**Location:** `/Users/bradfischer/naming-studio/lib/prompts/extract-facts.ts`

**Changes Made:**
1. Added current date context (April 2026) for accurate duration calculations
2. Implemented timing inference rules:
   - Specific date ranges → calculate actual duration
   - Launch date with no duration + strategic context → assume 24 months
   - Infrastructure/platform/strategic/permanent → 24 months
   - Campaign/promo/seasonal → require explicit end dates (null if missing)
3. Added 6 concrete examples in the prompt:
   - "Launch Q2 2026" → longevity_months: 24 (assumed permanent)
   - "June-August 2026" → longevity_months: 3 (explicit range)
   - "Permanent feature" → longevity_months: 24
   - "Summer promo" → longevity_months: null (need explicit dates)
   - "Q2 2026" or future date without context → longevity_months: 24
   - Text says "permanent", "long-term", "strategic" → longevity_months: 24

**Implementation Details:**
- Enhanced the LONGEVITY section (rule #4) with comprehensive timing inference logic
- Added TIMING INFERENCE EXAMPLES subsection for LLM guidance
- Maintains backward compatibility with existing fact extraction

## Source Documentation
Both fixes were implemented according to specifications in:
- Steps 333-373: Brief parsing strategy (Naming-Flow-with-prompts.md)
- Steps 556-559: Timing inference logic (Naming-Flow-with-prompts.md)

## Testing Recommendations
1. Test parse-brief.ts with messy Google Docs exports containing:
   - Multi-line name lists (20+ lines)
   - Headers with helper text
   - CSV-like formatting
   - Quote-wrapped values
2. Test extract-facts.ts with various timing formats:
   - Explicit date ranges
   - Launch dates without duration
   - Strategic/infrastructure language
   - Campaign/promo language
   - Permanent/long-term keywords

## Files Modified
- `/Users/bradfischer/naming-studio/lib/prompts/parse-brief.ts`
- `/Users/bradfischer/naming-studio/lib/prompts/extract-facts.ts`

No changes needed to `/Users/bradfischer/naming-studio/lib/modules/extractor.ts` as the logic is entirely prompt-driven.
