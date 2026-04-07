import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopToolbarProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onUploadClick: () => void;
  disabled?: boolean;
}

const MODELS = {
  "GPT (Azure OpenAI)": [
    {
      value: "azure-chat-completions-gpt-5-2-2025-12-11-sandbox",
      label: "GPT-5.2 (Latest, Reasoning)",
      recommended: true,
    },
    {
      value: "azure-chat-completions-gpt-5-latest-sandbox",
      label: "GPT-5 Latest",
    },
    {
      value: "azure-chat-completions-gpt-5-2025-01-31-sandbox",
      label: "GPT-5 (2025-01-31)",
    },
    {
      value: "azure-chat-completions-gpt-5-mini-2025-01-31-sandbox",
      label: "GPT-5 Mini (Faster)",
    },
    {
      value: "azure-chat-completions-gpt-4.1-sandbox",
      label: "GPT-4.1",
    },
  ],
  "Claude (Anthropic)": [
    {
      value: "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox",
      label: "Claude Sonnet 4.6 (⚠️ 6 req/min)",
    },
    {
      value: "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox",
      label: "Claude Opus 4.6 (⚠️ 6 req/min)",
    },
    {
      value: "gcp-chat-completions-anthropic-claude-haiku-4.5-sandbox",
      label: "Claude Haiku 4.5",
    },
  ],
  "Gemini (Google)": [
    {
      value: "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox",
      label: "Gemini 3.1 Pro (300 req/min)",
    },
    {
      value: "gcp-chat-completions-chat-gemini-3.1-flash-preview-sandbox",
      label: "Gemini 3.1 Flash (Fastest)",
    },
  ],
};

export function TopToolbar({ selectedModel, onModelChange, onUploadClick, disabled }: TopToolbarProps) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-700">Model:</span>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            disabled={disabled}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {Object.entries(MODELS).map(([provider, models]) => (
              <optgroup key={provider} label={provider}>
                {models.map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.label} {"recommended" in model && model.recommended ? "⭐" : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <Button
          onClick={onUploadClick}
          disabled={disabled}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Brief
        </Button>
      </div>
    </div>
  );
}
