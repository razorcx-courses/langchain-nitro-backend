import { redisClient } from "../../lib/redisClient";

export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event, "id");

    const key = `user:${id}`;
    console.log(id, key);

    // const storage = await useStorage().getItem(key);

    const client = redisClient();
    const redisResult: any  = await client.get(key);

    const { name } = redisResult;

    console.log(key, name);
    return { key, name };
  } catch (error) {
    throw createError({
      statusText: "Storage Failed",
      statusCode: 401,
    });
  }
});
