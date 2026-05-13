"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronRight, Paperclip, X, Loader2 } from "lucide-react";
import type { StructuredMessage, SelectOption } from "@/lib/models/assistant-message";

// ── Props ──────────────────────────────────────────────────────────────────────

interface RendererProps {
  message: StructuredMessage;
  messageId: string;
  accentColor?: string; // tailwind bg class, e.g. "bg-teal-600" — matches the assistant's brand color
  onSubmit: (label: string, id: string, otherText?: string) => void;
  isSubmitted?: boolean;
  submittedLabel?: string;
}

// ── SubmittedState ─────────────────────────────────────────────────────────────

function SubmittedState({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
        <Check className="w-3 h-3 text-teal-600" strokeWidth={2.5} />
      </span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}

// ── ChoiceCard ──────────────────────────────────────────────────────────────────

function ChoiceCard({
  option,
  isSelected,
  onSelect,
}: {
  option: SelectOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={[
        "w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 group",
        isSelected
          ? "border-teal-500 bg-teal-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/40 hover:shadow-sm",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all duration-150 flex items-center justify-center",
            isSelected
              ? "border-teal-500 bg-teal-500"
              : "border-gray-300 group-hover:border-teal-400",
          ].join(" ")}
        >
          {isSelected && (
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </span>
        <div className="min-w-0">
          <p
            className={[
              "text-sm font-medium leading-snug transition-colors",
              isSelected ? "text-teal-900" : "text-gray-800 group-hover:text-gray-900",
            ].join(" ")}
          >
            {option.label}
          </p>
          {option.description && (
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
              {option.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

// ── OtherTextInput ─────────────────────────────────────────────────────────────

function OtherTextInput({
  visible,
  value,
  onChange,
}: {
  visible: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (visible) setTimeout(() => ref.current?.focus(), 150);
  }, [visible]);

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: visible ? "120px" : "0px", opacity: visible ? 1 : 0 }}
    >
      <div className="pt-2">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tell me what you have in mind…"
          rows={3}
          className="w-full px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl bg-white resize-none focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
        />
      </div>
    </div>
  );
}

// ── PromptChips ────────────────────────────────────────────────────────────────

function PromptChips({
  chips,
  onChipClick,
}: {
  chips: string[];
  onChipClick: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => onChipClick(chip)}
          className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-all duration-150"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

// ── SingleSelectBlock ──────────────────────────────────────────────────────────

function SingleSelectBlock({
  message,
  onSubmit,
}: {
  message: StructuredMessage;
  onSubmit: (label: string, id: string, otherText?: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const options = message.options ?? [];
  const selectedOption = options.find((o) => o.id === selected);
  const needsText = selectedOption?.requiresText ?? false;
  const canSubmit = selected !== null && (!needsText || otherText.trim().length > 0);

  const handleSubmit = () => {
    if (!selected || !selectedOption) return;
    onSubmit(selectedOption.label, selected, needsText ? otherText.trim() : undefined);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <ChoiceCard
          key={option.id}
          option={option}
          isSelected={selected === option.id}
          onSelect={setSelected}
        />
      ))}

      {/* "Other" text reveal */}
      <OtherTextInput
        visible={needsText}
        value={otherText}
        onChange={setOtherText}
      />

      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={[
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150",
            canSubmit
              ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm shadow-teal-100"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          {message.submitLabel ?? "Continue"}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── MultiSelectBlock ───────────────────────────────────────────────────────────

function MultiSelectBlock({
  message,
  onSubmit,
}: {
  message: StructuredMessage;
  onSubmit: (label: string, id: string) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const options = message.options ?? [];

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    const labels = options.filter((o) => selected.has(o.id)).map((o) => o.label);
    if (labels.length === 0) return;
    onSubmit(labels.join(", "), [...selected].join(","));
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => toggle(option.id)}
          className={[
            "w-full text-left px-4 py-3 rounded-xl border transition-all duration-150 flex items-start gap-3",
            selected.has(option.id)
              ? "border-teal-500 bg-teal-50"
              : "border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/40",
          ].join(" ")}
        >
          <span
            className={[
              "mt-0.5 w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all",
              selected.has(option.id)
                ? "border-teal-500 bg-teal-500"
                : "border-gray-300",
            ].join(" ")}
          >
            {selected.has(option.id) && (
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
            )}
          </span>
          <div>
            <p className="text-sm font-medium text-gray-800">{option.label}</p>
            {option.description && (
              <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
            )}
          </div>
        </button>
      ))}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={selected.size === 0}
          className={[
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all",
            selected.size > 0
              ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          {message.submitLabel ?? "Continue"} {selected.size > 0 && `(${selected.size})`}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── SuggestedAnswerChips ───────────────────────────────────────────────────────

function SuggestedAnswerChips({
  chips,
  label,
  onSelect,
}: {
  chips: string[];
  label?: string;
  onSelect: (chip: string) => void;
}) {
  return (
    <div className="mb-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-600 mb-2">
        {label ?? "Suggested answers"}
      </p>
      <div className="flex flex-col gap-1.5">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSelect(chip)}
            className="w-full text-left px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800 transition-all duration-150 flex items-center justify-between group"
          >
            <span>{chip}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-teal-500 flex-shrink-0" />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-4 mb-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-[10px] text-gray-400 uppercase tracking-widest">or write your own</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
    </div>
  );
}

// ── FreeTextPrompt ─────────────────────────────────────────────────────────────

function FreeTextPrompt({
  message,
  onSubmit,
}: {
  message: StructuredMessage;
  onSubmit: (label: string, id: string, fullText?: string) => void;
}) {
  const [text, setText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; text: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!message.chipsAutoSubmit) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [message.chipsAutoSubmit]);

  const handleChipFill = (chip: string) => {
    setText((prev) => (prev.trim() ? `${prev.trim()} ${chip}` : chip));
    textareaRef.current?.focus();
  };

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    const added: { name: string; text: string }[] = [];
    for (const file of Array.from(files)) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (res.ok) {
          const data = (await res.json()) as { text: string };
          added.push({ name: file.name, text: data.text });
        }
      } catch { /* silent — file just won't appear */ }
    }
    setUploadedFiles((prev) => [...prev, ...added]);
    setUploading(false);
  };

  const removeFile = (index: number) => setUploadedFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    const parts: string[] = [];
    uploadedFiles.forEach((f) => parts.push(`[Attached: ${f.name}]\n${f.text}`));
    if (text.trim()) parts.push(text.trim());
    const combined = parts.join("\n\n---\n\n");
    if (!combined) return;
    const displayText = [
      ...uploadedFiles.map((f) => f.name),
      text.trim() ? text.trim().slice(0, 60) + (text.trim().length > 60 ? "…" : "") : "",
    ].filter(Boolean).join(", ");
    // Pass full combined text as third arg so callers can store untruncated content
    onSubmit(displayText || combined.slice(0, 80), "free_text", combined);
  };

  const canSubmit = !!text.trim() || uploadedFiles.length > 0;
  const rows = message.textareaRows ?? 3;

  return (
    <div>
      {/* Auto-submit chips */}
      {message.chipsAutoSubmit && message.chips && message.chips.length > 0 && (
        <SuggestedAnswerChips
          chips={message.chips}
          label={message.chipsLabel}
          onSelect={(chip) => onSubmit(chip, "chip_select")}
        />
      )}

      {/* File upload zone */}
      {message.allowFileUpload && (
        <div className="mb-3">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => { if (e.target.files?.length) { void handleFiles(e.target.files); e.target.value = ""; } }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-gray-300 text-xs text-gray-500 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50/40 transition-all w-full justify-center disabled:opacity-50"
          >
            {uploading
              ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Uploading…</>
              : <><Paperclip className="w-3.5 h-3.5" />Attach files (PDF, DOCX, TXT)</>
            }
          </button>
          {uploadedFiles.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {uploadedFiles.map((f, i) => (
                <span key={i} className="flex items-center gap-1 text-xs bg-teal-50 border border-teal-200 text-teal-700 px-2.5 py-1 rounded-full">
                  {f.name}
                  <button type="button" onClick={() => removeFile(i)} className="hover:text-teal-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !message.allowFileUpload) { e.preventDefault(); handleSubmit(); }
        }}
        placeholder={message.placeholder ?? "Type your answer…"}
        rows={rows}
        className="w-full px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 rounded-xl bg-white resize-y focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
      />

      {/* Fill-only chips (shown below textarea when not auto-submit) */}
      {!message.chipsAutoSubmit && message.chips && message.chips.length > 0 && (
        <PromptChips chips={message.chips} onChipClick={handleChipFill} />
      )}

      <div className="pt-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={[
            "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all",
            canSubmit
              ? "bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed",
          ].join(" ")}
        >
          {message.submitLabel ?? "Send"}
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── ConfirmationBlock ──────────────────────────────────────────────────────────

function ConfirmationBlock({
  message,
  onSubmit,
}: {
  message: StructuredMessage;
  onSubmit: (label: string, id: string) => void;
}) {
  return (
    <div className="flex gap-2 pt-1">
      <button
        type="button"
        onClick={() => onSubmit(message.confirmLabel ?? "Confirmed", "confirm")}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 shadow-sm transition-all"
      >
        <Check className="w-3.5 h-3.5" />
        {message.confirmLabel ?? "Confirm"}
      </button>
      <button
        type="button"
        onClick={() => onSubmit(message.cancelLabel ?? "Cancelled", "cancel")}
        className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
      >
        {message.cancelLabel ?? "Cancel"}
      </button>
    </div>
  );
}

// ── StructuredResponseRenderer (main export) ───────────────────────────────────

export function StructuredResponseRenderer({
  message,
  messageId,
  onSubmit,
  isSubmitted = false,
  submittedLabel,
}: RendererProps) {
  if (isSubmitted) {
    return <SubmittedState label={submittedLabel ?? "Response submitted"} />;
  }

  if (message.type === "plain_text") return null;

  return (
    <div className="space-y-3">
      {/* Step label + heading */}
      {(message.title || message.heading) && (
        <div>
          {message.title && (
            <p className="text-[10px] font-semibold uppercase tracking-widest text-teal-600 mb-1">
              {message.title}
            </p>
          )}
          {message.heading && (
            <p className="text-sm font-semibold text-gray-900">{message.heading}</p>
          )}
          {message.prompt && (
            <p className="text-xs text-gray-500 mt-0.5">{message.prompt}</p>
          )}
        </div>
      )}

      {/* Render by type — add new cases here as the schema grows */}
      {(message.type === "single_select" || message.type === "single_select_with_other") && (
        <SingleSelectBlock message={message} onSubmit={onSubmit} />
      )}
      {message.type === "multi_select" && (
        <MultiSelectBlock message={message} onSubmit={onSubmit} />
      )}
      {message.type === "free_text_prompt" && (
        <FreeTextPrompt message={message} onSubmit={onSubmit} />
      )}
      {message.type === "confirmation" && (
        <ConfirmationBlock message={message} onSubmit={onSubmit} />
      )}
    </div>
  );
}
