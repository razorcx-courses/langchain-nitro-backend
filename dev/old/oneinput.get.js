import { oneInputPromptTemplateExample } from "../../lib/prompts";

export default defineEventHandler(async (event) => {
  try {
    const { template, adjective } = getQuery(event);
    const response = await oneInputPromptTemplateExample(template, adjective);
    console.log({ template, adjective, response });
    return response;
  } catch (error) {
    return { "error:": error.message };
  }
});
