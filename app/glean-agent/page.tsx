"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Sidebar from "@/components/Sidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send, Loader2, Bot, RotateCcw, Paperclip, X,
  FileText, ExternalLink, Clock, ChevronDown, ChevronUp,
  Zap, Search, BookOpen,
} from "lucide-react";

// Timed thinking steps — each fires after `after` seconds
const THINKING_STEPS = [
  { after: 0,  icon: "🔍", text: "Searching eBay's naming knowledge base…" },
  { after: 4,  icon: "📂", text: "Retrieving naming governance guidelines…" },
  { after: 9,  icon: "🗂️", text: "Checking portfolio for name conflicts…" },
  { after: 15, icon: "⚖️", text: "Cross-referencing legal & trademark records…" },
  { after: 22, icon: "🔗", text: "Analyzing historical naming decisions…" },
  { after: 30, icon: "🧠", text: "Synthesizing findings…" },
  { after: 40, icon: "✍️", text: "Drafting response…" },
  { after: 55, icon: "⏳", text: "Still working — this one is complex…" },
  { after: 75, icon: "🔄", text: "Almost there…" },
];

function ThinkingIndicator() {
  const [elapsed, setElapsed] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const ticker = setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
    return () => clearInterval(ticker);
  }, []);

  // Advance step when elapsed passes the next threshold
  useEffect(() => {
    const nextStep = stepIndex + 1;
    if (nextStep < THINKING_STEPS.length && elapsed >= THINKING_STEPS[nextStep].after) {
      setVisible(false);
      setTimeout(() => {
        setStepIndex(nextStep);
        setVisible(true);
      }, 200);
    }
  }, [elapsed, stepIndex]);

  const step = THINKING_STEPS[stepIndex];
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const elapsedStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm px-5 py-4 min-w-[280px]">
      {/* Step text with fade transition */}
      <div
        className="flex items-center gap-2.5 mb-3 transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="text-base leading-none">{step.icon}</span>
        <span className="text-sm text-gray-700 font-medium">{step.text}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden mb-2">
        <div
          className="h-full bg-blue-400 rounded-full transition-all duration-1000 ease-linear"
          style={{
            width: `${Math.min(95, (stepIndex / (THINKING_STEPS.length - 1)) * 100)}%`,
          }}
        />
      </div>

      {/* Steps done so far + elapsed */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {THINKING_STEPS.slice(0, stepIndex + 1).map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${
                i === stepIndex ? "bg-blue-400 animate-pulse" : "bg-gray-300"
              }`}
            />
          ))}
          {THINKING_STEPS.slice(stepIndex + 1).map((_, i) => (
            <span key={`pending-${i}`} className="w-1.5 h-1.5 rounded-full bg-gray-100" />
          ))}
        </div>
        <span className="text-[10px] text-gray-400 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {elapsedStr}
        </span>
      </div>
    </div>
  );
}

interface GleanSource {
  title: string;
  url?: string;
  snippet?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  sources?: GleanSource[];
  timestamp: Date;
  durationMs?: number;
}

interface Agent {
  id: string;
  label: string;
  name: string;
  version: string;
  description: string;
  capabilities: string[];
  starters: { label: string; prompt: string }[];
}

const AGENTS: Agent[] = [
  {
    id: "505452912b5a490f9f8477d7f0033745",
    label: "v1",
    name: "Naming Agent",
    version: "1.0",
    description: "Evaluates naming briefs and guides you through eBay's naming governance process.",
    capabilities: ["Brief evaluation", "Gate analysis", "Portfolio check"],
    starters: [
      { label: "Evaluator — Do I need a name?", prompt: "You are Step 1: Do I need a name?" },
    ],
  },
  {
    id: "bb15d89f76a948fd9ecddc96d35b816c",
    label: "v2",
    name: "Naming Agent",
    version: "2.0",
    description: "Updated version with improved evaluation logic and broader naming knowledge.",
    capabilities: ["Brief evaluation", "Gate analysis", "Portfolio check"],
    starters: [
      { label: "Evaluator — Do I need a name?", prompt: "You are Step 1: Do I need a name?" },
    ],
  },
];

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDuration(ms: number) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`;
}

function SourceCard({ src, index }: { src: GleanSource; index: number }) {
  const domain = src.url ? (() => { try { return new URL(src.url!).hostname.replace("www.", ""); } catch { return null; } })() : null;
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="text-[10px] font-bold text-gray-300 mt-0.5 w-4 flex-shrink-0">{index + 1}</span>
        <div className="flex-1 min-w-0">
          {src.url ? (
            <a href={src.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-blue-600 group-hover:text-blue-600 transition-colors">
              <span className="truncate">{src.title}</span>
              <ExternalLink className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            <p className="text-sm font-medium text-gray-800 truncate">{src.title}</p>
          )}
          {domain && <p className="text-[11px] text-gray-400 mt-0.5">{domain}</p>}
          {src.snippet && <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">{src.snippet}</p>}
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ msg }: { msg: Message }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const hasSources = msg.sources && msg.sources.length > 0;

  return (
    <div className="space-y-2">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm shadow-sm overflow-hidden">
        <div className="px-5 py-4 prose prose-sm prose-gray max-w-none
          prose-headings:font-semibold prose-headings:text-gray-900
          prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-2
          prose-li:text-gray-700 prose-li:my-0.5
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
          prose-blockquote:border-l-blue-200 prose-blockquote:text-gray-500
          prose-hr:border-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
        </div>

        {hasSources && (
          <div className="border-t border-gray-100">
            <button
              onClick={() => setSourcesOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-2.5 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {msg.sources!.length} source{msg.sources!.length !== 1 ? "s" : ""}
              </span>
              {sourcesOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {sourcesOpen && (
              <div className="px-4 pb-4 space-y-2">
                {msg.sources!.map((src, i) => <SourceCard key={i} src={src} index={i} />)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 px-1">
        <span className="text-[10px] text-gray-300">{formatTime(msg.timestamp)}</span>
        {msg.durationMs !== undefined && (
          <span className="flex items-center gap-1 text-[10px] text-gray-300">
            <Clock className="w-2.5 h-2.5" />
            {formatDuration(msg.durationMs)}
          </span>
        )}
        {hasSources && !sourcesOpen && (
          <button onClick={() => setSourcesOpen(true)} className="text-[10px] text-blue-400 hover:text-blue-600">
            View {msg.sources!.length} source{msg.sources!.length !== 1 ? "s" : ""}
          </button>
        )}
      </div>
    </div>
  );
}

export default function GleanAgentPage() {
  const [activeAgentId, setActiveAgentId] = useState(AGENTS[0].id);
  const [messagesByAgent, setMessagesByAgent] = useState<Record<string, Message[]>>(
    Object.fromEntries(AGENTS.map((a) => [a.id, []]))
  );
  const [chatIdByAgent, setChatIdByAgent] = useState<Record<string, string | undefined>>(
    Object.fromEntries(AGENTS.map((a) => [a.id, undefined]))
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [attachment, setAttachment] = useState<{ name: string; text: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Queue for messages sent while a response is in-flight
  const sendQueue = useRef<Array<{ question: string; att: { name: string; text: string } | null }>>([]);

  const activeAgent = AGENTS.find((a) => a.id === activeAgentId)!;
  const messages = messagesByAgent[activeAgentId];
  const isEmpty = messages.length === 0;

  useEffect(() => {
    fetch("/api/glean")
      .then((r) => r.json())
      .then((d) => setConfigured(d.configured ?? false))
      .catch(() => setConfigured(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const switchAgent = (id: string) => {
    if (isLoading) return;
    setActiveAgentId(id);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const clearChat = () => {
    if (isLoading) return;
    setMessagesByAgent((prev) => ({ ...prev, [activeAgentId]: [] }));
    setChatIdByAgent((prev) => ({ ...prev, [activeAgentId]: undefined }));
    setAttachment(null);
    setUploadError(null);
  };

  // Drain queue when current response finishes
  useEffect(() => {
    if (!isLoading && sendQueue.current.length > 0) {
      const next = sendQueue.current.shift()!;
      void doSend(next.question, next.att);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setUploadError(null);
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok || data.error) {
        setUploadError(data.error ?? "Failed to read file.");
      } else {
        setAttachment({ name: file.name, text: data.text });
      }
    } catch {
      setUploadError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Core API call — always executes, never queues
  const doSend = async (question: string, att: { name: string; text: string } | null) => {
    setIsLoading(true);
    setUploadError(null);

    const start = Date.now();
    const currentChatId = chatIdByAgent[activeAgentId];
    const turnNumber = messagesByAgent[activeAgentId].filter((m) => m.role === "user").length;

    try {
      const res = await fetch("/api/glean", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          agentId: activeAgentId,
          agentVersion: activeAgent.version,
          turnNumber,
          hasAttachment: !!att,
          ...(att ? { fileName: att.name, fileText: att.text } : {}),
          ...(currentChatId ? { chatId: currentChatId } : {}),
        }),
      });

      const data = await res.json();
      const durationMs = Date.now() - start;

      if (res.ok && !data.error) {
        if (data.chatId) {
          setChatIdByAgent((prev) => ({ ...prev, [activeAgentId]: data.chatId }));
        }
        setMessagesByAgent((prev) => ({
          ...prev,
          [activeAgentId]: [...prev[activeAgentId], {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.answer,
            sources: data.sources?.length ? data.sources : undefined,
            timestamp: new Date(),
            durationMs,
          }],
        }));
      } else {
        setMessagesByAgent((prev) => ({
          ...prev,
          [activeAgentId]: [...prev[activeAgentId], {
            id: crypto.randomUUID(),
            role: "error",
            content: data.error ?? "Something went wrong. Please try again.",
            timestamp: new Date(),
          }],
        }));
      }
    } catch {
      setMessagesByAgent((prev) => ({
        ...prev,
        [activeAgentId]: [...prev[activeAgentId], {
          id: crypto.randomUUID(),
          role: "error",
          content: "Network error — check your connection and try again.",
          timestamp: new Date(),
        }],
      }));
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // Public send — shows user message immediately, queues API call if already loading
  const send = (question: string) => {
    const q = question.trim();
    const att = attachment;
    if (!q && !att) return;

    // Show the user's message immediately regardless of loading state
    const displayContent = q || `📎 ${att?.name}`;
    setMessagesByAgent((prev) => ({
      ...prev,
      [activeAgentId]: [...prev[activeAgentId], {
        id: crypto.randomUUID(),
        role: "user",
        content: displayContent,
        timestamp: new Date(),
      }],
    }));
    setInput("");
    setAttachment(null);
    setUploadError(null);

    if (isLoading) {
      // Queue the API call — doSend will fire when current response finishes
      sendQueue.current.push({ question: q, att });
      return;
    }

    void doSend(q, att);
  };

  const handleSubmit = (e: FormEvent) => { e.preventDefault(); send(input); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  // Queue length for optional UI feedback
  const queueLength = sendQueue.current.length;

  const totalTurns = Math.floor(messages.filter((m) => m.role === "user").length);

  return (
    <div className="h-screen bg-[#f4f4f4] flex overflow-hidden">
      <Sidebar />

      {/* Agent selector panel */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
        {/* Panel header */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Glean Agents</h2>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Connected to eBay's internal naming knowledge base
          </p>
        </div>

        {/* Agent cards */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {AGENTS.map((agent) => {
            const isActive = agent.id === activeAgentId;
            const turns = Math.floor(messagesByAgent[agent.id].filter((m) => m.role === "user").length);
            return (
              <button
                key={agent.id}
                onClick={() => switchAgent(agent.id)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-4 rounded-xl transition-all border ${
                  isActive
                    ? "bg-blue-600 border-blue-600 shadow-md shadow-blue-100"
                    : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-800"}`}>
                      {agent.name}
                    </p>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-blue-500 text-blue-100" : "bg-gray-100 text-gray-400"
                    }`}>
                      v{agent.version}
                    </span>
                  </div>
                  {turns > 0 && (
                    <span className={`text-[10px] font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                      isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"
                    }`}>
                      {turns} {turns === 1 ? "turn" : "turns"}
                    </span>
                  )}
                </div>
                <p className={`text-xs leading-relaxed ${isActive ? "text-blue-100" : "text-gray-400"}`}>
                  {agent.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {agent.capabilities.map((c) => (
                    <span key={c} className={`text-[10px] px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "border-blue-400/50 text-blue-100"
                        : "border-gray-200 text-gray-400"
                    }`}>
                      {c}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Session status */}
        <div className="border-t border-gray-100 px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Session</span>
            {configured === null ? (
              <span className="text-[10px] text-gray-300">checking…</span>
            ) : configured ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Offline
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-gray-400 mb-0.5">Active agent</p>
              <p className="text-xs font-semibold text-gray-700">v{activeAgent.version}</p>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-gray-400 mb-0.5">Turns</p>
              <p className="text-xs font-semibold text-gray-700">{totalTurns}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-200">
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              {configured && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">{activeAgent.name}</p>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">
                  v{activeAgent.version}
                </span>
              </div>
              <p className="text-xs text-gray-400">eBay Naming Studio · Glean</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-40"
              >
                <RotateCcw className="w-3 h-3" />
                New chat
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full px-6 pb-24">
              {/* Empty state */}
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-200">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">{activeAgent.name} <span className="text-gray-400 font-normal text-base">v{activeAgent.version}</span></h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                  {activeAgent.description}
                </p>
              </div>

              {/* Capability pills */}
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                {activeAgent.capabilities.map((c) => (
                  <span key={c} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full shadow-sm">
                    <Zap className="w-3 h-3 text-blue-400" />
                    {c}
                  </span>
                ))}
              </div>

              {/* Conversation starters */}
              <div className="w-full max-w-lg space-y-2">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-center mb-3">
                  Conversation starters
                </p>
                {activeAgent.starters.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => send(s.prompt)}
                    disabled={isLoading}
                    className="w-full flex items-center gap-3 px-5 py-3.5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm text-left transition-all group disabled:opacity-40"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                      <Zap className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">{s.label}</span>
                    <span className="ml-auto text-gray-300 group-hover:text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
              {messages.map((msg) => (
                <div key={msg.id}>
                  {msg.role === "user" ? (
                    <div className="flex justify-end gap-3">
                      <div className="max-w-[75%]">
                        <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm leading-relaxed shadow-sm shadow-blue-100">
                          {msg.content}
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
                      <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-blue-100">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <AssistantMessage msg={msg} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <ThinkingIndicator />
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <form onSubmit={handleSubmit}>
            <div className="max-w-3xl mx-auto">
              {/* Attachment chip */}
              {attachment && (
                <div className="mb-2">
                  <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg px-3 py-1.5 text-xs max-w-xs">
                    <FileText className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate font-medium">{attachment.name}</span>
                    <button type="button" onClick={() => { setAttachment(null); setUploadError(null); }}
                      className="ml-1 hover:text-blue-900 flex-shrink-0">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 items-end bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-sm transition-all">
                {/* Attach */}
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isUploading || configured === false}
                  title="Attach file (PDF, DOCX, TXT)"
                  className="shrink-0 w-7 h-7 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors">
                  {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
                </button>

                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe what you're naming, or ask about naming guidelines…"
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none outline-none py-0.5 max-h-36"
                  style={{ fieldSizing: "content" } as React.CSSProperties}
                  disabled={configured === false}
                />

                <button type="submit"
                  disabled={(!input.trim() && !attachment) || isUploading || configured === false}
                  className="shrink-0 w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm shadow-blue-100">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>

              <input ref={fileInputRef} type="file" accept=".pdf,.docx,.doc,.txt" className="hidden" onChange={handleFileChange} />

              {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
              {configured === false && (
                <p className="text-xs text-red-500 mt-2 text-center">Glean token not configured — add GLEAN_API_TOKEN to .env.local</p>
              )}

              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-[10px] text-gray-300">Shift+Enter for new line</p>
                <p className="text-[10px] text-gray-300">Powered by Glean · eBay enterprise search</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
