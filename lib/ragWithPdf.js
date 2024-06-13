import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
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
  //https://github.com/langchain-ai/langchainjs/issues/943 - nov 24 2023 - Riyaancode

  //console.log(docs, question);

  try {
    const prompt =
      PromptTemplate.fromTemplate(`Answer the question based only on the following context:
{context}

Question: {question}`);

    const embeddingsModel = new OpenAIEmbeddings({
      openAIApiKey: config.openApiKey,
      modelName: "text-embedding-3-small",
    });

    // const splitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 50,
    //   chunkOverlap: 1,
    //   separators: ["|", "##", ">", "-"],
    // });

    // const docOutput = await splitter.splitDocuments([
    //   new Document({ pageContent: docs }),
    // ]);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docOutput = await textSplitter.splitDocuments([
      new Document({ pageContent: docs }),
    ]);

    const splits = await textSplitter.splitDocuments(docOutput);

    console.log(splits);

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splits,
      embeddingsModel,
      { similarity: similarity.pearson }
    );

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

    return result;

    // return retrievedDocs;
  } catch (error) {
    return error;
  }
};
