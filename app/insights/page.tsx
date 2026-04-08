"use client";

import { useState } from "react";
import { Search, Loader2, BarChart2, FileText, Lightbulb, Newspaper, ChevronLeft } from "lucide-react";
import { toast, Toaster } from "sonner";
import Link from "next/link";
import type { DocumentResult, NewsResult } from "@/lib/deepsights";

type SearchType = "all" | "documents" | "topics" | "news";

interface SearchResults {
  documents?: DocumentResult[];
  topics?: DocumentResult[];
  news?: NewsResult[];
}

const TABS: { value: SearchType; label: string; icon: typeof FileText }[] = [
  { value: "all", label: "All", icon: BarChart2 },
  { value: "documents", label: "Internal Docs", icon: FileText },
  { value: "topics", label: "Topics", icon: Lightbulb },
  { value: "news", label: "News", icon: Newspaper },
];

export default function InsightsPage() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("all");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch("/api/deepsights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim(), type: searchType }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `Search failed (${response.status})`);
      }

      const data = await response.json() as SearchResults;
      setResults(data);
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Search failed";
      const helpfulMsg = msg.includes("not configured")
        ? "DeepSights not configured — contact your administrator"
        : msg.includes("took too long")
        ? "Search timed out — try a shorter query"
        : msg.includes("authentication")
        ? "Authentication failed — check your API key"
        : "Search failed — please try again";

      toast.error(helpfulMsg);
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleSearch();
    }
  };

  // Calculate total results
  const totalResults =
    (results?.documents?.length || 0) +
    (results?.topics?.length || 0) +
    (results?.news?.length || 0);

  // Filter results by selected tab
  const filteredResults = results
    ? searchType === "all"
      ? results
      : { [searchType]: results[searchType] }
    : null;

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <Toaster position="top-center" richColors />

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-slate-900">DeepSights</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Search internal research, reports, and news
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Search bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search eBay market intelligence..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSearching}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <button
              type="button"
              onClick={() => void handleSearch()}
              disabled={!query.trim() || isSearching}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-700 disabled:bg-slate-300 text-white rounded-xl font-medium text-sm transition-colors disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>

          {/* Query length indicator */}
          {query.length > 400 && (
            <div className="mt-2 text-right">
              <span
                className={`text-xs ${
                  query.length > 512 ? "text-red-600 font-semibold" : "text-slate-400"
                }`}
              >
                {query.length}/512 chars{query.length > 512 ? " — too long" : ""}
              </span>
            </div>
          )}
        </div>

        {/* Type tabs */}
        {hasSearched && (
          <div className="flex gap-2 mb-6">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const count = tab.value === "all" ? totalResults : results?.[tab.value]?.length || 0;
              const isActive = searchType === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setSearchType(tab.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-white text-slate-900 border border-slate-200 shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {count > 0 && (
                    <span className="ml-1 text-xs bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Results */}
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-8 w-8 text-slate-400 animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Searching market intelligence...</p>
            </div>
          </div>
        ) : filteredResults ? (
          <div className="space-y-3">
            {/* Documents */}
            {filteredResults.documents?.map((doc, idx) => (
              <ResultCard
                key={`doc-${idx}`}
                type="Internal Doc"
                title={doc.artifactTitle}
                summary={doc.artifactSummary}
                relevanceClass={doc.relevanceClass}
                pageReferences={doc.pageReferences}
              />
            ))}

            {/* Topics */}
            {filteredResults.topics?.map((topic, idx) => (
              <ResultCard
                key={`topic-${idx}`}
                type="Topic"
                title={topic.artifactTitle}
                summary={topic.artifactSummary}
                relevanceClass={topic.relevanceClass}
              />
            ))}

            {/* News */}
            {filteredResults.news?.map((news, idx) => (
              <ResultCard
                key={`news-${idx}`}
                type="News"
                title={news.title}
                summary={news.source}
              />
            ))}

            {/* No results */}
            {totalResults === 0 && (
              <div className="text-center py-16">
                <div className="text-slate-400 mb-3">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-slate-600 font-medium">No results found</p>
                <p className="text-sm text-slate-400 mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        ) : hasSearched ? (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-3">
              <BarChart2 className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-slate-600 font-medium">Search failed</p>
            <p className="text-sm text-slate-400 mt-1">Please try again</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-slate-300 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Search eBay Market Intelligence
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
              Access internal research documents, AI-powered topic analysis, and recent news
              articles to inform your naming decisions.
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-left">
                <FileText className="h-5 w-5 text-blue-600 mb-2" />
                <div className="font-medium text-slate-900 text-sm">Internal Docs</div>
                <div className="text-xs text-slate-400 mt-1">Research reports and insights</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-left">
                <Lightbulb className="h-5 w-5 text-amber-600 mb-2" />
                <div className="font-medium text-slate-900 text-sm">Topic Analysis</div>
                <div className="text-xs text-slate-400 mt-1">AI-powered topic discovery</div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 text-left">
                <Newspaper className="h-5 w-5 text-green-600 mb-2" />
                <div className="font-medium text-slate-900 text-sm">Public News</div>
                <div className="text-xs text-slate-400 mt-1">Industry news and trends</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

interface ResultCardProps {
  type: string;
  title: string;
  summary: string;
  relevanceClass?: "high" | "medium" | "low";
  pageReferences?: number[];
}

function ResultCard({ type, title, summary, relevanceClass, pageReferences }: ResultCardProps) {
  const typeColors: Record<string, string> = {
    "Internal Doc": "bg-blue-100 text-blue-700 border-blue-200",
    "Topic": "bg-amber-100 text-amber-700 border-amber-200",
    "News": "bg-green-100 text-green-700 border-green-200",
  };

  const relevanceColors: Record<string, string> = {
    high: "bg-emerald-100 text-emerald-700 border-emerald-200",
    medium: "bg-blue-100 text-blue-700 border-blue-200",
    low: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
            typeColors[type] || "bg-slate-100 text-slate-600 border-slate-200"
          }`}
        >
          {type}
        </span>
        {relevanceClass && (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${
              relevanceColors[relevanceClass]
            }`}
          >
            {relevanceClass.charAt(0).toUpperCase() + relevanceClass.slice(1)} relevance
          </span>
        )}
      </div>

      <h3 className="font-semibold text-slate-900 mb-2 text-base leading-tight">{title}</h3>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{summary}</p>

      {pageReferences && pageReferences.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            Pages: {pageReferences.slice(0, 5).join(", ")}
            {pageReferences.length > 5 && ` +${pageReferences.length - 5} more`}
          </span>
        </div>
      )}
    </div>
  );
}
