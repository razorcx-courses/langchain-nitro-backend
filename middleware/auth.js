export default defineEventHandler((event) => {
  const authCode = getRequestHeader(event, "Authorization");

  // console.log("Middleware | URL: " + getRequestURL(event));
  // console.log("Middleware | EVENT: " + event);
  // console.log("Middleware | Authorization: " + authCode);

  //check authorization
  const { apiKey } = useRuntimeConfig();
  // if (authCode !== apiKey)
  //   return createError({
  //     statusCode: 401,
  //     statusMessage: "Unauthorized",
  //   });
});
