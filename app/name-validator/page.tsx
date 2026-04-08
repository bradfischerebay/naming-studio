"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BadgeCheck, Loader2, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CheckDetail {
  status: "pass" | "caution" | "fail";
  notes: string;
}

interface CheckResult {
  name: string;
  overall: "proceed" | "caution" | "avoid";
  score: number;
  checks: {
    naming_protocol: CheckDetail;
    portfolio_conflict: CheckDetail;
    brief_alignment: CheckDetail;
    distinctiveness: CheckDetail;
    cross_market_fit: CheckDetail;
  };
  recommendation: string;
  strengths: string[];
  concerns: string[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MARKET_OPTIONS = ["US", "UK", "DE", "AU", "CA", "JP"];

const statusColors = {
  pass: { bg: "bg-green-50", text: "text-green-700", icon: "✅", label: "Pass" },
  caution: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "⚠️", label: "Caution" },
  fail: { bg: "bg-red-50", text: "text-red-700", icon: "❌", label: "Fail" },
};

const overallColors = {
  proceed: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-300",
    dot: "🟢",
  },
  caution: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
    dot: "🟡",
  },
  avoid: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", dot: "🔴" },
};

const CHECK_LABELS: Record<string, string> = {
  naming_protocol: "Naming Protocol",
  portfolio_conflict: "Portfolio Conflict",
  brief_alignment: "Brief Alignment",
  distinctiveness: "Distinctiveness",
  cross_market_fit: "Cross-Market Fit",
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function NameValidatorPage() {
  const [nameInput, setNameInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [brief, setBrief] = useState("");
  const [markets, setMarkets] = useState<string[]>(["US"]);
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === ",") && nameInput.trim()) {
      e.preventDefault();
      const newName = nameInput.trim().replace(/,/g, "");
      if (newName && !names.includes(newName) && names.length < 10) {
        setNames((prev) => [...prev, newName]);
      }
      setNameInput("");
    }
  };

  const removeName = (name: string) => {
    setNames((prev) => prev.filter((n) => n !== name));
  };

  const toggleMarket = (market: string) => {
    if (market === "US") return; // Always keep US
    setMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    );
  };

  useEffect(() => {
    document.title = "Name Validator · eBay Naming Studio";
    return () => { document.title = "eBay Naming Studio"; };
  }, []);

  const handleCheck = async () => {
    // Flush any unsubmitted name in the text input
    const pendingName = nameInput.trim().replace(/,/g, "");
    let finalNames = names;
    if (pendingName && !names.includes(pendingName) && names.length < 10) {
      finalNames = [...names, pendingName];
      setNames(finalNames);
      setNameInput("");
    }
    if (!finalNames.length || !brief.trim() || isChecking) return;
    setIsChecking(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch("/api/check-name-guidelines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ names: finalNames, brief, markets }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Check failed");

      // Sort results: proceed first, then caution, then avoid
      const sortOrder = { proceed: 0, caution: 1, avoid: 2 };
      const sortedResults = data.results.sort(
        (a: CheckResult, b: CheckResult) =>
          sortOrder[a.overall] - sortOrder[b.overall]
      );
      setResults(sortedResults);
      setCheckedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsChecking(false);
    }
  };

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
              <BadgeCheck className="h-5 w-5" />
              Name Validator
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Check proposed names against eBay&apos;s naming guidelines and market fit
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Left Panel - Inputs */}
          <div className="w-[40%] space-y-4">
            {/* Names Input */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">
                  Names to Check{" "}
                  <span className="text-slate-400 font-normal text-xs">(Enter or comma to add)</span>
                </label>
                <span className={`text-xs font-medium ${names.length >= 10 ? "text-red-500" : "text-slate-400"}`}>
                  {names.length}/10
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {names.map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-sm"
                  >
                    <span>{name}</span>
                    <button
                      type="button"
                      onClick={() => removeName(name)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={handleNameKeyDown}
                placeholder="Add a name..."
                disabled={names.length >= 10}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 bg-slate-50 focus:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Brief Context */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Product Brief Context
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Provide context about your product to evaluate name alignment..."
                className="w-full h-32 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none bg-slate-50 focus:bg-white transition-colors"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-400">Provide context for accurate evaluation</span>
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

            {/* Check Button */}
            <button
              type="button"
              onClick={handleCheck}
              disabled={(!names.length && !nameInput.trim()) || !brief.trim() || isChecking}
              className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking Names...
                </>
              ) : (
                <>
                  <BadgeCheck className="h-4 w-4" />
                  Check Names
                </>
              )}
            </button>
            {!names.length && !nameInput.trim() && !isChecking && (
              <p className="text-xs text-center text-slate-400 mt-1">Add at least one name to check</p>
            )}
            {(names.length > 0 || nameInput.trim()) && !brief.trim() && !isChecking && (
              <p className="text-xs text-center text-slate-400 mt-1">Add a product brief for context</p>
            )}
          </div>

          {/* Right Panel - Results */}
          <div className="flex-1">
            {!results && !error && !isChecking && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <BadgeCheck className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Ready to Validate Names
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Add up to 10 name candidates, provide your product brief context, select
                  target markets, then click Check Names to receive validation results.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 rounded-2xl border border-red-200 p-8 text-center">
                <div className="text-red-600 font-semibold mb-2">Validation Failed</div>
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            {isChecking && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <div className="text-lg font-semibold text-slate-900 mb-2">
                  Checking Names...
                </div>
                <div className="text-sm text-slate-500">Evaluating against guidelines</div>
              </div>
            )}

            {results && results.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs text-slate-400">{results.length} name{results.length !== 1 ? "s" : ""} evaluated · {markets.join(", ")}</span>
                  {checkedAt && <span className="text-xs text-slate-400">Checked at {checkedAt}</span>}
                </div>
                {results.map((result) => {
                  const overallColor = overallColors[result.overall];
                  const scoreColor =
                    result.score >= 80
                      ? "bg-green-500"
                      : result.score >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500";

                  return (
                    <div
                      key={result.name}
                      className={`rounded-2xl border-2 ${overallColor.border} overflow-hidden`}
                    >
                      {/* Header */}
                      <div
                        className={`${overallColor.bg} px-5 py-4 flex items-center justify-between`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{overallColor.dot}</span>
                          <div>
                            <div className={`text-xl font-bold ${overallColor.text}`}>
                              {result.name}
                            </div>
                            <div
                              className={`text-sm font-medium ${overallColor.text} opacity-75 capitalize`}
                            >
                              {result.overall}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${overallColor.text}`}>
                            {result.score}
                          </div>
                          <div className={`text-xs ${overallColor.text} opacity-75`}>
                            / 100
                          </div>
                        </div>
                      </div>

                      {/* Score bar */}
                      <div className="h-1.5 bg-slate-100">
                        <div
                          className={`h-full transition-all ${scoreColor}`}
                          style={{ width: `${result.score}%` }}
                        />
                      </div>

                      {/* Checks table */}
                      <div className="p-5">
                        <div className="space-y-2 mb-4">
                          {Object.entries(result.checks).map(([key, check]) => (
                            <div key={key} className="flex items-start gap-3">
                              <span className="text-sm mt-0.5">
                                {statusColors[check.status].icon}
                              </span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-slate-700">
                                    {CHECK_LABELS[key]}
                                  </span>
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                      statusColors[check.status].bg
                                    } ${statusColors[check.status].text}`}
                                  >
                                    {statusColors[check.status].label}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">{check.notes}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Strengths */}
                        {result.strengths.length > 0 && (
                          <div className="mb-3">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                              Strengths
                            </div>
                            {result.strengths.map((s, i) => (
                              <div
                                key={i}
                                className="text-sm text-slate-700 flex gap-2 mb-0.5"
                              >
                                <span className="text-green-500">+</span>
                                {s}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Concerns */}
                        {result.concerns.length > 0 && (
                          <div className="mb-3">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                              Concerns
                            </div>
                            {result.concerns.map((c, i) => (
                              <div
                                key={i}
                                className="text-sm text-slate-700 flex gap-2 mb-0.5"
                              >
                                <span className="text-yellow-500">!</span>
                                {c}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Recommendation */}
                        <div className="bg-slate-50 rounded-lg p-3 mt-3">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                            Recommendation
                          </div>
                          <p className="text-sm text-slate-700">{result.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
