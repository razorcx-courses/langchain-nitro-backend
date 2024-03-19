import { usePipelinePrompt  } from "../../lib/pipelinePrompts";

export default defineEventHandler(async (event) => {
  let message;
  let status = "success";

  try {
    const { q } = getQuery(event);
    const response = await usePipelinePrompt(q);
    message = response;
  } catch (e) {
    status = e.message;
  } finally {
    return { message, status }
  }
});
