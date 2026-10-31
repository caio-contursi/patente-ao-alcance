# Patente ao Alcance
## Visão do produto e arquitetura inicial

**Documento de orientação para o início do projeto**  
Versão 1.0 · 31 de outubro de 2026  
Equipe: Pedro Bartkevihi, Caio Contursi e Enzo Paulino  
Plano de referência: 150 horas por integrante · 20 horas semanais por integrante · 450 horas de esforço total da equipe

## Para que serve este documento

Este documento transforma as ideias discutidas para o Patente ao Alcance em uma visão inicial do produto, um escopo viável para o primeiro protótipo e uma explicação acessível de como construir um assistente de consulta a patentes com tecnologias abertas, executado na VPS já disponível. A proposta usa Java no backend e TypeScript no frontend.

A conclusão de arquitetura é começar com busca e comparação rastreáveis, e adicionar um modelo de linguagem local apenas para organizar explicações apoiadas por documentos recuperados. Não é necessário treinar um modelo grande do zero. O primeiro protótipo deve priorizar documentos de patentes depositados no Brasil, mostrar as fontes consultadas e deixar visíveis as limitações da busca.

## 1. Visão e objetivos principais

O Patente ao Alcance pretende democratizar o acesso e o entendimento de informações sobre patentes, começando pelo contexto brasileiro. O sistema será um assistente de consulta e validação preliminar de informações, destinado a apoiar estudantes, inventores, pequenas empresas e pessoas que estejam aprendendo sobre propriedade intelectual.

Objetivos principais:

1. Ajudar uma pessoa a pesquisar documentos de patente relacionados a uma descrição técnica.
2. Encontrar documentos semelhantes ou próximos e explicar quais partes da descrição parecem relacionadas.
3. Apresentar fatos, documentos oficiais e referências verificáveis para que a pessoa possa continuar sua própria pesquisa.
4. Explicar conceitos e etapas do sistema de patentes brasileiro em linguagem acessível.
5. Estudar padrões observáveis em documentos e decisões públicas do INPI, sem transformar esses padrões em promessa sobre o resultado de um pedido futuro.
6. Criar uma base técnica que possa ser ampliada depois para outras fontes e países, desde que haja capacidade, dados e autorização de uso apropriados.
7. Usar o projeto como material educacional: busca em bases de patentes, propriedade intelectual, análise de documentos, engenharia reversa responsável e apresentação de ideias em formato de pitch ou hackathon.

## 2. Limites e linguagem responsável

O sistema não será um escritório de patentes, não substituirá um agente da propriedade industrial ou advogado e não emitirá uma decisão oficial sobre patenteabilidade. Uma resposta automatizada não deve afirmar que uma invenção “é patenteável”, “está garantida” ou “será concedida”.

O primeiro protótipo apresentará documentos encontrados, trechos relevantes, semelhanças observadas, diferenças aparentes, datas e fontes. “Não encontramos documentos semelhantes” significa apenas que a busca não encontrou evidência dentro das fontes, campos e período cobertos. Não prova novidade nem assegura que não exista anterioridade.

No Brasil, os requisitos legais incluem novidade, atividade inventiva, aplicação industrial e matéria elegível, conforme a Lei da Propriedade Industrial. A análise depende das reivindicações, do estado da técnica e do exame oficial. Uma divulgação pública feita em qualquer país pode ser relevante para a novidade, mesmo quando a patente estrangeira não dá, por si só, exclusividade no Brasil. Direitos de patente são territoriais: uma patente concedida em outro país não produz automaticamente exclusividade brasileira; é necessário obter proteção no Brasil pelo caminho aplicável e receber concessão nacional.

A busca inicial pode mostrar padrões de decisões públicas anteriores, quando os dados permitirem relacionar os documentos e seus despachos. Esses padrões são contexto histórico, não uma previsão confiável do resultado de um novo pedido. O protótipo não deve exibir probabilidades de concessão. Uma eventual estimativa futura só poderá ser estudada após obter dados rotulados suficientes, medir cobertura e qualidade, testar em casos não usados na construção e explicar amostra, incerteza e método. Uma pontuação de similaridade não é probabilidade de concessão.

## 3. Escopo do primeiro protótipo

### Incluído no primeiro ciclo

- Busca inicial de documentos de patente brasileiros por palavras-chave e descrição técnica.
- Filtros básicos, conforme os campos disponíveis: título, número de publicação ou pedido, depositante, inventor, datas, classificação e situação.
- Lista de resultados com título, identificador, datas relevantes, fonte oficial e link para o documento.
- Comparação explicável entre a descrição submetida e os documentos mais próximos, apontando termos, trechos ou componentes relacionados.
- Visualização das evidências recuperadas antes da resposta explicativa.
- Assistente em português para explicar resultados e conceitos, limitado às fontes recuperadas e com citações visíveis.
- Indicação da abrangência da busca e de suas limitações.
- Interface no site existente ou planejado, com frontend em TypeScript e backend Java.
- Demonstração de um modelo aberto executado na VPS, condicionada à memória e capacidade de processamento disponíveis.
- Registro de aprendizados, dúvidas, decisões e resultados de cada módulo do plano de trabalho.

### Fora do escopo inicial

- Cobrir todas as patentes do mundo ou todas as bases nacionais.
- Fazer download automatizado em massa de qualquer fonte sem verificar termos de uso, licença e limites técnicos.
- Treinar um grande modelo de linguagem do zero.
- Emitir parecer jurídico ou substituir avaliação profissional.
- Recomendar depósito ou afirmar concessão.
- Mostrar uma porcentagem de chance de concessão sem validação estatística robusta.
- Tratar engenharia reversa como autorização para copiar produtos protegidos; ela será abordada para fins educacionais e de análise técnica, respeitando direitos e regras aplicáveis.
- Usar qualquer invenção submetida como dado de treinamento sem consentimento, governança e justificativa claros.

## 4. Experiência proposta no site

Uma jornada inicial pode funcionar assim:

1. A pessoa descreve o problema técnico, a solução proposta e os componentes que considera essenciais. O formulário explica que não se deve inserir informação confidencial no protótipo.
2. O site envia a consulta ao backend Java por conexão segura.
3. O backend procura documentos indexados por termos e por proximidade semântica, aplica filtros e seleciona evidências.
4. A interface mostra primeiro os documentos e os trechos que justificam sua relevância.
5. O assistente local pode resumir as evidências e explicar semelhanças e diferenças, sempre citando os documentos recuperados.
6. A pessoa pode abrir as fontes oficiais, ajustar a busca, registrar feedback ou baixar o resumo da consulta.
7. A tela informa claramente que os resultados dependem da cobertura da base e não constituem decisão oficial nem garantia de elegibilidade.

Funcionalidades que podem ser consideradas depois do primeiro protótipo:

- Busca guiada com perguntas para tornar a descrição técnica mais precisa.
- Explicação de novidade, atividade inventiva, aplicação industrial, reivindicações, famílias de patentes e fases do pedido.
- Linha do tempo do pedido e glossário de eventos do INPI, se os dados forem confiáveis.
- Comparação lado a lado de reivindicações e documentos encontrados.
- Coleção de exemplos didáticos e exercícios de busca.
- Modo educacional para oficinas, empresas juniores e pequenos negócios.
- Relatório exportável com consulta, data, fontes, critérios e limitações.
- Integração internacional progressiva por fontes escolhidas e permitidas.
- Mecanismo de feedback para sinalizar resultado útil, fonte quebrada ou explicação incorreta.

## 5. Como construir a IA do zero, em termos práticos

“Construir a IA” pode significar duas coisas diferentes. Treinar um modelo de linguagem grande do zero exige enormes volumes de texto, GPUs caras, equipe especializada e avaliação contínua. Isso não é uma meta realista para este projeto com a VPS existente e o prazo do primeiro ciclo.

O caminho viável é criar um sistema próprio em torno de modelos de código aberto já treinados. A equipe escolhe um modelo com licença adequada, roda esse modelo localmente e o conecta a uma base de documentos de patentes. O valor específico do projeto estará na qualidade da busca, na curadoria das fontes, na comparação de evidências, nas regras de transparência e na experiência do site.

### Componentes em linguagem simples

- **Documentos e dados:** publicações, metadados e, quando disponíveis e permitidos, decisões e trechos relevantes.
- **Índice de busca:** estrutura que permite localizar documentos por palavras, números, nomes, classificações e conteúdo.
- **Embeddings:** representações numéricas que ajudam o sistema a encontrar textos com significado parecido, mesmo que usem palavras diferentes.
- **Busca híbrida:** combinação de busca por termos exatos e busca semântica. Isso é útil porque números, nomes e termos técnicos exigem correspondência literal, enquanto descrições de ideias podem usar vocabulário diferente.
- **RAG (geração apoiada por recuperação):** antes de responder, o sistema busca documentos relevantes e fornece trechos e metadados ao modelo. O modelo organiza uma explicação usando esse material. As citações devem apontar para as fontes recuperadas, e a aplicação deve evitar responder como se tivesse visto a base inteira.
- **Modelo de linguagem local:** componente que interpreta a pergunta e redige uma resposta a partir do contexto fornecido. Ele não deve inventar fonte, número de patente ou conclusão legal.
- **API Java:** coordena autenticação, busca, filtros, regras, chamadas ao índice e ao modelo, limites de uso e resposta ao site.
- **Frontend TypeScript:** apresenta formulário, resultados, trechos, fontes, avisos e feedback.

### Fluxo simplificado

~~~mermaid
flowchart LR
    U[Pessoa no site] --> F[Frontend TypeScript]
    F --> A[API Java]
    A --> S[Busca por termos e significado]
    S --> D[Documentos e trechos com metadados]
    D --> A
    A --> L[Modelo aberto local na VPS]
    L --> A
    A --> F
    F --> R[Resposta com evidências e links oficiais]

    O[Fontes oficiais e permitidas] --> I[Importação e normalização]
    I --> E[Texto, metadados e índice]
    E --> S
~~~

### Passos de aprendizagem antes da implementação

1. **Aprender a diferença entre modelo, busca e produto.** O modelo gera linguagem; a busca localiza evidências; o produto define fontes, limites e como mostrar o resultado.
2. **Experimentar busca textual sem IA.** Com um conjunto pequeno de documentos, pesquisar título, resumo, número e palavras-chave. Isso cria uma referência para saber se a camada semântica realmente ajuda.
3. **Conhecer os dados.** Verificar formatos, campos, cobertura, atualização, idioma, OCR e condições de uso. Registrar de onde veio cada dado e a data de coleta.
4. **Testar embeddings e busca semântica.** Comparar consultas técnicas com resultados conhecidos e inspecionar falsos positivos e documentos ausentes.
5. **Executar um modelo aberto local.** Avaliar modelos de tamanho compatível com a VPS. Ferramentas como Ollama podem facilitar a execução local, mas a escolha final depende de RAM, CPU/GPU, armazenamento, licença e desempenho em português.
6. **Montar um RAG pequeno.** Recuperar poucos trechos de documentos e pedir ao modelo uma explicação com citações. Conferir manualmente se cada afirmação tem suporte.
7. **Integrar ao Java.** O backend chama o serviço local do modelo por HTTP na própria VPS ou em uma rede privada. O modelo não precisa receber acesso direto à internet ou à base inteira.
8. **Avaliar antes de ampliar.** Montar consultas de teste com respostas esperadas, verificar qualidade de recuperação, correção das fontes, latência e comportamento quando não há evidência suficiente.

### Exemplo simples

Consulta: “Existe documento brasileiro sobre um sistema de irrigação que economiza água usando sensores de umidade?”

A busca pode recuperar documentos com “irrigação”, “umidade do solo”, “válvula” e termos próximos. A tela apresenta os documentos e trechos relevantes. O modelo pode explicar que um documento descreve sensores e controle de irrigação, enquanto outro usa uma técnica diferente. Ele deve citar os documentos e não concluir que a ideia do usuário é patenteável ou que não existe anterioridade.

## 6. Arquitetura inicial recomendada

- **Frontend:** TypeScript, mantendo a tecnologia já usada pelo site. Se ainda não houver aplicação, React é uma opção comum, mas a decisão deve considerar o projeto existente.
- **Backend:** Java com Spring Boot para API HTTP, validação, regras do produto e integração com os demais serviços.
- **Banco relacional:** PostgreSQL para metadados, usuários, consultas e estado do sistema.
- **Busca textual e filtros:** iniciar com PostgreSQL ou um mecanismo de busca dedicado, conforme volume e necessidade de ranking.
- **Busca semântica:** embeddings multilíngues e índice vetorial, por exemplo pgvector junto ao PostgreSQL. A qualidade em português técnico deve ser medida com consultas reais.
- **Modelo de linguagem:** modelo de pesos abertos executado localmente; avaliar Ollama como opção de experimentação. Verificar licença, RAM, velocidade, suporte a português e qualidade de respostas com contexto.
- **Arquivos e extração:** armazenamento organizado para documentos permitidos, com ferramentas para extrair PDF e OCR apenas quando necessário.
- **Observabilidade:** logs sem texto confidencial por padrão, métricas de latência, erros, custo de recursos e versão dos dados/modelos.
- **Implantação:** serviços isolados na VPS, acesso interno entre API e modelo, HTTPS na borda, backups e atualização controlada.

A escolha concreta de modelos e bancos depende das características da VPS. Antes de decidir, registrar CPU, RAM, armazenamento livre, GPU/VRAM se houver, sistema operacional e tráfego esperado. Um modelo pequeno pode funcionar só em CPU, mas responder lentamente. Um modelo maior pode exigir GPU ou quantização e ainda assim não caber na máquina. O primeiro teste deve medir uso de memória, tempo de resposta e qualidade.

### Custos e manutenção

Executar o modelo localmente evita cobrança por token de uma API externa e reduz o envio de textos de invenção a terceiros. Isso não significa custo zero: continuam existindo o preço da VPS já contratada, armazenamento, tráfego, backups, monitoramento, energia do provedor e tempo de manutenção. A carga pode exigir uma VPS mais forte ou outra máquina no futuro.

Também será necessário atualizar dependências e modelos, corrigir falhas, monitorar espaço em disco, proteger endpoints, revisar licenças e manter os dados de patentes atualizados. O sistema deve permanecer funcional quando o modelo estiver indisponível, oferecendo ao menos busca e documentos encontrados.

## 7. Dados brasileiros e contexto internacional

### Brasil como ponto de partida

A fonte prioritária é o conjunto de informações públicas do INPI e os acessos oficiais às bases de patentes indicados pelo próprio instituto. Antes de construir um importador, a equipe deve identificar quais campos estão disponíveis, quais formatos e condições de acesso se aplicam, frequência de atualização e se o uso pretendido é permitido. Nem todo registro terá texto pesquisável de qualidade; alguns documentos podem precisar de OCR e checagem.

O INPI é a principal fonte oficial para o processamento de pedidos e concessões brasileiras, mas não é a única base que pode conter informação sobre documentos relacionados ao Brasil. Fontes internacionais podem ajudar a localizar publicações e famílias, sem substituir a verificação do processo nacional no INPI. O escopo precisa diferenciar “publicado em uma base global” de “depositado, em fase nacional ou concedido no Brasil”.

### Plano internacional gradual

Incluir o mundo inteiro no primeiro ciclo não é viável. As bases têm formatos, cobertura, idiomas, políticas de acesso e atualizações diferentes. A equipe pode, no protótipo, escolher entre: (a) mostrar links para busca externa em fontes oficiais; ou (b) experimentar um único conector limitado, como uma consulta à API EPO OPS, respeitando cadastro, limites e termos. PATENTSCOPE não deve ser tratado como fonte para robôs ou download em massa; suas orientações proíbem automação desse tipo.

Para a entrega até 23 de dezembro de 2026, a recomendação é manter a indexação e a demonstração concentradas no Brasil e fazer, no máximo, uma prova de conceito de consulta internacional. Uma cobertura internacional real pode ser planejada como etapa posterior, país por país e com fonte e política de dados definidas.

## 8. Privacidade, segurança e confiança

Descrições de invenções podem conter informação sensível. Mesmo em um protótipo acadêmico, a interface deve alertar a pessoa para não inserir detalhes confidenciais antes de entender como os dados são tratados. Como padrão inicial:

- Não registrar o texto integral da invenção em logs técnicos.
- Não reutilizar consultas para treinar modelos sem consentimento explícito e finalidade documentada.
- Definir prazo e processo de exclusão de consultas armazenadas.
- Proteger o site com HTTPS, validação, limitação de requisições e controle de acesso.
- Manter o serviço do modelo acessível apenas ao backend e à rede privada.
- Registrar versões das bases e modelos para que os resultados possam ser reproduzidos.
- Mostrar fontes, datas de acesso, filtros e limitações da busca.
- Tratar o sistema como ferramenta educacional e informativa; encaminhar questões jurídicas específicas a profissional qualificado.

## 9. Integração com o site

O backend Java deve oferecer endpoints claros que o frontend TypeScript possa chamar. Um contrato inicial pode incluir:

- POST /api/search: recebe a descrição e filtros, retorna documentos e evidências com identificadores e URLs de origem.
- POST /api/explain: recebe uma consulta e uma lista de evidências selecionadas, retorna uma explicação com referências por documento.
- GET /api/patents/{id}: retorna metadados e links disponíveis para um documento.
- POST /api/feedback: registra avaliação simples sobre relevância, fonte ou explicação, sem guardar a descrição original por padrão.
- GET /api/health: informa disponibilidade dos componentes sem expor detalhes internos.

A interface deve separar visualmente evidência documental da explicação gerada. Cada referência da resposta deve poder ser aberta. Se a recuperação não encontrar apoio suficiente, o sistema deve dizer isso e oferecer formas de reformular a busca.

## 10. Plano de trabalho até 23 de dezembro de 2026

O plano mantém 150 horas para cada integrante, totalizando 450 horas de equipe. Cada módulo representa 25 horas por pessoa, ou 75 horas somadas. A divisão semanal prevista é de 20 horas por integrante; na semana final ficam 10 horas por pessoa para completar as 150 horas. As tarefas devem ser distribuídas de modo equilibrado, com revisão cruzada.

| Módulo e período | Esforço por integrante | Foco e entrega |
|---|---:|---|
| 1 · 03 a 10 nov. | 25 h | Alinhar problema, usuários, limites, fontes iniciais, requisitos e arquitetura de demonstração. Entrega: escopo acordado, mapa do fluxo, decisões e perguntas abertas. |
| 2 · 11 a 18 nov. | 25 h | Inspecionar dados brasileiros permitidos, selecionar amostra, normalizar metadados e criar busca textual de referência. Entrega: amostra documentada, critérios de ingestão e busca básica. |
| 3 · 19 a 26 nov. | 25 h | Criar API Java e integrar tela TypeScript para consulta, filtros, resultados e links oficiais. Entrega: fluxo de busca navegável. |
| 4 · 27 nov. a 04 dez. | 25 h | Implementar comparação inicial, trechos de evidência, explicações de critérios e casos de demonstração. Entrega: comparação inspecionável e roteiro de oficina. |
| 5 · 08 a 15 dez. | 25 h | Testar embeddings, modelo local e RAG na VPS; medir qualidade e recursos; avaliar uma fonte internacional limitada ou fornecer links externos. Entrega: demonstração local, registro de limitações e medições. |
| 6 · 16 a 23 dez. | 25 h | Corrigir fluxo, documentar instalação e uso, revisar conteúdo e segurança, preparar demo e pitch. Entrega: protótipo apresentado, documentação e próximos passos. |

A sequência não pressupõe disponibilidade de trabalho nos dias 05–07 de dezembro; a agenda semanal deve ser ajustada pelos integrantes, preservando as horas combinadas. O plano de tarefas detalhado e o relatório de finalização de módulos permanecem no documento de planejamento de 150 horas por integrante.

### Divisão equilibrada por responsabilidade

As três pessoas participam da definição, revisão e demonstração. A responsabilidade primária pode alternar por módulo para que ninguém fique isolado em uma só área:

- **Pedro Bartkevihi:** coordenação do fluxo e integração, documentação técnica e apoio à validação.
- **Caio Contursi:** pesquisa de fontes e dados, conteúdo educacional e critérios de evidência.
- **Enzo Paulino:** experiência TypeScript, protótipo de interface e apoio aos testes de busca.
- **Responsabilidade compartilhada:** backend Java, experimentos do modelo local, avaliação, segurança, revisão cruzada e apresentação. A liderança de uma tarefa não reduz a participação dos demais nem altera a meta de 25 horas por pessoa em cada módulo.

## 11. Como avaliar o protótipo

A demonstração deve ser julgada por critérios observáveis:

- Uma consulta retorna documentos com identificadores e fontes oficiais ou claramente identificadas.
- A busca oferece termos exatos e semelhança semântica, quando a camada estiver disponível.
- O usuário consegue entender por que cada documento apareceu.
- As afirmações da explicação apontam para evidências que a equipe pode conferir.
- O sistema declara quando a base ou a evidência não é suficiente.
- O protótipo não afirma que uma invenção é elegível ou que será concedida.
- A equipe registra falsos positivos, documentos relevantes que não apareceram, latência e recursos consumidos.
- O comportamento foi experimentado com consultas de teste documentadas.
- Os dados e modelos usados têm origem e condições de uso registradas.

## 12. Perguntas que a equipe precisa resolver no início

1. Quais recursos e limites exatos tem a VPS (CPU, RAM, disco, GPU/VRAM, sistema operacional e tráfego)?
2. Qual é a estrutura e tecnologia atual do site?
3. Qual será a primeira área técnica piloto para as buscas de demonstração?
4. Quais dados e interfaces do INPI podem ser usados no formato pretendido, e com que frequência serão atualizados?
5. Qual é a licença e a atribuição necessárias para cada conjunto de dados, modelo e software?
6. O protótipo terá login? Como evitar armazenar ideias sensíveis desnecessariamente?
7. Quais consultas de teste representam resultados úteis, resultados ruins e casos sem evidência?
8. A amostra de decisões públicas do INPI permite relacionar documentos, despachos e resultados sem ambiguidades?
9. O prazo permite apenas demonstração local para a equipe ou também uma disponibilização pública? Uma exposição pública exige revisar segurança, privacidade, capacidade e custos.

## 13. Fontes oficiais e técnicas para consulta

As fontes abaixo orientam a definição e devem ser novamente conferidas quando a equipe iniciar a implementação, pois regras de acesso, interfaces e serviços podem mudar.

- Lei nº 9.279/1996 — Lei da Propriedade Industrial, Portal da Legislação, Planalto: https://www.planalto.gov.br/ccivil_03/leis/l9279.htm
- INPI — Você quer patentear só no Brasil ou em outros países também?: https://www.gov.br/inpi/pt-br/servicos/patentes/tutorial-de-deposito/voce-quer-patentear-so-no-brasil-ou-em-outros-paises-tambem-1
- INPI — Acessos às bases de pesquisas e busca terceirizada: https://www.gov.br/inpi/pt-br/servicos/patentes/busca-terceirizada/acessos-as-bases-de-pesquisas/
- INPI — Bases de patentes online: https://www.gov.br/inpi/pt-br/assuntos/informacao/bases-de-patentes-online
- EPO — Open Patent Services (OPS), API e condições de acesso: https://www.epo.org/en/searching-for-patents/data/web-services/ops
- WIPO — PATENTSCOPE FAQs e limites de automação: https://www.wipo.int/en/web/patentscope/faqs_patentscope
- Spring Boot — documentação oficial: https://docs.spring.io/spring-boot/index.html
- Ollama — documentação oficial para execução local de modelos: https://docs.ollama.com/
- PostgreSQL — documentação oficial: https://www.postgresql.org/docs/
- pgvector — extensão vetorial para PostgreSQL: https://github.com/pgvector/pgvector

## 14. Próximo passo recomendado

Começar pelo inventário da VPS e do site, escolher uma área técnica piloto, verificar uma fonte brasileira permitida e selecionar um conjunto pequeno de documentos de demonstração. Depois, construir a busca textual básica e definir consultas de avaliação. Só então comparar embeddings e testar um modelo local. Essa ordem permite aprender o que cada componente acrescenta e evita confundir uma resposta convincente com uma busca correta.

