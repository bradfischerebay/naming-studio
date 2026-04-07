"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  BarChart2,
  ArrowLeft,
  RefreshCw,
  Clock,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Beaker,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GateDetail {
  status: "Pass" | "Fail" | "Pending" | "Unknown";
  label: string;
  reasoning: string;
  evidence?: string;
}

interface RecentEvent {
  timestamp: string;
  sessionId: string;
  model: string;
  verdictPath: string;
  verdictTitle?: string;
  verdictSummary?: string;
  briefText?: string;
  briefSummary?: string;
  targetGeographies?: string;
  gateResults: { pass: number; fail: number; unknown: number };
  gateResultsFull?: Record<string, GateDetail>;
  scoringTotal: number | null;
  scoringBreakdown?: Record<string, number>;
  requiresClarification: boolean;
  isClarificationRetry: boolean;
  questionCount?: number;
  durationMs: number;
  briefLength: number;
  error: string | null;
}

interface AnalyticsData {
  totalEvaluations: number;
  verdictBreakdown: Record<string, number>;
  avgDurationMs: number;
  avgBriefLength: number;
  clarificationRate: number;
  errorRate: number;
  modelBreakdown: Record<string, number>;
  gatePassRates: Record<string, number>;
  topBriefGeographies: Array<{ geography: string; count: number } | string>;
  avgQuestionCount: number;
  recentEvents: RecentEvent[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GATE_LABELS: Record<string, string> = {
  G0: "Interaction Model",
  G1: "Integration Level",
  G2: "Standalone Architecture",
  G3: "Strategic Lifespan",
  G4: "Portfolio Alignment",
  G5: "Legal / Localization",
};

const VERDICT_META: Record<string, { label: string; color: string; bar: string; badge: string }> = {
  PATH_C:  { label: "Proceed with naming",    color: "text-emerald-700", bar: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  PATH_B:  { label: "Need more information",  color: "text-amber-700",   bar: "bg-amber-400",   badge: "bg-amber-50 text-amber-700 border-amber-200" },
  PATH_A2: { label: "Score too low",          color: "text-rose-700",    bar: "bg-rose-400",    badge: "bg-rose-50 text-rose-700 border-rose-200" },
  PATH_A1: { label: "No proper name",         color: "text-rose-700",    bar: "bg-rose-500",    badge: "bg-rose-50 text-rose-700 border-rose-200" },
  PATH_A0: { label: "Do not name",            color: "text-rose-700",    bar: "bg-rose-600",    badge: "bg-rose-50 text-rose-700 border-rose-200" },
};

const MODEL_SHORT: Record<string, string> = {
  "gpt-5-2":       "GPT-5.2",
  "gpt-5-latest":  "GPT-5 Latest",
  "gpt-5-mini":    "GPT-5 Mini",
  "claude-sonnet": "Claude Sonnet 4.6",
  "claude-opus":   "Claude Opus 4.6",
  "gemini-3.1-pro":   "Gemini 3.1 Pro",
  "gemini-3.1-flash": "Gemini 3.1 Flash",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")   // **bold**
    .replace(/\*(.+?)\*/g, "$1")        // *italic*
    .replace(/__(.+?)__/g, "$1")        // __bold__
    .replace(/_(.+?)_/g, "$1")          // _italic_
    .replace(/`(.+?)`/g, "$1")          // `code`
    .replace(/#{1,6}\s/g, "")           // ## headings
    .replace(/\[(.+?)\]\(.+?\)/g, "$1") // [link](url)
    .replace(/^\s*[-*>]\s+/gm, "")      // bullets/blockquotes
    .replace(/\n+/g, " ")               // newlines → space
    .trim();
}

function briefPreview(event: RecentEvent): string {
  const raw = event.briefText || event.briefSummary || "";
  if (!raw) return "—";
  const clean = stripMarkdown(raw);
  return clean.length > 90 ? clean.slice(0, 90) + "…" : clean;
}

function modelLabel(model: string): string {
  for (const [key, label] of Object.entries(MODEL_SHORT)) {
    if (model.includes(key)) return label;
  }
  return model.split("-").slice(-3).join("-"); // last 3 segments as fallback
}

function relativeTime(ts: string): string {
  const diff = Date.now() - new Date(ts).getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (s < 60) return `${s}s ago`;
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  valueClass = "text-slate-900",
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-1"
    >
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className={`text-3xl font-bold tabular-nums ${valueClass}`}>{value}</span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </motion.div>
  );
}

function SectionCard({
  title,
  children,
  delay = 0,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`bg-white rounded-2xl border border-slate-200 ${className}`}
    >
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

// ─── Audit Panel ─────────────────────────────────────────────────────────────

const GATE_LABELS_FULL: Record<string, string> = {
  G0: "Interaction Model",
  G1: "Integration Level",
  G2: "Standalone Architecture",
  G3: "Strategic Lifespan",
  G4: "Portfolio Alignment",
  G5: "Legal & Localization",
};

const SCORE_META: Record<string, { label: string; why: string; max: number; positive: boolean }> = {
  standalone:      { label: "Standalone behavior",        why: "Separate enrollment, distinct checkout, or vertical service", max: 25, positive: true },
  longevity:       { label: "Longevity",                  why: "Planned duration of 12+ months", max: 15, positive: true },
  legal:           { label: "Legal / Regulatory mandate", why: "Formal legal requirement, trademark filing, or compliance mandate", max: 10, positive: true },
  global:          { label: "Global viability",           why: "US + UK/DE markets, or explicitly global scope", max: 10, positive: true },
  clarity:         { label: "Clarity lift",               why: "Complex concept where a name meaningfully aids comprehension", max: 10, positive: true },
  portfolio_risk:  { label: "Portfolio collision",        why: "Conflicts with an existing eBay product name", max: 20, positive: false },
  trademark_risk:  { label: "Trademark / legal risk",     why: "Legal blocker or trademark conflict detected", max: 20, positive: false },
};

function AuditPanel({ event }: { event: RecentEvent }) {
  const gates = event.gateResultsFull;
  const breakdown = event.scoringBreakdown;
  const gateOrder = ["G0", "G1", "G2", "G3", "G4", "G5"];

  return (
    <div className="bg-slate-50 border-t border-slate-200 px-5 py-4 space-y-5">
      {/* Gate-by-gate reasoning */}
      {gates && Object.keys(gates).length > 0 && (
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            Gate Evaluation — Decision Reasoning
          </p>
          <div className="space-y-2">
            {gateOrder.filter(g => gates[g]).map((gateKey) => {
              const gate = gates[gateKey];
              const isPass = gate.status === "Pass";
              const isFail = gate.status === "Fail";
              return (
                <div
                  key={gateKey}
                  className={`rounded-xl border px-3 py-2.5 ${
                    isPass ? "border-green-200 bg-green-50/50"
                    : isFail ? "border-red-200 bg-red-50/50"
                    : "border-amber-200 bg-amber-50/30"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {isPass ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      ) : isFail ? (
                        <XCircle className="h-3.5 w-3.5 text-red-500" />
                      ) : (
                        <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-700 font-mono">{gateKey}</span>
                        <span className="text-[11px] font-semibold text-slate-700">{gate.label || GATE_LABELS_FULL[gateKey]}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                          isPass ? "bg-green-100 text-green-800"
                          : isFail ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                        }`}>{gate.status}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{gate.reasoning}</p>
                      {gate.evidence && (
                        <p className="text-[11px] text-slate-400 mt-0.5 italic leading-relaxed">Evidence: {gate.evidence}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Scoring breakdown */}
      {breakdown && event.scoringTotal !== null && (
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-3">
            Naming Score Breakdown — {event.scoringTotal}/70
            {event.scoringTotal >= 60
              ? <span className="ml-2 text-green-700 normal-case">Passed (≥60)</span>
              : <span className="ml-2 text-red-600 normal-case">Below threshold (needs 60)</span>
            }
          </p>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            {Object.entries(SCORE_META).map(([key, meta]) => {
              const value = breakdown[key] ?? 0;
              if (value === 0 && !meta.positive) return null; // hide zero-risk rows
              return (
                <div key={key} className={`px-3 py-2 border-b border-slate-100 last:border-0 ${
                  !meta.positive && value !== 0 ? "bg-red-50/50" : ""
                }`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-semibold ${value !== 0 ? (meta.positive ? "text-slate-800" : "text-red-700") : "text-slate-400"}`}>
                          {meta.label}
                        </span>
                        {value !== 0 && (
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            meta.positive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}>
                            {value > 0 ? "+" : ""}{value}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{meta.why}</p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 flex-shrink-0">{value}/{meta.positive ? meta.max : `-${meta.max}`}</span>
                  </div>
                  {meta.positive && (
                    <div className="h-1 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-1 rounded-full ${value > 0 ? "bg-green-500" : "bg-slate-200"}`}
                        style={{ width: `${(value / meta.max) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <div className={`px-3 py-2 border-t border-slate-200 flex items-center justify-between ${
              (event.scoringTotal ?? 0) >= 60 ? "bg-green-50" : "bg-red-50"
            }`}>
              <span className="text-[11px] font-bold text-slate-800">Total</span>
              <span className={`text-sm font-bold ${(event.scoringTotal ?? 0) >= 60 ? "text-green-700" : "text-red-600"}`}>
                {event.scoringTotal}/70
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Brief preview */}
      {event.briefText && (
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Brief Submitted</p>
          <p className="text-xs text-slate-600 leading-relaxed bg-white border border-slate-200 rounded-xl px-3 py-2.5 max-h-28 overflow-y-auto">
            {event.briefText.slice(0, 600)}{event.briefText.length > 600 ? "…" : ""}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-slate-100 rounded-xl animate-pulse ${className}`} />;
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <header className="bg-white border-b border-slate-200 px-6 py-4 h-[61px]" />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
        <Skeleton className="h-48" />
        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/analytics");
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Server returned status ${res.status}`);
      if (!body.success) throw new Error(body.error || "Unable to load analytics data");
      setData(body.data);
      setCountdown(30);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load analytics";
      const helpfulMsg = msg.includes("configured") || msg.includes("Redis")
        ? "Analytics storage isn't configured yet. Contact your administrator."
        : msg.includes("VPN")
        ? msg
        : "Unable to load analytics — please try refreshing.";
      setFetchError(helpfulMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (!data || loading) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { fetchData(); return 30; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [data, loading]);

  // ── Loading ──

  if (loading && !data) return <LoadingState />;

  // ── Error ──

  if (fetchError && !data) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex flex-col">
        <PageHeader loading={loading} countdown={countdown} onRefresh={fetchData} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white border border-rose-200 rounded-2xl p-8 text-center max-w-sm w-full">
            <AlertCircle className="h-8 w-8 text-rose-400 mx-auto mb-3" />
            <p className="text-sm text-slate-700 mb-4">{fetchError}</p>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty ──

  if (data && data.totalEvaluations === 0) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex flex-col">
        <PageHeader loading={loading} countdown={countdown} onRefresh={fetchData} />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <BarChart2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-900 mb-2">No evaluations yet</h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Submit a naming brief from the main app to start seeing usage data here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
            >
              Go to assistant
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // ── Calculated values ──

  const verdictOrder = ["PATH_C", "PATH_B", "PATH_A1", "PATH_A2", "PATH_A0"];
  const verdictEntries = verdictOrder
    .filter((k) => data.verdictBreakdown[k] !== undefined)
    .map((k) => [k, data.verdictBreakdown[k]] as [string, number]);

  const maxVerdictCount = Math.max(...verdictEntries.map(([, c]) => c), 1);
  const gateOrder = ["G0", "G1", "G2", "G3", "G4", "G5"];
  const gateEntries = gateOrder.filter((g) => data.gatePassRates[g] !== undefined);
  const modelEntries = Object.entries(data.modelBreakdown).sort((a, b) => b[1] - a[1]);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <PageHeader loading={loading} countdown={countdown} onRefresh={fetchData} />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">

        {/* Row 1 – Stat cards */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            label="Total evaluations"
            value={data.totalEvaluations.toLocaleString()}
            delay={0}
          />
          <StatCard
            label="Avg duration"
            value={`${(data.avgDurationMs / 1000).toFixed(1)}s`}
            sub="per evaluation"
            delay={0.05}
          />
          <StatCard
            label="Clarification rate"
            value={pct(data.clarificationRate)}
            sub="needed more info"
            valueClass={data.clarificationRate > 0.4 ? "text-amber-600" : "text-slate-900"}
            delay={0.1}
          />
          <StatCard
            label="Error rate"
            value={pct(data.errorRate)}
            sub="failed evaluations"
            valueClass={data.errorRate > 0.05 ? "text-rose-600" : "text-emerald-600"}
            delay={0.15}
          />
        </div>

        {/* Row 2 – Verdict distribution */}
        <SectionCard title="Verdict Distribution" delay={0.2}>
          <div className="space-y-3">
            {verdictEntries.map(([path, count]) => {
              const meta = VERDICT_META[path] ?? { label: path, bar: "bg-slate-400", color: "text-slate-600", badge: "" };
              const widthPct = (count / maxVerdictCount) * 100;
              const sharePct = ((count / data.totalEvaluations) * 100).toFixed(1);

              return (
                <div key={path} className="flex items-center gap-4">
                  <div className="w-44 flex-shrink-0">
                    <div className="text-xs font-medium text-slate-800 leading-tight">{meta.label}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{path}</div>
                  </div>
                  <div className="flex-1 h-7 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      className={`absolute inset-y-0 left-0 ${meta.bar} flex items-center justify-end px-3 min-w-[2rem]`}
                    >
                      <span className="text-[11px] font-semibold text-white whitespace-nowrap">
                        {count} &middot; {sharePct}%
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Row 3 – Gate pass rates + model usage */}
        <div className="grid grid-cols-2 gap-6">

          {/* Gate pass rates */}
          <SectionCard title="Gate Pass Rates" delay={0.25} className="">
            <div className="space-y-4">
              {gateEntries.map((gate) => {
                const rate = data.gatePassRates[gate];
                const barColor = rate >= 0.8 ? "bg-emerald-500" : rate >= 0.5 ? "bg-amber-400" : "bg-rose-500";
                const textColor = rate >= 0.8 ? "text-emerald-700" : rate >= 0.5 ? "text-amber-700" : "text-rose-600";

                return (
                  <div key={gate}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="text-xs font-semibold text-slate-700">{gate}</span>
                        <span className="text-xs text-slate-400 ml-1.5">{GATE_LABELS[gate]}</span>
                      </div>
                      <span className={`text-xs font-semibold tabular-nums ${textColor}`}>
                        {(rate * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rate * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                        className={`h-full ${barColor} rounded-full`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* Model usage */}
          <SectionCard title="Model Usage" delay={0.3}>
            <div className="space-y-1">
              {modelEntries.length === 0 ? (
                <p className="text-xs text-slate-400">No model data</p>
              ) : (
                modelEntries.map(([model, count]) => {
                  const sharePct = ((count / data.totalEvaluations) * 100).toFixed(0);
                  const barWidth = (count / data.totalEvaluations) * 100;
                  return (
                    <div key={model} className="group">
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-medium text-slate-700 truncate flex-1 pr-3" title={model}>
                          {modelLabel(model)}
                        </span>
                        <span className="text-xs text-slate-400 tabular-nums flex-shrink-0">
                          {count} &middot; {sharePct}%
                        </span>
                      </div>
                      <div className="h-1 bg-slate-100 rounded-full overflow-hidden -mt-1 mb-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
                          className="h-full bg-blue-400 rounded-full"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Supplemental stats */}
            {(data.topBriefGeographies?.length > 0 || data.avgQuestionCount > 0) && (
              <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
                {data.topBriefGeographies?.length > 0 && (
                  <div>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Top markets</p>
                    <div className="flex flex-wrap gap-1.5">
                      {data.topBriefGeographies.map((geo) => {
                        const label = typeof geo === "string" ? geo : geo.geography;
                        return (
                          <span key={label} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[11px] font-medium">
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
                {data.avgQuestionCount > 0 && (
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-xs text-slate-500">
                      Avg <span className="font-semibold text-slate-700">{data.avgQuestionCount.toFixed(1)}</span> questions per clarification round
                    </span>
                  </div>
                )}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Row 4 – Recent evaluations */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">Recent Evaluations</h2>
            <span className="text-[11px] text-slate-400">Last {data.recentEvents.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-24">When</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-40">Verdict</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Brief</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-20">Score</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wide w-20">Duration</th>
                  <th className="px-5 py-3 w-8" />
                </tr>
              </thead>
              <tbody>
                {data.recentEvents.map((event, idx) => {
                  const rowKey = `${event.sessionId}-${idx}`;
                  const isExpanded = expandedRow === rowKey;
                  const meta = VERDICT_META[event.verdictPath];
                  const preview = briefPreview(event);
                  const hasAudit = !!(event.gateResultsFull || event.scoringBreakdown);

                  return (
                    <>
                      <tr
                        key={rowKey}
                        onClick={() => hasAudit && setExpandedRow(isExpanded ? null : rowKey)}
                        className={`border-b border-slate-100 transition-colors ${
                          hasAudit ? "cursor-pointer hover:bg-slate-50" : ""
                        } ${event.error ? "bg-rose-50/40" : ""} ${isExpanded ? "bg-blue-50/30" : ""}`}
                      >
                        <td className="px-5 py-3.5 text-xs text-slate-400 whitespace-nowrap">
                          {relativeTime(event.timestamp)}
                        </td>
                        <td className="px-5 py-3.5">
                          {meta ? (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${meta.badge}`}>
                              {meta.label}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400">{event.verdictPath}</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          {event.error ? (
                            <span className="text-xs text-rose-600 flex items-center gap-1.5">
                              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                              {event.error.slice(0, 80)}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-600 line-clamp-1" title={preview}>
                              {preview}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs tabular-nums">
                          {event.scoringTotal !== null ? (
                            <span className={event.scoringTotal >= 60 ? "text-green-700 font-semibold" : "text-red-600 font-semibold"}>
                              {event.scoringTotal}/70
                            </span>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap tabular-nums">
                          {(event.durationMs / 1000).toFixed(1)}s
                        </td>
                        <td className="px-3 py-3.5 text-slate-400">
                          {hasAudit && (
                            isExpanded
                              ? <ChevronUp className="h-4 w-4" />
                              : <ChevronDown className="h-4 w-4" />
                          )}
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr key={`${rowKey}-audit`}>
                          <td colSpan={6} className="p-0">
                            <AuditPanel event={event} />
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50">
            <p className="text-[11px] text-slate-400">Click any row with audit data to see full gate reasoning and scoring breakdown.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

// ─── Header component ─────────────────────────────────────────────────────────

function PageHeader({
  loading,
  countdown,
  onRefresh,
}: {
  loading: boolean;
  countdown: number;
  onRefresh: () => void;
}) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-10">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="w-px h-4 bg-slate-200" />

      <div className="flex items-center gap-2 flex-1">
        <BarChart2 className="h-4 w-4 text-slate-400" />
        <h1 className="text-sm font-semibold text-slate-900">Usage Analytics</h1>
      </div>

      <Link
        href="/lab"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        <Beaker className="h-4 w-4" />
        <span>Lab</span>
        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1 py-0.5 rounded uppercase tracking-wide">Beta</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3.5 w-3.5" />
          Refreshing in {countdown}s
        </div>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" />
          )}
          Refresh
        </button>
      </div>
    </header>
  );
}
