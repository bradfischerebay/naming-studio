/**
 * Naming Agent Orchestrator
 * Main state machine that coordinates the entire evaluation pipeline
 */

import type { CompiledBrief } from "./models/brief";
import { hasMinimumFields, getMissingFields } from "./models/brief";
import type { EvaluationResult, VerdictOutput } from "./models/verdict";
import type { WorkflowConfig } from "./models/workflow";
import { WorkflowPhase, createInitialState, canRetry, incrementRetry } from "./models/workflow";
import { VerdictPath, needsMoreInfo } from "./models/verdict";
import type { NamingFacts } from "./models/facts";
import type { LandscapeSynthesis } from "./models/landscape";

// Import all modules
import { chomsky } from "./chomsky";
import { parseBrief } from "./modules/parser";
import { analyzeLandscape } from "./modules/researcher";
import { extractFacts, patchFacts } from "./modules/extractor";
import { evaluateGates } from "./modules/evaluator";
import { calculateScore } from "./modules/scorer";
import { buildNoBriefVerdict, calculateVerdict } from "./modules/verdict";
import { generateQuestions } from "./modules/questioner";
import { formatAsMarkdown, formatAsEscalation } from "./modules/formatter";
import { getPendingGates } from "./models/gates";
import type { GateEvaluation } from "./models/gates";
import type { ScoringResult } from "./models/scoring";

/**
 * Main evaluation interface
 */
export interface EvaluateOptions {
  brief: string;
  config?: Partial<WorkflowConfig>;
  onProgress?: (phase: WorkflowPhase, message: string) => void;
}

/**
 * Main evaluation result
 */
export interface EvaluateResult extends EvaluationResult {
  markdown: string;
  questions?: string[];
  requiresClarification: boolean;
}

/**
 * Evaluate a naming brief end-to-end
 */
export async function evaluate(options: EvaluateOptions): Promise<EvaluateResult> {
  const { brief, config, onProgress } = options;
  const state = createInitialState(config);

  // Apply model override from UI selection
  if (config?.model) {
    chomsky.overrideModel(config.model);
  }

  const log = (phase: WorkflowPhase, message: string) => {
    state.phase = phase;
    onProgress?.(phase, message);
  };

  try {
    // Phase 1: Parse Brief
    log(WorkflowPhase.PARSING, "Parsing brief...");
    const parsedBrief = await parseBrief(brief);
    state.parsedBrief = parsedBrief.compiled_brief;

    // Pre-flight: if the parsed brief is missing critical fields, return PATH_B immediately
    // rather than running the full pipeline on incomplete data
    if (!hasMinimumFields(state.parsedBrief)) {
      const missingFields = getMissingFields(state.parsedBrief);
      const noBriefVerdict = buildNoBriefVerdict(missingFields);
      const markdown = formatAsMarkdown(noBriefVerdict);
      log(WorkflowPhase.COMPLETE, "Brief incomplete — guidance returned");
      return {
        verdict: noBriefVerdict,
        gateEvaluation: buildEmptyGateEvaluation(),
        compiledBrief: state.parsedBrief,
        markdown,
        requiresClarification: false,
      };
    }

    // Phase 2: Research Landscape (optional)
    if (!config?.skipWebResearch) {
      log(WorkflowPhase.RESEARCH, "Analyzing competitive landscape...");
      state.landscapeData = await analyzeLandscape(state.parsedBrief);
    }

    // Phase 3: Extract Facts
    log(WorkflowPhase.EXTRACTION, "Extracting naming facts...");
    state.factsData = await extractFacts(state.parsedBrief, state.landscapeData);

    // Phase 4: Evaluate Gates
    log(WorkflowPhase.GATES, "Evaluating gates...");
    state.gateEvaluation = evaluateGates(state.factsData);

    // Phase 5: Calculate Score (if all gates pass or only unknowns)
    const hasFailures = state.gateEvaluation.any_failures;
    const hasMissing = state.gateEvaluation.missing_info;

    if (!hasFailures && !hasMissing) {
      log(WorkflowPhase.SCORING, "Calculating score...");
      state.scoringResult = calculateScore(state.factsData);
    }

    // Phase 6: Calculate Verdict
    log(WorkflowPhase.VERDICT, "Determining verdict...");
    state.verdict = calculateVerdict(state.gateEvaluation, state.scoringResult);

    // Phase 7: Check if clarification needed
    const requiresClarification = needsMoreInfo(state.verdict.path);

    // Phase 8: Generate questions if needed
    let questions: string[] | undefined;
    if (requiresClarification) {
      log(WorkflowPhase.FORMATTING, "Generating clarification questions...");
      questions = await generateQuestions(state.gateEvaluation, state.factsData);
    }

    // Phase 9: Format output
    log(WorkflowPhase.FORMATTING, "Formatting output...");
    const markdown = formatAsMarkdown(state.verdict);

    log(WorkflowPhase.COMPLETE, "Evaluation complete");

    return {
      verdict: state.verdict,
      gateEvaluation: state.gateEvaluation,
      scoringResult: state.scoringResult,
      landscapeData: state.landscapeData,
      factsData: state.factsData,
      compiledBrief: state.parsedBrief,
      markdown,
      questions,
      requiresClarification,
    };
  } catch (error) {
    state.phase = WorkflowPhase.ERROR;
    state.errors = [error instanceof Error ? error.message : String(error)];
    throw error;
  }
}

/**
 * Re-evaluate with user clarification (retry logic)
 */
export async function evaluateWithClarification(
  options: EvaluateOptions & {
    previousResult: EvaluateResult;
    userClarification: string;
  }
): Promise<EvaluateResult> {
  const { brief, previousResult, userClarification, config, onProgress } = options;
  const state = createInitialState(config);

  // Apply model override from UI selection
  if (config?.model) {
    chomsky.overrideModel(config.model);
  }

  const log = (phase: WorkflowPhase, message: string) => {
    state.phase = phase;
    onProgress?.(phase, message);
  };

  // Check retry limit
  if (!canRetry(state)) {
    throw new Error("Maximum retry limit reached");
  }

  try {
    // Reuse previous parsed data (re-parse only if not available)
    state.parsedBrief = previousResult.compiledBrief ?? await parseBrief(brief).then(p => p.compiled_brief);
    state.landscapeData = previousResult.landscapeData as LandscapeSynthesis | undefined;

    // Phase 1: Patch facts with user clarification
    log(WorkflowPhase.EXTRACTION, "Patching facts with clarification...");
    if (!previousResult.factsData) {
      throw new Error("No facts data from previous evaluation");
    }
    state.factsData = await patchFacts(previousResult.factsData as NamingFacts, userClarification);

    // Phase 2: Re-evaluate gates
    log(WorkflowPhase.GATES, "Re-evaluating gates...");
    state.gateEvaluation = evaluateGates(state.factsData);

    // Phase 3: Re-calculate score (if applicable)
    const hasFailures = state.gateEvaluation.any_failures;
    const hasMissing = state.gateEvaluation.missing_info;

    if (!hasFailures && !hasMissing) {
      log(WorkflowPhase.SCORING, "Re-calculating score...");
      state.scoringResult = calculateScore(state.factsData);
    }

    // Phase 4: Re-calculate verdict
    log(WorkflowPhase.VERDICT, "Re-determining verdict...");
    state.verdict = calculateVerdict(state.gateEvaluation, state.scoringResult);

    // Phase 4.5: Check if verdict changed and add acknowledgment
    const previousPath = previousResult.verdict.path;
    const newPath = state.verdict.path;

    if (previousPath !== newPath) {
      // Verdict changed - acknowledge the user was right
      const changeAcknowledgment = buildChangeAcknowledgment(
        previousPath,
        newPath,
        userClarification,
        state.gateEvaluation,
        state.scoringResult
      );
      state.verdict.summary = [changeAcknowledgment, "", ...state.verdict.summary];
    } else if (previousPath === VerdictPath.PATH_B) {
      // Was "Need Info", now have info - acknowledge even if same outcome
      const clarificationNote = "**Thank you for the additional context.** Based on your clarification, here's my assessment:";
      state.verdict.summary = [clarificationNote, "", ...state.verdict.summary];
    } else {
      // Same verdict despite new info - hold firm but acknowledge
      const holdFirmNote = buildHoldFirmAcknowledgment(userClarification, state.verdict.path);
      state.verdict.summary = [holdFirmNote, "", ...state.verdict.summary];
    }

    // Phase 5: Check if still needs clarification
    const requiresClarification = needsMoreInfo(state.verdict.path);

    // Phase 6: Generate questions if still needed, or escalate
    let questions: string[] | undefined;
    let markdown: string;

    if (requiresClarification) {
      log(WorkflowPhase.FORMATTING, "Generating additional clarification questions...");
      questions = await generateQuestions(state.gateEvaluation, state.factsData);

      // If still missing info after retry, escalate
      state.retryCount = incrementRetry(state).retryCount;
      if (!canRetry(state)) {
        // Generate escalation format instead of standard output
        log(WorkflowPhase.FORMATTING, "Escalating for manual review...");

        const pendingGates = getPendingGates(state.gateEvaluation!);
        const remainingGaps = pendingGates.map(gateKey => {
          const gate = state.gateEvaluation!.gate_results[gateKey as keyof typeof state.gateEvaluation.gate_results];
          return `${gateKey}: ${gate.reasoning}`;
        });

        markdown = formatAsEscalation({
          attempt1Status: previousResult.verdict.path,
          attempt2Status: state.verdict.path,
          userClarification,
          remainingGaps,
          brief: state.parsedBrief || previousResult.compiledBrief || {} as CompiledBrief,
          gateEvaluation: state.gateEvaluation,
          clarificationHistory: userClarification,
        });
      } else {
        markdown = formatAsMarkdown(state.verdict);
      }
    } else {
      // Phase 7: Format output (standard)
      log(WorkflowPhase.FORMATTING, "Formatting output...");
      markdown = formatAsMarkdown(state.verdict);
    }

    log(WorkflowPhase.COMPLETE, "Re-evaluation complete");

    return {
      verdict: state.verdict,
      gateEvaluation: state.gateEvaluation,
      scoringResult: state.scoringResult,
      landscapeData: state.landscapeData,
      factsData: state.factsData,
      compiledBrief: state.parsedBrief ?? (previousResult.compiledBrief as CompiledBrief | undefined),
      markdown,
      questions,
      requiresClarification,
    };
  } catch (error) {
    state.phase = WorkflowPhase.ERROR;
    state.errors = [error instanceof Error ? error.message : String(error)];
    throw error;
  }
}

/**
 * Build acknowledgment when verdict changes
 */
function buildChangeAcknowledgment(
  previousPath: VerdictPath,
  newPath: VerdictPath,
  userClarification: string,
  gateEvaluation: GateEvaluation,
  scoringResult?: ScoringResult
): string {
  // Determine what changed
  let changeReason = "";

  if (previousPath === VerdictPath.PATH_B) {
    // Was "Need Info" - now we have it
    changeReason = "Based on your clarification, I now have the information I needed.";
  } else if (newPath === VerdictPath.PATH_C && previousPath !== VerdictPath.PATH_C) {
    // Now passes - acknowledge the user was right
    changeReason = "You're right - with this new context, I'm revising my assessment.";
  } else if (newPath !== VerdictPath.PATH_C && previousPath === VerdictPath.PATH_C) {
    // Was passing, now fails - acknowledge the change
    changeReason = "Thank you for the clarification. This additional context changes my assessment.";
  } else {
    changeReason = "Based on your input, I'm updating my recommendation.";
  }

  return `**${changeReason}** Let me explain why:`;
}

/**
 * Build acknowledgment when holding firm on same verdict
 */
function buildHoldFirmAcknowledgment(
  userClarification: string,
  verdictPath: VerdictPath
): string {
  if (verdictPath === VerdictPath.PATH_C) {
    return "**I appreciate the additional context.** The information you provided confirms my original assessment:";
  } else {
    return "**I appreciate the clarification.** However, even with this new information, the assessment remains the same:";
  }
}

/**
 * Build a placeholder GateEvaluation for cases where the pipeline never ran
 * (e.g., brief too thin to evaluate — all gates remain Unknown).
 */
function buildEmptyGateEvaluation(): GateEvaluation {
  const unknownGate = (label: string) => ({
    label,
    status: "Unknown" as const,
    reasoning: "Not evaluated — brief was too thin to run gate analysis.",
  });
  return {
    gate_results: {
      G0: unknownGate("Interaction Model"),
      G1: unknownGate("Integration Level"),
      G2: unknownGate("Standalone Architecture"),
      G3: unknownGate("Lifespan (Longevity)"),
      G4: unknownGate("Portfolio Collision Risk"),
      G5: unknownGate("Legal/Localization Blocks"),
    },
    any_failures: false,
    missing_info: true,
  };
}

/**
 * Export singleton orchestrator interface
 */
export const orchestrator = {
  evaluate,
  evaluateWithClarification,
};
