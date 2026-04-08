/**
 * Usage Log — Unified event logger for all Naming Studio actions
 * Writes to Redis `usage:events` list (LPUSH + capped at 50k entries)
 * Gracefully no-ops if Redis is not configured.
 *
 * Event types:
 *   chat            — a knowledge or coaching chat turn
 *   name_generation — a Name Generator run
 *   name_validation — a Name Validator run
 *   lab_run         — a Lab streaming evaluation
 */

import crypto from "crypto";

// ─── Event type definitions ───────────────────────────────────────────────────

export type UsageEventType =
  | "chat"
  | "name_generation"
  | "name_validation"
  | "lab_run";

interface BaseUsageEvent {
  id: string;
  type: UsageEventType;
  timestamp: string;    // ISO 8601
  durationMs: number;
  error?: string | null;
}

export interface ChatUsageEvent extends BaseUsageEvent {
  type: "chat";
  mode: "coaching" | "knowledge";
  messageLength: number;
  responseLength: number;
  model: string;
  hasEvaluationContext: boolean;
}

export interface NameGenerationUsageEvent extends BaseUsageEvent {
  type: "name_generation";
  briefSnippet: string;      // first 200 chars
  briefLength: number;
  markets: string[];
  strategies: string[];
  namesPerSubtype: number;
  useDeepSights: boolean;
  totalNamesGenerated: number;
  bucketCount: number;
}

export interface NameValidationUsageEvent extends BaseUsageEvent {
  type: "name_validation";
  nameCount: number;
  names: string[];
  briefSnippet: string;
  briefLength: number;
  markets: string[];
  results: Array<{ name: string; overall: string; score: number }>;
  proceedCount: number;
  cautionCount: number;
  avoidCount: number;
}

export interface LabRunUsageEvent extends BaseUsageEvent {
  type: "lab_run";
  briefSnippet: string;
  briefLength: number;
  model: string;
  verdictPath: string | null;
  gateResults: Record<string, string>;  // gate key → "Pass"|"Fail"|"Pending"
  hasCustomGates: boolean;
  customGateCount: number;
}

export type UsageEvent =
  | ChatUsageEvent
  | NameGenerationUsageEvent
  | NameValidationUsageEvent
  | LabRunUsageEvent;

// Union of loggable event shapes (id + timestamp are auto-added by the logger)
export type LoggableEvent =
  | Omit<ChatUsageEvent, "id" | "timestamp">
  | Omit<NameGenerationUsageEvent, "id" | "timestamp">
  | Omit<NameValidationUsageEvent, "id" | "timestamp">
  | Omit<LabRunUsageEvent, "id" | "timestamp">;

// ─── Logger ──────────────────────────────────────────────────────────────────

const USAGE_KEY = "usage:events";
const MAX_EVENTS = 50_000;

class UsageLogger {
  private redis: {
    lpush: (key: string, value: string) => Promise<unknown>;
    ltrim: (key: string, start: number, stop: number) => Promise<unknown>;
    lrange: (key: string, start: number, stop: number) => Promise<unknown[]>;
    llen: (key: string) => Promise<number>;
  } | null = null;
  private enabled = false;
  private readonly initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initialize();
  }

  private async initialize() {
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      return;
    }
    try {
      const { Redis } = await import("@upstash/redis");
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      }) as typeof this.redis;
      this.enabled = true;
    } catch {
      // Graceful degradation — Redis unavailable
    }
  }

  /**
   * Log a usage event. Fire-and-forget — never throws, never blocks.
   */
  async log(event: LoggableEvent): Promise<void> {
    await this.initPromise;
    if (!this.enabled || !this.redis) return;

    const fullEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    } as UsageEvent;

    try {
      await this.redis.lpush(USAGE_KEY, JSON.stringify(fullEvent));
      await this.redis.ltrim(USAGE_KEY, 0, MAX_EVENTS - 1);
    } catch {
      // Silent — never block the main request path
    }
  }

  /**
   * Retrieve recent usage events, newest first.
   */
  async getRecent(limit = 100, offset = 0): Promise<UsageEvent[]> {
    await this.initPromise;
    if (!this.enabled || !this.redis) return [];
    try {
      const raw = await this.redis.lrange(USAGE_KEY, offset, offset + limit - 1);
      return (raw as unknown[])
        .map((r) => {
          try {
            return typeof r === "string" ? (JSON.parse(r) as UsageEvent) : (r as UsageEvent);
          } catch {
            return null;
          }
        })
        .filter((e): e is UsageEvent => e !== null);
    } catch {
      return [];
    }
  }

  /**
   * Total number of usage events stored.
   */
  async getTotal(): Promise<number> {
    await this.initPromise;
    if (!this.enabled || !this.redis) return 0;
    try {
      return await this.redis.llen(USAGE_KEY);
    } catch {
      return 0;
    }
  }
}

export const usageLog = new UsageLogger();
