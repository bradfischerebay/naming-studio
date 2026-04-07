/**
 * Evaluation Pipeline Registry
 *
 * Declarative description of the naming evaluation pipeline wired in lib/orchestrator.ts.
 * This file is documentation-as-code: it does not drive execution, but it makes the
 * module chain explicit, machine-readable, and easy to reason about.
 *
 * Reading order: steps execute top-to-bottom. Each step's output is the next step's input.
 * Steps marked skippable: true may be bypassed by orchestrator config.
 * Steps marked llm: true call Chomsky and require VPN + incur token costs.
 * Steps marked llm: false are pure TypeScript — testable without any LLM dependency.
 */

export const EVALUATION_PIPELINE = [
  {
    phase: "PARSING",
    fn: "parseBrief",
    module: "lib/modules/parser.ts",
    input: "rawBrief: string",
    output: "CompiledBrief",
    llm: true,
    skippable: false,
    test: null, // no dedicated unit test — covered implicitly by integration
  },
  {
    phase: "RESEARCH",
    fn: "analyzeLandscape",
    module: "lib/modules/researcher.ts",
    input: "CompiledBrief",
    output: "LandscapeSynthesis | null",
    llm: true,
    skippable: true, // skipped when config.skipWebResearch is true
    test: "tests/researcher.test.ts",
  },
  {
    phase: "EXTRACTION",
    fn: "extractFacts",
    module: "lib/modules/extractor.ts",
    input: "CompiledBrief + LandscapeSynthesis",
    output: "NamingFacts",
    llm: true,
    skippable: false,
    test: null,
  },
  {
    phase: "GATES",
    fn: "evaluateGates",
    module: "lib/modules/evaluator.ts",
    input: "NamingFacts",
    output: "GateEvaluation",
    llm: false,
    skippable: false,
    test: "tests/evaluator.test.ts",
  },
  {
    phase: "SCORING",
    fn: "calculateScore",
    module: "lib/modules/scorer.ts",
    input: "NamingFacts",
    output: "ScoringResult",
    llm: false,
    skippable: true, // only runs if all 6 gates pass
    test: "tests/scorer.test.ts",
  },
  {
    phase: "VERDICT",
    fn: "calculateVerdict",
    module: "lib/modules/verdict.ts",
    input: "GateEvaluation + ScoringResult",
    output: "VerdictOutput (PATH_A0 | PATH_A1 | PATH_A2 | PATH_B | PATH_C)",
    llm: false,
    skippable: false,
    test: "tests/verdict.test.ts",
  },
  {
    phase: "QUESTIONS",
    fn: "generateQuestions",
    module: "lib/modules/questioner.ts",
    input: "GateEvaluation + NamingFacts",
    output: "string[]",
    llm: true,
    skippable: true, // only runs when verdict is PATH_B
    test: null,
  },
  {
    phase: "FORMATTING",
    fn: "formatAsMarkdown",
    module: "lib/modules/formatter.ts",
    input: "VerdictOutput",
    output: "string (Markdown)",
    llm: false,
    skippable: false,
    test: "tests/formatter.test.ts",
  },
] as const;

export type PipelinePhase = (typeof EVALUATION_PIPELINE)[number]["phase"];
export type PipelineStep = (typeof EVALUATION_PIPELINE)[number];

// Derived views — useful for tooling and documentation

/** Steps that require LLM calls (need VPN, incur token cost) */
export const LLM_STEPS = EVALUATION_PIPELINE.filter((s) => s.llm);

/** Steps that are pure TypeScript (no LLM, no VPN, fully unit-testable) */
export const DETERMINISTIC_STEPS = EVALUATION_PIPELINE.filter((s) => !s.llm);

/** Steps that are always required (cannot be skipped) */
export const REQUIRED_STEPS = EVALUATION_PIPELINE.filter((s) => !s.skippable);
