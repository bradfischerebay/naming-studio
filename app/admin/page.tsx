"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap, Database, Globe, Search, MessageSquare, Ticket, ShoppingBag,
  CheckCircle2, XCircle, Lock, ChevronRight, Download, BarChart2,
  GitBranch, Layers, FileText, Brain, Languages, Star, Cpu,
  Archive, BookOpen, Share2, Workflow
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatusResponse {
  authenticated: boolean;
  integrations: {
    chomsky: { configured: boolean; endpoint: string | null };
    redis: { configured: boolean };
    deepsights: { configured: boolean };
    glean: { configured: boolean };
    slack: { configured: boolean };
    jira: { configured: boolean; projectKey: string | null };
    ebayApi: { configured: boolean };
    vp2Embeddings: { configured: boolean };
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const INTEGRATIONS = [
  {
    key: "chomsky",
    name: "Chomsky LLM Gateway",
    icon: <Zap className="h-5 w-5" />,
    description: "eBay's internal LLM router (Azure + GCP). Powers all gate evaluations, brief parsing, landscape research, fact extraction, and question generation.",
    powers: "All LLM pipeline steps",
  },
  {
    key: "vp2Embeddings",
    name: "VP2 Embeddings",
    icon: <Brain className="h-5 w-5" />,
    description: "Vector Prime 2 — eBay's internal embedding model via Chomsky. Converts briefs to 1536-dim vectors for cosine similarity search.",
    powers: "Brief similarity memory",
  },
  {
    key: "redis",
    name: "Upstash Redis",
    icon: <Database className="h-5 w-5" />,
    description: "Serverless Redis for persistent storage. Stores analytics events, brief embeddings, brief corpus, and named Lab presets.",
    powers: "Analytics, memory, corpus, presets",
  },
  {
    key: "deepsights",
    name: "DeepSights",
    icon: <Globe className="h-5 w-5" />,
    description: "eBay's internal market intelligence platform. Provides competitive analysis, topic research, and internal document search for landscape synthesis.",
    powers: "Landscape Researcher",
  },
  {
    key: "glean",
    name: "Glean Enterprise Search",
    icon: <Search className="h-5 w-5" />,
    description: "eBay's internal knowledge search across Confluence, Jira, Slack, and Drive. Augments brief evaluation with internal context.",
    powers: "Landscape Researcher (context)",
  },
  {
    key: "slack",
    name: "Slack Webhook",
    icon: <MessageSquare className="h-5 w-5" />,
    description: "Posts Block Kit notifications to a team channel when PATH_C (Approved for Naming) verdicts are reached — verdict title, score, and brief snippet.",
    powers: "PATH_C notifications",
  },
  {
    key: "jira",
    name: "JiraP Integration",
    icon: <Ticket className="h-5 w-5" />,
    description: "Creates naming decision tickets in eBay's internal Jira on PATH_C verdicts. Ticket body includes gate table, score breakdown, and brief excerpt in wiki markup.",
    powers: "PATH_C ticket creation",
  },
  {
    key: "ebayApi",
    name: "eBay Finding API",
    icon: <ShoppingBag className="h-5 w-5" />,
    description: "eBay's public marketplace API. Powers the Name Checker tool — searches for existing listings to verify candidate name availability.",
    powers: "Name Checker",
  },
];

type CapabilityCategory = "Pipeline" | "Memory" | "Export" | "Tools" | "Lab";

interface Capability {
  name: string;
  category: CapabilityCategory;
  icon: React.ReactNode;
  description: string;
}

const CAPABILITIES: Capability[] = [
  // Pipeline
  { name: "Brief Parser", category: "Pipeline", icon: <FileText className="h-4 w-4" />, description: "LLM-powered. Converts raw text and documents into a structured CompiledBrief — offering description, target customers, markets, timing, and lifespan." },
  { name: "Landscape Researcher", category: "Pipeline", icon: <Globe className="h-4 w-4" />, description: "LLM + optional web/Glean/DeepSights search. Synthesizes competitive landscape, market positioning, and portfolio context." },
  { name: "Fact Extractor", category: "Pipeline", icon: <Brain className="h-4 w-4" />, description: "LLM-powered. Extracts NamingFacts and score tags: standalone, global, legal, clarity, portfolio_risk, trademark_risk." },
  { name: "Gate Evaluator (G0–G5)", category: "Pipeline", icon: <Layers className="h-4 w-4" />, description: "Deterministic TypeScript. Six architectural gates: Interaction Model, Integration Level, Standalone Architecture, Strategic Lifespan, Portfolio Alignment, Legal & Localization." },
  { name: "G6 Linguistic Gate", category: "Pipeline", icon: <Languages className="h-4 w-4" />, description: "LLM-powered, conditional. Fires when target markets include non-English regions. Evaluates pronunciation difficulty, false cognates, cultural connotations, and script compatibility." },
  { name: "Scorer", category: "Pipeline", icon: <Star className="h-4 w-4" />, description: "Deterministic TypeScript. Calculates 0–70 point score across 5 factors: Standalone (25), Longevity (15), Legal (10), Global (10), Clarity (10). Threshold: 60 to proceed." },
  { name: "Verdict Router", category: "Pipeline", icon: <GitBranch className="h-4 w-4" />, description: "Deterministic. Five-path hierarchy: PATH_A0 (no interaction), PATH_A1 (gate fail), PATH_A2 (low score), PATH_B (need info), PATH_C (approved)." },
  { name: "Question Generator", category: "Pipeline", icon: <MessageSquare className="h-4 w-4" />, description: "LLM-powered. Generates targeted clarification questions when key brief details are missing. Triggered on PATH_B verdicts." },
  // Memory
  { name: "Brief Similarity Memory", category: "Memory", icon: <Database className="h-4 w-4" />, description: "VP2 embeddings stored in Redis. After each evaluation, surfaces top-3 similar past decisions using hybrid cosine + keyword scoring (75/25 weighting)." },
  { name: "Brief Corpus", category: "Memory", icon: <Archive className="h-4 w-4" />, description: "SHA-256 fingerprints every brief. Groups identical submissions (deduplication), tracks verdict distribution across runs, and builds a curated dataset for future fine-tuning." },
  { name: "Analytics", category: "Memory", icon: <BarChart2 className="h-4 w-4" />, description: "Logs every evaluation to Redis. Tracks verdicts, gate pass rates by gate, model usage, avg duration, brief length, and geography distribution." },
  // Export
  { name: "Confluence Export", category: "Export", icon: <BookOpen className="h-4 w-4" />, description: "Converts verdict + gate table + score breakdown to Jira wiki markup. Paste directly into a Confluence page with formatted tables and colored status cells." },
  { name: "Slack Notifications", category: "Export", icon: <MessageSquare className="h-4 w-4" />, description: "Block Kit message to the team channel on every PATH_C verdict — includes verdict title, score, brief snippet, and gate summary." },
  { name: "Jira Ticket Creation", category: "Export", icon: <Ticket className="h-4 w-4" />, description: "One-click ticket in JiraP on PATH_C. Body includes gate table, score breakdown, and brief excerpt in wiki markup. Labels: naming-studio, ai-governance, path-c." },
  { name: "JSONL Training Export", category: "Export", icon: <Download className="h-4 w-4" />, description: "Admin-only endpoint (/api/corpus?export=jsonl). Exports approved briefs in Anthropic or OpenAI fine-tuning format for brief generator training." },
  // Tools
  { name: "Name Candidate Validator", category: "Tools", icon: <Languages className="h-4 w-4" />, description: "Enter 1–3 candidate names post-PATH_C. Runs per-name × per-market LLM analysis: pronunciation, false cognates, cultural fit, and risk flags. Renders as a traffic-light grid." },
  { name: "Naming Registry", category: "Tools", icon: <Archive className="h-4 w-4" />, description: "Searchable table of all PATH_C approved naming decisions from brief memory. Includes CSV export. Accessible at /registry." },
  { name: "Document Upload", category: "Tools", icon: <FileText className="h-4 w-4" />, description: "Upload PDF, DOCX, or TXT brief files directly in the chat. Parsed server-side (Mammoth for DOCX, pdf-parse for PDF) and evaluated inline." },
  { name: "Model Selection", category: "Tools", icon: <Cpu className="h-4 w-4" />, description: "9 supported LLM models: GPT-5.2, GPT-4.1, GPT-4.1 Mini, Claude Sonnet 4.6, Claude Opus 4.6, Gemini 3.1 Pro, Gemini 3.1 Flash. Per-model rate limit badges shown." },
  // Lab
  { name: "Lab — Streaming Evaluation", category: "Lab", icon: <Workflow className="h-4 w-4" />, description: "Real-time gate evaluation with SSE streaming. Each gate thinks out loud as it runs. Supports retry, context injection, and re-evaluation of individual gates." },
  { name: "Lab — Custom Gates", category: "Lab", icon: <Layers className="h-4 w-4" />, description: "Define additional gates beyond G0–G6 with custom labels, descriptions, pass conditions, and fail conditions. Runs in parallel with the standard batch." },
  { name: "Lab — Scoring Config", category: "Lab", icon: <Star className="h-4 w-4" />, description: "Toggle default scoring factors on/off, override max points per factor, add custom scoring criteria, and adjust the pass/fail threshold (default: 60)." },
  { name: "Lab — Quick Test", category: "Lab", icon: <Share2 className="h-4 w-4" />, description: "Batch-evaluate 5 briefs at once against your current gate configuration. Results shown as a verdict × gate grid. Runs briefs sequentially to avoid rate limiting." },
  { name: "Lab — Named Presets", category: "Lab", icon: <BookOpen className="h-4 w-4" />, description: "Save gate + scoring configurations as named presets in Redis. Load or delete presets across sessions. Auto-saves to localStorage for instant recovery." },
];

const CATEGORY_COLORS: Record<CapabilityCategory, string> = {
  Pipeline: "bg-blue-50 text-blue-700 border-blue-100",
  Memory:   "bg-purple-50 text-purple-700 border-purple-100",
  Export:   "bg-emerald-50 text-emerald-700 border-emerald-100",
  Tools:    "bg-amber-50 text-amber-700 border-amber-100",
  Lab:      "bg-slate-100 text-slate-600 border-slate-200",
};

// ─── Components ───────────────────────────────────────────────────────────────

function StatusPill({ configured }: { configured: boolean }) {
  return configured ? (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
      <CheckCircle2 className="h-3 w-3" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">
      <XCircle className="h-3 w-3" /> Not configured
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [authKey, setAuthKey] = useState("");
  const [authError, setAuthError] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CapabilityCategory | "All">("All");

  const fetchStatus = async (key: string) => {
    const res = await fetch(`/api/admin/status?key=${encodeURIComponent(key)}`);
    const data = await res.json() as StatusResponse;
    return data;
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_key") ?? "";
    fetchStatus(stored).then((data) => {
      if (data.authenticated) setStatus(data);
    });
  }, []);

  const handleAuth = async () => {
    setIsAuthenticating(true);
    setAuthError(false);
    try {
      const data = await fetchStatus(authKey);
      if (data.authenticated) {
        sessionStorage.setItem("admin_key", authKey);
        setStatus(data);
      } else {
        setAuthError(true);
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Password gate
  if (!status) {
    return (
      <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-slate-400" />
            <span className="font-semibold text-slate-900">Admin access</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">Enter the admin password to view the platform capabilities dashboard.</p>
          <div className="space-y-2">
            <input
              type="password"
              value={authKey}
              onChange={(e) => setAuthKey(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && void handleAuth()}
              placeholder="Password"
              className="w-full text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-400 bg-slate-50 focus:bg-white transition-colors"
              autoFocus
            />
            {authError && <p className="text-xs text-red-500">Incorrect password.</p>}
            <button
              type="button"
              onClick={() => void handleAuth()}
              disabled={isAuthenticating || !authKey}
              className="w-full flex items-center justify-center gap-1.5 bg-slate-900 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-slate-700 disabled:opacity-50 transition-colors"
            >
              {isAuthenticating ? "Checking…" : "Enter"}
              {!isAuthenticating && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 text-center">
            If ADMIN_PASSWORD is not set, any key will work.
          </p>
        </div>
      </div>
    );
  }

  const categories: Array<CapabilityCategory | "All"> = ["All", "Pipeline", "Memory", "Export", "Tools", "Lab"];
  const filteredCapabilities = activeCategory === "All"
    ? CAPABILITIES
    : CAPABILITIES.filter((c) => c.category === activeCategory);

  const configuredCount = Object.values(status.integrations).filter((i) => i.configured).length;
  const totalCount = Object.values(status.integrations).length;

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="bg-[#171717] text-white px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold">Naming Studio — Platform Capabilities</h1>
              <p className="text-xs text-white/40 mt-0.5">Internal admin view — do not share externally</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40">
                {configuredCount}/{totalCount} integrations active
              </span>
              <Link
                href="/"
                className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
              >
                ← Naming Assistant
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">

        {/* ── Integrations ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold text-slate-900">Connected Integrations</h2>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              {configuredCount} of {totalCount} active
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {INTEGRATIONS.map((integration) => {
              const raw = status.integrations[integration.key as keyof typeof status.integrations];
              const configured = raw?.configured ?? false;
              const projectKey = integration.key === "jira" && status.integrations.jira.projectKey
                ? ` · ${status.integrations.jira.projectKey}`
                : "";
              const modelNote = integration.key === "chomsky" && status.integrations.chomsky.endpoint
                ? <span className="text-[10px] text-slate-400 font-mono mt-1 block truncate">{status.integrations.chomsky.endpoint}</span>
                : null;

              return (
                <div
                  key={integration.key}
                  className={`bg-white rounded-2xl border p-4 space-y-3 ${configured ? "border-slate-200" : "border-slate-100 opacity-60"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-lg ${configured ? "bg-slate-100 text-slate-700" : "bg-slate-50 text-slate-400"}`}>
                        {integration.icon}
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">{integration.name}{projectKey}</div>
                        {modelNote}
                      </div>
                    </div>
                    <StatusPill configured={configured} />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{integration.description}</p>
                  <div className="text-[10px] text-slate-400 font-medium border-t border-slate-100 pt-2">
                    Powers: {integration.powers}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Capabilities ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Platform Capabilities</h2>
            <div className="flex gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                    activeCategory === cat
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredCapabilities.map((cap) => (
              <div key={cap.name} className="bg-white rounded-2xl border border-slate-200 p-4 flex gap-3">
                <span className="p-1.5 rounded-lg bg-slate-100 text-slate-600 flex-shrink-0 h-fit">
                  {cap.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs font-semibold text-slate-900">{cap.name}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${CATEGORY_COLORS[cap.category]}`}>
                      {cap.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Quick links ── */}
        <section>
          <h2 className="text-sm font-bold text-slate-900 mb-4">Admin Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Brief Corpus", href: "/api/corpus?limit=20", desc: "Paginated unique briefs with run counts" },
              { label: "Export PATH_C JSONL", href: "/api/corpus?export=jsonl&verdict=PATH_C&format=anthropic", desc: "Fine-tuning dataset — approved entries only" },
              { label: "Analytics Summary", href: "/api/analytics", desc: "Evaluation stats from Redis" },
              { label: "Naming Registry", href: "/registry", desc: "All PATH_C decisions" },
              { label: "Governance", href: "/governance", desc: "AI transparency disclosure" },
              { label: "Lab", href: "/lab", desc: "Streaming gate evaluation workbench" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-900">{link.label}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
                <p className="text-[11px] text-slate-500">{link.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-6 pb-4 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Naming Studio v2.0 — eBay AI Governance · Built April 2026
          </p>
          <Link href="/" className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors">
            ← Back to Naming Assistant
          </Link>
        </footer>
      </div>
    </div>
  );
}
