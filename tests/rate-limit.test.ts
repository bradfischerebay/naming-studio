/**
 * Rate Limiter Tests
 *
 * Tests for the race condition fix in InMemoryStorage
 */

import { rateLimit } from "@/lib/rate-limit";

// Mock Request for testing
function createMockRequest(ip: string = "127.0.0.1"): Request {
  return {
    headers: {
      get: (key: string) => {
        if (key === "x-forwarded-for") return ip;
        if (key === "user-agent") return "test-agent";
        if (key === "accept") return "application/json";
        return null;
      },
    },
  } as unknown as Request;
}

describe("Rate Limiter", () => {
  it("should allow first request immediately", async () => {
    const req = createMockRequest("test-ip-1");
    const result = await rateLimit(req, {
      interval: 60000,
      maxRequests: 5,
    });

    expect(result.success).toBe(true);
    expect(result.remaining).toBe(4);
    expect(result.limit).toBe(5);
  });

  it("should handle rapid consecutive requests without race condition", async () => {
    const ip = "test-ip-2";

    // Fire 3 rapid requests - this used to fail with the race condition
    const results = await Promise.all([
      rateLimit(createMockRequest(ip), { interval: 60000, maxRequests: 5 }),
      rateLimit(createMockRequest(ip), { interval: 60000, maxRequests: 5 }),
      rateLimit(createMockRequest(ip), { interval: 60000, maxRequests: 5 }),
    ]);

    // All should succeed
    expect(results[0].success).toBe(true);
    expect(results[1].success).toBe(true);
    expect(results[2].success).toBe(true);

    // Counts should be accurate
    expect(results[0].remaining).toBeLessThanOrEqual(4);
    expect(results[1].remaining).toBeLessThanOrEqual(3);
    expect(results[2].remaining).toBeLessThanOrEqual(2);
  });

  it("should enforce rate limits correctly", async () => {
    const ip = "test-ip-3";
    const config = { interval: 60000, maxRequests: 3 };

    // Make 3 requests - should all succeed
    for (let i = 0; i < 3; i++) {
      const result = await rateLimit(createMockRequest(ip), config);
      expect(result.success).toBe(true);
    }

    // 4th request should be rate limited
    const limitedResult = await rateLimit(createMockRequest(ip), config);
    expect(limitedResult.success).toBe(false);
    expect(limitedResult.remaining).toBe(0);
    expect(limitedResult.headers["Retry-After"]).toBeDefined();
  });

  it("should reset after interval expires", async () => {
    const ip = "test-ip-4";
    const shortInterval = 100; // 100ms for testing
    const config = { interval: shortInterval, maxRequests: 2 };

    // Use up the limit
    await rateLimit(createMockRequest(ip), config);
    await rateLimit(createMockRequest(ip), config);

    const limitedResult = await rateLimit(createMockRequest(ip), config);
    expect(limitedResult.success).toBe(false);

    // Wait for interval to expire
    await new Promise(resolve => setTimeout(resolve, shortInterval + 50));

    // Should work again
    const resetResult = await rateLimit(createMockRequest(ip), config);
    expect(resetResult.success).toBe(true);
    expect(resetResult.remaining).toBe(1);
  });

  it("should handle different IPs independently", async () => {
    const config = { interval: 60000, maxRequests: 2 };

    const result1 = await rateLimit(createMockRequest("ip-a"), config);
    const result2 = await rateLimit(createMockRequest("ip-b"), config);

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
    expect(result1.remaining).toBe(1);
    expect(result2.remaining).toBe(1);
  });
});
