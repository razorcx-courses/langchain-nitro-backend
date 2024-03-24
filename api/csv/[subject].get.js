import { useCsvListOutputParser } from "../../lib/csvListOutputParser";

// /api/csv/[subject]   /api/csv/plants
export default defineEventHandler(async (event) => {
  try {
    const subject = getRouterParam(event, "subject");
    return await useCsvListOutputParser(subject);
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
