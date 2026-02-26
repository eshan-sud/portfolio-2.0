// src/lib/rateLimiter.js

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// In-memory store for development (when Vercel KV is not available)
interface RateLimitEntry {
  count: number;
  reset: number;
  [key: string]: unknown;
}

class MemoryStore {
  store: Map<string, RateLimitEntry>;

  constructor() {
    this.store = new Map();
    this.cleanup();
  }

  // Clean up expired entries every minute
  cleanup() {
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.store.entries()) {
        if (value.reset < now) {
          this.store.delete(key);
        }
      }
    }, 60000);
  }

  async get(key) {
    const data = this.store.get(key);
    if (!data || data.reset < Date.now()) {
      this.store.delete(key);
      return null;
    }
    return data;
  }

  async set(key, value, expirationMs) {
    this.store.set(key, {
      ...value,
      reset: Date.now() + expirationMs,
    });
  }
}

// Create in-memory store instance
const memoryStore = new MemoryStore();

// Check if Vercel KV is available
const isKVAvailable = () => {
  try {
    return !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;
  } catch {
    return false;
  }
};

// Create ratelimiter based on environment
const createRateLimiter = () => {
  // If in production with Vercel KV, use Redis-backed rate limiter
  if (isKVAvailable()) {
    console.log("✅ Rate Limiter: Using Vercel KV (Redis)");
    return new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(10, "10 s"),
      analytics: true,
      prefix: "@upstash/ratelimit",
    });
  }

  // Otherwise, use in-memory rate limiter for development
  console.log("⚠️  Rate Limiter: Using in-memory store (development mode)");

  // Simple in-memory rate limiter
  return {
    async limit(identifier) {
      const key = `ratelimit:${identifier}`;
      const limit = 10;
      const windowMs = 10000; // 10 seconds

      const data = await memoryStore.get(key);
      const now = Date.now();

      if (!data) {
        await memoryStore.set(
          key,
          { count: 1, reset: now + windowMs },
          windowMs,
        );
        return {
          success: true,
          limit,
          remaining: limit - 1,
          reset: now + windowMs,
        };
      }

      if (data.count >= limit) {
        return {
          success: false,
          limit,
          remaining: 0,
          reset: data.reset,
        };
      }

      data.count++;
      await memoryStore.set(key, data, data.reset - now);

      return {
        success: true,
        limit,
        remaining: limit - data.count,
        reset: data.reset,
      };
    },
  };
};

export const ratelimiter = createRateLimiter();
