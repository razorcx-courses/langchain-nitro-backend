export default defineEventHandler(async (event) => {
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

  try {
    let appTemplate = await useStorage("assets:templates").getItem(
      `/app/base.html`
    );

    let routeTemplate = await useStorage("assets:templates").getItem(
      `/pages/${param1}.html`
    );

    routeTemplate = routeTemplate
      ? routeTemplate
      : await useStorage("assets:templates").getItem(`/app/404.html`);

    appTemplate = appTemplate.replace("{{app}}", routeTemplate);

    console.log(appTemplate);

    return appTemplate;
  } catch (error) {
    throw createError({
      statusText: "Failed",
      statusCode: 401,
    });
  }
});
