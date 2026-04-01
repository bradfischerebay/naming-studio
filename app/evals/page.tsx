"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { mockBriefs } from "@/data/mockBriefs";
import type { EvaluationResult } from "@/lib/schemas";

// Gate configurations extracted from GATEKEEPER_PROMPT
const GATE_CONFIGS = {
  G0: {
    name: "Interaction Model",
    defaultCriteria: `**G0 (Interaction Model): Does the user actively select, toggle, or see this feature, or is it an invisible background process?**
- ✅ Pass: User-visible feature that users actively select, toggle, or see
- ❌ Fail: Invisible background process that users don't directly interact with
- ⚠️ Pending: Need more information about user interaction model
- ❓ Unknown: Brief doesn't provide enough detail to determine`,
  },
  G1: {
    name: "Integration Level",
    defaultCriteria: `**G1 (Integration Level): Does this initiative have its own enrollment, checkout, or entry point?**
- ✅ Pass: Has its own distinct enrollment, checkout, or entry point
- ❌ Fail: Embedded in existing flows with no separate sign-up or entry
- ⚠️ Pending: Need clarification on enrollment/entry mechanism
- ❓ Unknown: Brief doesn't specify integration approach`,
  },
  G2: {
    name: "UX & Service Boundary",
    defaultCriteria: `**G2 (UX & Service Boundary): Does it operate as a separate system with its own backend, or is it a feature within the existing platform?**
- ✅ Pass: Establishes a distinct user environment/ecosystem (even if sharing backend infrastructure)
- ❌ Fail: Just a feature/button on an existing page, no distinct boundaries
- ⚠️ Pending: Need more details about system architecture
- ❓ Unknown: Insufficient architectural information`,
  },
  G3: {
    name: "Strategic Lifespan",
    defaultCriteria: `**G3 (Strategic Lifespan): Is this built to last as a permanent addition (>12 months), or is it a short-term promo?**
- ✅ Pass: Permanent addition lasting >12 months with multi-year roadmap
- ❌ Fail: Short-term promotion or temporary feature (<12 months)
- ⚠️ Pending: Need timeline clarification
- ❓ Unknown: No lifespan information provided`,
  },
  G4: {
    name: "Portfolio Alignment",
    defaultCriteria: `**G4 (Portfolio Alignment): Would the proposed concept cause user confusion or naming collisions with an existing eBay product?**
- ✅ Pass: No naming collisions or confusion with existing eBay products
- ❌ Fail: Would cause user confusion or conflicts with current portfolio
- ⚠️ Pending: Need portfolio context review
- ❓ Unknown: Related products not identified`,
  },
  G5: {
    name: "Legal & Localization Safety",
    defaultCriteria: `**G5 (Legal & Localization Safety): Are there trademark conflicts, regulatory restrictions, or cultural blockers in core markets?**
- ✅ Pass: No trademark/regulatory red flags in target markets
- ❌ Fail: Trademark conflicts, regulatory restrictions, or cultural blockers identified
- ⚠️ Pending: Legal review required
- ❓ Unknown: No legal/localization information provided`,
  },
};

interface BriefState {
  id: string;
  name: string;
  text: string;
  baselineVerdict: string;
  newVerdict: string | null;
  status: "idle" | "loading" | "complete" | "error";
  result: EvaluationResult | null;
}

export default function EvalLab() {
  // Gate prompt states
  const [gatePrompts, setGatePrompts] = useState({
    G0: GATE_CONFIGS.G0.defaultCriteria,
    G1: GATE_CONFIGS.G1.defaultCriteria,
    G2: GATE_CONFIGS.G2.defaultCriteria,
    G3: GATE_CONFIGS.G3.defaultCriteria,
    G4: GATE_CONFIGS.G4.defaultCriteria,
    G5: GATE_CONFIGS.G5.defaultCriteria,
  });

  // Brief states
  const [briefs, setBriefs] = useState<BriefState[]>(
    mockBriefs.map((brief) => ({
      id: brief.id,
      name: brief.name,
      text: brief.text,
      baselineVerdict: brief.baselineVerdict,
      newVerdict: null,
      status: "idle" as const,
      result: null,
    }))
  );

  const [isRunning, setIsRunning] = useState(false);
  const [currentBriefIndex, setCurrentBriefIndex] = useState<number | null>(null);

  const updateGatePrompt = (gate: keyof typeof gatePrompts, value: string) => {
    console.log(`📝 Updating gate ${gate} criteria`);
    setGatePrompts((prev) => ({ ...prev, [gate]: value }));
  };

  const updateBriefText = (id: string, text: string) => {
    setBriefs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, text } : b))
    );
  };

  const buildFullPrompt = () => {
    return `You are the eBay Naming Gatekeeper. Your job is to evaluate a product naming brief against six strict architectural gates. You must return a structured JSON object with gates G0 through G5.

For each gate, provide:
- status: "Pass", "Fail", "Pending", or "Unknown"
- reasoning: A detailed explanation using the CHECK and FINDING format

GATE CRITERIA:

${gatePrompts.G0}

${gatePrompts.G1}

${gatePrompts.G2}

${gatePrompts.G3}

${gatePrompts.G4}

${gatePrompts.G5}

CRITICAL: You must use this EXACT format for reasoning:
CHECK: [What specific evidence you examined from the brief - quote directly when possible]
// FINDING: [Your determination based on that evidence and why you reached that conclusion]

Example reasoning:
"CHECK: The brief states sellers can access the capability via a call-to-action and module on the native seller listing page, and can invoke it using voice on their phones.
// FINDING: This indicates direct, user-visible interactions rather than a background process."

If the brief lacks information needed to make a determination, use "Pending" or "Unknown" status and specify exactly what information is needed in the reasoning.`;
  };

  const runAnalysis = async () => {
    console.log("🚀 Starting analysis...");
    setIsRunning(true);

    // Reset all briefs to idle
    setBriefs((prev) =>
      prev.map((b) => ({ ...b, status: "idle" as const, newVerdict: null, result: null }))
    );

    const fullPrompt = buildFullPrompt();
    console.log("📝 Built full prompt with custom gate criteria");

    // Process each brief sequentially
    for (let i = 0; i < briefs.length; i++) {
      setCurrentBriefIndex(i);
      const brief = briefs[i];

      console.log(`📊 Evaluating brief ${i + 1}/${briefs.length}: ${brief.name}`);

      // Update status to loading
      setBriefs((prev) =>
        prev.map((b) =>
          b.id === brief.id ? { ...b, status: "loading" as const } : b
        )
      );

      try {
        console.log(`📤 Sending API request for ${brief.name}...`);
        const response = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            brief: brief.text,
            customPrompt: fullPrompt,
          }),
        });

        if (!response.ok) {
          console.error(`❌ API request failed for ${brief.name}:`, response.status, response.statusText);
          throw new Error("Evaluation failed");
        }

        const data: EvaluationResult = await response.json();
        console.log(`✅ Received result for ${brief.name}:`, data.verdict);

        // Update with result
        setBriefs((prev) =>
          prev.map((b) =>
            b.id === brief.id
              ? {
                  ...b,
                  newVerdict: data.verdict,
                  status: "complete" as const,
                  result: data,
                }
              : b
          )
        );
      } catch (error) {
        console.error(`❌ Error evaluating ${brief.name}:`, error);
        // Update with error
        setBriefs((prev) =>
          prev.map((b) =>
            b.id === brief.id
              ? { ...b, status: "error" as const }
              : b
          )
        );
      }
    }

    console.log("✨ Analysis complete!");

    setIsRunning(false);
    setCurrentBriefIndex(null);
  };

  const getVerdictComparison = (brief: BriefState) => {
    if (!brief.newVerdict) return null;

    const match = brief.newVerdict === brief.baselineVerdict;

    if (match) {
      return (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-md border border-green-200">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">Verdicts Match</span>
        </div>
      );
    }

    return (
      <div className="space-y-2 bg-red-50 p-3 rounded-md border border-red-200">
        <div className="flex items-center gap-2 text-red-600">
          <XCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Verdicts Differ</span>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs mt-2">
          <div>
            <div className="font-semibold text-slate-700 mb-1">Original:</div>
            <div className="text-slate-600 bg-white p-2 rounded">{brief.baselineVerdict}</div>
          </div>
          <div>
            <div className="font-semibold text-slate-700 mb-1">New:</div>
            <div className="text-slate-600 bg-white p-2 rounded">{brief.newVerdict}</div>
          </div>
        </div>
      </div>
    );
  };

  const completedBriefs = briefs.filter((b) => b.status === "complete");
  const matchCount = completedBriefs.filter(
    (b) => b.newVerdict === b.baselineVerdict
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
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
              <Button variant="ghost" asChild className="font-medium">
                <a href="/">Single Run</a>
              </Button>
              <Button variant="default" asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="/evals">Eval Lab</a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - 3 Column Grid */}
      <main className="max-w-[1800px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-8">
          {/* LEFT COLUMN - Gate Configuration */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Gate Configuration</h2>
              <p className="text-sm text-slate-600 mt-1">Customize evaluation criteria for each gate</p>
            </div>
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full space-y-2">
                  {Object.entries(GATE_CONFIGS).map(([gateId, config]) => (
                    <AccordionItem key={gateId} value={gateId} className="border-b border-slate-200 last:border-0">
                      <AccordionTrigger className="text-left hover:bg-slate-50 px-3 py-4 rounded-md transition-colors duration-200">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {gateId}
                          </span>
                          <span className="font-medium text-slate-900">{config.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-4 pt-2">
                        <Textarea
                          value={gatePrompts[gateId as keyof typeof gatePrompts]}
                          onChange={(e) =>
                            updateGatePrompt(
                              gateId as keyof typeof gatePrompts,
                              e.target.value
                            )
                          }
                          className="min-h-[200px] font-mono text-xs border-slate-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                          placeholder={`Edit ${config.name} criteria...`}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* CENTER COLUMN - Analyze Button */}
          <div className="flex flex-col items-center justify-start pt-12 space-y-6 xl:min-w-[200px]">
            <Button
              onClick={runAnalysis}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-300 w-full h-12 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Briefs"
              )}
            </Button>

            {isRunning && currentBriefIndex !== null && (
              <div className="text-sm text-slate-600 text-center bg-blue-50 px-4 py-3 rounded-md border border-blue-200 w-full">
                <div className="font-medium text-blue-700">Processing</div>
                <div className="text-xs mt-1">{currentBriefIndex + 1} of {briefs.length} briefs</div>
              </div>
            )}

            {completedBriefs.length > 0 && !isRunning && (
              <div className="text-center space-y-3 mt-8 bg-white p-6 rounded-lg border border-slate-200 shadow-sm w-full">
                <div className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                  Summary
                </div>
                <Badge
                  className={`text-base px-4 py-2 ${
                    matchCount === briefs.length
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {matchCount}/{briefs.length} matched
                </Badge>
                <div className="text-xs text-slate-600 mt-2">
                  {matchCount === briefs.length ? "All verdicts match baseline" : "Some differences detected"}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Test Briefs */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Test Briefs</h2>
              <p className="text-sm text-slate-600 mt-1">Edit and evaluate test cases</p>
            </div>
            <div className="space-y-4">
              {briefs.map((brief) => (
                <Card key={brief.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{brief.name}</span>
                      {brief.status === "loading" && (
                        <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 mb-2 block uppercase tracking-wide">
                        Brief Text
                      </label>
                      <Textarea
                        value={brief.text}
                        onChange={(e) => updateBriefText(brief.id, e.target.value)}
                        className="min-h-[120px] text-sm border-slate-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                        disabled={isRunning}
                      />
                    </div>

                    <div className="border-t border-slate-200 pt-4 space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                          Original Verdict
                        </div>
                        <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-200">
                          {brief.baselineVerdict}
                        </div>
                      </div>

                      {brief.newVerdict && (
                        <div>
                          <div className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
                            New Verdict
                          </div>
                          <div className="text-sm text-slate-700 bg-blue-50 p-3 rounded-md border border-blue-200">
                            {brief.newVerdict}
                          </div>
                        </div>
                      )}

                      {brief.status === "error" && (
                        <div className="text-sm text-red-700 bg-red-50 p-3 rounded-md border border-red-200 font-medium">
                          Error during evaluation
                        </div>
                      )}

                      {getVerdictComparison(brief)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
