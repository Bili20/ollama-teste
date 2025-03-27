import { MIN_SIMILARITY } from "../constants/constants.js";
import { AnswersDto } from "../models/dto/answers.dto.js";
import { Product } from "../models/product.js";
import { dot } from "mathjs";

export class ProductService {
  private products: Product[];
  constructor(products: Product[]) {
    this.products = products;
  }

  searchProducts(userEmbedding: number[], answers: AnswersDto) {
    try {
      const products = this.products.filter((product) => {
        if (answers.maxPrice && product.price > answers.maxPrice) {
          return false;
        }
        if (answers.category && !product.tags.includes(answers.category)) {
          return false;
        }

        return true;
      });

      const productsWithSimilarity = products.map((product) => ({
        ...product,
        similarity: this.cosineSimilarity(userEmbedding, product.embedding),
      }));
      return productsWithSimilarity
        .filter((product) => product.similarity >= MIN_SIMILARITY)
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 3);
    } catch (e) {
      throw new Error(`Erro ao buscar produtos ${e}`);
    }
  }

  cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = dot(vecA, vecB);
    const normA = Math.sqrt(dot(vecA, vecA));
    const normB = Math.sqrt(dot(vecB, vecB));
    return dotProduct / (normA * normB);
  }
}
