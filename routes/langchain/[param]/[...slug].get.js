export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = getRequestURL(event);
  const param1 = getRouterParam(event, "param");
  const slug = getRouterParam(event, "slug");

  // const body = await readBody(event);

  // console.log(event)

  const request = {
    method: event.method,
    pathname: url.pathname,
    path: event.path,
    param1,
    slug,
    query,
    search: url.search,
    url: url.href,
    // body
  };

  console.log(request);
  // console.log(event.context.params);

  const getTemplate = (name) => {
    return useStorage("assets:templates").getItem(`${name}.html`);
  };

  const routes = [
    {
      path: "joke",
      getTemplate: async () => await getTemplate("joke"),
      slug,
      getResponse: async () => $fetch("/api/joke/" + slug),
    },
    {
      path: "prompts",
      getTemplate: async () => await getTemplate("prompts"),
      slug,
    },
  ];

  //get the route
  const route = routes.find((route) =>
    param1.toLowerCase().startsWith(route.path)
  );

  //find the slug parameters(s)
  let param2, param3;

  if (slug) {
    const params = slug.split("/");
    if (params?.length > 0) {
      param2 = params[0];
    }
    if (params?.length > 1) {
      param3 = params[1];
    }
  }

  console.log(param2, param3);

  //api calls

  if (route) {
    const response = await route.getResponse();
    const template = (await route.getTemplate()).toString();

    if (response) {
      const newTemplate = template
        .replace("{{ setup }}", response?.setup)
        .replace("{{ punchline }}", response?.punchline);

      return newTemplate;
    } else {
      return template;
    }
  } else {
    return { error: "Route not found.", request };
  }
});
