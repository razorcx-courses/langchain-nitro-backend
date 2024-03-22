import { useChatPromptTemplate } from "../../lib/chatPrompts";

export default defineEventHandler(async (event) => {
  let message;
  let status = "success";

  try {
    const { input_language, output_language, text } = getQuery(event);
    const response = await useChatPromptTemplate(
      input_language,
      output_language,
      text
    );
    
    console.log({ input_language, output_language, text, response });

    message = response;
  } catch (e) {
    status = e.message;
  } finally {
    return { message, status };
  }
});
