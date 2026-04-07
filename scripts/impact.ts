#!/usr/bin/env node
/**
 * impact.ts — Show the transitive impact radius of a file in this codebase.
 *
 * Usage:
 *   npm run impact lib/modules/evaluator.ts          # what does this touch?
 *   npm run impact -- --reverse lib/chomsky.ts       # what imports this?
 *   npm run impact -- --reverse lib/models/gates.ts  # find all consumers
 *
 * Forward mode (default): prints every file this module transitively imports.
 * Reverse mode (--reverse / -r): prints every file that transitively imports this.
 *
 * Useful for:
 *   - Planning edits ("what else might break?")
 *   - Code review ("is my blast radius what I expect?")
 *   - Understanding orchestrator wiring
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const IGNORE = ["node_modules", ".next", "scripts", ".claude"];

// ─── File discovery ───────────────────────────────────────────────────────────

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE.includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) {
      out.push(full);
    }
  }
  return out;
}

// ─── Import resolution ────────────────────────────────────────────────────────

const IMPORT_RE = /(?:import|export)[\s\S]*?from\s+['"]([^'"]+)['"]/g;
const DYNAMIC_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

function resolveImport(importPath: string, fromFile: string): string | null {
  let resolved: string;

  if (importPath.startsWith("@/")) {
    // @/* alias → project root
    resolved = path.join(ROOT, importPath.slice(2));
  } else if (importPath.startsWith(".")) {
    // Relative import
    resolved = path.resolve(path.dirname(fromFile), importPath);
  } else {
    // External package — skip
    return null;
  }

  // Try candidates in order: exact, .ts, .tsx, /index.ts, /index.tsx
  for (const candidate of [
    resolved,
    resolved + ".ts",
    resolved + ".tsx",
    path.join(resolved, "index.ts"),
    path.join(resolved, "index.tsx"),
  ]) {
    if (fs.existsSync(candidate)) return path.normalize(candidate);
  }

  return null;
}

function getImports(filePath: string): string[] {
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    return [];
  }

  const results = new Set<string>();

  for (const re of [IMPORT_RE, DYNAMIC_RE]) {
    re.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(content)) !== null) {
      const resolved = resolveImport(match[1], filePath);
      if (resolved) results.add(resolved);
    }
  }

  return [...results];
}

// ─── Graph construction ───────────────────────────────────────────────────────

function buildGraph(): Map<string, Set<string>> {
  const files = walk(ROOT);
  const graph = new Map<string, Set<string>>();

  for (const file of files) {
    const norm = path.normalize(file);
    if (!graph.has(norm)) graph.set(norm, new Set());
    for (const dep of getImports(file)) {
      graph.get(norm)!.add(dep);
    }
  }

  return graph;
}

// ─── Reachability ─────────────────────────────────────────────────────────────

function reach(start: string, graph: Map<string, Set<string>>): Set<string> {
  const visited = new Set<string>();
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neighbor of graph.get(current) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return visited;
}

function reverseGraph(graph: Map<string, Set<string>>): Map<string, Set<string>> {
  const rev = new Map<string, Set<string>>();
  for (const [from, tos] of graph) {
    if (!rev.has(from)) rev.set(from, new Set());
    for (const to of tos) {
      if (!rev.has(to)) rev.set(to, new Set());
      rev.get(to)!.add(from);
    }
  }
  return rev;
}

// ─── Output ───────────────────────────────────────────────────────────────────

function rel(p: string): string {
  return path.relative(ROOT, p);
}

function printGrouped(files: Set<string>): void {
  if (files.size === 0) {
    console.log("  (none)");
    return;
  }

  // Group by parent directory — keeps route.ts files in distinct groups
  const byDir = new Map<string, string[]>();
  for (const f of [...files].sort()) {
    const r = rel(f);
    const dir = path.dirname(r);
    if (!byDir.has(dir)) byDir.set(dir, []);
    byDir.get(dir)!.push(path.basename(f));
  }

  for (const [dir, dirFiles] of [...byDir.entries()].sort()) {
    console.log(`\n  ${dir}/`);
    for (const f of dirFiles) {
      console.log(`    ${f}`);
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  const args = process.argv.slice(2);
  const isReverse = args.includes("--reverse") || args.includes("-r");
  const fileArg = args.find((a) => !a.startsWith("-"));

  if (!fileArg) {
    console.error(`
Usage:
  npm run impact <file>                  What does this file transitively touch?
  npm run impact -- --reverse <file>     What files transitively import this?

Examples:
  npm run impact lib/orchestrator.ts
  npm run impact lib/modules/evaluator.ts
  npm run impact -- --reverse lib/chomsky.ts
  npm run impact -- --reverse lib/models/gates.ts
`);
    process.exit(1);
  }

  const targetPath = path.normalize(path.resolve(ROOT, fileArg));

  if (!fs.existsSync(targetPath)) {
    console.error(`File not found: ${fileArg}`);
    process.exit(1);
  }

  console.log("Scanning import graph...");
  const graph = buildGraph();

  const activeGraph = isReverse ? reverseGraph(graph) : graph;
  const found = reach(targetPath, activeGraph);

  const mode = isReverse ? "files that import (transitively)" : "files transitively touched by";
  console.log(`\n${found.size} ${mode}:`);
  console.log(`  ${rel(targetPath)}\n`);

  printGrouped(found);

  console.log();
}

main();
