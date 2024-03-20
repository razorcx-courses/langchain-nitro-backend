export default eventHandler(async (event) => {
  return await $fetch("/api/templates/index");
});
