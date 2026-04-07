/**
 * Lab Run models
 * Data shapes for Lab evaluation run history (stored in Redis, displayed in UI).
 * Lives in lib/models/ so both lib/lab-storage.ts and UI pages can import it safely.
 */

export interface LabRunGateResult {
  status: "Pass" | "Fail" | "Pending";
  reasoning: string;
  evidence?: string;
  thinkingLength: number; // char count of streaming thinking text (not full text)
}

export interface LabRunScorerResult {
  total: number;
  reasoning: string;
  [key: string]: number | string; // dynamic factor keys (standalone, longevity, custom factors, etc.)
}

export interface LabRun {
  id: string;
  timestamp: string;
  brief: string;
  briefLength: number;
  contextHistory: string[];
  contextInjections: number;
  gateResults: Record<string, LabRunGateResult>;
  scorerResult?: LabRunScorerResult;
  verdictPath: string;
  durationMs: number;
  model: string;
}
