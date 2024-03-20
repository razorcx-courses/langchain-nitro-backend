export default eventHandler(async (event) => {
  const query = getQuery(event);
  const url = getRequestURL(event);
  const param1 = getRouterParam(event, "param"); //event.context.params.param,

  const request = {
    method: event.method,
    pathname: url.pathname,
    path: event.path,
    param1: event.context.params.param,
    query,
    search: url.search,
    url: url.href,
  };

  console.log(request);

  const route = {
    path: param1,
    getTemplate: async () =>
      await useStorage("assets:templates").getItem(`/pages/${param1}.html`),
  };
  
  if (route) {
    return await route.getTemplate();
  }

  return request;
});
