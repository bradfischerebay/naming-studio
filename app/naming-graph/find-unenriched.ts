// Script to find ALL programs from translations.ts NOT in enriched-consolidated-DEDUPLICATED.ts
// This will identify the remaining programs that need enrichment

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const translationsPath = join(__dirname, 'translations.ts');
const enrichedPath = join(__dirname, 'enriched-consolidated-DEDUPLICATED.ts');

const translationsContent = readFileSync(translationsPath, 'utf-8');
const enrichedContent = readFileSync(enrichedPath, 'utf-8');

// Extract program names from translations.ts
const translationRegex = /^  '([^']+)':\s*\{/gm;
const translationPrograms = new Set<string>();
let match;
while ((match = translationRegex.exec(translationsContent)) !== null) {
  translationPrograms.add(match[1]);
}

// Extract IDs from enriched file and map back to program names
// IDs use kebab-case, so we need to handle the conversion
const enrichedRegex = /"id":\s*"([^"]+)"/g;
const enrichedIds = new Set<string>();
let enrichedMatch;
while ((enrichedMatch = enrichedRegex.exec(enrichedContent)) !== null) {
  enrichedIds.add(enrichedMatch[1]);
}

// Helper to convert program name to likely kebab-case ID
function toKebabCase(name: string): string {
  return name
    .toLowerCase()
    .replace(/[®™©]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[()]/g, '')
    .replace(/&/g, 'and')
    .replace(/'/g, '')
    .replace(/[\/]/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Find unenriched programs
const unenriched: string[] = [];
const alreadyEnriched: string[] = [];

Array.from(translationPrograms).forEach(program => {
  const kebabId = toKebabCase(program);
  if (enrichedIds.has(kebabId)) {
    alreadyEnriched.push(program);
  } else {
    unenriched.push(program);
  }
});

console.log('\n=== ENRICHMENT STATUS ===\n');
console.log(`Total programs in translations.ts: ${translationPrograms.size}`);
console.log(`Already enriched: ${alreadyEnriched.length}`);
console.log(`Remaining unenriched: ${unenriched.length}`);
console.log(`\nCoverage: ${((alreadyEnriched.length / translationPrograms.size) * 100).toFixed(1)}%`);

console.log('\n=== REMAINING UNENRICHED PROGRAMS ===\n');

// Group by first 100, second 100, etc.
const batchSize = 100;
for (let i = 0; i < unenriched.length; i += batchSize) {
  const batchNum = Math.floor(i / batchSize) + 1;
  const batch = unenriched.slice(i, i + batchSize);
  console.log(`\n--- Batch ${batchNum} (${batch.length} programs) ---`);
  batch.forEach((prog, idx) => {
    console.log(`${i + idx + 1}. ${prog}`);
  });
}

// Write to file for reference
const outputPath = join(__dirname, 'UNENRICHED-PROGRAMS.txt');
const output = [
  '=== UNENRICHED PROGRAMS ===',
  `Total: ${unenriched.length}`,
  `Date: ${new Date().toISOString().split('T')[0]}`,
  '',
  ...unenriched.map((prog, idx) => `${idx + 1}. ${prog}`)
].join('\n');

writeFileSync(outputPath, output, 'utf-8');
console.log(`\n\n✅ Full list written to: ${outputPath}\n`);
