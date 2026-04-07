"use client";

import { CheckCircle2, XCircle, AlertCircle, PauseCircle, Copy, Check } from "lucide-react";
import { useState } from "react";

function inlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="font-mono text-xs bg-black/10 px-1 py-0.5 rounded">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// Maps internal path codes to user-facing labels
const PATH_LABELS: Record<string, string> = {
  PATH_A0: "Do Not Name — Use Inline Copy",
  PATH_A1: "Use a Descriptive Label",
  PATH_A2: "Use a Descriptive Label — Score Below Threshold",
  PATH_B: "More Information Needed",
  PATH_C: "Approved for Naming",
};

interface VerdictBannerProps {
  verdict: string;
  summary?: string[];
  path?: string;
}

const getVerdictStyle = (verdict: string, path?: string) => {
  const v = verdict.toLowerCase();
  const p = path ?? "";
  if (p === "PATH_C" || v.includes("proceed")) {
    return {
      icon: <CheckCircle2 className="h-6 w-6 text-green-600" />,
      bg: "bg-green-50 border-green-200",
      heading: "text-green-900",
      sub: "text-green-700",
      dot: "bg-green-500",
    };
  }
  if (p === "PATH_B" || v.includes("need more") || v.includes("more information")) {
    return {
      icon: <PauseCircle className="h-6 w-6 text-amber-600" />,
      bg: "bg-amber-50 border-amber-200",
      heading: "text-amber-900",
      sub: "text-amber-700",
      dot: "bg-amber-500",
    };
  }
  if (p.startsWith("PATH_A") || v.includes("no proper name") || v.includes("do not name")) {
    return {
      icon: <XCircle className="h-6 w-6 text-red-600" />,
      bg: "bg-red-50 border-red-200",
      heading: "text-red-900",
      sub: "text-red-700",
      dot: "bg-red-500",
    };
  }
  return {
    icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
    bg: "bg-blue-50 border-blue-200",
    heading: "text-blue-900",
    sub: "text-blue-700",
    dot: "bg-blue-500",
  };
};

export function VerdictBanner({ verdict, summary, path }: VerdictBannerProps) {
  const style = getVerdictStyle(verdict, path);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = [verdict, path ? `(${path})` : "", "", ...(summary?.filter(Boolean) ?? [])].join("\n").trim();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`rounded-2xl border p-5 ${style.bg} relative group`}>
      <button
        onClick={handleCopy}
        title="Copy verdict"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-black/5"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
      </button>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <h3 className={`text-base font-bold leading-snug ${style.heading}`}>{inlineMarkdown(verdict)}</h3>
            {path && PATH_LABELS[path] && (
              <span className={`text-xs font-semibold mt-0.5 block ${style.sub} opacity-75`}>
                {PATH_LABELS[path]}
              </span>
            )}
          </div>
          {summary && summary.filter(Boolean).length > 0 && (
            <ul className="space-y-1.5 mt-2">
              {summary.filter(Boolean).map((item, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-sm ${style.sub}`}>
                  <span className={`mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
                  <span className="leading-relaxed">{inlineMarkdown(item)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
