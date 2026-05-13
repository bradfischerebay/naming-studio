// Build hierarchy map from enriched programs
import * as fs from 'fs';

const content = fs.readFileSync('./enriched-consolidated-DEDUPLICATED.ts', 'utf-8');

// Parse programs
const programs: any[] = [];
const matches = content.matchAll(/\{[^}]+\}/gs);

for (const match of matches) {
  const obj = match[0];
  const idMatch = obj.match(/"id":\s*"([^"]+)"/);
  const nameMatch = obj.match(/"name":\s*"([^"]+)"/);
  const parentMatch = obj.match(/"parent":\s*"([^"]+)"/);
  const typeMatch = obj.match(/"type":\s*"([^"]+)"/);
  const tierMatch = obj.match(/"tier":\s*"([^"]+)"/);

  if (idMatch && nameMatch) {
    programs.push({
      id: idMatch[1],
      name: nameMatch[1],
      parent: parentMatch?.[1] || null,
      type: typeMatch?.[1] || 'unknown',
      tier: tierMatch?.[1] || 'unknown'
    });
  }
}

console.log(`Parsed ${programs.length} programs\n`);

// Build hierarchy
const byParent = new Map<string, any[]>();
const byId = new Map<string, any>();

programs.forEach(p => {
  byId.set(p.id, p);
  const parent = p.parent || 'ROOT';
  if (!byParent.has(parent)) byParent.set(parent, []);
  byParent.get(parent)!.push(p);
});

// Find root nodes (no parent or parent doesn't exist)
const roots = programs.filter(p => !p.parent || !byId.has(p.parent));

console.log(`Root nodes: ${roots.length}`);
console.log(`Parent categories: ${byParent.size}\n`);

// Generate markdown
let md = '# eBay Naming Graph - Hierarchy Map\n\n';
md += `**Generated:** ${new Date().toISOString().split('T')[0]}\n`;
md += `**Programs:** ${programs.length}\n`;
md += `**Coverage:** 55.4% (831/1,499)\n\n`;
md += '---\n\n';

// Group by type
const byType = new Map<string, any[]>();
programs.forEach(p => {
  if (!byType.has(p.type)) byType.set(p.type, []);
  byType.get(p.type)!.push(p);
});

md += '## Overview by Type\n\n';
Array.from(byType.keys()).sort().forEach(type => {
  const count = byType.get(type)!.length;
  md += `- **${type}:** ${count} programs\n`;
});

md += '\n---\n\n';

// Top parent categories
md += '## Top-Level Parent Categories\n\n';
const parentCounts = new Map<string, number>();
programs.forEach(p => {
  if (p.parent) {
    parentCounts.set(p.parent, (parentCounts.get(p.parent) || 0) + 1);
  }
});

const topParents = Array.from(parentCounts.entries())
  .sort((a, b) => b[1] - a[1])
  .slice(0, 30);

topParents.forEach(([parent, count]) => {
  const parentProg = byId.get(parent);
  const parentName = parentProg?.name || parent;
  md += `\n### ${parentName} (${parent})\n`;
  md += `**Children:** ${count}\n\n`;

  const children = byParent.get(parent) || [];
  children.slice(0, 10).forEach(child => {
    md += `- ${child.name} (${child.id})\n`;
  });
  if (children.length > 10) {
    md += `- ... and ${children.length - 10} more\n`;
  }
});

md += '\n---\n\n';

// Orphans (no parent)
md += '## Root-Level Programs (No Parent)\n\n';
roots.slice(0, 50).forEach(p => {
  md += `- **${p.name}** (${p.id}) - ${p.type} / ${p.tier}\n`;
});
if (roots.length > 50) {
  md += `- ... and ${roots.length - 50} more\n`;
}

md += '\n---\n\n';

// Master brands / umbrellas
md += '## Master Brands & Umbrellas\n\n';
const masters = programs.filter(p => p.tier === 'master' || p.tier === 'umbrella');
masters.forEach(m => {
  md += `\n### ${m.name} (${m.id})\n`;
  md += `**Type:** ${m.type} | **Tier:** ${m.tier}\n`;

  const children = byParent.get(m.id) || [];
  if (children.length > 0) {
    md += `**Children:** ${children.length}\n`;
    children.slice(0, 15).forEach(child => {
      md += `- ${child.name}\n`;
    });
    if (children.length > 15) {
      md += `- ... and ${children.length - 15} more\n`;
    }
  }
});

fs.writeFileSync('HIERARCHY-MAP.md', md);
console.log('✅ HIERARCHY-MAP.md created');
