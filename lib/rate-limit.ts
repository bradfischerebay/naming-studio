/**
 * Rate limiter for API routes with pluggable storage
 *
 * Development (default): InMemoryStorage — NOT suitable for multi-instance deployments
 * Production: UpstashStorage — atomic, distributed, works across all instances
 *
 * Usage (development):
 * import { rateLimit } from "@/lib/rate-limit";
 * const result = await rateLimit(req, { interval: 60_000, maxRequests: 10 });
 *
 * Usage (production with Upstash):
 * import { rateLimit, UpstashStorage } from "@/lib/rate-limit";
 * import { Redis } from "@upstash/redis";
 * const redis = new Redis({ url: process.env.UPSTASH_REDIS_REST_URL!, token: process.env.UPSTASH_REDIS_REST_TOKEN! });
 * const result = await rateLimit(req, { interval: 60_000, maxRequests: 10, storage: new UpstashStorage(redis) });
 *
 * Vercel setup: Add an Upstash Redis integration from the Vercel Marketplace,
 * then set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in environment variables.
 */

interface RateLimitStorage {
  get(key: string): Promise<{ count: number; resetTime: number } | null>;
  set(key: string, value: { count: number; resetTime: number }): Promise<void>;
  increment(key: string): Promise<number>;
}

// WARNING: In-memory storage is NOT suitable for multi-instance deployments.
// In production with multiple server instances (e.g., serverless), each instance
// maintains its own store, allowing rate limit bypass. Replace with a distributed
// store (Redis, Vercel KV, Upstash) before deploying to production.
// To swap: implement RateLimitStorage and pass it as rateLimitStorage.storage
class InMemoryStorage implements RateLimitStorage {
  private store: {
    [key: string]: {
      count: number;
      resetTime: number;
    };
  } = {};

  constructor() {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      const now = Date.now();
      Object.keys(this.store).forEach(key => {
        if (this.store[key].resetTime < now) {
          delete this.store[key];
        }
      });
    }, 5 * 60 * 1000);
  }

  async get(key: string): Promise<{ count: number; resetTime: number } | null> {
    return this.store[key] || null;
  }

  async set(key: string, value: { count: number; resetTime: number }): Promise<void> {
    this.store[key] = value;
  }

  async increment(key: string): Promise<number> {
    if (!this.store[key]) {
      // Race condition fix: if key doesn't exist, initialize it
      // This can happen if set() and increment() are called in sequence
      // but the key hasn't been created yet
      const now = Date.now();
      this.store[key] = {
        count: 1,
        resetTime: now + 60000, // Default 1 minute window
      };
      return 1;
    }
    this.store[key].count++;
    return this.store[key].count;
  }

  // Test utility: clear all rate limit data
  reset(): void {
    this.store = {};
  }
}

/**
 * Production-grade distributed rate limiter backed by Upstash Redis.
 * Atomic operations via INCR + EXPIRE ensure correctness across all server instances.
 *
 * Uses two keys per identifier:
 *   rl:{identifier}:count  — integer counter (atomic via INCR)
 *   rl:{identifier}:reset  — window reset timestamp in ms
 */
export class UpstashStorage implements RateLimitStorage {
  // Typed as `any` to avoid importing the Upstash type at module load time;
  // callers pass `new Redis({...})` from "@upstash/redis".
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private redis: any) {}

  async get(key: string): Promise<{ count: number; resetTime: number } | null> {
    const [count, resetTime] = await Promise.all([
      this.redis.get(`rl:${key}:count`),
      this.redis.get(`rl:${key}:reset`),
    ]);
    if (count === null || resetTime === null) return null;
    return { count: count as number, resetTime: resetTime as number };
  }

  async set(key: string, value: { count: number; resetTime: number }): Promise<void> {
    const ttlMs = value.resetTime - Date.now();
    if (ttlMs <= 0) return;
    const ttlSec = Math.ceil(ttlMs / 1000);
    await Promise.all([
      this.redis.set(`rl:${key}:count`, value.count, { ex: ttlSec }),
      this.redis.set(`rl:${key}:reset`, value.resetTime, { ex: ttlSec }),
    ]);
  }

  async increment(key: string): Promise<number> {
    // INCR is atomic in Redis — safe under concurrent requests
    return this.redis.incr(`rl:${key}:count`);
  }
}

const defaultStorage = new InMemoryStorage();

/**
 * Test utility: Reset rate limit storage
 * Only works with InMemoryStorage (default in development/tests)
 */
export function resetRateLimitStorage(): void {
  if (defaultStorage instanceof InMemoryStorage) {
    defaultStorage.reset();
  }
}

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
  storage?: RateLimitStorage; // Optional storage backend
}

const defaultConfig: RateLimitConfig = {
  interval: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
  storage: defaultStorage,
};

export async function rateLimit(
  request: Request,
  config: RateLimitConfig = defaultConfig
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  headers: Record<string, string>;
}> {
  const storage = config.storage || defaultStorage;

  // Get identifier from IP or headers
  const identifier = getIdentifier(request);
  const now = Date.now();
  const resetTime = now + config.interval;

  // Initialize or get current rate limit data
  const current = await storage.get(identifier);

  if (!current || current.resetTime < now) {
    await storage.set(identifier, {
      count: 0,
      resetTime,
    });
  }

  // Increment request count
  await storage.increment(identifier);
  const currentData = await storage.get(identifier);

  if (!currentData) {
    throw new Error("Rate limit storage error: data unavailable after increment");
  }

  const remaining = Math.max(0, config.maxRequests - currentData.count);
  const success = currentData.count <= config.maxRequests;

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": config.maxRequests.toString(),
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": new Date(currentData.resetTime).toISOString(),
  };

  if (!success) {
    headers["Retry-After"] = Math.ceil((currentData.resetTime - now) / 1000).toString();
  }

  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: currentData.resetTime,
    headers,
  };
}

function getIdentifier(request: Request): string {
  // Try to get IP from various headers (works with most proxy setups)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to user-agent + accept as identifier
  // This is less ideal but works in development
  const userAgent = request.headers.get("user-agent") || "unknown";
  const accept = request.headers.get("accept") || "unknown";
  return `${userAgent}-${accept}`.substring(0, 100);
}
