"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wand2, Loader2, Copy, Check } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface NameCandidate {
  name: string;
  rationale: string;
  tagline?: string;
}

interface SubtypeResult {
  subtypeKey: string;
  subtypeLabel: string;
  candidates: NameCandidate[];
}

interface StrategyResult {
  strategyKey: string;
  strategyLabel: string;
  subtypes: SubtypeResult[];
}

interface GenerateNamesResult {
  success: boolean;
  markets: string[];
  results: StrategyResult[];
  deepsightsContext: string | null;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STRATEGY_OPTIONS = [
  { key: "descriptors", label: "Descriptors", icon: "📝" },
  { key: "metaphors", label: "Metaphors & Analogies", icon: "🌊" },
  { key: "benefits", label: "Customer Benefits", icon: "⭐" },
  { key: "emotional", label: "Emotional & Aspirational", icon: "💫" },
  { key: "market", label: "Market Position", icon: "🎯" },
];

const MARKET_OPTIONS = ["US", "UK", "DE", "AU", "CA", "JP"];

const PROGRESS_MESSAGES = [
  "Analyzing brief...",
  "Exploring strategies...",
  "Crafting candidates...",
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function NameGeneratorPage() {
  const [brief, setBrief] = useState("");
  const [markets, setMarkets] = useState<string[]>(["US"]);
  const [strategies, setStrategies] = useState<string[]>([
    "descriptors",
    "metaphors",
    "benefits",
    "emotional",
    "market",
  ]);
  const [count, setCount] = useState(3);
  const [useDeepSights, setUseDeepSights] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerateNamesResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [activeSubtype, setActiveSubtype] = useState<Record<string, string>>({});
  const [progressIndex, setProgressIndex] = useState(0);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!brief.trim() || isGenerating) return;
    setIsGenerating(true);
    setError(null);
    setResults(null);
    setProgressIndex(0);

    // Cycle progress messages
    const progressInterval = setInterval(() => {
      setProgressIndex((prev) => (prev + 1) % PROGRESS_MESSAGES.length);
    }, 2000);

    try {
      const res = await fetch("/api/generate-names", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, markets, strategies, count, useDeepSights }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Generation failed");
      setResults(data);
      setGeneratedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

      // Initialize active subtypes to first subtype of each strategy
      const initialSubtypes: Record<string, string> = {};
      data.results.forEach((result: StrategyResult) => {
        if (result.subtypes.length > 0) {
          initialSubtypes[result.strategyKey] = result.subtypes[0].subtypeKey;
        }
      });
      setActiveSubtype(initialSubtypes);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  const handleCopyName = async (name: string) => {
    try {
      await navigator.clipboard.writeText(name);
      setCopiedName(name);
      setTimeout(() => setCopiedName(null), 2000);
    } catch {
      // Clipboard unavailable (non-HTTPS or permission denied) — silent fail
    }
  };

  const toggleMarket = (market: string) => {
    if (market === "US") return; // Always keep US
    setMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    );
  };

  const toggleStrategy = (strategyKey: string) => {
    setStrategies((prev) =>
      prev.includes(strategyKey)
        ? prev.filter((s) => s !== strategyKey)
        : [...prev, strategyKey]
    );
  };

  useEffect(() => {
    document.title = "Name Generator · eBay Naming Studio";
    return () => { document.title = "eBay Naming Studio"; };
  }, []);

  useEffect(() => {
    const prefill = localStorage.getItem("prefill-brief");
    if (prefill) {
      setBrief(prefill);
      localStorage.removeItem("prefill-brief");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1 transition-colors"
            >
              ← Back
            </Link>
            <span className="text-slate-300">|</span>
            <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Wand2 className="h-5 w-5" />
              Name Generator
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Generate product name candidates using the eBay naming strategy framework
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left Panel - Inputs */}
          <div className="w-[35%] space-y-4">
            {/* Brief Input */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product Brief
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe your product, target audience, key features, and market positioning..."
                className="w-full h-32 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none bg-slate-50 focus:bg-white transition-colors"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-400">Describe the product, audience, and key features</span>
                <span className={`text-xs ${brief.length > 4500 ? "text-red-500 font-medium" : "text-slate-400"}`}>
                  {brief.length.toLocaleString()}/5,000
                </span>
              </div>
            </div>

            {/* Markets */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Target Markets
              </label>
              <div className="flex flex-wrap gap-2">
                {MARKET_OPTIONS.map((market) => (
                  <button
                    key={market}
                    type="button"
                    onClick={() => toggleMarket(market)}
                    disabled={market === "US"}
                    title={market === "US" ? "US market is always included" : undefined}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      markets.includes(market)
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    } ${market === "US" ? "cursor-default" : "cursor-pointer"}`}
                  >
                    {market}
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Buckets */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Strategy Buckets
              </label>
              <div className="space-y-2">
                {STRATEGY_OPTIONS.map((strategy) => (
                  <label
                    key={strategy.key}
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 rounded-lg p-2 -mx-2 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={strategies.includes(strategy.key)}
                      onChange={() => toggleStrategy(strategy.key)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-base">{strategy.icon}</span>
                    <span className="text-sm text-slate-700">{strategy.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Count Slider */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Names per Subtype: <span className="text-blue-600">{count}</span>
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1</span>
                <span>5</span>
              </div>
            </div>

            {/* DeepSights Toggle */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-sm font-semibold text-slate-700">Use DeepSights</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Enhanced market intelligence
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={useDeepSights}
                  onChange={(e) => setUseDeepSights(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Generate Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!brief.trim() || isGenerating || strategies.length === 0}
              className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {PROGRESS_MESSAGES[progressIndex]}
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Names
                </>
              )}
            </button>
            {!brief.trim() && !isGenerating && (
              <p className="text-xs text-center text-slate-400 mt-1">Enter a product brief to generate names</p>
            )}
            {brief.trim() && strategies.length === 0 && !isGenerating && (
              <p className="text-xs text-center text-slate-400 mt-1">Select at least one strategy bucket</p>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="flex-1">
            {!results && !error && !isGenerating && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Wand2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Ready to Generate Names
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Enter your product brief, select target markets and strategy buckets, then
                  click Generate Names to receive creative naming candidates.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 rounded-2xl border border-red-200 p-8 text-center">
                <div className="text-red-600 font-semibold mb-2">Generation Failed</div>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {isGenerating && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <div className="text-lg font-semibold text-slate-900 mb-2">
                  {PROGRESS_MESSAGES[progressIndex]}
                </div>
                <div className="text-sm text-slate-500">This may take a moment</div>
              </div>
            )}

            {results && results.results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs text-slate-400">{results.results.length} strategy bucket{results.results.length !== 1 ? "s" : ""} · {results.markets.join(", ")}</span>
                  {generatedAt && <span className="text-xs text-slate-400">Generated at {generatedAt}</span>}
                </div>
                {results.results.map((result) => {
                  const activeSubtypeKey = activeSubtype[result.strategyKey];
                  const activeSubtypeData = result.subtypes.find(
                    (sub) => sub.subtypeKey === activeSubtypeKey
                  );

                  return (
                    <div
                      key={result.strategyKey}
                      className="bg-white rounded-2xl border border-slate-200 p-5"
                    >
                      <h3 className="font-semibold text-slate-900 mb-3 text-base">
                        {result.strategyLabel}
                      </h3>

                      {/* Subtype tabs */}
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {result.subtypes.map((sub) => (
                          <button
                            key={sub.subtypeKey}
                            type="button"
                            onClick={() =>
                              setActiveSubtype((prev) => ({
                                ...prev,
                                [result.strategyKey]: sub.subtypeKey,
                              }))
                            }
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              activeSubtype[result.strategyKey] === sub.subtypeKey
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {sub.subtypeLabel}
                          </button>
                        ))}
                      </div>

                      {/* Active subtype candidates */}
                      {activeSubtypeData && (
                        <div className="grid grid-cols-2 gap-2">
                          {activeSubtypeData.candidates.map((candidate) => (
                            <button
                              key={candidate.name}
                              type="button"
                              onClick={() => handleCopyName(candidate.name)}
                              className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group relative"
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="font-semibold text-slate-900 text-lg">
                                  {candidate.name}
                                </div>
                                {copiedName === candidate.name ? (
                                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                ) : (
                                  <Copy className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                )}
                              </div>
                              {candidate.tagline && (
                                <div className="text-xs text-slate-500 mb-1 italic">
                                  &ldquo;{candidate.tagline}&rdquo;
                                </div>
                              )}
                              <div className="text-xs text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {candidate.rationale}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {results && results.results.length === 0 && (
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center">
                <div className="text-amber-700 font-semibold mb-2">No Results</div>
                <div className="text-sm text-amber-600">
                  No name candidates were generated. Try adjusting your brief or strategy
                  selections.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
