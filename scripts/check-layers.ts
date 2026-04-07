#!/usr/bin/env node
// check-layers.ts — Enforce import direction rules for the naming-studio layered architecture.
//
// Run with:  npm run check-layers
//
// The 5 rules this enforces:
//
//   Rule 1  lib/models/    must not import from lib/modules/, lib/orchestrator.ts, or app/
//   Rule 2  lib/config/    must not import from lib/modules/, lib/orchestrator.ts, or app/
//   Rule 3  lib/prompts/   must not import from lib/modules/, lib/orchestrator.ts, or app/
//   Rule 4  lib/modules/   must not import from lib/orchestrator.ts or app/
//   Rule 5  UI pages and components must not import from lib/ at all
//
// These rules preserve the dependency direction:
//   models → config → prompts → modules → orchestrator → api → UI
//
// Exits with code 1 and prints violations if any rule is broken.
// Exits with code 0 if the architecture is clean.

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

// ─── Import parsing ───────────────────────────────────────────────────────────

const IMPORT_RE = /(?:import|export)[\s\S]*?from\s+['"]([^'"]+)['"]/g;
const DYNAMIC_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

function getImportPaths(filePath: string): string[] {
  let content: string;
  try {
    content = fs.readFileSync(filePath, "utf-8");
  } catch {
    return [];
  }

  const results: string[] = [];

  for (const re of [IMPORT_RE, DYNAMIC_RE]) {
    re.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = re.exec(content)) !== null) {
      results.push(match[1]);
    }
  }

  return results;
}

// Resolve an import specifier to a project-relative path (or null if external)
function resolveToRelative(importPath: string, fromFile: string): string | null {
  let absolute: string;

  if (importPath.startsWith("@/")) {
    absolute = path.join(ROOT, importPath.slice(2));
  } else if (importPath.startsWith(".")) {
    absolute = path.resolve(path.dirname(fromFile), importPath);
  } else {
    return null; // external package
  }

  // Try to resolve to an actual file
  const candidates = [
    absolute,
    absolute + ".ts",
    absolute + ".tsx",
    path.join(absolute, "index.ts"),
    path.join(absolute, "index.tsx"),
  ];

  for (const c of candidates) {
    if (fs.existsSync(c)) return path.relative(ROOT, c);
  }

  return null;
}

// ─── Layer classification ─────────────────────────────────────────────────────

type Layer =
  | "models"
  | "config"
  | "prompts"
  | "server-infra"   // server-only lib files: chomsky, analytics, lab-storage, rate-limit
  | "shared-util"    // client-safe lib files: utils.ts, schemas.ts
  | "modules"
  | "orchestrator"
  | "api"
  | "ui"
  | "tests"
  | "unknown";

// Files in lib/ that are safe to import from client-side UI code.
// These are either pure utilities (no server APIs) or type-only exports.
const CLIENT_SAFE_LIB = new Set([
  "lib/utils.ts",
  "lib/schemas.ts",
  "lib/verdict-engine.ts", // type/logic only, no server APIs
]);

function classify(relPath: string): Layer {
  if (relPath.startsWith("lib/models/")) return "models";
  if (relPath.startsWith("lib/config/")) return "config";
  if (relPath.startsWith("lib/prompts/")) return "prompts";
  if (relPath.startsWith("lib/modules/")) return "modules";
  if (relPath === "lib/orchestrator.ts") return "orchestrator";
  if (relPath.startsWith("lib/")) {
    // Distinguish server-only infrastructure from shared client-safe utilities
    return CLIENT_SAFE_LIB.has(relPath) ? "shared-util" : "server-infra";
  }
  if (relPath.startsWith("app/api/")) return "api";
  if (relPath.startsWith("tests/")) return "tests";
  // UI: page files and components (NOT app/api/)
  if (
    relPath.startsWith("components/") ||
    relPath.endsWith("page.tsx") ||
    relPath.endsWith("layout.tsx")
  ) {
    return "ui";
  }
  return "unknown";
}

// ─── Rules ────────────────────────────────────────────────────────────────────

interface Violation {
  file: string;
  rule: string;
  forbidden: string;
}

const RULES: Array<{
  label: string;
  appliesTo: (layer: Layer) => boolean;
  forbids: (importedLayer: Layer) => boolean;
}> = [
  {
    label: "Rule 1 — models must not import from modules, orchestrator, or app",
    appliesTo: (l) => l === "models",
    forbids: (l) => l === "modules" || l === "orchestrator" || l === "api" || l === "ui",
  },
  {
    label: "Rule 2 — config must not import from modules, orchestrator, or app",
    appliesTo: (l) => l === "config",
    forbids: (l) => l === "modules" || l === "orchestrator" || l === "api" || l === "ui",
  },
  {
    label: "Rule 3 — prompts must not import from modules, orchestrator, or app",
    appliesTo: (l) => l === "prompts",
    forbids: (l) => l === "modules" || l === "orchestrator" || l === "api" || l === "ui",
  },
  {
    label: "Rule 4 — modules must not import from orchestrator or app",
    appliesTo: (l) => l === "modules",
    forbids: (l) => l === "orchestrator" || l === "api" || l === "ui",
  },
  {
    label: "Rule 5 — UI pages and components must not import from server-only lib/",
    appliesTo: (l) => l === "ui",
    // Allow models, shared-util (utils.ts, schemas.ts) — forbid everything server-side
    forbids: (l) =>
      l === "server-infra" || l === "modules" || l === "orchestrator" || l === "config" || l === "prompts",
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

function main(): void {
  const files = walk(ROOT);
  const violations: Violation[] = [];

  for (const absFile of files) {
    const relFile = path.relative(ROOT, absFile);
    const fileLayer = classify(relFile);

    for (const rule of RULES) {
      if (!rule.appliesTo(fileLayer)) continue;

      const imports = getImportPaths(absFile);
      for (const importPath of imports) {
        const resolved = resolveToRelative(importPath, absFile);
        if (!resolved) continue;

        const importedLayer = classify(resolved);
        if (rule.forbids(importedLayer)) {
          violations.push({
            file: relFile,
            rule: rule.label,
            forbidden: resolved,
          });
        }
      }
    }
  }

  if (violations.length === 0) {
    console.log("✓ Architecture layer rules: all clean\n");
    process.exit(0);
  }

  console.error(`\n✗ Architecture violations found (${violations.length}):\n`);

  // Group by rule
  const byRule = new Map<string, Violation[]>();
  for (const v of violations) {
    if (!byRule.has(v.rule)) byRule.set(v.rule, []);
    byRule.get(v.rule)!.push(v);
  }

  for (const [rule, vs] of byRule) {
    console.error(`  ${rule}`);
    for (const v of vs) {
      console.error(`    ${v.file}  →  ${v.forbidden}`);
    }
    console.error();
  }

  process.exit(1);
}

main();
