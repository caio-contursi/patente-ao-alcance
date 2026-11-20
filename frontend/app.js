const icons = {
  external:
    '<path d="M14 3h7v7M10 14 21 3M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  book: '<path d="M12 5c-3-2-7-2-10 0v15c3-2 7-2 10 0 3-2 7-2 10 0V5c-3-2-7-2-10 0Zm0 0v15"/>',
  home: '<path d="m3 10 9-7 9 7v11h-7v-7h-4v7H3Z"/>',
  game: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1"/><circle cx="16" cy="8" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/>',
  chart: '<path d="M3 3v18h18M7 16v-5m5 5V7m5 9V4"/>',
  school: '<path d="m2 8 10-5 10 5-10 5Zm4 2v7c4 3 8 3 12 0v-7M22 8v9"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  people:
    '<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6m2 4c2 1 3 3 3 7"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  monitor:
    '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  mobile:
    '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
  print: '<path d="M6 9V2h12v7M6 17H3v-8h18v8h-3M6 14h12v8H6Z"/>',
  leaf: '<path d="M4 20C0 7 11 3 21 3c1 11-3 20-13 16M4 20 16 8"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
  file: '<path d="M14 2H5v20h14V7Zm0 0v6h5M8 12h8m-8 4h8"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/>',
};
const icon = (name) =>
  name === "arrow"
    ? ""
    : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.file}</svg>`;
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const sourceCommit = "907f24080b9fc1b606cc11ac022e24ddfa0582dd";
const sourceUrl = `https://github.com/caio-contursi/patente-ao-alcance/blob/${sourceCommit}/docs/planejamento-do-projeto.md`;
const screens = [
  {
    id: "inicio",
    title: "Início do portal",
    icon: "home",
    module: "M1 · M3",
    purpose:
      "Apresenta o projeto e os caminhos de aprendizagem, pesquisa e participação.",
    question:
      "A pessoa entende por onde começar sem conhecer propriedade intelectual?",
  },
  {
    id: "preparacao",
    title: "Preparação da equipe",
    icon: "people",
    module: "M1 · M2",
    purpose:
      "Reúne escuta da Alpha Junior, materiais, permissões, mapa de PI e decisões para confeccionar o jogo.",
    question:
      "Quais informações da escuta precisam orientar as regras e o cenário do jogo?",
  },
  {
    id: "jogo",
    title: "Jogo de PI",
    icon: "game",
    module: "M2 · M3",
    purpose:
      "Demonstra uma proposta de mecânica. Cenário, regras, formato físico e ferramentas serão definidos após a escuta.",
    question:
      "A escolha seguida de justificativa e fonte atende ao objetivo pedagógico?",
  },
  {
    id: "busca",
    title: "Busca guiada",
    icon: "search",
    module: "M3",
    purpose:
      "Ajuda a formular a consulta e abre as bases externas. A pesquisa é realizada pela pessoa na base escolhida.",
    question:
      "Os campos ajudam a transformar uma necessidade em termos de pesquisa?",
  },
  {
    id: "panorama",
    title: "Panorama de patentes",
    icon: "chart",
    module: "M3",
    purpose:
      "Reserva três visualizações para agregados documentados. Todos os valores exibidos são sintéticos.",
    question:
      "Os recortes, a contagem e a fonte são claros antes de interpretar os gráficos?",
  },
  {
    id: "materiais",
    title: "Materiais e guia",
    icon: "book",
    module: "M1 · M3",
    purpose:
      "Apresenta os almanaques, o mapa de PI e a estrutura do guia educativo de depósito.",
    question:
      "A seleção de materiais e a linguagem são adequadas ao público da oficina?",
  },
  {
    id: "oficina",
    title: "Primeira oficina",
    icon: "school",
    module: "M3",
    purpose:
      "Mostra agenda proposta, inscrição de demonstração, diagnóstico e feedback. Inclui a simulação do atendimento.",
    question:
      "O percurso da oficina e o fluxo de atendimento cabem na capacidade da equipe?",
  },
  {
    id: "vitrine",
    title: "Vitrine UNIRIO",
    icon: "grid",
    module: "M3",
    purpose:
      "Exibe o fluxo institucional enquanto as fichas aguardam validação do NIT.",
    question:
      "Que informações e autorizações devem compor uma ficha antes de sua publicação?",
  },
];
let current = screens.some((s) => s.id === location.hash.slice(1))
  ? location.hash.slice(1)
  : "inicio";
let mobile = false;
let annotations = true;
let teamTab = "escuta";
let materialTab = "almanaques";
let gameStarted = false;
let cardIndex = 0;
let gameChoice = null;
let gameDecisions = [];
const searchDraft = { problem: "", component: "", extra: "", query: "" };
const listeningDraft = {
  audience: "",
  need: "",
  format: "A definir na reunião",
  saved: false,
};
const feedbackDraft = { clarity: "", improvement: "", saved: false };
const scenarios = [
  {
    title: "Uma identidade para o projeto",
    text: "Uma empresa júnior criou um nome e um símbolo para apresentar um novo serviço.",
    prompt: "Qual categoria de PI você investigaria primeiro?",
    options: ["Marca", "Patente", "Indicação geográfica"],
    answer: 0,
    why: "O exemplo descreve sinais que identificam um serviço. A discussão começa por marcas, com pesquisa e verificação na fonte oficial.",
    source: "https://www.gov.br/inpi/pt-br/servicos/marcas",
    sourceName: "Marcas · INPI",
  },
  {
    title: "O código de um painel",
    text: "A equipe desenvolveu o código de um painel para visualizar informações de um reservatório.",
    prompt: "Qual caminho corresponde ao código criado?",
    options: [
      "Indicação geográfica",
      "Registro de programa de computador",
      "Registro de marca",
    ],
    answer: 1,
    why: "A carta trata do código do programa. A equipe deve investigar autoria, licenças utilizadas e o registro de programa de computador.",
    source: "https://www.gov.br/inpi/pt-br/servicos/programas-de-computador",
    sourceName: "Programas de computador · INPI",
  },
  {
    title: "Um manual ilustrado",
    text: "Duas pessoas produziram textos e ilustrações originais para explicar o funcionamento do serviço.",
    prompt: "Qual categoria orienta a conversa sobre esses materiais?",
    options: ["Patente", "Marca", "Direito autoral"],
    answer: 2,
    why: "Textos e ilustrações originais motivam a discussão sobre direito autoral e o registro dos créditos e das condições de uso dos materiais.",
    source:
      "https://almanaquesdacomputacao.com.br/gutanunes/publications/serie3/S3V12small.pdf",
    sourceName: "Direitos Autorais e Conexos · S3V12",
  },
];
function action(id, text, primary = false, glyph = "arrow") {
  return `<button type="button" class="btn ${primary ? "primary" : ""}" data-go="${id}">${text}${icon(glyph)}</button>`;
}
function link(url, text, cls = "text-button") {
  return `<a class="${cls}" href="${url}" target="_blank" rel="noopener noreferrer">${text}${icon("external")}</a>`;
}
function heading(kicker, title, description) {
  return `<div class="eyebrow">${kicker}</div><h1>${title}</h1>${description ? `<p class="lead">${description}</p>` : ""}`;
}
function notice(text, demo = false) {
  return `<div class="notice ${demo ? "demo" : ""}">${text}</div>`;
}
function tabs(items, selected, attribute) {
  return `<div class="tabs" role="group" aria-label="Seções">${items.map(([id, label]) => `<button type="button" data-${attribute}="${id}" class="${id === selected ? "active" : ""}" aria-pressed="${id === selected}">${label}</button>`).join("")}</div>`;
}
function homeView() {
  return `<section class="hero"><div>${heading("Projeto de extensão · UNIRIO", "Conhecimento para<br>dar o próximo passo.", "Aprenda sobre propriedade intelectual, explore fontes de patentes e participe de uma oficina com a nossa equipe.")}<div class="actions">${action("busca", "Começar uma pesquisa", true)}${action("oficina", "Conhecer a oficina", false, "school")}</div></div><div class="stack-art" aria-hidden="true"><div class="sheet"></div><div class="sheet front"><span class="doc-tag">DOCUMENTO DE PATENTE</span><div class="draw"></div><div class="line"></div><div class="line"></div><div class="line short"></div></div><span class="art-label">ideia → pesquisa → aprendizado</span></div></section>
    <section class="divider"><div class="section-heading"><h2>Por onde você quer começar?</h2><span>Um percurso para cada momento</span></div><div class="grid three">
      <article class="card"><div class="icon-box">${icon("book")}</div><h3>Entender o que é PI</h3><p>Conheça os tipos de proteção, os termos e os materiais para começar.</p><button class="text-button" data-go="materiais">Explorar os materiais ${icon("arrow")}</button></article>
      <article class="card"><div class="icon-box">${icon("game")}</div><h3>Aprender jogando</h3><p>Discuta situações de uma empresa júnior e justifique suas escolhas.</p><button class="text-button" data-go="jogo">Experimentar uma rodada ${icon("arrow")}</button></article>
      <article class="card"><div class="icon-box">${icon("grid")}</div><h3>Conhecer tecnologias</h3><p>Acompanhe o caminho para conhecer tecnologias da UNIRIO.</p><button class="text-button" data-go="vitrine">Visitar a vitrine ${icon("arrow")}</button></article>
    </div></section><div class="section-heading"><h2>Uma oficina para trocar e descobrir</h2><button class="text-button" data-go="oficina">Ver a programação ${icon("arrow")}</button></div><p class="small">Gibis, jogos e uma conversa sobre as criações do seu dia a dia. A participação da Alpha Junior orientará o cenário e os materiais.</p>`;
}
function preparationView() {
  const tab = tabs(
    [
      ["escuta", "Escuta"],
      ["materiais", "Inventário"],
      ["jogo", "Planejamento do jogo"],
    ],
    teamTab,
    "team",
  );
  let content;
  if (teamTab === "escuta") {
    content = `<div class="split"><section><h2>Antes de propor a atividade, ouvir.</h2><p>Roteiro de reunião com a Alpha Junior. Os campos ficam apenas na sessão desta demonstração.</p><form id="listening-form"><div class="form-field"><label for="audience">Quem participará?</label><input id="audience" name="audience" placeholder="Perfil e tamanho da turma a confirmar" value="${escapeHtml(listeningDraft.audience)}" required></div><div class="form-field"><label for="need">Qual dificuldade a equipe quer compreender?</label><textarea id="need" name="need" placeholder="Registre a necessidade em termos gerais, sem informações confidenciais." required>${escapeHtml(listeningDraft.need)}</textarea></div><div class="form-field"><label for="meeting-format">Formato preferido</label><select name="format" id="meeting-format">${["A definir na reunião", "Presencial", "Online"].map((v) => `<option ${listeningDraft.format === v ? "selected" : ""}>${v}</option>`).join("")}</select></div><button class="btn primary" type="submit">Registrar nesta sessão ${icon("check")}</button>${listeningDraft.saved ? '<div class="form-success" role="status">Rascunho registrado nesta sessão. A demonstração pode ser usada para validar os campos com a orientadora.</div>' : ""}</form></section><aside class="card soft"><div class="meta">MÓDULO 1 · ESTUDO E PREPARAÇÃO</div><h3>Pontos para a conversa</h3><ul class="readable"><li>Que tipos de criação surgem no trabalho?</li><li>O que o grupo já conhece de PI?</li><li>Que formato torna a atividade mais acessível?</li></ul><div class="source-row"><div><strong>Pedro</strong><p>Contato e síntese de necessidades</p></div>${icon("people")}</div><div class="source-row"><div><strong>Caio</strong><p>Documentos, mapa de PI e glossário</p></div>${icon("book")}</div><div class="source-row"><div><strong>Enzo</strong><p>Wireframes e organização do portal</p></div>${icon("grid")}</div></aside></div>`;
  } else if (teamTab === "materiais") {
    content = `<h2>Inventário de materiais e permissões</h2><p>Estrutura de registro a preencher pela equipe. As situações abaixo são exemplos de pendências.</p><div class="table-wrap"><table class="table"><thead><tr><th>Material</th><th>Uso proposto</th><th>Permissão</th><th>Responsável</th></tr></thead><tbody><tr><td>Série 3 · Propriedade Intelectual</td><td>Mapa de PI e jogos</td><td><span class="pill">Verificar por edição</span></td><td>Caio</td></tr><tr><td>Série 6 · Volumes 1 a 4</td><td>Informação tecnológica e busca</td><td><span class="pill">Verificar por edição</span></td><td>Caio</td></tr><tr><td>Jogo para a Alpha Junior</td><td>Cenário construído após a escuta</td><td><span class="pill">Em concepção</span></td><td>Equipe</td></tr></tbody></table></div><div class="grid two" style="margin-top:20px"><article class="card"><h3>Documentos do projeto</h3><p>Repositório, pasta de documentos, planejamento e registro compartilhado.</p>${link(sourceUrl, "Abrir planejamento no GitHub")}</article><article class="card"><h3>O que a ficha deve registrar</h3><p>Objetivo, público, regras, duração, componentes, fonte, licença e responsável pela confirmação.</p><button class="text-button" data-go="materiais">Ver materiais no portal ${icon("arrow")}</button></article></div>`;
  } else {
    content = `<h2>Do cenário da empresa à decisão do jogador.</h2><p>O módulo 2 detalhado é dedicado ao jogo. Estas são as decisões a validar na reunião.</p><div class="grid three"><article class="card"><div class="icon-box">${icon("people")}</div><h3>Contexto · Pedro</h3><p>Coletar informações da Alpha Junior e observar como a equipe percebe a proposta e o tema.</p><span class="pill">A confirmar na escuta</span></article><article class="card"><div class="icon-box">${icon("game")}</div><h3>Regras · Caio</h3><p>Definir materiais, regras, ferramentas e os recursos técnicos e físicos do jogo.</p><span class="pill">Proposta para discussão</span></article><article class="card"><div class="icon-box">${icon("school")}</div><h3>Engajamento · Enzo</h3><p>Alinhar os conceitos de MCT previstos no plano e criar formas de estimular o interesse.</p><span class="pill">Definição com a equipe</span></article></div><div class="notice">Mecânica ilustrativa do wireframe: ler uma situação, escolher uma categoria de PI, explicar a escolha e conferir uma referência.</div><div class="actions">${action("jogo", "Testar a mecânica", true, "game")}<button class="btn" data-modal="simulacao">Simular atendimento ${icon("clock")}</button></div>`;
  }
  return (
    heading(
      "Área da equipe · Demonstração",
      "Preparar junto com o público.",
      "Registre as necessidades, organize os materiais e transforme a escuta em decisões para o jogo e o portal.",
    ) +
    tab +
    content
  );
}
function gameView() {
  const intro = heading(
    "Aprender jogando",
    "Uma criação. Qual caminho?",
    "Leia uma situação, faça uma escolha e converse sobre o que ainda precisa ser verificado.",
  );
  if (!gameStarted)
    return (
      intro +
      `<div class="split"><section><div class="scenario"><div class="eyebrow">Cenário ilustrativo</div><blockquote>Uma empresa júnior quer entender como cuidar das criações que aparecem em seus projetos.</blockquote><p class="small">O caso é fictício. O cenário real da Alpha Junior será construído após a reunião com a equipe.</p></div><div class="actions"><button class="btn primary" id="start-game">Experimentar 3 situações ${icon("arrow")}</button><button class="btn" data-go="oficina">Ver a oficina ${icon("school")}</button></div></section><aside class="card soft"><h3>Como funciona esta demonstração</h3><ol class="readable"><li>Leia a situação em grupo.</li><li>Escolha a categoria a investigar.</li><li>Justifique e confira a referência.</li></ol><p class="small">A orientadora e a equipe vão avaliar regras, materiais, duração e formato físico antes da aplicação.</p></aside></div>`
    );
  if (cardIndex >= scenarios.length)
    return (
      intro +
      `<div class="scenario"><span class="pill green">Rodada concluída</span><h2 style="margin-top:15px">O que mudou na sua forma de olhar?</h2><p>As escolhas servem como ponto de partida para discutir evidências e dúvidas.</p><div class="table-wrap"><table class="table"><thead><tr><th>Situação</th><th>Sua escolha</th></tr></thead><tbody>${scenarios.map((c, i) => `<tr><td>${c.title}</td><td>${c.options[gameDecisions[i]]}</td></tr>`).join("")}</tbody></table></div></div><div class="actions">${action("materiais", "Continuar com os materiais", true, "book")}<button class="btn" id="restart-game">Recomeçar rodada</button></div>`
    );
  const c = scenarios[cardIndex];
  return (
    intro +
    `<div class="split"><section><div class="section-heading"><span>Situação ${cardIndex + 1} de 3</span><span>Exemplo para validar a mecânica</span></div><div class="progress-track"><span style="width:${((cardIndex + 1) / 3) * 100}%"></span></div><div class="scenario"><h3>${c.title}</h3><blockquote>${c.text}</blockquote><p class="small">${c.prompt}</p></div><div class="grid">${c.options.map((v, i) => `<button class="choice ${gameChoice === i ? "selected" : ""}" data-choice="${i}" ${gameChoice !== null ? "disabled" : ""}>${icon(gameChoice === i ? "check" : "file")}${v}</button>`).join("")}</div>${gameChoice !== null ? `<div class="feedback" role="status"><strong>${gameChoice === c.answer ? "Sua escolha aponta para este caminho." : "Vamos investigar outra categoria."}</strong><p>${c.why}</p>${link(c.source, c.sourceName)}</div><button class="btn primary" id="next-card" style="margin-top:15px">${cardIndex === 2 ? "Concluir a rodada" : "Próxima situação"} ${icon("arrow")}</button>` : ""}</section><aside class="card soft"><h3>Antes de responder</h3><p>Qual é a criação descrita? Quem participou dela? Que informação falta?</p><div class="divider"><h3>Papel de quem facilita</h3><p>Ouvir a justificativa, registrar dúvidas e conduzir a conferência da fonte.</p></div><button class="text-button" data-open-map>Consultar o mapa de PI ${icon("arrow")}</button></aside></div>`
  );
}
function searchView() {
  return (
    heading(
      "Pesquisar em fontes oficiais",
      "Da sua dúvida à pesquisa.",
      "Organize as palavras da consulta. Depois, escolha uma base e continue a pesquisa por lá.",
    ) +
    `<ol class="step-list"><li class="current"><span class="circle">1</span> Descrever</li><li class="${searchDraft.query ? "current" : ""}"><span class="circle">2</span> Revisar termos</li><li><span class="circle">3</span> Abrir uma base</li></ol><div class="split"><section><form id="search-form"><div class="form-field"><label for="problem">Qual problema você quer investigar?</label><input id="problem" name="problem" placeholder="Ex.: reaproveitar água da chuva" value="${escapeHtml(searchDraft.problem)}" required maxlength="160"></div><div class="field-row"><div class="form-field"><label for="component">Componente ou função</label><input id="component" name="component" placeholder="Ex.: filtro ou reservatório" value="${escapeHtml(searchDraft.component)}" maxlength="120"></div><div class="form-field"><label for="extra">Outro termo <span class="hint">opcional</span></label><input id="extra" name="extra" placeholder="Ex.: sensor de nível" value="${escapeHtml(searchDraft.extra)}" maxlength="100"></div></div><div class="actions"><button class="btn primary" type="submit">Montar minha consulta ${icon("arrow")}</button><button class="text-button" id="fill-example" type="button">Usar exemplo de água da chuva</button></div></form>${searchDraft.query ? `<div class="search-results"><h3>Sua consulta</h3><p class="small">Edite os termos e execute a consulta novamente para ajustar o texto.</p><div class="query">${escapeHtml(searchDraft.query)}</div><div class="source-row"><div><strong>Google Patents</strong><p>Abre a pesquisa com os termos preenchidos.</p></div>${link("https://patents.google.com/?q=" + encodeURIComponent(searchDraft.query), "Pesquisar", "btn compact")}</div><div class="source-row"><div><strong>Espacenet</strong><p>Abre a pesquisa com os termos preenchidos.</p></div>${link("https://worldwide.espacenet.com/patent/search?q=" + encodeURIComponent(searchDraft.query), "Pesquisar", "btn compact")}</div><div class="source-row"><div><strong>INPI e PATENTSCOPE</strong><p>Copie a consulta e use os campos da base.</p></div><button class="btn compact" id="copy-query">Copiar termos</button></div><div class="mini-links">${link("https://www.gov.br/inpi/pt-br/servicos/patentes", "Abrir INPI")}${link("https://patentscope.wipo.int/", "Abrir PATENTSCOPE")}</div><button class="text-button" id="download-search" style="margin-top:17px">Baixar ficha da consulta ${icon("file")}</button></div>` : ""}</section><aside class="card soft"><h3>Uma boa pesquisa começa por funções.</h3><p>Experimente palavras diferentes para o mesmo componente e traduções dos termos técnicos.</p><div class="tag-row"><span class="tag">captação / coleta</span><span class="tag">chuva / pluvial</span><span class="tag">rainwater</span></div><div class="divider"><h3>Ao encontrar um documento</h3><p>Registre a base, a data, os termos, os filtros e o identificador. Confira a fonte e as limitações.</p></div>${notice("Uma busca inicial sem resultados pode precisar de novos termos. Ela não comprova novidade nem autorização de uso comercial.")}</aside></div>`
  );
}
function horizontalChart(labels, values) {
  return `<div class="horizontal-bars">${labels.map((v, i) => `<div><div class="hbar-head"><span>${v}</span><span>${values[i]}</span></div><div class="hbar-track"><i style="width:${(values[i] / Math.max(...values)) * 100}%"></i></div></div>`).join("")}</div>`;
}
function panoramaView() {
  return (
    heading(
      "Informação tecnológica",
      "Um olhar sobre as patentes.",
      "Explore como os dados podem ser apresentados com recorte, método e fonte visíveis.",
    ) +
    notice(
      "Dados sintéticos para demonstrar o layout. Os números abaixo não representam o panorama real de patentes brasileiras.",
      true,
    ) +
    `<div class="grid three"><article class="card"><h3>Publicações por ano</h3><p class="small">Quantidade de documentos</p><div class="bars" role="img" aria-label="Dados sintéticos: 2022, 8 documentos; 2023, 12; 2024, 10; 2025, 15.">${[8, 12, 10, 15].map((n) => `<div class="bar-column"><span class="bar-value">${n}</span><span class="bar" style="height:${(n / 15) * 100}%"></span></div>`).join("")}</div><div class="bar-labels"><span>2022</span><span>2023</span><span>2024</span><span>2025</span></div><p class="chart-meta">Unidade · documento publicado</p></article><article class="card"><h3>Áreas tecnológicas</h3><p class="small">Grupos didáticos para a interface</p>${horizontalChart(["Água e armazenamento", "Filtragem", "Monitoramento"], [20, 15, 10])}<p class="chart-meta">Categorias fictícias · sem classificação IPC atribuída</p></article><article class="card"><h3>Perfil de depositante</h3><p class="small">Distribuição ilustrativa</p>${horizontalChart(["Organizações A", "Organizações B", "Organizações C"], [24, 13, 8])}<p class="chart-meta">Nomes genéricos · sem titulares reais</p></article></div><div class="section-heading"><h2>Antes de interpretar, conhecer o método.</h2></div><div class="grid two"><article class="card soft"><h3>Ficha do conjunto</h3><div class="source-row"><div><strong>Fonte prevista</strong><p>Google Patents Public Datasets</p></div>${icon("chart")}</div><div class="source-row"><div><strong>Recorte brasileiro</strong><p>Campos, filtros e data de extração a documentar</p></div></div><div class="source-row"><div><strong>Contagem</strong><p>Separar documentos de famílias de patentes</p></div></div></article><article class="card"><h3>Como o panorama será produzido</h3><ol class="readable"><li>Definir consulta e recorte.</li><li>Conferir fonte, custo e duplicidades.</li><li>Publicar agregados e dicionário de dados.</li></ol><button class="text-button" data-modal="metodo">Ver estrutura da nota metodológica ${icon("arrow")}</button></article></div>`
  );
}
const books = [
  [
    "S3 · V1",
    "Introdução à Propriedade Intelectual",
    "Um primeiro mapa das criações e formas de proteção.",
    "https://almanaquesdacomputacao.com.br/gutanunes/publications/serie3/S3V1small.pdf",
  ],
  [
    "S3 · V20",
    "Gerenciando Ativos por PI",
    "Referência de jogo para a conversa da oficina.",
    "https://almanaquesdacomputacao.com.br/gutanunes/publications/serie3/S3V20small.pdf",
  ],
  [
    "S6 · V1–4",
    "Informação tecnológica e busca",
    "Patentes como fonte, classificação e Espacenet.",
    "https://almanaquesdacomputacao.com.br/serie6baixa.html",
  ],
];
function materialsView() {
  let content;
  if (materialTab === "almanaques")
    content = `<div class="grid three">${books.map(([id, title, description, url]) => `<article class="card"><div class="book"><div class="book-cover">${id.replace(" · ", "<br>")}</div><div><div class="meta">ALMANAQUES DA COMPUTAÇÃO</div><h3>${title}</h3></div></div><p style="margin-top:17px">${description}</p>${link(url, "Ler na fonte original")}<div style="margin-top:13px"><span class="pill">Uso na oficina em revisão</span></div></article>`).join("")}</div>${notice("As edições e os jogos usados na oficina dependem da revisão de conteúdo e da verificação de permissões pela equipe.")}<div class="section-heading"><h2>Um guia também pode ser visto.</h2></div><div class="split"><div class="placeholder video">${icon("play")}<strong>Vídeo de orientação</strong><p>Espaço reservado para o vídeo 1, com legendas ou transcrição.</p></div><div><h3>Do problema à informação</h3><p>O primeiro vídeo acompanha o percurso de pesquisa e ajuda a localizar as fontes.</p><button class="text-button" data-material="guia">Ver estrutura do guia ${icon("arrow")}</button></div></div>`;
  else if (materialTab === "mapa")
    content = `<h2>O que foi criado? Qual caminho investigar?</h2><p>Um mapa inicial para discutir tipos de PI. Os exemplos são didáticos.</p><div class="table-wrap"><table class="table"><thead><tr><th>Criação</th><th>Categoria a investigar</th><th>Pergunta para o grupo</th></tr></thead><tbody><tr><td>Nome e símbolo de um serviço</td><td>Marca</td><td>Quem usará a marca?</td></tr><tr><td>Uma solução técnica</td><td>Patente, conforme requisitos</td><td>O que já foi publicado?</td></tr><tr><td>Código de um painel</td><td>Programa de computador</td><td>Quem escreveu e quais licenças utilizou?</td></tr><tr><td>Textos e ilustrações</td><td>Direito autoral</td><td>Como registrar autoria e permissões?</td></tr></tbody></table></div><div class="section-heading"><h2>Glossário para começar</h2></div>${[
      [
        "Reivindicação",
        "Parte do documento em que se define a matéria para a qual se solicita proteção.",
      ],
      [
        "Família de patentes",
        "Documentos relacionados por prioridades comuns. A regra de agrupamento depende da base.",
      ],
      ["Depositante", "Pessoa ou organização que apresenta o pedido."],
      [
        "Estado da técnica",
        "Conhecimento disponibilizado ao público relevante para a pesquisa.",
      ],
    ]
      .map(
        ([term, meaning]) =>
          `<details class="details"><summary>${term}</summary><p>${meaning}</p></details>`,
      )
      .join("")}`;
  else
    content = `<div class="split"><section><h2>Um roteiro para entender o depósito.</h2><p>Estrutura proposta do guia educativo. A coordenação revisará o conteúdo e os links.</p><ol class="timeline"><li><span class="time">PESQUISA</span><div><strong>Conhecer o que já existe</strong><p>Pesquisar documentos e registrar fontes, termos e limitações.</p></div></li><li><span class="time">LEITURA</span><div><strong>Entender o documento</strong><p>Localizar os dados, a descrição, os desenhos e as reivindicações.</p></div></li><li><span class="time">FONTES</span><div><strong>Consultar o percurso oficial</strong><p>Abrir as orientações atuais do INPI para o depósito.</p></div></li><li><span class="time">APOIO</span><div><strong>Encaminhar dúvidas específicas</strong><p>Buscar o canal institucional ou profissional adequado para a situação.</p></div></li></ol>${link("https://www.gov.br/inpi/pt-br/servicos/patentes/tutorial-de-deposito", "Consultar tutorial do INPI", "btn primary")}</section><aside class="card soft"><h3>Antes de compartilhar uma ideia</h3><p>Evite detalhes confidenciais em consultas, inscrições e atividades públicas.</p><p class="small">A orientação do projeto é educativa. Questões individuais de proteção e licenciamento seguem para os canais habilitados.</p>${action("busca", "Organizar uma pesquisa")}</aside></div>`;
  return (
    heading(
      "Biblioteca de apoio",
      "Aprender, consultar e compartilhar.",
      "Materiais para a oficina e para continuar a pesquisa no seu ritmo.",
    ) +
    tabs(
      [
        ["almanaques", "Gibis e jogos"],
        ["mapa", "Mapa de PI e glossário"],
        ["guia", "Guia do depósito"],
      ],
      materialTab,
      "material",
    ) +
    content
  );
}
function workshopView() {
  return (
    heading(
      "Primeira oficina",
      "Propriedade intelectual em jogo.",
      "Um encontro para reconhecer criações, discutir escolhas e explorar fontes com gibis e jogos.",
    ) +
    `<div class="split"><section><div class="tag-row"><span class="tag">Duração prevista · 2 horas</span><span class="tag">Turma-piloto · referência de 12 pessoas</span><span class="tag">Data e formato a confirmar</span></div><ol class="timeline"><li><span class="time">15 min</span><div><strong>Chegada e diagnóstico</strong><p>O que o grupo já conhece de propriedade intelectual?</p></div></li><li><span class="time">20 min</span><div><strong>Um mapa das nossas criações</strong><p>Nome, software, textos e soluções técnicas do dia a dia.</p></div></li><li><span class="time">45 min</span><div><strong>Experimentar e discutir o jogo</strong><p>Escolher, justificar, registrar decisões e conferir os materiais.</p></div></li><li><span class="time">25 min</span><div><strong>Voltar às fontes</strong><p>Revisitar conceitos, dúvidas e interpretações com a equipe.</p></div></li><li><span class="time">15 min</span><div><strong>Deixar uma contribuição</strong><p>Que parte ajudou? Que mudança faria a oficina mais clara?</p></div></li></ol><p class="small">Distribuição de tempo proposta para avaliação com a orientadora.</p><div class="actions"><button class="btn primary" data-modal="inscricao">Experimentar inscrição ${icon("arrow")}</button><button class="btn" data-modal="diagnostico">Ver diagnóstico</button></div></section><aside><article class="card soft"><div class="icon-box">${icon("game")}</div><h3>Já pode experimentar.</h3><p>Conheça a mecânica ilustrativa antes da conversa.</p>${action("jogo", "Abrir o jogo", false, "arrow")}</article><article class="card" style="margin-top:15px"><h3>Espaço de escuta</h3><p>Registre sua impressão sobre a proposta.</p><button class="text-button" data-modal="feedback">Deixar uma contribuição ${icon("arrow")}</button></article></aside></div><section class="divider" style="margin-top:27px"><div class="section-heading" style="margin-top:0"><h2>Preparar também o atendimento.</h2><button class="text-button" data-modal="simulacao">Ver simulação ${icon("arrow")}</button></div><p class="small">No módulo 3, a equipe ensaia o fluxo da clínica, mede o esforço e ajusta a capacidade antes de abrir a agenda.</p></section>`
  );
}
function showcaseView() {
  return (
    heading(
      "Tecnologias da UNIRIO",
      "Pesquisa que pode encontrar caminhos.",
      "Um espaço para conhecer tecnologias e suas aplicações, com fichas revisadas pelo NIT.",
    ) +
    `<div class="empty-state">${icon("lock")}<h2>As fichas passam por validação.</h2><p>O portal terá até três fichas iniciais. Enquanto os materiais são revisados, conheça o fluxo de publicação e de contato institucional.</p><button class="btn" data-modal="ficha">Ver estrutura de uma ficha ${icon("file")}</button></div><div class="steps-flow"><div class="flow-step"><strong>Preparar a ficha</strong><span>Problema, aplicação e fonte</span></div>${icon("arrow")}<div class="flow-step"><strong>Validar com o NIT</strong><span>Revisão e autorização</span></div>${icon("arrow")}<div class="flow-step"><strong>Publicar e encaminhar</strong><span>Contato pelo canal institucional</span></div></div><div class="grid two"><article class="card soft"><h3>O que você verá em cada ficha</h3><p>Título, problema, aplicação, identificador do documento, fonte, data de revisão e canal institucional.</p></article><article class="card"><h3>Uma conversa com a universidade</h3><p>Os interessados seguem para o canal confirmado com o NIT. A equipe publicará esse contato após a validação.</p><button class="text-button" data-go="materiais">Entender os conceitos de PI ${icon("arrow")}</button></article></div>`
  );
}
const views = {
  inicio: homeView,
  preparacao: preparationView,
  jogo: gameView,
  busca: searchView,
  panorama: panoramaView,
  materiais: materialsView,
  oficina: workshopView,
  vitrine: showcaseView,
};
function siteHeader(id) {
  return `<header class="site-header"><a class="brand" href="#inicio">${icon("leaf")}Patente ao Alcance</a><nav class="site-nav" aria-label="Navegação do portal">${[
    ["busca", "Pesquisar"],
    ["panorama", "Panorama"],
    ["materiais", "Aprender"],
    ["oficina", "Oficina"],
    ["vitrine", "Vitrine"],
  ]
    .map(
      ([key, name]) =>
        `<button data-go="${key}" class="${id === key ? "active" : ""}">${name}</button>`,
    )
    .join("")}</nav></header>`;
}
function annotation(s) {
  return `<div class="annotation" ${annotations ? "" : "hidden"}><div><strong>${s.module}</strong><span class="module">PARA REVISÃO</span></div><div><p>${s.purpose}</p><p class="review-question">${s.question}</p></div></div>`;
}
function render() {
  const s = screens.find((v) => v.id === current);
  const index = screens.indexOf(s);
  document.title = `${s.title} · Patente ao Alcance`;
  document.getElementById("app").innerHTML =
    `<div class="studio"><aside class="rail"><div><div class="studio-logo"><span class="mark">${icon("leaf")}</span>Patente ao Alcance</div><p class="rail-note">Wireframes para conversar<br>sobre o portal e a oficina.</p></div><div><p class="rail-label">Percurso de apresentação</p><nav class="nav-list" aria-label="Telas do protótipo">${screens.map((v, i) => `<button class="nav-item ${v.id === current ? "active" : ""}" data-go="${v.id}" ${v.id === current ? 'aria-current="page"' : ""}><span class="num">${String(i + 1).padStart(2, "0")}</span>${icon(v.icon)}${v.title}</button>`).join("")}</nav></div><div class="rail-bottom">Módulos 1, 2 e 3<br>Planejamento · ${sourceCommit.slice(0, 7)}<br>${link(sourceUrl, "Consultar documento")}<br><span>O M2 detalhado trata do jogo.<br>A tabela-resumo ainda o nomeia “Busca e dados”.</span></div></aside><main class="workspace"><div class="toolbar"><div class="toolbar-title"><span class="status-dot"></span>Protótipo para discussão · M1–M3</div><div class="toolbar-actions"><div class="segmented" aria-label="Largura da prévia"><button id="desktop-view" class="${mobile ? "" : "selected"}" aria-pressed="${!mobile}">${icon("monitor")}<span>Desktop</span></button><button id="mobile-view" class="${mobile ? "selected" : ""}" aria-pressed="${mobile}">${icon("mobile")}<span>Celular</span></button></div><button class="text-button" id="toggle-notes" aria-pressed="${annotations}">Notas ${annotations ? "visíveis" : "ocultas"}</button><button class="text-button" id="print-all">${icon("print")}Imprimir telas</button></div></div><div class="work-area"><div class="frame ${mobile ? "is-mobile" : ""}"><div class="browser-bar"><span class="browser-dot"></span><span class="browser-dot"></span><span class="browser-dot"></span><span class="address">patenteaoalcance / ${s.id}</span></div>${siteHeader(s.id)}<section class="screen" id="screen" tabindex="-1" aria-label="${s.title}">${views[s.id]()}</section><footer class="site-footer"><span>Patente ao Alcance · Projeto de extensão</span><span>Wireframe · Conteúdo de demonstração</span></footer></div>${annotation(s)}<div class="page-controls"><button class="text-button" id="prev-screen" ${index === 0 ? "disabled" : ""}>Tela anterior</button><span class="counter">${String(index + 1).padStart(2, "0")} / ${String(screens.length).padStart(2, "0")}</span><button class="text-button" id="next-screen" ${index === screens.length - 1 ? "disabled" : ""}>Próxima tela</button></div></div></main></div>`;
}
function go(id) {
  if (!views[id]) return;
  current = id;
  history.replaceState(null, "", "#" + id);
  render();
  document.getElementById("screen").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}
function toast(message) {
  const node = document.getElementById("toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 3200);
}
function openModal(title, content) {
  const dialog = document.getElementById("dialog");
  document.getElementById("dialog-content").innerHTML =
    `<div class="modal-head"><h2 id="dialog-title">${title}</h2><button class="icon-btn" id="close-dialog" aria-label="Fechar">${icon("close")}</button></div>${content}`;
  dialog.showModal();
}
function modal(kind) {
  if (kind === "inscricao")
    openModal(
      "Inscrição de demonstração",
      notice(
        "Este formulário valida a experiência da inscrição. Os dados não são enviados ou armazenados.",
        true,
      ) +
        `<form id="registration-form"><div class="form-field"><label for="display-name">Nome de demonstração</label><input id="display-name" name="name" placeholder="Use um nome fictício" required maxlength="80"></div><div class="form-field"><label for="profile">Como você participa?</label><select id="profile" name="profile"><option>Empresa júnior</option><option>Pequeno negócio</option><option>Estudante</option><option>Outra participação</option></select></div><div class="form-field"><label for="accessibility">Recurso de acessibilidade desejado <span class="hint">opcional</span></label><select id="accessibility"><option>A definir com a equipe</option>Legendas ou transcrição</option>Material em formato digital</option>Outro recurso a combinar</option></select></div><button class="btn primary" type="submit">Simular inscrição ${icon("check")}</button></form>`,
    );
  if (kind === "diagnostico")
    openModal(
      "Diagnóstico da oficina",
      `<p>Exemplo da primeira pergunta. A equipe revisará as cinco perguntas antes da aplicação.</p><form id="diagnostic-form"><h3>Um nome que identifica um serviço se relaciona a qual categoria?</h3>${["Marca", "Patente", "Indicação geográfica"].map((v, i) => `<label class="choice" style="margin-top:9px"><input type="radio" name="answer" value="${i}" required>${v}</label>`).join("")}<button type="submit" class="btn primary" style="margin-top:18px">Conferir resposta</button><div id="diagnostic-response" role="status"></div></form>`,
    );
  if (kind === "feedback")
    openModal(
      "Sua contribuição para a oficina",
      `<p>Rascunho de feedback. Os comentários ficam nesta sessão da demonstração.</p><form id="feedback-form"><div class="form-field"><label for="clarity">O que ficou mais claro?</label><textarea id="clarity" name="clarity" required maxlength="500">${escapeHtml(feedbackDraft.clarity)}</textarea></div><div class="form-field"><label for="improvement">O que podemos melhorar?</label><textarea id="improvement" name="improvement" required maxlength="500">${escapeHtml(feedbackDraft.improvement)}</textarea></div><button class="btn primary" type="submit">Registrar contribuição ${icon("check")}</button></form>`,
    );
  if (kind === "metodo")
    openModal(
      "Nota metodológica do panorama",
      `<p>Esta ficha acompanha o conjunto real quando os agregados forem publicados.</p><div class="source-row"><strong>Origem</strong><span>Base e link de acesso</span></div><div class="source-row"><strong>Extração</strong><span>Consulta, filtros e data</span></div><div class="source-row"><strong>Contagem</strong><span>Documento ou família</span></div><div class="source-row"><strong>Cobertura</strong><span>Recorte e limitações</span></div><div class="source-row"><strong>Reprodução</strong><span>Arquivo e versão no repositório</span></div>${notice("Os gráficos desta prévia usam 45 registros sintéticos, organizados apenas para demonstrar as visualizações.", true)}`,
    );
  if (kind === "ficha")
    openModal(
      "Estrutura de uma ficha de tecnologia",
      notice(
        "Modelo ilustrativo sem tecnologia real cadastrada ou autorizada.",
        true,
      ) +
        `<div class="placeholder"><strong>Título da tecnologia</strong><p>Problema que resolve e aplicação potencial</p></div><div class="source-row"><strong>Documento</strong><span>Identificador verificável</span></div><div class="source-row"><strong>Origem</strong><span>Link da fonte oficial</span></div><div class="source-row"><strong>Revisão</strong><span>Data e validação do NIT</span></div><div class="source-row"><strong>Contato</strong><span>Canal institucional aprovado</span></div>`,
    );
  if (kind === "simulacao")
    openModal(
      "Simular o percurso do atendimento",
      `<p>Fluxo a ensaiar pela equipe no M3. A abertura da agenda depende da revisão do formulário e do relatório.</p><ol class="timeline"><li><span class="time">ENTRADA</span><div><strong>Descrição geral da necessidade</strong><p>Coleta mínima de informação, sem detalhes confidenciais.</p></div></li><li><span class="time">ENCONTRO</span><div><strong>Busca acompanhada</strong><p>Registrar termos, base, data, filtros e limitações.</p></div></li><li><span class="time">REVISÃO</span><div><strong>Relatório educativo</strong><p>Resumo da consulta, fontes e próximos passos a revisar.</p></div></li></ol><div class="form-field"><label for="effort">Esforço medido na simulação <span class="hint">horas de equipe</span></label><input id="effort" type="number" min="0.25" max="100" step="0.25" value="4"></div><div class="form-field"><label for="available-hours">Horas de equipe disponíveis <span class="hint">valor de demonstração, ajustável</span></label><input id="available-hours" type="number" min="0.25" max="1000" step="0.25" value="24"></div><button class="btn primary" id="check-effort">Estimar capacidade</button><div id="effort-response" role="status"></div>`,
    );
}
function preparePrint() {
  document.querySelector(".print-views")?.remove();
  const saved = { gameStarted, cardIndex, teamTab, materialTab, annotations };
  const savedSearch = { ...searchDraft };
  const savedListening = { ...listeningDraft };
  gameStarted = false;
  teamTab = "escuta";
  materialTab = "almanaques";
  annotations = true;
  Object.assign(searchDraft, {
    problem: "",
    component: "",
    extra: "",
    query: "",
  });
  Object.assign(listeningDraft, {
    audience: "",
    need: "",
    format: "A definir na reunião",
    saved: false,
  });
  const area = document.createElement("div");
  area.className = "print-views";
  area.innerHTML = screens
    .map(
      (s, i) =>
        `<article class="print-page"><div class="print-head"><strong>Patente ao Alcance · Wireframes M1–M3</strong><span>${i + 1} / ${screens.length} · ${s.title}</span></div>${siteHeader(s.id)}<div class="screen">${views[s.id]()}</div>${annotation(s)}</article>`,
    )
    .join("");
  ({ gameStarted, cardIndex, teamTab, materialTab, annotations } = saved);
  Object.assign(searchDraft, savedSearch);
  Object.assign(listeningDraft, savedListening);
  document.body.append(area);
}
document.addEventListener("click", async (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  if (button.hasAttribute("data-open-map")) {
    materialTab = "mapa";
    return go("materiais");
  }
  if (button.dataset.go) return go(button.dataset.go);
  if (button.dataset.team) {
    teamTab = button.dataset.team;
    return render();
  }
  if (button.dataset.material) {
    materialTab = button.dataset.material;
    return render();
  }
  if (button.dataset.modal) return modal(button.dataset.modal);
  if (button.dataset.choice !== undefined) {
    gameChoice = Number(button.dataset.choice);
    gameDecisions[cardIndex] = gameChoice;
    return render();
  }
  switch (button.id) {
    case "desktop-view":
      mobile = false;
      render();
      break;
    case "mobile-view":
      mobile = true;
      render();
      break;
    case "toggle-notes":
      annotations = !annotations;
      render();
      break;
    case "prev-screen":
      go(screens[screens.findIndex((s) => s.id === current) - 1]?.id);
      break;
    case "next-screen":
      go(screens[screens.findIndex((s) => s.id === current) + 1]?.id);
      break;
    case "print-all":
      preparePrint();
      window.print();
      break;
    case "close-dialog":
      document.getElementById("dialog").close();
      break;
    case "start-game":
      gameStarted = true;
      cardIndex = 0;
      gameChoice = null;
      gameDecisions = [];
      render();
      break;
    case "restart-game":
      gameStarted = false;
      cardIndex = 0;
      gameChoice = null;
      gameDecisions = [];
      render();
      break;
    case "next-card":
      cardIndex++;
      gameChoice = null;
      render();
      break;
    case "fill-example":
      searchDraft.problem = "captação de água da chuva";
      searchDraft.component = "filtro reservatório";
      searchDraft.extra = "sensor de nível";
      render();
      break;
    case "copy-query":
      try {
        await navigator.clipboard.writeText(searchDraft.query);
        toast("Consulta copiada.");
      } catch {
        toast("Selecione e copie os termos no quadro da consulta.");
      }
      break;
    case "download-search": {
      const text = `FICHA DE BUSCA · PATENTE AO ALCANCE\nData: ${new Date().toLocaleDateString("pt-BR")}\nConsulta: ${searchDraft.query}\nBase consultada: __________________\nFiltros: __________________\nDocumentos e identificadores: __________________\nLimitações: __________________\n`;
      const url = URL.createObjectURL(
        new Blob([text], { type: "text/plain;charset=utf-8" }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "ficha-de-busca.txt";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      break;
    }
    case "check-effort": {
      const input = document.getElementById("effort");
      const available = document.getElementById("available-hours");
      if (!input.reportValidity() || !available.reportValidity()) break;
      const capacity = Math.floor(
        Number(available.value) / Number(input.value),
      );
      document.getElementById("effort-response").innerHTML =
        `<div class="form-success">Com os valores informados, cabem até ${capacity} atendimento(s). A estimativa divide as horas disponíveis pelo esforço medido e ajuda a ajustar a agenda. Os valores iniciais são ilustrativos.</div>`;
      break;
    }
  }
});
document.addEventListener("submit", (event) => {
  const form = event.target;
  if (
    ![
      "search-form",
      "listening-form",
      "registration-form",
      "feedback-form",
      "diagnostic-form",
    ].includes(form.id)
  )
    return;
  event.preventDefault();
  const data = new FormData(form);
  if (form.id === "search-form") {
    ["problem", "component", "extra"].forEach(
      (k) => (searchDraft[k] = String(data.get(k) || "").trim()),
    );
    searchDraft.query = [
      searchDraft.problem,
      searchDraft.component,
      searchDraft.extra,
    ]
      .filter(Boolean)
      .join(" ");
    if (!searchDraft.query) return;
    render();
    toast("Consulta preparada. Escolha a base para continuar.");
  }
  if (form.id === "listening-form") {
    ["audience", "need", "format"].forEach(
      (k) => (listeningDraft[k] = String(data.get(k) || "")),
    );
    listeningDraft.saved = true;
    render();
  }
  if (form.id === "registration-form") {
    document.getElementById("dialog-content").innerHTML =
      `<div class="modal-head"><h2 id="dialog-title">Inscrição simulada</h2><button class="icon-btn" id="close-dialog" aria-label="Fechar">${icon("close")}</button></div><div class="form-success">Pronto, ${escapeHtml(data.get("name"))}. O percurso de inscrição foi demonstrado. Nenhuma vaga foi reservada.</div><p>A equipe confirmará data, formato e capacidade antes de abrir as inscrições reais.</p>`;
  }
  if (form.id === "feedback-form") {
    feedbackDraft.clarity = String(data.get("clarity"));
    feedbackDraft.improvement = String(data.get("improvement"));
    feedbackDraft.saved = true;
    document.getElementById("dialog").close();
    toast("Contribuição registrada nesta sessão.");
  }
  if (form.id === "diagnostic-form")
    document.getElementById("diagnostic-response").innerHTML =
      `<div class="form-success">${data.get("answer") === "0" ? "Marca é a categoria a investigar neste exemplo." : "Neste exemplo, o nome identifica um serviço. A categoria a investigar é marca."} Registre também a justificativa e a dúvida do participante.</div>`;
});
document.addEventListener("input", (event) => {
  const field = event.target;
  if (field.form?.id === "search-form" && field.name in searchDraft)
    searchDraft[field.name] = field.value;
  if (field.form?.id === "listening-form" && field.name in listeningDraft) {
    listeningDraft[field.name] = field.value;
    listeningDraft.saved = false;
  }
});
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (views[id]) go(id);
});
window.addEventListener("beforeprint", preparePrint);
render();
if (new URLSearchParams(location.search).has("print")) preparePrint();
