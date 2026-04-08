"use client";

import { motion } from "framer-motion";
import { Loader2, User, Sparkles, Download, Copy, Check, ChevronDown, Printer } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { GatesTable } from "./GatesTable";
import { VerdictBanner } from "./VerdictBanner";
import type { GatekeeperResult, ScorerResult } from "@/lib/schemas";

export interface Message {
  role: "user" | "assistant";
  content: string;
  metadata?: {
    type?: "brief" | "clarification" | "evaluation" | "final_verdict" | "loading" | "upload" | "chat";
    gateResults?: GatekeeperResult;
    scoringResults?: ScorerResult;
    totalScore?: number;
    questions?: string[];
    verdict?: string;
    verdictPath?: string;
    verdictSummary?: string[];
    uploadedFile?: string;
    compiledBrief?: Record<string, unknown> | null;
  };
}

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
}

// ─── Markdown renderer ────────────────────────────────────────────────────────
// Handles: ### headings, ## headings, **bold**, *italic*, - bullet lists, numbered lists

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-sm font-bold text-slate-900 mt-4 mb-1 first:mt-0">
          {inlineMarkdown(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-base font-bold text-slate-900 mt-5 mb-1 first:mt-0">
          {inlineMarkdown(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-lg font-bold text-slate-900 mt-5 mb-2 first:mt-0">
          {inlineMarkdown(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Unordered list — collect consecutive items
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 my-2 text-slate-700">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed">{inlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1 my-2 text-slate-700">
          {items.map((item, j) => (
            <li key={j} className="text-sm leading-relaxed">{inlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      elements.push(<hr key={i} className="border-slate-200 my-3" />);
      i++;
      continue;
    }

    // Empty line → spacing
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm leading-relaxed text-slate-700">
        {inlineMarkdown(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

// Inline markdown: **bold**, *italic*, `code`
function inlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ─── Export helpers ───────────────────────────────────────────────────────────

function buildMarkdownExport(message: Message): string {
  const m = message.metadata!;
  const gateLabels: Record<string, string> = {
    G0: "Interaction Model", G1: "Integration Level", G2: "Standalone Architecture",
    G3: "Strategic Lifespan", G4: "Portfolio Alignment", G5: "Legal & Localization Safety",
  };
  // PATH_A1 is an internal qualifier — excluded from user-facing exports
  const pathLabels: Record<string, string> = {
    PATH_A0: "Do Not Name — Use Inline Copy",
    PATH_A2: "Use a Descriptive Label — Score Below Threshold",
    PATH_B: "More Information Needed", PATH_C: "Approved for Naming",
  };

  let out = `## ${m.verdict}\n`;
  if (m.verdictPath && pathLabels[m.verdictPath]) out += `_${pathLabels[m.verdictPath]}_\n`;
  out += "\n";

  if (m.verdictSummary?.length) {
    out += m.verdictSummary.filter(Boolean).map(s => `- ${s}`).join("\n") + "\n\n";
  }

  if (m.gateResults) {
    out += "### Gate Evaluation\n\n";
    out += "| Gate | Criterion | Status | Reasoning |\n| --- | --- | --- | --- |\n";
    for (const [key, gate] of Object.entries(m.gateResults)) {
      const g = gate as { status: string; reasoning: string };
      const icon = g.status === "Pass" ? "✅" : g.status === "Fail" ? "❌" : "⏸️";
      out += `| ${key} | ${gateLabels[key] ?? key} | ${icon} ${g.status} | ${g.reasoning} |\n`;
    }
    out += "\n";
  }

  if (m.scoringResults) {
    out += `### Naming Score: ${m.totalScore ?? 0}/70 — ${(m.totalScore ?? 0) >= 60 ? "Passes" : "Below threshold"}\n\n`;
    out += "| Factor | Score | Max |\n| --- | --- | --- |\n";
    const s = m.scoringResults;
    out += `| Standalone behavior | ${s.standalone} | 25 |\n`;
    out += `| Longevity | ${s.longevity} | 15 |\n`;
    out += `| Legal / Regulatory mandate | ${s.legal} | 10 |\n`;
    out += `| Global viability | ${s.global} | 10 |\n`;
    out += `| Clarity lift | ${s.clarity} | 10 |\n`;
    if ((s.portfolio_risk ?? 0) < 0) out += `| Portfolio name collision | ${s.portfolio_risk} | 0 |\n`;
    if ((s.trademark_risk ?? 0) < 0) out += `| Trademark / legal risk | ${s.trademark_risk} | 0 |\n`;
    out += `| **Total** | **${m.totalScore}** | **70** |\n\n`;
    if (s.reasoning) out += `_${s.reasoning}_\n\n`;
  }

  out += "---\n_Generated by eBay Naming Studio_\n";
  return out;
}

function buildSlackExport(message: Message): string {
  const m = message.metadata!;
  // PATH_A1 is an internal qualifier — excluded from user-facing exports
  const pathLabels: Record<string, string> = {
    PATH_A0: "Do Not Name — Use Inline Copy",
    PATH_A2: "Use a Descriptive Label — Score Below Threshold",
    PATH_B: "More Information Needed", PATH_C: "Approved for Naming",
  };
  const gateLabels: Record<string, string> = {
    G0: "Interaction Model", G1: "Integration Level", G2: "Standalone Architecture",
    G3: "Strategic Lifespan", G4: "Portfolio Alignment", G5: "Legal & Localization Safety",
  };

  let out = `*${m.verdict}*`;
  if (m.verdictPath && pathLabels[m.verdictPath]) out += `\n_${pathLabels[m.verdictPath]}_`;
  out += "\n\n";

  if (m.verdictSummary?.length) {
    out += m.verdictSummary.filter(Boolean).map(s => `• ${s}`).join("\n") + "\n\n";
  }

  if (m.gateResults) {
    out += "*Gate Evaluation:*\n";
    for (const [key, gate] of Object.entries(m.gateResults)) {
      const g = gate as { status: string; reasoning: string };
      const icon = g.status === "Pass" ? "✅" : g.status === "Fail" ? "❌" : "⏸️";
      out += `${icon} *${key} — ${gateLabels[key] ?? key}:* ${g.status}\n> ${g.reasoning}\n`;
    }
    out += "\n";
  }

  if (m.scoringResults) {
    out += `*Naming Score: ${m.totalScore}/70 — ${(m.totalScore ?? 0) >= 60 ? "Passes ✅" : "Below threshold ❌"}*\n`;
    out += "```\n";
    out += `Standalone behavior       ${String(m.scoringResults.standalone).padStart(3)}/25\n`;
    out += `Longevity                 ${String(m.scoringResults.longevity).padStart(3)}/15\n`;
    out += `Legal / Regulatory        ${String(m.scoringResults.legal).padStart(3)}/10\n`;
    out += `Global viability          ${String(m.scoringResults.global).padStart(3)}/10\n`;
    out += `Clarity lift              ${String(m.scoringResults.clarity).padStart(3)}/10\n`;
    if ((m.scoringResults.portfolio_risk ?? 0) < 0) out += `Portfolio collision        ${String(m.scoringResults.portfolio_risk).padStart(3)}\n`;
    if ((m.scoringResults.trademark_risk ?? 0) < 0) out += `Trademark / legal risk    ${String(m.scoringResults.trademark_risk).padStart(3)}\n`;
    out += `─────────────────────────────\nTOTAL                     ${String(m.totalScore).padStart(3)}/70\n\`\`\`\n`;
  }

  out += "\n_Generated by eBay Naming Studio_";
  return out;
}

function buildConfluenceExport(message: Message): string {
  const m = message.metadata!;
  // PATH_A1 is an internal qualifier — excluded from user-facing exports
  const pathLabels: Record<string, string> = {
    PATH_A0: "Do Not Name — Use Inline Copy",
    PATH_A2: "Use a Descriptive Label — Score Below Threshold",
    PATH_B: "More Information Needed", PATH_C: "Approved for Naming",
  };
  const gateLabels: Record<string, string> = {
    G0: "Interaction Model", G1: "Integration Level", G2: "Standalone Architecture",
    G3: "Strategic Lifespan", G4: "Portfolio Alignment", G5: "Legal & Localization Safety",
  };

  let out = `h2. ${m.verdict}\n\n`;
  if (m.verdictPath && pathLabels[m.verdictPath]) out += `_${pathLabels[m.verdictPath]}_\n\n`;

  if (m.verdictSummary?.length) {
    out += m.verdictSummary.filter(Boolean).map(s => `* ${s}`).join("\n") + "\n\n";
  }

  out += "----\n\n";

  if (m.gateResults) {
    out += "h3. Gate Evaluation\n\n";
    out += "||Gate||Criterion||Status||Reasoning||\n";
    for (const [key, gate] of Object.entries(m.gateResults)) {
      const g = gate as { status: string; reasoning: string };
      let statusCell = "";
      if (g.status === "Pass") {
        statusCell = "{color:#00875A}✅ Pass{color}";
      } else if (g.status === "Fail") {
        statusCell = "{color:#DE350B}❌ Fail{color}";
      } else {
        statusCell = "{color:#FF8B00}⏸️ Unknown{color}";
      }
      out += `|${key}|${gateLabels[key] ?? key}|${statusCell}|${g.reasoning}|\n`;
    }
    out += "\n----\n\n";
  }

  if (m.scoringResults) {
    out += `h3. Naming Score: ${m.totalScore ?? 0}/70 — ${(m.totalScore ?? 0) >= 60 ? "Passes" : "Below threshold"}\n\n`;
    out += "||Factor||Score||Max||\n";
    const s = m.scoringResults;
    out += `|Standalone behavior|${s.standalone}|25|\n`;
    out += `|Longevity|${s.longevity}|15|\n`;
    out += `|Legal / Regulatory mandate|${s.legal}|10|\n`;
    out += `|Global viability|${s.global}|10|\n`;
    out += `|Clarity lift|${s.clarity}|10|\n`;
    if ((s.portfolio_risk ?? 0) < 0) out += `|Portfolio name collision|${s.portfolio_risk}|0|\n`;
    if ((s.trademark_risk ?? 0) < 0) out += `|Trademark / legal risk|${s.trademark_risk}|0|\n`;
    out += `||*Total*||*${m.totalScore}*||*70*||\n\n`;
    out += "----\n";
  }

  out += "_Generated by eBay Naming Studio_\n";
  return out;
}

// ─── Compiled Brief Summary ──────────────────────────────────────────────────

function CompiledBriefSummary({ brief }: { brief: Record<string, unknown> }) {
  const [open, setOpen] = useState(false);

  const fields = [
    { key: "offering_description", label: "Offering" },
    { key: "product_type", label: "Product type" },
    { key: "target_customers", label: "Target users" },
    { key: "target_geographies", label: "Markets" },
    { key: "timing", label: "Timing" },
    { key: "strategic_lifespan", label: "Lifespan" },
  ].filter(({ key }) => {
    const val = brief[key];
    return val !== null && val !== undefined && val !== "" && !(Array.isArray(val) && val.length === 0);
  });

  if (fields.length === 0) return null;

  return (
    <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">What I understood from your brief</span>
        <span className="text-slate-400 text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="divide-y divide-slate-100">
          {fields.map(({ key, label }) => {
            const val = brief[key];
            const display = Array.isArray(val) ? val.join(", ") : String(val);
            return (
              <div key={key} className="flex gap-3 px-3 py-2">
                <span className="text-xs font-medium text-slate-500 w-28 flex-shrink-0">{label}</span>
                <span className="text-xs text-slate-800 leading-snug">{display}</span>
              </div>
            );
          })}
          <div className="px-3 py-2 bg-blue-50">
            <p className="text-xs text-blue-700">If any of these are wrong, reply with a correction and I&apos;ll re-evaluate.</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Verdict Guidance ─────────────────────────────────────────────────────────

function VerdictGuidance({ path }: { path: string }) {
  if (path === "PATH_C") return null; // Proceed — no alternative guidance needed

  const guidance: Record<string, { heading: string; body: string; examples?: string[] }> = {
    PATH_A0: {
      heading: "Use inline copy instead of a name",
      body: "This initiative runs automatically in the background — users never see or select it by name. eBay's naming standards reserve proper names for user-facing, opt-in products. Work with Content Design to write clear UI copy that describes what happens.",
      examples: ["'Listings are automatically optimized for search'", "'Your returns are protected by eBay's guarantee'"],
    },
    PATH_A1: {
      heading: "Use a descriptive label instead",
      body: "This initiative doesn't yet qualify as a standalone named product. Use a descriptive label that explains what users do or get — following the '[eBay] + [job to be done]' pattern. Re-evaluate if the scope expands to separate enrollment or multi-year strategy.",
      examples: ["'eBay standard shipping'", "'Verified returns'", "'Managed payments protection'"],
    },
    PATH_A2: {
      heading: "Use a descriptive label for now",
      body: "The architectural gates pass, but the strategic score is below threshold. This usually means the initiative is too integrated, too short-term, or not yet global enough to justify naming investment. Use a descriptive label and re-evaluate when scope increases.",
      examples: ["Consider: '[eBay] + [feature description]' pattern", "'Re-evaluate when: standalone enrollment, 12+ month plan, or multi-market scope'"],
    },
    PATH_B: {
      heading: "Provide the missing information above",
      body: "Reply with the answers to the questions listed above. Be specific about enrollment model, timing, and markets — these are the most common factors that determine naming eligibility.",
    },
  };

  const g = guidance[path];
  if (!g) return null;

  const borderColor = path === "PATH_B" ? "border-blue-200 bg-blue-50" : "border-amber-200 bg-amber-50";
  const textColor = path === "PATH_B" ? "text-blue-800" : "text-amber-900";
  const headingColor = path === "PATH_B" ? "text-blue-700" : "text-amber-800";

  return (
    <div className={`mt-3 rounded-xl border ${borderColor} p-4`}>
      <p className={`text-xs font-semibold mb-1.5 ${headingColor}`}>{g.heading}</p>
      <p className={`text-xs leading-relaxed ${textColor}`}>{g.body}</p>
      {g.examples && (
        <div className="mt-2 space-y-1">
          {g.examples.map((ex, i) => (
            <p key={i} className={`text-xs italic ${textColor} opacity-80`}>{ex}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Export menu ──────────────────────────────────────────────────────────────

function ExportMenu({ message }: { message: Message }) {
  const [open, setOpen] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(key);
      setTimeout(() => { setCopiedItem(null); setOpen(false); }, 1500);
    });
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(message.metadata, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "naming-verdict.json";
    a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const printPdf = () => {
    setOpen(false);
    setTimeout(() => window.print(), 100);
  };

  return (
    <div className="relative mt-2" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors"
      >
        <Download className="h-3 w-3" />
        Export
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-xl shadow-lg py-1 w-52">
          <button
            className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
            onClick={() => copyText(buildMarkdownExport(message), "markdown")}
          >
            {copiedItem === "markdown" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
            Copy as Markdown
          </button>
          <button
            className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
            onClick={() => copyText(buildSlackExport(message), "slack")}
          >
            {copiedItem === "slack" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
            Copy for Slack
          </button>
          <button
            className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
            onClick={() => copyText(buildConfluenceExport(message), "confluence")}
          >
            {copiedItem === "confluence" ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
            Copy for Confluence
          </button>
          <div className="border-t border-slate-100 my-1" />
          <button
            className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
            onClick={downloadJson}
          >
            <Download className="h-3.5 w-3.5 text-slate-400" />
            Download JSON
          </button>
          <button
            className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
            onClick={printPdf}
          >
            <Printer className="h-3.5 w-3.5 text-slate-400" />
            Save as PDF
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isLoading = message.metadata?.type === "loading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}
    >
      <div className={`flex gap-3 w-full ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 mt-1 h-7 w-7 rounded-full flex items-center justify-center text-white ${
          isUser ? "bg-slate-600" : "bg-slate-900"
        }`}>
          {isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : isUser ? (
            <User className="h-3.5 w-3.5" />
          ) : (
            <Sparkles className="h-3.5 w-3.5" />
          )}
        </div>

        {/* Content column */}
        <div className={`flex-1 min-w-0 flex flex-col gap-2 ${isUser ? "items-end" : "items-start"}`}>
          <span className="text-xs font-semibold text-slate-400">
            {isUser ? "You" : "Naming Assistant"}
          </span>

          {/* Bubble — full width for assistant messages that contain tables */}
          <div className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-white border border-slate-200 text-slate-800 max-w-[85%]"
              : "bg-[#f9f9f9] border border-slate-200 w-full"
          }`}>
            {/* Uploaded file pill */}
            {message.metadata?.uploadedFile && (
              <div className="mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                  {message.metadata.uploadedFile}
                </span>
              </div>
            )}

            {/* Conversational mode indicator */}
            {message.metadata?.type === "chat" && (
              <div className="mb-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-full px-2 py-0.5 uppercase tracking-wide">
                  Conversational response — no gates run
                </span>
              </div>
            )}

            {/* Text with markdown */}
            {message.content && (
              isLoading
                ? <p className="text-sm text-slate-500 italic flex items-center gap-2">
                    <span className="inline-flex gap-0.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                    {message.content}
                  </p>
                : <div className="text-sm">{renderMarkdown(message.content)}</div>
            )}

            {/* Gates Table */}
            {message.metadata?.gateResults && (
              <div className="mt-4">
                <GatesTable gateResults={message.metadata.gateResults} />
              </div>
            )}

            {/* Compiled brief summary */}
            {message.metadata?.compiledBrief && (
              <CompiledBriefSummary brief={message.metadata.compiledBrief} />
            )}

            {/* Scoring breakdown */}
            {message.metadata?.scoringResults && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Naming Score</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    (message.metadata.totalScore ?? 0) >= 60
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {message.metadata.totalScore}/70 — {(message.metadata.totalScore ?? 0) >= 60 ? "Passes" : "Below threshold"}
                  </span>
                </div>
                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  {/* Positive factors */}
                  {[
                    {
                      label: "Standalone behavior",
                      why: "Separate enrollment, distinct checkout, or vertical service",
                      value: message.metadata.scoringResults.standalone,
                      max: 25,
                      positive: true,
                    },
                    {
                      label: "Longevity",
                      why: "Planned duration of 12+ months",
                      value: message.metadata.scoringResults.longevity,
                      max: 15,
                      positive: true,
                    },
                    {
                      label: "Legal / Regulatory mandate",
                      why: "Formal legal requirement, trademark filing, or compliance mandate",
                      value: message.metadata.scoringResults.legal,
                      max: 10,
                      positive: true,
                    },
                    {
                      label: "Global viability",
                      why: "US + UK/DE markets, or explicitly global scope",
                      value: message.metadata.scoringResults.global,
                      max: 10,
                      positive: true,
                    },
                    {
                      label: "Clarity lift",
                      why: "Complex concept where a name meaningfully aids comprehension",
                      value: message.metadata.scoringResults.clarity,
                      max: 10,
                      positive: true,
                    },
                  ].map(({ label, why, value, max, positive }) => (
                    <div key={label} className="px-3 py-2.5 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-semibold ${value > 0 ? "text-slate-800" : "text-slate-400"}`}>{label}</span>
                            {value > 0 && (
                              <span className="text-[10px] text-green-700 font-semibold bg-green-50 px-1.5 py-0.5 rounded-full">+{value}</span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{why}</p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 w-12 text-right flex-shrink-0">{value}/{max}</span>
                      </div>
                      <div className="bg-slate-100 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full transition-all ${value > 0 ? "bg-green-500" : "bg-slate-200"}`}
                          style={{ width: `${(value / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* Risk deductions — only show if non-zero */}
                  {((message.metadata.scoringResults.portfolio_risk ?? 0) < 0 ||
                    (message.metadata.scoringResults.trademark_risk ?? 0) < 0) && (
                    <>
                      {(message.metadata.scoringResults.portfolio_risk ?? 0) < 0 && (
                        <div className="px-3 py-2.5 border-t border-red-100 bg-red-50/50">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-red-700">Portfolio name collision</span>
                            <span className="text-[10px] text-red-700 font-semibold bg-red-100 px-1.5 py-0.5 rounded-full">{message.metadata.scoringResults.portfolio_risk}</span>
                          </div>
                          <p className="text-[10px] text-red-400 mt-0.5">Conflicts with an existing eBay product name</p>
                        </div>
                      )}
                      {(message.metadata.scoringResults.trademark_risk ?? 0) < 0 && (
                        <div className="px-3 py-2.5 border-t border-red-100 bg-red-50/50">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold text-red-700">Trademark / legal risk</span>
                            <span className="text-[10px] text-red-700 font-semibold bg-red-100 px-1.5 py-0.5 rounded-full">{message.metadata.scoringResults.trademark_risk}</span>
                          </div>
                          <p className="text-[10px] text-red-400 mt-0.5">Legal blocker or trademark conflict detected</p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Total */}
                  <div className={`px-3 py-2.5 border-t border-slate-200 ${
                    (message.metadata.totalScore ?? 0) >= 60 ? "bg-green-50" : "bg-red-50"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-800">Total naming score</span>
                        <p className="text-[10px] text-slate-500 mt-0.5">60+ required to proceed with naming</p>
                      </div>
                      <span className={`text-base font-bold ${
                        (message.metadata.totalScore ?? 0) >= 60 ? "text-green-700" : "text-red-600"
                      }`}>
                        {message.metadata.totalScore}<span className="text-xs font-normal text-slate-400">/70</span>
                      </span>
                    </div>
                    <div className="bg-white/60 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full ${
                          (message.metadata.totalScore ?? 0) >= 60 ? "bg-green-500" : "bg-red-500"
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, ((message.metadata.totalScore ?? 0) / 70) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Clarification questions */}
            {message.metadata?.questions && message.metadata.questions.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">To complete this evaluation, I need the following:</p>
                {message.metadata.questions.map((q, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">{idx + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0 text-sm text-slate-700">
                      {renderMarkdown(q)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verdict banner — outside the bubble */}
          {message.metadata?.verdict && message.metadata.type === "final_verdict" && (
            <div className="w-full">
              <VerdictBanner
                verdict={message.metadata.verdict}
                summary={message.metadata.verdictSummary}
                path={message.metadata.verdictPath}
              />
              <ExportMenu message={message} />
              {message.metadata?.verdictPath && (
                <VerdictGuidance path={message.metadata.verdictPath} />
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
