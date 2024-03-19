// import { createApp, defineEventHandler } from "h3";

// app.use(defineEventHandler(() => "Hello world!"));

export default eventHandler(async (event) => {
  const data = await useStorage("assets:server").getItem(`data.json`);
  console.log(data);
  return await useStorage("assets:templates").getItem(`home.html`);

  // {
  //   path: "/about",
  //   template: async () => await getTemplate("about"),
  // },
  // {
  //   path: "/contact",
  //   template: async () => await getTemplate("contact"),
  // },
  // {
  //   path: "/login",
  //   template: async () => await getTemplate("login"),
  // },

  // const app = createApp();
  // const router = createRouter();
  // app.use(router);

  // router.get(
  //   "/",
  //   defineEventHandler((event) => {
  //     return { message: "⚡️ Tadaa!" };
  //   })
  // );
});
