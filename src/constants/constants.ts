export const MIN_SIMILARITY = 0.7;
export const MESSAGE_TAMPLATE_SYSTEM = `Sua resposta deve seguir ESTRITAMENTE este formato sem usar markdown ou formatação especial:
        
        Nome do Produto: [nome] | ID: [id]
        Explicação: [texto curto em parágrafo único]
        
        Benefícios:
        - [benefício 1 em frase curta]
        - [benefício 2 em frase curta]
        - [benefício 3 em frase curta]
        
        Regras:
        * Sem caracteres especiais como ** ou
        * Use apenas quebras de linha simples
        * Separe as seções com uma linha em branco
        * Mantenha o texto natural e coloquial
        Sua resposta deve seguir este formato EXATO:
    
        Exemplo de resposta válida:
        Nome do Produto: Teclado Gamer | ID: 42
        Explicação: Teclado projetado para jogos prolongados com switches duráveis e iluminação personalizável.
    
        Benefícios:
        - Resistência para mais de 50 milhões de pressionamentos
        - 16 cores de iluminação RGB ajustáveis
        - Repouso de pulso ergonômico inclus
    
        Não use markdown, cores ou formatação especial. 
        `;
export const MESSAGE_TAMPLATE_HUMAN = `contexto usuario: "{input}", produtos: {products}`;
export const BASE_URL = "http://localhost:11434";
