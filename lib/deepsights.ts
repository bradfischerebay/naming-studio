/**
 * DeepSights Market Intelligence Integration
 * Uses eBay's internal DeepSights API (built on Market Logic)
 * Provides access to internal research docs, topic analysis, and public news
 */

export interface DocumentResult {
  artifactTitle: string;
  artifactSummary: string;
  pageReferences?: number[];
  relevanceClass?: "high" | "medium" | "low";
}

export interface NewsResult {
  title: string;
  source: string;
}

export interface DeepSightsResearch {
  documents: DocumentResult[];
  topics: DocumentResult[];
  news: NewsResult[];
}

interface DeepSightsConfig {
  endpoint: string;
  apiKey?: string;
  contentStoreKey?: string;
  timeout?: number;
}

interface DocumentSearchRequest {
  query: string;
  extended_search: boolean;
}

interface TopicSearchRequest {
  query: string;
  extended_search: boolean;
}

interface NewsSearchRequest {
  query: string;
  max_results: number;
  vector_fraction: number;
  recency_weight: number;
}

export class DeepSightsClient {
  private config: DeepSightsConfig;

  constructor(config?: Partial<DeepSightsConfig>) {
    const apiKey = config?.apiKey || process.env.DEEPSIGHTS_API_KEY;
    const contentStoreKey = config?.contentStoreKey || process.env.CONTENTSTORE_API_KEY;

    this.config = {
      endpoint: config?.endpoint || "https://api.deepsights.ai/ds/v1",
      apiKey: apiKey || "",
      contentStoreKey: contentStoreKey || "",
      timeout: config?.timeout || 30000,
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
   * Search internal eBay research documents (hybrid search)
   * @param query - Search query (max 512 chars)
   * @param extendedSearch - Enable extended search mode
   * @returns Promise<DocumentResult[]>
   */
  async searchDocuments(query: string, extendedSearch = true): Promise<DocumentResult[]> {
    if (!this.config.apiKey) {
      throw new Error("DeepSights API key not configured — set DEEPSIGHTS_API_KEY in .env.local");
    }

    // Enforce query length limit
    const trimmedQuery = query.slice(0, 512);

    const controller = this.createTimeoutController();

    const requestBody: DocumentSearchRequest = {
      query: trimmedQuery,
      extended_search: extendedSearch,
    };

    try {
      const response = await fetch(`${this.config.endpoint}/documentstore/documents/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();

        if (response.status === 401 || response.status === 403) {
          throw new Error("DeepSights authentication failed — API key may be invalid or expired.");
        }

        throw new Error(`DeepSights document search error: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as DocumentResult[];
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("DeepSights took too long to respond. Try a shorter query.");
      }
      throw error;
    }
  }

  /**
   * Search topics using AI-powered topic analysis
   * @param query - Search query (max 512 chars)
   * @param extendedSearch - Enable extended search mode
   * @returns Promise<DocumentResult[]>
   */
  async searchTopics(query: string, extendedSearch = true): Promise<DocumentResult[]> {
    if (!this.config.apiKey) {
      throw new Error("DeepSights API key not configured — set DEEPSIGHTS_API_KEY in .env.local");
    }

    const trimmedQuery = query.slice(0, 512);
    const controller = this.createTimeoutController();

    const requestBody: TopicSearchRequest = {
      query: trimmedQuery,
      extended_search: extendedSearch,
    };

    try {
      const response = await fetch(`${this.config.endpoint}/documentstore/documents/topic_search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();

        if (response.status === 401 || response.status === 403) {
          throw new Error("DeepSights authentication failed — API key may be invalid or expired.");
        }

        throw new Error(`DeepSights topic search error: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as DocumentResult[];
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("DeepSights took too long to respond. Try a shorter query.");
      }
      throw error;
    }
  }

  /**
   * Search public news articles
   * Requires CONTENTSTORE_API_KEY (separate from DEEPSIGHTS_API_KEY)
   * @param query - Search query
   * @param maxResults - Maximum results (max 250)
   * @returns Promise<NewsResult[]>
   */
  async searchNews(query: string, maxResults = 10): Promise<NewsResult[]> {
    // Gracefully skip if content store key not configured
    if (!this.config.contentStoreKey) {
      return [];
    }

    if (!this.config.apiKey) {
      throw new Error("DeepSights API key not configured — set DEEPSIGHTS_API_KEY in .env.local");
    }

    const controller = this.createTimeoutController();

    const requestBody: NewsSearchRequest = {
      query,
      max_results: Math.min(maxResults, 250),
      vector_fraction: 0.5,
      recency_weight: 0.3,
    };

    try {
      const response = await fetch(`${this.config.endpoint}/contentstore/news/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Specific error handling for content store auth
        if (response.status === 401 || response.status === 403) {
          // Content store might have separate auth — gracefully skip
          console.warn("DeepSights news search auth failed — CONTENTSTORE_API_KEY may be missing or invalid. Skipping news.");
          return [];
        }

        throw new Error(`DeepSights news search error: ${response.status} - ${errorText}`);
      }

      const data = await response.json() as NewsResult[];
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("DeepSights took too long to respond. Try a shorter query.");
      }
      // Gracefully skip news on error (not critical path)
      console.warn("DeepSights news search failed:", error);
      return [];
    }
  }

  /**
   * Run comprehensive market research across all DeepSights surfaces
   * Calls documents, topics, and news in parallel (news is optional)
   * @param query - Research query
   * @returns Promise<DeepSightsResearch>
   */
  async research(query: string): Promise<DeepSightsResearch> {
    if (!this.config.apiKey) {
      throw new Error("DeepSights API key not configured — set DEEPSIGHTS_API_KEY in .env.local");
    }

    // Run all searches in parallel using Promise.allSettled (news may fail gracefully)
    const [documentsResult, topicsResult, newsResult] = await Promise.allSettled([
      this.searchDocuments(query),
      this.searchTopics(query),
      this.searchNews(query),
    ]);

    return {
      documents: documentsResult.status === "fulfilled" ? documentsResult.value : [],
      topics: topicsResult.status === "fulfilled" ? topicsResult.value : [],
      news: newsResult.status === "fulfilled" ? newsResult.value : [],
    };
  }

  /**
   * Format research results for injection into LLM prompts
   * Prioritizes artifact summaries, limits total length to ~2000 chars
   * @param research - DeepSights research results
   * @returns Formatted string for LLM context
   */
  formatForLLM(research: DeepSightsResearch): string {
    const sections: string[] = [];
    let totalLength = 0;
    const maxLength = 2000;

    // Helper to add section if space available
    const addSection = (title: string, items: string[]) => {
      if (items.length === 0 || totalLength >= maxLength) return;

      const header = `\n${title}:\n`;
      const content = items.join("\n");
      const section = header + content;

      if (totalLength + section.length > maxLength) {
        const available = maxLength - totalLength - header.length;
        if (available > 100) {
          sections.push(header + content.slice(0, available) + "...");
          totalLength = maxLength;
        }
      } else {
        sections.push(section);
        totalLength += section.length;
      }
    };

    // Internal documents (highest priority)
    const docItems = research.documents
      .slice(0, 5) // Top 5 docs
      .map((doc, idx) => {
        const relevance = doc.relevanceClass ? ` [${doc.relevanceClass}]` : "";
        const pages = doc.pageReferences?.length ? ` (pp. ${doc.pageReferences.slice(0, 3).join(", ")})` : "";
        return `${idx + 1}. ${doc.artifactSummary}${relevance}${pages}`;
      });
    addSection("Internal Research Documents", docItems);

    // Topics (AI-powered analysis)
    const topicItems = research.topics
      .slice(0, 3) // Top 3 topics
      .filter(t => t.relevanceClass === "high" || t.relevanceClass === "medium")
      .map((topic, idx) => {
        const relevance = ` [${topic.relevanceClass}]`;
        return `${idx + 1}. ${topic.artifactSummary}${relevance}`;
      });
    addSection("Topic Analysis", topicItems);

    // News (lowest priority)
    const newsItems = research.news
      .slice(0, 3) // Top 3 news items
      .map((n, idx) => `${idx + 1}. ${n.title} (${n.source})`);
    addSection("Recent News", newsItems);

    return sections.length > 0
      ? sections.join("\n")
      : "No market intelligence found for this query.";
  }
}

// Singleton instance
export const deepsights = new DeepSightsClient();
