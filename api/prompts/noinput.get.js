import { noInputPromptTemplateExample } from "../../lib/prompts";

export default defineEventHandler(async (event) => {
  try {
    const { template } = getQuery(event);
    console.log(template);
    const response = await noInputPromptTemplateExample(template);
    return response;
  } catch (error) {
    return { "error:": error.message };
  }
});
