"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Loader2, Search } from "lucide-react";

interface CorpusEntry {
  hash: string;
  briefSnippet: string;
  firstSeenAt: string;
  lastSeenAt: string;
  runCount: number;
  verdictCounts: Record<string, number>;
  lastVerdictPath: string;
  lastScore: number | null;
  offeringDescription: string | null;
  targetGeographies: string | null;
  approvedForTraining: boolean;
}

const VERDICT_COLORS: Record<string, string> = {
  PATH_C: "bg-green-100 text-green-800",
  PATH_A0: "bg-red-100 text-red-800",
  PATH_A1: "bg-red-100 text-red-800",
  PATH_A2: "bg-orange-100 text-orange-800",
  PATH_B: "bg-yellow-100 text-yellow-800",
};

export default function CorpusPage() {
  const [entries, setEntries] = useState<CorpusEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Brief Corpus · eBay Naming Studio";
  }, []);

  useEffect(() => {
    const fetchCorpus = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/corpus?limit=200");
        if (!res.ok) throw new Error("Failed to load corpus");
        const data = await res.json();
        setEntries(data.entries ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCorpus();
  }, []);

  const handleToggleApproval = async (hash: string, approved: boolean) => {
    // Optimistic update
    setEntries(prev => prev.map(e => e.hash === hash ? { ...e, approvedForTraining: approved } : e));

    try {
      const res = await fetch("/api/corpus", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hash, approved }),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      // Revert on failure
      setEntries(prev => prev.map(e => e.hash === hash ? { ...e, approvedForTraining: !approved } : e));
    }
  };

  const handleDelete = async (hash: string) => {
    if (!window.confirm("Remove this entry from the corpus?")) return;
    setEntries(prev => prev.filter(e => e.hash !== hash));
    await fetch(`/api/corpus?hash=${hash}`, { method: "DELETE" }).catch(() => {});
  };

  const handleExport = (verdict?: string) => {
    const params = new URLSearchParams({ export: "jsonl", format: "anthropic" });
    if (verdict) params.set("verdict", verdict);
    window.open(`/api/corpus?${params.toString()}`, "_blank");
  };

  const filteredEntries = entries
    .filter(e => {
      if (activeFilter === "approved") return e.approvedForTraining;
      if (activeFilter !== "all") return e.lastVerdictPath === activeFilter;
      return true;
    })
    .filter(e => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (e.offeringDescription ?? "").toLowerCase().includes(q) ||
        e.briefSnippet.toLowerCase().includes(q);
    });

  const total = entries.length;
  const approvedCount = entries.filter(e => e.approvedForTraining).length;
  const verdictCounts = entries.reduce((acc, e) => {
    acc[e.lastVerdictPath] = (acc[e.lastVerdictPath] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading corpus...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 font-medium mb-2">Error loading corpus</div>
          <div className="text-sm text-slate-600">{error}</div>
        </div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
            <div className="mt-3">
              <h1 className="text-2xl font-bold text-slate-900">Brief Corpus</h1>
              <p className="text-sm text-slate-600 mt-1">
                Review and approve briefs for fine-tuning datasets
              </p>
            </div>
          </div>
        </div>

        {/* Empty state */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-slate-400 text-lg font-medium">No corpus entries yet</div>
            <div className="text-sm text-slate-500 mt-2">
              Evaluated briefs will appear here automatically
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </div>
          <div className="mt-3">
            <h1 className="text-2xl font-bold text-slate-900">Brief Corpus</h1>
            <p className="text-sm text-slate-600 mt-1">
              Review and approve briefs for fine-tuning datasets
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{total}</div>
            <div className="text-xs text-slate-500 mt-0.5">Total Briefs</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">Approved</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{verdictCounts.PATH_C ?? 0}</div>
            <div className="text-xs text-slate-500 mt-0.5">PATH_C</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{verdictCounts.PATH_A2 ?? 0}</div>
            <div className="text-xs text-slate-500 mt-0.5">PATH_A2</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{(verdictCounts.PATH_A0 ?? 0) + (verdictCounts.PATH_A1 ?? 0)}</div>
            <div className="text-xs text-slate-500 mt-0.5">PATH_A0/A1</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{verdictCounts.PATH_B ?? 0}</div>
            <div className="text-xs text-slate-500 mt-0.5">PATH_B</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {["all", "PATH_C", "PATH_A2", "PATH_A1", "PATH_A0", "PATH_B", "approved"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {filter === "approved" ? "✅ Approved" : filter === "all" ? "All" : filter}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by offering or brief text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleExport("PATH_C")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export PATH_C JSONL
            </button>
            <button
              onClick={() => handleExport()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export All Approved
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Brief
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Verdict
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Runs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Last Seen
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Approved
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredEntries.map(entry => (
                  <tr key={entry.hash} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-sm text-slate-900 font-medium line-clamp-2 max-w-xs">
                        {entry.offeringDescription ?? entry.briefSnippet}
                      </div>
                      {entry.targetGeographies && (
                        <div className="text-xs text-slate-400 mt-0.5">{entry.targetGeographies}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${VERDICT_COLORS[entry.lastVerdictPath] ?? "bg-slate-100 text-slate-700"}`}>
                        {entry.lastVerdictPath}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{entry.lastScore ?? "—"}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{entry.runCount}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">
                      {new Date(entry.lastSeenAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleApproval(entry.hash, !entry.approvedForTraining)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          entry.approvedForTraining
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                      >
                        {entry.approvedForTraining ? "✓ Approved" : "Approve"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(entry.hash)}
                        className="text-slate-400 hover:text-red-500 transition-colors text-lg leading-none"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              No entries match your filter
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-4 text-xs text-slate-500 text-center">
          Showing {filteredEntries.length} of {total} entries
        </div>
      </div>
    </div>
  );
}
