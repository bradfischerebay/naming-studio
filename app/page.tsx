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
  const [showReassessment, setShowReassessment] = useState(false);

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
      setShowReassessment(false);
    }

    try {
      // Simulate realistic progress
      setLoadingProgress(10);
      setLoadingStage("Running Gatekeeper evaluation...");

      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief: evaluationText,
          model: selectedModel
        }),
      });

      setLoadingProgress(60);
      setLoadingStage("Analyzing gate results...");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Evaluation failed");
      }

      setLoadingProgress(80);
      setLoadingStage("Calculating verdict...");

      const data = await response.json();

      setLoadingProgress(100);
      setLoadingStage("Complete!");

      setResult(data);

      // Check if more information is needed
      const hasPendingOrUnknown = Object.values(data.gatekeeperResult).some(
        (gate) =>
          typeof gate === "object" &&
          gate !== null &&
          "status" in gate &&
          (gate.status === "Pending" || gate.status === "Unknown")
      );
      setShowReassessment(hasPendingOrUnknown);

      if (isReassessment) {
        toast.success("Brief reassessed with additional context!");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Evaluation failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
              Submit your product brief for governance evaluation
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
              placeholder="Product: [Name]&#10;&#10;Description: [What does it do?]&#10;&#10;Integration: [Standalone or embedded?]&#10;&#10;Architecture: [System boundaries?]&#10;&#10;Timeline: [Duration and markets]&#10;&#10;Portfolio Context: [Related products]&#10;&#10;Legal: [Trademark/regulatory considerations]"
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              className="min-h-[200px] font-mono text-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500"
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
            {/* Verdict */}
            <Card className="border-2 border-slate-200 shadow-md">
              <CardHeader className="bg-slate-50">
                <CardTitle className="text-xl font-semibold">Final Verdict</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <p className="text-3xl font-bold text-slate-900">
                  {result.verdict}
                </p>
                <Button
                  onClick={copyAuditReport}
                  variant="outline"
                  className="gap-2 border-slate-300 hover:bg-slate-50 hover:border-blue-500 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy Audit Report
                </Button>
              </CardContent>
            </Card>

            {/* Gate Audit Table */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg font-semibold">Gate Audit</CardTitle>
                <CardDescription className="text-slate-600">
                  Six-gate existence framework evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="w-20 font-semibold">Gate</TableHead>
                      <TableHead className="w-32 font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Criterion</TableHead>
                      <TableHead className="font-semibold">Evidence & Rationale</TableHead>
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
                    ].map((item) => (
                      <TableRow key={item.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="font-mono font-bold text-blue-600">
                          {item.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.gate.status)}
                            {getStatusBadge(item.gate.status)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-slate-900">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {item.gate.reasoning}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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

            {/* Reassessment Section - shown when Pending/Unknown gates detected */}
            {showReassessment && (
              <Card className="border-2 border-amber-300 bg-amber-50 shadow-md">
                <CardHeader className="bg-amber-100 border-b border-amber-200">
                  <CardTitle className="flex items-center gap-2 text-amber-900">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Additional Information Needed
                  </CardTitle>
                  <CardDescription className="text-amber-700">
                    Some gates require more context. Provide additional details to reassess.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <Textarea
                    placeholder="Provide additional context about:&#10;- User interaction model&#10;- Integration architecture&#10;- System boundaries&#10;- Timeline and lifespan&#10;- Portfolio positioning&#10;- Legal/trademark status"
                    value={additionalContext}
                    onChange={(e) => setAdditionalContext(e.target.value)}
                    className="min-h-[120px] font-mono text-sm border-amber-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
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

            {/* Brand Coach Chat */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-lg font-semibold">Brand Coach</CardTitle>
                <CardDescription className="text-slate-600">
                  Ask questions about your evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {/* Chat Messages */}
                {chatMessages.length > 0 && (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-3 shadow-sm ${
                            msg.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-slate-200 text-slate-900"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-lg px-4 py-3 shadow-sm">
                          <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Chat Input */}
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Ask the Brand Coach about your evaluation..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendChatMessage();
                      }
                    }}
                    className="min-h-[80px] border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    onClick={sendChatMessage}
                    disabled={chatLoading || !chatInput.trim()}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 h-[80px] w-[80px] shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        </main>
      </div>
    </>
  );
}
