import { ENRICHED_WAVE3_U } from './enriched-wave3-batch-U-FINAL.js';

console.log('=== WAVE 3 BATCH U VALIDATION ===\n');
console.log(`Total programs: ${ENRICHED_WAVE3_U.length}`);

// Type distribution
const typeCount: Record<string, number> = {};
ENRICHED_WAVE3_U.forEach(p => typeCount[p.type] = (typeCount[p.type] || 0) + 1);
console.log('\nBy Type:');
Object.entries(typeCount).forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

// Tier distribution
const tierCount: Record<string, number> = {};
ENRICHED_WAVE3_U.forEach(p => tierCount[p.tier] = (tierCount[p.tier] || 0) + 1);
console.log('\nBy Tier:');
Object.entries(tierCount).forEach(([tier, count]) => {
  console.log(`  ${tier}: ${count}`);
});

// Status distribution
const statusCount: Record<string, number> = {};
ENRICHED_WAVE3_U.forEach(p => statusCount[p.status] = (statusCount[p.status] || 0) + 1);
console.log('\nBy Status:');
Object.entries(statusCount).forEach(([status, count]) => {
  console.log(`  ${status}: ${count}`);
});

// Market distribution
let globalCount = 0;
let specificCount = 0;
let multiCount = 0;
ENRICHED_WAVE3_U.forEach(p => {
  if (p.market === 'global') globalCount++;
  else if (Array.isArray(p.market)) multiCount++;
  else specificCount++;
});
console.log('\nBy Market:');
console.log(`  global: ${globalCount}`);
console.log(`  specific market: ${specificCount}`);
console.log(`  multi-market: ${multiCount}`);

// Metadata completeness
const withParent = ENRICHED_WAVE3_U.filter(p => p.parent).length;
const withYear = ENRICHED_WAVE3_U.filter(p => p.year).length;
const withDesc = ENRICHED_WAVE3_U.filter(p => p.desc && p.desc.length > 20).length;

console.log('\nMetadata Completeness:');
console.log(`  with parent: ${withParent}/${ENRICHED_WAVE3_U.length} (${((withParent/ENRICHED_WAVE3_U.length)*100).toFixed(1)}%)`);
console.log(`  with year: ${withYear}/${ENRICHED_WAVE3_U.length} (${((withYear/ENRICHED_WAVE3_U.length)*100).toFixed(1)}%)`);
console.log(`  with desc (>20 chars): ${withDesc}/${ENRICHED_WAVE3_U.length} (${((withDesc/ENRICHED_WAVE3_U.length)*100).toFixed(1)}%)`);

// Year range
const years = ENRICHED_WAVE3_U.map(p => p.year).filter(y => y) as number[];
console.log(`\nYear Range: ${Math.min(...years)} - ${Math.max(...years)}`);

// Sample programs
console.log('\n=== SAMPLE PROGRAMS ===\n');
[0, 30, 60, 90, 121].forEach(i => {
  if (i < ENRICHED_WAVE3_U.length) {
    const p = ENRICHED_WAVE3_U[i];
    console.log(`${i+1}. ${p.name} (${p.id})`);
    console.log(`   Type: ${p.type} | Tier: ${p.tier} | Status: ${p.status}`);
    console.log(`   Market: ${Array.isArray(p.market) ? p.market.join(', ') : p.market} | Year: ${p.year}`);
    console.log(`   Desc: ${p.desc.substring(0, 80)}...`);
    console.log('');
  }
});

console.log('✅ VALIDATION COMPLETE\n');
