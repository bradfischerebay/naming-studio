/**
 * Analytics Module
 * Lightweight server-side analytics for tracking naming evaluations
 * Uses Upstash Redis for storage, gracefully degrades if not configured
 */

import { VerdictPath } from "./models/verdict";

/**
 * Analytics event structure
 */
export interface AnalyticsEvent {
  timestamp: string; // ISO 8601
  sessionId: string;
  model: string;
  verdictPath: VerdictPath;
  gateResults: {
    pass: number;
    fail: number;
    unknown: number;
  };
  scoringTotal: number | null;
  requiresClarification: boolean;
  isClarificationRetry: boolean;
  durationMs: number;
  briefLength: number;
  error: string | null;
  // Rich data fields
  briefText: string;
  briefSummary: string | null;
  targetGeographies: string | null;
  targetCustomers: string | null;
  timing: string | null;
  gateResultsFull: Record<string, any> | null;
  verdictTitle: string;
  verdictSummary: string | null;
  scoringBreakdown: Record<string, number> | null;
  questionCount: number;
  retryCount: number;
}

/**
 * Analytics summary
 */
export interface AnalyticsSummary {
  totalEvaluations: number;
  verdictBreakdown: Record<string, number>;
  avgDurationMs: number;
  avgBriefLength: number;
  clarificationRate: number;
  errorRate: number;
  modelBreakdown: Record<string, number>;
  gatePassRates: Record<string, number>;
  topBriefGeographies: Array<{ geography: string; count: number }>;
  avgQuestionCount: number;
  recentEvents: AnalyticsEvent[];
}

/**
 * Analytics client
 * Silently no-ops if Redis is not configured
 */
class AnalyticsClient {
  private redis: any | null = null;
  private enabled = false;
  private readonly MAX_EVENTS = 10000;
  private readonly EVENTS_KEY = "analytics:events";
  private readonly initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initialize();
  }

  private async initialize() {
    try {
      // Only initialize if Redis env vars are present
      if (
        !process.env.UPSTASH_REDIS_REST_URL ||
        !process.env.UPSTASH_REDIS_REST_TOKEN
      ) {
        console.log("[Analytics] Redis not configured - analytics disabled");
        return;
      }

      // Dynamically import Redis to avoid errors if not installed
      const { Redis } = await import("@upstash/redis");
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      this.enabled = true;
      console.log("[Analytics] Redis connected - analytics enabled");
    } catch (error) {
      console.warn(
        "[Analytics] Failed to initialize Redis:",
        error instanceof Error ? error.message : String(error)
      );
      this.enabled = false;
    }
  }

  /**
   * Track an evaluation event
   * Fire-and-forget - never blocks the main request
   */
  async track(event: AnalyticsEvent): Promise<void> {
    await this.initPromise;
    if (!this.enabled || !this.redis) {
      return; // Silent no-op
    }

    try {
      // Serialize event
      const eventJson = JSON.stringify(event);

      // Push to Redis list (fire-and-forget)
      // Using LPUSH + LTRIM to maintain a capped list
      void this.redis
        .multi()
        .lpush(this.EVENTS_KEY, eventJson)
        .ltrim(this.EVENTS_KEY, 0, this.MAX_EVENTS - 1)
        .exec()
        .catch((err: Error) => {
          console.warn("[Analytics] Failed to track event:", err.message);
        });
    } catch (error) {
      // Never throw - analytics should never crash the main flow
      console.warn(
        "[Analytics] Failed to serialize event:",
        error instanceof Error ? error.message : String(error)
      );
    }
  }

  /**
   * Get analytics summary
   */
  async getSummary(): Promise<AnalyticsSummary> {
    if (!this.enabled || !this.redis) {
      return this.getEmptySummary();
    }

    try {
      // Fetch all events (limited to MAX_EVENTS)
      const eventJsons = await this.redis.lrange(this.EVENTS_KEY, 0, -1);

      if (!eventJsons || eventJsons.length === 0) {
        return this.getEmptySummary();
      }

      // Parse events — Upstash may return items as already-parsed objects or as strings
      const events: AnalyticsEvent[] = eventJsons
        .map((json: unknown) => {
          try {
            return (typeof json === "string" ? JSON.parse(json) : json) as AnalyticsEvent;
          } catch {
            return null;
          }
        })
        .filter((e: AnalyticsEvent | null): e is AnalyticsEvent => e !== null);

      // Calculate summary stats
      const totalEvaluations = events.length;
      const verdictBreakdown: Record<string, number> = {};
      const modelBreakdown: Record<string, number> = {};
      const gatePassCounts: Record<string, number> = {};
      const gateTotalCounts: Record<string, number> = {};
      const geographyCount: Record<string, number> = {};
      let totalDuration = 0;
      let totalBriefLength = 0;
      let clarificationCount = 0;
      let errorCount = 0;
      let totalQuestions = 0;
      let pathBCount = 0;

      for (const event of events) {
        // Verdict breakdown — use full path key (PATH_C, PATH_B, etc.)
        const verdictKey = event.verdictPath;
        verdictBreakdown[verdictKey] = (verdictBreakdown[verdictKey] || 0) + 1;

        // Model breakdown
        modelBreakdown[event.model] = (modelBreakdown[event.model] || 0) + 1;

        // Gate pass rates
        if (event.gateResultsFull) {
          for (const [gateKey, gateResult] of Object.entries(event.gateResultsFull)) {
            if (!gateTotalCounts[gateKey]) {
              gateTotalCounts[gateKey] = 0;
              gatePassCounts[gateKey] = 0;
            }
            gateTotalCounts[gateKey]++;
            if (gateResult && typeof gateResult === 'object' && 'status' in gateResult && gateResult.status === 'Pass') {
              gatePassCounts[gateKey]++;
            }
          }
        }

        // Geography tracking
        if (event.targetGeographies) {
          const geos = event.targetGeographies.split(',').map(g => g.trim()).filter(Boolean);
          for (const geo of geos) {
            geographyCount[geo] = (geographyCount[geo] || 0) + 1;
          }
        }

        // Question tracking
        if (event.verdictPath === 'PATH_B') {
          pathBCount++;
          totalQuestions += event.questionCount || 0;
        }

        // Aggregates
        totalDuration += event.durationMs;
        totalBriefLength += event.briefLength;
        if (event.requiresClarification) clarificationCount++;
        if (event.error) errorCount++;
      }

      const avgDurationMs = totalDuration / totalEvaluations;
      const avgBriefLength = totalBriefLength / totalEvaluations;
      const clarificationRate = clarificationCount / totalEvaluations;
      const errorRate = errorCount / totalEvaluations;
      const avgQuestionCount = pathBCount > 0 ? totalQuestions / pathBCount : 0;

      // Calculate gate pass rates
      const gatePassRates: Record<string, number> = {};
      for (const gate of Object.keys(gateTotalCounts)) {
        const passRate = gatePassCounts[gate] / gateTotalCounts[gate];
        gatePassRates[gate] = Math.round(passRate * 100) / 100;
      }

      // Top 5 geographies
      const topBriefGeographies = Object.entries(geographyCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([geography, count]) => ({ geography, count }));

      // Get recent 20 events with ALL fields
      const recentEvents = events.slice(0, 20);

      return {
        totalEvaluations,
        verdictBreakdown,
        avgDurationMs: Math.round(avgDurationMs),
        avgBriefLength: Math.round(avgBriefLength),
        clarificationRate: Math.round(clarificationRate * 100) / 100,
        errorRate: Math.round(errorRate * 100) / 100,
        modelBreakdown,
        gatePassRates,
        topBriefGeographies,
        avgQuestionCount: Math.round(avgQuestionCount * 10) / 10,
        recentEvents,
      };
    } catch (error) {
      console.error(
        "[Analytics] Failed to get summary:",
        error instanceof Error ? error.message : String(error)
      );
      return this.getEmptySummary();
    }
  }

  private getEmptySummary(): AnalyticsSummary {
    return {
      totalEvaluations: 0,
      verdictBreakdown: {},
      avgDurationMs: 0,
      avgBriefLength: 0,
      clarificationRate: 0,
      errorRate: 0,
      modelBreakdown: {},
      gatePassRates: {},
      topBriefGeographies: [],
      avgQuestionCount: 0,
      recentEvents: [],
    };
  }

  /**
   * Check if analytics is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }
}

// Singleton instance
export const analytics = new AnalyticsClient();
