import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

import { StringOutputParser } from "@langchain/core/output_parsers";
import { chatOpenAIModel as model } from "../lib/chatOpenAI";

export const useFewShotPrompting = async (input) => {
  const examples = [
    {
      input: "Could the members of The Police perform lawful arrests?",
      output: "What can the members of The Police do?",
    },
    {
      input: "Jan Sindel's was born in what country?",
      output: "What is Jan Sindel's personal history?",
    },
  ];

  const examplePrompt = ChatPromptTemplate.fromTemplate(`Human: {input}
  {output}`);

  const fewShotPrompt = new FewShotChatMessagePromptTemplate({
    prefix:
      "Rephrase the users query to be more general, using the following examples and include three related questions about the {input}",
    suffix: "Human: {input}",
    examplePrompt,
    examples,
    inputVariables: ["input"],
  });

  const formattedPrompt = await fewShotPrompt.format({
    input: input,
  });

  const stringParser = new StringOutputParser();

  const result = await model.pipe(stringParser).invoke(formattedPrompt);

  return result;
};
