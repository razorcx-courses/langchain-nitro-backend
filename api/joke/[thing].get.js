import { getJokeResponse } from "../../lib/jokes";

// /api/joke/[thing]   /api/joke/goat
export default defineEventHandler(async (event) => {
  try {
    const thing = getRouterParam(event, "thing");
    const response = await getJokeResponse(thing);
    console.log({ thing, response });
    return response;
  } catch (error) {
    throw createError({
      statusText: "Joke Failed",
      statusCode: 401,
    });
  }
});
