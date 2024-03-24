import {
  multiInputPromptTemplateExample,
  oneInputPromptTemplateExample,
  noInputPromptTemplateExample,
} from "../../lib/prompts";

const router = createRouter();

router
  .get(
    "/multiinput",
    defineEventHandler(async (event) => {
      try {
        const { template, adjective, noun } = getQuery(event);
        console.log(template, adjective, noun);
        return await multiInputPromptTemplateExample(template, adjective, noun);
      } catch (error) {
        return createError({
          statusCode: 500,
          statusMessage: "Server error",
        });
      }
    })
  )
  .get(
    "/oneinput",
    defineEventHandler(async (event) => {
      try {
        const { template, adjective } = getQuery(event);
        return await oneInputPromptTemplateExample(template, adjective);
      } catch (error) {
        return createError({
          statusCode: 500,
          statusMessage: "Server error",
        });
      }
    })
  )
  .get(
    "/noinput",
    defineEventHandler(async (event) => {
      try {
        const { template } = getQuery(event);
        return await noInputPromptTemplateExample(template);
      } catch (error) {
        return createError({
          statusCode: 500,
          statusMessage: "Server error",
        });
      }
    })
  );

export default useBase("/api/prompts", router.handler);
