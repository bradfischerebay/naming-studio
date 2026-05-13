import type { StoredConversation } from "./models/gpt-conversation";

export type { StoredConversation } from "./models/gpt-conversation";

class GptConversationsStorage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private redis: any | null = null;
  private enabled = false;
  private readonly HASH_KEY = "gpt:conversations";
  private readonly initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return;
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

  async upsert(conv: StoredConversation): Promise<void> {
    await this.initPromise;
    if (!this.enabled || !this.redis) return;
    try {
      await this.redis.hset(this.HASH_KEY, { [conv.id]: JSON.stringify(conv) });
    } catch (err) {
      console.warn("[GptConversations] Failed to upsert:", err);
    }
  }

  async getAll(): Promise<StoredConversation[]> {
    await this.initPromise;
    if (!this.enabled || !this.redis) return [];
    try {
      const hash: Record<string, string> | null = await this.redis.hgetall(this.HASH_KEY);
      if (!hash) return [];
      return Object.values(hash)
        .map((json) => {
          try { return JSON.parse(json) as StoredConversation; } catch { return null; }
        })
        .filter((c): c is StoredConversation => c !== null)
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    } catch {
      return [];
    }
  }

  async delete(convId: string): Promise<void> {
    await this.initPromise;
    if (!this.enabled || !this.redis) return;
    try {
      await this.redis.hdel(this.HASH_KEY, convId);
    } catch (err) {
      console.warn("[GptConversations] Failed to delete:", err);
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

export const gptConversations = new GptConversationsStorage();
