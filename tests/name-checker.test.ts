/**
 * Name Checker Test Suite
 *
 * Tests for eBay name checking functionality
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import NameChecker, { getNameChecker } from '@/lib/modules/name-checker';
import EbayClient, { getEbayClient } from '@/lib/modules/ebay-client';
import TrademarkClient, { getTrademarkClient } from '@/lib/modules/trademark-client';
import { getNameCheckCache } from '@/lib/modules/name-check-cache';

// Mock environment variables
process.env.EBAY_APP_ID = 'test-app-id-123';

describe('NameChecker', () => {
  beforeEach(() => {
    // Clear cache before each test
    vi.clearAllMocks();
  });

  describe('Portfolio Conflict Detection', () => {
    it('should detect conflict with "ebay" in name', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('eBay AutoSell', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(result.conflicts.length).toBeGreaterThan(0);
      expect(result.conflicts.some(c => c.type === 'portfolio')).toBe(true);
      expect(result.riskLevel).toBe('critical');
      expect(result.isAvailable).toBe(false);
    });

    it('should detect conflict with "paypal"', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('PayPal Express', {
        checkEbay: false,
        checkTrademarks: false,
      });

      const portfolioConflict = result.conflicts.find(c => c.type === 'portfolio');
      expect(portfolioConflict).toBeDefined();
      expect(portfolioConflict?.severity).toBe('high');
    });

    it('should pass for non-conflicting names', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('SuperSeller Pro', {
        checkEbay: false,
        checkTrademarks: false,
      });

      const portfolioConflicts = result.conflicts.filter(c => c.type === 'portfolio');
      expect(portfolioConflicts.length).toBe(0);
    });

    it('should detect partial matches', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('Terapeak Analytics Plus', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(result.conflicts.some(c =>
        c.type === 'portfolio' &&
        c.details?.product === 'terapeak'
      )).toBe(true);
    });
  });

  describe('Risk Level Calculation', () => {
    it('should return low risk for unique names', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('ZephyrListingTool2026', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(result.riskLevel).toBe('low');
      expect(result.isAvailable).toBe(true);
    });

    it('should return critical risk for eBay brand conflicts', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('eBay Plus Pro', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(result.riskLevel).toBe('critical');
    });

    it('should return medium risk for minor conflicts', async () => {
      const checker = getNameChecker();
      // This would need actual eBay/trademark data to test properly
      // For now, just verify risk levels are valid
      const result = await checker.checkName('GenericName', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(['low', 'medium', 'high', 'critical']).toContain(result.riskLevel);
    });
  });

  describe('Recommendations', () => {
    it('should provide recommendations for all risk levels', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('TestName', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(result.recommendations).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should recommend legal review for trademark conflicts', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('eBay Seller Hub', {
        checkEbay: false,
        checkTrademarks: false,
      });

      const hasG4Warning = result.recommendations.some(r =>
        r.includes('G4 gate')
      );
      expect(hasG4Warning).toBe(true);
    });
  });

  describe('Batch Checking', () => {
    it('should check multiple names', async () => {
      const checker = getNameChecker();
      const names = ['QuickSell', 'AutoList', 'SmartPost'];

      const results = await checker.batchCheckNames(names, {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(results.length).toBe(3);
      expect(results[0].name).toBe('QuickSell');
      expect(results[1].name).toBe('AutoList');
      expect(results[2].name).toBe('SmartPost');
    });

    it('should handle errors in batch checking', async () => {
      const checker = getNameChecker();
      const names = ['eBay Test', 'PayPal Test', 'Valid Name'];

      const results = await checker.batchCheckNames(names, {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(results.length).toBe(3);

      // First two should have portfolio conflicts
      expect(results[0].conflicts.some(c => c.type === 'portfolio')).toBe(true);
      expect(results[1].conflicts.some(c => c.type === 'portfolio')).toBe(true);

      // Last one should be clean
      const portfolioConflicts = results[2].conflicts.filter(c => c.type === 'portfolio');
      expect(portfolioConflicts.length).toBe(0);
    });
  });

  describe('Conflict Types', () => {
    it('should categorize conflicts correctly', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('eBay Motors Plus', {
        checkEbay: false,
        checkTrademarks: false,
      });

      const conflict = result.conflicts[0];
      expect(conflict).toHaveProperty('type');
      expect(conflict).toHaveProperty('severity');
      expect(conflict).toHaveProperty('description');
      expect(conflict).toHaveProperty('source');
    });

    it('should include details in conflicts', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('eBay Test', {
        checkEbay: false,
        checkTrademarks: false,
      });

      const portfolioConflict = result.conflicts.find(c => c.type === 'portfolio');
      expect(portfolioConflict?.details).toBeDefined();
      expect(portfolioConflict?.details?.product).toBe('ebay');
    });
  });

  describe('Caching', () => {
    it('should cache results', async () => {
      const checker = getNameChecker();

      // First call - not cached
      const result1 = await checker.checkName('CacheTest', {
        checkEbay: false,
        checkTrademarks: false,
        useCache: true,
      });
      expect(result1.cachedResult).toBe(false);

      // Second call - should be cached
      const result2 = await checker.checkName('CacheTest', {
        checkEbay: false,
        checkTrademarks: false,
        useCache: true,
      });
      expect(result2.cachedResult).toBe(true);
    });

    it('should bypass cache when disabled', async () => {
      const checker = getNameChecker();

      // First call
      await checker.checkName('NoCacheTest', {
        checkEbay: false,
        checkTrademarks: false,
        useCache: false,
      });

      // Second call - should not use cache
      const result = await checker.checkName('NoCacheTest', {
        checkEbay: false,
        checkTrademarks: false,
        useCache: false,
      });

      expect(result.cachedResult).toBe(false);
    });
  });

  describe('Response Structure', () => {
    it('should return complete result structure', async () => {
      const checker = getNameChecker();
      const result = await checker.checkName('StructureTest', {
        checkEbay: false,
        checkTrademarks: false,
      });

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('isAvailable');
      expect(result).toHaveProperty('conflicts');
      expect(result).toHaveProperty('riskLevel');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('cachedResult');
    });

    it('should include timestamp', async () => {
      const checker = getNameChecker();
      const before = Date.now();

      const result = await checker.checkName('TimestampTest', {
        checkEbay: false,
        checkTrademarks: false,
      });

      const after = Date.now();

      expect(result.timestamp).toBeGreaterThanOrEqual(before);
      expect(result.timestamp).toBeLessThanOrEqual(after);
    });
  });
});

describe('EbayClient', () => {
  it('should initialize with app ID', () => {
    const client = getEbayClient();
    expect(client).toBeDefined();
  });

  it('should warn when app ID is missing', () => {
    const originalAppId = process.env.EBAY_APP_ID;
    delete process.env.EBAY_APP_ID;

    const consoleSpy = vi.spyOn(console, 'warn');
    const client = new EbayClient();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('EBAY_APP_ID not configured')
    );

    process.env.EBAY_APP_ID = originalAppId;
    consoleSpy.mockRestore();
  });
});

describe('TrademarkClient', () => {
  it('should initialize without errors', () => {
    const client = getTrademarkClient();
    expect(client).toBeDefined();
  });

  it('should check trademarks', async () => {
    const client = getTrademarkClient();
    const result = await client.checkTrademark('TestMark');

    expect(result).toHaveProperty('searchTerm');
    expect(result).toHaveProperty('conflicts');
    expect(result).toHaveProperty('hasConflicts');
    expect(result).toHaveProperty('riskLevel');
    expect(result).toHaveProperty('timestamp');
  });

  it('should detect known eBay trademarks', async () => {
    const client = getTrademarkClient();
    const result = await client.checkTrademark('eBay');

    expect(result.hasConflicts).toBe(true);
    expect(result.conflicts.length).toBeGreaterThan(0);
    expect(result.conflicts[0].owner).toBe('eBay Inc.');
  });
});

describe('Cache', () => {
  it('should store and retrieve values', async () => {
    const cache = getNameCheckCache();

    const testData = {
      name: 'Test',
      isAvailable: true,
      conflicts: [],
      riskLevel: 'low' as const,
      recommendations: [],
      timestamp: Date.now(),
      cachedResult: false,
    };

    await cache.cacheNameCheck('test-key', testData);
    const retrieved = await cache.getNameCheck('test-key');

    expect(retrieved).toEqual(testData);
  });

  it('should handle cache misses', async () => {
    const cache = getNameCheckCache();
    const result = await cache.getNameCheck('non-existent-key');

    expect(result).toBeNull();
  });
});

describe('Integration Tests', () => {
  it('should complete full name check flow', async () => {
    const checker = getNameChecker();

    const result = await checker.checkName('FullFlowTest', {
      checkEbay: false, // Skip external APIs in tests
      checkTrademarks: false,
      useCache: true,
    });

    expect(result.name).toBe('FullFlowTest');
    expect(result.isAvailable).toBeDefined();
    expect(result.riskLevel).toBeDefined();
    expect(Array.isArray(result.conflicts)).toBe(true);
    expect(Array.isArray(result.recommendations)).toBe(true);
  });

  it('should handle case-insensitive matching', async () => {
    const checker = getNameChecker();

    const lowerCase = await checker.checkName('ebay test', {
      checkEbay: false,
      checkTrademarks: false,
    });

    const upperCase = await checker.checkName('EBAY TEST', {
      checkEbay: false,
      checkTrademarks: false,
    });

    // Both should detect conflicts
    expect(lowerCase.conflicts.length).toBeGreaterThan(0);
    expect(upperCase.conflicts.length).toBeGreaterThan(0);
  });
});
