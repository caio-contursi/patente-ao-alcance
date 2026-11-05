import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CircleHelp,
  FileSearch,
  Lightbulb,
  LockKeyhole,
  MessageSquare,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { explainMatches, searchPatents, type PatentDocument } from "./api";
import ResearchChat from "./ResearchChat";

const starterQuery =
  "Sistema para captar e filtrar água da chuva em um reservatório, com sensor de nível para monitorar o volume armazenado.";

function Modal({
  titleId,
  children,
  onClose,
}: {
  titleId: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    return () => element?.close();
  }, []);

  return (
    <dialog
      ref={dialog}
      className="info-modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>
        {children}
      </div>
    </dialog>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [results, setResults] = useState<PatentDocument[]>([]);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(
    "Exemplos fictícios para conhecer a interface. Nenhuma base oficial foi consultada.",
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [explanation, setExplanation] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [activeNav, setActiveNav] = useState(
    window.location.hash === "#assistente" ? "Chat com a IA" : "Pesquisar",
  );
  const chatOpen = activeNav === "Chat com a IA";

  async function runSearch(value = query) {
    if (busy || value.trim().length < 12) return;
    setBusy(true);
    setQuery(value);
    setExplanation("");
    try {
      const response = await searchPatents(value);
      setResults(response.results);
      setSubmittedQuery(value);
      setNotice(response.notice);
      setSelected(response.results.slice(0, 2).map((item) => item.id));
      setSearched(true);
    } finally {
      setBusy(false);
    }
  }

  async function buildExplanation() {
    if (selected.length === 0) return;
    const result = await explainMatches(submittedQuery, selected);
    setExplanation(`${result.explanation}\n\n${result.notice}`);
  }

  function toggleSelected(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id].slice(0, 5),
    );
  }

  function navTo(section: string) {
    setActiveNav(section);
    window.history.replaceState(
      null,
      "",
      section === "Chat com a IA" ? "#assistente" : "#top",
    );
    window.scrollTo({ top: 0 });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#top"
          onClick={() => navTo("Pesquisar")}
          aria-label="Patente ao Alcance início"
        >
          <span className="brand-mark">
            <FileSearch size={19} aria-hidden="true" />
          </span>
          <strong>Patente ao Alcance</strong>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          {["Pesquisar", "Chat com a IA"].map((item) => (
            <button
              key={item}
              className={activeNav === item ? "nav-link active" : "nav-link"}
              aria-current={activeNav === item ? "page" : undefined}
              onClick={() => navTo(item)}
            >
              {item === "Pesquisar" ? (
                <Search size={16} />
              ) : (
                <MessageSquare size={16} />
              )}{" "}
              {item}
            </button>
          ))}
        </nav>
        <button
          className="text-button header-help"
          onClick={() => setShowInfo(true)}
        >
          <CircleHelp size={18} /> <span>Sobre o projeto</span>
        </button>
      </header>

      <main id="top">
        <div hidden={!chatOpen}>
          <ResearchChat />
        </div>
        <div hidden={chatOpen}>
          <section className="hero">
            <div className="hero-copy">
              <span className="demo-badge">Busca demonstrativa</span>
              <h1>Pesquisa de patentes</h1>
              <p>
                Descreva uma tecnologia para explorar e comparar documentos
                relacionados.
              </p>
            </div>
          </section>

          <section className="search-panel" aria-labelledby="search-title">
            <div className="panel-heading">
              <div>
                <h2 id="search-title">O que sua solução faz?</h2>
              </div>
              <button className="text-button" onClick={() => setShowInfo(true)}>
                <CircleHelp size={16} /> Como descrever{" "}
                <ArrowUpRight size={14} />
              </button>
            </div>
            <label className="query-label" htmlFor="invention-query">
              Descreva o problema, a solução técnica e seus componentes
              principais
            </label>
            <div className="query-box">
              <textarea
                id="invention-query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                maxLength={5000}
                placeholder="Ex.: um sistema que monitora..."
              />
              <div className="query-footer">
                <span>{query.length} / 5.000</span>
                <button
                  className="primary-button"
                  onClick={() => runSearch()}
                  disabled={busy || query.trim().length < 12}
                >
                  {busy ? (
                    "Buscando..."
                  ) : (
                    <>
                      <Search size={16} /> Pesquisar documentos
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="privacy-line">
              <LockKeyhole size={14} />
              <span>
                Não inclua detalhes confidenciais ou inéditos. Este protótipo
                não foi preparado para receber segredos comerciais.
              </span>
              <button onClick={() => setShowInfo(true)}>Saiba mais</button>
            </div>
            <div className="suggestion-row">
              <span>EXPERIMENTE</span>
              <button onClick={() => runSearch(starterQuery)}>
                Captação de água da chuva <ArrowUpRight size={12} />
              </button>
              <button
                onClick={() =>
                  runSearch(
                    "Sistema de irrigação agrícola com sensor de umidade do solo para controlar o uso de água.",
                  )
                }
              >
                Irrigação e sensores <ArrowUpRight size={12} />
              </button>
            </div>
          </section>

          <section
            className="workspace-grid"
            aria-label="Resultados e orientação"
          >
            <div className="results-column" aria-live="polite" aria-busy={busy}>
              <div className="results-heading">
                <div>
                  <h2>
                    {searched
                      ? `${results.length} ${results.length === 1 ? "resultado" : "resultados"} para explorar`
                      : "Comece uma busca"}
                  </h2>
                </div>
              </div>

              {!searched ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <FileSearch size={25} />
                  </div>
                  <strong>Seus resultados aparecem aqui</strong>
                  <p>
                    Escreva uma descrição técnica ou escolha um exemplo para
                    explorar a interface.
                  </p>
                </div>
              ) : results.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Search size={25} />
                  </div>
                  <strong>Nenhum exemplo relacionado</strong>
                  <p>
                    Tente descrever a função técnica com outras palavras. A
                    amostra atual é pequena e fictícia.
                  </p>
                </div>
              ) : (
                <>
                  <div className="sample-warning">
                    <span className="warning-mark">i</span>
                    <span>{notice}</span>
                  </div>
                  <div className="results-list">
                    {results.map((document, index) => {
                      const checked = selected.includes(document.id);
                      return (
                        <article
                          className={
                            checked ? "result-card selected" : "result-card"
                          }
                          key={document.id}
                        >
                          <div className="card-topline">
                            <span className="result-index">0{index + 1}</span>
                            <span className="source-tag">
                              <span /> DADO SINTÉTICO
                            </span>
                            <button
                              className={
                                checked
                                  ? "compare-check checked"
                                  : "compare-check"
                              }
                              onClick={() => toggleSelected(document.id)}
                              aria-pressed={checked}
                              aria-label={`Selecionar para comparação: ${document.title}`}
                            >
                              {checked ? <Check size={14} /> : "+"}
                            </button>
                          </div>
                          <h3>{document.title}</h3>
                          <p className="result-summary">{document.summary}</p>
                          <div className="metadata-row">
                            <span>{document.publicationNumber}</span>
                            <span>{document.applicant}</span>
                          </div>
                          <div className="evidence-box">
                            <span className="evidence-label">
                              <Sparkles size={13} /> TRECHO DE DEMONSTRAÇÃO
                            </span>
                            <p>“{document.evidenceSnippets[0]}”</p>
                          </div>
                          <div className="card-bottom">
                            <div className="term-list">
                              {document.matchingTerms
                                .slice(0, 3)
                                .map((term) => (
                                  <span key={term}>{term}</span>
                                ))}
                            </div>
                            <span className="no-source">Sem fonte oficial</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  {results.length > 0 && (
                    <div className="compare-bar">
                      <div>
                        <span className="compare-count">{selected.length}</span>
                        <span>selecionados para comparar</span>
                      </div>
                      <button
                        onClick={buildExplanation}
                        disabled={selected.length === 0}
                      >
                        Ver comparação <ArrowRight size={15} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <aside className="side-column">
              <div className="guide-card">
                <div className="guide-icon">
                  <Lightbulb size={19} />
                </div>
                <span className="step-label">UM GUIA PARA SUA BUSCA</span>
                <h3>O que torna uma busca útil?</h3>
                <p>
                  Descreva como a solução funciona. Uma boa consulta ajuda a
                  encontrar documentos mesmo quando usam palavras diferentes.
                </p>
                <ul>
                  <li>Qual problema técnico ela resolve?</li>
                  <li>Quais componentes fazem isso acontecer?</li>
                  <li>O que muda em relação ao que já existe?</li>
                </ul>
                <button
                  className="guide-link"
                  onClick={() => setShowInfo(true)}
                >
                  Entenda a pesquisa <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="scope-card">
                <span className="scope-icon">
                  <BookOpen size={16} />
                </span>
                <div>
                  <strong>Fontes oficiais</strong>
                  <p>
                    Consulte o catálogo piloto do INPI no assistente de
                    pesquisa.
                  </p>
                  <button onClick={() => navTo("Chat com a IA")}>
                    Abrir o chat <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <span>Patente ao Alcance · Projeto de extensão</span>
        <div>
          <button onClick={() => setShowInfo(true)}>Sobre o projeto</button>
          <span>•</span>
          <span>Protótipo v0.1</span>
        </div>
      </footer>

      {showInfo && (
        <Modal titleId="modal-title" onClose={() => setShowInfo(false)}>
          <span className="step-label">SOBRE O PATENTE AO ALCANCE</span>
          <h2 id="modal-title">Uma ferramenta para pesquisar e aprender.</h2>
          <p>
            O projeto quer aproximar pessoas de documentos de patentes e
            explicar o que as fontes mostram. A busca poderá destacar documentos
            parecidos e evidências, com links oficiais.
          </p>
          <div className="modal-rule" />
          <p>
            <strong>Pesquisar.</strong> Explore registros fictícios para
            aprender a descrever e comparar tecnologias.
          </p>
          <p>
            <strong>Chat com a IA.</strong> Faça perguntas sobre uma amostra de
            publicações e guias do INPI. A resposta mostra as fontes
            consultadas.
          </p>
          <p className="modal-disclaimer">
            Resultados futuros também dependerão da cobertura da base
            consultada. Nenhuma busca automatizada garante novidade ou concessão
            de patente.
          </p>
          <button
            className="primary-button modal-action"
            onClick={() => setShowInfo(false)}
          >
            Entendi <Check size={15} />
          </button>
        </Modal>
      )}

      {explanation && (
        <Modal titleId="comparison-title" onClose={() => setExplanation("")}>
          <span className="step-label">
            <Sparkles size={13} /> COMPARAÇÃO DEMONSTRATIVA
          </span>
          <h2 id="comparison-title">O que apareceu em comum</h2>
          <p>{explanation}</p>
          <div className="toast-note">
            Amostra sintética. Não é análise jurídica nem previsão de concessão.
          </div>
          <button className="text-button" onClick={() => setExplanation("")}>
            Fechar
          </button>
        </Modal>
      )}
    </div>
  );
}

export default App;
