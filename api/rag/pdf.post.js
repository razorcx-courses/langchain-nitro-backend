import { useRagWithPdf } from "../../lib/ragWithPdf";

export default defineEventHandler(async (event) => {
  let message;
  let status = "success";

  try {
    const { docs, prompt } = await readBody(event);
    // console.log(docs, prompt);
    const response = await useRagWithPdf(docs, prompt);
    message = response;
  } catch (e) {
    status = e.message;
  } finally {
    return { message, status };
  }
});
