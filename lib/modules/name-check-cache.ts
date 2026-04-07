/**
 * Caching layer for name checking results
 * Supports both in-memory (development) and Redis (production)
 *
 * Cache Keys:
 * - ebay:{keywords} -> EbaySearchResult
 * - trademark:{name} -> TrademarkCheckResult
 * - namecheck:{name} -> NameCheckResult
 *
 * TTL: 24 hours (86400 seconds)
 */

import type { EbaySearchResult } from './ebay-client';
import type { TrademarkCheckResult } from './trademark-client';

export interface CacheConfig {
  ttl?: number; // Time to live in seconds (default: 86400 = 24 hours)
  storage?: CacheStorage;
}

export interface CacheStorage {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * In-memory cache storage (development only)
 */
class InMemoryCacheStorage implements CacheStorage {
  private cache: Map<string, { value: unknown; expiry: number }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Check expiry
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    const expiry = Date.now() + (ttlSeconds * 1000);
    this.cache.set(key, { value, expiry });
  }

  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  get size(): number {
    return this.cache.size;
  }

  // Cleanup expired entries periodically
  startCleanup() {
    setInterval(() => {
      const now = Date.now();
      const entries = Array.from(this.cache.entries());
      for (const [key, entry] of entries) {
        if (now > entry.expiry) {
          this.cache.delete(key);
        }
      }
    }, 5 * 60 * 1000); // Clean every 5 minutes
  }
}

/**
 * Minimal Redis interface to avoid importing @upstash/redis at module load time
 */
interface RedisClient {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown, options: { ex: number }): Promise<unknown>;
  del(key: string): Promise<unknown>;
}

/**
 * Redis cache storage (production)
 * Requires @upstash/redis package (already in dependencies)
 */
export class RedisCacheStorage implements CacheStorage {
  constructor(private redis: RedisClient) {}

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.redis.get(key);
      return value as T | null;
    } catch (error) {
      console.error('Redis GET error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
    try {
      await this.redis.set(key, value, { ex: ttlSeconds });
    } catch (error) {
      console.error('Redis SET error:', error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Redis DELETE error:', error);
    }
  }

  async clear(): Promise<void> {
    // Note: This is dangerous in production
    // Only use for testing/development
    console.warn('Cache clear called - not implemented for Redis (use with caution)');
  }
}

/**
 * Name Check Cache Manager
 */
class NameCheckCache {
  private storage: CacheStorage;
  private defaultTtl: number;

  constructor(config: CacheConfig = {}) {
    this.defaultTtl = config.ttl || 86400; // 24 hours
    this.storage = config.storage || this.createDefaultStorage();
  }

  private createDefaultStorage(): CacheStorage {
    const storage = new InMemoryCacheStorage();
    storage.startCleanup();
    return storage;
  }

  /**
   * Cache eBay search results
   */
  async cacheEbaySearch(
    keywords: string,
    result: EbaySearchResult,
    ttl?: number
  ): Promise<void> {
    const key = this.getEbayKey(keywords);
    await this.storage.set(key, result, ttl || this.defaultTtl);
  }

  async getEbaySearch(keywords: string): Promise<EbaySearchResult | null> {
    const key = this.getEbayKey(keywords);
    return this.storage.get<EbaySearchResult>(key);
  }

  /**
   * Cache trademark check results
   */
  async cacheTrademarkCheck(
    name: string,
    result: TrademarkCheckResult,
    ttl?: number
  ): Promise<void> {
    const key = this.getTrademarkKey(name);
    await this.storage.set(key, result, ttl || this.defaultTtl);
  }

  async getTrademarkCheck(name: string): Promise<TrademarkCheckResult | null> {
    const key = this.getTrademarkKey(name);
    return this.storage.get<TrademarkCheckResult>(key);
  }

  /**
   * Cache combined name check results
   */
  async cacheNameCheck(name: string, result: unknown, ttl?: number): Promise<void> {
    const key = this.getNameCheckKey(name);
    await this.storage.set(key, result, ttl || this.defaultTtl);
  }

  async getNameCheck(name: string): Promise<unknown> {
    const key = this.getNameCheckKey(name);
    return this.storage.get(key);
  }

  /**
   * Invalidate cache entries
   */
  async invalidateEbaySearch(keywords: string): Promise<void> {
    const key = this.getEbayKey(keywords);
    await this.storage.delete(key);
  }

  async invalidateTrademarkCheck(name: string): Promise<void> {
    const key = this.getTrademarkKey(name);
    await this.storage.delete(key);
  }

  async invalidateNameCheck(name: string): Promise<void> {
    const key = this.getNameCheckKey(name);
    await this.storage.delete(key);
  }

  /**
   * Clear all cache
   */
  async clearAll(): Promise<void> {
    await this.storage.clear();
  }

  /**
   * Generate cache keys
   */
  private getEbayKey(keywords: string): string {
    return `ebay:${this.normalizeKey(keywords)}`;
  }

  private getTrademarkKey(name: string): string {
    return `trademark:${this.normalizeKey(name)}`;
  }

  private getNameCheckKey(name: string): string {
    return `namecheck:${this.normalizeKey(name)}`;
  }

  private normalizeKey(input: string): string {
    return input.toLowerCase().trim().replace(/\s+/g, '-');
  }

  /**
   * Get cache statistics (for in-memory storage only)
   */
  getStats(): { size: number } | null {
    if (this.storage instanceof InMemoryCacheStorage) {
      return {
        size: this.storage.size,
      };
    }
    return null;
  }
}

// Singleton instance
let cacheInstance: NameCheckCache | null = null;

export function getNameCheckCache(config?: CacheConfig): NameCheckCache {
  if (!cacheInstance) {
    cacheInstance = new NameCheckCache(config);
  }
  return cacheInstance;
}

export default NameCheckCache;
