// Quick script to find ALL unenriched programs for Wave 4
import * as fs from 'fs';

const translationsContent = fs.readFileSync('translations.ts', 'utf-8');
const enrichedContent = fs.readFileSync('enriched-consolidated-DEDUPLICATED.ts', 'utf-8');

// Extract all program names from translations.ts
const translationMatches = translationsContent.matchAll(/'([^']+)':\s*{/g);
const allPrograms = Array.from(translationMatches).map(m => m[1]);

// Extract all enriched IDs
const enrichedMatches = enrichedContent.matchAll(/"id":\s*"([^"]+)"/g);
const enrichedIds = new Set(Array.from(enrichedMatches).map(m => m[1]));

// Find unenriched (simple name-to-id matching)
const unenriched = allPrograms.filter(name => {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return !enrichedIds.has(id);
});

console.log(`Total programs: ${allPrograms.length}`);
console.log(`Enriched: ${enrichedIds.size}`);
console.log(`Remaining: ${unenriched.length}`);
console.log(`\nFirst 50 unenriched programs:\n`);
unenriched.slice(0, 50).forEach((p, i) => console.log(`${i+1}. ${p}`));
