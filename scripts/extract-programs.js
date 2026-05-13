// Script to extract program names from translations.ts
const fs = require('fs');

const fileContent = fs.readFileSync('/Users/bradfischer/naming-studio/app/naming-graph/translations.ts', 'utf8');

// Match program keys (lines that start with spaces and a single quote)
const programMatches = fileContent.match(/^  '([^']+)':\s*{/gm);

if (programMatches) {
  const programs = programMatches.map((match, index) => {
    const name = match.match(/'([^']+)'/)[1];
    return { index: index + 1, name };
  });

  console.log(`Total programs found: ${programs.length}`);
  console.log('\n=== Programs 751-1000 ===\n');

  const targetPrograms = programs.slice(750, 1000); // 0-indexed, so 750-999 = programs 751-1000

  targetPrograms.forEach(p => {
    console.log(`${p.index}. ${p.name}`);
  });

  // Also write to file
  fs.writeFileSync(
    '/Users/bradfischer/naming-studio/programs-751-1000.txt',
    targetPrograms.map(p => `${p.index}. ${p.name}`).join('\n')
  );

  console.log(`\n✓ Wrote list to programs-751-1000.txt`);
} else {
  console.log('No programs found');
}
