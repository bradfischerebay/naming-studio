#!/bin/bash
# Extract graph nodes to clean JSON using sed

# Skip header comments and interface, extract array content
sed -n '/^export const ENRICHED_PROGRAMS/,/^\];$/p' enriched-consolidated-944-nodes.ts | \
  sed '1d' | \
  sed '$d' | \
  sed 's/^\[//' | \
  sed 's/\];//' > /tmp/nodes-content.txt

# Convert TypeScript object syntax to JSON
# Replace unquoted keys with quoted keys
sed -E 's/^([[:space:]]*)([a-zA-Z_][a-zA-Z0-9_]*):/\1"\2":/' /tmp/nodes-content.txt | \
  sed "s/'/\"/g" > /tmp/nodes-almost-json.txt

# Wrap in array brackets
echo '[' > graph-nodes-clean.json
cat /tmp/nodes-almost-json.txt >> graph-nodes-clean.json
echo ']' >> graph-nodes-clean.json

# Test if valid JSON
if jq -e 'type' graph-nodes-clean.json > /dev/null 2>&1; then
  echo "✅ Created valid JSON with $(jq 'length' graph-nodes-clean.json) nodes"
else
  echo "❌ JSON is invalid, trying alternate method..."
  # Use Node.js to safely extract
  node -e "
    const fs = require('fs');
    const content = fs.readFileSync('enriched-wave5-research-items.ts', 'utf-8');
    const items = eval(content.match(/export const WAVE5_RESEARCH_ITEMS.*?=\s*(\[[\s\S]*?\]);/m)[1]);
    fs.writeFileSync('wave5-items.json', JSON.stringify(items, null, 2));
  "
  echo "✅ Extracted Wave 5 items to wave5-items.json"
fi
