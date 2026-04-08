"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Scale, Shield, Globe2, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LegalScreenPage() {
  useEffect(() => {
    document.title = "Legal Screen · eBay Naming Studio";
    return () => { document.title = "eBay Naming Studio"; };
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-700 text-sm flex items-center gap-1 transition-colors"
            >
              ← Back
            </Link>
            <span className="text-slate-300">|</span>
            <h1 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Legal Screen
            </h1>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Step 4 of the naming workflow — preliminary trademark and regulatory signals
          </p>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Workflow progress */}
        <div className="flex items-center gap-2 mb-12 justify-center">
          {[
            { step: "1", label: "Evaluate Brief", done: true },
            { step: "2", label: "Generate Names", done: true },
            { step: "3", label: "Validate Names", done: true },
            { step: "4", label: "Legal Screen", done: false, active: true },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                item.active
                  ? "bg-slate-900 text-white"
                  : item.done
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-400"
              }`}>
                <span className={`text-[10px] font-bold px-1 rounded ${
                  item.active ? "bg-white/20 text-white" : item.done ? "bg-green-200 text-green-700" : "bg-slate-200 text-slate-400"
                }`}>{item.step}</span>
                {item.label}
              </div>
              {idx < 3 && <span className="text-slate-300 text-xs">→</span>}
            </div>
          ))}
        </div>

        {/* Coming soon card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center mb-8">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Legal Screen is in pilot</h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto mb-8">
            This step provides directional trademark signals from US, EU, and AU trademark registries before
            engaging Legal for a full clearance search. It helps teams understand legal risk early,
            without committing to a full search cycle.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <Clock className="h-4 w-4" />
            Available Q3 2026 · Contact Legal for manual search in the meantime
          </div>
        </div>

        {/* What it will do */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Shield,
              title: "US Trademark Search",
              desc: "Directional signal from USPTO TESS database for class 35, 36, and 42 marks.",
            },
            {
              icon: Globe2,
              title: "EU & AU Coverage",
              desc: "EUIPO and IP Australia registry checks for international naming candidates.",
            },
            {
              icon: CheckCircle2,
              title: "Risk Scoring",
              desc: "Pass / Caution / Flag signal per name, with guidance on when to engage Legal.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-5">
              <Icon className="h-5 w-5 text-slate-400 mb-3" />
              <div className="font-semibold text-slate-900 text-sm mb-1.5">{title}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Manual fallback */}
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <Scale className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-blue-900 mb-1">In the meantime: manual trademark search</div>
              <p className="text-sm text-blue-800 leading-relaxed mb-3">
                Submit candidate names directly to Legal for a full trademark clearance search. Use the
                eBay internal legal request portal or contact your PMM Legal partner.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/name-validator"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  ← Validate names first
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
