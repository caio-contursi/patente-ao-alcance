# Desenvolvimento local

## O que já está nesta primeira estrutura

- `backend/`: API Java 21 com Spring Boot. Inclui busca textual simples, consulta de documento, explicação demonstrativa e retorno de feedback sem persistência.
- `frontend/`: interface React + TypeScript para busca guiada, resultados, seleção para comparação, avisos de escopo e apresentação responsiva.
- `docs/`: planejamento e visão do produto usados como referência.

A aba **Pesquisar** usa exemplos sintéticos. A aba **Chat com a IA** usa um catálogo separado, com publicações reais da RPI e referências educativas do INPI.

## Executar a interface

Requisitos: Node.js 20.19+ ou 22.12+.

```powershell
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173`. A busca demonstrativa tem exemplos locais
quando a API Java está desligada. O chat requer a API.
Se o Vite usar outra porta, configure `WEB_ORIGIN` com o endereço exato da
interface antes de iniciar o Java. Origens múltiplas podem ser separadas por vírgula.

## Executar a API

Requisitos: JDK 21 e Maven 3.6.3 ou superior.

```powershell
cd backend
mvn spring-boot:run
```

A API inicia em `http://localhost:8080`. Os endpoints iniciais são:

- `GET /actuator/health`
- `POST /api/search`
- `GET /api/patents/{id}`
- `POST /api/explain`
- `POST /api/feedback`
- `POST /api/research/chat`

Exemplo de pesquisa:

```json
{
  "description": "Sistema para captar água da chuva com filtragem e sensor de nível"
}
```

## Executar o chat com IA local

Com a API Java e a interface em execução, abra **Chat com a IA** na navegação.
A API usa o Ollama em `http://127.0.0.1:11434/api/chat`, com o modelo
`qwen2.5:1.5b`. Em um ambiente com Docker, inicie o serviço em loopback e
baixe o modelo:

```powershell
docker run -d --name patente-ollama -e OLLAMA_NO_CLOUD=1 -p 127.0.0.1:11434:11434 -v patente-ollama-models:/root/.ollama ollama/ollama
docker exec patente-ollama ollama pull qwen2.5:1.5b
docker exec patente-ollama ollama pull qwen3-embedding:0.6b
```

Defina `RESEARCH_OLLAMA_URL` e `RESEARCH_OLLAMA_MODEL` ao iniciar o Java para
usar outro endpoint ou modelo. O endpoint `POST /api/research/chat` recebe a
pergunta e até três perguntas anteriores. O Java faz a busca por termos e
sinônimos, seleciona fontes do catálogo em
`backend/src/main/resources/research/sources.json` e associa a resposta às
referências do catálogo. Quando a geração falha, a tela mostra os resumos
recuperados. A conversa fica na memória da página.

O chat exibe o plano da consulta, a busca, a conferência de referências do
catálogo, as correspondências por característica e a resposta final.
`RESEARCH_EMBEDDING_MODEL` configura o modelo de busca semântica. A API
usa correspondência textual quando o modelo está indisponível.
Cada consulta pode ser baixada como relatório Markdown ou salva por escolha
da pessoa no navegador. Os relatórios salvos ficam neste navegador.

O catálogo inicial reúne dois pedidos publicados na RPI sobre captação de
água e quatro referências educativas do INPI. Ele não cobre a base nacional
completa. A aba de pesquisa anterior continua com seus dados demonstrativos.

## Próximas etapas técnicas

1. Inventariar a VPS e confirmar CPU, RAM, armazenamento, GPU e sistema operacional.
2. Escolher e documentar uma fonte oficial e uma amostra permitida antes de substituir o corpus demonstrativo.
3. Implementar importação, normalização, proveniência e links de origem.
4. Criar persistência em PostgreSQL e avaliar a busca textual com casos de referência.
5. Experimentar embeddings e busca semântica; comparar os resultados com a busca textual.
6. Conectar um modelo de pesos abertos local somente depois de validar recuperação e requisitos da VPS; manter as respostas ancoradas em trechos recuperados.

Não mostrar probabilidades de concessão. Uma futura métrica de similaridade deverá ser explicada como ordenação de resultados, nunca como probabilidade de patenteabilidade.
