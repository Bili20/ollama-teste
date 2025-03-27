import { IaService } from "../services/aiService.js";
import { mockProducts } from "../data/mockProduct.js";
import fs from "fs/promises";
import path from "path";

const iaService = new IaService();

async function processarEmbeddings() {
  for (const produto of mockProducts) {
    produto.embedding = await iaService.generateEmbedding(produto.description);
    console.log(`Embedding gerado para ${produto.name}`);
  }

  const filePath = path.join(process.cwd(), "src/data/mockProduct.ts");

  const fileContent = `export const mockProducts = ${JSON.stringify(
    mockProducts,
    null,
    2
  )};`;

  await fs.writeFile(filePath, fileContent, "utf-8");
  console.log("Embeddings salvos no arquivo mockProducts.ts!");
}

processarEmbeddings();
