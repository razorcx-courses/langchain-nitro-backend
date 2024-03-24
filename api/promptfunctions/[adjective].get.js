import { usePromptingWithFunctions } from "../../lib/promptFunctions";

export default defineEventHandler(async (event) => {
  try {
    const adjective = getRouterParam(event, "adjective");
    const response = await usePromptingWithFunctions(adjective);
    console.log({ adjective, response });
    return response;
  } catch (error) {
    throw createError({
      statusText: "Joke Failed",
      statusCode: 401,
    });
  }
});