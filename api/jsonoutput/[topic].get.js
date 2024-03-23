import { useJsonOutput } from "../../lib/jsonOutput";

export default defineEventHandler(async (event) => {
  let message;
  let status = "success";

  try {
    const topic = getRouterParam(event, "topic");
    const response = await useJsonOutput(topic);
    console.log(topic, response);
    message = response;
  } catch (e) {
    status = e.message;
  } finally {
    return { message, status };
  }
});
