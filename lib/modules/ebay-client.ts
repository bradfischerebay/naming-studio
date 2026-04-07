/**
 * eBay Product Name Scraper
 * Uses eBay Finding API (preferred over scraping for reliability and legal compliance)
 *
 * API Documentation: https://developer.ebay.com/DevZone/finding/Concepts/FindingAPIGuide.html
 *
 * Environment Variables Required:
 * - EBAY_APP_ID: Your eBay Application ID (get from eBay Developer Program)
 */

export interface EbayProduct {
  itemId: string;
  title: string;
  categoryName?: string;
  listingUrl: string;
  price?: string;
  currency?: string;
  condition?: string;
}

export interface EbaySearchResult {
  products: EbayProduct[];
  totalResults: number;
  searchKeywords: string;
  timestamp: number;
}

export interface EbaySearchOptions {
  maxResults?: number; // Max items to return (default: 20, max: 100)
  categoryId?: string; // Limit to specific category
  sortOrder?: 'BestMatch' | 'PricePlusShippingLowest' | 'PricePlusShippingHighest' | 'StartTimeNewest';
}

class EbayClient {
  private appId: string;
  private baseUrl = 'https://svcs.ebay.com/services/search/FindingService/v1';
  private requestCount = 0;
  private requestWindow = 60000; // 1 minute
  private maxRequestsPerWindow = 5000; // eBay Finding API limit

  constructor(appId?: string) {
    this.appId = appId || process.env.EBAY_APP_ID || '';

    if (!this.appId) {
      console.warn('EBAY_APP_ID not configured. eBay searches will fail.');
    }
  }

  /**
   * Search for products by keywords
   * Uses findItemsByKeywords operation
   */
  async searchProducts(
    keywords: string,
    options: EbaySearchOptions = {}
  ): Promise<EbaySearchResult> {
    if (!this.appId) {
      throw new Error('eBay API not configured. Set EBAY_APP_ID environment variable.');
    }

    // Rate limit check
    await this.checkRateLimit();

    const {
      maxResults = 20,
      categoryId,
      sortOrder = 'BestMatch'
    } = options;

    // Build query parameters
    const params = new URLSearchParams({
      'OPERATION-NAME': 'findItemsByKeywords',
      'SERVICE-VERSION': '1.0.0',
      'SECURITY-APPNAME': this.appId,
      'RESPONSE-DATA-FORMAT': 'JSON',
      'REST-PAYLOAD': '',
      'keywords': keywords,
      'paginationInput.entriesPerPage': Math.min(maxResults, 100).toString(),
      'sortOrder': sortOrder,
    });

    if (categoryId) {
      params.append('categoryId', categoryId);
    }

    try {
      const response = await fetch(`${this.baseUrl}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`eBay API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      return this.parseEbayResponse(data, keywords);
    } catch (error) {
      console.error('eBay API request failed:', error);
      throw new Error(`Failed to search eBay: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract product names from search results (for trademark checking)
   */
  extractProductNames(searchResult: EbaySearchResult): string[] {
    return searchResult.products.map(p => this.normalizeProductName(p.title));
  }

  /**
   * Normalize product name for comparison
   * Removes noise like brand names, conditions, sizes
   */
  private normalizeProductName(title: string): string {
    // Remove common noise patterns
    const normalized = title
      .toLowerCase()
      // Remove size indicators
      .replace(/\b(small|medium|large|x{1,3}[ls]|[0-9]+[a-z]{0,2})\b/gi, '')
      // Remove condition markers
      .replace(/\b(new|used|refurbished|like new|open box)\b/gi, '')
      // Remove color indicators (common patterns)
      .replace(/\b(black|white|red|blue|green|yellow|silver|gold|pink|purple|orange)\b/gi, '')
      // Remove quantity indicators
      .replace(/\b(pack of|set of|[0-9]+ pack|[0-9]+ set)\b/gi, '')
      // Clean up extra spaces
      .replace(/\s+/g, ' ')
      .trim();

    return normalized;
  }

  /**
   * Parse eBay Finding API JSON response
   */
  private parseEbayResponse(data: any, keywords: string): EbaySearchResult {
    const searchResult = data.findItemsByKeywordsResponse?.[0];

    if (!searchResult || searchResult.ack?.[0] !== 'Success') {
      const errorMessage = searchResult?.errorMessage?.[0]?.error?.[0]?.message?.[0] || 'Unknown error';
      throw new Error(`eBay API returned error: ${errorMessage}`);
    }

    const searchResultData = searchResult.searchResult?.[0];
    const items = searchResultData?.item || [];
    const totalEntries = parseInt(searchResultData?.['@count'] || '0', 10);

    const products: EbayProduct[] = items.map((item: any) => ({
      itemId: item.itemId?.[0] || '',
      title: item.title?.[0] || '',
      categoryName: item.primaryCategory?.[0]?.categoryName?.[0],
      listingUrl: item.viewItemURL?.[0] || '',
      price: item.sellingStatus?.[0]?.currentPrice?.[0]?.['__value__'],
      currency: item.sellingStatus?.[0]?.currentPrice?.[0]?.['@currencyId'],
      condition: item.condition?.[0]?.conditionDisplayName?.[0],
    }));

    return {
      products,
      totalResults: totalEntries,
      searchKeywords: keywords,
      timestamp: Date.now(),
    };
  }

  /**
   * Basic rate limiting
   */
  private async checkRateLimit(): Promise<void> {
    this.requestCount++;

    if (this.requestCount >= this.maxRequestsPerWindow) {
      throw new Error('eBay API rate limit exceeded. Please try again later.');
    }

    // Reset counter after window
    setTimeout(() => {
      this.requestCount = Math.max(0, this.requestCount - 1);
    }, this.requestWindow);
  }

  /**
   * Get category suggestions for a keyword
   * Useful for narrowing down searches
   */
  async getCategorySuggestions(keywords: string): Promise<Array<{ id: string; name: string }>> {
    if (!this.appId) {
      throw new Error('eBay API not configured');
    }

    // Use a small search to get category data
    const result = await this.searchProducts(keywords, { maxResults: 10 });

    // Extract unique categories
    const categories = new Map<string, string>();
    result.products.forEach(product => {
      if (product.categoryName) {
        categories.set(product.categoryName, product.categoryName);
      }
    });

    return Array.from(categories.entries()).map(([name, _]) => ({
      id: name.replace(/\s+/g, '-').toLowerCase(),
      name,
    }));
  }
}

// Singleton instance
let ebayClient: EbayClient | null = null;

export function getEbayClient(): EbayClient {
  if (!ebayClient) {
    ebayClient = new EbayClient();
  }
  return ebayClient;
}

export default EbayClient;
