import { multiInputPromptTemplateExample } from "../../lib/prompts";

export default defineEventHandler(async (event) => {
  try {
    const { template, adjective, noun } = getQuery(event);
    console.log(template, adjective, noun);
    const response = await multiInputPromptTemplateExample(
      template,
      adjective,
      noun
    );
    console.log({ template, adjective, noun, response });
    return response;
  } catch (error) {
    return { "error:": error.message };
  }
});
