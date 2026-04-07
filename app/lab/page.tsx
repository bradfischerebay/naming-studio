"use client";

import { useState, useRef, useCallback, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Beaker,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Play,
  PauseCircle,
  ArrowLeft,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowUp,
  Plus,
  Paperclip,
  X,
  Loader2,
  Settings2,
  BarChart2,
  MessageSquare,
  Wand2,
  Zap,
  TestTube2,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import type { LabRun } from "@/lib/models/lab-run";

// ─── Types ────────────────────────────────────────────────────────────────────

type GateStatus = "idle" | "thinking" | "re-evaluating" | "done" | "error" | "blocked";

interface GateDecision {
  status: "Pass" | "Fail" | "Pending";
  reasoning: string;
  evidence?: string;
}

interface ScorerDecision {
  total: number;
  reasoning: string;
  [key: string]: number | string; // dynamic factor keys
}

interface GateState {
  status: GateStatus;
  thinking: string;
  decision?: GateDecision;
  error?: string;
}

interface ScorerState {
  status: GateStatus;
  thinking: string;
  decision?: ScorerDecision;
  error?: string;
}

type VerdictPath = "PATH_A0" | "PATH_A1" | "PATH_A2" | "PATH_B" | "PATH_C" | null;

// ─── Models ──────────────────────────────────────────────────────────────────

const MODELS = [
  { value: "azure-chat-completions-gpt-5-2-2025-12-11-sandbox", label: "GPT-5.2", group: "GPT", badge: "⭐" },
  { value: "azure-chat-completions-gpt-5-latest-sandbox", label: "GPT-5 Latest", group: "GPT" },
  { value: "azure-chat-completions-gpt-5-mini-2025-01-31-sandbox", label: "GPT-5 Mini", group: "GPT" },
  { value: "azure-chat-completions-gpt-4.1-sandbox", label: "GPT-4.1", group: "GPT" },
  { value: "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox", label: "Claude Sonnet 4.6", group: "Claude", badge: "⚠️ 6/min" },
  { value: "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox", label: "Claude Opus 4.6", group: "Claude", badge: "⚠️ 6/min" },
  { value: "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox", label: "Gemini 3.1 Pro", group: "Gemini" },
  { value: "gcp-chat-completions-chat-gemini-3.1-flash-preview-sandbox", label: "Gemini 3.1 Flash", group: "Gemini" },
];

const DEFAULT_MODEL = "azure-chat-completions-gpt-5-2-2025-12-11-sandbox";

// ─── Gate metadata ────────────────────────────────────────────────────────────

const GATE_META: Record<string, { label: string; description: string }> = {
  G0: { label: "Interaction Model", description: "Does the user actively see/interact with this feature?" },
  G1: { label: "Integration Level", description: "Does this have its own enrollment or entry point?" },
  G2: { label: "Standalone Architecture", description: "Does it operate as a separate system?" },
  G3: { label: "Strategic Lifespan", description: "Is this permanent (>12 months)?" },
  G4: { label: "Portfolio Alignment", description: "No naming collisions with existing eBay products?" },
  G5: { label: "Legal & Localization", description: "No trademark or regulatory blockers?" },
};

// Questions shown to users when a gate returns Pending
const GATE_QUESTIONS: Record<string, string> = {
  G0: "Does the user actively choose, see, or interact with this feature? Or does it run automatically in the background without user awareness?",
  G1: "Does this product have its own separate enrollment, onboarding, or dedicated entry point? Or is it embedded inside an existing eBay product?",
  G2: "Does this run as a separate technical system with its own service boundaries? Or does it share infrastructure with an existing platform?",
  G3: "What is the expected lifespan? Will this be live for 12+ months as a permanent addition, or is it promotional, seasonal, or time-limited?",
  G4: "Does the proposed name conflict with any existing eBay products, internal tools, or trademarks already in use?",
  G5: "Have trademark clearance and regulatory checks been done? Are there any known legal concerns, conflicts, or restrictions in target markets?",
};

const PATH_LABELS: Record<string, { label: string }> = {
  PATH_A0: { label: "Do Not Name — Use Inline Copy" },
  PATH_A1: { label: "Use a Descriptive Label" },
  PATH_A2: { label: "Use a Descriptive Label — Score Below Threshold" },
  PATH_B: { label: "More Information Needed" },
  PATH_C: { label: "Approved for Naming" },
};

const SCORE_FACTORS = [
  { key: "standalone", label: "Standalone behavior", max: 25 },
  { key: "longevity", label: "Longevity", max: 15 },
  { key: "legal", label: "Legal / Regulatory mandate", max: 10 },
  { key: "global", label: "Global viability", max: 10 },
  { key: "clarity", label: "Clarity lift", max: 10 },
];

// ─── Custom gate / scoring config types ──────────────────────────────────────

interface LocalCustomGateDef {
  label: string;
  description: string;
  passConditions: string[];
  failConditions: string[];
  disabled?: boolean;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface LocalCustomGateEntry {
  key: string;       // user-editable short key, e.g. "G6" or "BRAND"
  label: string;
  description: string;
  passConditions: string[];
  failConditions: string[];
  tier?: "blocker" | "parallel"; // blocker = sequential before G1; parallel = default
}

interface LocalCustomScoringFactor {
  key: string;       // auto-generated: "cf_0", "cf_1"...
  label: string;
  maxPoints: number;
  criteria: string;
}

interface LocalCustomScoringConfig {
  threshold: number;
  includeDefaultFactors: boolean;
  factorOverrides: Record<string, number>;   // standard key → new max points
  additionalFactors: LocalCustomScoringFactor[];
}

interface CustomConfig {
  gates: Record<string, LocalCustomGateDef>;
  additionalGates: LocalCustomGateEntry[];
  scoring: LocalCustomScoringConfig;
}

interface ConfigPreset {
  id: string;
  name: string;
  createdAt: string;
  config: CustomConfig;
}

const DEFAULT_GATE_CONFIG: Record<string, LocalCustomGateDef> = {
  G0: {
    label: "Interaction Model",
    description: "Does the user actively select, toggle, or see this feature?",
    passConditions: [
      "User makes an active choice to enable or use it",
      "Feature name is displayed as a trust signal in the UI",
    ],
    failConditions: [
      "Automatic or background process with no user awareness",
      "Invisible to the user — runs without interaction",
    ],
  },
  G1: {
    label: "Integration Level",
    description: "Does this have its own enrollment or dedicated entry point?",
    passConditions: [
      "Standalone app with a distinct, separate enrollment flow",
      "Has its own dedicated onboarding or subscription step",
    ],
    failConditions: [
      "Embedded feature within an existing eBay product",
      "No separate enrollment — accessed only within another product",
    ],
  },
  G2: {
    label: "Standalone Architecture",
    description: "Does it operate with distinct service boundaries?",
    passConditions: [
      "Microservice with distinct APIs and data models",
      "Can be deployed, scaled, and versioned independently",
    ],
    failConditions: [
      "Shared platform architecture with no independent boundaries",
      "Tightly coupled to an existing platform's infrastructure",
    ],
  },
  G3: {
    label: "Strategic Lifespan",
    description: "Is this permanent (12+ months)?",
    passConditions: [
      "Expected lifespan ≥12 months as a permanent addition",
      "Strategic roadmap item, not time-limited or promotional",
    ],
    failConditions: [
      "Shorter than 12 months, promotional, or seasonal",
      "Pilot or experiment without a committed long-term plan",
    ],
  },
  G4: {
    label: "Portfolio Alignment",
    description: "No naming collisions with existing eBay products?",
    passConditions: [
      "No naming conflicts with existing eBay products or trademarks",
      "Name clearly differentiates from portfolio neighbors",
    ],
    failConditions: [
      "Conflicts with or resembles an existing eBay product name",
      "Would create confusion within the eBay product portfolio",
    ],
  },
  G5: {
    label: "Legal & Localization",
    description: "No trademark or regulatory blockers?",
    passConditions: [
      "No trademark conflicts in target markets",
      "Passes regulatory and localization checks",
    ],
    failConditions: [
      "Trademark issues in one or more target markets",
      "Regulatory or legal restrictions identified",
    ],
  },
};

const DEFAULT_SCORING_CONFIG: LocalCustomScoringConfig = {
  threshold: 60,
  includeDefaultFactors: true,
  factorOverrides: {},
  additionalFactors: [],
};

const DEFAULT_CUSTOM_CONFIG: CustomConfig = {
  gates: { ...DEFAULT_GATE_CONFIG },
  additionalGates: [],
  scoring: DEFAULT_SCORING_CONFIG,
};

const DEFAULT_SCORE_FACTORS_BASE = [
  { key: "standalone", label: "Standalone behavior", max: 25 },
  { key: "longevity", label: "Longevity", max: 15 },
  { key: "legal", label: "Legal / Regulatory mandate", max: 10 },
  { key: "global", label: "Global viability", max: 10 },
  { key: "clarity", label: "Clarity lift", max: 10 },
];

// ─── localStorage helpers ─────────────────────────────────────────────────────

const STORAGE_KEY = "naming-lab-custom-config-v1";

function loadLocalConfig(): CustomConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomConfig) : null;
  } catch {
    return null;
  }
}

function saveLocalConfig(config: CustomConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore quota errors
  }
}

// Default briefs for Quick Test — one per expected verdict path
const DEFAULT_QUICK_TEST_BRIEFS = [
  // PATH_C — standalone, permanent, global, legal mandate
  "eBay is launching a fully standalone seller authentication vault that stores verified credentials. Sellers must sign up through a separate enrollment portal before accessing the service. The vault will be permanently available as a core platform capability for 2+ years. It is targeting US, UK, and German markets, with a legal team mandate due to compliance requirements. The system runs on independent microservice infrastructure with its own dedicated API layer.",
  // PATH_A0 — background process, invisible to users
  "eBay is building an AI-powered risk scoring engine to detect fraudulent listings automatically. The engine runs silently in the background each time a listing is created or updated. Sellers never see the engine or interact with it directly — it just flags listings for internal review. The service will be permanent and operates globally across all eBay markets. It uses shared backend infrastructure tied to eBay's existing fraud prevention platform.",
  // PATH_A1 — embedded feature, fails G1
  "eBay is adding a gift card redemption feature to the standard eBay checkout flow. Buyers apply gift card codes on the existing checkout page via a new input field. The feature is integrated into the existing checkout platform with no separate enrollment or onboarding. It is a permanent addition to the checkout experience across US, UK, and Canadian markets. The infrastructure shares eBay's existing payment processing backend.",
  // PATH_A2 — all gates pass, low score (US-only, no legal, no clarity lift)
  "eBay is launching a standalone product photography tool for small business sellers in the US. Sellers download it as a separate desktop app and onboard independently through a self-service flow. The tool will be live for 24+ months as a permanent addition to eBay's seller toolkit. It is only available in the US market with no international expansion planned. There is no legal mandate or trademark requirement associated with this feature.",
  // PATH_B — insufficient info, key questions unanswered
  "eBay is introducing a new seller service for managing returns. It will help sellers process return requests more efficiently and reduce disputes. The service may or may not require separate enrollment — this is still being discussed. We are still finalizing the scope, target markets, and timeline for this initiative. The technical architecture details have not yet been decided.",
];

const EXAMPLE_BRIEFS = [
  "eBay is launching a managed shipping service for high-volume sellers in the US and UK. Sellers opt in separately, eBay negotiates bulk carrier rates, and the service includes a dedicated dashboard and shipment tracking. Planned as a permanent addition launching Q3 2026.",
  "We're building an AI-powered listing description generator. Users can enable or disable it in the seller hub settings. Initially US-only with global rollout planned for Q1 2027. Standalone backend service with its own data model.",
  "New checkout toggle that lets buyers add gift wrapping to their order. It's a paid add-on — seller opts in, buyer sees it in checkout. Launching for holiday season 2026 only (3-month campaign).",
];

// ─── Evidence parser ──────────────────────────────────────────────────────────

function parseEvidenceItems(evidence: string): string[] {
  if (!evidence?.trim()) return [];
  // Match content inside double quotes: "item one", "item two"
  const matches = evidence.match(/"([^"]+)"/g);
  if (matches && matches.length > 1) {
    return matches.map((m) => m.slice(1, -1)).filter(Boolean);
  }
  // Fallback: return as single item
  return [evidence];
}

// ─── Gate Card ────────────────────────────────────────────────────────────────

function GateCard({
  gateKey,
  state,
  onRetry,
  fullWidth,
  meta: metaOverride,
}: {
  gateKey: string;
  state: GateState;
  onRetry: (gate: string) => void;
  fullWidth?: boolean;
  meta?: { label: string; description: string };
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const meta = metaOverride ?? GATE_META[gateKey] ?? { label: gateKey, description: "" };

  useEffect(() => {
    if (scrollRef.current && state.status === "thinking") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.thinking, state.status]);

  const statusBadge = () => {
    switch (state.status) {
      case "idle":
        return <span className="text-[10px] font-medium text-slate-400 px-2 py-0.5 bg-slate-100 rounded-full">Waiting</span>;
      case "blocked":
        return <span className="text-[10px] font-medium text-slate-300 px-2 py-0.5 bg-slate-50 rounded-full">Blocked</span>;
      case "thinking":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 px-2 py-0.5 bg-blue-50 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
            Thinking
          </span>
        );
      case "re-evaluating":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 px-2 py-0.5 bg-amber-50 rounded-full">
            <PauseCircle className="h-3 w-3" />
            Re-evaluating
          </span>
        );
      case "done":
        if (!state.decision) return null;
        if (state.decision.status === "Pass")
          return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 px-2 py-0.5 bg-green-100 rounded-full"><CheckCircle2 className="h-3 w-3" /> Pass</span>;
        if (state.decision.status === "Fail")
          return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-700 px-2 py-0.5 bg-red-100 rounded-full"><XCircle className="h-3 w-3" /> Fail</span>;
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 px-2 py-0.5 bg-amber-100 rounded-full"><AlertCircle className="h-3 w-3" /> Pending</span>;
      case "error":
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-700 px-2 py-0.5 bg-red-100 rounded-full"><AlertCircle className="h-3 w-3" /> Error</span>;
    }
  };

  const cardBorder = () => {
    if (state.status === "blocked") return "border-slate-100 opacity-40";
    if (state.status === "thinking") return "border-blue-300 shadow-sm shadow-blue-100";
    if (state.status === "re-evaluating") return "border-amber-300";
    if (state.status === "done") {
      if (state.decision?.status === "Pass") return "border-green-300";
      if (state.decision?.status === "Fail") return "border-red-300";
      return "border-amber-300";
    }
    if (state.status === "error") return "border-red-300";
    return "border-slate-200";
  };

  const evidenceItems = state.decision?.evidence ? parseEvidenceItems(state.decision.evidence) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border bg-white flex flex-col overflow-hidden transition-colors duration-300 ${cardBorder()} ${fullWidth ? "col-span-full" : ""}`}
    >
      <div className="px-3 pt-3 pb-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{gateKey}</span>
            {statusBadge()}
          </div>
          <p className="text-xs font-semibold text-slate-800 leading-snug">{meta.label}</p>
          <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{meta.description}</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex-1 px-3 pb-3 max-h-44 overflow-y-auto ${state.status === "re-evaluating" ? "opacity-50" : ""}`}
      >
        {state.status === "idle" && (
          <p className="text-[11px] text-slate-300 italic">Waiting for evaluation to start...</p>
        )}

        {state.status === "blocked" && (
          <p className="text-[11px] text-slate-300 italic">Skipped — G0 gate did not pass.</p>
        )}

        {/* Show raw thinking while agent is working */}
        {(state.status === "thinking" || state.status === "re-evaluating") && (
          <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap break-words">
            {state.thinking}
            {state.status === "thinking" && (
              <span className="inline-block w-1.5 h-3 bg-blue-400 ml-0.5 animate-pulse align-middle" />
            )}
          </p>
        )}

        {state.status === "re-evaluating" && !state.thinking && (
          <p className="text-[11px] text-amber-600 italic">Re-evaluating with new context...</p>
        )}

        {/* Show formatted decision when done */}
        {state.status === "done" && state.decision && (
          <div className="space-y-2">
            <p className="text-[11px] text-slate-700 leading-relaxed">{state.decision.reasoning}</p>
            {evidenceItems.length > 0 && (
              <div className="pt-1.5 border-t border-slate-100">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Evidence from brief</p>
                <ul className="space-y-1">
                  {evidenceItems.map((item, i) => (
                    <li key={i} className="flex gap-1.5 text-[11px] text-slate-500 leading-snug">
                      <span className="text-slate-300 flex-shrink-0 mt-0.5">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {state.status === "error" && (
          <div>
            <p className="text-[11px] text-red-600 mb-2">{state.error ?? "Evaluation error"}</p>
            <button
              onClick={() => onRetry(gateKey)}
              className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 hover:text-slate-700 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Retry
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Scorer Card ──────────────────────────────────────────────────────────────

function ScorerCard({ state, scoringFactors }: { state: ScorerState; scoringFactors: Array<{ key: string; label: string; max: number }> }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && state.status === "thinking") {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.thinking, state.status]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-slate-300 bg-white overflow-hidden col-span-full"
    >
      <div className="px-4 pt-3 pb-2 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-slate-600" />
          <span className="text-xs font-semibold text-slate-700">Naming Score Agent</span>
          <span className="text-[10px] text-slate-400">— All gates passed</span>
        </div>
        {state.status === "thinking" && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-700 px-2 py-0.5 bg-blue-50 rounded-full animate-pulse">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
            Calculating
          </span>
        )}
        {state.status === "done" && state.decision && (
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
            state.decision.total >= 60 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {state.decision.total}/70 — {state.decision.total >= 60 ? "Passes" : "Below threshold"}
          </span>
        )}
      </div>

      <div ref={scrollRef} className="px-4 py-3 max-h-48 overflow-y-auto">
        {(state.thinking && state.status !== "done") && (
          <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-wrap">
            {state.thinking}
            {state.status === "thinking" && (
              <span className="inline-block w-1.5 h-3 bg-blue-400 ml-0.5 animate-pulse align-middle" />
            )}
          </p>
        )}

        {state.status === "done" && state.decision && (
          <div className="space-y-3">
            {scoringFactors.map(({ key, label, max }) => {
              const val = (state.decision![key] ?? 0) as number;
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-slate-700">{label}</span>
                    <span className="text-[11px] font-mono text-slate-500">{val}/{max}</span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${val > 0 ? "bg-green-500" : "bg-slate-200"}`}
                      style={{ width: `${Math.min((val / max) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {/* Risk deductions — only shown for default scoring with negative values */}
            {((state.decision.portfolio_risk as number) < 0 || (state.decision.trademark_risk as number) < 0) && (
              <div className="pt-2 border-t border-red-100 space-y-1">
                {(state.decision.portfolio_risk as number) < 0 && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-red-700">Portfolio collision</span>
                    <span className="font-mono text-red-700">{state.decision.portfolio_risk}</span>
                  </div>
                )}
                {(state.decision.trademark_risk as number) < 0 && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-red-700">Trademark risk</span>
                    <span className="font-mono text-red-700">{state.decision.trademark_risk}</span>
                  </div>
                )}
              </div>
            )}
            {state.decision.reasoning && (
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">{state.decision.reasoning as string}</p>
            )}
          </div>
        )}

        {state.status === "error" && (
          <p className="text-[11px] text-red-600">{state.error ?? "Scoring error"}</p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Verdict Display ──────────────────────────────────────────────────────────

function VerdictDisplay({
  path,
  score,
  pendingGates,
}: {
  path: VerdictPath;
  score?: number;
  pendingGates?: Array<{ gate: string; question: string }>;
}) {
  if (!path) return null;
  const meta = PATH_LABELS[path];
  const isGreen = path === "PATH_C";
  const isAmber = path === "PATH_B" || path === "PATH_A2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-5 ${
        isGreen ? "bg-green-50 border-green-200" : isAmber ? "bg-amber-50 border-amber-200" : "bg-red-50 border-red-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {isGreen ? (
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          ) : isAmber ? (
            <AlertCircle className="h-6 w-6 text-amber-600" />
          ) : (
            <XCircle className="h-6 w-6 text-red-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-bold ${isGreen ? "text-green-900" : isAmber ? "text-amber-900" : "text-red-900"}`}>
            {meta.label}
          </p>
          {score !== undefined && (
            <p className={`text-xs mt-1 ${isGreen ? "text-green-700" : isAmber ? "text-amber-700" : "text-red-700"}`}>
              Naming score: {score}/70 — {score >= 60 ? "Passes naming threshold" : "Below 60-point threshold"}
            </p>
          )}

          {/* PATH_B: structured questions */}
          {path === "PATH_B" && pendingGates && pendingGates.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-xs font-semibold text-amber-800">
                To continue the evaluation, please answer the following:
              </p>
              <div className="space-y-2.5">
                {pendingGates.map(({ gate, question }) => (
                  <div key={gate} className="flex gap-2.5 items-start">
                    <span className="text-[10px] font-bold font-mono bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">
                      {gate}
                    </span>
                    <p className="text-xs text-amber-800 leading-relaxed">{question}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-amber-600 pt-1">
                Type your answers in the input below and press Send — the evaluation will resume with your new information.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Gate Config Panel ────────────────────────────────────────────────────────

function GateConfigPanel({
  config,
  additionalGates,
  onChangeGates,
  onChangeAdditional,
}: {
  config: Record<string, LocalCustomGateDef>;
  additionalGates: LocalCustomGateEntry[];
  onChangeGates: (g: Record<string, LocalCustomGateDef>) => void;
  onChangeAdditional: (g: LocalCustomGateEntry[]) => void;
}) {
  const [openGate, setOpenGate] = useState<string | null>(null);

  const update = (gateKey: string, field: keyof LocalCustomGateDef, value: string | string[]) => {
    onChangeGates({ ...config, [gateKey]: { ...config[gateKey], [field]: value } });
  };

  const conditionsToText = (arr: string[]) => arr.join("\n");
  const textToConditions = (text: string) =>
    text.split("\n").map((s) => s.trim()).filter(Boolean);

  const updateCustom = (idx: number, field: keyof LocalCustomGateEntry, value: string | string[]) => {
    const next = [...additionalGates];
    next[idx] = { ...next[idx], [field]: value };
    onChangeAdditional(next);
  };

  const removeCustom = (idx: number) => {
    onChangeAdditional(additionalGates.filter((_, i) => i !== idx));
  };

  const addCustomGate = () => {
    const existingKeys = new Set([...Object.keys(DEFAULT_GATE_CONFIG), ...additionalGates.map(g => g.key)]);
    let n = additionalGates.length;
    let key = `CG${n}`;
    while (existingKeys.has(key)) key = `CG${++n}`;
    onChangeAdditional([...additionalGates, { key, label: "", description: "", passConditions: [], failConditions: [] }]);
  };

  const [generatingIdx, setGeneratingIdx] = useState<number | null>(null);
  const genAbortRef = useRef<AbortController | null>(null);

  // Cancel in-flight generate request on unmount
  useEffect(() => () => { genAbortRef.current?.abort(); }, []);

  const handleGenerateConditions = async (idx: number) => {
    const gate = additionalGates[idx];
    if (!gate.label.trim() || generatingIdx !== null) return;

    genAbortRef.current?.abort();
    const controller = new AbortController();
    genAbortRef.current = controller;

    setGeneratingIdx(idx);
    try {
      const res = await fetch("/api/lab/generate-conditions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: gate.label, description: gate.description }),
        signal: controller.signal,
      });
      if (controller.signal.aborted) return;
      const data = await res.json() as { passConditions?: string[]; failConditions?: string[] };
      if ((data.passConditions || data.failConditions) && !controller.signal.aborted) {
        const next = [...additionalGates];
        next[idx] = {
          ...next[idx],
          passConditions: data.passConditions ?? next[idx].passConditions,
          failConditions: data.failConditions ?? next[idx].failConditions,
        };
        onChangeAdditional(next);
      }
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
      toast.error("Couldn't generate conditions — add more detail to the label and description, then try again.");
    } finally {
      if (!controller.signal.aborted) {
        setGeneratingIdx(null);
      }
    }
  };

  const gateKeys = Object.keys(DEFAULT_GATE_CONFIG);

  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 leading-relaxed">
        Customize how each gate agent evaluates your brief. Changes apply to the next evaluation run. Reset to restore defaults.
      </p>
      {gateKeys.map((gateKey) => {
        const gate = config[gateKey];
        const isOpen = openGate === gateKey;
        const isModified = JSON.stringify(gate) !== JSON.stringify(DEFAULT_GATE_CONFIG[gateKey]);

        return (
          <div key={gateKey} className={`rounded-xl border bg-white overflow-hidden transition-colors ${gate.disabled ? "opacity-50 border-slate-200" : isModified ? "border-blue-200" : "border-slate-200"}`}>
            <button
              type="button"
              onClick={() => setOpenGate(isOpen ? null : gateKey)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold text-slate-400 font-mono w-5">{gateKey}</span>
                <span className={`text-xs font-semibold ${gate.disabled ? "text-slate-400 line-through" : "text-slate-800"}`}>{gate.label}</span>
                {isModified && !gate.disabled && (
                  <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">Modified</span>
                )}
                {gate.disabled && (
                  <span className="text-[9px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full">Disabled</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Enable/disable toggle */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeGates({ ...config, [gateKey]: { ...config[gateKey], disabled: !gate.disabled } });
                  }}
                  className={`relative w-8 h-4 rounded-full transition-colors flex-shrink-0 ${gate.disabled ? "bg-slate-200" : "bg-blue-500"}`}
                  title={gate.disabled ? "Enable gate" : "Disable gate"}
                >
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${gate.disabled ? "translate-x-0.5" : "translate-x-4.5"}`} />
                </button>
                {isModified && !gate.disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeGates({ ...config, [gateKey]: { ...DEFAULT_GATE_CONFIG[gateKey] } });
                    }}
                    className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-100 transition-colors"
                    title="Reset to default"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
                {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Label</label>
                  <input
                    type="text"
                    value={gate.label}
                    onChange={(e) => update(gateKey, "label", e.target.value)}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Description</label>
                  <input
                    type="text"
                    value={gate.description}
                    onChange={(e) => update(gateKey, "description", e.target.value)}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Pass conditions <span className="text-slate-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    value={conditionsToText(gate.passConditions)}
                    onChange={(e) => update(gateKey, "passConditions", textToConditions(e.target.value))}
                    rows={3}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-green-400 focus:bg-white transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Fail conditions <span className="text-slate-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    value={conditionsToText(gate.failConditions)}
                    onChange={(e) => update(gateKey, "failConditions", textToConditions(e.target.value))}
                    rows={3}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-400 focus:bg-white transition-colors resize-none"
                  />
                </div>
              </div>
            )}
            {gate.disabled && gateKey === "G0" && (
              <div className="px-4 py-2 bg-amber-50 border-t border-amber-100">
                <p className="text-[10px] text-amber-700 leading-snug">
                  ⚠ G0 is the primary interaction gate. Disabling it removes the "no user interaction = do not name" rule and allows all briefs to proceed regardless of user visibility.
                </p>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => onChangeGates({ ...DEFAULT_GATE_CONFIG })}
        className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 py-2 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset all gates to defaults
      </button>

      {/* ── Additional custom gates ── */}
      <div className="pt-2 border-t border-slate-200">
        <p className="text-xs font-semibold text-slate-700 mb-2">Additional Gates</p>
        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          Add custom gates that run in parallel with G2-G5. Only gates with a key and label are included in the evaluation.
        </p>

        {additionalGates.length > 0 && (
          <div className="space-y-2 mb-2">
            {additionalGates.map((gate, idx) => (
              <div key={idx} className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 space-y-2.5">
                {/* Row 1: Key, Label, Remove */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Key</label>
                      <input
                        type="text"
                        value={gate.key}
                        maxLength={8}
                        onChange={(e) => updateCustom(idx, "key", e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, ""))}
                        placeholder="G6"
                        className="w-full text-xs font-mono text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
                      />
                      <p className="text-[9px] text-slate-400 mt-0.5 leading-snug">Short unique ID shown in gate cards (e.g. G6, BRAND)</p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Label</label>
                      <input
                        type="text"
                        value={gate.label}
                        onChange={(e) => updateCustom(idx, "label", e.target.value)}
                        placeholder="Brand Differentiation"
                        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCustom(idx)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors mt-4"
                    title="Remove gate"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Row 2: Description + Tier */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Description</label>
                    <input
                      type="text"
                      value={gate.description}
                      onChange={(e) => updateCustom(idx, "description", e.target.value)}
                      placeholder="What does this gate evaluate?"
                      className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Evaluation order</label>
                    <select
                      value={gate.tier ?? "parallel"}
                      onChange={(e) => updateCustom(idx, "tier", e.target.value as "blocker" | "parallel")}
                      className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="parallel">Parallel (with G2-G5)</option>
                      <option value="blocker">Blocker (before G1)</option>
                    </select>
                    <p className="text-[9px] text-slate-400 mt-0.5">Blocker gates fail-fast like G0</p>
                  </div>
                </div>

                {/* Row 3: Pass/Fail conditions + Generate button */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Conditions</label>
                    <button
                      type="button"
                      disabled={!gate.label.trim() || generatingIdx !== null}
                      onClick={() => handleGenerateConditions(idx)}
                      className="flex items-center gap-1 text-[10px] font-medium text-purple-600 hover:text-purple-800 disabled:opacity-40 disabled:cursor-not-allowed px-2 py-0.5 rounded-lg hover:bg-purple-50 transition-colors"
                      title="AI-generate conditions from label + description"
                    >
                      {generatingIdx === idx ? (
                        <><Loader2 className="h-3 w-3 animate-spin" /> Generating...</>
                      ) : (
                        <><Wand2 className="h-3 w-3" /> Generate with AI</>
                      )}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Pass <span className="font-normal">(one per line)</span></label>
                      <textarea
                        value={conditionsToText(gate.passConditions)}
                        onChange={(e) => updateCustom(idx, "passConditions", textToConditions(e.target.value))}
                        rows={3}
                        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-green-400 transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Fail <span className="font-normal">(one per line)</span></label>
                      <textarea
                        value={conditionsToText(gate.failConditions)}
                        onChange={(e) => updateCustom(idx, "failConditions", textToConditions(e.target.value))}
                        rows={3}
                        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-red-400 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addCustomGate}
          className="w-full flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 py-2 rounded-lg border border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add gate
        </button>
      </div>
    </div>
  );
}

// ─── Scoring Config Panel ─────────────────────────────────────────────────────

function ScoringConfigPanel({
  config,
  onChange,
}: {
  config: LocalCustomScoringConfig;
  onChange: (c: LocalCustomScoringConfig) => void;
}) {
  const addFactor = () => {
    onChange({
      ...config,
      additionalFactors: [
        ...config.additionalFactors,
        { key: `cf_${Date.now()}`, label: "", maxPoints: 10, criteria: "" },
      ],
    });
  };

  const updateFactor = (idx: number, field: keyof LocalCustomScoringFactor, value: string | number) => {
    const next = [...config.additionalFactors];
    next[idx] = { ...next[idx], [field]: value };
    onChange({ ...config, additionalFactors: next });
  };

  const removeFactor = (idx: number) => {
    onChange({ ...config, additionalFactors: config.additionalFactors.filter((_, i) => i !== idx) });
  };

  const isDefaultModified = config.threshold !== 60 || !config.includeDefaultFactors ||
    Object.keys(config.factorOverrides).length > 0;

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 leading-relaxed">
        Adjust how the scoring agent evaluates briefs. Toggle off defaults to build a fully custom scoring system.
      </p>

      {/* Threshold */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
            Points required to proceed (threshold)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={10}
              max={500}
              value={config.threshold}
              onChange={(e) => onChange({ ...config, threshold: parseInt(e.target.value) || 60 })}
              className="w-20 text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <span className="text-xs text-slate-400">points minimum to approve</span>
            {config.threshold !== 60 && (
              <button
                type="button"
                onClick={() => onChange({ ...config, threshold: 60 })}
                className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="h-3 w-3" /> Reset to 60
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Default factors toggle */}
      <div>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={config.includeDefaultFactors}
            onChange={(e) => onChange({ ...config, includeDefaultFactors: e.target.checked })}
            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
            Include default scoring factors
          </span>
          <span className="text-[10px] text-slate-400">(standalone, longevity, legal, global, clarity)</span>
        </label>
      </div>

      {/* Default factor point overrides */}
      {config.includeDefaultFactors && (
        <div className="space-y-2 pl-2 border-l-2 border-slate-200">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Adjust max points per factor</p>
          {DEFAULT_SCORE_FACTORS_BASE.map((f) => {
            const current = config.factorOverrides[f.key] ?? f.max;
            const modified = current !== f.max;
            return (
              <div key={f.key} className="flex items-center gap-2">
                <span className={`text-xs flex-1 ${modified ? "font-medium text-slate-800" : "text-slate-600"}`}>{f.label}</span>
                <input
                  type="number"
                  min={0}
                  max={200}
                  value={current}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (isNaN(val)) return;
                    const overrides = { ...config.factorOverrides };
                    if (val === f.max) { delete overrides[f.key]; }
                    else { overrides[f.key] = val; }
                    onChange({ ...config, factorOverrides: overrides });
                  }}
                  className={`w-16 text-xs font-mono text-slate-800 bg-white border rounded-lg px-2 py-1 focus:outline-none focus:border-blue-400 transition-colors ${modified ? "border-blue-300" : "border-slate-200"}`}
                />
                <span className="text-[10px] text-slate-400">pts</span>
                {modified && (
                  <button
                    type="button"
                    onClick={() => {
                      const overrides = { ...config.factorOverrides };
                      delete overrides[f.key];
                      onChange({ ...config, factorOverrides: overrides });
                    }}
                    className="text-[10px] text-slate-400 hover:text-slate-600"
                    title="Reset to default"
                  >
                    <RotateCcw className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Additional scoring factors */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide flex-1">Additional scoring factors</p>
        </div>

        {config.additionalFactors.length > 0 && (
          <div className="space-y-2 mb-2">
            {config.additionalFactors.map((factor, idx) => (
              <div key={factor.key} className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Factor name</label>
                        <input
                          type="text"
                          value={factor.label}
                          onChange={(e) => updateFactor(idx, "label", e.target.value)}
                          placeholder="Brand Clarity"
                          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Max pts</label>
                        <input
                          type="number"
                          min={1}
                          max={200}
                          value={factor.maxPoints}
                          onChange={(e) => updateFactor(idx, "maxPoints", parseInt(e.target.value) || 10)}
                          className="w-full text-xs font-mono text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">Criteria — what earns these points</label>
                      <textarea
                        value={factor.criteria}
                        onChange={(e) => updateFactor(idx, "criteria", e.target.value)}
                        rows={2}
                        placeholder="e.g. Has a distinct brand personality that differentiates from competitors"
                        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFactor(idx)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors mt-4"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={addFactor}
          className="w-full flex items-center justify-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 py-2 rounded-lg border border-dashed border-blue-300 hover:border-blue-400 hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          Add scoring factor
        </button>
      </div>

      {/* Reset scoring */}
      {isDefaultModified && (
        <button
          type="button"
          onClick={() => onChange(DEFAULT_SCORING_CONFIG)}
          className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 py-2 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset scoring to defaults
        </button>
      )}
    </div>
  );
}

// ─── Quick Test Panel ─────────────────────────────────────────────────────────

interface QuickTestGateResult {
  status: string;
  reasoning: string;
}
interface QuickTestSimResult {
  brief: string;
  verdict: string;
  gateResults: Record<string, QuickTestGateResult>;
  scorerResult?: { total: number; reasoning: string };
}

const VERDICT_SHORT: Record<string, string> = {
  PATH_A0: "A0",
  PATH_A1: "A1",
  PATH_A2: "A2",
  PATH_B: "B",
  PATH_C: "C",
};

const QuickTestPanel = memo(function QuickTestPanel({
  customGates,
  customScoring,
  disabledGates,
}: {
  customGates: Record<string, object>;
  customScoring?: object;
  disabledGates: string[];
}) {
  const [briefs, setBriefs] = useState<string[]>(DEFAULT_QUICK_TEST_BRIEFS);
  const [results, setResults] = useState<(QuickTestSimResult | null)[]>([null, null, null, null, null]);
  const [isRunning, setIsRunning] = useState(false);
  const [openSlot, setOpenSlot] = useState<number | null>(null);
  const [simError, setSimError] = useState<string | null>(null);
  const simAbortRef = useRef<AbortController | null>(null);

  // Cancel in-flight simulation when component unmounts (e.g., user switches tabs)
  useEffect(() => () => { simAbortRef.current?.abort(); }, []);

  const verdictColor = (v: string) => {
    if (v === "PATH_C") return "text-green-700 bg-green-100";
    if (v === "PATH_B") return "text-amber-700 bg-amber-100";
    return "text-red-700 bg-red-100";
  };

  const gateColor = (status: string) => {
    if (status === "Pass") return "bg-green-100 text-green-700";
    if (status === "Fail") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  const gateSymbol = (status: string) => {
    if (status === "Pass") return "✓";
    if (status === "Fail") return "✕";
    return "?";
  };

  const verdictLabel = (v: string) => {
    if (v === "PATH_C") return "✓ Approved";
    if (v === "PATH_B") return "? Need Info";
    if (v === "PATH_A0") return "✕ No Name";
    if (v === "PATH_A1") return "✕ No Name";
    if (v === "PATH_A2") return "✕ Low Score";
    return v;
  };

  const runSimulation = async () => {
    const filledBriefs = briefs.filter((b) => b.trim().length > 0);
    if (!filledBriefs.length || isRunning) return;

    simAbortRef.current?.abort();
    const controller = new AbortController();
    simAbortRef.current = controller;

    setIsRunning(true);
    setResults(briefs.map(() => null));
    setSimError(null);
    try {
      const res = await fetch("/api/lab/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ briefs: filledBriefs, customGates, customScoring, disabledGates }),
        signal: controller.signal,
      });
      if (!res.ok) {
        const errorData = await res.json() as { error?: string };
        setSimError(errorData.error ?? "Simulation failed");
        return;
      }
      const data = await res.json() as { results?: QuickTestSimResult[] };
      if (data.results && !controller.signal.aborted) {
        // Map results back to original brief positions using a cursor (not shift())
        let resultIdx = 0;
        const mapped: (QuickTestSimResult | null)[] = briefs.map((b) => {
          if (!b.trim()) return null;
          return data.results![resultIdx++] ?? null;
        });
        setResults(mapped);
      }
    } catch (err) {
      if ((err as { name?: string })?.name === "AbortError") return;
      // silent failure for other errors
    } finally {
      if (!controller.signal.aborted) {
        setIsRunning(false);
      }
    }
  };

  // Get all gate keys that appear across results
  const allResultGateKeys = Array.from(
    new Set(results.flatMap((r) => (r ? Object.keys(r.gateResults) : [])))
  );

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500 leading-relaxed">
        Test your gate configuration against 5 briefs at once. Edit any brief slot, then run the simulation to see the verdict grid.
      </p>

      {/* Brief slots */}
      <div className="space-y-2">
        {briefs.map((brief, idx) => {
          const result = results[idx];
          const isOpen = openSlot === idx;
          return (
            <div key={idx} className={`rounded-xl border bg-white overflow-hidden ${result ? (result.verdict === "PATH_C" ? "border-green-200" : result.verdict === "PATH_B" ? "border-amber-200" : "border-red-200") : "border-slate-200"}`}>
              <button
                type="button"
                onClick={() => setOpenSlot(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="text-[10px] font-bold text-slate-400 font-mono w-5 flex-shrink-0">#{idx + 1}</span>
                <span className="flex-1 text-xs text-slate-600 truncate">{brief.slice(0, 80) || <span className="text-slate-300 italic">Empty slot</span>}</span>
                {result && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 ${verdictColor(result.verdict)}`}>
                    {VERDICT_SHORT[result.verdict] ?? result.verdict}
                    {result.scorerResult ? ` · ${result.scorerResult.total}pts` : ""}
                  </span>
                )}
                {isOpen ? <ChevronUp className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-3 border-t border-slate-100 pt-2 space-y-2">
                  <textarea
                    value={brief}
                    onChange={(e) => {
                      const next = [...briefs];
                      next[idx] = e.target.value;
                      setBriefs(next);
                    }}
                    rows={4}
                    className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors resize-none"
                    placeholder="Paste a brief to test this slot..."
                  />
                  {result && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {allResultGateKeys.map((gate) => {
                        const gr = result.gateResults[gate];
                        if (!gr) return null;
                        return (
                          <span key={gate} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${gateColor(gr.status)}`}>
                            {gate}: {gr.status.slice(0, 1)}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Results grid (compact, only shown when there are results) */}
      {results.some(Boolean) && (
        <div className="space-y-2">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-3 py-2 font-semibold text-slate-500">Brief</th>
                  {allResultGateKeys.map((g) => (
                    <th key={g} className="px-2 py-2 font-mono font-semibold text-slate-400 text-center" title={`Gate ${g}`}>{g}</th>
                  ))}
                  <th className="px-3 py-2 font-semibold text-slate-500 text-center">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0">
                    <td className="px-3 py-2 text-slate-500 max-w-[140px] truncate">#{idx + 1} {briefs[idx]?.slice(0, 30)}…</td>
                    {allResultGateKeys.map((gate) => {
                      const gr = result?.gateResults[gate];
                      if (!gr) return <td key={gate} className="px-2 py-2 text-center text-slate-300 font-bold">—</td>;
                      return (
                        <td key={gate} className="px-2 py-2 text-center" title={`${gate}: ${gr.status} — ${gr.reasoning}`}>
                          <span className={`inline-block w-6 h-6 leading-6 rounded-full font-bold text-center ${gateColor(gr.status)}`}>
                            {gateSymbol(gr.status)}
                          </span>
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-center">
                      {result ? (
                        <span className={`inline-block px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${verdictColor(result.verdict)}`}>
                          {verdictLabel(result.verdict)}
                          {result.scorerResult ? ` · ${result.scorerResult.total}pts` : ""}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[9px] text-slate-400">
            <span className="font-semibold text-slate-500">Gates:</span>
            <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 leading-4 rounded-full text-center font-bold bg-green-100 text-green-700">✓</span> Pass</span>
            <span className="flex items-center gap-1"><span className="inline-block w-4 h-4 leading-4 rounded-full text-center font-bold bg-red-100 text-red-700">✕</span> Fail</span>
            <span className="flex items-center gap-1"><span className="text-slate-300 font-bold">—</span> Skipped (blocked by earlier fail)</span>
            <span className="mx-1 text-slate-200">|</span>
            <span className="font-semibold text-slate-500">Verdicts:</span>
            <span className="text-green-700">✓ Approved = proceed with naming</span>
            <span className="text-amber-700">? Need Info = missing details</span>
            <span className="text-red-700">✕ No Name / Low Score = use a descriptive label</span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={runSimulation}
        disabled={isRunning || !briefs.some((b) => b.trim())}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {isRunning ? (
          <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Running simulation…</>
        ) : (
          <><TestTube2 className="h-3.5 w-3.5" /> Run simulation</>
        )}
      </button>
      {simError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-700">{simError}</p>
        </div>
      )}
      {isRunning && (
        <p className="text-center text-[11px] text-slate-400">
          Running {briefs.filter(b => b.trim()).length} brief{briefs.filter(b => b.trim()).length !== 1 ? "s" : ""} in parallel — this may take 30-60 seconds…
        </p>
      )}
    </div>
  );
});

// ─── Run Audit Panel ──────────────────────────────────────────────────────────

function RunAuditPanel({ runs }: { runs: LabRun[] }) {
  const [selectedRunId, setSelectedRunId] = useState<string | null>(runs[0]?.id ?? null);

  const run = runs.find((r) => r.id === selectedRunId) ?? runs[0];

  if (!runs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BarChart2 className="h-8 w-8 text-slate-300 mb-3" />
        <p className="text-sm font-medium text-slate-400">No runs yet</p>
        <p className="text-xs text-slate-300 mt-1">Complete an evaluation on the Evaluate tab to see audit data here.</p>
      </div>
    );
  }

  const verdictColor = (path: string) => {
    if (path === "PATH_C") return "text-green-700 bg-green-50 border-green-200";
    if (path === "PATH_B") return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-red-700 bg-red-50 border-red-200";
  };

  const gateStatusColor = (status: string) => {
    if (status === "Pass") return "bg-green-100 text-green-800";
    if (status === "Fail") return "bg-red-100 text-red-800";
    return "bg-amber-100 text-amber-800";
  };

  return (
    <div className="space-y-4">
      {/* Run selector */}
      <div>
        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Select run to audit</label>
        <select
          value={selectedRunId ?? ""}
          onChange={(e) => setSelectedRunId(e.target.value)}
          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400 transition-colors"
        >
          {runs.map((r) => (
            <option key={r.id} value={r.id}>
              {new Date(r.timestamp).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
              {" — "}{r.verdictPath} {r.scorerResult ? `(${r.scorerResult.total}/70)` : ""}
              {" — "}{r.brief.slice(0, 50)}{r.brief.length > 50 ? "…" : ""}
            </option>
          ))}
        </select>
      </div>

      {run && (
        <div className="space-y-4">
          {/* Run summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${verdictColor(run.verdictPath)}`}>
                {run.verdictPath}
              </span>
              <span className="text-xs text-slate-400">{PATH_LABELS[run.verdictPath]?.label ?? run.verdictPath}</span>
              <span className="ml-auto text-[10px] text-slate-300">{(run.durationMs / 1000).toFixed(1)}s · {run.model.split("-").slice(-2).join("-")}</span>
            </div>

            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Brief</p>
              <p className="text-xs text-slate-600 leading-relaxed">{run.brief}</p>
            </div>

            {run.contextHistory.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Context injections ({run.contextHistory.length})</p>
                <div className="space-y-1">
                  {run.contextHistory.map((ctx, i) => (
                    <p key={i} className="text-[11px] text-slate-500 bg-slate-50 rounded-lg px-2.5 py-1.5">
                      <span className="font-bold text-slate-400 mr-1.5">#{i + 1}</span>{ctx}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gate-by-gate audit */}
          <div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Gate decisions</p>
            <div className="space-y-2">
              {Object.entries(run.gateResults).map(([gate, result]) => (
                <div key={gate} className="bg-white rounded-xl border border-slate-200 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{gate}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${gateStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-300">{result.thinkingLength.toLocaleString()} chars</span>
                  </div>
                  {result.reasoning && (
                    <p className="text-[11px] text-slate-600 leading-relaxed">{result.reasoning}</p>
                  )}
                  {result.evidence && (
                    <p className="text-[10px] text-slate-400 mt-1 italic">Evidence: {result.evidence}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scorer breakdown */}
          {run.scorerResult && (
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Scoring breakdown</p>
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Total score</span>
                  <span className={`text-sm font-bold ${run.scorerResult.total >= 60 ? "text-green-700" : "text-red-700"}`}>
                    {run.scorerResult.total}/70
                  </span>
                </div>
                {SCORE_FACTORS.map(({ key, label, max }) => {
                  const val = run.scorerResult![key as keyof typeof run.scorerResult] as number;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-slate-600">{label}</span>
                        <span className="text-[11px] font-mono text-slate-500">{val}/{max}</span>
                      </div>
                      <div className="bg-slate-100 rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${val > 0 ? "bg-green-500" : "bg-slate-200"}`}
                          style={{ width: `${(val / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
                {((run.scorerResult.portfolio_risk as number) < 0 || (run.scorerResult.trademark_risk as number) < 0) && (
                  <div className="pt-2 border-t border-red-100 space-y-1">
                    {(run.scorerResult.portfolio_risk as number) < 0 && (
                      <div className="flex justify-between text-[11px]">
                        <span className="text-red-700">Portfolio collision</span>
                        <span className="font-mono text-red-700">{run.scorerResult.portfolio_risk}</span>
                      </div>
                    )}
                    {(run.scorerResult.trademark_risk as number) < 0 && (
                      <div className="flex justify-between text-[11px]">
                        <span className="text-red-700">Trademark risk</span>
                        <span className="font-mono text-red-700">{run.scorerResult.trademark_risk}</span>
                      </div>
                    )}
                  </div>
                )}
                {run.scorerResult.reasoning && (
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">{run.scorerResult.reasoning}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function computeInitialGateStates(customGateKeys: string[] = [], disabledKeys: string[] = []): Record<string, GateState> {
  return Object.fromEntries(
    [...Object.keys(GATE_META), ...customGateKeys]
      .filter((k) => !disabledKeys.includes(k))
      .map((k) => [k, { status: "idle", thinking: "" }])
  );
}

export default function LabPage() {
  // Unified input value (serves as brief input before start, context input after)
  const [inputValue, setInputValue] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isInjecting, setIsInjecting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [gateStates, setGateStates] = useState<Record<string, GateState>>(computeInitialGateStates());
  const [scorerState, setScorerState] = useState<ScorerState>({ status: "idle", thinking: "" });
  const [showScorer, setShowScorer] = useState(false);
  const [contextHistory, setContextHistory] = useState<string[]>([]);
  const [verdictPath, setVerdictPath] = useState<VerdictPath>(null);
  const [finalScore, setFinalScore] = useState<number | undefined>(undefined);

  const [labHistory, setLabHistory] = useState<LabRun[]>([]);
  const [expandedRunId, setExpandedRunId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const startTimeRef = useRef<number>(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Model picker
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [modelPickerOpen, setModelPickerOpen] = useState(false);
  const modelPickerRef = useRef<HTMLDivElement>(null);

  // Upload state
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [pendingUploadText, setPendingUploadText] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab state
  const [activeTab, setActiveTab] = useState<"evaluate" | "configure">("evaluate");

  // Custom gate/scoring config
  const [customConfig, setCustomConfig] = useState<CustomConfig>(DEFAULT_CUSTOM_CONFIG);
  const customConfigRef = useRef(customConfig);
  customConfigRef.current = customConfig;

  // Presets
  const [presets, setPresets] = useState<ConfigPreset[]>([]);
  const [presetName, setPresetName] = useState("");
  const [isSavingPreset, setIsSavingPreset] = useState(false);
  const [saveLocalFlash, setSaveLocalFlash] = useState(false);

  // Q&A chat messages in evaluate tab
  const [labChatMessages, setLabChatMessages] = useState<ChatMessage[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);

  const hasCustomGates =
    customConfig.additionalGates.filter(g => g.key.trim() && g.label.trim()).length > 0 ||
    !customConfig.scoring.includeDefaultFactors ||
    customConfig.scoring.threshold !== 60 ||
    Object.keys(customConfig.scoring.factorOverrides).length > 0 ||
    customConfig.scoring.additionalFactors.filter(f => f.label.trim()).length > 0 ||
    Object.keys(customConfig.gates).some(
      (g) => JSON.stringify(customConfig.gates[g]) !== JSON.stringify(DEFAULT_GATE_CONFIG[g])
    );

  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // Stores the original submitted brief for re-use in retries and context injections
  const originalBriefRef = useRef<string>("");
  const injectDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gateStatesRef = useRef(gateStates);
  gateStatesRef.current = gateStates;
  const verdictPathRef = useRef<VerdictPath>(null);
  const scorerDecisionRef = useRef<ScorerDecision | undefined>(undefined);

  // Auto-resize textarea
  useEffect(() => {
    const ta = inputRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 200)}px`;
    }
  }, [inputValue]);

  // Abort stream on unmount
  useEffect(() => () => { abortControllerRef.current?.abort(); }, []);

  // Clear inject debounce timer on unmount
  useEffect(() => () => { if (injectDebounceRef.current) clearTimeout(injectDebounceRef.current); }, []);

  // Close model picker when clicking outside
  useEffect(() => {
    if (!modelPickerOpen) return;
    const handler = (e: MouseEvent) => {
      if (modelPickerRef.current && !modelPickerRef.current.contains(e.target as Node)) {
        setModelPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [modelPickerOpen]);

  // Scroll results into view when evaluation starts
  useEffect(() => {
    if (hasStarted && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [hasStarted]);

  // Load config + history + presets on mount
  useEffect(() => {
    const saved = loadLocalConfig();
    if (saved) setCustomConfig(saved);

    fetch("/api/lab/runs")
      .then((r) => r.json())
      .then((data: { runs?: LabRun[] }) => {
        if (data.runs?.length) setLabHistory(data.runs);
      })
      .catch(() => {});

    fetch("/api/lab/presets")
      .then((r) => r.json())
      .then((data: { presets?: ConfigPreset[] }) => {
        if (data.presets?.length) setPresets(data.presets);
      })
      .catch(() => {});
  }, []);

  const startEvaluation = useCallback(
    async (briefText: string, history: string[], frozenStates?: Record<string, GateState>) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsRunning(true);
      setHasStarted(true);
      setVerdictPath(null);
      setFinalScore(undefined);
      setShowScorer(false);
      startTimeRef.current = Date.now();
      verdictPathRef.current = null;
      scorerDecisionRef.current = undefined;

      const requestGateStates: Record<string, { status: string; thinking?: string; decision?: object }> = {};
      const sourceStates = frozenStates ?? gateStatesRef.current;

      for (const [gate, state] of Object.entries(sourceStates)) {
        if (state.status === "done" && state.decision) {
          requestGateStates[gate] = { status: "done", decision: state.decision };
        }
      }

      try {
        const response = await fetch("/api/lab/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            brief: briefText,
            contextHistory: history,
            gateStates: requestGateStates,
            model: selectedModel,
            customGates: {
              ...customConfigRef.current.gates,
              ...Object.fromEntries(
                customConfigRef.current.additionalGates
                  .filter(g => g.key.trim() && g.label.trim())
                  .map(g => [g.key, g])
              ),
            },
            customScoring: (() => {
              const s = customConfigRef.current.scoring;
              const modified = !s.includeDefaultFactors ||
                s.additionalFactors.filter(f => f.label.trim() && f.maxPoints > 0 && f.criteria.trim()).length > 0 ||
                Object.keys(s.factorOverrides).length > 0 ||
                s.threshold !== 60;
              return modified ? s : undefined;
            })(),
            disabledGates: Object.entries(customConfigRef.current.gates)
              .filter(([, g]) => g.disabled)
              .map(([k]) => k),
            blockerGateKeys: customConfigRef.current.additionalGates
              .filter(g => g.key.trim() && g.label.trim() && g.tier === "blocker")
              .map(g => g.key),
          }),
        });

        if (!response.ok) {
          setIsRunning(false);
          return;
        }

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (controller.signal.aborted) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (!raw) continue;

            try {
              const event = JSON.parse(raw);

              if (event.type === "complete") {
                setIsRunning(false);
                const currentStates = gateStatesRef.current;
                const run: LabRun = {
                  id: crypto.randomUUID(),
                  timestamp: new Date().toISOString(),
                  brief: briefText,
                  briefLength: briefText.length,
                  contextHistory: history,
                  contextInjections: history.length,
                  gateResults: Object.fromEntries(
                    Object.entries(currentStates)
                      .filter(([k]) => k !== "SCORER")
                      .map(([k, v]) => [k, {
                        status: v.decision?.status ?? "Pending",
                        reasoning: v.decision?.reasoning ?? "",
                        evidence: v.decision?.evidence,
                        thinkingLength: v.thinking.length,
                      }])
                  ),
                  verdictPath: verdictPathRef.current ?? "unknown",
                  scorerResult: scorerDecisionRef.current,
                  durationMs: Date.now() - startTimeRef.current,
                  model: (event as { model?: string }).model ?? "unknown",
                };
                fetch("/api/lab/save", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(run),
                }).catch(() => {});
                setLabHistory((prev) => [run, ...prev.slice(0, 49)]);
                break;
              }

              if (event.type === "verdict") {
                setVerdictPath(event.path);
                verdictPathRef.current = event.path;
                continue;
              }

              if (event.gate === "SCORER") {
                if (!showScorer) setShowScorer(true);
                if (event.type === "thinking") {
                  setScorerState((prev) => ({
                    ...prev,
                    status: "thinking",
                    thinking: prev.thinking + (event.content ?? ""),
                  }));
                } else if (event.type === "done") {
                  setScorerState((prev) => ({ ...prev, status: "done", decision: event.decision }));
                  scorerDecisionRef.current = event.decision;
                  if (event.decision) {
                    const score = event.decision.total;
                    setFinalScore(score);
                    const path = score >= 60 ? "PATH_C" : "PATH_A2";
                    setVerdictPath(path);
                    verdictPathRef.current = path;
                  }
                } else if (event.type === "error") {
                  setScorerState((prev) => ({ ...prev, status: "error", error: event.error }));
                }
                continue;
              }

              const gate = event.gate as string;
              if (!gate) continue;

              if (event.type === "thinking") {
                setGateStates((prev) => ({
                  ...prev,
                  [gate]: {
                    ...prev[gate],
                    status: "thinking",
                    thinking: (prev[gate]?.thinking ?? "") + (event.content ?? ""),
                  },
                }));
              } else if (event.type === "done") {
                setGateStates((prev) => {
                  const next = {
                    ...prev,
                    [gate]: { ...prev[gate], status: "done" as GateStatus, decision: event.decision },
                  };
                  // If G0 fails, block all other gates immediately
                  if (gate === "G0" && event.decision?.status === "Fail") {
                    for (const g of Object.keys(next)) {
                      if (g !== "G0" && next[g]?.status === "idle") {
                        next[g] = { status: "blocked", thinking: "" };
                      }
                    }
                  }
                  return next;
                });
              } else if (event.type === "error") {
                setGateStates((prev) => ({
                  ...prev,
                  [gate]: { ...prev[gate], status: "error", error: event.error },
                }));
              }
            } catch {
              // Malformed SSE chunk — skip
            }
          }
        }
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
        setIsRunning(false);
      }

      setIsRunning(false);
    },
    [showScorer, selectedModel]
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error || "Upload failed");
      }
      const data = await res.json() as { text?: string };
      if (!data.text) throw new Error("No text extracted from file");
      setPendingUploadText(data.text);
      setUploadedFileName(file.name);
      toast.success(`${file.name} attached — press Analyze to evaluate`);
      inputRef.current?.focus();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      const helpfulMsg = msg.includes("20MB")
        ? msg
        : msg.includes("No text")
        ? "No text found in this file. Try a different file or paste text directly."
        : msg.includes("format") || msg.includes("Unsupported")
        ? "This file format isn't supported. Upload a .pdf, .docx, or .txt file."
        : "Upload failed — please try a different file.";
      toast.error(helpfulMsg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearUpload = () => {
    setUploadedFileName(null);
    setPendingUploadText(null);
  };

  const handleStart = useCallback(() => {
    // Uploaded file text takes priority; textarea text is additional context
    const briefValue = pendingUploadText || (inputRef.current?.value ?? inputValue).trim();
    if (!briefValue || isRunning) return;

    originalBriefRef.current = briefValue;
    setModelPickerOpen(false);
    setInputValue("");
    setUploadedFileName(null);
    setPendingUploadText(null);
    setLabChatMessages([]);
    const customGateKeys = customConfigRef.current.additionalGates
      .filter(g => g.key.trim() && g.label.trim())
      .map(g => g.key);
    const disabledKeys = Object.entries(customConfigRef.current.gates)
      .filter(([, g]) => g.disabled)
      .map(([k]) => k);
    setGateStates(computeInitialGateStates(customGateKeys, disabledKeys));
    setScorerState({ status: "idle", thinking: "" });
    setContextHistory([]);
    setVerdictPath(null);
    setFinalScore(undefined);
    setShowScorer(false);
    startEvaluation(briefValue, []);
  }, [pendingUploadText, inputValue, isRunning, startEvaluation]);

  const handleInject = useCallback(() => {
    const context = (inputRef.current?.value ?? inputValue).trim();
    if (!context || isInjecting || isRunning || isAnswering) return;
    if (injectDebounceRef.current) clearTimeout(injectDebounceRef.current);

    injectDebounceRef.current = setTimeout(async () => {
      setInputValue("");
      setIsInjecting(true);

      abortControllerRef.current?.abort();
      const frozenStates = { ...gateStatesRef.current };

      setGateStates((prev) => {
        const next = { ...prev };
        for (const [gate, state] of Object.entries(next)) {
          if (state.status === "thinking") {
            next[gate] = { ...state, status: "re-evaluating" };
          }
        }
        return next;
      });

      const newHistory = [...contextHistory, context];
      setContextHistory(newHistory);

      try {
        const res = await fetch("/api/lab/inject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brief: originalBriefRef.current,
            newContext: context,
            currentGateStates: Object.fromEntries(
              Object.entries(frozenStates).map(([k, v]) => [
                k,
                { status: v.status === "done" ? "done" : "in-progress", thinking: v.thinking },
              ])
            ),
          }),
        });

        const { requiresUpdate = [] } = await res.json() as { requiresUpdate: string[] };

        setGateStates((prev) => {
          const next = { ...prev };
          for (const gate of requiresUpdate) {
            next[gate] = { status: "idle", thinking: "" };
          }
          return next;
        });

        const anyPassedNeedsUpdate = requiresUpdate.some(
          (g) => frozenStates[g]?.status === "done" && frozenStates[g]?.decision?.status === "Pass"
        );
        if (anyPassedNeedsUpdate) {
          setShowScorer(false);
          setScorerState({ status: "idle", thinking: "" });
        }

        const updatedFrozen = { ...frozenStates };
        for (const gate of requiresUpdate) {
          updatedFrozen[gate] = { status: "idle", thinking: "" };
        }

        setIsInjecting(false);
        startEvaluation(originalBriefRef.current, newHistory, updatedFrozen);
      } catch {
        setIsInjecting(false);
        startEvaluation(originalBriefRef.current, newHistory, frozenStates);
      }
    }, 300);
  }, [inputValue, isInjecting, isRunning, isAnswering, contextHistory, startEvaluation]);

  // Q&A: answer a question about the current evaluation.
  // NOTE: caller (handleSend) is responsible for setting isAnswering=true before calling.
  // Empty deps is intentional — only uses refs and stable setters.
  const handleQuestion = useCallback(async (question: string) => {
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: question };
    setLabChatMessages((prev) => [...prev, userMsg]);

    // Build context from current gate state
    const doneGates = Object.entries(gateStatesRef.current)
      .filter(([, s]) => s.status === "done" && s.decision)
      .map(([g, s]) => `${g}: ${s.decision!.status} — ${s.decision!.reasoning.slice(0, 100)}`)
      .join("\n");

    const contextPrefix = originalBriefRef.current
      ? `[EVALUATION CONTEXT]\nBrief: ${originalBriefRef.current.slice(0, 300)}\n${doneGates ? `Gate results so far:\n${doneGates}` : "(evaluation in progress)"}\n\nUser question: `
      : "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: contextPrefix + question, mode: "knowledge" }),
      });
      const data = await res.json() as { response?: string };
      setLabChatMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: data.response ?? "I couldn't retrieve an answer right now. Try rephrasing your question." },
      ]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "";
      const helpfulMsg = errMsg.includes("VPN")
        ? "Connection failed — check your VPN connection."
        : "Connection issue — please try again.";
      setLabChatMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: helpfulMsg },
      ]);
    } finally {
      setIsAnswering(false);
    }
  }, []);

  // Unified send: starts evaluation if not yet started, classifies + routes otherwise
  const handleSend = useCallback(async () => {
    if (!hasStarted) {
      handleStart();
      return;
    }
    const text = (inputRef.current?.value ?? inputValue).trim();
    if (!text || isInjecting || isRunning || isAnswering) return;

    // Guard against rapid double-clicks: optimistically set answering state
    // before the async classify call so a second click hits the guard above.
    setIsAnswering(true);
    setInputValue("");

    // Classify: is this a question or context injection?
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const { type } = await res.json() as { type: string };
      if (type === "question") {
        // handleQuestion takes ownership of isAnswering — it will clear it in finally
        handleQuestion(text);
      } else {
        // Not a question — clear the guard and inject context
        setIsAnswering(false);
        handleInject();
      }
    } catch {
      // Classification failed — default to context injection
      setIsAnswering(false);
      handleInject();
    }
  }, [hasStarted, handleStart, inputValue, isInjecting, isRunning, isAnswering, handleInject, handleQuestion]);

  const handleRetryGate = useCallback(
    (gate: string) => {
      setGateStates((prev) => ({
        ...prev,
        [gate]: { status: "idle", thinking: "" },
      }));
      startEvaluation(originalBriefRef.current, contextHistory);
    },
    [contextHistory, startEvaluation]
  );

  const handleReset = () => {
    abortControllerRef.current?.abort();
    setInputValue("");
    setUploadedFileName(null);
    setPendingUploadText(null);
    setIsRunning(false);
    setHasStarted(false);
    const disabledKeys = Object.entries(customConfigRef.current.gates)
      .filter(([, g]) => g.disabled)
      .map(([k]) => k);
    setGateStates(computeInitialGateStates([], disabledKeys));
    setScorerState({ status: "idle", thinking: "" });
    setContextHistory([]);
    setVerdictPath(null);
    setFinalScore(undefined);
    setShowScorer(false);
    originalBriefRef.current = "";
    verdictPathRef.current = null;
    scorerDecisionRef.current = undefined;
    setLabChatMessages([]);
  };

  const gateKeys = Object.keys(GATE_META);
  const g1to5Keys = ["G1", "G2", "G3", "G4", "G5"];

  const disabledStandardGateKeys = Object.entries(customConfig.gates)
    .filter(([, g]) => g.disabled)
    .map(([k]) => k);

  const validCustomGateKeys = customConfig.additionalGates
    .filter(g => g.key.trim() && g.label.trim())
    .map(g => g.key);

  const allGateKeys = [
    ...gateKeys.filter(k => !disabledStandardGateKeys.includes(k)),
    ...validCustomGateKeys,
  ];

  const doneCount = allGateKeys.filter((g) => gateStates[g]?.status === "done").length;
  const progress = hasStarted ? Math.round((doneCount / allGateKeys.length) * 100) : 0;

  // Active scoring factors for ScorerCard rendering
  const activeScoringFactors = [
    ...(customConfig.scoring.includeDefaultFactors
      ? DEFAULT_SCORE_FACTORS_BASE.map(f => ({
          key: f.key, label: f.label,
          max: customConfig.scoring.factorOverrides[f.key] ?? f.max,
        }))
      : []),
    ...customConfig.scoring.additionalFactors
      .filter(f => f.label.trim() && f.maxPoints > 0 && f.criteria.trim())
      .map(f => ({ key: f.key, label: f.label, max: f.maxPoints })),
  ];

  const selectedModelMeta = MODELS.find((m) => m.value === selectedModel);
  const modelLabel = selectedModelMeta?.label ?? "GPT-5.2";
  const groups = ["GPT", "Claude", "Gemini"] as const;

  // Computed values for the unified input
  const hasInputContent = inputValue.trim().length > 0 || !!pendingUploadText;
  const isBusy = isRunning || isInjecting || isUploading || isAnswering;

  // Pending gates for PATH_B structured questions
  const pendingGatesList = gateKeys
    .filter((g) => gateStates[g]?.decision?.status === "Pending")
    .map((g) => ({ gate: g, question: GATE_QUESTIONS[g] ?? GATE_META[g].description }));

  return (
    <div className="h-screen bg-[#f4f4f4] flex overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 52 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-[#171717] text-white flex flex-col flex-shrink-0 overflow-hidden"
      >
        {/* Sidebar header */}
        <div className="flex items-center px-3 py-4 border-b border-white/10 min-w-0">
          {sidebarOpen && (
            <span className="flex-1 text-sm font-semibold truncate mr-2">Lab History</span>
          )}
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            className={`p-1 rounded hover:bg-white/10 transition-colors flex-shrink-0 ${!sidebarOpen ? "mx-auto" : ""}`}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* New evaluation */}
        <div className="px-2 py-2 border-b border-white/10">
          <button
            type="button"
            onClick={handleReset}
            title="New evaluation"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white/80 hover:text-white ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Plus className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>New evaluation</span>}
          </button>
        </div>

        {/* Back to home */}
        <div className="px-2 py-1 border-b border-white/10">
          <Link
            href="/"
            title="Back to home"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white/60 hover:text-white ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <ArrowLeft className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Home</span>}
          </Link>
        </div>

        {/* History list */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto px-3 pb-4 pt-2 space-y-1">
            {labHistory.length === 0 ? (
              <p className="text-xs text-white/30 px-3 py-4 text-center">No runs yet</p>
            ) : (
              labHistory.map((run) => {
                const pathColor =
                  run.verdictPath === "PATH_C" ? "bg-green-500" :
                  run.verdictPath === "PATH_B" ? "bg-amber-500" : "bg-red-500";
                const pathLabel = run.verdictPath.replace("PATH_", "");
                const briefPreview = run.brief.slice(0, 52) + (run.brief.length > 52 ? "…" : "");
                const isExpanded = expandedRunId === run.id;

                return (
                  <div key={run.id}>
                    <button
                      type="button"
                      onClick={() => setExpandedRunId(isExpanded ? null : run.id)}
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors text-white/60 hover:bg-white/10 hover:text-white"
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${pathColor}`} />
                        <span className="text-[10px] font-bold text-white/40">{pathLabel}</span>
                        {run.scorerResult && (
                          <span className="text-[10px] text-white/30 ml-auto">{run.scorerResult.total}/70</span>
                        )}
                      </div>
                      <p className="truncate text-xs text-white/70">{briefPreview}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">
                        {new Date(run.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </button>

                    {isExpanded && (
                      <div className="mx-2 mb-2 rounded-lg bg-white/5 p-2.5 space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(run.gateResults).map(([gate, result]) => (
                            <span key={gate} className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              result.status === "Pass" ? "bg-green-900/60 text-green-300" :
                              result.status === "Fail" ? "bg-red-900/60 text-red-300" :
                              "bg-amber-900/60 text-amber-300"
                            }`}>
                              {gate}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setInputValue(run.brief);
                            inputRef.current?.focus();
                          }}
                          className="w-full text-[10px] text-white/50 hover:text-white/80 text-left underline underline-offset-2 transition-colors"
                        >
                          Load brief to re-run →
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Collapsed: show verdict dots for recent runs */}
        {!sidebarOpen && labHistory.length > 0 && (
          <div className="flex-1 flex flex-col items-center gap-1.5 pt-3">
            {labHistory.slice(0, 8).map((run) => {
              const pathColor =
                run.verdictPath === "PATH_C" ? "bg-green-500" :
                run.verdictPath === "PATH_B" ? "bg-amber-500" : "bg-red-500";
              return (
                <button
                  key={run.id}
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  title={`${run.verdictPath} — ${run.brief.slice(0, 40)}`}
                  className={`w-2.5 h-2.5 rounded-full ${pathColor} opacity-60 hover:opacity-100 transition-opacity`}
                />
              );
            })}
            {labHistory.length > 8 && (
              <span className="text-[9px] text-white/20">+{labHistory.length - 8}</span>
            )}
          </div>
        )}
      </motion.aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-slate-700" />
            <span className="text-sm font-semibold text-slate-800">Naming Lab</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full uppercase tracking-wide">Beta</span>
          </div>

          {/* Tab switcher */}
          <div className="flex items-center gap-0.5 ml-4 bg-slate-100 p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setActiveTab("evaluate")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === "evaluate"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Play className="h-3 w-3" />
              Evaluate
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("configure")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === "configure"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Settings2 className="h-3 w-3" />
              Configure & Audit
              {hasCustomGates && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs text-slate-400">6 specialized AI agents — one per gate</p>
        </div>
      </header>

      {/* ── Scrollable content area ── */}
      <div ref={scrollAreaRef} className="flex-1 overflow-y-auto">
        <div className="max-w-5xl w-full mx-auto px-4">

          {/* ── Tab 2: Configure & Audit ── */}
          {activeTab === "configure" && (
            <div className="py-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Left: Gate + Scoring + Quick Test (3/5 width) */}
                <div className="lg:col-span-3 space-y-6">
                  {/* Gate configuration */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Settings2 className="h-4 w-4 text-slate-500" />
                      <h2 className="text-sm font-semibold text-slate-800">Gate Configuration</h2>
                      {hasCustomGates && (
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full">
                          Custom active
                        </span>
                      )}
                    </div>
                    <GateConfigPanel
                      config={customConfig.gates}
                      additionalGates={customConfig.additionalGates}
                      onChangeGates={(gates) => setCustomConfig(prev => ({ ...prev, gates }))}
                      onChangeAdditional={(additionalGates) => setCustomConfig(prev => ({ ...prev, additionalGates }))}
                    />
                  </div>

                  {/* Scoring configuration */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart2 className="h-4 w-4 text-slate-500" />
                      <h2 className="text-sm font-semibold text-slate-800">Scoring Configuration</h2>
                    </div>
                    <ScoringConfigPanel
                      config={customConfig.scoring}
                      onChange={(scoring) => setCustomConfig(prev => ({ ...prev, scoring }))}
                    />
                  </div>

                  {/* Quick Test */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TestTube2 className="h-4 w-4 text-slate-500" />
                      <h2 className="text-sm font-semibold text-slate-800">Quick Test</h2>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full">Enabled</span>
                    </div>
                    <QuickTestPanel
                      customGates={{
                        ...customConfig.gates,
                        ...Object.fromEntries(
                          customConfig.additionalGates
                            .filter(g => g.key.trim() && g.label.trim())
                            .map(g => [g.key, g])
                        ),
                      }}
                      customScoring={(() => {
                        const s = customConfig.scoring;
                        const modified = !s.includeDefaultFactors ||
                          s.additionalFactors.filter(f => f.label.trim() && f.maxPoints > 0 && f.criteria.trim()).length > 0 ||
                          Object.keys(s.factorOverrides).length > 0 ||
                          s.threshold !== 60;
                        return modified ? s : undefined;
                      })()}
                      disabledGates={disabledStandardGateKeys}
                    />
                  </div>
                </div>

                {/* Right: Presets + Run audit (2/5 width) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Preset management */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-slate-500" />
                      <h2 className="text-sm font-semibold text-slate-800">Save Configuration</h2>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
                      {/* Save locally */}
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            saveLocalConfig(customConfig);
                            setSaveLocalFlash(true);
                            setTimeout(() => setSaveLocalFlash(false), 2000);
                          }}
                          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium transition-all ${
                            saveLocalFlash
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-slate-900 text-white hover:bg-slate-700"
                          }`}
                        >
                          {saveLocalFlash ? (
                            <><CheckCircle2 className="h-3.5 w-3.5" /> Saved locally!</>
                          ) : (
                            <><Check className="h-3.5 w-3.5" /> Save to browser</>
                          )}
                        </button>
                        <p className="text-[10px] text-slate-400 text-center mt-1.5">Persists across page refreshes</p>
                      </div>

                      <div className="border-t border-slate-100" />

                      {/* Save as named preset */}
                      <div className="space-y-2">
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Save as named preset</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            placeholder="My custom framework..."
                            className="flex-1 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && presetName.trim() && !isSavingPreset) {
                                const name = presetName.trim();
                                setIsSavingPreset(true);
                                fetch("/api/lab/presets", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ name, config: customConfig }),
                                })
                                  .then(r => r.json())
                                  .then((data: { preset?: ConfigPreset }) => {
                                    if (data.preset) setPresets(prev => [data.preset!, ...prev]);
                                    setPresetName("");
                                  })
                                  .catch(() => {})
                                  .finally(() => setIsSavingPreset(false));
                              }
                            }}
                          />
                          <button
                            type="button"
                            disabled={!presetName.trim() || isSavingPreset}
                            onClick={() => {
                              const name = presetName.trim();
                              if (!name || isSavingPreset) return;
                              setIsSavingPreset(true);
                              fetch("/api/lab/presets", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ name, config: customConfig }),
                              })
                                .then(r => r.json())
                                .then((data: { preset?: ConfigPreset }) => {
                                  if (data.preset) setPresets(prev => [data.preset!, ...prev]);
                                  setPresetName("");
                                })
                                .catch(() => {})
                                .finally(() => setIsSavingPreset(false));
                            }}
                            className="flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            {isSavingPreset ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Save"}
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400">Press Enter or click Save · Synced to cloud</p>
                      </div>

                      {/* Preset list */}
                      {presets.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Saved presets</p>
                          <div className="space-y-1 max-h-48 overflow-y-auto">
                            {presets.map((preset) => (
                              <div key={preset.id} className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg group">
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-slate-700 truncate">{preset.name}</p>
                                  <p className="text-[10px] text-slate-400">
                                    {new Date(preset.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setCustomConfig(preset.config)}
                                  className="flex-shrink-0 text-[10px] font-medium text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  Load
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    fetch(`/api/lab/presets?id=${preset.id}`, { method: "DELETE" })
                                      .then(() => setPresets(prev => prev.filter(p => p.id !== preset.id)))
                                      .catch(() => {});
                                  }}
                                  className="flex-shrink-0 text-[10px] text-slate-300 hover:text-red-500 px-1 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Reset all */}
                      {hasCustomGates && (
                        <div className="border-t border-slate-100 pt-3">
                          <button
                            type="button"
                            onClick={() => {
                              setCustomConfig(DEFAULT_CUSTOM_CONFIG);
                              localStorage.removeItem(STORAGE_KEY);
                            }}
                            className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-red-600 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <RotateCcw className="h-3 w-3" />
                            Reset all to defaults
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Advanced Capabilities */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-4 w-4 text-slate-500" />
                      <h2 className="text-sm font-semibold text-slate-800">Advanced Capabilities</h2>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                      {[
                        { label: "Quick Test", description: "Batch-test gate logic against 5 sample briefs", enabled: true },
                        { label: "Q&A in Evaluate", description: "Ask questions about the evaluation in real time", enabled: true },
                        { label: "AI-Generated Conditions", description: "Auto-fill pass/fail conditions from gate label + description", enabled: true },
                        { label: "Glean Knowledge Base", description: "Pull live context from eBay's internal Glean workspace", enabled: false },
                        { label: "Portfolio Conflict Scan", description: "Check proposed names against eBay's product portfolio registry", enabled: false },
                        { label: "Trademark Pre-Check", description: "Early trademark risk screening via legal API integration", enabled: false },
                      ].map(({ label, description, enabled }) => (
                        <div key={label} className={`flex items-start gap-3 ${!enabled ? "opacity-50" : ""}`}>
                          <div className={`flex-shrink-0 w-7 h-4 rounded-full mt-0.5 flex items-center transition-colors ${enabled ? "bg-blue-500" : "bg-slate-200"}`}>
                            <span className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-3.5" : "translate-x-0.5"}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-700">{label}</p>
                            <p className="text-[10px] text-slate-400 leading-snug">{description}</p>
                            {!enabled && <p className="text-[9px] text-slate-300 mt-0.5 uppercase tracking-wide font-semibold">Coming soon</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Run audit */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart2 className="h-4 w-4 text-slate-500" />
                      <h2 className="text-sm font-semibold text-slate-800">Run Audit</h2>
                      <span className="text-[10px] text-slate-400">{labHistory.length} run{labHistory.length !== 1 ? "s" : ""}</span>
                    </div>
                    <RunAuditPanel runs={labHistory} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Tab 1: Evaluate ── */}
          {activeTab === "evaluate" && (
            <>
          {/* Empty state */}
          {!hasStarted && (
            <div className="flex flex-col items-center justify-center text-center min-h-[60vh] py-12">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                <Beaker className="h-7 w-7 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">6 Agents, 1 Brief</h2>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-8">
                Each gate gets a dedicated AI specialist. Watch them think in real time — and inject context to influence the evaluation mid-stream.
              </p>

              <div className="w-full max-w-xl">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Try an example</p>
                <div className="space-y-2">
                  {EXAMPLE_BRIEFS.map((example, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInputValue(example);
                        inputRef.current?.focus();
                      }}
                      className="w-full text-left px-4 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 hover:text-slate-900 transition-colors leading-relaxed"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-slate-300">
                {gateKeys.map((g, i) => (
                  <span key={g} className="flex items-center gap-1">
                    <span className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">{g}</span>
                    {i < gateKeys.length - 1 && <ChevronRight className="h-3 w-3 text-slate-200" />}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active evaluation results */}
          {hasStarted && (
            <div className="py-6 space-y-5">
              {/* Brief display */}
              {originalBriefRef.current && (
                <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">Brief</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{originalBriefRef.current}</p>
                </div>
              )}

              {/* Progress bar */}
              <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-slate-500">Gate evaluation progress</span>
                  <span className="text-xs font-semibold text-slate-700">{progress}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-1.5">
                  <motion.div
                    className="h-1.5 rounded-full bg-slate-800"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Gate cards — G0 full width, G1-G5 in 3-column grid */}
              <div className="space-y-3">
                {/* G0 — full width blocker gate */}
                <GateCard
                  gateKey="G0"
                  state={gateStates["G0"] ?? { status: "idle", thinking: "" }}
                  onRetry={handleRetryGate}
                />

                {/* G1-G5 + custom gates — 3-column grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[...g1to5Keys, ...validCustomGateKeys].map((gate) => {
                    const customEntry = customConfig.additionalGates.find(g => g.key === gate);
                    return (
                      <GateCard
                        key={gate}
                        gateKey={gate}
                        state={gateStates[gate] ?? { status: "idle", thinking: "" }}
                        onRetry={handleRetryGate}
                        meta={customEntry ? { label: customEntry.label, description: customEntry.description } : undefined}
                      />
                    );
                  })}
                  <AnimatePresence>
                    {showScorer && <ScorerCard state={scorerState} scoringFactors={activeScoringFactors} />}
                  </AnimatePresence>
                </div>
              </div>

              {/* Verdict */}
              <AnimatePresence>
                {verdictPath && (
                  <VerdictDisplay
                    path={verdictPath}
                    score={finalScore}
                    pendingGates={pendingGatesList}
                  />
                )}
              </AnimatePresence>

              {/* Q&A chat messages */}
              {(labChatMessages.length > 0 || isAnswering) && (
                <div className="space-y-3">
                  {labChatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-slate-900 text-white"
                          : "bg-white border border-slate-200 text-slate-700 shadow-sm"
                      }`}>
                        {msg.role === "assistant" && (
                          <p className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
                            <MessageSquare className="h-2.5 w-2.5" /> Lab Assistant
                          </p>
                        )}
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isAnswering && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Context history chips */}
              {contextHistory.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-1">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide self-center">Context added:</span>
                  {contextHistory.map((ctx, i) => (
                    <span key={i} className="text-[10px] text-slate-500 bg-white border border-slate-200 rounded-full px-2 py-0.5 max-w-[240px] truncate shadow-sm">
                      {i + 1}. {ctx}
                    </span>
                  ))}
                </div>
              )}

            </div>
          )}
          </>
          )}
        </div>
      </div>

      {/* ── Fixed bottom unified input ── */}
      <div className="flex-shrink-0 bg-[#f4f4f4] px-4 pb-5 pt-2">
        <div className="max-w-5xl mx-auto">

          <div className="relative" ref={modelPickerRef}>
            {/* Model picker popup */}
            <AnimatePresence>
              {modelPickerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 w-72 z-50"
                >
                  <p className="text-xs font-semibold text-slate-500 px-2 mb-2">Select model</p>
                  {groups.map((group) => (
                    <div key={group} className="mb-3 last:mb-0">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide px-2 mb-1">{group}</p>
                      {MODELS.filter((m) => m.group === group).map((m) => (
                        <button
                          type="button"
                          key={m.value}
                          onClick={() => {
                            setSelectedModel(m.value);
                            setModelPickerOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                            selectedModel === m.value
                              ? "bg-slate-100 text-slate-900 font-medium"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span>{m.label}</span>
                          <span className="flex items-center gap-1.5">
                            {m.badge && <span className="text-[10px] text-slate-400">{m.badge}</span>}
                            {selectedModel === m.value && <Check className="h-3.5 w-3.5 text-blue-600" />}
                          </span>
                        </button>
                      ))}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unified input card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200">
              {/* Attachment pill */}
              {uploadedFileName && (
                <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
                    <Paperclip className="h-3 w-3" />
                    {uploadedFileName}
                    <button
                      type="button"
                      onClick={clearUpload}
                      className="text-blue-400 hover:text-blue-700 ml-0.5"
                      aria-label="Remove attachment"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                </div>
              )}
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isBusy}
                placeholder={
                  uploadedFileName
                    ? "Add a note or context (optional)…"
                    : hasStarted
                    ? verdictPath === "PATH_B"
                      ? "Answer the questions above, then press Send to re-evaluate…"
                      : "Add context, corrections, or new details to refine the evaluation…"
                    : "Paste your naming brief here — describe the initiative, scope, target markets, and strategic intent…"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void handleSend();
                  }
                }}
                rows={1}
                style={{ maxHeight: "200px" }}
                className="w-full px-5 pt-4 pb-2 text-sm text-slate-900 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 min-h-[52px] leading-relaxed overflow-y-auto"
              />

              {/* Bottom toolbar */}
              <div className="flex items-center gap-2 px-3 pb-3 pt-1">
                {/* Attachment button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload a document (.docx, .pdf, .txt)"
                  disabled={isBusy}
                  className={`flex-shrink-0 w-9 h-9 rounded-full border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors ${
                    isBusy ? "opacity-40 pointer-events-none" : ""
                  }`}
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Paperclip className="h-4 w-4" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileUpload}
                  className="sr-only"
                />

                {/* Model selector */}
                <button
                  type="button"
                  onClick={() => setModelPickerOpen((v) => !v)}
                  disabled={isBusy}
                  className="flex-shrink-0 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors disabled:opacity-40"
                >
                  {modelLabel}
                  <span className="text-slate-400 text-[10px]">▾</span>
                </button>

                <div className="flex-1" />

                {hasStarted && !isBusy && (
                  <span className="text-[11px] text-slate-400">⏎ send context</span>
                )}

                {/* Unified send/analyze button */}
                <button
                  type="button"
                  onClick={() => void handleSend()}
                  disabled={isBusy}
                  className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isBusy
                      ? "bg-slate-900 text-white"
                      : hasInputContent
                      ? "bg-slate-900 text-white hover:bg-slate-700 shadow-sm"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                  title={hasStarted ? "Send context" : "Analyze"}
                >
                  {isBusy ? (
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : hasStarted ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-2">
            {hasStarted
              ? <>Add context or corrections — or <span className="text-slate-500 font-medium">ask a question</span> about the evaluation</>
              : <><kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⏎</kbd> to analyze · <span className="font-medium">{modelLabel}</span></>
            }
          </p>
        </div>
      </div>

      </div>{/* end main content */}
    </div>
  );
}
