import { noInputPromptTemplateExample } from "../../lib/prompts";

export default defineEventHandler(async (event) => {
  try {
    const { template } = getQuery(event);
    const response = await noInputPromptTemplateExample(template);
    console.log({ template, response });
    return response;
  } catch (error) {
    return { "error:": error.message };
  }
});
