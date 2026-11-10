import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Bookmark,
  Download,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import "./research-chat.css";

type Source = {
  number: number;
  title: string;
  reference: string;
  url: string;
  summary: string;
  matchedTerms: string[];
  classifications: string[];
};

type Reply = {
  mode: "LOCAL_AI" | "EXCERPTS" | "NO_EVIDENCE";
  message: string;
  statements: { text: string; source: number }[];
  sources: Source[];
  searchTerms: string[];
  scope: string;
  audit?: {
    expandedTerms: string[];
    comparisons: { feature: string; sourceNumbers: number[] }[];
    searchMode: string;
    indexed: number;
    matched: number;
    cited: number;
  };
};

type Turn = { question: string; reply?: Reply; error?: string };

const examples = [
  "Compare captação de água da chuva com filtro e reservatório.",
  "O que é estado da técnica?",
  "Quais são os requisitos para patentear uma invenção?",
];

const modeLabels = {
  LOCAL_AI: "Síntese por IA local",
  EXCERPTS: "Resumos das fontes",
  NO_EVIDENCE: "Sem evidência na amostra",
};

const stages = ["Planejar", "Buscar", "Verificar", "Analisar", "Entregar"];
const reportStorageKey = "patente-ao-alcance.reports.v1";
type SavedReport = { id: string; title: string; markdown: string };

function reportMarkdown(question: string, reply: Reply) {
  const lines = [
    "# Relatório de pesquisa",
    "",
    ...question.split("\n").map((line) => "> " + line),
    "",
    reply.scope,
    "",
    "## Resposta",
    reply.message,
    ...reply.statements.map((item) => `${item.text} [${item.source}]`),
    "",
    "## Evidências",
    ...reply.sources.flatMap((source) => [
      `### [${source.number}] ${source.title}`,
      source.reference,
      source.url,
      source.summary,
      "",
    ]),
    "## Plano de busca",
    `Busca: ${reply.audit?.searchMode ?? "—"}`,
    `Termos: ${reply.searchTerms.join(", ")}`,
    `Expansão: ${reply.audit?.expandedTerms.join(", ") || "—"}`,
    "",
    "## Correspondências por característica",
    ...(reply.audit?.comparisons.map(
      (item) =>
        `- ${item.feature}: ${item.sourceNumbers.map((number) => `[${number}]`).join(", ") || "Sem correspondência textual"}`,
    ) ?? []),
  ];
  return lines.join("\n");
}

function downloadReport(markdown: string) {
  const url = URL.createObjectURL(
    new Blob([markdown], { type: "text/markdown;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "patente-ao-alcance-pesquisa.md";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// randomUUID só existe em HTTPS ou localhost; getRandomValues funciona em qualquer origem.
function reportId() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export default function ResearchChat() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const [savedReports, setSavedReports] = useState<SavedReport[]>(() => {
    try {
      const stored: unknown = JSON.parse(
        localStorage.getItem(reportStorageKey) ?? "[]",
      );
      return Array.isArray(stored)
        ? stored
            .filter(
              (item): item is SavedReport =>
                item &&
                typeof item.id === "string" &&
                typeof item.title === "string" &&
                typeof item.markdown === "string",
            )
            .slice(0, 15)
        : [];
    } catch {
      return [];
    }
  });
  const [saveNotice, setSaveNotice] = useState("");
  const current = useRef<AbortController | null>(null);
  const messages = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => current.current?.abort(), []);
  useEffect(() => {
    if (messages.current)
      messages.current.scrollTop = messages.current.scrollHeight;
  }, [turns, busy]);

  async function send(value: string) {
    const message = value.trim();
    if (!message || current.current) return;
    const controller = new AbortController();
    current.current = controller;
    const previousQuestions = turns
      .filter((turn) => turn.reply)
      .slice(-3)
      .map((turn) => turn.question);
    setQuestion("");
    setBusy(true);
    setTurns((existing) => [...existing, { question: message }]);
    try {
      const response = await fetch("/api/research/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, previousQuestions }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Research request failed");
      const reply: Reply = await response.json();
      if (!controller.signal.aborted)
        setTurns((existing) => [
          ...existing.slice(0, -1),
          { question: message, reply },
        ]);
    } catch {
      if (!controller.signal.aborted) {
        setTurns((existing) => [
          ...existing.slice(0, -1),
          {
            question: message,
            error:
              "Não foi possível consultar o assistente. Tente novamente quando a API estiver disponível.",
          },
        ]);
        setQuestion(message);
      }
    } finally {
      if (current.current === controller) {
        current.current = null;
        setBusy(false);
      }
    }
  }

  function reset() {
    current.current?.abort();
    current.current = null;
    setBusy(false);
    setQuestion("");
    setTurns([]);
    input.current?.focus();
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(question);
  }

  function saveReport(asked: string, reply: Reply) {
    const report = {
      id: reportId(),
      title: asked.slice(0, 120),
      markdown: reportMarkdown(asked, reply),
    };
    storeReports(
      [
        report,
        ...savedReports.filter((item) => item.markdown !== report.markdown),
      ].slice(0, 15),
      "Relatório salvo neste navegador.",
    );
  }

  function storeReports(reports: SavedReport[], successMessage: string) {
    try {
      localStorage.setItem(reportStorageKey, JSON.stringify(reports));
      setSavedReports(reports);
      setSaveNotice(successMessage);
    } catch {
      setSaveNotice("O navegador não conseguiu salvar esta alteração.");
    }
  }

  return (
    <section className="research-chat" aria-labelledby="research-title">
      <header className="research-header">
        <div>
          <span className="demo-badge">
            <Sparkles size={14} /> Assistente de pesquisa
          </span>
          <h1 id="research-title">Chat com a IA</h1>
          <p>
            Investigue tecnologias e acompanhe as evidências de cada resposta.
          </p>
        </div>
        {turns.length > 0 && (
          <button className="text-button" type="button" onClick={reset}>
            <RotateCcw size={15} /> Nova conversa
          </button>
        )}
      </header>

      <ol className="research-stages" aria-label="Etapas da pesquisa">
        {stages.map((stage, index) => (
          <li key={stage}>
            <span>{index + 1}</span> {stage}
          </li>
        ))}
      </ol>

      <div className="research-layout">
        <div className="research-thread">
          {turns.length > 0 && (
            <div
              className="research-messages"
              ref={messages}
              role="log"
              aria-label="Conversa"
            >
              {turns.map(({ question: asked, reply, error }, index) => (
                <div className="research-turn" key={index}>
                  <div className="research-question">
                    <strong>Você</strong>
                    <p>{asked}</p>
                  </div>
                  {reply && (
                    <article className="research-answer">
                      <div className="step-label">
                        <Sparkles size={14} /> {modeLabels[reply.mode]}
                      </div>
                      {reply.message && <p>{reply.message}</p>}
                      {reply.statements.map((statement, statementIndex) => {
                        const source = reply.sources.find(
                          (item) => item.number === statement.source,
                        );
                        return (
                          <p key={statementIndex}>
                            {statement.text}{" "}
                            {source && (
                              <a
                                className="research-citation"
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={`Fonte ${source.number}, ${source.title}`}
                              >
                                {source.number}
                              </a>
                            )}
                          </p>
                        );
                      })}
                      {reply.audit && (
                        <details className="research-evidence">
                          <summary>Ver as cinco etapas desta pesquisa</summary>
                          <ol className="research-trace">
                            <li>
                              <strong>Planejar</strong>
                              <p>
                                Termos da pergunta:{" "}
                                {reply.searchTerms.join(", ") || "—"}
                              </p>
                              <p>
                                Termos adicionais:{" "}
                                {reply.audit.expandedTerms.join(", ") || "—"}
                              </p>
                            </li>
                            <li>
                              <strong>Buscar</strong>
                              <p>
                                Busca {reply.audit.searchMode.toLowerCase()} em{" "}
                                {reply.audit.indexed} registros.{" "}
                                {reply.audit.matched} resultados candidatos.
                              </p>
                            </li>
                            <li>
                              <strong>Verificar</strong>
                              <p>
                                {reply.audit.cited} referências únicas passaram
                                pela conferência de identificador e endereço no
                                catálogo local. A situação jurídica atual exige
                                consulta ao INPI.
                              </p>
                            </li>
                            <li>
                              <strong>Analisar</strong>
                              <ul>
                                {reply.audit.comparisons.map((item) => (
                                  <li key={item.feature}>
                                    {item.feature} ·{" "}
                                    {item.sourceNumbers.length
                                      ? item.sourceNumbers
                                          .map((number) => `[${number}]`)
                                          .join(" ")
                                      : "Sem correspondência textual nas fontes exibidas"}
                                  </li>
                                ))}
                              </ul>
                            </li>
                            <li>
                              <strong>Entregar</strong>
                              <p>
                                {modeLabels[reply.mode]} com o recorte da
                                consulta.
                              </p>
                            </li>
                          </ol>
                        </details>
                      )}
                      <details className="research-evidence">
                        <summary>
                          Termos pesquisados e fontes ({reply.sources.length})
                        </summary>
                        {reply.searchTerms.length > 0 && (
                          <p className="research-terms">
                            {reply.searchTerms.join(" · ")}
                          </p>
                        )}
                        {reply.sources.length > 0 && (
                          <ul
                            className="research-matches"
                            aria-label="Correspondências por termo"
                          >
                            {reply.searchTerms.map((term) => {
                              const matches = reply.sources.filter((source) =>
                                source.matchedTerms.includes(term),
                              );
                              return (
                                <li key={term}>
                                  <strong>{term}</strong> ·{" "}
                                  {matches.length
                                    ? matches.map((source) => (
                                        <a
                                          key={source.number}
                                          href={source.url}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          [{source.number}]{" "}
                                        </a>
                                      ))
                                    : "Sem correspondência textual nas fontes exibidas"}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {reply.sources.map((source) => (
                          <div className="research-source" key={source.number}>
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              [{source.number}] {source.title}{" "}
                              <ArrowUpRight size={13} />
                            </a>
                            <small>{source.reference}</small>
                            {source.classifications?.length > 0 && (
                              <small>
                                IPC · {source.classifications.join(", ")}
                              </small>
                            )}
                            <p>{source.summary}</p>
                            <small>
                              Termos relacionados ·{" "}
                              {source.matchedTerms.join(", ")}
                            </small>
                          </div>
                        ))}
                      </details>
                      <p className="research-scope">{reply.scope}</p>
                      <div className="research-report-actions">
                        <button
                          className="text-button"
                          type="button"
                          onClick={() =>
                            downloadReport(reportMarkdown(asked, reply))
                          }
                        >
                          <Download size={15} /> Baixar relatório
                        </button>
                        <button
                          className="text-button"
                          type="button"
                          onClick={() => saveReport(asked, reply)}
                        >
                          <Bookmark size={15} /> Salvar neste navegador
                        </button>
                      </div>
                    </article>
                  )}
                  {error && (
                    <p className="research-error" role="alert">
                      {error}
                    </p>
                  )}
                </div>
              ))}
              {busy && (
                <p className="research-progress" role="status">
                  Buscando evidências e preparando a resposta…
                </p>
              )}
            </div>
          )}

          <form className="research-form" onSubmit={submit}>
            <label htmlFor="research-question">Sua pergunta</label>
            <textarea
              id="research-question"
              ref={input}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={2000}
              rows={3}
              placeholder="Descreva a tecnologia ou pergunte sobre patentes…"
            />
            <div className="research-form-footer">
              <small>{question.length} / 2.000</small>
              <button
                className="primary-button"
                type="submit"
                disabled={busy || !question.trim()}
              >
                <Send size={16} /> {busy ? "Pesquisando…" : "Enviar"}
              </button>
            </div>
          </form>
          {turns.length === 0 && (
            <div className="research-welcome">
              <h2>Experimente uma consulta</h2>
              <div className="research-examples">
                {examples.map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => void send(example)}
                  >
                    {example} <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {saveNotice && (
            <p className="research-save-notice" role="status">
              {saveNotice}
            </p>
          )}
        </div>

        <aside className="guide-card research-guide">
          <span className="step-label">Fontes e cobertura</span>
          <h3>Catálogo piloto do INPI</h3>
          <p>
            A busca usa publicações selecionadas da RPI sobre captação de água e
            guias do INPI. Abra as citações para conferir as fontes.
          </p>
          <p>Use exemplos públicos ao descrever uma tecnologia.</p>
          <a
            className="guide-link"
            href="https://www.gov.br/inpi/pt-br/servicos/patentes/guia-basico/busca-de-patentes"
            target="_blank"
            rel="noreferrer"
          >
            Guia de busca do INPI <ArrowUpRight size={14} />
          </a>
          {savedReports.length > 0 && (
            <details className="research-evidence">
              <summary>Pesquisas salvas ({savedReports.length})</summary>
              <ul className="research-saved">
                {savedReports.map((report) => (
                  <li key={report.id}>
                    <p>{report.title}</p>
                    <div className="research-report-actions">
                      <button
                        className="text-button"
                        type="button"
                        onClick={() => downloadReport(report.markdown)}
                      >
                        Baixar
                      </button>
                      <button
                        className="text-button"
                        type="button"
                        onClick={() =>
                          storeReports(
                            savedReports.filter(
                              (item) => item.id !== report.id,
                            ),
                            "Relatório removido deste navegador.",
                          )
                        }
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          )}
        </aside>
      </div>
    </section>
  );
}
