/**
 * Chomsky LLM Integration
 * Uses eBay's internal Chomsky gateway instead of external Anthropic API
 */

interface ChomskyConfig {
  endpoint: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
  tokenEndpoint?: string;
}

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface TokenCache {
  token: string;
  expiry: number;
}

export class ChomskyClient {
  private config: ChomskyConfig;
  private tokenCache: TokenCache | null = null;

  constructor(config?: Partial<ChomskyConfig>) {
    this.config = {
      endpoint: config?.endpoint || process.env.CHOMSKY_ENDPOINT || "https://chomskygw.vip.qa.ebay.com/api/v1/genai",
      model: config?.model || process.env.CHOMSKY_MODEL || "gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox",
      temperature: config?.temperature || 0.7,
      maxTokens: config?.maxTokens || 4000,
      tokenEndpoint: config?.tokenEndpoint || "https://dcputilityexecutorsvc.vip.qa.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run",
    };
  }

  /**
   * Get an access token for Chomsky API
   * Tokens are cached for 6 hours (matching pychomsky behavior)
   */
  private async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.tokenCache && Date.now() < this.tokenCache.expiry) {
      return this.tokenCache.token;
    }

    try {
      const response = await fetch(this.config.tokenEndpoint!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appName: "chomskygw",
        }),
      });

      if (!response.ok) {
        throw new Error(`Token generation failed: ${response.status} - ${await response.text()}`);
      }

      const data = await response.json();
      const token = data.outputData?.appToken;

      if (!token) {
        throw new Error("No token in response from token endpoint");
      }

      // Cache token for 6 hours (matching pychomsky behavior)
      this.tokenCache = {
        token,
        expiry: Date.now() + 6 * 60 * 60 * 1000,
      };

      return token;
    } catch (error) {
      throw new Error(`Failed to get Chomsky access token: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async generateObject<T = unknown>(params: {
    model?: string;
    schema: { parse: (data: unknown) => T }; // Zod schema
    messages: Message[];
    temperature?: number;
  }): Promise<{ object: T }> {
    const systemMessage = params.messages.find(m => m.role === "system")?.content || "";
    const userMessage = params.messages.find(m => m.role === "user")?.content || "";

    const prompt = `${systemMessage}\n\n${userMessage}\n\nYou must respond with valid JSON matching this schema. Do not include any markdown formatting, code blocks, or explanatory text - only the raw JSON object.`;

    const token = await this.getAccessToken();
    const modelName = params.model || this.config.model;

    // Determine provider based on model name
    const isAnthropic = modelName.includes('anthropic') || modelName.includes('claude');
    const isGemini = modelName.includes('gemini');
    const provider = isAnthropic ? 'gcp-vertex-ai' : isGemini ? 'gcp-vertex-ai' : 'azure';

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "X-genai-api-provider": provider,
      "X-EBAY-USER-ID": process.env.USER || "naming-studio",
      "X-EBAY-CHOMSKY-MODEL-NAME": modelName,
    };

    // Add anthropic_version for Claude models
    if (isAnthropic) {
      headers["anthropic-version"] = "2023-06-01";
    }

    // GPT-5+ and o-series models use max_completion_tokens instead of max_tokens
    const isGPT5Plus = modelName.includes('gpt-5') || modelName.includes('gpt-4-1') || modelName.includes('o1') || modelName.includes('o3') || modelName.includes('o4');
    const maxTokensKey = isGPT5Plus ? 'max_completion_tokens' : 'max_tokens';

    const requestBody: Record<string, unknown> = {
      model: modelName,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: params.temperature || this.config.temperature,
      [maxTokensKey]: this.config.maxTokens,
    };

    const response = await fetch(this.config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Chomsky API error: ${response.status} - ${error}`);
    }

    const data = await response.json();

    // Extract the response content
    let content = data.choices?.[0]?.message?.content || data.content || "";

    if (!content) {
      throw new Error("No content returned from Chomsky API");
    }

    // Clean up markdown code blocks if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    // Parse and validate with schema
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : String(parseError)}. Content: ${content.substring(0, 200)}`);
    }

    const validated = params.schema.parse(parsed);

    return { object: validated };
  }

  async generateText(params: {
    model?: string;
    messages: Message[];
    temperature?: number;
    maxTokens?: number;
  }): Promise<string> {
    const token = await this.getAccessToken();
    const modelName = params.model || this.config.model;

    // Determine provider based on model name
    const isAnthropic = modelName.includes('anthropic') || modelName.includes('claude');
    const isGemini = modelName.includes('gemini');
    const provider = isAnthropic ? 'gcp-vertex-ai' : isGemini ? 'gcp-vertex-ai' : 'azure';

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "X-genai-api-provider": provider,
      "X-EBAY-USER-ID": process.env.USER || "naming-studio",
      "X-EBAY-CHOMSKY-MODEL-NAME": modelName,
    };

    // Add anthropic_version for Claude models
    if (isAnthropic) {
      headers["anthropic-version"] = "2023-06-01";
    }

    // GPT-5+ and o-series models use max_completion_tokens instead of max_tokens
    const isGPT5Plus = modelName.includes('gpt-5') || modelName.includes('gpt-4-1') || modelName.includes('o1') || modelName.includes('o3') || modelName.includes('o4');
    const maxTokensKey = isGPT5Plus ? 'max_completion_tokens' : 'max_tokens';

    const requestBody: Record<string, unknown> = {
      model: modelName,
      messages: params.messages,
      temperature: params.temperature || this.config.temperature,
      [maxTokensKey]: params.maxTokens ?? this.config.maxTokens,
    };

    const response = await fetch(this.config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Chomsky API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || data.content || "";

    if (!content) {
      throw new Error("No content returned from Chomsky API");
    }

    return content;
  }

  /**
   * Stream text generation. Yields text chunks as they arrive.
   * Uses OpenAI-compatible SSE streaming (stream: true).
   */
  async *streamText(params: {
    model?: string;
    messages: Message[];
    temperature?: number;
    maxTokens?: number;
    signal?: AbortSignal;
  }): AsyncGenerator<string> {
    const token = await this.getAccessToken();
    const modelName = params.model || this.config.model;

    const isAnthropic = modelName.includes("anthropic") || modelName.includes("claude");
    const isGemini = modelName.includes("gemini");
    const provider = isAnthropic || isGemini ? "gcp-vertex-ai" : "azure";

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-genai-api-provider": provider,
      "X-EBAY-USER-ID": process.env.USER || "naming-studio",
      "X-EBAY-CHOMSKY-MODEL-NAME": modelName,
    };

    if (isAnthropic) headers["anthropic-version"] = "2023-06-01";

    const isGPT5Plus = modelName.includes("gpt-5") || modelName.includes("gpt-4-1") || modelName.includes("o1") || modelName.includes("o3") || modelName.includes("o4");
    const maxTokensKey = isGPT5Plus ? "max_completion_tokens" : "max_tokens";

    const response = await fetch(this.config.endpoint, {
      method: "POST",
      headers,
      signal: params.signal,
      body: JSON.stringify({
        model: modelName,
        messages: params.messages,
        temperature: params.temperature ?? this.config.temperature,
        [maxTokensKey]: params.maxTokens ?? 1500,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Chomsky streaming error: ${response.status} - ${error}`);
    }

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          const chunk = parsed.choices?.[0]?.delta?.content;
          if (chunk) yield chunk;
        } catch {
          // malformed chunk — skip
        }
      }
    }
  }

  /**
   * Override the model for this client instance (e.g. from UI model selection)
   */
  overrideModel(model: string) {
    this.config.model = model;
    // Clear token cache when model changes providers
    this.tokenCache = null;
  }
}

// Singleton instance
export const chomsky = new ChomskyClient();
