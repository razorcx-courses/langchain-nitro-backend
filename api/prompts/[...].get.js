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
        const response = await multiInputPromptTemplateExample(
          template,
          adjective,
          noun
        );
        console.log("multi-input:", [template, adjective, noun, response]);
        return response;
      } catch (error) {
        return { "error:": error.message };
      }
    })
  )
  .get(
    "/oneinput",
    defineEventHandler(async (event) => {
      try {
        const { template, adjective } = getQuery(event);
        const response = await oneInputPromptTemplateExample(
          template,
          adjective
        );
        console.log("one-input:", { template, adjective, response });
        return response;
      } catch (error) {
        return { "error:": error.message };
      }
    })
  )
  .get(
    "/noinput",
    defineEventHandler(async (event) => {
      try {
        const { template } = getQuery(event);
        const response = await noInputPromptTemplateExample(template);
        console.log("no-input:", { template, response });
        return response;
      } catch (error) {
        return { "error:": error.message };
      }
    })
  );

export default useBase("/api/prompts", router.handler);
