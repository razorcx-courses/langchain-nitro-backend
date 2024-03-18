import { ChatPromptTemplate } from "@langchain/core/prompts";

import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

export const useChatPromptTemplate = async (input_language, output_language, text) => {
  const systemTemplate =
    "You are a helpful assistant that translates {input_language} to {output_language}.";
  const humanTemplate = "{text}";

  const chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", humanTemplate],
  ]);

  const stringParser = new StringOutputParser();

  const chain = RunnableSequence.from([chatPrompt, model, stringParser]);

  const result = await chain.invoke({
    input_language: input_language, //"English",
    output_language: output_language, //"French",
    text: text, //"I love programming.",
    format_instructions: stringParser.getFormatInstructions(),
  });

  return result;
};
