import { useJsonOutput } from "../../lib/jsonOutput";

export default defineEventHandler(async (event) => {
  try {
    const topic = getRouterParam(event, "topic");
    return await useJsonOutput(topic);
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
