"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";

const INTAKE_TEXT = `eBay Naming Studio — AI Intake Summary

USE CASE: Internal governance tool for evaluating product naming briefs against eBay's naming framework. Advisory only — all decisions require human review. Internal users: naming decision-makers, product managers, brand team.

RISK LABEL: Low. No autonomous actions. Human in the loop for all decisions. Internal tool only. No consumer-facing AI outputs.

AI CAPABILITIES:
- Brief evaluation: LLM-assisted 6-gate deterministic framework (G0-G5)
- Clarification: LLM generates targeted questions for incomplete briefs
- Document parsing: PDF/DOCX/TXT extraction (in-memory, not persisted)
- Similarity search: VP2 embeddings for institutional memory retrieval
- Research: Optional competitive landscape analysis (disabled by default)

MODELS & INFRA: eBay Chomsky Gateway (internal). Default: GPT-5.2 (Azure). Embeddings: Vector Prime 2 (ebay-internal-sandbox-vector-prime-2). Storage: Upstash Redis (brief snippets, metrics only).

DATA: No PII. Input: naming briefs (text/docs). Stored: brief snippets (300 chars max), verdict path, score, embeddings. Analytics: aggregate metrics only. Files processed in-memory, not persisted.

HUMAN OVERSIGHT: Advisory verdicts only. Rate-limited (5-10 req/min/IP). 6-gate deterministic evaluation. Full audit trail in /analytics and /registry. No autonomous system actions.

MONITORING: Analytics dashboard (/analytics), naming registry (/registry), server-side error logging, VPN-gated API access.

TRANSPARENCY: Every verdict UI states "AI-generated recommendation — human review recommended." Export formats include Markdown, Slack, Confluence, and JSON for documentation.`;

export default function GovernancePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INTAKE_TEXT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen bg-[#f4f4f4] flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-slate-900">AI Governance</h1>
          <p className="text-sm text-slate-500 mt-1">
            Responsible AI documentation for eBay Naming Studio · AI Intake reference
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 1. Use Case */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Use Case</h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
              Low Risk
            </span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            eBay Naming Studio is an internal governance tool that evaluates product naming briefs against eBay's naming framework.
            It assists naming decision-makers by running structured gate evaluations and returning an advisory verdict.
            All decisions require human review before implementation.
          </p>
        </div>

        {/* 2. AI Capabilities */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">AI Capabilities</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Brief evaluation</strong> — 6-gate deterministic framework with LLM reasoning assistance
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Clarification questions</strong> — LLM generates targeted questions when brief is incomplete
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Document parsing</strong> — Extracts text from uploaded PDF, DOCX, TXT files
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Brief similarity</strong> — VP2 embeddings (Vector Prime 2) for institutional memory retrieval
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Competitive landscape research</strong> — Optional web research via LLM (disabled by default)
              </span>
            </li>
          </ul>
        </div>

        {/* 3. Models & Infrastructure */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Models &amp; Infrastructure</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Gateway:</strong> eBay Chomsky Gateway (internal, no external API exposure)
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Default model:</strong> GPT-5.2 (Azure, internal)
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Available models:</strong> Claude Sonnet 4.6, Claude Opus 4.6, Gemini 3.1 Pro, GPT-5 variants
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Embeddings:</strong> ebay-internal-sandbox-vector-prime-2 (VP2)
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Storage:</strong> Upstash Redis (brief memory, analytics, lab history)
              </span>
            </li>
          </ul>
        </div>

        {/* 4. Data Processed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Data Processed</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Input:</strong> Product naming briefs (text/documents). No PII collected.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Storage:</strong> Brief snippets (300 chars), verdict path, score, VP2 embeddings stored in Redis for similarity search (max 500 entries, auto-pruned)
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Analytics:</strong> Aggregate usage metrics (verdict distribution, model usage, duration). No brief text stored in analytics beyond the session.
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Files:</strong> Documents processed in-memory only; not persisted after text extraction.
              </span>
            </li>
          </ul>
        </div>

        {/* 5. Human Oversight & Safeguards */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Human Oversight &amp; Safeguards</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Advisory only:</strong> All verdicts are explicitly framed as recommendations requiring human review
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Rate limiting:</strong> 5 uploads/min, 10 evaluations/min per IP
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Gate framework:</strong> 6 deterministic governance gates evaluated for every brief
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">Audit trail:</strong> All evaluations logged with timestamp, model, verdict, and score
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">No autonomous actions:</strong> The tool never creates Jira tickets, sends messages, or modifies systems without explicit user action
              </span>
            </li>
          </ul>
        </div>

        {/* 6. Monitoring & Compliance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Monitoring &amp; Compliance</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                Analytics dashboard at <Link href="/analytics" className="underline hover:text-slate-900">/analytics</Link> tracks verdict distribution, model usage, error rates, and evaluation duration
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                Naming Registry at <Link href="/registry" className="underline hover:text-slate-900">/registry</Link> provides audit trail of all PATH_C (approved) decisions
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                Rate limiting prevents abuse; all API routes require valid eBay VPN connection
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>
                <strong className="font-semibold">No external data sharing:</strong> all LLM calls go through the internal Chomsky gateway
              </span>
            </li>
          </ul>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              Copied ✓
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              Copy for AI Intake
            </>
          )}
        </button>
      </div>
      </div>
    </div>
  );
}
