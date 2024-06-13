import { useRagWithPdf } from "../../lib/ragWithPdf";

export default defineEventHandler(async (event) => {
  try {
    const { docs, prompt } = await readBody(event);
    // console.log(docs, prompt);
    const response = await useRagWithPdf(docs, prompt);
    console.log(response);
    return response;
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error" ,
    });
  }
});
