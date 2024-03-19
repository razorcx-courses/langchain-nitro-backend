import { PromptTemplate } from "@langchain/core/prompts";
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { chatOpenAIModel as model } from "../lib/chatOpenAI";

export const useCsvListOutputParser = async (input) => {
  const parser = new CommaSeparatedListOutputParser();

  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate("List five {subject}.\n{format_instructions}"),
    model,
    parser,
  ]);

  /*
 List five ice cream flavors.
 Your response should be a list of comma separated values, eg: `foo, bar, baz`
*/
  const result = await chain.invoke({
    subject: input,
    format_instructions: parser.getFormatInstructions(),
  });

  return result;
};
