export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = getRequestURL(event);
  const params = getRouterParam(event, "param");
  // const body = await readBody(event);

  
  // console.log(event)

  const request = {
    method: event.method,
    pathname: url.pathname,
    path: event.path,
    params,
    query,
    search: url.search,
    url: url.href,
    // body
  };

  console.log(request);
  // console.log(event.context.params);

  const getTemplate = (name: string) => {
    return useStorage("assets:templates").getItem(`${name}.html`);
  };

  const routes = [
    {
      path: "/joke",
      template: async () => await getTemplate("joke"),
      routeParam: () => {
        return getRouterParam(event, "param").replace("joke/", "");
      },
    },
    {
      path: "/about",
      template: async () => await getTemplate("about"),
    },
    {
      path: "/contact",
      template: async () => await getTemplate("contact"),
    },
    {
      path: "/login",
      template: async () => await getTemplate("login"),
    },
  ];

  const route = routes.find((route) =>
    url.pathname.toLowerCase().startsWith(route.path)
  );

  if (route?.path === "/joke") {
    const param = route.routeParam();
    console.log(param);
  }

  if (route) {
    return await route.template();
  } else {
    return { error: "Route not found.", request };
  }
});
