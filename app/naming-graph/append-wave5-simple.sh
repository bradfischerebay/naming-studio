#!/bin/bash
# Simple append of Wave 5 items

# Remove the closing ]; from original file
head -n -1 enriched-consolidated-DEDUPLICATED.ts > /tmp/base.ts

# Add comma after last item
echo "," >> /tmp/base.ts

# Extract just the array items from Wave 5 (skip interface definition and export line)
sed -n '/export const WAVE5_RESEARCH_ITEMS/,${
  /export const WAVE5_RESEARCH_ITEMS/d
  /^\[/d
  /^\]/d
  p
}' enriched-wave5-research-items.ts >> /tmp/base.ts

# Add closing bracket and semicolon
echo "];" >> /tmp/base.ts

# Move to merged file
mv /tmp/base.ts enriched-consolidated-DEDUPLICATED-MERGED.ts

echo "✅ Merged! Check enriched-consolidated-DEDUPLICATED-MERGED.ts"
wc -l enriched-consolidated-DEDUPLICATED-MERGED.ts
