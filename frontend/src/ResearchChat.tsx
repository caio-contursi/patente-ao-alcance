import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, RotateCcw, Send, Sparkles } from "lucide-react";
import "./research-chat.css";

type Source = {
  number: number;
  title: string;
  reference: string;
  url: string;
  summary: string;
  matchedTerms: string[];
};

type Reply = {
  mode: "LOCAL_AI" | "EXCERPTS" | "NO_EVIDENCE";
  message: string;
  statements: { text: string; source: number }[];
  sources: Source[];
  searchTerms: string[];
  scope: string;
};

type Turn = { question: string; reply?: Reply; error?: string };

const examples = [
  "Busque sistemas de captação de água da chuva com filtragem e reservatório.",
  "O que é estado da técnica?",
  "Quais são os requisitos para patentear uma invenção?",
];

const modeLabels = {
  LOCAL_AI: "Síntese por IA local",
  EXCERPTS: "Resumos das fontes",
  NO_EVIDENCE: "Sem evidência na amostra",
};

export default function ResearchChat() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);
  const current = useRef<AbortController | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);

  useEffect(() => () => current.current?.abort(), []);
  useEffect(() => {
    if (turns.length) end.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [turns, busy]);

  async function send(value: string) {
    const message = value.trim();
    if (!message || current.current) return;
    const controller = new AbortController();
    current.current = controller;
    const previousQuestions = turns.filter((turn) => turn.reply).slice(-3).map((turn) => turn.question);
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
      if (!controller.signal.aborted) setTurns((existing) => [...existing.slice(0, -1), { question: message, reply }]);
    } catch {
      if (!controller.signal.aborted) {
        setTurns((existing) => [...existing.slice(0, -1), {
          question: message,
          error: "Não foi possível consultar o assistente. Tente novamente quando a API estiver disponível.",
        }]);
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

  return (
    <section className="research-chat" aria-labelledby="research-title">
      <header className="research-header">
        <div>
          <span className="step-label"><Sparkles size={14} /> ASSISTENTE DE PESQUISA</span>
          <h1 id="research-title">Chat com a IA</h1>
          <p>Pesquise tecnologias e entenda o que os documentos do INPI mostram.</p>
        </div>
        {turns.length > 0 && (
          <button className="text-button" type="button" onClick={reset}>
            <RotateCcw size={15} /> Nova conversa
          </button>
        )}
      </header>

      <div className="research-layout">
        <div className="research-thread">
          {turns.length === 0 ? (
            <div className="research-welcome">
              <div className="guide-icon"><Sparkles size={18} /></div>
              <h2>Por onde você quer começar?</h2>
              <p>Faça uma pergunta em português ou experimente uma consulta.</p>
              <div className="research-examples">
                {examples.map((example) => (
                  <button key={example} type="button" onClick={() => void send(example)}>
                    {example} <ArrowUpRight size={15} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="research-messages" role="log" aria-label="Conversa">
              {turns.map(({ question: asked, reply, error }, index) => (
                <div className="research-turn" key={index}>
                  <div className="research-question"><strong>Você</strong><p>{asked}</p></div>
                  {reply && (
                    <article className="research-answer">
                      <div className="step-label"><Sparkles size={14} /> {modeLabels[reply.mode]}</div>
                      {reply.message && <p>{reply.message}</p>}
                      {reply.statements.map((statement, statementIndex) => {
                        const source = reply.sources.find((item) => item.number === statement.source);
                        return <p key={statementIndex}>{statement.text} {source && (
                          <a href={source.url} target="_blank" rel="noreferrer" aria-label={`Fonte ${source.number}, ${source.title}`}>
                            [{source.number}]
                          </a>
                        )}</p>;
                      })}
                      <details className="research-evidence">
                        <summary>Termos pesquisados e fontes ({reply.sources.length})</summary>
                        {reply.searchTerms.length > 0 && <p className="research-terms">{reply.searchTerms.join(" · ")}</p>}
                        {reply.sources.length > 0 && (
                          <ul className="research-matches" aria-label="Correspondências por termo">
                            {reply.searchTerms.map((term) => {
                              const matches = reply.sources.filter((source) => source.matchedTerms.includes(term));
                              return <li key={term}><strong>{term}</strong> · {matches.length
                                ? matches.map((source) => <a key={source.number} href={source.url} target="_blank" rel="noreferrer">[{source.number}] </a>)
                                : "Sem correspondência textual nas fontes exibidas"}</li>;
                            })}
                          </ul>
                        )}
                        {reply.sources.map((source) => (
                          <div className="research-source" key={source.number}>
                            <a href={source.url} target="_blank" rel="noreferrer">[{source.number}] {source.title} <ArrowUpRight size={13} /></a>
                            <small>{source.reference}</small>
                            <p>{source.summary}</p>
                            <small>Termos relacionados · {source.matchedTerms.join(", ")}</small>
                          </div>
                        ))}
                      </details>
                      <p className="research-scope">{reply.scope}</p>
                    </article>
                  )}
                  {error && <p className="research-error" role="alert">{error}</p>}
                </div>
              ))}
              {busy && <p className="research-progress" role="status">Buscando evidências e preparando a resposta…</p>}
              <div ref={end} />
            </div>
          )}

          <form className="research-form" onSubmit={submit}>
            <label htmlFor="research-question">Sua pergunta</label>
            <textarea id="research-question" ref={input} value={question}
              onChange={(event) => setQuestion(event.target.value)} maxLength={2000}
              rows={3} placeholder="Descreva a tecnologia ou pergunte sobre patentes…" />
            <div className="research-form-footer">
              <small>{question.length} / 2.000</small>
              <button className="primary-button" type="submit" disabled={busy || !question.trim()}>
                <Send size={16} /> Enviar
              </button>
            </div>
          </form>
        </div>

        <aside className="guide-card research-guide">
          <span className="step-label">RECORTE DA PESQUISA</span>
          <h3>Quais fontes entram na resposta?</h3>
          <p>O chat consulta uma amostra local da Revista da Propriedade Industrial sobre captação de água e páginas educativas do INPI.</p>
          <p>Use as referências para conferir os documentos. O chat não estima chance de concessão. Evite incluir detalhes confidenciais.</p>
          <a className="guide-link" href="https://www.gov.br/inpi/pt-br/servicos/patentes/guia-basico/busca-de-patentes" target="_blank" rel="noreferrer">
            Guia de busca do INPI <ArrowUpRight size={14} />
          </a>
        </aside>
      </div>
    </section>
  );
}
