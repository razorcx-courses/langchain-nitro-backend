export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const url = getRequestURL(event);
  const param1 = getRouterParam(event, "param");
  const slug = getRouterParam(event, "slug");

  const request = {
    method: event.method,
    pathname: url.pathname,
    path: event.path,
    param1,
    slug,
    query,
    search: url.search,
    url: url.href,
  };

  console.log(request);

  const route = {
    path: param1,
    getTemplate: async () =>
      await useStorage("assets:templates").getItem(`/langchain/${param1}.html`),
    slug,
    getResponse: async () => $fetch(event.path.replace("langchain", "api")),
  };

  console.log(route);

  //api calls

  if (route) {
    const response = await route.getResponse();
    let template = await route.getTemplate();

    console.log("API response:", response);

    if (response) {
      switch (route.path) {
        case "joke":
          template = template
            .replace("{{ setup }}", response.setup)
            .replace("{{ punchline }}", response.punchline);
          break;

        case "prompts":
          template = template.replace("{{ response }}", response);
          break;
      }
    }

    return template;
  }
});
