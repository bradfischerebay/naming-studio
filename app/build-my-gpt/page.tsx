"use client";

import { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Wand2, ChevronRight, ChevronLeft, Check, Copy, Download,
  Loader2, RotateCcw, Sparkles,
} from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────

interface WizardState {
  purpose: string;
  audience: string;
  audienceOther: string;
  tasks: string[];
  tasksOther: string;
  tone: string;
  tools: string[];
  restrictions: string;
}

interface GPTSpec {
  name: string;
  description: string;
  instructions: string;
  starters: string[];
  raw: string; // full LLM output
}

const INITIAL_STATE: WizardState = {
  purpose: "",
  audience: "",
  audienceOther: "",
  tasks: [],
  tasksOther: "",
  tone: "",
  tools: [],
  restrictions: "",
};

const AUDIENCE_OPTIONS = [
  { id: "internal", label: "Internal eBay team", description: "PMMs, PMs, designers, analysts, engineers" },
  { id: "sellers", label: "eBay sellers", description: "B2C / C2C sellers of any size" },
  { id: "buyers", label: "eBay buyers", description: "Shoppers and deal-seekers" },
  { id: "cross_functional", label: "Cross-functional teams", description: "Mixed audiences across orgs" },
  { id: "other", label: "Other", description: "I'll describe it below" },
];

const TASK_OPTIONS = [
  { id: "analyze_data", label: "Analyze data or metrics" },
  { id: "write_content", label: "Write or edit content" },
  { id: "research", label: "Research topics or competitors" },
  { id: "answer_questions", label: "Answer questions & explain concepts" },
  { id: "generate_reports", label: "Generate structured reports" },
  { id: "build_documents", label: "Build documents or templates" },
  { id: "coaching", label: "Coach or guide users through a process" },
  { id: "other", label: "Other" },
];

const TONE_OPTIONS = [
  { id: "professional", label: "Professional & formal", description: "Structured, polished, executive-ready" },
  { id: "conversational", label: "Conversational & casual", description: "Friendly, approachable, uses contractions" },
  { id: "analytical", label: "Analytical & data-driven", description: "Precise, evidence-based, numbers-forward" },
  { id: "creative", label: "Creative & exploratory", description: "Open-ended, idea-generating, experimental" },
];

const TOOL_OPTIONS = [
  { id: "web_browsing", label: "Web browsing / live search" },
  { id: "code_interpreter", label: "Code interpreter / data analysis" },
  { id: "file_uploads", label: "File uploads (PDF, DOCX, CSV)" },
  { id: "image_gen", label: "Image generation" },
  { id: "none", label: "No special tools needed" },
];

const TOTAL_STEPS = 6;

// ── CopyButton ───────────────────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : label}
    </button>
  );
}

// ── SpecSection ──────────────────────────────────────────────────────────────

function SpecSection({
  title,
  content,
  mono = false,
}: {
  title: string;
  content: string;
  mono?: boolean;
}) {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">{title}</span>
        <CopyButton text={content} />
      </div>
      <div className="px-4 py-3">
        {mono ? (
          <pre className="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed font-mono">{content}</pre>
        ) : (
          <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
        )}
      </div>
    </div>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            i < step ? "bg-violet-600" : i === step ? "bg-violet-300" : "bg-gray-100"
          }`}
        />
      ))}
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function BuildMyGPTPage() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);
  const [spec, setSpec] = useState<GPTSpec | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const update = (patch: Partial<WizardState>) => setState((s) => ({ ...s, ...patch }));

  const toggleTask = (id: string) => {
    if (id === "none") { update({ tasks: [], tools: ["none"] }); return; }
    update({
      tasks: state.tasks.includes(id)
        ? state.tasks.filter((t) => t !== id)
        : [...state.tasks.filter((t) => t !== "none"), id],
    });
  };

  const toggleTool = (id: string) => {
    if (id === "none") { update({ tools: ["none"] }); return; }
    update({
      tools: state.tools.includes(id)
        ? state.tools.filter((t) => t !== id)
        : [...state.tools.filter((t) => t !== "none"), id],
    });
  };

  const canProceed = () => {
    if (step === 0) return state.purpose.trim().length > 10;
    if (step === 1) return !!state.audience && (state.audience !== "other" || state.audienceOther.trim().length > 0);
    if (step === 2) return state.tasks.length > 0;
    if (step === 3) return !!state.tone;
    if (step === 4) return state.tools.length > 0;
    return true;
  };

  const buildPrompt = () => {
    const audienceLabel = state.audience === "other"
      ? state.audienceOther
      : AUDIENCE_OPTIONS.find((a) => a.id === state.audience)?.label ?? state.audience;

    const taskLabels = state.tasks.map((t) => {
      if (t === "other") return state.tasksOther;
      return TASK_OPTIONS.find((o) => o.id === t)?.label ?? t;
    }).join(", ");

    const toneLabel = TONE_OPTIONS.find((o) => o.id === state.tone)?.label ?? state.tone;

    const toolLabels = state.tools.includes("none")
      ? "No special tools needed"
      : state.tools.map((t) => TOOL_OPTIONS.find((o) => o.id === t)?.label ?? t).join(", ");

    return `Build me a custom GPT spec with the following details:

**Purpose:** ${state.purpose}

**Target audience:** ${audienceLabel}

**Key tasks this GPT should perform:** ${taskLabels}

**Preferred tone:** ${toneLabel}

**Tools/capabilities needed:** ${toolLabels}

${state.restrictions ? `**Restrictions / things to avoid:** ${state.restrictions}` : ""}

Please produce the complete GPT spec now with all four deliverables (Name, Description, Instructions, Conversation Starters).`;
  };

  const generate = async () => {
    setGenerating(true);
    setError(null);
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/assistants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assistantKey: "build-my-gpt",
          messages: [{ role: "user", content: buildPrompt() }],
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      let fullText = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) fullText += parsed.text;
            } catch { /* skip malformed chunks */ }
          }
        }
      }

      const parsed = parseSpec(fullText);
      setSpec(parsed);
      setStep(6); // results step
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setGenerating(false);
    }
  };

  const parseSpec = (raw: string): GPTSpec => {
    const extract = (label: string) => {
      const re = new RegExp(`\\*\\*${label}[:\\*]*\\*\\*[^\\n]*\\n\`\`\`[^\\n]*\\n([\\s\\S]*?)\`\`\``, "i");
      const match = raw.match(re);
      return match ? match[1].trim() : "";
    };

    const startersRe = /\*\*GPT Conversation Starters[^*]*\*\*[\s\S]*?```[^\n]*\n([\s\S]*?)```/gi;
    const starters: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = startersRe.exec(raw)) !== null) {
      const s = m[1].trim();
      if (s) starters.push(s);
    }

    return {
      name: extract("GPT Name"),
      description: extract("GPT Description"),
      instructions: extract("GPT Instructions"),
      starters,
      raw,
    };
  };

  const downloadWord = () => {
    if (!spec) return;
    const html = `<html><head><meta charset="utf-8"><style>
body{font-family:Calibri,Arial,sans-serif;margin:1in;color:#1f2937}
h1{font-size:18pt;color:#7c3aed}h2{font-size:13pt;color:#5b21b6;margin-top:20px}
p,li{font-size:11pt;line-height:1.6}pre{background:#f9fafb;padding:12px;font-size:10pt;border:1px solid #e5e7eb}
</style></head><body>
<h1>${spec.name || "GPT Spec"}</h1>
<h2>Description</h2><p>${spec.description}</p>
<h2>Instructions</h2><pre>${spec.instructions}</pre>
<h2>Conversation Starters</h2><ul>${spec.starters.map((s) => `<li>${s}</li>`).join("")}</ul>
</body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(spec.name || "gpt-spec").toLowerCase().replace(/\s+/g, "-")}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setSpec(null);
    setError(null);
    setStep(0);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BuildMyGPT</h1>
                <p className="text-xs text-gray-500">Answer 5 questions → get a production-ready GPT spec</p>
              </div>
            </div>
          </div>

          {/* Results step */}
          {step === 6 && spec && (
            <div className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-600" />
                  <span className="text-sm font-semibold text-gray-900">Your GPT spec is ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={downloadWord}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all"
                  >
                    <Download className="w-3 h-3" />
                    Download Word
                  </button>
                  <CopyButton text={spec.raw} label="Copy all" />
                  <button
                    type="button"
                    onClick={reset}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Start over
                  </button>
                </div>
              </div>

              {spec.name && <SpecSection title="GPT Name" content={spec.name} />}
              {spec.description && <SpecSection title="GPT Description" content={spec.description} />}
              {spec.instructions && <SpecSection title="GPT Instructions" content={spec.instructions} mono />}
              {spec.starters.length > 0 && (
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Conversation Starters</span>
                    <CopyButton text={spec.starters.join("\n")} label="Copy all starters" />
                  </div>
                  <div className="divide-y divide-gray-50">
                    {spec.starters.map((s, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2.5">
                        <p className="text-sm text-gray-700 flex-1 pr-3">{s}</p>
                        <CopyButton text={s} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fallback: raw output if parsing failed */}
              {!spec.name && !spec.description && !spec.instructions && (
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Full output</span>
                    <CopyButton text={spec.raw} />
                  </div>
                  <div className="px-4 py-3 prose prose-sm max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{spec.raw}</ReactMarkdown>
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-400 pt-2">
                Copy each section individually using the buttons above, or download as Word.
                Paste into <strong>ChatGPT → Create a GPT → Configure</strong> or share with the PMM Capabilities team to publish internally.
              </p>
            </div>
          )}

          {/* Generating state */}
          {generating && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-violet-600 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">Building your GPT spec…</p>
                <p className="text-xs text-gray-400 mt-1">Writing name, description, instructions, and starters</p>
              </div>
            </div>
          )}

          {/* Wizard steps */}
          {!generating && step < 6 && (
            <div>
              <ProgressBar step={step} />

              {/* Step 0: Purpose */}
              {step === 0 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">Step 1 of {TOTAL_STEPS}</p>
                    <h2 className="text-lg font-semibold text-gray-900">What does your GPT do?</h2>
                    <p className="text-sm text-gray-500 mt-1">Describe its purpose in plain language. What problem does it solve? What should a user be able to do after one conversation?</p>
                  </div>
                  <textarea
                    value={state.purpose}
                    onChange={(e) => update({ purpose: e.target.value })}
                    placeholder="e.g. Helps eBay PMMs write structured competitive analysis reports by asking the right questions about a competitor's product, pricing, and messaging, then formatting the findings into a shareable document."
                    rows={5}
                    className="w-full px-4 py-3 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    autoFocus
                  />
                  <p className="text-xs text-gray-400">Be specific — "helps write reports" is weaker than "walks users through 6 structured questions then produces a 4-section competitive brief."</p>
                </div>
              )}

              {/* Step 1: Audience */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">Step 2 of {TOTAL_STEPS}</p>
                    <h2 className="text-lg font-semibold text-gray-900">Who is the primary user?</h2>
                    <p className="text-sm text-gray-500 mt-1">The GPT's language, tone, and assumptions will be calibrated to this audience.</p>
                  </div>
                  <div className="space-y-2">
                    {AUDIENCE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => update({ audience: opt.id })}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 ${
                          state.audience === opt.id
                            ? "border-violet-500 bg-violet-50"
                            : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            state.audience === opt.id ? "border-violet-500 bg-violet-500" : "border-gray-300"
                          }`}>
                            {state.audience === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  {state.audience === "other" && (
                    <input
                      type="text"
                      value={state.audienceOther}
                      onChange={(e) => update({ audienceOther: e.target.value })}
                      placeholder="Describe the audience…"
                      className="w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                      autoFocus
                    />
                  )}
                </div>
              )}

              {/* Step 2: Tasks */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">Step 3 of {TOTAL_STEPS}</p>
                    <h2 className="text-lg font-semibold text-gray-900">What are the key tasks?</h2>
                    <p className="text-sm text-gray-500 mt-1">Select all that apply. These become the core capabilities in the GPT instructions.</p>
                  </div>
                  <div className="space-y-2">
                    {TASK_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleTask(opt.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                          state.tasks.includes(opt.id)
                            ? "border-violet-500 bg-violet-50"
                            : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          state.tasks.includes(opt.id) ? "border-violet-500 bg-violet-500" : "border-gray-300"
                        }`}>
                          {state.tasks.includes(opt.id) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                        </span>
                        <span className="text-sm text-gray-800">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                  {state.tasks.includes("other") && (
                    <input
                      type="text"
                      value={state.tasksOther}
                      onChange={(e) => update({ tasksOther: e.target.value })}
                      placeholder="Describe the other task(s)…"
                      className="w-full px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                    />
                  )}
                </div>
              )}

              {/* Step 3: Tone */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">Step 4 of {TOTAL_STEPS}</p>
                    <h2 className="text-lg font-semibold text-gray-900">What tone should it use?</h2>
                    <p className="text-sm text-gray-500 mt-1">This shapes how the GPT communicates — its personality and register.</p>
                  </div>
                  <div className="space-y-2">
                    {TONE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => update({ tone: opt.id })}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                          state.tone === opt.id
                            ? "border-violet-500 bg-violet-50"
                            : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                            state.tone === opt.id ? "border-violet-500 bg-violet-500" : "border-gray-300"
                          }`}>
                            {state.tone === opt.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Tools */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">Step 5 of {TOTAL_STEPS}</p>
                    <h2 className="text-lg font-semibold text-gray-900">What tools does it need?</h2>
                    <p className="text-sm text-gray-500 mt-1">Select the capabilities this GPT should have access to.</p>
                  </div>
                  <div className="space-y-2">
                    {TOOL_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleTool(opt.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center gap-3 ${
                          state.tools.includes(opt.id)
                            ? "border-violet-500 bg-violet-50"
                            : "border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                          state.tools.includes(opt.id) ? "border-violet-500 bg-violet-500" : "border-gray-300"
                        }`}>
                          {state.tools.includes(opt.id) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                        </span>
                        <span className="text-sm text-gray-800">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Restrictions + Generate */}
              {step === 5 && (
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-600 mb-1">Step 6 of {TOTAL_STEPS}</p>
                    <h2 className="text-lg font-semibold text-gray-900">Any restrictions? <span className="font-normal text-gray-400">(optional)</span></h2>
                    <p className="text-sm text-gray-500 mt-1">Topics to avoid, sensitive areas, brand guardrails, output format constraints, or anything the GPT should never do.</p>
                  </div>
                  <textarea
                    value={state.restrictions}
                    onChange={(e) => update({ restrictions: e.target.value })}
                    placeholder="e.g. Never discuss competitor pricing in a way that could embarrass eBay. Always use eBay brand voice. Never generate images."
                    rows={4}
                    className="w-full px-4 py-3 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                  />

                  {/* Summary card */}
                  <div className="bg-violet-50 border border-violet-100 rounded-xl px-5 py-4 space-y-2">
                    <p className="text-xs font-semibold text-violet-700 uppercase tracking-wider mb-2">Summary</p>
                    <div className="space-y-1">
                      <SummaryRow label="Purpose" value={state.purpose.slice(0, 100) + (state.purpose.length > 100 ? "…" : "")} />
                      <SummaryRow
                        label="Audience"
                        value={state.audience === "other" ? state.audienceOther : AUDIENCE_OPTIONS.find((a) => a.id === state.audience)?.label ?? ""}
                      />
                      <SummaryRow
                        label="Tasks"
                        value={state.tasks.map((t) => t === "other" ? state.tasksOther : TASK_OPTIONS.find((o) => o.id === t)?.label ?? t).join(", ")}
                      />
                      <SummaryRow label="Tone" value={TONE_OPTIONS.find((o) => o.id === state.tone)?.label ?? ""} />
                      <SummaryRow
                        label="Tools"
                        value={state.tools.includes("none") ? "None" : state.tools.map((t) => TOOL_OPTIONS.find((o) => o.id === t)?.label ?? t).join(", ")}
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canProceed()}
                    className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      canProceed()
                        ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-100"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={generate}
                    disabled={generating}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-100 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate GPT Spec
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-xs">
      <span className="font-medium text-violet-700 flex-shrink-0 w-16">{label}</span>
      <span className="text-violet-900/80">{value}</span>
    </div>
  );
}
