"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import type { StoredConversation } from "@/lib/models/gpt-conversation";
import Sidebar from "@/components/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send, Bot, RotateCcw, Clock, ChevronDown, ChevronUp,
  Zap, Wand2, ClipboardList, Antenna, FileText, BarChart3, ChevronRight,
  Paperclip, X, Search, Copy, Check, Download, BookOpen, Megaphone, FlaskConical,
} from "lucide-react";
import { StructuredResponseRenderer } from "@/components/structured-response/StructuredResponseRenderer";
import { getDrModeratorMockResponse, INITIAL_DR_MOD_STATE, type DrModState } from "@/lib/dr-moderator-mock";
import type { StructuredMessage } from "@/lib/models/assistant-message";

// ── Available Chomsky models ────────────────────────────────────────────────
const MODELS = [
  { id: "azure-chat-completions-gpt-5-2-2025-12-11-sandbox",               label: "GPT-5.2",           badge: "Default" },
  { id: "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox",        label: "Claude Sonnet 4.6", badge: "" },
  { id: "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox",          label: "Claude Opus 4.6",   badge: "Premium" },
  { id: "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox",        label: "Gemini 3.1 Pro",    badge: "Fast" },
] as const;

const DEFAULT_MODEL = MODELS[0].id;

// ── ThinkingIndicator ───────────────────────────────────────────────────────
const THINKING_STEPS = [
  { after: 0,  icon: "✦", text: "Processing your message…" },
  { after: 4,  icon: "🔍", text: "Retrieving relevant context…" },
  { after: 10, icon: "✍️", text: "Composing response…" },
  { after: 22, icon: "⏳", text: "Still working — almost there…" },
  { after: 40, icon: "🔄", text: "Finalizing…" },
];

function ThinkingIndicator() {
  const [elapsed, setElapsed] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ticker = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    const next = stepIndex + 1;
    if (next < THINKING_STEPS.length && elapsed >= THINKING_STEPS[next].after) {
      setVisible(false);
      setTimeout(() => { setStepIndex(next); setVisible(true); }, 200);
    }
  }, [elapsed, stepIndex]);

  const step = THINKING_STEPS[stepIndex];
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const elapsedStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm px-5 py-4 min-w-[260px]">
      <div className="flex items-center gap-2.5 mb-3 transition-opacity duration-200" style={{ opacity: visible ? 1 : 0 }}>
        <span className="text-base leading-none">{step.icon}</span>
        <span className="text-sm text-gray-700 font-medium">{step.text}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden mb-2">
        <div
          className="h-full bg-violet-400 rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${Math.min(95, (stepIndex / (THINKING_STEPS.length - 1)) * 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {THINKING_STEPS.slice(0, stepIndex + 1).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === stepIndex ? "bg-violet-400 animate-pulse" : "bg-gray-300"}`} />
          ))}
          {THINKING_STEPS.slice(stepIndex + 1).map((_, i) => (
            <span key={`p-${i}`} className="w-1.5 h-1.5 rounded-full bg-gray-100" />
          ))}
        </div>
        <span className="text-[10px] text-gray-400 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />{elapsedStr}
        </span>
      </div>
    </div>
  );
}

// ── StreamingBubble ─────────────────────────────────────────────────────────
function StreamingBubble({ content }: { content: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm px-5 py-4 flex-1 min-w-0
      prose prose-sm prose-gray max-w-none
      prose-headings:font-semibold prose-headings:text-gray-900
      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-2
      prose-li:text-gray-700 prose-li:my-0.5
      prose-strong:text-gray-900
      prose-a:text-violet-600 prose-a:no-underline
      prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
      prose-hr:border-gray-100">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      <span className="inline-block w-0.5 h-[1.1em] bg-gray-400 animate-pulse ml-0.5 align-text-bottom" />
    </div>
  );
}

// ── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
  durationMs?: number;
  files?: string[];
  displayText?: string;
  structured?: StructuredMessage;
  submittedResponse?: string;
  exportable?: boolean;
  exportLabel?: string;
  exportFilename?: string;
}

const CONVERSATIONS_KEY = "naming-studio-gpt-conversations";

interface Assistant {
  key: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  capabilities: string[];
  starters: { label: string; prompt: string }[];
  lastUpdated: string;
  preferredModel?: string;
}

// ── Assistant definitions ───────────────────────────────────────────────────
const ASSISTANTS: Assistant[] = [
  {
    key: "build-my-gpt",
    name: "BuildMyGPT",
    tagline: "by PMM",
    description: "Creates custom GPTs with expert-level prompts — delivers a complete name, description, instructions, and conversation starters ready to copy into the GPT builder.",
    icon: <Wand2 className="w-4 h-4 text-white" />,
    color: "bg-violet-600",
    capabilities: ["GPT configuration", "Prompt engineering", "Convo starters"],
    starters: [
      { label: "Build a new GPT", prompt: "I want to build a new GPT. What type of GPT would you like to create today?" },
      { label: "Build a research assistant GPT", prompt: "I need a GPT that helps eBay PMMs synthesize qualitative research from seller interviews into insight reports." },
      { label: "Build a data analysis GPT", prompt: "I need a GPT that helps our team interpret Amplitude charts and explain what the metrics mean for our product strategy." },
      { label: "Build a writing assistant GPT", prompt: "I need a GPT that helps write eBay-brand-voice product announcements for sellers — matching our Real, Smart, Spirited, Dependable voice." },
    ],
    lastUpdated: "2026-04-24",
  },
  {
    key: "dr-moderator",
    name: "Dr. Moderator",
    tagline: "by PMM",
    description: "Dr. Moderator saves hours per study by generating moderator guides from basic prompts and project inputs. Built on internal best practices, it ensures productive conversations and bias reduction for Rapid Feedback & Seller Circle sessions.",
    icon: <ClipboardList className="w-4 h-4 text-white" />,
    color: "bg-teal-600",
    capabilities: ["Moderator guides", "Study design", "Bias reduction"],
    starters: [
      { label: "Build a moderator guide", prompt: "Get started!" },
      { label: "UX feedback session", prompt: "Get started!" },
      { label: "Seller workflow discovery", prompt: "Get started!" },
    ],
    lastUpdated: "2026-04-24",
    preferredModel: "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox",
  },
  {
    key: "sentiment-scout",
    name: "Sentiment Scout",
    tagline: "by PMM",
    description: "Predicts or analyzes community and media response to eBay messaging pre- or post-release. Drop in your messaging to get started.",
    icon: <Antenna className="w-4 h-4 text-white" />,
    color: "bg-rose-600",
    capabilities: ["Pre-release testing", "Media sentiment", "Community reaction"],
    starters: [
      { label: "Test a seller announcement", prompt: "Evaluate this eBay seller announcement for how high-volume sellers and the reseller community would react: [paste your announcement]" },
      { label: "Simulate YouTuber reaction", prompt: "What would popular eBay YouTube creators (Ralli Roots, Commonwealth Picker, etc.) say about this update? [paste your announcement or feature description]" },
      { label: "Find press angles", prompt: "I'm writing a press release about [feature/update]. Identify the top 3 press angles journalists at TechCrunch, WSJ, and The Verge would focus on." },
      { label: "Post-release sentiment check", prompt: "This feature launched 2 weeks ago. Based on the community reaction below, summarize the sentiment and flag what's driving it: [paste feedback, reviews, or forum threads]" },
    ],
    lastUpdated: "2026-04-24",
  },
  {
    key: "rapid-feedback-eagle",
    name: "Rapid Feedback Eagle",
    tagline: "by PMM",
    description: "Generates Rapid Feedback Reports and offers summarized Google Slides versions. Please review and confirm the information, as AI may produce incorrect or misleading results.",
    icon: <FileText className="w-4 h-4 text-white" />,
    color: "bg-sky-600",
    capabilities: ["Research reports", "Participant insights", "Slides summaries"],
    starters: [
      { label: "Generate a report", prompt: "Generate a Rapid Feedback Report from the files I've uploaded." },
      { label: "Grant file access", prompt: "You have permission to read and analyze the files I've shared. Please start by acknowledging which documents you can see." },
      { label: "Make a Slides summary", prompt: "Create a summarized Google Slides version of the Rapid Feedback Report — 6-8 slides, each with a clear headline finding and 3 supporting bullets." },
      { label: "Start a new study", prompt: "Clear all previous files and context. Start fresh for a new study." },
    ],
    lastUpdated: "2026-04-24",
  },
  {
    key: "amplitude-builder",
    name: "Amplitude Chart Builder",
    tagline: "by PMM",
    description: "Helps PMMs build Amplitude dashboards fast. Translates metrics, filters, and dimensions into exact build plans using eBay's Customer Journey Analytics data.",
    icon: <BarChart3 className="w-4 h-4 text-white" />,
    color: "bg-orange-500",
    capabilities: ["Chart design", "Event mapping", "Dashboard setup"],
    starters: [
      { label: "Get started with Amplitude", prompt: "I'm new to eBay's Amplitude setup. Where do I find self-paced training and what's the difference between metrics, filters, and group-by?" },
      { label: "Build a conversion funnel", prompt: "I want to build a funnel chart showing how buyers move from search → listing view → add to cart → purchase for the Fashion category." },
      { label: "Track a feature's adoption", prompt: "We just launched a new seller tool. I want to track: unique sellers who used it at least once, weekly active users, and D7/D30 retention. How do I build this in Amplitude?" },
      { label: "Segment by user type", prompt: "I want to compare GMV and listing creation between B2C and C2C sellers over the last 90 days. Walk me through the exact chart setup." },
    ],
    lastUpdated: "2026-04-24",
  },
  {
    key: "naming-brief-architect",
    name: "Naming Brief Architect",
    tagline: "by PMM",
    description: "Guides you through writing a complete, evaluation-ready naming brief. Asks the right questions about your product, audience, markets, and architecture — then produces a structured brief ready to submit to the naming pipeline.",
    icon: <BookOpen className="w-4 h-4 text-white" />,
    color: "bg-emerald-600",
    capabilities: ["Brief writing", "Evaluation prep", "Portfolio alignment"],
    starters: [
      { label: "Write a naming brief", prompt: "I need to write a naming brief for a new product. Let's get started." },
      { label: "Improve an existing brief", prompt: "I have a draft naming brief I'd like you to review and improve. Here it is: [paste brief]" },
      { label: "Brief for a new feature", prompt: "I need a naming brief for a new embedded feature within an existing eBay product. It's not standalone — help me think through whether it even needs a name." },
      { label: "Brief for a standalone app", prompt: "We're launching a new standalone seller tool with its own enrollment flow. Help me write the naming brief." },
    ],
    lastUpdated: "2026-04-24",
  },
  {
    key: "research-synthesizer",
    name: "Research Synthesizer",
    tagline: "by PMM",
    description: "Transforms raw qualitative research — transcripts, interview notes, survey data — into structured insight reports with key findings, themes, representative quotes, and decision-ready implications.",
    icon: <FlaskConical className="w-4 h-4 text-white" />,
    color: "bg-cyan-600",
    capabilities: ["Insight extraction", "Theme clustering", "Quote curation"],
    starters: [
      { label: "Synthesize interview notes", prompt: "I have notes from 8 seller interviews. I'll paste them below — synthesize into key themes, representative quotes, and implications for our product decision. [paste notes]" },
      { label: "Analyze survey results", prompt: "Here are the results from a 200-response seller survey. Extract the 5 most important findings and flag any surprises or tensions in the data: [paste results]" },
      { label: "Synthesize a Rapid Feedback study", prompt: "I ran a Rapid Feedback session last week. Here are my raw notes from 6 participants: [paste notes]. Produce a synthesis report with findings, themes, and open questions." },
      { label: "Compare two research rounds", prompt: "I have research from two separate rounds (pre and post a feature launch). Compare the findings and tell me what changed and what stayed the same." },
    ],
    lastUpdated: "2026-04-24",
  },
  {
    key: "launch-copywriter",
    name: "Launch Copywriter",
    tagline: "by PMM",
    description: "Writes eBay-brand-voice product and feature launch copy across every channel — email subject lines, feature announcements, social posts, seller communications, PR one-liners, and internal talking points.",
    icon: <Megaphone className="w-4 h-4 text-white" />,
    color: "bg-amber-500",
    capabilities: ["Multi-channel copy", "eBay brand voice", "Seller comms"],
    starters: [
      { label: "Write a seller announcement", prompt: "I need seller-facing copy for a new feature launch. The feature is [describe feature]. The main benefit for sellers is [main benefit]. I need: email subject line, short feature description (2 sentences), and a 300-word seller announcement." },
      { label: "Write a press one-liner", prompt: "Write a press release lead sentence for this eBay feature launch: [describe feature]. Make it newsworthy, not promotional." },
      { label: "Write LinkedIn + X posts", prompt: "Write a LinkedIn post (200 words) and an X/Twitter post (280 chars) announcing this eBay product update: [describe update]. Tone: professional but conversational." },
      { label: "Write internal talking points", prompt: "Create 5 internal talking points for our all-hands about this new capability: [describe capability]. Audience: eBay employees. Make them clear, honest, and direct." },
    ],
    lastUpdated: "2026-04-24",
  },
];

// ── Helpers ─────────────────────────────────────────────────────────────────
function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDuration(ms: number) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}
function formatUpdated(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── ExportBar helpers ────────────────────────────────────────────────────────

function mdToWordHtml(md: string): string {
  const processInline = (t: string) =>
    t
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>")
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  const lines = md.split("\n");
  const out: string[] = [];
  let inTable = false;
  let tableRowCount = 0;

  for (const raw of lines) {
    const line = raw;
    if (line.startsWith("# ")) { out.push(`<h1>${processInline(line.slice(2))}</h1>`); }
    else if (line.startsWith("## ")) { out.push(`<h2>${processInline(line.slice(3))}</h2>`); }
    else if (line.startsWith("### ")) { out.push(`<h3>${processInline(line.slice(4))}</h3>`); }
    else if (line.startsWith("---")) { out.push("<hr/>"); }
    else if (line.startsWith("> ")) { out.push(`<blockquote>${processInline(line.slice(2))}</blockquote>`); }
    else if (line.startsWith("- [ ] ")) { out.push(`<li>☐ ${processInline(line.slice(6))}</li>`); }
    else if (line.startsWith("   - ")) { out.push(`<li style="margin-left:20px">${processInline(line.slice(5))}</li>`); }
    else if (line.startsWith("- ")) { out.push(`<li>${processInline(line.slice(2))}</li>`); }
    else if (/^\d+\. /.test(line)) { out.push(`<li>${processInline(line.replace(/^\d+\. /, ""))}</li>`); }
    else if (line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) { /* separator row — skip */ }
      else if (!inTable) {
        inTable = true;
        tableRowCount = 0;
        out.push('<table border="1" style="border-collapse:collapse;width:100%;margin:12px 0">');
        out.push("<thead><tr>" + cells.map((c) => `<th style="padding:6px 10px;background:#f5f5f5;text-align:left">${processInline(c)}</th>`).join("") + "</tr></thead><tbody>");
        tableRowCount++;
      } else {
        out.push("<tr>" + cells.map((c) => `<td style="padding:6px 10px">${processInline(c)}</td>`).join("") + "</tr>");
        tableRowCount++;
      }
    } else {
      if (inTable) { out.push("</tbody></table>"); inTable = false; }
      if (line.trim()) { out.push(`<p>${processInline(line)}</p>`); }
      else { out.push("<br/>"); }
    }
  }
  if (inTable) out.push("</tbody></table>");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>body{font-family:Calibri,Arial,sans-serif;margin:1in;color:#1f2937}
h1{font-size:22pt;margin-bottom:4px}h2{font-size:14pt;border-bottom:1px solid #e5e7eb;padding-bottom:4px;margin-top:24px}
h3{font-size:12pt;color:#4b5563;margin-top:16px}p,li{font-size:11pt;line-height:1.6}
blockquote{border-left:3px solid #9ca3af;padding-left:12px;color:#6b7280;font-style:italic}
hr{border:none;border-top:1px solid #e5e7eb;margin:16px 0}
code{background:#f3f4f6;padding:1px 4px;border-radius:3px;font-family:Consolas,monospace;font-size:10pt}
</style></head><body>${out.join("\n")}</body></html>`;
}

// ── ExportBar ─────────────────────────────────────────────────────────────────

function ExportBar({ content, label = "Export", filename = "response" }: { content: string; label?: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const copyMd = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMd = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${filename}.md`; a.click();
    URL.revokeObjectURL(url);
  };

  const downloadWord = () => {
    const html = mdToWordHtml(content);
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${filename}.doc`; a.click();
    URL.revokeObjectURL(url);
  };

  const btnBase = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border";
  const btnStyle = `${btnBase} border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800`;

  return (
    <div className="flex flex-wrap items-center gap-2 px-5 py-3 border-t border-gray-100 bg-gray-50/60">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mr-1">{label}</span>
      <button type="button" onClick={copyMd} className={btnStyle}>
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <button type="button" onClick={downloadMd} className={btnStyle}>
        <Download className="w-3.5 h-3.5" />.md
      </button>
      <button type="button" onClick={downloadWord} className={btnStyle}>
        <FileText className="w-3.5 h-3.5" />Word
      </button>
    </div>
  );
}

// ── AssistantMessage ─────────────────────────────────────────────────────────
function AssistantMessage({
  msg,
  onStructuredSubmit,
}: {
  msg: Message;
  onStructuredSubmit?: (msgId: string, label: string, id: string, otherText?: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
        {/* Plain text / markdown portion */}
        {msg.content && (
          <div className="px-5 py-4 prose prose-sm prose-gray max-w-none
            prose-headings:font-semibold prose-headings:text-gray-900
            prose-h1:text-lg prose-h1:font-bold prose-h1:text-gray-900 prose-h1:mb-3
            prose-h2:text-sm prose-h2:font-semibold prose-h2:text-teal-700 prose-h2:uppercase prose-h2:tracking-wide prose-h2:mt-6 prose-h2:mb-2
            prose-h3:text-sm prose-h3:font-semibold prose-h3:text-gray-700 prose-h3:mt-4 prose-h3:mb-1.5
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-2
            prose-li:text-gray-700 prose-li:my-0.5
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
            prose-blockquote:border-l-teal-300 prose-blockquote:bg-teal-50/40 prose-blockquote:text-gray-600 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:py-0.5
            prose-hr:border-gray-100 prose-hr:my-4
            prose-table:text-sm prose-th:text-xs prose-th:font-semibold prose-th:text-gray-500 prose-th:bg-gray-50 prose-td:text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
          </div>
        )}

        {/* Structured interactive block */}
        {msg.structured && (
          <div className={msg.content ? "border-t border-gray-100 px-5 py-4" : "px-5 py-4"}>
            <StructuredResponseRenderer
              message={msg.structured}
              messageId={msg.id}
              onSubmit={(label, id, otherText) =>
                onStructuredSubmit?.(msg.id, label, id, otherText)
              }
              isSubmitted={msg.submittedResponse !== undefined}
              submittedLabel={msg.submittedResponse}
            />
          </div>
        )}

        {/* Export toolbar — shown on the guide output message */}
        {msg.exportable && msg.content && (
          <ExportBar content={msg.content} label={msg.exportLabel} filename={msg.exportFilename} />
        )}
      </div>
      <div className="flex items-center gap-3 px-1">
        <span className="text-[10px] text-gray-300">{formatTime(msg.timestamp)}</span>
        {msg.durationMs !== undefined && (
          <span className="flex items-center gap-1 text-[10px] text-gray-300">
            <Clock className="w-2.5 h-2.5" />{formatDuration(msg.durationMs)}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AssistantsPage() {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [messagesByKey, setMessagesByKey] = useState<Record<string, Message[]>>(
    Object.fromEntries(ASSISTANTS.map((a) => [a.key, []]))
  );
  const [streamingByKey, setStreamingByKey] = useState<Record<string, string>>(
    Object.fromEntries(ASSISTANTS.map((a) => [a.key, ""]))
  );
  const [attachmentsByKey, setAttachmentsByKey] = useState<Record<string, Array<{ name: string; text: string }>>>(
    Object.fromEntries(ASSISTANTS.map((a) => [a.key, []]))
  );
  const [uploadingByKey, setUploadingByKey] = useState<Record<string, boolean>>(
    Object.fromEntries(ASSISTANTS.map((a) => [a.key, false]))
  );
  const [selectedModel, setSelectedModel] = useState<string>(DEFAULT_MODEL);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [expandedStarters, setExpandedStarters] = useState(false);
  const [browseQuery, setBrowseQuery] = useState("");
  const [browseSort, setBrowseSort] = useState<"default" | "az" | "za">("default");
  const [savedConversations, setSavedConversations] = useState<StoredConversation[]>([]);
  const [conversationsOpen, setConversationsOpen] = useState(true);
  const sendQueue = useRef<Array<{ message: string }>>([]);
  const convIdsByKey = useRef<Record<string, string | null>>(
    Object.fromEntries(ASSISTANTS.map((a) => [a.key, null]))
  );
  // Tracks Dr. Moderator mock wizard state across steps.
  // Real API: remove this ref; step state lives in the LLM response payload.
  const drModStateRef = useRef<DrModState>({ ...INITIAL_DR_MOD_STATE });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeAssistant = activeKey ? (ASSISTANTS.find((a) => a.key === activeKey) ?? null) : null;
  const messages = activeKey ? (messagesByKey[activeKey] ?? []) : [];
  const streamingContent = activeKey ? (streamingByKey[activeKey] ?? "") : "";
  const attachments = activeKey ? (attachmentsByKey[activeKey] ?? []) : [];
  const isUploading = activeKey ? (uploadingByKey[activeKey] ?? false) : false;
  const isEmpty = messages.length === 0;
  const selectedModelLabel = MODELS.find((m) => m.id === selectedModel)?.label ?? "GPT-5.2";
  const totalTurns = messages.filter((m) => m.role === "user").length;
  const visibleStarters = activeAssistant
    ? (expandedStarters ? activeAssistant.starters : activeAssistant.starters.slice(0, 2))
    : [];

  useEffect(() => {
    fetch("/api/assistants")
      .then((r) => r.json())
      .then((d) => setConfigured(d.configured ?? false))
      .catch(() => setConfigured(false));
  }, []);

  // Load conversations: localStorage first (instant), then Redis (source of truth)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONVERSATIONS_KEY);
      if (raw) setSavedConversations(JSON.parse(raw) as StoredConversation[]);
    } catch {}
    fetch("/api/gpt-conversations")
      .then((r) => r.json())
      .then((data: { conversations?: StoredConversation[] }) => {
        if (Array.isArray(data.conversations) && data.conversations.length > 0) {
          setSavedConversations(data.conversations);
          // Update localStorage cache (capped at 50 for offline fallback)
          try {
            localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(data.conversations.slice(0, 50)));
          } catch {}
        }
      })
      .catch(() => {});
  }, []);

  // Auto-save whenever messages change and we have at least one assistant response
  useEffect(() => {
    const toSave: StoredConversation[] = [];
    Object.entries(messagesByKey).forEach(([key, msgs]) => {
      if (msgs.length === 0) return;
      if (!msgs.some((m) => m.role === "assistant")) return;
      const assistant = ASSISTANTS.find((a) => a.key === key);
      if (!assistant) return;
      if (!convIdsByKey.current[key]) convIdsByKey.current[key] = crypto.randomUUID();
      const convId = convIdsByKey.current[key]!;
      const firstUserMsg = msgs.find((m) => m.role === "user");
      const rawTitle = firstUserMsg?.displayText ?? firstUserMsg?.content ?? "Conversation";
      const title = rawTitle.length > 60 ? rawTitle.slice(0, 60) + "…" : rawTitle;
      toSave.push({
        id: convId,
        assistantKey: key,
        assistantName: assistant.name,
        title,
        messages: msgs.map((m) => ({
          id: m.id, role: m.role, content: m.content,
          timestamp: m.timestamp.toISOString(), durationMs: m.durationMs,
          files: m.files, displayText: m.displayText,
        })),
        createdAt: msgs[0].timestamp.toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });
    if (toSave.length === 0) return;

    setSavedConversations((prev) => {
      const convIds = new Set(toSave.map((c) => c.id));
      const filtered = prev.filter((c) => !convIds.has(c.id));
      const updated = [...toSave, ...filtered].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      // Offline cache — capped at 50
      try { localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(updated.slice(0, 50))); } catch {}
      return updated;
    });

    // Persist to Redis — no cap, fire-and-forget
    for (const conv of toSave) {
      fetch("/api/gpt-conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(conv),
      }).catch(() => {});
    }
  }, [messagesByKey]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, streamingContent]);

  useEffect(() => {
    if (!isLoading && sendQueue.current.length > 0) {
      const next = sendQueue.current.shift()!;
      void doSend(next.message);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const switchAssistant = (key: string) => {
    if (isLoading) return;
    // When switching away from an assistant, clear its in-memory chat so clicking back
    // always starts a fresh session. The auto-save useEffect already persisted messages
    // to Redis (it fires whenever messagesByKey changes and bails early for empty arrays,
    // so clearing here won't overwrite the saved conversation).
    if (activeKey && activeKey !== key && (messagesByKey[activeKey] ?? []).length > 0) {
      setMessagesByKey((prev) => ({ ...prev, [activeKey]: [] }));
      setStreamingByKey((prev) => ({ ...prev, [activeKey]: "" }));
      setAttachmentsByKey((prev) => ({ ...prev, [activeKey]: [] }));
      convIdsByKey.current[activeKey] = null;
      if (activeKey === "dr-moderator") drModStateRef.current = { ...INITIAL_DR_MOD_STATE };
    }
    setActiveKey(key);
    setInput("");
    setExpandedStarters(false);
    const preferred = ASSISTANTS.find((a) => a.key === key)?.preferredModel;
    if (preferred) setSelectedModel(preferred);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const loadConversation = (conv: StoredConversation) => {
    if (isLoading) return;
    const msgs: Message[] = conv.messages.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
    convIdsByKey.current[conv.assistantKey] = conv.id;
    setMessagesByKey((prev) => ({ ...prev, [conv.assistantKey]: msgs }));
    setActiveKey(conv.assistantKey);
    setInput("");
    setExpandedStarters(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const clearChat = () => {
    if (!activeKey || isLoading) return;
    convIdsByKey.current[activeKey] = null;
    setMessagesByKey((prev) => ({ ...prev, [activeKey]: [] }));
    setStreamingByKey((prev) => ({ ...prev, [activeKey]: "" }));
    setAttachmentsByKey((prev) => ({ ...prev, [activeKey]: [] }));
    if (activeKey === "dr-moderator") drModStateRef.current = { ...INITIAL_DR_MOD_STATE };
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeKey) return;
    e.target.value = "";
    const currentKey = activeKey;
    setUploadingByKey((prev) => ({ ...prev, [currentKey]: true }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Upload failed");
      }
      const { text } = (await res.json()) as { text: string };
      setAttachmentsByKey((prev) => ({
        ...prev,
        [currentKey]: [...(prev[currentKey] ?? []), { name: file.name, text }],
      }));
    } catch (err) {
      setMessagesByKey((prev) => ({
        ...prev,
        [currentKey]: [...(prev[currentKey] ?? []), {
          id: crypto.randomUUID(), role: "error",
          content: err instanceof Error ? `Upload failed: ${err.message}` : "File upload failed.",
          timestamp: new Date(),
        }],
      }));
    } finally {
      setUploadingByKey((prev) => ({ ...prev, [currentKey]: false }));
    }
  };

  const removeAttachment = (index: number) => {
    if (!activeKey) return;
    setAttachmentsByKey((prev) => ({
      ...prev,
      [activeKey]: (prev[activeKey] ?? []).filter((_, i) => i !== index),
    }));
  };

  // Handles submission of a structured inline response block.
  // Locks the block, adds a user bubble, and continues the conversation.
  const handleStructuredSubmit = (
    msgId: string,
    selectedLabel: string,
    selectedId: string,
    otherText?: string
  ) => {
    if (!activeKey || isLoading) return;
    const currentKey = activeKey;
    const displayLabel = otherText?.trim() || selectedLabel;

    // Store the user's response in Dr. Moderator state for the current step.
    // Real API: remove this block — the LLM tracks its own step state.
    if (currentKey === "dr-moderator") {
      const s = drModStateRef.current;
      switch (s.currentStep) {
        case "1":
          // Store the key ("other", "ux_feedback", etc.) not the custom description text
          drModStateRef.current = { ...s, interviewType: selectedId };
          break;
        case "1_1":
          drModStateRef.current = { ...s, showMockups: selectedId === "yes" };
          break;
        case "1_2":
          drModStateRef.current = { ...s, mockupPercent: otherText?.trim() || selectedId };
          break;
        case "2":
          // otherText carries the full untruncated text from FreeTextPrompt
          drModStateRef.current = { ...s, businessDecision: otherText?.trim() || selectedLabel };
          break;
        case "3":
          drModStateRef.current = { ...s, hypotheses: otherText?.trim() || selectedLabel };
          break;
        case "4":
          drModStateRef.current = { ...s, duration: selectedId };
          break;
        case "5":
          drModStateRef.current = { ...s, tone: selectedId };
          break;
        case "6":
          drModStateRef.current = { ...s, subjects: selectedId };
          break;
        case "7":
          drModStateRef.current = { ...s, sellerType: otherText?.trim() || selectedId };
          break;
        case "8":
          drModStateRef.current = { ...s, userType: otherText?.trim() || selectedId };
          break;
        case "9":
          drModStateRef.current = { ...s, documentation: otherText?.trim() || selectedLabel };
          break;
      }
    }

    // Lock the structured block
    setMessagesByKey((prev) => ({
      ...prev,
      [currentKey]: (prev[currentKey] ?? []).map((m) =>
        m.id === msgId ? { ...m, submittedResponse: displayLabel } : m
      ),
    }));

    // Add user bubble representing the selection
    setMessagesByKey((prev) => ({
      ...prev,
      [currentKey]: [
        ...(prev[currentKey] ?? []),
        { id: crypto.randomUUID(), role: "user", content: displayLabel, timestamp: new Date() },
      ],
    }));

    if (isLoading) {
      sendQueue.current.push({ message: displayLabel });
      return;
    }
    void doSend(displayLabel);
  };

  const doSend = async (message: string) => {
    if (!activeKey) return;
    setIsLoading(true);
    const start = Date.now();
    const currentKey = activeKey;

    // ── Dr. Moderator mock interception ────────────────────────────────────────
    // Real API: remove this block and let the request fall through to the Chomsky call below.
    // The real LLM response JSON should include a `structured` field that maps to StructuredMessage.
    if (currentKey === "dr-moderator") {
      const result = getDrModeratorMockResponse(message, drModStateRef.current);
      if (result) {
        const prevStep = drModStateRef.current.currentStep;
        drModStateRef.current = result.nextState;
        // Simulate thinking delay
        await new Promise((r) => setTimeout(r, 1100));
        setMessagesByKey((prev) => ({
          ...prev,
          [currentKey]: [
            ...(prev[currentKey] ?? []),
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: result.response.content,
              structured: result.response.structured,
              timestamp: new Date(),
              durationMs: 1100,
              exportable: prevStep === "9",
              exportLabel: prevStep === "9" ? "Export guide" : undefined,
              exportFilename: prevStep === "9" ? "moderator-guide" : undefined,
            },
          ],
        }));
        setIsLoading(false);
        setTimeout(() => inputRef.current?.focus(), 50);
        return;
      }
    }
    // ── End Dr. Moderator mock ─────────────────────────────────────────────────

    // Build history — React batching means the latest user message may not be in state yet,
    // so we ensure the current message is always the last item.
    const baseHistory = (messagesByKey[currentKey] ?? [])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const history =
      baseHistory.length > 0 && baseHistory[baseHistory.length - 1].role === "user"
        ? baseHistory
        : [...baseHistory, { role: "user" as const, content: message }];

    let accumulated = "";

    try {
      const res = await fetch("/api/assistants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantKey: currentKey, messages: history, model: selectedModel }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      outer: while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break outer;
          try {
            const parsed = JSON.parse(data) as { text?: string; error?: string };
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              accumulated += parsed.text;
              setStreamingByKey((prev) => ({ ...prev, [currentKey]: accumulated }));
            }
          } catch (e) {
            if (e instanceof Error && !e.message.includes("JSON")) throw e;
          }
        }
      }

      reader.releaseLock();

      const durationMs = Date.now() - start;
      // Non-Dr-Mod assistants: mark substantive responses exportable
      const exportable = currentKey !== "dr-moderator" && accumulated.length > 200;
      setMessagesByKey((prev) => ({
        ...prev,
        [currentKey]: [...(prev[currentKey] ?? []), {
          id: crypto.randomUUID(), role: "assistant", content: accumulated,
          timestamp: new Date(), durationMs, exportable,
        }],
      }));
    } catch (error) {
      setMessagesByKey((prev) => ({
        ...prev,
        [currentKey]: [...(prev[currentKey] ?? []), {
          id: crypto.randomUUID(), role: "error",
          content: error instanceof Error ? error.message : "Something went wrong. Please try again.",
          timestamp: new Date(),
        }],
      }));
    } finally {
      setStreamingByKey((prev) => ({ ...prev, [currentKey]: "" }));
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const send = (message: string) => {
    if (!activeKey) return;
    const q = message.trim();
    const currentAttachments = attachmentsByKey[activeKey] ?? [];
    if (!q && currentAttachments.length === 0) return;

    // Build full content for the LLM (attachment text prepended to typed message)
    const apiParts: string[] = [];
    if (currentAttachments.length > 0) {
      apiParts.push(
        currentAttachments
          .map((a) => `[Attached file: ${a.name}]\n${a.text}`)
          .join("\n\n---\n\n")
      );
    }
    if (q) apiParts.push(q);
    const apiContent = apiParts.join("\n\n");

    setAttachmentsByKey((prev) => ({ ...prev, [activeKey]: [] }));
    setMessagesByKey((prev) => ({
      ...prev,
      [activeKey]: [...(prev[activeKey] ?? []), {
        id: crypto.randomUUID(),
        role: "user",
        content: apiContent,
        timestamp: new Date(),
        files: currentAttachments.length > 0 ? currentAttachments.map((a) => a.name) : undefined,
        displayText: q || undefined,
      }],
    }));
    setInput("");

    if (isLoading) {
      sendQueue.current.push({ message: apiContent });
      return;
    }
    void doSend(apiContent);
  };

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  return (
    <div className="h-screen bg-[#f4f4f4] flex overflow-hidden">
      <Sidebar />

      {/* ── Compact assistant selector panel ── */}
      <div className="w-52 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        {/* Header — click to browse all */}
        <button
          type="button"
          onClick={() => { if (!isLoading) { setActiveKey(null); setInput(""); setExpandedStarters(false); } }}
          className={`px-4 pt-4 pb-3 border-b border-gray-100 flex items-center gap-1.5 w-full text-left transition-colors ${
            activeKey === null ? "bg-violet-50 hover:bg-violet-50" : "hover:bg-gray-50"
          }`}
        >
          <Zap className={`w-3 h-3 flex-shrink-0 ${activeKey === null ? "text-violet-500" : "text-gray-400"}`} />
          <span className={`text-[10px] font-semibold uppercase tracking-widest ${activeKey === null ? "text-violet-600" : "text-gray-400"}`}>
            GPT Assistants
          </span>
        </button>

        {/* Compact assistant list */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
          {ASSISTANTS.map((a) => {
            const isActive = a.key === activeKey;
            const turns = (messagesByKey[a.key] ?? []).filter((m) => m.role === "user").length;
            return (
              <button
                key={a.key}
                onClick={() => switchAssistant(a.key)}
                disabled={isLoading}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all text-left ${
                  isActive
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50 disabled:opacity-40"
                }`}
              >
                <div className={`w-6 h-6 rounded-md ${isActive ? "bg-violet-500" : a.color} flex items-center justify-center flex-shrink-0`}>
                  {a.icon}
                </div>
                <span className={`text-xs font-medium truncate flex-1 ${isActive ? "text-white" : "text-gray-700"}`}>
                  {a.name}
                </span>
                {turns > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 leading-none ${
                    isActive ? "bg-violet-500 text-violet-100" : "bg-gray-100 text-gray-400"
                  }`}>
                    {turns}t
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* My Conversations */}
        <div className="border-t border-gray-100 flex-shrink-0">
          <button
            type="button"
            onClick={() => setConversationsOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">My Conversations</span>
            {conversationsOpen
              ? <ChevronDown className="w-3 h-3 text-gray-300 flex-shrink-0" />
              : <ChevronRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
            }
          </button>
          {conversationsOpen && (
            <div className="overflow-y-auto max-h-52 px-2 pb-2">
              {savedConversations.length === 0 ? (
                <p className="text-[10px] text-gray-300 px-2 py-1">No conversations yet</p>
              ) : (
                <div className="space-y-0.5">
                  {savedConversations.map((conv) => {
                    const assistant = ASSISTANTS.find((a) => a.key === conv.assistantKey);
                    const isCurrentConv = activeKey === conv.assistantKey && convIdsByKey.current[conv.assistantKey] === conv.id;
                    return (
                      <button
                        key={conv.id}
                        type="button"
                        onClick={() => loadConversation(conv)}
                        disabled={isLoading}
                        className={`w-full text-left px-2 py-1.5 rounded-lg transition-all flex items-center gap-2 disabled:opacity-40 ${
                          isCurrentConv ? "bg-violet-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md ${assistant?.color ?? "bg-gray-400"} flex items-center justify-center flex-shrink-0`}>
                          <div className="scale-75">{assistant?.icon}</div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`truncate text-[11px] font-medium leading-tight ${isCurrentConv ? "text-violet-700" : "text-gray-700"}`}>
                            {conv.title}
                          </p>
                          <p className="text-[10px] text-gray-400 leading-tight">{assistant?.name}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Status footer */}
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Chomsky</span>
            {configured === null ? (
              <span className="text-[10px] text-gray-300">checking…</span>
            ) : configured ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Live
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-red-500">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />Offline
              </span>
            )}
          </div>
          {activeAssistant && totalTurns > 0 && (
            <p className="text-[10px] text-gray-300 mt-1 truncate">
              {totalTurns} turn{totalTurns !== 1 ? "s" : ""} · {activeAssistant.name}
            </p>
          )}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeKey === null ? (
          /* ── Browse / home view ── */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
              <div className="flex items-center gap-2 mb-0.5">
                <Zap className="w-4 h-4 text-violet-500" />
                <h1 className="text-base font-semibold text-gray-900">PMM GPT Assistants</h1>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium ml-1">
                  {ASSISTANTS.length} tools
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-3">Your custom AI toolkit — built for PMM, powered by Chomsky</p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search by name, description, or capability…"
                    value={browseQuery}
                    onChange={(e) => setBrowseQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-violet-300 bg-gray-50 placeholder-gray-400 focus:bg-white transition-colors"
                  />
                </div>
                <div className="relative">
                  <select
                    value={browseSort}
                    onChange={(e) => setBrowseSort(e.target.value as "default" | "az" | "za")}
                    className="text-xs text-gray-600 border border-gray-200 rounded-lg pl-3 pr-7 py-2 bg-white focus:outline-none focus:border-violet-300 appearance-none cursor-pointer h-full"
                  >
                    <option value="default">Default order</option>
                    <option value="az">Name: A → Z</option>
                    <option value="za">Name: Z → A</option>
                  </select>
                  <ChevronRight className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              {(() => {
                let filtered = ASSISTANTS.filter((a) => {
                  if (!browseQuery.trim()) return true;
                  const q = browseQuery.toLowerCase();
                  return (
                    a.name.toLowerCase().includes(q) ||
                    a.description.toLowerCase().includes(q) ||
                    a.capabilities.some((c) => c.toLowerCase().includes(q))
                  );
                });
                if (browseSort === "az") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
                if (browseSort === "za") filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));

                if (filtered.length === 0) {
                  return (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <Search className="w-8 h-8 text-gray-200 mb-3" />
                      <p className="text-sm text-gray-400">
                        No assistants match <strong className="text-gray-600">&ldquo;{browseQuery}&rdquo;</strong>
                      </p>
                      <button
                        type="button"
                        onClick={() => setBrowseQuery("")}
                        className="mt-2 text-xs text-violet-600 hover:underline"
                      >
                        Clear search
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((a) => {
                      const turns = (messagesByKey[a.key] ?? []).filter((m) => m.role === "user").length;
                      return (
                        <button
                          key={a.key}
                          type="button"
                          onClick={() => switchAssistant(a.key)}
                          className="text-left bg-white border border-gray-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-md transition-all group flex flex-col"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-11 h-11 rounded-xl ${a.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                              <div className="scale-[1.5]">{a.icon}</div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                              <p className="text-[11px] text-gray-400">{a.tagline}</p>
                            </div>
                            {turns > 0 && (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 bg-violet-50 text-violet-600 rounded-full flex-shrink-0">
                                {turns}t
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1 line-clamp-3">{a.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {a.capabilities.map((c) => (
                              <span key={c} className="text-[10px] text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full">
                                {c}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                            <span className="text-[10px] text-gray-300">Updated {formatUpdated(a.lastUpdated)}</span>
                            <span className="text-xs text-violet-600 font-medium group-hover:text-violet-700 flex items-center gap-0.5">
                              Open <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        ) : activeAssistant ? (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-9 h-9 rounded-xl ${activeAssistant.color} flex items-center justify-center shadow-sm`}>
                    {activeAssistant.icon}
                  </div>
                  {configured && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{activeAssistant.name}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">
                      {activeAssistant.tagline}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-tight mt-0.5 max-w-md line-clamp-1">
                    {activeAssistant.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-gray-400 hidden sm:block">Model</span>
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={isLoading}
                      className="text-xs text-gray-600 border border-gray-200 rounded-lg pl-2.5 pr-6 py-1.5 bg-white hover:border-gray-300 focus:outline-none focus:border-violet-300 appearance-none cursor-pointer disabled:opacity-40"
                    >
                      {MODELS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.label}{m.badge ? ` · ${m.badge}` : ""}
                        </option>
                      ))}
                    </select>
                    <ChevronRight className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                  </div>
                </div>

                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40"
                  >
                    <RotateCcw className="w-3 h-3" />New chat
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto">
              {isEmpty && !isLoading ? (
                <div className="flex flex-col items-center justify-center h-full px-6 pb-24">
                  <div className="text-center mb-10">
                    <div className={`w-16 h-16 rounded-2xl ${activeAssistant.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                      <div className="scale-[2]">{activeAssistant.icon}</div>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{activeAssistant.name}</h2>
                    <p className="text-sm text-gray-400 mb-1 font-medium">{activeAssistant.tagline}</p>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed mb-2">
                      {activeAssistant.description}
                    </p>
                    <p className="text-[11px] text-gray-300">Updated {formatUpdated(activeAssistant.lastUpdated)}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {activeAssistant.capabilities.map((c) => (
                      <span key={c} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                        <Zap className="w-3 h-3 text-violet-400" />{c}
                      </span>
                    ))}
                  </div>

                  <div className="w-full max-w-lg space-y-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">
                      Try asking
                    </p>
                    {visibleStarters.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => send(s.prompt)}
                        disabled={configured === false}
                        className="w-full flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-violet-300 hover:shadow-sm text-left transition-all group disabled:opacity-40"
                      >
                        <div className={`w-7 h-7 rounded-lg ${activeAssistant.color} flex items-center justify-center flex-shrink-0`}>
                          {activeAssistant.icon}
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{s.label}</span>
                        <span className="ml-auto text-gray-300 group-hover:text-gray-400">→</span>
                      </button>
                    ))}
                    {activeAssistant.starters.length > 2 && (
                      <button
                        onClick={() => setExpandedStarters((v) => !v)}
                        className="w-full flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 py-2 transition-colors"
                      >
                        {expandedStarters
                          ? <><ChevronUp className="w-3 h-3" /> Show fewer</>
                          : <><ChevronDown className="w-3 h-3" /> Show {activeAssistant.starters.length - 2} more</>
                        }
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {msg.role === "user" ? (
                        <div className="flex justify-end gap-3">
                          <div className="max-w-[75%]">
                            <div className="bg-violet-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm leading-relaxed shadow-sm shadow-violet-100">
                              {msg.files && msg.files.length > 0 ? (
                                <>
                                  <div className="flex flex-wrap gap-1.5 mb-2">
                                    {msg.files.map((f) => (
                                      <span key={f} className="flex items-center gap-1 bg-violet-500/60 px-2 py-0.5 rounded-full text-[11px]">
                                        <Paperclip className="w-2.5 h-2.5 flex-shrink-0" />
                                        <span className="max-w-[180px] truncate">{f}</span>
                                      </span>
                                    ))}
                                  </div>
                                  {msg.displayText && <p className="whitespace-pre-wrap">{msg.displayText}</p>}
                                </>
                              ) : (
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              )}
                            </div>
                            <p className="text-[10px] text-gray-300 mt-1.5 text-right">{formatTime(msg.timestamp)}</p>
                          </div>
                        </div>
                      ) : msg.role === "error" ? (
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Bot className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="max-w-[80%] bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-tl-sm px-5 py-3 text-sm leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <div className={`w-8 h-8 rounded-xl ${activeAssistant.color} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm`}>
                            {activeAssistant.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <AssistantMessage
                              msg={msg}
                              onStructuredSubmit={handleStructuredSubmit}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3">
                      <div className={`w-8 h-8 rounded-xl ${activeAssistant.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        {activeAssistant.icon}
                      </div>
                      {streamingContent === "" ? (
                        <ThinkingIndicator />
                      ) : (
                        <StreamingBubble content={streamingContent} />
                      )}
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="bg-white border-t border-gray-200 px-6 py-4 flex-shrink-0">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                className="hidden"
                onChange={handleFileSelect}
              />
              <form onSubmit={handleSubmit}>
                <div className="max-w-3xl mx-auto">
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {attachments.map((a, i) => (
                        <span key={i} className="flex items-center gap-1 bg-violet-50 border border-violet-200 text-violet-700 px-2.5 py-1 rounded-full text-xs font-medium">
                          <Paperclip className="w-3 h-3 flex-shrink-0" />
                          <span className="max-w-[200px] truncate">{a.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(i)}
                            className="ml-0.5 hover:text-violet-900 flex-shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 items-end bg-gray-50 border border-gray-200 rounded-2xl px-3 py-3 focus-within:border-violet-300 focus-within:bg-white focus-within:shadow-sm transition-all">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading || configured === false}
                      title="Attach a file (PDF, DOCX, TXT)"
                      className="shrink-0 w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-30 mb-0.5"
                    >
                      {isUploading ? (
                        <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-violet-500 rounded-full animate-spin" />
                      ) : (
                        <Paperclip className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Ask ${activeAssistant.name} anything…`}
                      rows={1}
                      className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none outline-none py-0.5 max-h-36"
                      style={{ fieldSizing: "content" } as React.CSSProperties}
                      disabled={configured === false}
                    />
                    <button
                      type="submit"
                      disabled={(!input.trim() && attachments.length === 0) || configured === false}
                      className="shrink-0 w-8 h-8 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm shadow-violet-100"
                    >
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                  {configured === false && (
                    <p className="text-xs text-red-500 mt-2 text-center">Chomsky not reachable — check your VPN connection</p>
                  )}
                  <div className="flex items-center justify-between mt-2 px-1">
                    <p className="text-[10px] text-gray-300">Shift+Enter for new line · Attach PDF, DOCX, or TXT</p>
                    <p className="text-[10px] text-gray-300">{selectedModelLabel} · Chomsky</p>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
