import { useFewShotPrompting } from "../../lib/fewShotPrompts";

export default defineEventHandler(async (event) => {
  try {
    const { human } = getQuery(event);
    return await useFewShotPrompting(human);
  } catch (e) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
