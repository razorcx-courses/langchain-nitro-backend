import { useRagWithPdf } from "../../lib/ragWithPdf";

export default defineEventHandler(async (event) => {
  let message;
  let status = "success";

  try {
    const docs = await readBody(event);
    console.log(docs);
    const response = await useRagWithPdf(docs, "Tell me about the document");
    message = response;
  } catch (e) {
    status = e.message;
  } finally {
    return { message, status };
  }
});
