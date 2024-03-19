import { useFewShotPrompting } from "../../lib/fewShotPrompts";

export default defineEventHandler(async (event) => {
  let message;
  let status = "success";

  try {
    const { human } = getQuery(event);
    const response = await useFewShotPrompting(human);
    message = response;
  } catch (e) {
    status = e.message;
  } finally {
    return { message, status };
  }
});
