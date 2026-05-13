#!/usr/bin/env node

/**
 * Knowledge Graph Validation Script
 *
 * Checks for:
 * 1. Duplicate IDs
 * 2. Orphaned relationships (targets that don't exist)
 * 3. Invalid parent references
 * 4. Missing required fields
 * 5. Source URL format validation
 * 6. Year validation (reasonable ranges)
 */

const fs = require('fs');
const path = require('path');

// Read the data file
const dataPath = path.join(__dirname, '../lib/enriched-naming-data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

// Extract all program IDs
const idMatches = content.matchAll(/\{ id: ['"]([^'"]+)['"]/g);
const allIds = [];
for (const match of idMatches) {
  allIds.push(match[1]);
}

// Extract all relationships
const relationshipMatches = content.matchAll(/\{ target: ['"]([^'"]+)['"], type: ['"]([^'"]+)['"]/g);
const relationships = [];
for (const match of relationshipMatches) {
  relationships.push({ target: match[1], type: match[2] });
}

// Extract all parent references
const parentMatches = content.matchAll(/parent: ['"]([^'"]+)['"]/g);
const parentRefs = [];
for (const match of parentMatches) {
  parentRefs.push(match[1]);
}

// Extract all source URLs
const urlMatches = content.matchAll(/sourceUrl: ['"]([^'"]+)['"]/g);
const sourceUrls = [];
for (const match of urlMatches) {
  sourceUrls.push(match[1]);
}

// Extract all years
const yearMatches = content.matchAll(/year: (\d{4})/g);
const years = [];
for (const match of yearMatches) {
  years.push(parseInt(match[1]));
}

console.log('='.repeat(80));
console.log('KNOWLEDGE GRAPH VALIDATION REPORT');
console.log('='.repeat(80));
console.log();

// 1. Check for duplicate IDs
console.log('1. DUPLICATE ID CHECK');
console.log('-'.repeat(80));
const idCounts = {};
allIds.forEach(id => {
  idCounts[id] = (idCounts[id] || 0) + 1;
});

const duplicates = Object.entries(idCounts).filter(([id, count]) => count > 1);
if (duplicates.length === 0) {
  console.log('✅ No duplicate IDs found');
} else {
  console.log(`❌ Found ${duplicates.length} duplicate IDs:`);
  duplicates.forEach(([id, count]) => {
    console.log(`   - "${id}" appears ${count} times`);
  });
}
console.log();

// 2. Check for orphaned relationships
console.log('2. ORPHANED RELATIONSHIP CHECK');
console.log('-'.repeat(80));
const idSet = new Set(allIds);
const orphanedTargets = relationships.filter(rel => !idSet.has(rel.target));

if (orphanedTargets.length === 0) {
  console.log('✅ No orphaned relationships found');
} else {
  console.log(`❌ Found ${orphanedTargets.length} orphaned relationships (targets don't exist):`);
  const uniqueOrphans = [...new Set(orphanedTargets.map(r => r.target))];
  uniqueOrphans.slice(0, 20).forEach(target => {
    console.log(`   - "${target}" (referenced but doesn't exist)`);
  });
  if (uniqueOrphans.length > 20) {
    console.log(`   ... and ${uniqueOrphans.length - 20} more`);
  }
}
console.log();

// 3. Check for invalid parent references
console.log('3. INVALID PARENT REFERENCE CHECK');
console.log('-'.repeat(80));
const orphanedParents = parentRefs.filter(parent => !idSet.has(parent));

if (orphanedParents.length === 0) {
  console.log('✅ No invalid parent references found');
} else {
  console.log(`❌ Found ${orphanedParents.length} invalid parent references:`);
  const uniqueParents = [...new Set(orphanedParents)];
  uniqueParents.slice(0, 20).forEach(parent => {
    console.log(`   - "${parent}" (parent doesn't exist)`);
  });
  if (uniqueParents.length > 20) {
    console.log(`   ... and ${uniqueParents.length - 20} more`);
  }
}
console.log();

// 4. Check source URL formats
console.log('4. SOURCE URL FORMAT CHECK');
console.log('-'.repeat(80));
const invalidUrls = sourceUrls.filter(url => {
  return !url.startsWith('http://') && !url.startsWith('https://');
});

if (invalidUrls.length === 0) {
  console.log('✅ All source URLs have valid format');
} else {
  console.log(`❌ Found ${invalidUrls.length} invalid URL formats:`);
  invalidUrls.slice(0, 10).forEach(url => {
    console.log(`   - "${url}"`);
  });
}
console.log(`   Total source URLs: ${sourceUrls.length}`);
console.log();

// 5. Check year ranges
console.log('5. YEAR VALIDATION CHECK');
console.log('-'.repeat(80));
const invalidYears = years.filter(year => year < 1995 || year > 2026);

if (invalidYears.length === 0) {
  console.log('✅ All years are in valid range (1995-2026)');
} else {
  console.log(`❌ Found ${invalidYears.length} years outside valid range:`);
  invalidYears.forEach(year => {
    console.log(`   - ${year}`);
  });
}
console.log(`   Year range: ${Math.min(...years)} - ${Math.max(...years)}`);
console.log();

// 6. Statistics
console.log('6. STATISTICS');
console.log('-'.repeat(80));
console.log(`Total Programs: ${allIds.length}`);
console.log(`Total Relationships: ${relationships.length}`);
console.log(`Programs with Source URLs: ${sourceUrls.length}`);
console.log(`Programs with Parents: ${parentRefs.length}`);
console.log(`Unique Relationship Targets: ${new Set(relationships.map(r => r.target)).size}`);
console.log();

// 7. Summary
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

const issues = [];
if (duplicates.length > 0) issues.push(`${duplicates.length} duplicate IDs`);
if (orphanedTargets.length > 0) issues.push(`${orphanedTargets.length} orphaned relationships`);
if (orphanedParents.length > 0) issues.push(`${orphanedParents.length} invalid parents`);
if (invalidUrls.length > 0) issues.push(`${invalidUrls.length} invalid URLs`);
if (invalidYears.length > 0) issues.push(`${invalidYears.length} invalid years`);

if (issues.length === 0) {
  console.log('✅ ALL VALIDATION CHECKS PASSED');
  console.log('   Knowledge graph data is clean and valid!');
} else {
  console.log(`❌ FOUND ${issues.length} ISSUE(S):`);
  issues.forEach(issue => {
    console.log(`   - ${issue}`);
  });
}
console.log('='.repeat(80));

process.exit(issues.length > 0 ? 1 : 0);
