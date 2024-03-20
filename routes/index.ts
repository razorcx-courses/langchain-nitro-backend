export default eventHandler(async (event) => {
  const data = await useStorage("assets:server").getItem(`data.json`);
  console.log(data);
  return await useStorage("assets:templates").getItem(`/pages/index.html`);
});
