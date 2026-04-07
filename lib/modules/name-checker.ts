/**
 * Name Checker Service
 * Orchestrates eBay product name checking and trademark verification
 * Integrates with G4 (Portfolio Alignment) gate logic
 */

import { getEbayClient, type EbayProduct, type EbaySearchResult } from './ebay-client';
import { getTrademarkClient, type TrademarkCheckResult } from './trademark-client';
import { getNameCheckCache } from './name-check-cache';

export interface NameCheckOptions {
  checkEbay?: boolean; // Default: true
  checkTrademarks?: boolean; // Default: true
  maxEbayResults?: number; // Default: 20
  useCache?: boolean; // Default: true
  includeRelatedTerms?: boolean; // Check variations (default: false)
}

export interface NameCheckResult {
  name: string;
  isAvailable: boolean;
  conflicts: NameConflict[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  ebayData?: {
    totalProducts: number;
    sampleProducts: EbayProduct[];
    searchUrl: string;
  };
  trademarkData?: TrademarkCheckResult;
  timestamp: number;
  cachedResult: boolean;
}

export interface NameConflict {
  type: 'ebay' | 'trademark' | 'portfolio';
  severity: 'low' | 'medium' | 'high';
  description: string;
  source: string;
  details?: any;
}

/**
 * Known eBay product portfolio
 * These should fail G4 if there's naming overlap
 */
const EBAY_PORTFOLIO = [
  // Core marketplace
  'ebay',
  'ebay motors',
  'ebay stores',
  'ebay deals',

  // Services
  'ebay authenticity guarantee',
  'ebay international shipping',
  'ebay managed payments',
  'ebay promoted listings',
  'ebay advertising',

  // Tools
  'seller hub',
  'terapeak',
  'price guide',
  'selling manager',
  'turbo lister',

  // Buyer programs
  'ebay money back guarantee',
  'ebay bucks',
  'ebay plus',

  // Former/acquired brands
  'paypal',
  'stubhub',
  'classifieds',
  'kijiji',
  'gumtree',
  'mobile.de',

  // Categories/verticals
  'fashion',
  'electronics',
  'home & garden',
  'collectibles',
  'parts & accessories',
];

class NameChecker {
  private ebayClient = getEbayClient();
  private trademarkClient = getTrademarkClient();
  private cache = getNameCheckCache();

  /**
   * Main entry point: Check if a name is available and conflicts with existing products
   */
  async checkName(
    name: string,
    options: NameCheckOptions = {}
  ): Promise<NameCheckResult> {
    const {
      checkEbay = true,
      checkTrademarks = true,
      maxEbayResults = 20,
      useCache = true,
      includeRelatedTerms = false,
    } = options;

    // Check cache first
    if (useCache) {
      const cached = await this.cache.getNameCheck(name);
      if (cached && typeof cached === 'object' && 'name' in cached) {
        console.log(`Cache hit for name check: ${name}`);
        return { ...(cached as NameCheckResult), cachedResult: true };
      }
    }

    const conflicts: NameConflict[] = [];
    let ebayData: NameCheckResult['ebayData'];
    let trademarkData: TrademarkCheckResult | undefined;

    // 1. Check against eBay portfolio
    const portfolioConflicts = this.checkPortfolioConflicts(name);
    conflicts.push(...portfolioConflicts);

    // 2. Check eBay marketplace for existing products
    if (checkEbay) {
      try {
        const ebayResult = await this.checkEbayProducts(name, maxEbayResults, useCache);
        if (ebayResult) {
          ebayData = {
            totalProducts: ebayResult.totalResults,
            sampleProducts: ebayResult.products.slice(0, 5), // Top 5 examples
            searchUrl: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(name)}`,
          };

          // Analyze for conflicts
          const ebayConflicts = this.analyzeEbayConflicts(name, ebayResult);
          conflicts.push(...ebayConflicts);
        }
      } catch (error) {
        console.error('eBay check failed:', error);
        // Continue with other checks even if eBay fails
      }
    }

    // 3. Check trademark database
    if (checkTrademarks) {
      try {
        trademarkData = await this.checkTrademarkConflicts(name, useCache);
        if (trademarkData && trademarkData.hasConflicts) {
          const tmConflicts = this.analyzeTrademarkConflicts(trademarkData);
          conflicts.push(...tmConflicts);
        }
      } catch (error) {
        console.error('Trademark check failed:', error);
        // Continue even if trademark check fails
      }
    }

    // 4. Calculate risk level and availability
    const riskLevel = this.calculateRiskLevel(conflicts);
    const isAvailable = riskLevel === 'low';

    // 5. Generate recommendations
    const recommendations = this.generateRecommendations(name, conflicts, riskLevel);

    const result: NameCheckResult = {
      name,
      isAvailable,
      conflicts,
      riskLevel,
      recommendations,
      ebayData,
      trademarkData,
      timestamp: Date.now(),
      cachedResult: false,
    };

    // Cache the result
    if (useCache) {
      await this.cache.cacheNameCheck(name, result);
    }

    return result;
  }

  /**
   * Check for conflicts with known eBay portfolio
   */
  private checkPortfolioConflicts(name: string): NameConflict[] {
    const conflicts: NameConflict[] = [];
    const normalized = name.toLowerCase().trim();

    for (const product of EBAY_PORTFOLIO) {
      const similarity = this.calculateSimilarity(normalized, product);

      if (similarity > 0.8) {
        conflicts.push({
          type: 'portfolio',
          severity: similarity > 0.95 ? 'high' : 'medium',
          description: `Conflicts with existing eBay product: "${product}"`,
          source: 'eBay Portfolio Database',
          details: { product, similarity },
        });
      }
    }

    return conflicts;
  }

  /**
   * Check eBay marketplace for existing products
   */
  private async checkEbayProducts(
    name: string,
    maxResults: number,
    useCache: boolean
  ): Promise<EbaySearchResult | null> {
    try {
      // Check cache
      if (useCache) {
        const cached = await this.cache.getEbaySearch(name);
        if (cached) {
          console.log(`Cache hit for eBay search: ${name}`);
          return cached;
        }
      }

      const result = await this.ebayClient.searchProducts(name, { maxResults });

      // Cache result
      if (useCache) {
        await this.cache.cacheEbaySearch(name, result);
      }

      return result;
    } catch (error) {
      console.error('eBay search failed:', error);
      return null;
    }
  }

  /**
   * Analyze eBay search results for conflicts
   */
  private analyzeEbayConflicts(name: string, ebayResult: EbaySearchResult): NameConflict[] {
    const conflicts: NameConflict[] = [];
    const normalized = name.toLowerCase().trim();

    // Check if name appears frequently in product titles
    const exactMatches = ebayResult.products.filter(p =>
      p.title.toLowerCase().includes(normalized)
    );

    if (exactMatches.length > 10) {
      conflicts.push({
        type: 'ebay',
        severity: 'medium',
        description: `Name appears in ${exactMatches.length} existing eBay product listings`,
        source: 'eBay Marketplace',
        details: { matchCount: exactMatches.length },
      });
    }

    // Check for dominant brand usage
    if (ebayResult.totalResults > 100) {
      conflicts.push({
        type: 'ebay',
        severity: 'low',
        description: `High volume of products (${ebayResult.totalResults}) use this term`,
        source: 'eBay Marketplace',
        details: { totalProducts: ebayResult.totalResults },
      });
    }

    return conflicts;
  }

  /**
   * Check trademark database
   */
  private async checkTrademarkConflicts(
    name: string,
    useCache: boolean
  ): Promise<TrademarkCheckResult | undefined> {
    try {
      // Check cache
      if (useCache) {
        const cached = await this.cache.getTrademarkCheck(name);
        if (cached) {
          console.log(`Cache hit for trademark check: ${name}`);
          return cached;
        }
      }

      const result = await this.trademarkClient.checkTrademark(name);

      // Cache result
      if (useCache) {
        await this.cache.cacheTrademarkCheck(name, result);
      }

      return result;
    } catch (error) {
      console.error('Trademark check failed:', error);
      return undefined;
    }
  }

  /**
   * Analyze trademark conflicts
   */
  private analyzeTrademarkConflicts(trademarkData: TrademarkCheckResult): NameConflict[] {
    const conflicts: NameConflict[] = [];

    for (const tm of trademarkData.conflicts) {
      conflicts.push({
        type: 'trademark',
        severity: tm.isLive ? 'high' : 'medium',
        description: `Trademark conflict: "${tm.markIdentification}" (${tm.status})`,
        source: 'USPTO Database',
        details: tm,
      });
    }

    return conflicts;
  }

  /**
   * Calculate overall risk level
   */
  private calculateRiskLevel(conflicts: NameConflict[]): 'low' | 'medium' | 'high' | 'critical' {
    if (conflicts.length === 0) return 'low';

    const hasHighSeverity = conflicts.some(c => c.severity === 'high');
    const hasTrademarkConflict = conflicts.some(c => c.type === 'trademark');
    const hasPortfolioConflict = conflicts.some(c => c.type === 'portfolio');

    if (hasPortfolioConflict && conflicts.find(c => c.type === 'portfolio')?.severity === 'high') {
      return 'critical'; // Direct conflict with eBay portfolio
    }

    if (hasTrademarkConflict && hasHighSeverity) {
      return 'critical';
    }

    if (hasHighSeverity || hasTrademarkConflict) {
      return 'high';
    }

    if (conflicts.length > 3) {
      return 'medium';
    }

    return 'medium';
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    name: string,
    conflicts: NameConflict[],
    riskLevel: string
  ): string[] {
    const recommendations: string[] = [];

    if (riskLevel === 'low') {
      recommendations.push('Name appears to be available with minimal conflicts.');
      recommendations.push('Conduct formal trademark search before finalizing.');
    }

    if (riskLevel === 'medium') {
      recommendations.push('Consider variations or alternative names to avoid conflicts.');
      recommendations.push('Review specific conflicts and assess impact on target market.');
    }

    if (riskLevel === 'high' || riskLevel === 'critical') {
      recommendations.push('Strong recommendation to choose a different name.');

      if (conflicts.some(c => c.type === 'portfolio')) {
        recommendations.push('Conflicts with existing eBay product portfolio - this will fail G4 gate.');
      }

      if (conflicts.some(c => c.type === 'trademark')) {
        recommendations.push('Trademark conflicts detected - consult legal team before proceeding.');
      }
    }

    return recommendations;
  }

  /**
   * Calculate string similarity (0-1)
   * Special handling for brand protection: containing a brand name is high similarity
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase().trim();
    const s2 = str2.toLowerCase().trim();

    if (s1 === s2) return 1.0;

    // Brand protection: if the candidate name contains the portfolio brand as a complete word,
    // that's a high-severity conflict (>0.95) to trigger critical risk
    const s1Words = s1.split(/\s+/);
    const s2Words = s2.split(/\s+/);

    // Check if portfolio brand appears as complete word in candidate name
    if (s1Words.includes(s2) || s2Words.includes(s1)) {
      return 0.98; // High similarity for exact word match
    }

    // Check substring containment (e.g., "ebay" in "ebayplus")
    if (s1.includes(s2) || s2.includes(s1)) return 0.9;

    // Simple character overlap for other cases
    const set1 = new Set(s1.split(''));
    const set2 = new Set(s2.split(''));
    const intersection = new Set(Array.from(set1).filter(x => set2.has(x)));

    return intersection.size / Math.max(set1.size, set2.size);
  }

  /**
   * Batch check multiple names
   */
  async batchCheckNames(names: string[], options?: NameCheckOptions): Promise<NameCheckResult[]> {
    const results: NameCheckResult[] = [];

    for (const name of names) {
      const result = await this.checkName(name, options);
      results.push(result);

      // Add delay to respect rate limits
      await this.delay(500);
    }

    return results;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
let nameCheckerInstance: NameChecker | null = null;

export function getNameChecker(): NameChecker {
  if (!nameCheckerInstance) {
    nameCheckerInstance = new NameChecker();
  }
  return nameCheckerInstance;
}

export default NameChecker;
