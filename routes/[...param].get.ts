export default eventHandler(async (event) => {
  const query = getQuery(event);
  const url = getRequestURL(event);
  const param1 = getRouterParam(event, "param"); //event.context.params.param,

  const request = {
    method: event.method,
    pathname: url.pathname,
    path: event.path,
    param1,
    query,
    search: url.search,
    url: url.href,
  };

  console.log("Request:", request);

  const template = await $fetch("/api/templates" + event.path);

  return template;
});
