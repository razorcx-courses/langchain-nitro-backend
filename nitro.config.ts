//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  // routeRules: {
  //   "/api/**": {
  //     proxy: {
  //       to: "http://localhost:8080/api/**",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*"
  //         // "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //         // "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //       },
  //     },
  //   },
  // },
  // routeRules: {
  //   "/api/**": {
  //     cors: false
  //   },
  // },
});
