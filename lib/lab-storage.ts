/**
 * Lab Storage Module
 * Persists Lab run history to Upstash Redis.
 * Mirrors the analytics.ts pattern — gracefully degrades if Redis not configured.
 */

// Types live in lib/models/lab-run.ts so UI pages can import them without pulling in server-only code
import type { LabRun } from "./models/lab-run";
export type { LabRunGateResult, LabRunScorerResult, LabRun } from "./models/lab-run";

class LabStorageClient {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private redis: any | null = null;
  private enabled = false;
  private readonly MAX_RUNS = 1000;
  private readonly RUNS_KEY = "lab:runs";
  // Store the init promise so save/getRecent always await it before acting
  private readonly initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      if (
        !process.env.UPSTASH_REDIS_REST_URL ||
        !process.env.UPSTASH_REDIS_REST_TOKEN
      ) {
        return;
      }

      const { Redis } = await import("@upstash/redis");
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });

      this.enabled = true;
    } catch {
      this.enabled = false;
    }
  }

  /**
   * Save a completed lab run. Fire-and-forget — never throws.
   */
  async save(run: LabRun): Promise<void> {
    await this.initPromise; // wait for Redis to be ready
    if (!this.enabled || !this.redis) return;

    try {
      const json = JSON.stringify(run);
      void this.redis
        .multi()
        .lpush(this.RUNS_KEY, json)
        .ltrim(this.RUNS_KEY, 0, this.MAX_RUNS - 1)
        .exec()
        .catch((err: Error) => {
          console.warn("[LabStorage] Failed to save run:", err.message);
        });
    } catch {
      // Never throw
    }
  }

  /**
   * Get recent lab runs, newest first.
   */
  async getRecent(limit = 50): Promise<LabRun[]> {
    await this.initPromise; // wait for Redis to be ready
    if (!this.enabled || !this.redis) return [];

    try {
      const jsons = await this.redis.lrange(this.RUNS_KEY, 0, limit - 1);
      if (!jsons || jsons.length === 0) return [];

      return jsons
        .map((json: string) => {
          try {
            return JSON.parse(json) as LabRun;
          } catch {
            return null;
          }
        })
        .filter((r: LabRun | null): r is LabRun => r !== null);
    } catch {
      return [];
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const labStorage = new LabStorageClient();
