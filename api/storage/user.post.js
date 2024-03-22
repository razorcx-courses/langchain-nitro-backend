import { redisClient } from "../../lib/redisClient";

export default defineEventHandler(async (event) => {
  try {
    const { id, name } = await readBody(event);

    console.log(id, name);

    const key = `user:${id}`;

    await useStorage().setItem(key, { name: name });

    const client = redisClient();
    const redisResult = await client.set(key, { name: name });

    return { id, name, key, redisResult };
  } catch (error) {
    throw createError({
      statusText: "Storage Failed",
      statusCode: 401,
    });
  }
});
