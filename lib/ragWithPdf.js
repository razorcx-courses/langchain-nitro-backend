import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
// import { WebPDFLoader } from "langchain/document_loaders/web/pdf";

import { chatOpenAIModel as model } from "../lib/chatOpenAI";

import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";

import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { similarity } from "ml-distance";

const config = useRuntimeConfig();

export const useRagWithPdf = async (docs, question) => {
//   const docs = readFile(file);

  //https://github.com/langchain-ai/langchainjs/issues/943 - nov 24 2023 - Riyaancode

  const prompt =
    PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: config.openApiKey,
    model: "text-embedding-3-small",
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings, {
    similarity: similarity.pearson,
  });

  // const jsonToStore = vectorStore.memoryVectors;

  // Next time when needed I load this file again using the following code.
  // const vectorStoreData = loadDataFromJsonFileStoredAbove();
  // const vectorStore = await MemoryVectorStore.fromExistingIndex(embeddings);
  // vectorStore.memoryVectors = vectorStoreData;

  // Initialize a retriever wrapper around the vector store
  const vectorStoreRetriever = vectorStore.asRetriever();

  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const result = await chain.invoke(question);

  console.log(result);

  return result;
};
