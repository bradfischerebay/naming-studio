/**
 * USPTO Trademark Search Client
 * Uses USPTO Trademark Status & Document Retrieval (TSDR) API
 *
 * API Documentation: https://www.uspto.gov/learning-and-resources/open-data-and-mobility/developer-resources
 *
 * Note: USPTO provides free public access, no API key required
 * Rate limits: Reasonable use (recommend max 120 requests/minute)
 */

export interface TrademarkSearchResult {
  registrationNumber?: string;
  serialNumber: string;
  markIdentification: string; // The actual trademark text
  owner: string;
  status: string;
  statusDate: string;
  filingDate: string;
  registrationDate?: string;
  goodsAndServices?: string;
  markType?: string;
  isLive: boolean; // Active/registered vs abandoned/cancelled
}

export interface TrademarkCheckResult {
  searchTerm: string;
  conflicts: TrademarkSearchResult[];
  hasConflicts: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  timestamp: number;
}

/**
 * Similarity scoring for trademark conflicts
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  // Exact match
  if (s1 === s2) return 1.0;

  // Contains match
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;

  // Levenshtein-based similarity (simplified)
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}

class TrademarkClient {
  private baseUrl = 'https://tsdr.uspto.gov/';
  private requestCount = 0;
  private requestWindow = 60000; // 1 minute
  private maxRequestsPerWindow = 100; // Conservative limit

  /**
   * Check if a name conflicts with registered trademarks
   */
  async checkTrademark(name: string): Promise<TrademarkCheckResult> {
    await this.checkRateLimit();

    // For USPTO, we'll use their public search API
    // Note: This is a simplified implementation
    // Production should use the full TSDR API or third-party services like Trademarkia

    try {
      const conflicts = await this.searchTrademarks(name);

      // Filter for high-similarity conflicts
      const relevantConflicts = conflicts.filter(tm => {
        const similarity = calculateSimilarity(name, tm.markIdentification);
        return similarity > 0.6; // 60% similarity threshold
      });

      const riskLevel = this.assessRiskLevel(name, relevantConflicts);

      return {
        searchTerm: name,
        conflicts: relevantConflicts,
        hasConflicts: relevantConflicts.length > 0,
        riskLevel,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Trademark search failed:', error);
      throw new Error(`Trademark check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Search USPTO database
   * This is a mock implementation - in production, integrate with:
   * 1. USPTO TSDR API
   * 2. Third-party services (Trademarkia, Corsearch, etc.)
   * 3. WIPO Global Brand Database for international marks
   */
  private async searchTrademarks(name: string): Promise<TrademarkSearchResult[]> {
    // MOCK IMPLEMENTATION
    // Replace with actual USPTO API calls

    // For now, return empty to avoid false positives
    // In production, this should query the real database
    console.warn(`Trademark search for "${name}" - using mock implementation`);

    return this.getMockTrademarkData(name);
  }

  /**
   * Mock trademark data for testing
   * Remove this in production and use real API
   */
  private getMockTrademarkData(name: string): TrademarkSearchResult[] {
    const normalized = name.toLowerCase().trim();

    // Known eBay trademarks for testing
    const knownEbayMarks = [
      'ebay',
      'paypal',
      'stubhub',
      'kijiji',
      'gumtree',
      'mobile.de',
      'marktplaats',
      'vivanuncios',
      'giganet',
    ];

    const exactMatch = knownEbayMarks.find(mark => normalized.includes(mark));

    if (exactMatch) {
      return [{
        serialNumber: '00000000',
        markIdentification: exactMatch.toUpperCase(),
        owner: 'eBay Inc.',
        status: 'Registered',
        statusDate: '2020-01-01',
        filingDate: '2015-01-01',
        registrationDate: '2020-01-01',
        markType: 'Word Mark',
        isLive: true,
      }];
    }

    return [];
  }

  /**
   * Assess risk level based on conflicts found
   */
  private assessRiskLevel(
    searchTerm: string,
    conflicts: TrademarkSearchResult[]
  ): 'low' | 'medium' | 'high' {
    if (conflicts.length === 0) return 'low';

    // Check for exact or very similar matches
    const hasExactMatch = conflicts.some(tm =>
      calculateSimilarity(searchTerm, tm.markIdentification) > 0.9
    );

    if (hasExactMatch) return 'high';

    // Check for live registrations
    const hasLiveRegistration = conflicts.some(tm => tm.isLive);

    if (hasLiveRegistration) return 'high';

    // Multiple conflicts = higher risk
    if (conflicts.length > 3) return 'medium';

    return 'medium';
  }

  /**
   * Rate limiting
   */
  private async checkRateLimit(): Promise<void> {
    this.requestCount++;

    if (this.requestCount >= this.maxRequestsPerWindow) {
      throw new Error('Trademark API rate limit exceeded. Please try again later.');
    }

    setTimeout(() => {
      this.requestCount = Math.max(0, this.requestCount - 1);
    }, this.requestWindow);
  }

  /**
   * Batch check multiple names
   */
  async batchCheckTrademarks(names: string[]): Promise<TrademarkCheckResult[]> {
    const results: TrademarkCheckResult[] = [];

    // Process in small batches to respect rate limits
    const batchSize = 5;
    for (let i = 0; i < names.length; i += batchSize) {
      const batch = names.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(name => this.checkTrademark(name))
      );
      results.push(...batchResults);

      // Add delay between batches
      if (i + batchSize < names.length) {
        await this.delay(1000); // 1 second between batches
      }
    }

    return results;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
let trademarkClient: TrademarkClient | null = null;

export function getTrademarkClient(): TrademarkClient {
  if (!trademarkClient) {
    trademarkClient = new TrademarkClient();
  }
  return trademarkClient;
}

export default TrademarkClient;
