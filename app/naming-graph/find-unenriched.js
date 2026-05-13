// Find programs in translations.ts not yet in enriched-consolidated-DEDUPLICATED.ts

const fs = require('fs');

// Read the enriched file and extract all IDs
const enrichedContent = fs.readFileSync('enriched-consolidated-DEDUPLICATED.ts', 'utf8');
const enrichedIds = new Set();
const idMatches = enrichedContent.matchAll(/"id":\s*"([^"]+)"/g);
for (const match of idMatches) {
  enrichedIds.add(match[1]);
}

console.log(`Found ${enrichedIds.size} enriched program IDs`);

// Read translations.ts and extract program keys
const translationsContent = fs.readFileSync('translations.ts', 'utf8');
const programKeys = [];

// Match program keys: lines starting with '  ' followed by a quote
const keyMatches = translationsContent.matchAll(/^  '([^']+)':\s*{/gm);
for (const match of keyMatches) {
  programKeys.push(match[1]);
}

console.log(`Found ${programKeys.length} program keys in translations.ts`);

// Convert program key to ID format (lowercase, replace spaces/special chars with hyphens)
function toId(key) {
  return key
    .toLowerCase()
    .replace(/[&+]/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Find unenriched programs
const unenriched = [];
const seen = new Set();

for (const key of programKeys) {
  const id = toId(key);

  // Skip duplicates (translations.ts has some duplicates)
  if (seen.has(id)) continue;
  seen.add(id);

  // Check if not enriched
  if (!enrichedIds.has(id)) {
    unenriched.push({ key, id });
  }
}

console.log(`\nFound ${unenriched.length} unenriched programs`);
console.log(`\nFirst 60 unenriched programs:\n`);

for (let i = 0; i < Math.min(60, unenriched.length); i++) {
  console.log(`${i + 1}. ${unenriched[i].key} → ${unenriched[i].id}`);
}

// Save to file for reference
fs.writeFileSync('/tmp/unenriched-programs.json', JSON.stringify(unenriched, null, 2));
console.log(`\nSaved full list to /tmp/unenriched-programs.json`);
