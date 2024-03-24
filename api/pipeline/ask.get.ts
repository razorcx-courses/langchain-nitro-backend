import { usePipelinePrompt } from "../../lib/pipelinePrompts";

export default defineEventHandler(async (event) => {
  try {
    const { human } = getQuery(event);
    return await usePipelinePrompt(human);
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
