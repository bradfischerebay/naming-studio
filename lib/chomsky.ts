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
  timeout?: number; // Request timeout in milliseconds
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
  // Prevents concurrent token fetches when cache expires under burst traffic
  private tokenFetchPromise: Promise<string> | null = null;

  constructor(config?: Partial<ChomskyConfig>) {
    this.config = {
      endpoint: config?.endpoint || process.env.CHOMSKY_ENDPOINT || "https://chomskygw.vip.qa.ebay.com/api/v1/genai",
      model: config?.model || process.env.CHOMSKY_MODEL || "gcp-chat-completions-anthropic-claude-3.7-sonnet-sandbox",
      temperature: config?.temperature || 0.7,
      maxTokens: config?.maxTokens || 4000,
      tokenEndpoint: config?.tokenEndpoint || "https://dcputilityexecutorsvc.vip.qa.ebay.com/dcp/executor/v1/apis/utilities/62f4a6871cb7d52b85a91429/run",
      timeout: config?.timeout || 60000, // Default 60s timeout
    };
  }

  /**
   * Create an AbortController with timeout for fetch requests.
   * Returns the controller and a cleanup function — always call cleanup() in a
   * finally block so the timer is cleared even when the request succeeds early.
   */
  private createTimeoutController(timeoutMs?: number): { controller: AbortController; cleanup: () => void } {
    const controller = new AbortController();
    const timeout = timeoutMs || this.config.timeout || 60000;
    const timerId = setTimeout(() => controller.abort(), timeout);
    return { controller, cleanup: () => clearTimeout(timerId) };
  }

  /**
   * Get an access token for Chomsky API.
   * Tokens are cached for 6 hours (matching pychomsky behavior).
   * A promise lock prevents concurrent fetches when the cache expires under burst traffic.
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.tokenCache && Date.now() < this.tokenCache.expiry) {
      return this.tokenCache.token;
    }

    // If a fetch is already in flight, reuse it instead of firing another
    if (this.tokenFetchPromise) {
      return this.tokenFetchPromise;
    }

    this.tokenFetchPromise = this.fetchNewToken().finally(() => {
      this.tokenFetchPromise = null;
    });

    return this.tokenFetchPromise;
  }

  private async fetchNewToken(): Promise<string> {
    const { controller: tokenController, cleanup: tokenCleanup } = this.createTimeoutController(10000);
    try {
      const response = await fetch(this.config.tokenEndpoint!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appName: "chomskygw",
        }),
        signal: tokenController.signal,
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
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Token fetch timed out. Check your network connection.");
      }
      throw new Error(`Failed to get Chomsky access token: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      tokenCleanup();
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
      temperature: params.temperature ?? this.config.temperature,
      [maxTokensKey]: this.config.maxTokens,
    };

    const { controller, cleanup } = this.createTimeoutController();
    try {
      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
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
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timed out. The brief may be too complex or Chomsky is slow to respond.");
      }
      throw error;
    } finally {
      cleanup();
    }
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
      temperature: params.temperature ?? this.config.temperature,
      [maxTokensKey]: params.maxTokens ?? this.config.maxTokens,
    };

    const { controller, cleanup } = this.createTimeoutController();
    try {
      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
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
    } finally {
      cleanup();
    }
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

    try {
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
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Generate an embedding vector for the given text using Vector Prime 2.
   * Returns a number[] embedding (normalized, ~1536 dims).
   */
  async embed(text: string): Promise<number[]> {
    const token = await this.getAccessToken();
    // VP2 embeddings use the same base URL but /embeddings path
    const embeddingsEndpoint = this.config.endpoint.replace(/\/genai$/, "/embeddings");

    const { controller, cleanup } = this.createTimeoutController(30000);
    try {
      const response = await fetch(embeddingsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "X-genai-api-provider": "azure",
          "X-EBAY-USER-ID": process.env.USER || "naming-studio",
          "X-EBAY-CHOMSKY-MODEL-NAME": "ebay-internal-sandbox-vector-prime-2",
        },
        body: JSON.stringify({
          model: "ebay-internal-sandbox-vector-prime-2",
          input: text,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Chomsky embeddings error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      const embedding = data.data?.[0]?.embedding;
      if (!Array.isArray(embedding)) {
        throw new Error("No embedding returned from Chomsky embeddings API");
      }
      return embedding as number[];
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Embedding request timed out.");
      }
      throw error;
    } finally {
      cleanup();
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
