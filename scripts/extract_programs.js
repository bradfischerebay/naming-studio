const fs = require('fs');

const fileContent = fs.readFileSync('/Users/bradfischer/naming-studio/app/naming-graph/translations.ts', 'utf8');

// Extract all program names using regex
const programPattern = /^  '([^']+)': \{$/gm;
const matches = [...fileContent.matchAll(programPattern)];

console.log(`Total programs found: ${matches.length}`);
console.log('\nPrograms 501-750:');
console.log('='.repeat(60));

// Get programs 501-750 (0-indexed, so 500-749)
const targetPrograms = matches.slice(500, 750);

targetPrograms.forEach((match, index) => {
  console.log(`${501 + index}. ${match[1]}`);
});
