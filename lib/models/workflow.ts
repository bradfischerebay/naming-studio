import type { CompiledBrief } from "./brief";
import type { LandscapeSynthesis } from "./landscape";
import type { NamingFacts } from "./facts";
import type { GateEvaluation } from "./gates";
import type { ScoringResult } from "./scoring";
import type { VerdictOutput } from "./verdict";

/**
 * Workflow State Models
 * Tracks the complete state through the naming evaluation pipeline
 */

export enum WorkflowPhase {
  INTAKE = "intake",
  PARSING = "parsing",
  RESEARCH = "research",
  EXTRACTION = "extraction",
  GATES = "gates",
  SCORING = "scoring",
  VERDICT = "verdict",
  FORMATTING = "formatting",
  COMPLETE = "complete",
  ERROR = "error",
}

export interface WorkflowState {
  phase: WorkflowPhase;
  rawInput?: string;
  parsedBrief?: CompiledBrief;
  landscapeData?: LandscapeSynthesis;
  factsData?: NamingFacts;
  gateEvaluation?: GateEvaluation;
  scoringResult?: ScoringResult;
  verdict?: VerdictOutput;
  errors?: string[];
  retryCount: number;
  maxRetries: number;
  timestamp: Date;
}

/**
 * Checkpoint for state persistence
 */
export interface WorkflowCheckpoint {
  id: string;
  state: WorkflowState;
  createdAt: Date;
}

/**
 * Workflow configuration
 */
export interface WorkflowConfig {
  maxRetries: number;
  enableCheckpointing: boolean;
  skipWebResearch: boolean;
  useDeepSights: boolean;
  verbose: boolean;
  model?: string;
}

export const DEFAULT_WORKFLOW_CONFIG: WorkflowConfig = {
  maxRetries: 1,
  enableCheckpointing: false,
  skipWebResearch: false,
  useDeepSights: false,
  verbose: false,
};

/**
 * State transition helpers
 */
export function createInitialState(config?: Partial<WorkflowConfig>): WorkflowState {
  const finalConfig = { ...DEFAULT_WORKFLOW_CONFIG, ...config };
  return {
    phase: WorkflowPhase.INTAKE,
    retryCount: 0,
    maxRetries: finalConfig.maxRetries,
    timestamp: new Date(),
  };
}

export function canRetry(state: WorkflowState): boolean {
  return state.retryCount < state.maxRetries;
}

export function incrementRetry(state: WorkflowState): WorkflowState {
  return {
    ...state,
    retryCount: state.retryCount + 1,
  };
}

export function isTerminalPhase(phase: WorkflowPhase): boolean {
  return [WorkflowPhase.COMPLETE, WorkflowPhase.ERROR].includes(phase);
}
