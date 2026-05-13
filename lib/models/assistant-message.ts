// Schema for structured assistant messages — rendered as interactive UI inside the chat thread.
// Connect to a real LLM response parser by mapping the model's JSON output to these types.

export type StructuredMessageType =
  | "plain_text"           // normal markdown bubble (no interactive block)
  | "single_select"        // pick exactly one option, no free-text escape
  | "single_select_with_other" // pick one, or "Other" which reveals a text field
  | "multi_select"         // pick one or more options
  | "free_text_prompt"     // inline textarea with optional suggestion chips
  | "confirmation";        // confirm / cancel a proposed action

export interface SelectOption {
  id: string;
  label: string;
  description?: string;
  requiresText?: boolean; // reveals OtherTextInput when selected
}

export interface StructuredMessage {
  type: StructuredMessageType;
  step?: string;           // e.g. "step_1" — used for logging / analytics
  title?: string;          // small eyebrow label: "Step 1"
  heading?: string;        // primary question heading
  prompt?: string;         // supporting sub-prompt
  options?: SelectOption[]; // for select types
  submitLabel?: string;    // CTA button text, default "Continue"
  placeholder?: string;    // for free_text_prompt textarea
  chips?: string[];        // suggestion chips for free_text_prompt
  chipsAutoSubmit?: boolean; // when true, clicking a chip submits immediately instead of filling textarea
  chipsLabel?: string;       // label above auto-submit chips, e.g. "Suggested answers"
  textareaRows?: number;    // number of rows for the textarea (default 3)
  allowFileUpload?: boolean; // show a multi-file upload zone in free_text_prompt
  confirmLabel?: string;   // for confirmation type
  cancelLabel?: string;    // for confirmation type
}

// Extended Message type used in the assistants page.
// structured is ephemeral — not persisted to StoredConversation (prototype).
export interface AssistantMessage {
  id: string;
  role: "user" | "assistant" | "error";
  content: string;
  timestamp: Date;
  durationMs?: number;
  files?: string[];
  displayText?: string;
  structured?: StructuredMessage;  // present when LLM returns a structured response
  submittedResponse?: string;      // set once user submits, locks the interactive block
}
