import { useCsvListOutputParser } from "../../lib/csvListOutputParser";

// /api/csv/[subject]   /api/csv/plants
export default defineEventHandler(async (event) => {
  try {
    const subject = getRouterParam(event, "subject");
    const response = await useCsvListOutputParser(subject);
    return response;
  } catch (error) {
    return { "error:": error.message };
  }
});
