// project/src/lib/rateLimiter.js

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

// Create a new ratelimiter; allows 10 requests per 10 seconds
export const ratelimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in database. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});
