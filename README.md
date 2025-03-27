# Consultor de Vendas com Ollama

Este projeto é um estudo que utiliza a ferramenta **Ollama** para simular um consultor de vendas inteligente. Ele processa entradas do usuário, como contexto e preferências, e retorna recomendações de produtos com base em similaridade semântica e filtros definidos.

## Funcionalidades

- **Recomendações de Produtos**: O sistema utiliza embeddings gerados a partir de descrições de produtos e do contexto fornecido pelo usuário para calcular similaridades e recomendar os produtos mais relevantes.
- **Explicações Personalizadas**: Gera explicações personalizadas para as recomendações feitas, utilizando inteligência artificial.
- **Processamento de Embeddings**: Um script automatizado para gerar e salvar embeddings para os produtos no dataset.

## Estrutura do Projeto

## Estrutura do Projeto
```
src/
├── index.ts # Ponto de entrada da aplicação
├── constants/
│ └── constants.ts # Constantes globais do projeto
├── data/
│ └── mockProduct.ts # Dados mock de produtos
├── models/
│ ├── product.ts # Modelo de dados para produtos
│ ├── userInput.ts # Modelo de entrada do usuário
│ └── dto/
│ └── answers.dto.ts # DTO para respostas do usuário
├── scripts/
│ └── generateEmbedding.ts # Script para gerar embeddings
├── services/
│ ├── aiService.ts # Serviço para interagir com a IA
│ └── productService.ts # Serviço para manipulação de produtos
```
## Como Funciona

1. **Entrada do Usuário**: O usuário envia um contexto e respostas (como categoria e preço máximo) para a API.
2. **Geração de Embeddings**: O contexto do usuário é processado para gerar um embedding utilizando o serviço de IA.
3. **Busca de Produtos**: Os produtos são filtrados com base nas respostas do usuário e ordenados pela similaridade calculada entre os embeddings.
4. **Explicação**: Uma explicação personalizada é gerada para os produtos recomendados.

## Como Executar

### Pré-requisitos

- Node.js instalado
- Gerenciador de pacotes `npm` ou `yarn`

### Passos

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Execute o script para gerar embeddings dos produtos

- npx ts-node src/scripts/generateEmbedding.ts

3. Inicie o servidor:
   npm run dev

4. Faça uma requisição para a rota /explanation com o seguinte payload:
```
   {
   "context": "Descrição do que o usuário está buscando",
   "answers": {
   "maxPrice": 100,
   "category": "tecnologia"
   }
   }
```
