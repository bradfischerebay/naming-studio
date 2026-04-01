import { describe, it, expect } from 'vitest'
import { rateLimit } from '../rate-limit'

describe('Rate Limiter', () => {
  // Create unique requests to avoid state contamination between tests
  let requestCounter = 0
  const createRequest = (headers: Record<string, string> = {}): Request => {
    requestCounter++
    return new Request('http://localhost:3000/api/test', {
      method: 'POST',
      headers: new Headers({
        'user-agent': `test-agent-${requestCounter}`,
        'accept': 'application/json',
        ...headers,
      }),
    })
  }

  describe('Basic rate limiting', () => {
    it('should allow requests under the limit', async () => {
      const req = createRequest()
      const config = { interval: 60000, maxRequests: 3 }

      const result1 = await rateLimit(req, config)
      expect(result1.success).toBe(true)
      expect(result1.remaining).toBe(2)

      const result2 = await rateLimit(req, config)
      expect(result2.success).toBe(true)
      expect(result2.remaining).toBe(1)

      const result3 = await rateLimit(req, config)
      expect(result3.success).toBe(true)
      expect(result3.remaining).toBe(0)
    })

    it('should block requests over the limit', async () => {
      const req = createRequest()
      const config = { interval: 60000, maxRequests: 2 }

      await rateLimit(req, config)
      await rateLimit(req, config)
      const result = await rateLimit(req, config)

      expect(result.success).toBe(false)
      expect(result.remaining).toBe(0)
    })

    it('should include rate limit headers', async () => {
      const req = createRequest()
      const config = { interval: 60000, maxRequests: 5 }

      const result = await rateLimit(req, config)

      expect(result.headers['X-RateLimit-Limit']).toBe('5')
      expect(result.headers['X-RateLimit-Remaining']).toBeDefined()
      expect(result.headers['X-RateLimit-Reset']).toBeDefined()
    })

    it('should include Retry-After header when blocked', async () => {
      const req = createRequest()
      const config = { interval: 60000, maxRequests: 1 }

      await rateLimit(req, config)
      const result = await rateLimit(req, config)

      expect(result.success).toBe(false)
      expect(result.headers['Retry-After']).toBeDefined()
      expect(parseInt(result.headers['Retry-After'])).toBeGreaterThan(0)
    })
  })

  describe('Identifier extraction', () => {
    it('should use x-forwarded-for header', async () => {
      const req1 = createRequest({ 'x-forwarded-for': '192.168.1.1' })
      const req2 = createRequest({ 'x-forwarded-for': '192.168.1.2' })
      const config = { interval: 60000, maxRequests: 1 }

      const result1 = await rateLimit(req1, config)
      expect(result1.success).toBe(true)

      // Different IP should have separate limit
      const result2 = await rateLimit(req2, config)
      expect(result2.success).toBe(true)

      // Same IP should be blocked
      const result3 = await rateLimit(req1, config)
      expect(result3.success).toBe(false)
    })

    it('should handle multiple IPs in x-forwarded-for', async () => {
      const uniqueIP = `192.168.${requestCounter}.1`
      const req = createRequest({ 'x-forwarded-for': `${uniqueIP}, 10.0.0.1` })
      const config = { interval: 60000, maxRequests: 1 }

      const result = await rateLimit(req, config)
      expect(result.success).toBe(true)

      // Second request from same first IP should be blocked
      const req2 = createRequest({ 'x-forwarded-for': `${uniqueIP}, 10.0.0.1` })
      const result2 = await rateLimit(req2, config)
      expect(result2.success).toBe(false)
    })

    it('should use x-real-ip as fallback', async () => {
      const uniqueIP = `192.168.${requestCounter}.1`
      const req = createRequest({ 'x-real-ip': uniqueIP })
      const config = { interval: 60000, maxRequests: 1 }

      const result = await rateLimit(req, config)
      expect(result.success).toBe(true)

      const req2 = createRequest({ 'x-real-ip': uniqueIP })
      const result2 = await rateLimit(req2, config)
      expect(result2.success).toBe(false)
    })
  })

  describe('Time window reset', () => {
    it('should reset after interval expires', async () => {
      const req = createRequest()
      const config = { interval: 100, maxRequests: 1 } // 100ms window

      const result1 = await rateLimit(req, config)
      expect(result1.success).toBe(true)

      const result2 = await rateLimit(req, config)
      expect(result2.success).toBe(false)

      // Wait for interval to expire
      await new Promise((resolve) => setTimeout(resolve, 150))

      const result3 = await rateLimit(req, config)
      expect(result3.success).toBe(true)
    })
  })

  describe('Configuration', () => {
    it('should respect custom interval', async () => {
      const req = createRequest()
      const config = { interval: 50, maxRequests: 1 }

      await rateLimit(req, config)
      const result = await rateLimit(req, config)
      expect(result.success).toBe(false)

      await new Promise((resolve) => setTimeout(resolve, 60))
      const result2 = await rateLimit(req, config)
      expect(result2.success).toBe(true)
    })

    it('should respect custom maxRequests', async () => {
      const req = createRequest()
      const config = { interval: 60000, maxRequests: 10 }

      for (let i = 0; i < 10; i++) {
        const result = await rateLimit(req, config)
        expect(result.success).toBe(true)
      }

      const result = await rateLimit(req, config)
      expect(result.success).toBe(false)
    })
  })
})
