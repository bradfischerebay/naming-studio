/**
 * Glean Enterprise Search Integration
 * Uses eBay's internal Glean API for enterprise knowledge retrieval
 */

export interface GleanSource {
  title: string;
  url?: string;
  snippet?: string;
}

export interface GleanResult {
  answer: string;
  sources: GleanSource[];
}

interface GleanConfig {
  endpoint: string;
  agentId: string;
  token?: string;
  actAs?: string;
  timeout?: number; // Request timeout in milliseconds
}

interface GleanApiRequest {
  agentId: string;
  messages: Array<{
    fragments: Array<{
      text: string;
    }>;
  }>;
  timeoutMillis: number;
}

interface GleanDocument {
  id: string;
  title: string;
  url?: string;
}

interface GleanReferenceRange {
  document: GleanDocument;
  snippet?: string;
  startIndex?: number;
  endIndex?: number;
}

interface GleanFragment {
  text?: string;
  citation?: {
    referenceRanges?: GleanReferenceRange[];
  };
}

interface GleanMessage {
  author: string;
  fragments: GleanFragment[];
}

interface GleanApiResponse {
  messages: GleanMessage[];
  citations?: unknown[]; // DEPRECATED field — ignored entirely
}

export class GleanClient {
  private config: GleanConfig;

  constructor(config?: Partial<GleanConfig>) {
    const token = config?.token || process.env.GLEAN_API_TOKEN;

    this.config = {
      endpoint: config?.endpoint || "https://ebay-be.glean.com/rest/api/v1/chat",
      agentId: config?.agentId || "dbbb1bcc585748cbab1f2b9801162736",
      token: token || "", // Allow empty token, will error on query if not set
      actAs: config?.actAs || process.env.GLEAN_ACT_AS,
      timeout: config?.timeout || 35000, // 35s timeout (5s buffer over Glean's 30s)
    };
  }

  /**
   * Create an AbortController with timeout for fetch requests
   */
  private createTimeoutController(): AbortController {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), this.config.timeout);
    return controller;
  }

  /**
   * Query Glean for enterprise knowledge
   * @param question - The question to ask Glean
   * @returns Promise<GleanResult> with answer text and sources
   */
  async query(question: string): Promise<GleanResult> {
    // Check token at query time, not construction time (allows build without token)
    if (!this.config.token) {
      throw new Error("Glean API token not configured — set GLEAN_API_TOKEN in .env.local");
    }

    const controller = this.createTimeoutController();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.config.token}`,
    };

    // Only add X-Scio-ActAs header when actAs is configured (GLOBAL tokens only)
    if (this.config.actAs) {
      headers["X-Scio-ActAs"] = this.config.actAs;
    }

    const requestBody: GleanApiRequest = {
      agentId: this.config.agentId,
      messages: [
        {
          fragments: [{ text: question }],
        },
      ],
      timeoutMillis: 30000,
    };

    try {
      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Specific error handling for auth failures
        if (response.status === 401 || response.status === 403) {
          throw new Error("Glean authentication failed — token may have expired.");
        }

        throw new Error(`Glean API error: ${response.status} - ${errorText}`);
      }

      const data: GleanApiResponse = await response.json();

      // Get the last assistant message
      const lastMessage = data.messages?.[data.messages.length - 1];

      if (!lastMessage || lastMessage.author !== "ASSISTANT") {
        throw new Error("No assistant response from Glean API");
      }

      // Extract answer text from all fragments
      const answerText = lastMessage.fragments
        .map(f => f.text)
        .filter(Boolean)
        .join("");

      if (!answerText) {
        throw new Error("Empty response from Glean API");
      }

      // Extract sources from citation.referenceRanges in each fragment
      const sources = this.extractSources(lastMessage.fragments);

      return {
        answer: answerText,
        sources,
      };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Glean took too long to respond. Try a shorter question.");
      }
      throw error;
    }
  }

  /**
   * Extract and deduplicate sources from fragment citations
   */
  private extractSources(fragments: GleanFragment[]): GleanSource[] {
    const seenDocIds = new Set<string>();
    const sources: GleanSource[] = [];

    for (const fragment of fragments) {
      const ranges = fragment.citation?.referenceRanges;
      if (!ranges) continue;

      for (const range of ranges) {
        const doc = range.document;

        // Deduplicate by document ID
        if (seenDocIds.has(doc.id)) continue;
        seenDocIds.add(doc.id);

        sources.push({
          title: doc.title,
          url: doc.url,
          snippet: range.snippet,
        });
      }
    }

    return sources;
  }
}

// Singleton instance
export const glean = new GleanClient();
