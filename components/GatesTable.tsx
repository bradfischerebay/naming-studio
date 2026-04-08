"use client";

import { CheckCircle2, XCircle, AlertCircle, HelpCircle, ShieldCheck } from "lucide-react";
import type { GatekeeperResult, GateStatus } from "@/lib/schemas";

interface GatesTableProps {
  gateResults: GatekeeperResult;
}

const GATE_LABELS: Record<string, string> = {
  G0: "Interaction Model",
  G1: "Integration Level",
  G2: "Standalone Architecture",
  G3: "Strategic Lifespan",
  G4: "Portfolio Alignment",
  G5: "Legal & Localization",
};

const GATE_CRITERIA: Record<string, string> = {
  G0: "User actively selects, toggles, or sees this feature",
  G1: "Distinct enrollment or checkout separate from platform",
  G2: "Dedicated backend services and data boundaries",
  G3: "Permanent addition, 12+ months strategic lifespan",
  G4: "No naming collisions with existing eBay products",
  G5: "No trademark conflicts or regulatory blockers",
};

const STATUS_CONFIG: Record<GateStatus, {
  icon: React.ReactNode;
  label: string;
  rowClass: string;
  badgeClass: string;
}> = {
  Pass: {
    icon: <CheckCircle2 className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />,
    label: "Pass",
    rowClass: "",
    badgeClass: "bg-green-50 text-green-800 border-green-200",
  },
  Fail: {
    icon: <XCircle className="h-3.5 w-3.5 text-red-500 flex-shrink-0" />,
    label: "Fail",
    rowClass: "bg-red-50/50",
    badgeClass: "bg-red-50 text-red-800 border-red-200",
  },
  Pending: {
    icon: <AlertCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />,
    label: "Pending",
    rowClass: "bg-amber-50/50",
    badgeClass: "bg-amber-50 text-amber-800 border-amber-200",
  },
  Unknown: {
    icon: <HelpCircle className="h-3.5 w-3.5 text-amber-500 flex-shrink-0" />,
    label: "Unknown",
    rowClass: "bg-amber-50/30",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

const STATUS_ORDER: Record<GateStatus, number> = { Pass: 0, Pending: 1, Unknown: 2, Fail: 3 };

export function GatesTable({ gateResults }: GatesTableProps) {
  const gates = (Object.entries(gateResults) as [
    keyof typeof GATE_LABELS,
    { status: GateStatus; label?: string; reasoning: string; evidence?: string }
  ][]).sort(([, a], [, b]) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]);

  const passed = gates.filter(([, g]) => g.status === "Pass").length;
  const total = gates.length;
  const allPassed = passed === total;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Gate Evaluation</p>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
          allPassed
            ? "bg-green-50 text-green-800 border-green-200"
            : passed === 0
              ? "bg-red-50 text-red-800 border-red-200"
              : "bg-amber-50 text-amber-800 border-amber-200"
        }`}>
          <ShieldCheck className="h-3 w-3" />
          {passed}/{total} gates passed
        </span>
      </div>
    <div className="w-full overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-xs" style={{ minWidth: "640px" }}>
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-left px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wide text-[10px] w-12 whitespace-nowrap">Gate</th>
            <th className="text-left px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wide text-[10px] w-24 whitespace-nowrap">Result</th>
            <th className="text-left px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wide text-[10px] w-40">Criterion</th>
            <th className="text-left px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wide text-[10px]">Evidence</th>
            <th className="text-left px-3 py-2.5 font-semibold text-slate-500 uppercase tracking-wide text-[10px]">Rationale</th>
          </tr>
        </thead>
        <tbody>
          {gates.map(([gateId, gate], i) => {
            const config = STATUS_CONFIG[gate.status];
            const isLast = i === gates.length - 1;

            return (
              <tr
                key={gateId}
                className={`group ${config.rowClass} ${!isLast ? "border-b border-slate-200" : ""}`}
              >
                {/* Gate ID */}
                <td className="px-3 py-3 align-top">
                  <span className="font-mono font-bold text-slate-500 text-[11px]">{gateId}</span>
                </td>

                {/* Status */}
                <td className="px-3 py-3 align-top">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border whitespace-nowrap ${config.badgeClass}`}>
                    {config.icon}
                    {config.label}
                  </span>
                </td>

                {/* Criterion */}
                <td className="px-3 py-3 align-top">
                  <div>
                    <div className="font-semibold text-slate-700 text-[11px] leading-snug">
                      {gate.label || GATE_LABELS[gateId]}
                    </div>
                    <div className="text-slate-500 text-[10px] mt-0.5 leading-snug">
                      {GATE_CRITERIA[gateId]}
                    </div>
                    {gate.reasoning && (
                      <p className={`text-xs italic mt-1 leading-snug ${
                        gate.status === "Pass"
                          ? "text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity"
                          : "text-red-600"
                      }`}>
                        {gate.reasoning}
                      </p>
                    )}
                  </div>
                </td>

                {/* Evidence */}
                <td className="px-3 py-3 align-top">
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {gate.evidence || "No evidence recorded."}
                  </p>
                </td>

                {/* Rationale - kept for backward compatibility but can be removed if duplicate */}
                <td className="px-3 py-3 align-top">
                  <p className="text-slate-700 leading-relaxed text-[11px]">
                    {gate.reasoning}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
