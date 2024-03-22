import { simplePromptTemplateExample } from "../../../lib/prompts";

export default defineEventHandler(async (event) => {
  try {
    const product = getRouterParam(event, "product");
    const response = await simplePromptTemplateExample(product);
    console.log({ product, response });
    return response;
  } catch (error) {
    throw createError({
      statusText: "Simple prompt failed",
      statusCode: 401,
    });
  }
});
