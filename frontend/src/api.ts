export type PatentDocument = {
  id: string;
  title: string;
  summary: string;
  publicationNumber: string;
  publicationDate: string;
  applicant: string;
  sourceName: string;
  sourceUrl?: string;
  sourceType: "DEMO" | "OFFICIAL";
  evidenceSnippets: string[];
  matchingTerms: string[];
};

export type SearchResponse = {
  mode: string;
  notice: string;
  total: number;
  results: PatentDocument[];
};

const examples: PatentDocument[] = [
  {
    id: "demo-water-01",
    title: "Exemplo sintético de captação e filtragem de água pluvial",
    summary:
      "Registro fictício criado apenas para demonstrar busca, evidências e comparação no protótipo.",
    publicationNumber: "Sem número oficial — exemplo demonstrativo",
    publicationDate: "2024-08-01",
    applicant: "Corpus fictício do protótipo",
    sourceName: "Amostra demonstrativa",
    sourceType: "DEMO",
    evidenceSnippets: [
      "Exemplo fictício: reservatório, filtragem inicial e reaproveitamento de água da chuva.",
    ],
    matchingTerms: ["captação de água da chuva", "filtragem", "reservatório"],
  },
  {
    id: "demo-water-02",
    title: "Exemplo sintético de monitoramento de nível em reservatório",
    summary:
      "Registro fictício para testar consultas que combinem armazenamento, sensores e alertas.",
    publicationNumber: "Sem número oficial — exemplo demonstrativo",
    publicationDate: "2023-03-01",
    applicant: "Corpus fictício do protótipo",
    sourceName: "Amostra demonstrativa",
    sourceType: "DEMO",
    evidenceSnippets: [
      "Exemplo fictício: sensor de nível e aviso de necessidade de manutenção do reservatório.",
    ],
    matchingTerms: ["sensor", "nível", "reservatório", "monitoramento"],
  },
  {
    id: "demo-garden-01",
    title: "Exemplo sintético de irrigação orientada por umidade do solo",
    summary:
      "Registro inventado para validar consultas de tecnologias agrícolas no ambiente demonstrativo.",
    publicationNumber: "Sem número oficial — exemplo demonstrativo",
    publicationDate: "2022-11-01",
    applicant: "Corpus fictício do protótipo",
    sourceName: "Amostra demonstrativa",
    sourceType: "DEMO",
    evidenceSnippets: [
      "Exemplo fictício: sensor de umidade aciona o controle de irrigação de uma área de cultivo.",
    ],
    matchingTerms: ["sensor", "umidade do solo", "irrigação", "controle"],
  },
];

export async function searchPatents(
  description: string,
): Promise<SearchResponse> {
  try {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    if (!response.ok) throw new Error("API indisponível");
    return (await response.json()) as SearchResponse;
  } catch {
    const query = normalize(description);
    const results = examples.filter((item) =>
      normalize(
        [
          item.title,
          item.summary,
          ...item.matchingTerms,
          ...item.evidenceSnippets,
        ].join(" "),
      )
        .split(" ")
        .some((term) => term.length > 3 && query.includes(term)),
    );
    return {
      mode: "DEMO_LOCAL",
      notice:
        "Modo de demonstração local: exemplos fictícios, sem consulta a bases oficiais.",
      total: results.length,
      results,
    };
  }
}

export async function explainMatches(
  description: string,
  documentIds: string[],
) {
  try {
    const response = await fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, documentIds }),
    });
    if (!response.ok) throw new Error("API indisponível");
    return (await response.json()) as { explanation: string; notice: string };
  } catch {
    return {
      explanation:
        "A comparação demonstra como trechos relacionados poderiam ser apresentados. O protótipo ainda não consulta documentos oficiais nem está conectado a um modelo de linguagem.",
      notice:
        "Exemplos fictícios. Similaridade temática não significa novidade, elegibilidade ou chance de concessão.",
    };
  }
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}
