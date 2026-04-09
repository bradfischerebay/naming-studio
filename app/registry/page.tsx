"use client";

import { useState, useEffect } from "react";
import { Download, Loader2, Archive, Lock } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

interface RegistryEntry {
  id: string;
  createdAt: string;
  briefSnippet: string;
  verdictPath: string;
  verdictTitle: string;
  score: number | null;
}

export default function RegistryPage() {
  const [entries, setEntries] = useState<RegistryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const adminKey = sessionStorage.getItem("admin_key") ?? "";
    fetch("/api/registry", { headers: { "x-admin-key": adminKey } })
      .then((res) => {
        if (res.status === 401) { setAuthError(true); return { entries: [] }; }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data.entries)) {
          setEntries(data.entries);
        }
      })
      .catch((err) => {
        console.error("Failed to load registry:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.verdictTitle.toLowerCase().includes(query) ||
      entry.briefSnippet.toLowerCase().includes(query)
    );
  });

  const handleDownloadCSV = () => {
    const csvRows = [
      ["Verdict Title", "Brief Snippet", "Score", "Date", "ID"],
      ...filteredEntries.map((e) => [
        e.verdictTitle,
        e.briefSnippet.replace(/"/g, '""'), // Escape quotes
        e.score !== null ? String(e.score) : "",
        new Date(e.createdAt).toLocaleDateString(),
        e.id,
      ]),
    ];

    const csvContent = csvRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `naming-registry-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen bg-[#f4f4f4] flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Naming Registry</h1>
              <p className="text-sm text-slate-500 mt-1">
                Approved naming decisions from eBay Naming Studio
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isLoading && entries.length > 0 && (
                <>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                    {entries.length} approved {entries.length === 1 ? "name" : "names"}
                  </span>
                  <button
                    onClick={handleDownloadCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download CSV
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        {!isLoading && entries.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or brief snippet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading registry...</span>
            </div>
          </div>
        )}

        {/* Auth error state */}
        {!isLoading && authError && (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">Admin authentication required</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed mb-4">
              Sign in via the Admin page to view the naming registry.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-xl px-4 py-2 transition-colors hover:bg-slate-50"
            >
              Go to Admin →
            </Link>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !authError && entries.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Archive className="h-6 w-6 text-slate-300" />
            </div>
            <h3 className="text-base font-semibold text-slate-900 mb-2">No approved names yet</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed mb-4">
              The Naming Registry shows products that received a <strong className="text-slate-600">PATH_C — Approved for Naming</strong> verdict. Once a brief passes all 6 gates and scores ≥ 60/70, it will appear here.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-xl px-4 py-2 transition-colors hover:bg-slate-50"
            >
              ← Evaluate a brief
            </Link>
          </div>
        )}

        {/* No search results */}
        {!isLoading && entries.length > 0 && filteredEntries.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <p className="text-sm text-slate-500">
              No results found for &ldquo;{searchQuery}&rdquo;
            </p>
          </div>
        )}

        {/* Entries table */}
        {!isLoading && filteredEntries.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Decision
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Brief
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEntries.map((entry) => {
                    const date = new Date(entry.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

                    return (
                      <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900 text-sm">
                            {entry.verdictTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                            {entry.briefSnippet}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {entry.score !== null && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                              {entry.score}/70
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-500">{date}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  );
}
