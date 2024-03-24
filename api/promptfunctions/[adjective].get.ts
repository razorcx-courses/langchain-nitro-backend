import { usePromptingWithFunctions } from "../../lib/promptFunctions";

export default defineEventHandler(async (event) => {
  try {
    const adjective = getRouterParam(event, "adjective");
    return await usePromptingWithFunctions(adjective);
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});