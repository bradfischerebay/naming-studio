"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Loader2, ArrowUp, Plus, ChevronLeft, ChevronRight, PlusCircle, Check, BarChart2, Paperclip, X, TestTube2, Globe, Database, Shield, ExternalLink, Ticket, Wand2, BadgeCheck, BookOpen, Save, ArrowRight, Settings, Bell } from "lucide-react";
import { toast, Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage, type Message } from "@/components/ChatMessage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SimilarBrief {
  id: string;
  createdAt: string;
  briefSnippet: string;
  verdictPath: string;
  verdictTitle: string;
  score: number | null;
  similarity: number;
}


interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  evaluation: any | null;
  model?: string;
  createdAt: string;
}

// ─── Fixed Model ─────────────────────────────────────────────────────────────

const FIXED_MODEL = "azure-chat-completions-gpt-5-2-2025-12-11-sandbox";

// Max textarea height ≈ 15 lines (14px × 1.625 line-height × 15 + top/bottom padding)
const MAX_TEXTAREA_HEIGHT = 340;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function newConversation(): Conversation {
  return {
    id: Date.now().toString(),
    title: "New conversation",
    messages: [],
    evaluation: null,
    model: undefined,
    createdAt: new Date().toISOString(),
  };
}

function titleFromMessage(content: string): string {
  const clean = content.replace(/\n/g, " ").trim();
  return clean.length > 50 ? clean.slice(0, 50) + "…" : clean;
}

// ─── Verdict badge colors ─────────────────────────────────────────────────────

// PATH_A1 is an internal routing qualifier — display same as PATH_A0 to users
const VERDICT_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  PATH_C:  { bg: "bg-emerald-100", text: "text-emerald-700", label: "Proceed" },
  PATH_A2: { bg: "bg-amber-100",   text: "text-amber-700",   label: "Low Score" },
  PATH_A1: { bg: "bg-slate-100",   text: "text-slate-600",   label: "Do Not Name" },
  PATH_A0: { bg: "bg-slate-100",   text: "text-slate-600",   label: "Do Not Name" },
  PATH_B:  { bg: "bg-blue-100",    text: "text-blue-700",    label: "More Info Needed" },
};

// ─── SimilarBriefsCard ────────────────────────────────────────────────────────

function SimilarBriefsCard({ briefs, isLoading }: { briefs: SimilarBrief[]; isLoading: boolean }) {
  return (
    <div className="mt-4 mb-2">
      <div className="flex items-center gap-2 mb-2 px-1">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Similar past decisions</span>
        {isLoading && <span className="text-[10px] text-slate-400 animate-pulse">Searching memory…</span>}
      </div>
      {isLoading && briefs.length === 0 ? (
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-4 animate-pulse h-24" />
          ))}
        </div>
      ) : briefs.length === 0 ? (
        <p className="text-xs text-slate-400 px-1">No similar briefs found yet — submit more evaluations to build institutional memory.</p>
      ) : (
        <div className="flex gap-3">
          {briefs.map((b) => {
            const badge = VERDICT_BADGE[b.verdictPath] ?? { bg: "bg-slate-100", text: "text-slate-600", label: b.verdictPath };
            const simPct = Math.round(b.similarity * 100);
            const date = new Date(b.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" });
            return (
              <div key={b.id} className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${badge.bg} ${badge.text}`}>
                    {badge.label}
                  </span>
                  <span className="text-[10px] text-slate-400 flex-shrink-0">{simPct}% match · {date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{b.briefSnippet}</p>
                {b.score !== null && (
                  <p className="text-[10px] text-slate-400 mt-2">Score: {b.score}/70</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [includeResearch, setIncludeResearch] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [similarBriefs, setSimilarBriefs] = useState<SimilarBrief[]>([]);
  const [isFetchingSimilar, setIsFetchingSimilar] = useState(false);
  const [jiraTicketKey, setJiraTicketKey] = useState<string | null>(null);
  const [jiraTicketUrl, setJiraTicketUrl] = useState<string | null>(null);
  const [isCreatingJiraTicket, setIsCreatingJiraTicket] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [slackNotified, setSlackNotified] = useState(false);
  const [isRequestingReview, setIsRequestingReview] = useState(false);
  const [reviewRequested, setReviewRequested] = useState(false);

  // Upload state — stored separately so file shows as pill, not as textarea text
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [pendingUploadText, setPendingUploadText] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasLoaded = useRef(false);

  // Derived state
  const activeConversation = conversations.find((c) => c.id === activeId) ?? null;
  const messages = activeConversation?.messages ?? [];
  const currentEvaluation = activeConversation?.evaluation ?? null;

  // Whether there's something ready to send
  const hasContent = inputValue.trim().length > 0 || !!pendingUploadText;

  // Brief quality hint
  const briefQualityHint = (() => {
    const text = inputValue.toLowerCase();
    if (inputValue.trim().length < 50) return null;
    if (!/(enroll|opt.?in|toggle|setting|access|select|choose|dashboard|sign.?up)/i.test(inputValue)) {
      return "Tip: mention how users access or interact with this feature";
    }
    if (!/(permanent|q[1-4]\s*20\d\d|20\d\d|\d+ month|\d+ year|year|ongoing|launch|season|campaign|week)/i.test(inputValue)) {
      return "Tip: mention the planned duration or launch timing";
    }
    if (!/(us|uk|de|au|ca|jp|global|international|worldwide|market)/i.test(text)) {
      return "Tip: mention which markets or regions this targets";
    }
    return null;
  })();

  // ── Effects ──

  // Load conversations from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("naming-studio-conversations-v1");
      if (raw) {
        const saved = JSON.parse(raw) as { conversations: Conversation[]; activeId: string };
        if (Array.isArray(saved.conversations) && saved.conversations.length > 0) {
          setConversations(saved.conversations);
          setActiveId(saved.activeId ?? saved.conversations[0]?.id ?? "");
        }
      }
    } catch { /* ignore corrupted storage */ }
    hasLoaded.current = true;
  }, []);

  // Save conversations to localStorage on change
  useEffect(() => {
    if (!hasLoaded.current) return; // Don't overwrite with empty state before initial load
    try {
      // Keep max 30 conversations, newest first
      const trimmed = conversations.slice(0, 30);
      localStorage.setItem("naming-studio-conversations-v1", JSON.stringify({ conversations: trimmed, activeId }));
    } catch { /* storage quota */ }
  }, [conversations, activeId]);

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
    const conv = newConversation();
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
    const conv = newConversation();
    setConversations((prev) => [conv, ...prev]);
    setActiveId(conv.id);
    setInputValue("");
    setUploadedFileName(null);
    setPendingUploadText(null);
    setSimilarBriefs([]);
    setJiraTicketKey(null);
    setJiraTicketUrl(null);
    setIsSaved(false);
    setIsSaving(false);
    setSlackNotified(false);
    setIsRequestingReview(false);
    setReviewRequested(false);
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
    setIsSaved(false);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload: any = {
        skipWebResearch: !includeResearch
      };

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
      if (data.slackNotified) setSlackNotified(true);

      removeLoadingMessage(conv.id);
      updateConversation(conv.id, { evaluation: result });

      // Fetch similar past briefs for final, non-clarification verdicts
      const isFinal = !data.requiresClarification;

      // Show Slack notification toast for PATH_C verdicts
      if (isFinal && data.slackNotified) {
        toast.success("Team notified via Slack");
      }

      if (isFinal && !isClarification) {
        setSimilarBriefs([]);
        setIsFetchingSimilar(true);
        fetch("/api/similar-briefs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ brief: payload.brief }),
        })
          .then((r) => r.json())
          .then((d) => {
            if (Array.isArray(d.similar)) setSimilarBriefs(d.similar);
          })
          .catch(() => {})
          .finally(() => setIsFetchingSimilar(false));
      } else {
        setSimilarBriefs([]);
      }

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
            compiledBrief: result.compiledBrief ?? null,
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
      const helpfulMsg = msg.includes("VPN")
        ? msg
        : msg.includes("Request failed")
        ? "Server connection issue — please try again in a moment."
        : "Evaluation failed — please check your brief and try again.";
      addMessages(conv.id, [{ role: "assistant", content: helpfulMsg }]);
      toast.error(helpfulMsg);
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
        addMessages(conv.id, [{ role: "assistant", content: data.error ?? "I couldn't retrieve an answer right now. Try rephrasing your question." }]);
      }
    } catch (err) {
      removeLoadingMessage(conv.id);
      const errMsg = err instanceof Error ? err.message : "";
      const helpfulMsg = errMsg.includes("VPN")
        ? "Connection failed — check your VPN connection."
        : "Connection issue — please try again.";
      addMessages(conv.id, [{ role: "assistant", content: helpfulMsg }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateJiraTicket = async () => {
    if (!currentEvaluation || isCreatingJiraTicket) return;

    setIsCreatingJiraTicket(true);
    try {
      const briefMsg = messages.find((m) => m.metadata?.type === "brief")?.content ?? "";
      const res = await fetch("/api/jira/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verdictTitle: currentEvaluation.verdict?.title ?? "",
          verdictPath: currentEvaluation.verdict?.path ?? "PATH_C",
          verdictSummary: currentEvaluation.verdict?.summary ?? [],
          score: currentEvaluation.scoringResult?.scores?.total ?? null,
          briefSnippet: briefMsg.slice(0, 500),
          offeringDescription: currentEvaluation.compiledBrief?.offering_description ?? null,
          gateResults: currentEvaluation.gateEvaluation?.gate_results ?? null,
          scoringBreakdown: currentEvaluation.scoringResult?.scores?.breakdown ?? null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? "Failed to create ticket");
      }

      setJiraTicketKey(data.ticket.key);
      setJiraTicketUrl(data.ticket.url);
      toast.success(`Jira ticket created: ${data.ticket.key}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create Jira ticket";
      toast.error(msg);
    } finally {
      setIsCreatingJiraTicket(false);
    }
  };


  const handleSaveDecision = async () => {
    if (!currentEvaluation || isSaved || isSaving) return;
    setIsSaving(true);
    try {
      const briefText = messages.find((m) => m.metadata?.type === "brief")?.content ?? "";
      const res = await fetch("/api/corpus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefText,
          verdictPath: currentEvaluation.verdict?.path,
          verdictTitle: currentEvaluation.verdict?.title,
          score: currentEvaluation.scoringResult?.scores?.total ?? null,
          gateResults: currentEvaluation.gateEvaluation?.gate_results ?? null,
          offeringDescription: currentEvaluation.compiledBrief?.offering_description ?? null,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setIsSaved(true);
      toast.success("Decision saved to history");
    } catch {
      toast.error("Couldn't save decision — try again");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRequestReview = async () => {
    if (isRequestingReview || reviewRequested || !currentEvaluation) return;
    setIsRequestingReview(true);
    try {
      const briefText = messages.find((m) => m.metadata?.type === "brief")?.content ?? "";
      await fetch("/api/slack-escalate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verdictPath: currentEvaluation.verdict?.path,
          verdictTitle: currentEvaluation.verdict?.title ?? "",
          briefSnippet: briefText.slice(0, 300),
          score: currentEvaluation.scoringResult?.scores?.total ?? null,
        }),
      });
      setReviewRequested(true);
      toast.success("Review request sent to naming team");
    } catch {
      toast.error("Couldn't send review request");
    } finally {
      setIsRequestingReview(false);
    }
  };

  const handleContinueToNaming = () => {
    const briefText = messages.find((m) => m.metadata?.type === "brief")?.content ?? "";
    if (briefText) localStorage.setItem("prefill-brief", briefText);
    router.push("/name-generator");
  };

  const handleSend = async () => {
    if (!hasContent || isProcessing || isUploading) return;

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
      const { type, fallback } = await res.json() as { type: "brief" | "question"; fallback?: boolean };

      if (fallback) {
        toast.error("Classifier unreachable — check your VPN. Treating input as a brief.");
      }

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

        {/* ── WORKFLOW group ── */}
        {sidebarOpen && (
          <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-3 pb-1">Workflow</p>
        )}
        <div className="px-2 pb-1">
          <Link
            href="/"
            title="Step 1: Evaluate Brief"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <ArrowUp className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && (
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">1</span>
                Evaluate Brief
              </span>
            )}
          </Link>
          <Link
            href="/name-generator"
            title="Step 2: Generate Names"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/name-generator" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Wand2 className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && (
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">2</span>
                Generate Names
              </span>
            )}
          </Link>
          <Link
            href="/name-validator"
            title="Step 3: Validate Names"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/name-validator" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <BadgeCheck className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && (
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">3</span>
                Validate Names
              </span>
            )}
          </Link>
          <div
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm opacity-40 cursor-default ${!sidebarOpen ? "justify-center" : ""}`}
            title="Legal Screen — coming soon"
          >
            <Shield className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && (
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold bg-white/15 text-white/70 px-1 rounded">4</span>
                Legal Screen
                <span className="text-[8px] font-semibold text-white/40 uppercase tracking-wide ml-1">Soon</span>
              </span>
            )}
          </div>
        </div>

        {/* ── REPOSITORY group ── */}
        {sidebarOpen && (
          <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-3 pb-1">Repository</p>
        )}
        <div className="px-2 pb-1">
          <Link
            href="/registry"
            title="Naming Registry"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/registry" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Database className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Naming Registry</span>}
          </Link>
          <Link
            href="/corpus"
            title="Decision History"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/corpus" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <BookOpen className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Decision History</span>}
          </Link>
        </div>

        {/* ── PLATFORM group ── */}
        {sidebarOpen && (
          <p className="text-[10px] text-white/30 uppercase tracking-widest px-4 pt-3 pb-1">Platform</p>
        )}
        <div className="px-2 pb-2 border-b border-white/10">
          <Link
            href="/analytics"
            title="Analytics"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/analytics" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <BarChart2 className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Analytics</span>}
          </Link>
          <Link
            href="/lab"
            title="Lab"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/lab" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <TestTube2 className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Lab</span>}
          </Link>
          <Link
            href="/governance"
            title="AI Governance"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/governance" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Shield className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Governance</span>}
          </Link>
          <Link
            href="/admin"
            title="Admin"
            className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg transition-colors text-sm ${
              pathname === "/admin" ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            } ${!sidebarOpen ? "justify-center" : ""}`}
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {sidebarOpen && <span>Admin</span>}
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
                    setSimilarBriefs([]);
                    setJiraTicketKey(null);
                    setJiraTicketUrl(null);
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
              <div className="flex items-center justify-center min-h-[50vh] py-8">
                <div className="w-full max-w-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      Evaluate your naming brief
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto">
                      Paste or upload your brief below. The system evaluates it against eBay&apos;s 6-gate naming framework and gives you a defensible, documented verdict in under 2 minutes.
                    </p>
                  </div>

                  {/* 3-step workflow strip */}
                  <div className="flex items-center gap-2 mb-8 justify-center">
                    {[
                      { step: "1", label: "Evaluate Brief", active: true },
                      { step: "2", label: "Generate Names", active: false },
                      { step: "3", label: "Validate Names", active: false },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                          item.active
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          <span className={`text-[10px] font-bold px-1 rounded ${item.active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-400"}`}>{item.step}</span>
                          {item.label}
                        </div>
                        {idx < 2 && <span className="text-slate-300 text-xs">→</span>}
                      </div>
                    ))}
                  </div>

                  {/* Template quick-fill */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Brief template</span>
                      <button
                        type="button"
                        onClick={() => {
                          setInputValue(`Offering: [What is this product or feature?]
Target users: [Sellers / Buyers / Both — and which segment?]
Markets: [US / UK / DE / AU / global?]
How users access it: [Separate enrollment, toggle in settings, automatic, etc.]
Timing: [Launch date + planned duration — permanent or time-limited?]
Strategic context: [Why this exists, what problem it solves]`);
                          textareaRef.current?.focus();
                        }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Use template →
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Fill in the key fields to get the most accurate evaluation. You can also paste a brief in your own words — the system will structure it automatically.</p>
                  </div>

                  {/* Example briefs */}
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Or try an example</p>
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
                {(isFetchingSimilar || similarBriefs.length > 0) && (
                  <SimilarBriefsCard briefs={similarBriefs} isLoading={isFetchingSimilar} />
                )}
                <div ref={chatEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* ── Post-verdict action bar ── */}
        {currentEvaluation?.verdict?.path && (
          <div className="flex-shrink-0 bg-[#f4f4f4] px-4 pt-2 pb-1">
            <div className="max-w-5xl mx-auto flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleSaveDecision}
                disabled={isSaved || isSaving}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors disabled:cursor-default ${
                  isSaved
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {isSaved ? (
                  <><Check className="h-3.5 w-3.5" /> Saved</>
                ) : isSaving ? (
                  <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
                ) : (
                  <><Save className="h-3.5 w-3.5" /> Save Decision</>
                )}
              </button>

              {currentEvaluation.verdict.path === "PATH_C" && (
                <button
                  type="button"
                  onClick={handleContinueToNaming}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border bg-slate-900 border-slate-900 text-white hover:bg-slate-700 transition-colors"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  Continue to Naming
                </button>
              )}

              {slackNotified ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 text-slate-400">
                  <Check className="h-3.5 w-3.5" /> Team notified
                </span>
              ) : null}

              {reviewRequested ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 text-slate-400">
                  <Check className="h-3.5 w-3.5" /> Review requested
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestReview}
                  disabled={isRequestingReview}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50"
                >
                  {isRequestingReview ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Bell className="h-3.5 w-3.5" />}
                  {isRequestingReview ? "Sending…" : "Request Review"}
                </button>
              )}

              {currentEvaluation.verdict.path === "PATH_C" && (
                <>
                  {jiraTicketKey ? (
                    <a
                      href={jiraTicketUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition-colors"
                    >
                      <Ticket className="h-3.5 w-3.5" />
                      {jiraTicketKey}
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCreateJiraTicket}
                      disabled={isCreatingJiraTicket}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreatingJiraTicket ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Ticket className="h-3.5 w-3.5" />}
                      {isCreatingJiraTicket ? "Creating…" : "Create Jira Ticket"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Input area ── */}
        <div className="flex-shrink-0 bg-[#f4f4f4] px-4 pb-5 pt-2">
          <div className="max-w-5xl mx-auto">

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
                  className="w-full px-5 pt-4 pb-2 text-sm text-slate-900 bg-transparent resize-none focus:outline-none placeholder:text-slate-400 min-h-[52px] leading-relaxed overflow-y-auto disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* Character counter */}
                {inputValue.length > 500 && (
                  <div className="px-5 pb-0.5 text-right">
                    <span className={`text-[10px] ${inputValue.length > 8000 ? "text-amber-600 font-semibold" : "text-slate-400"}`}>
                      {inputValue.length.toLocaleString()} chars{inputValue.length > 8000 ? " — very long" : ""}
                    </span>
                  </div>
                )}

                {/* Brief quality hint */}
                {briefQualityHint && (
                  <p className="px-5 pb-1 text-[11px] text-blue-500 italic">{briefQualityHint}</p>
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

                  {/* Web research toggle */}
                  <button
                    type="button"
                    onClick={() => setIncludeResearch((v) => !v)}
                    disabled={isProcessing}
                    title={includeResearch ? "Competitive research on — click to turn off" : "Competitive research off — click to include web context"}
                    className={`flex-shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-40 ${
                      includeResearch
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    Research
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

            <p className="text-center text-[11px] text-slate-400 mt-2">
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⏎</kbd> send ·{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⇧⏎</kbd> newline ·{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⌘K</kbd> focus ·{" "}
              <kbd className="px-1 py-0.5 bg-slate-200 rounded text-[9px] font-mono">⌘B</kbd> sidebar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
