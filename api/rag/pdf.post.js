import { useRagWithPdf } from "../../lib/ragWithPdf";

export default defineEventHandler(async (event) => {
  try {
    const { docs, prompt } = await readBody(event);
    return await useRagWithPdf(docs, prompt);
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
});
