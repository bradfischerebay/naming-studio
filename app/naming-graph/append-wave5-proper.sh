#!/bin/bash

# Get all lines except the last one (which is ];)
awk 'NR==1,/^\];$/{if (!/^\];$/) print}' enriched-consolidated-DEDUPLICATED.ts > /tmp/base.ts

# Add comma
echo "," >> /tmp/base.ts

# Extract Wave 5 items (between [ and ])
sed -n '/export const WAVE5_RESEARCH_ITEMS.*\[/,/^\]/{ 
  /export const WAVE5_RESEARCH_ITEMS/d
  /^\[$/d
  /^\]$/d
  p
}' enriched-wave5-research-items.ts >> /tmp/base.ts

# Add closing
echo "];" >> /tmp/base.ts

mv /tmp/base.ts enriched-consolidated-DEDUPLICATED-MERGED.ts

wc -l enriched-consolidated-DEDUPLICATED*
