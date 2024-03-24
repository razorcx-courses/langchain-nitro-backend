import { simplePromptTemplateExample } from "../../../lib/prompts";

export default defineEventHandler(async (event) => {
  try {
    const product = getRouterParam(event, "product");
    return await simplePromptTemplateExample(product);
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
