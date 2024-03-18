import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputKeyToolsParser } from "langchain/output_parsers";

import { chatOpenAIModel as model } from "../lib/chatOpenAI";

export const useJsonOutput = async (input) => {
  const properties = {
    setup: {
      type: "string",
      description: "The setup for the joke",
    },
    punchline: {
      type: "string",
      description: "The joke's punchline",
    },
  };

  const tool = {
    type: "function",
    function: {
      name: "joke",
      description: "Joke to tell user.",
      parameters: {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "Joke",
        type: "object",
        properties,
        required: ["setup", "punchline"],
      },
    },
  };

  // Use `.bind` to attach the tool to the model
  const llmWithTools = model.bind({
    tools: [tool],
    // Optionally, we can pass the tool to the `tool_choice` parameter to
    // force the model to call the tool.
    tool_choice: tool,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are the funniest comedian, tell the user a joke about their topic.",
    ],
    ["human", "Topic: {topic}"],
  ]);

  // const outputParser = new JsonOutputToolsParser();
  const outputParser = new JsonOutputKeyToolsParser({
    keyName: "joke",
    returnSingle: true,  //forces return of single result otherwise return array
  });

  const chain = prompt.pipe(llmWithTools).pipe(outputParser);

  const result = await chain.invoke({ topic: input });

  return result;
};