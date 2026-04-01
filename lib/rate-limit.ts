/**
 * Simple in-memory rate limiter for API routes
 *
 * Usage:
 * import { rateLimit } from "@/lib/rate-limit";
 *
 * export async function POST(req: NextRequest) {
 *   const rateLimitResult = await rateLimit(req);
 *   if (!rateLimitResult.success) {
 *     return NextResponse.json(
 *       { error: "Too many requests. Please try again later." },
 *       { status: 429, headers: rateLimitResult.headers }
 *     );
 *   }
 *   // ... rest of your code
 * }
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

const defaultConfig: RateLimitConfig = {
  interval: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
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
  // Get identifier from IP or headers
  const identifier = getIdentifier(request);
  const now = Date.now();
  const resetTime = now + config.interval;

  // Initialize or get current rate limit data
  if (!store[identifier] || store[identifier].resetTime < now) {
    store[identifier] = {
      count: 0,
      resetTime,
    };
  }

  // Increment request count
  store[identifier].count++;

  const current = store[identifier];
  const remaining = Math.max(0, config.maxRequests - current.count);
  const success = current.count <= config.maxRequests;

  const headers = {
    "X-RateLimit-Limit": config.maxRequests.toString(),
    "X-RateLimit-Remaining": remaining.toString(),
    "X-RateLimit-Reset": new Date(current.resetTime).toISOString(),
  };

  if (!success) {
    headers["Retry-After"] = Math.ceil((current.resetTime - now) / 1000).toString();
  }

  return {
    success,
    limit: config.maxRequests,
    remaining,
    reset: current.resetTime,
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
