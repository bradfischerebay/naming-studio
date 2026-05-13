// Find ALL unenriched programs by comparing translations.ts with all enriched files
import * as fs from 'fs';
import * as path from 'path';

const translationsPath = './translations.ts';
const enrichedFiles = [
  './enriched-consolidated-DEDUPLICATED.ts',
  ...fs.readdirSync('.').filter(f => f.startsWith('enriched-wave'))
];

console.log(`\nScanning ${enrichedFiles.length} enriched files...\n`);

// Extract all program names from translations.ts
const translationsContent = fs.readFileSync(translationsPath, 'utf-8');
const programMatches = translationsContent.matchAll(/'([^']+)':\s*{/g);
const allPrograms = Array.from(programMatches).map(m => m[1]);

console.log(`Total programs in translations.ts: ${allPrograms.length}`);

// Extract all enriched IDs from all files
const enrichedIds = new Set<string>();

for (const file of enrichedFiles) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    const idMatches = content.matchAll(/(?:id:\s*["`']|"id":\s*")([^"`']+)["`']/g);
    Array.from(idMatches).forEach(m => enrichedIds.add(m[1]));
  }
}

console.log(`Total enriched IDs found: ${enrichedIds.size}\n`);

// Find unenriched programs
const unenriched = allPrograms.filter(name => {
  // Convert name to potential ID formats
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const idAlt = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return !enrichedIds.has(id) && !enrichedIds.has(idAlt) && !enrichedIds.has(name.toLowerCase());
});

console.log(`🎯 UNENRICHED PROGRAMS: ${unenriched.length}\n`);
console.log('=' .repeat(80));

// Group by first letter for batching
const grouped = new Map<string, string[]>();
unenriched.forEach(p => {
  const letter = p[0].toUpperCase();
  if (!grouped.has(letter)) grouped.set(letter, []);
  grouped.get(letter)!.push(p);
});

// Show breakdown
Array.from(grouped.keys()).sort().forEach(letter => {
  const programs = grouped.get(letter)!;
  console.log(`\n${letter}: ${programs.length} programs`);
  programs.slice(0, 10).forEach(p => console.log(`  - ${p}`));
  if (programs.length > 10) console.log(`  ... and ${programs.length - 10} more`);
});

console.log('\n' + '='.repeat(80));
console.log(`\n📊 SUMMARY:`);
console.log(`   Total programs: ${allPrograms.length}`);
console.log(`   Enriched: ${enrichedIds.size}`);
console.log(`   Unenriched: ${unenriched.length}`);
console.log(`   Coverage: ${((enrichedIds.size / allPrograms.length) * 100).toFixed(1)}%`);
console.log(`\n✅ Agents can now target these ${unenriched.length} remaining programs!\n`);

// Save to file
fs.writeFileSync('UNENRICHED-LIST.txt', unenriched.join('\n'));
console.log(`💾 Full list saved to UNENRICHED-LIST.txt\n`);
