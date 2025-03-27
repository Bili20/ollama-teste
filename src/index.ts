import express from "express";
import { mockProducts } from "./data/mockProduct.js";
import { UserInput } from "./models/userInput.js";
import { IaService } from "./services/aiService.js";
import { ProductService } from "./services/productService.js";

const app = express();
app.use(express.json());

const productsService = new ProductService(mockProducts);
const iaService = new IaService();

app.post("/explanation", async (req, res) => {
  let result = null;
  try {
    const inputUser: UserInput = req.body;
    const userEmbedding = await iaService.generateEmbedding(inputUser.context);

    const products = productsService.searchProducts(
      userEmbedding,
      inputUser.answers
    );

    if (products.length) {
      result = await iaService.generateExplenation(inputUser.context, products);
    }

    res.json({
      explanation: result,
    });
  } catch (error) {
    console.error("Erro na rota:", error);
    res.status(500).json({
      error: "Erro interno no processamento da IA",
    });
  }
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
