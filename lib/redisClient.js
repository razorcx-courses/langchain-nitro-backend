import { Redis } from "@upstash/redis";

const config = useRuntimeConfig();


//https://vitejs.dev/guide/env-and-mode
export const redisClient = () => {
  if (!config.upstashRedisRestUrl || !config.upstashRedisRestToken) {
    throw new Error(
      "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in the environment"
    );
  }
  const client = new Redis({
    url: config.upstashRedisRestUrl,
    token: config.upstashRedisRestToken,
  });
  return client;
};
