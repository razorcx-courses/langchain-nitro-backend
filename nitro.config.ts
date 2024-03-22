//https://nitro.unjs.io/config
export default defineNitroConfig({
  // srcDir: "server",
  serverAssets: [
    {
      baseName: "templates",
      dir: "./templates",
    },
  ],
  noPublicDir: false, // default
  publicAssets: [
    {
      baseURL: "images",
      dir: "public/images",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  ],
  compressPublicAssets: { gzip: true, brotli: true },
  runtimeConfig: {
    upstashRedisRestUrl: process.env.NUXT_UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.NUXT_UPSTASH_REDIS_REST_TOKEN,
  },
});
