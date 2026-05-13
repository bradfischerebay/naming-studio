// Deduplication script for enriched batch files
// Merges all batches, removing duplicates and keeping best version

import * as fs from 'fs';
import * as path from 'path';

interface GraphNode {
  id: string;
  name: string;
  type: string;
  tier: string;
  status: string;
  parent?: string;
  desc: string;
  market?: string | string[];
  renamedFrom?: string;
  renamedTo?: string;
  year?: number;
  _source?: string; // Track which batch it came from
}

const BATCH_DIR = '/Users/bradfischer/naming-studio/app/naming-graph';

// Priority order (higher priority = kept in case of duplicates)
const BATCH_PRIORITY = [
  'enriched-batch-01-priority.ts',          // Highest - manually curated priority programs
  'enriched-batch-08-additional.ts',        // Additional programs found

  // Wave 3 batches
  'enriched-wave3-batch-A.ts',
  'enriched-wave3-batch-B.ts',
  'enriched-wave3-batch-C.ts',
  'enriched-wave3-batch-D.ts',
  'enriched-wave3-batch-F.ts',
  'enriched-wave3-batch-G.ts',
  'enriched-wave3-batch-H.ts',
  'enriched-wave3-batch-K.ts',
  'enriched-wave3-batch-L.ts',
  'enriched-wave3-batch-M.ts',
  'enriched-wave3-batch-O.ts',
  'enriched-wave3-batch-Q.ts',
  'enriched-wave3-batch-R.ts',
  'enriched-wave3-batch-T.ts',
  'enriched-wave3-batch-U-FINAL.ts',
  'enriched-wave3-batch-1.ts',

  // Wave 4 batches (27 complete)
  'enriched-wave4-batch-A.ts',
  'enriched-wave4-batch-B.ts',
  'enriched-wave4-batch-C.ts',
  'enriched-wave4-batch-D.ts',
  'enriched-wave4-batch-E.ts',
  'enriched-wave4-batch-G.ts',
  'enriched-wave4-batch-H.ts',
  'enriched-wave4-batch-J.ts',
  'enriched-wave4-batch-K.ts',
  'enriched-wave4-batch-L.ts',
  'enriched-wave4-batch-M.ts',
  'enriched-wave4-batch-N.ts',
  'enriched-wave4-batch-1.ts',
  'enriched-wave4-batch-P.ts',
  'enriched-wave4-batch-R.ts',
  'enriched-wave4-batch-S.ts',
  'enriched-wave4-batch-T.ts',
  'enriched-wave4-batch-U.ts',
  'enriched-wave4-batch-V-FINAL.ts',
  'enriched-wave4-batch-W.ts',
  'enriched-wave4-batch-X.ts',
  'enriched-wave4-batch-Y.ts',
  'enriched-wave4-batch-Z.ts',
  'enriched-wave4-batch-AA.ts',
  'enriched-wave4-batch-AB.ts',
  'enriched-wave4-batch-AC.ts',
  'enriched-wave4-batch-AD.ts',
  'enriched-wave4-batch-AE.ts',

  // Original batches (lowest priority)
  'enriched-batch-02B-programs-401-500.ts',
  'enriched-batch-03-programs-501-750.ts',
  'enriched-batch-04-programs-751-900.ts',
  'enriched-batch-04B-programs-901-1000.ts',
  'enriched-batch-05-programs-1001-1150.ts',
  'enriched-batch-05B-programs-1151-1250.ts',
  'enriched-batch-05-programs-1251-1494.ts',
];

async function loadBatch(filename: string): Promise<GraphNode[]> {
  const filepath = path.join(BATCH_DIR, filename);

  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  Skipping missing file: ${filename}`);
    return [];
  }

  const content = fs.readFileSync(filepath, 'utf-8');

  // Extract the array content between [ and ]
  const arrayMatch = content.match(/export const \w+: GraphNode\[\] = (\[[\s\S]*\]);/);

  if (!arrayMatch) {
    console.log(`⚠️  Could not parse ${filename}`);
    return [];
  }

  try {
    // Use eval to parse the array (safe here since we control the source)
    const programs: GraphNode[] = eval(arrayMatch[1]);

    // Tag with source
    programs.forEach(p => p._source = filename);

    console.log(`✅ Loaded ${programs.length} programs from ${filename}`);
    return programs;
  } catch (e) {
    console.log(`❌ Error parsing ${filename}:`, e);
    return [];
  }
}

async function main() {
  console.log('=== DEDUPLICATION PROCESS ===\n');

  const allPrograms: GraphNode[] = [];
  const programMap = new Map<string, GraphNode>();

  // Load batches in REVERSE priority order (so higher priority overwrites)
  for (const batch of [...BATCH_PRIORITY].reverse()) {
    const programs = await loadBatch(batch);

    for (const program of programs) {
      const existing = programMap.get(program.id);

      if (existing) {
        console.log(`   Duplicate found: ${program.id}`);
        console.log(`     Existing from: ${existing._source}`);
        console.log(`     New from: ${program._source}`);
        console.log(`     Keeping: ${program._source} (higher priority)`);
      }

      programMap.set(program.id, program);
    }
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Total programs loaded: ${allPrograms.length}`);
  console.log(`Unique programs: ${programMap.size}`);
  console.log(`Duplicates removed: ${allPrograms.length - programMap.size}`);

  // Convert to array and remove _source field
  const deduplicated = Array.from(programMap.values()).map(p => {
    const { _source, ...clean } = p;
    return clean;
  });

  // Sort by ID for consistent output
  deduplicated.sort((a, b) => a.id.localeCompare(b.id));

  // Generate output file
  const output = `// eBay Naming Graph - Consolidated Enriched Programs
// DEDUPLICATED - Single source of truth
// Generated: ${new Date().toISOString().split('T')[0]}
// Unique programs: ${deduplicated.length}

export interface GraphNode {
  id: string
  name: string
  type: "masterbrand" | "category" | "advertising" | "trust" | "impact" | "developer" | "regional"
  tier: "master" | "umbrella" | "t1" | "t2" | "t3" | "product" | "program" | "feature" | "legal" | "organization" | "publication" | "event" | "campaign" | "vertical" | "platform" | "variant"
  status: "current" | "legacy" | "renamed"
  parent?: string
  desc: string
  market?: "US" | "UK" | "DE" | "FR" | "IT" | "AU" | "CA" | "global" | string[]
  renamedFrom?: string
  renamedTo?: string
  year?: number
}

export const ENRICHED_PROGRAMS: GraphNode[] = ${JSON.stringify(deduplicated, null, 2)};
`;

  const outputPath = path.join(BATCH_DIR, 'enriched-consolidated-DEDUPLICATED.ts');
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`\n✅ Consolidated file written to: enriched-consolidated-DEDUPLICATED.ts`);
  console.log(`   Programs: ${deduplicated.length}`);
}

main().catch(console.error);
