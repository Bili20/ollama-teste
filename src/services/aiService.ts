import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Product } from "../models/product.js";
import { ChatOllama, OllamaEmbeddings } from "@langchain/ollama";
import {
  MESSAGE_TAMPLATE_SYSTEM,
  MESSAGE_TAMPLATE_HUMAN,
  BASE_URL,
} from "../constants/constants.js";

export class IaService {
  private readonly proptTamplate: ChatPromptTemplate;
  private readonly embeddingsModel: OllamaEmbeddings;
  private readonly model: ChatOllama;
  constructor() {
    this.proptTamplate = ChatPromptTemplate.fromMessages([
      ["system", MESSAGE_TAMPLATE_SYSTEM],
      ["human", MESSAGE_TAMPLATE_HUMAN],
    ]);

    this.model = new ChatOllama({
      model: "gemma3:1b",
      baseUrl: BASE_URL,
      temperature: 0,
      maxRetries: 3,
      verbose: true,
    });

    this.embeddingsModel = new OllamaEmbeddings({
      model: "nomic-embed-text",
      maxConcurrency: 2,
      maxRetries: 3,
      baseUrl: BASE_URL,
    });
  }
  async generateExplenation(context: string, products: Product[]) {
    try {
      const productsText = products
        .map(
          (product) =>
            `- ${product.name} (ID: ${product.id}): ${product.description}`
        )
        .join("\n");

      const chainForJsonMode = this.proptTamplate.pipe(this.model);

      const result = await chainForJsonMode.invoke(
        {
          input: context,
          products: productsText,
        },
        {
          timeout: 30000,
        }
      );
      const newResult = result.text
        .replaceAll(/\n/g, " ")
        .replaceAll(/\\"/g, '"');
      return newResult;
    } catch (e) {
      console.error("Erro ao gerar pergunta:", e);
      throw new Error("Falha ao realizar a pergunta IA.");
    }
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const embedding = await this.embeddingsModel.embedQuery(text);
      return embedding;
    } catch (e) {
      console.error("Erro ao gerar embedding:", e);
      throw new Error("Falha na geração do embedding");
    }
  }
}
