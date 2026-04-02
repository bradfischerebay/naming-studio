"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, CheckCircle2, XCircle, AlertCircle, HelpCircle, Copy, Send, Upload, RefreshCw } from "lucide-react";
import type { EvaluationResult } from "@/lib/schemas";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Available models grouped by provider
const MODELS = {
  "GPT (Azure OpenAI)": [
    { value: "azure-chat-completions-gpt-5-2-2025-12-11-sandbox", label: "GPT-5.2 (Latest, Reasoning)", recommended: true },
    { value: "azure-chat-completions-gpt-5-2-chat-2025-12-11-sandbox", label: "GPT-5.2 Chat (Faster)" },
    { value: "azure-chat-completions-gpt-5-1-2025-11-13-sandbox", label: "GPT-5.1 (Reasoning)" },
    { value: "azure-chat-completions-gpt-4-1-2025-04-14-sandbox", label: "GPT-4.1" },
    { value: "azure-chat-completions-gpt-4o-2024-05-13-sandbox", label: "GPT-4o" },
  ],
  "Claude (Anthropic)": [
    { value: "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox", label: "Claude Sonnet 4.6 (⚠️ 6 req/min)" },
    { value: "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox", label: "Claude Opus 4.6 (⚠️ 6 req/min)" },
    { value: "gcp-chat-completions-anthropic-claude-sonnet-4.5-sandbox", label: "Claude Sonnet 4.5 (⚠️ 6 req/min)" },
  ],
  "Gemini (Google)": [
    { value: "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox", label: "Gemini 3.1 Pro (300 req/min)" },
    { value: "gcp-chat-completions-chat-gemini-2.5-pro-sandbox", label: "Gemini 2.5 Pro" },
  ],
};

export default function SingleRunStudio() {
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("");
  const [selectedModel, setSelectedModel] = useState("azure-chat-completions-gpt-5-2-2025-12-11-sandbox");
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [additionalContext, setAdditionalContext] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Processing file...");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process file");
      }

      const data = await response.json();

      if (!data.text || typeof data.text !== "string") {
        throw new Error("Invalid response from upload API");
      }

      setBrief(data.text);
      setUploadedFileName(file.name);
      toast.dismiss(toastId);
      toast.success(`File "${file.name}" uploaded successfully!`);
    } catch (err) {
      toast.dismiss(toastId);
      const errorMessage = err instanceof Error ? err.message : "Failed to upload file";
      toast.error(errorMessage);
    } finally {
      // Reset the file input so the same file can be uploaded again
      e.target.value = "";
    }
  };

  const runEvaluation = async (isReassessment = false) => {
    const evaluationText = isReassessment
      ? `${brief}\n\n--- ADDITIONAL CONTEXT PROVIDED ---\n${additionalContext}`
      : brief;

    if (!evaluationText.trim()) {
      setError("Please enter a product naming brief");
      return;
    }

    setLoading(true);
    setError(null);
    setLoadingProgress(0);
    setLoadingStage("Initializing...");
    if (!isReassessment) {
      setResult(null);
      setChatMessages([]);
    }

    // Simulate smooth progress during API call
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 10) return prev + 2;
        if (prev < 40) return prev + 1;
        if (prev < 70) return prev + 0.5;
        return prev;
      });
    }, 200);

    try {
      // Initial stage
      setLoadingProgress(5);
      setLoadingStage("Running Gatekeeper evaluation...");

      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief: evaluationText,
          model: selectedModel
        }),
      });

      setLoadingProgress(75);
      setLoadingStage("Analyzing gate results...");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Evaluation failed");
      }

      setLoadingProgress(85);
      setLoadingStage("Calculating verdict...");

      const data = await response.json();

      setLoadingProgress(100);
      setLoadingStage("Complete!");

      setResult(data);

      if (isReassessment) {
        setAdditionalContext(""); // Clear the context field after reassessment
        toast.success("Brief reassessed with additional context!");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Evaluation failed";
      setError(errorMessage);
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  // Helper to generate decision summary bullets
  const getDecisionSummary = () => {
    if (!result) return [];

    const verdict = result.verdict;

    if (verdict.includes("Proceed") || verdict.includes("Proper Name Recommended")) {
      return [
        "All critical gates have been satisfied with sufficient evidence",
        "The initiative demonstrates characteristics of a standalone product",
        "A proper name is recommended to establish market identity"
      ];
    }

    if (verdict.includes("No Proper Name") || verdict.includes("Descriptive Label")) {
      const reasons = [];
      if (result.gatekeeperResult.G1.status === "Fail") {
        reasons.push("The experience is accessed through existing eBay entry points with no separate enrollment");
      }
      if (result.gatekeeperResult.G2.status === "Fail") {
        reasons.push("The initiative behaves like an integrated layer within the platform, not a separately accessed product");
      }
      if (result.gatekeeperResult.G3.status === "Fail") {
        reasons.push("The timeline indicates a short-term initiative rather than a permanent product addition");
      }
      if (reasons.length === 0) {
        reasons.push("The brief does not meet the criteria for a standalone proper name");
        reasons.push("It should be presented as a descriptive label or format identifier within the existing ecosystem");
      }
      return reasons;
    }

    return [];
  };

  // Helper to generate missing information requirements
  const getMissingInfo = () => {
    if (!result) return [];

    const missing: string[] = [];
    const gates = [
      { id: "G0", gate: result.gatekeeperResult.G0, asks: ["Confirm whether users actively select, toggle, or see this feature, or if it's an invisible background process"] },
      { id: "G1", gate: result.gatekeeperResult.G1, asks: ["Confirm whether the experience has a primary standalone entry point or lives only inside existing surfaces", "Confirm whether users must enroll, apply, or be approved separately", "Confirm whether checkout is distinct or fully uses standard platform checkout"] },
      { id: "G2", gate: result.gatekeeperResult.G2, asks: ["Confirm whether the experience is a separate destination versus a module embedded in existing flows", "Clarify the system architecture and backend boundaries"] },
      { id: "G3", gate: result.gatekeeperResult.G3, asks: ["Confirm the strategic timeline and whether this is a permanent addition (>12 months) or short-term promotion"] },
      { id: "G4", gate: result.gatekeeperResult.G4, asks: ["Identify any existing eBay products that might conflict with or be confused with the proposed name"] },
      { id: "G5", gate: result.gatekeeperResult.G5, asks: ["Confirm trademark availability and regulatory compliance in target markets"] },
    ];

    gates.forEach(({ gate, asks }) => {
      if (gate.status === "Pending" || gate.status === "Unknown") {
        missing.push(...asks);
      }
    });

    return missing;
  };

  // Check if decision is final (not pending/unknown)
  const isFinalDecision = () => {
    if (!result) return false;
    const verdict = result.verdict;
    return !verdict.includes("Need More Info") && !verdict.includes("Decision Deferred");
  };

  // Format reasoning text with CHECK/FINDING highlighting
  const formatReasoning = (reasoning: string) => {
    const parts = reasoning.split(/(\bCHECK:|\/\/ FINDING:)/g);
    return parts.map((part, idx) => {
      if (part === "CHECK:") {
        return <strong key={idx} className="text-blue-700 font-semibold">CHECK:</strong>;
      } else if (part === "// FINDING:") {
        return <strong key={idx} className="text-green-700 font-semibold">FINDING:</strong>;
      } else {
        return <span key={idx}>{part}</span>;
      }
    });
  };

  const copyAuditReport = () => {
    if (!result) return;

    const gates = [
      { id: "G0", name: "Interaction Model", gate: result.gatekeeperResult.G0 },
      { id: "G1", name: "Integration Level", gate: result.gatekeeperResult.G1 },
      { id: "G2", name: "UX & Service Boundary", gate: result.gatekeeperResult.G2 },
      { id: "G3", name: "Strategic Lifespan", gate: result.gatekeeperResult.G3 },
      { id: "G4", name: "Portfolio Alignment", gate: result.gatekeeperResult.G4 },
      { id: "G5", name: "Legal & Localization", gate: result.gatekeeperResult.G5 },
    ];

    let report = `# Naming Evaluation Report\n**Verdict:** ${result.verdict}\n\n## Gate Audit\n`;

    gates.forEach((item) => {
      report += `- ${item.id} (${item.name}): ${item.gate.status} - ${item.gate.reasoning}\n`;
    });

    if (result.scorerResult) {
      report += `\n## Scoring Breakdown\n`;
      report += `- Standalone Quality: ${result.scorerResult.standalone}/25\n`;
      report += `- Longevity: ${result.scorerResult.longevity}/15\n`;
      report += `- Legal Clarity: ${result.scorerResult.legal}/10\n`;
      report += `- Global Viability: ${result.scorerResult.global}/10\n`;
      report += `- Clarity & Distinctiveness: ${result.scorerResult.clarity}/10\n`;
      report += `- **Total Score: ${result.totalScore}/70**\n`;
      report += `\n${result.scorerResult.reasoning}\n`;
    }

    report += `\nGenerated by eBay AI Naming Studio`;

    navigator.clipboard.writeText(report);
    toast.success("Audit report copied to clipboard!");
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || !result) return;

    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: chatInput,
          context: {
            verdict: result.verdict,
            gatekeeperResult: result.gatekeeperResult,
            scorerResult: result.scorerResult,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
      };
      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch {
      toast.error("Failed to get response from Brand Coach");
    } finally {
      setChatLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pass":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "Fail":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "Pending":
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      case "Unknown":
        return <HelpCircle className="h-5 w-5 text-gray-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Pass: "bg-green-600 hover:bg-green-700 text-white border-0",
      Fail: "bg-red-600 hover:bg-red-700 text-white border-0",
      Pending: "bg-amber-500 hover:bg-amber-600 text-white border-0",
      Unknown: "bg-slate-400 hover:bg-slate-500 text-white border-0",
    };

    return (
      <Badge className={`font-semibold ${styles[status] || styles.Unknown}`}>
        {status}
      </Badge>
    );
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Naming Gatekeeper
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                AI-powered naming governance for eBay products
              </p>
            </div>
            <nav className="flex gap-2">
              <Button variant="default" asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/">Single Run</a>
              </Button>
              <Button variant="ghost" asChild className="font-medium">
                <a href="/evals">Eval Lab</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Brief Input */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Test a Brief Against Gates</CardTitle>
            <CardDescription className="text-slate-600">
              Paste your product naming brief or upload a file.
              <a
                href="https://docs.google.com/document/d/1nQiPrWpeN_x5D_pIfLmKvcUYRwfz9VxV/copy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline ml-1 font-medium"
              >
                Download template brief →
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Model Selection & File Upload */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-5 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-all duration-200 font-medium text-blue-700">
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">Upload Brief</span>
                  </div>
              </label>
              {uploadedFileName && (
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-md border border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">{uploadedFileName}</span>
                </div>
              )}
              <span className="text-xs text-slate-500">
                PDF, DOCX, or TXT
              </span>
            </div>

            {/* Model Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                AI Model:
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {Object.entries(MODELS).map(([group, models]) => (
                  <optgroup key={group} label={group}>
                    {models.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label} {model.recommended ? "⭐" : ""}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            </div>

            {/* Text Input */}
            <Textarea
              placeholder="Paste your product naming brief here...&#10;&#10;Typical product naming briefs cover:&#10;• Primary contact & offering description&#10;• Value proposition & customer benefits&#10;• Jobs to be done & example use cases&#10;• Target customers & geographies&#10;• Customer research & competitive insights&#10;• Brand & legal considerations&#10;• Naming request & initial ideas&#10;• Timing & business impact&#10;&#10;Don't have a brief? Download the template above to get started."
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="min-h-[240px] text-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500 leading-relaxed"
            />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => runEvaluation(false)}
                  disabled={loading || !brief.trim()}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Evaluating..." : "Evaluate Brief"}
                </Button>
                {error && (
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                )}
              </div>

              {/* Loading Progress Bar */}
              {loading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 font-medium">{loadingStage}</span>
                    <span className="text-slate-500">{loadingProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Dashboard */}
        {result && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Decision Header - Outcome First */}
            <div className="space-y-6">
              {/* Primary Decision Statement */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  {result.verdict.includes("Proceed") || result.verdict.includes("Proper Name Recommended") ? (
                    <CheckCircle2 className="h-12 w-12 text-green-600 flex-shrink-0 mt-1" />
                  ) : result.verdict.includes("Need More Info") || result.verdict.includes("Decision Deferred") ? (
                    <AlertCircle className="h-12 w-12 text-amber-600 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-12 w-12 text-slate-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                      {result.verdict.includes("Proceed") || result.verdict.includes("Proper Name Recommended")
                        ? "Proper Name Recommended"
                        : result.verdict.includes("Need More Info") || result.verdict.includes("Decision Deferred")
                        ? "Need More Information"
                        : "No Proper Name Needed - Use A Descriptive Label"}
                    </h2>
                    {(result.verdict.includes("Need More Info") || result.verdict.includes("Decision Deferred")) && (
                      <p className="text-slate-600 mt-2">Decision cannot be completed yet</p>
                    )}
                  </div>
                </div>

                {/* Decision Summary or Missing Info */}
                {!isFinalDecision() && getMissingInfo().length > 0 ? (
                  <Card className="border-amber-200 bg-amber-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-amber-900">Additional Information Needed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {getMissingInfo().map((info, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-600 mt-0.5">•</span>
                            <span>{info}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : getDecisionSummary().length > 0 ? (
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="pt-6">
                      <ul className="space-y-3 text-slate-700">
                        {getDecisionSummary().map((summary, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{summary}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ) : null}

                <Button
                  onClick={copyAuditReport}
                  variant="outline"
                  className="gap-2 border-slate-300 hover:bg-slate-50 hover:border-blue-500 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy Audit Report
                </Button>
              </div>
            </div>

            {/* Decision Logic Audit */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg font-semibold">Decision Logic Audit</CardTitle>
                <CardDescription className="text-slate-600">
                  Six-gate existence framework evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-100 hover:bg-slate-100 border-b-2 border-slate-300">
                        <TableHead className="w-16 font-bold text-slate-900">Gate</TableHead>
                        <TableHead className="w-36 font-bold text-slate-900">Result</TableHead>
                        <TableHead className="w-48 font-bold text-slate-900">Criterion</TableHead>
                        <TableHead className="font-bold text-slate-900">Evidence & Rationale</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { id: "G0", name: "Interaction Model", gate: result.gatekeeperResult.G0 },
                        { id: "G1", name: "Integration Level", gate: result.gatekeeperResult.G1 },
                        { id: "G2", name: "UX & Service Boundary", gate: result.gatekeeperResult.G2 },
                        { id: "G3", name: "Strategic Lifespan", gate: result.gatekeeperResult.G3 },
                        { id: "G4", name: "Portfolio Alignment", gate: result.gatekeeperResult.G4 },
                        { id: "G5", name: "Legal & Localization", gate: result.gatekeeperResult.G5 },
                      ].map((item, idx) => (
                        <TableRow
                          key={item.id}
                          className={`hover:bg-blue-50 transition-colors border-b border-slate-200 ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                          }`}
                        >
                          <TableCell className="font-mono font-bold text-blue-600 text-base align-top py-4">
                            {item.id}
                          </TableCell>
                          <TableCell className="align-top py-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(item.gate.status)}
                              {getStatusBadge(item.gate.status)}
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold text-slate-900 align-top py-4">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-sm text-slate-700 leading-relaxed align-top py-4">
                            <div className="max-w-3xl">
                              {formatReasoning(item.gate.reasoning)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Naming Score (Conditional) */}
            {result.scorerResult && (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-lg font-semibold">Naming Score</CardTitle>
                  <CardDescription className="text-slate-600">
                    Quantitative evaluation (Threshold: 60/70)
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-900">Standalone Quality</span>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold">{result.scorerResult.standalone}/25</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-900">Longevity</span>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold">{result.scorerResult.longevity}/15</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-900">Legal Clarity</span>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold">{result.scorerResult.legal}/10</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-900">Global Viability</span>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold">{result.scorerResult.global}/10</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="font-medium text-slate-900">Clarity & Distinctiveness</span>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold">{result.scorerResult.clarity}/10</Badge>
                    </div>
                    <div className="pt-4 border-t-2 border-slate-200">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-900">Total Score</span>
                        <Badge className={`text-lg px-4 py-2 ${result.totalScore >= 60 ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`}>
                          {result.totalScore}/70
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-4 bg-slate-50 p-4 rounded-md border border-slate-200">
                      {result.scorerResult.reasoning}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reassessment Section - ONLY shown when decision is incomplete */}
            {!isFinalDecision() && (
              <Card className="border-2 border-amber-300 bg-amber-50 shadow-md">
                <CardHeader className="bg-amber-100 border-b border-amber-200">
                  <CardTitle className="flex items-center gap-2 text-amber-900">
                    <RefreshCw className="h-5 w-5 text-amber-600" />
                    Provide Additional Context
                  </CardTitle>
                  <CardDescription className="text-amber-700">
                    Answer the questions above to complete the evaluation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <Textarea
                    placeholder="Provide the missing information requested above..."
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    className="min-h-[150px] text-sm border-amber-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
                  />
                  <Button
                    onClick={() => runEvaluation(true)}
                    disabled={loading || !additionalContext.trim()}
                    className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 disabled:bg-slate-300 gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reassess with Additional Context
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Brand Coach Chat - ONLY shown after final decision */}
            {isFinalDecision() && (
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 border-b border-slate-200">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                      BC
                    </div>
                    Brand Coach
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Ask me anything about your naming evaluation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {/* Chat Messages */}
                  {chatMessages.length > 0 && (
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-3 ${
                            msg.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {msg.role === "assistant" && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                              BC
                            </div>
                          )}
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                              msg.role === "user"
                                ? "bg-blue-600 text-white rounded-br-sm"
                                : "bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                          </div>
                          {msg.role === "user" && (
                            <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                              YOU
                            </div>
                          )}
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex gap-3 justify-start">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                            BC
                          </div>
                          <div className="bg-slate-100 border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            <span className="text-sm text-slate-600">Thinking...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chat Input */}
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Message Brand Coach... (Shift+Enter for new line)"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendChatMessage();
                        }
                      }}
                      className="min-h-[100px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={sendChatMessage}
                        disabled={chatLoading || !chatInput.trim()}
                        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
        </main>
      </div>
    </>
  );
}
