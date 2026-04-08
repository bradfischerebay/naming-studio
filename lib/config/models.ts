/**
 * Model whitelist and validation for Chomsky LLM gateway
 * Prevents arbitrary model injection and provides clear error messages
 */

export const ALLOWED_MODELS = [
  // Azure OpenAI Models
  "azure-chat-completions-gpt-5-2-2025-12-11-sandbox",
  "azure-chat-completions-gpt-4-1-2025-04-14-sandbox",
  "azure-chat-completions-gpt-4-1-mini-2025-04-14-sandbox",

  // Anthropic Claude Models (GCP)
  "gcp-chat-completions-anthropic-claude-sonnet-4.6-sandbox",
  "gcp-chat-completions-anthropic-claude-opus-4.6-sandbox",
  "gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox",

  // Google Gemini Models (GCP)
  "gcp-chat-completions-chat-gemini-3.1-pro-preview-sandbox",
] as const;

export type AllowedModel = typeof ALLOWED_MODELS[number];

/**
 * Validate that a model name is in the allowed list
 */
export function isValidModel(model: unknown): model is AllowedModel {
  return typeof model === "string" && ALLOWED_MODELS.includes(model as AllowedModel);
}

/**
 * Get the default model from env or fallback
 */
export function getDefaultModel(): string {
  const envModel = process.env.CHOMSKY_MODEL;
  if (envModel && isValidModel(envModel)) {
    return envModel;
  }
  return ALLOWED_MODELS[0];
}

/**
 * Validate and return model or throw error
 */
export function validateModel(model: unknown): string {
  if (!model) {
    return getDefaultModel();
  }

  if (!isValidModel(model)) {
    throw new Error(
      `Invalid model: ${String(model)}. Allowed models: ${ALLOWED_MODELS.join(", ")}`
    );
  }

  return model;
}

/**
 * Pipeline model routing interface
 * Allows per-step model selection for optimal cost/quality tradeoffs
 */
export interface PipelineModelRouting {
  parser: string;
  researcher: string;
  extractor: string;
  questioner: string;
}

/**
 * Get per-pipeline-step model routing from environment variables
 * Falls back to default model if step-specific env vars are not set
 */
export function getPipelineModels(): PipelineModelRouting {
  const defaultModel = getDefaultModel();
  return {
    parser:     process.env.CHOMSKY_MODEL_PARSER     || defaultModel,
    researcher: process.env.CHOMSKY_MODEL_RESEARCHER || defaultModel,
    extractor:  process.env.CHOMSKY_MODEL_EXTRACTOR  || defaultModel,
    questioner: process.env.CHOMSKY_MODEL_EXTRACTOR  || defaultModel, // same default as extractor
  };
}
