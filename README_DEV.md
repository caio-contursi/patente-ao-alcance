# Desenvolvimento local

## O que já está nesta primeira estrutura

- `backend/`: API Java 21 com Spring Boot. Inclui busca textual simples, consulta de documento, explicação demonstrativa e retorno de feedback sem persistência.
- `frontend/`: interface React + TypeScript para busca guiada, resultados, seleção para comparação, avisos de escopo e apresentação responsiva.
- `docs/`: planejamento e visão do produto usados como referência.

O corpus que acompanha o backend e o fallback do frontend são **inteiramente sintéticos**. Não representam pedidos ou publicações do INPI. Esta versão não consulta bases oficiais e ainda não está conectada a um modelo de IA.

## Executar a interface

Requisitos: Node.js 20.19+ ou 22.12+.

```powershell
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173`. Se a API Java estiver ativa, a interface usa a API; se ela estiver desligada, há um fallback local igualmente sintético.

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

Exemplo de pesquisa:

```json
{
  "description": "Sistema para captar água da chuva com filtragem e sensor de nível"
}
```

## Próximas etapas técnicas

1. Inventariar a VPS e confirmar CPU, RAM, armazenamento, GPU e sistema operacional.
2. Escolher e documentar uma fonte oficial e uma amostra permitida antes de substituir o corpus demonstrativo.
3. Implementar importação, normalização, proveniência e links de origem.
4. Criar persistência em PostgreSQL e avaliar a busca textual com casos de referência.
5. Experimentar embeddings e busca semântica; comparar os resultados com a busca textual.
6. Conectar um modelo de pesos abertos local somente depois de validar recuperação e requisitos da VPS; manter as respostas ancoradas em trechos recuperados.

Não mostrar probabilidades de concessão. Uma futura métrica de similaridade deverá ser explicada como ordenação de resultados, nunca como probabilidade de patenteabilidade.
