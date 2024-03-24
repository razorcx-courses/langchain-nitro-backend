import { useChatPromptTemplate } from "../../lib/chatPrompts";

export default defineEventHandler(async (event) => {
  try {
    const { input_language, output_language, text } = getQuery(event);
    return await useChatPromptTemplate(input_language, output_language, text);
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
