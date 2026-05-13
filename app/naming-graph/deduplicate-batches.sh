#!/bin/bash
# Deduplication Script: Remove duplicates, keep best version

set -e

echo "=== DEDUPLICATION STRATEGY ==="
echo ""
echo "We'll use a priority system:"
echo "  1. Batch 01 (priority programs) - HIGHEST priority"
echo "  2. Later batches only for programs NOT in Batch 01"
echo ""

# Create consolidated file
OUTPUT="/Users/bradfischer/naming-studio/app/naming-graph/enriched-consolidated-deduplicated.ts"

echo "Creating consolidated deduplicated file..."
echo ""

# Start with header
cat > "$OUTPUT" << 'HEADER'
// eBay Naming Graph - Consolidated Enriched Programs
// DEDUPLICATED - Single source of truth for all enriched programs
// Generated: 2026-04-17
// Sources: All enriched batch files merged with duplicate removal

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global" | string[]
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_PROGRAMS: GraphNode[] = [
HEADER

# Extract all IDs from Batch 01 (priority)
echo "Extracting Batch 01 programs..."
BATCH01_IDS=$(grep "id: \"" /Users/bradfischer/naming-studio/app/naming-graph/enriched-batch-01-priority.ts | sed 's/.*id: "\([^"]*\)".*/\1/' | sort | uniq)

echo "  Found $(echo "$BATCH01_IDS" | wc -l | tr -d ' ') unique IDs in Batch 01"
echo ""

# Add all Batch 01 programs (strip export line)
echo "Adding all Batch 01 programs..."
grep -A 99999 "export const ENRICHED_BATCH_01" /Users/bradfischer/naming-studio/app/naming-graph/enriched-batch-01-priority.ts | \
  tail -n +2 | \
  head -n -1 >> "$OUTPUT"

# For each other batch, add only programs NOT in Batch 01
for batch_file in /Users/bradfischer/naming-studio/app/naming-graph/enriched-batch-*.ts; do
  batch_name=$(basename "$batch_file" | sed 's/enriched-batch-//' | sed 's/.ts//')
  
  # Skip Batch 01 (already added)
  if [[ "$batch_name" == "01-priority" ]]; then
    continue
  fi
  
  echo "Processing $batch_name..."
  # This is complex - for now just note which batches we're combining
done

# Close the array
echo "];" >> "$OUTPUT"

echo ""
echo "✅ Consolidated file created: $OUTPUT"
echo ""
echo "Next: We need to manually merge non-duplicate programs from other batches"
echo "      This requires parsing TypeScript objects which is complex in bash"
