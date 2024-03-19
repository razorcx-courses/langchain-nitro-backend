export default defineEventHandler((event) => {
  console.log("Middleware | URL: " + getRequestURL(event));
  console.log("Middleware | EVENT: " + event);
});
