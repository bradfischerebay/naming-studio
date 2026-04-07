"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Loader2, ArrowUp, Plus, ChevronLeft, ChevronRight, PlusCircle, Check, BarChart2, Paperclip, X, Beaker } from "lucide-react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, type Message } from "@/components/ChatMessage";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  evaluation: any | null;
  model: string;
  createdAt: string;
}

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

// Max textarea height ≈ 15 lines (14px × 1.625 line-height × 15 + top/bottom padding)
const MAX_TEXTAREA_HEIGHT = 340;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function newConversation(model: string): Conversation {
  return {
    id: Date.now().toString(),
    title: "New conversation",
    messages: [],
    evaluation: null,
    model,
    createdAt: new Date().toISOString(),
  };
}

function titleFromMessage(content: string): string {
  const clean = content.replace(/\n/g, " ").trim();
  return clean.length > 50 ? clean.slice(0, 50) + "…" : clean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modelPickerOpen, setModelPickerOpen] = useState(false);

  // Upload state — stored separately so file shows as pill, not as textarea text
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [pendingUploadText, setPendingUploadText] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modelPickerRef = useRef<HTMLDivElement>(null);

  // Derived state
  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;
  const messages = activeConversation?.messages ?? [];
  const currentEvaluation = activeConversation?.evaluation ?? null;

  // Whether there's something ready to send
  const hasContent = inputValue.trim().length > 0 || !!pendingUploadText;

  // ── Effects ──

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea up to MAX_TEXTAREA_HEIGHT
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
    }
  }, [inputValue]);

  // Close model picker when clicking outside it
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

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        textareaRef.current?.focus();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ── Conversation management ──

  const getOrCreateConversation = (): Conversation => {
    if (activeConversation) return activeConversation;
    const conv = newConversation(selectedModel);
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    return conv;
  };

  const updateConversation = (id: string, patch: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...patch } : c))
    );
  };

  const addMessages = (convId: string, newMsgs: Message[]) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId ? { ...c, messages: [...c.messages, ...newMsgs] } : c
      )
    );
  };

  const removeLoadingMessage = (convId: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, messages: c.messages.filter((m) => m.metadata?.type !== "loading") }
          : c
      )
    );
  };

  const updateLoadingMessage = useCallback((convId: string, content: string) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, messages: c.messages.map((m) => m.metadata?.type === "loading" ? { ...m, content } : m) }
          : c
      )
    );
  }, []);

  const startNewChat = () => {
    const conv = newConversation(selectedModel);
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    setInputValue("");
    setUploadedFileName(null);
    setPendingUploadText(null);
  };

  // ── Upload — shows file as attachment pill; text extracted but NOT put in textarea ──

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
        throw new Error(err.error || "Upload failed");
      }
      const data = await res.json();
      if (!data.text) throw new Error("No text extracted from file");

      // Store extracted text separately — show as pill, not in textarea
      setPendingUploadText(data.text);
      setUploadedFileName(file.name);
      toast.success(`${file.name} attached — press Send to evaluate`);
      textareaRef.current?.focus();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      toast.error(msg);
    } finally {
      setIsUploading(false);
      // Reset so the same file can be re-uploaded
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const clearUpload = () => {
    setUploadedFileName(null);
    setPendingUploadText(null);
  };

  // ── Evaluation ──

  const runEvaluation = async ({
    conv: convParam,
    isClarification = false,
  }: {
    conv?: Conversation;
    isClarification?: boolean;
  }) => {
    // The text to evaluate: uploaded file content takes priority; textarea text is additional context
    const briefText = pendingUploadText || inputValue.trim();
    const additionalContext = pendingUploadText ? inputValue.trim() : "";

    if (!briefText) {
      toast.error("Please enter a brief or upload a file");
      return;
    }

    const conv = convParam ?? getOrCreateConversation();
    const fileName = uploadedFileName;

    // Add user message to chat
    const userContent = fileName ? `📎 ${fileName}${additionalContext ? `\n\n${additionalContext}` : ""}` : briefText;
    addMessages(conv.id, [
      {
        role: "user",
        content: userContent,
        metadata: {
          type: isClarification ? "clarification" : "brief",
          uploadedFile: fileName || undefined,
        },
      },
    ]);

    // Title from first message
    if (!isClarification && conv.messages.length === 0) {
      updateConversation(conv.id, { title: titleFromMessage(fileName || briefText) });
    }

    // Clear input state
    setInputValue("");
    setUploadedFileName(null);
    setPendingUploadText(null);

    // Loading message with phase cycling
    const EVAL_PHASES = [
      "Parsing your brief…",
      "Researching the competitive landscape…",
      "Extracting naming facts…",
      "Evaluating against 6 gates…",
      "Calculating priority score…",
      "Determining verdict…",
    ];
    const CLARIFY_PHASES = [
      "Applying your clarification…",
      "Re-evaluating gates with new context…",
      "Recalculating priority score…",
      "Updating verdict…",
    ];
    const phases = isClarification ? CLARIFY_PHASES : EVAL_PHASES;
    addMessages(conv.id, [{ role: "assistant", content: phases[0], metadata: { type: "loading" } }]);

    let phaseIdx = 0;
    const phaseTimer = setInterval(() => {
      phaseIdx = Math.min(phaseIdx + 1, phases.length - 1);
      updateLoadingMessage(conv.id, phases[phaseIdx]);
    }, 4500);

    setIsProcessing(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = { skipWebResearch: false, model: selectedModel };

      if (isClarification && currentEvaluation) {
        const origBrief = messages.find((m) => m.metadata?.type === "brief")?.content || briefText;
        payload.brief = `${origBrief}\n\nAdditional Context:\n${briefText}`;
        payload.clarification = briefText;
        payload.previousResult = currentEvaluation;
      } else {
        const fullBrief = additionalContext
          ? `${briefText}\n\nAdditional context from user: ${additionalContext}`
          : briefText;
        payload.brief = fullBrief;
      }

      const res = await fetch("/api/evaluate-v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Evaluation failed");

      const result = data.result;

      removeLoadingMessage(conv.id);
      updateConversation(conv.id, { evaluation: result });

      const isFinal = !data.requiresClarification;

      addMessages(conv.id, [
        {
          role: "assistant",
          content: isFinal
            ? "Here's my evaluation:"
            : "I've reviewed your brief but need a bit more information:",
          metadata: {
            type: isFinal ? "final_verdict" : "evaluation",
            gateResults: result.gateEvaluation?.gate_results,
            scoringResults: result.scoringResult?.scores?.breakdown,
            totalScore: result.scoringResult?.scores?.total,
            questions: data.questions,
            verdict: result.verdict?.title || result.verdict?.path,
            verdictPath: result.verdict?.path,
            verdictSummary: result.verdict?.summary,
          },
        },
      ]);

      if (!isFinal) {
        addMessages(conv.id, [
          {
            role: "assistant",
            content: "Feel free to paste any additional details below and I'll reassess.",
          },
        ]);
      }
    } catch (err) {
      removeLoadingMessage(conv.id);
      const msg = err instanceof Error ? err.message : "Evaluation failed";
      addMessages(conv.id, [{ role: "assistant", content: msg }]);
      toast.error(msg);
    } finally {
      clearInterval(phaseTimer);
      setIsProcessing(false);
    }
  };

  const handleConversationalQuestion = async (text: string) => {
    const conv = getOrCreateConversation();
    addMessages(conv.id, [
      { role: "user", content: text },
    ]);
    if (conv.messages.length === 0) {
      updateConversation(conv.id, { title: titleFromMessage(text) });
    }
    setInputValue("");
    addMessages(conv.id, [{ role: "assistant", content: "Thinking…", metadata: { type: "loading" } }]);
    setIsProcessing(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, mode: "knowledge" }),
      });
      const data = await res.json() as { response?: string; error?: string };
      removeLoadingMessage(conv.id);
      if (data.response) {
        addMessages(conv.id, [{
          role: "assistant",
          content: data.response,
          metadata: { type: "chat" },
        }]);
      } else {
        addMessages(conv.id, [{ role: "assistant", content: data.error ?? "Sorry, I couldn't answer that right now." }]);
      }
    } catch {
      removeLoadingMessage(conv.id);
      addMessages(conv.id, [{ role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSend = async () => {
    if (!hasContent || isProcessing || isUploading) return;
    setModelPickerOpen(false);

    const isClarification = !!(currentEvaluation?.requiresClarification);

    // Uploaded files are always briefs — skip classification
    // Clarification responses are always briefs — skip classification
    if (pendingUploadText || isClarification) {
      const conv = getOrCreateConversation();
      runEvaluation({ conv, isClarification });
      return;
    }

    const text = inputValue.trim();

    // Classify intent
    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const { type } = await res.json() as { type: "brief" | "question" };

      if (type === "question") {
        await handleConversationalQuestion(text);
        return;
      }
    } catch {
      // Classifier failed — fall through to evaluation (safer default)
    }

    const conv = getOrCreateConversation();
    runEvaluation({ conv, isClarification: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  // ── Derived labels ──

  const selectedModelMeta = MODELS.find((m) => m.value === selectedModel);
  const modelLabel = selectedModelMeta?.label ?? "GPT-5.2";
  const groups = ["GPT", "Claude", "Gemini"] as const;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="h-screen bg-[#f4f4f4] flex overflow-hidden">
      <Toaster position="top-center" richColors />

      {/* ── Sidebar — always rendered, animates between 52px (icon-only) and 260px ── */}
      <motion.aside
        animate={{ width: sidebarOpen ? 260 : 52 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="bg-[#171717] text-white flex flex-col flex-shrink-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center px-3 py-4 border-b border-white/10 min-w-0">
          {sidebarOpen && (
            <span className="flex-1 text-sm font-semibold truncate mr-2">Naming Assistant</span>
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

        {/* New chat */}
        <div className="px-2 py-2 border-b border-white/10">
          <button
            type="button"
            onClick={startNewChat}
            title="New conversation"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white/80 hover:text-white ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <PlusCircle className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>New conversation</span>}
          </button>
        </div>

        {/* Analytics */}
        <div className="px-2 py-1 border-b border-white/10">
          <Link
            href="/analytics"
            title="Analytics"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white/60 hover:text-white ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <BarChart2 className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Analytics</span>}
          </Link>
          <Link
            href="/lab"
            title="Lab"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-white/60 hover:text-white ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Beaker className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && (
              <span className="flex items-center gap-1.5">
                Lab
                <span className="text-[9px] font-bold text-blue-300 bg-blue-900/40 px-1 py-0.5 rounded uppercase tracking-wide">Beta</span>
              </span>
            )}
          </Link>
        </div>

        {/* History — only in expanded mode */}
        {sidebarOpen && (
          <div className="flex-1 overflow-y-auto px-3 pb-4 pt-2 space-y-1">
            {conversations.length === 0 ? (
              <p className="text-xs text-white/30 px-3 py-4 text-center">No conversations yet</p>
            ) : (
              conversations.map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => {
                    setActiveId(conv.id);
                    setSelectedModel(conv.model);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    conv.id === activeId
                      ? "bg-white/15 text-white"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="truncate" title={conv.title}>{conv.title}</div>
                  <div className="text-[10px] text-white/30 mt-0.5">
                    {new Date(conv.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </motion.aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h1 className="text-base font-semibold text-slate-900 leading-tight truncate">
              {activeConversation?.title ?? "Naming Decision Assistant"}
            </h1>
            <p className="text-xs text-slate-400">eBay AI-powered naming governance</p>
          </div>
          <button
            type="button"
            onClick={startNewChat}
            className="flex-shrink-0 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New chat
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 py-8">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center max-w-xl">
                  <h2 className="text-3xl font-bold text-slate-900 mb-3">
                    What would you like to name?
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm leading-relaxed">
                    Paste a product brief and I&apos;ll evaluate it against eBay&apos;s naming framework — or upload a document using the attachment button below.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-left">
                    {[
                      { title: "Paste a brief", desc: "Type or paste text describing your product" },
                      { title: "Upload a file", desc: "Attach a .docx, .pdf, or .txt file" },
                      { title: "Clarify as you go", desc: "I'll ask follow-up questions when needed" },
                      { title: "Instant decision", desc: "Get a verdict across 6 gates with rationale" },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="bg-white rounded-2xl border border-slate-200 p-4 text-left"
                      >
                        <div className="font-medium text-slate-900 text-sm">{card.title}</div>
                        <div className="text-xs text-slate-400 mt-1">{card.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Try an example</p>
                    <div className="space-y-2">
                      {[
                        "eBay is launching a managed shipping service for high-volume sellers in the US and UK. Sellers opt in separately, eBay negotiates bulk carrier rates, and the service includes a dedicated dashboard and shipment tracking. Planned as a permanent addition launching Q3 2026.",
                        "We're building an AI-powered listing description generator. Users can enable or disable it in the seller hub settings. Initially US-only with global rollout planned for Q1 2027. Standalone backend service with its own data model.",
                        "New checkout toggle that lets buyers add gift wrapping to their order. It's a paid add-on — seller opts in, buyer sees it in checkout. Launching for holiday season 2026 only (3-month campaign).",
                      ].map((example, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => {
                            setInputValue(example);
                            textareaRef.current?.focus();
                          }}
                          className="w-full text-left px-4 py-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 hover:text-slate-900 transition-colors leading-relaxed"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((message, idx) => (
                  <ChatMessage key={idx} message={message} isLatest={idx === messages.length - 1} />
                ))}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* ── Input area ── */}
        <div className="flex-shrink-0 bg-[#f4f4f4] px-4 pb-5 pt-2">
          <div className="max-w-5xl mx-auto">

            <div className="relative" ref={modelPickerRef}>
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

              {/* Input box */}
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

                {/* Textarea — grows up to 15 lines then scrolls */}
                <textarea
                  ref={textareaRef}
                  placeholder={
                    uploadedFileName
                      ? "Add a note or context (optional)…"
                      : "Paste your brief or describe what you want to name…"
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isProcessing}
                  rows={1}
                  style={{ maxHeight: `${MAX_TEXTAREA_HEIGHT}px` }}
                  className="w-full px-5 pt-4 pb-2 text-sm text-slate-900 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 min-h-[52px] leading-relaxed overflow-y-auto"
                />

                {/* Character counter */}
                {inputValue.length > 500 && (
                  <div className="px-5 pb-0.5 text-right">
                    <span className={`text-[10px] ${inputValue.length > 8000 ? "text-amber-600 font-semibold" : "text-slate-400"}`}>
                      {inputValue.length.toLocaleString()} chars{inputValue.length > 8000 ? " — very long" : ""}
                    </span>
                  </div>
                )}

                {/* Bottom toolbar */}
                <div className="flex items-center gap-2 px-3 pb-3 pt-1">

                  {/* Upload */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload a document (.docx, .pdf, .txt)"
                    className={`flex-shrink-0 w-9 h-9 rounded-full border border-slate-300 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors cursor-pointer select-none ${
                      isProcessing || isUploading ? "opacity-40 pointer-events-none" : ""
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
                    disabled={isProcessing}
                    className="flex-shrink-0 flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors disabled:opacity-40"
                  >
                    {modelLabel}
                    <span className="text-slate-400 text-[10px]">▾</span>
                  </button>

                  <div className="flex-1" />

                  {/* Send */}
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!hasContent || isProcessing || isUploading}
                    title="Send (Return)"
                    className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-700 disabled:bg-slate-300 flex items-center justify-center transition-colors"
                  >
                    {isProcessing ? (
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <p className="text-center text-[11px] text-slate-400 mt-2">
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⏎</kbd> send ·{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⇧⏎</kbd> newline ·{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⌘K</kbd> focus ·{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⌘B</kbd> sidebar ·{" "}
              <span className="font-medium">{modelLabel}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
