import { getJokeResponse } from "../../lib/jokes";

// /api/joke/[thing]   /api/joke/goat
export default defineEventHandler(async (event) => {
  try {
    const thing = getRouterParam(event, "thing");
    return await getJokeResponse(thing);
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Server error",
    });
  }
});
