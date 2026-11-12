# Patente ao Alcance
## Visão do produto e arquitetura inicial

**Documento de orientação para o início do projeto**  
Versão Atual --> 1.1 · 11 de novembro de 2026  
Equipe: Pedro Bartkevihi, Caio Contursi e Enzo Paulino  
Plano de referência: 150 horas por integrante 

## Para que serve este documento?

Este documento transforma as ideias discutidas para o Patente ao Alcance em uma visão inicial do produto, um escopo viável para o primeiro protótipo. A proposta usa Java no backend e TypeScript no frontend.

## Limites e linguagem responsável:

O sistema não será um escritório de patentes, não substituirá um agente da propriedade industrial ou advogado e não emitirá uma decisão oficial sobre patenteabilidade. Uma resposta automatizada não deve afirmar que uma invenção “é patenteável”, “está garantida” ou “será concedida”.

O primeiro protótipo apresentará documentos encontrados, trechos relevantes, semelhanças observadas, diferenças aparentes, datas e fontes. “Não encontramos documentos semelhantes” significa apenas que a busca não encontrou evidência dentro das fontes, campos e período cobertos. Não prova novidade nem assegura que não exista anterioridade.

No Brasil, os requisitos legais incluem novidade, atividade inventiva, aplicação industrial e matéria elegível, conforme a Lei da Propriedade Industrial. A análise depende das reivindicações, do estado da técnica e do exame oficial. Uma divulgação pública feita em qualquer país pode ser relevante para a novidade, mesmo quando a patente estrangeira não dá, por si só, exclusividade no Brasil. Direitos de patente são territoriais: uma patente concedida em outro país não produz automaticamente exclusividade brasileira; é necessário obter proteção no Brasil pelo caminho aplicável e receber concessão nacional.

A busca inicial pode mostrar padrões de decisões públicas anteriores, quando os dados permitirem relacionar os documentos e seus despachos. Esses padrões são contexto histórico, não uma previsão confiável do resultado de um novo pedido. O protótipo não deve exibir probabilidades de concessão. Uma eventual estimativa futura só poderá ser estudada após obter dados rotulados suficientes, medir cobertura e qualidade, testar em casos não usados na construção e explicar amostra, incerteza e método. Uma pontuação de similaridade não é probabilidade de concessão.

### Componentes em linguagem simples

- **Documentos e dados:** publicações, metadados e, quando disponíveis e permitidos, decisões e trechos relevantes.
- **Índice de busca:** estrutura que permite localizar documentos por palavras, números, nomes, classificações e conteúdo.
- **Busca híbrida:** combinação de busca por termos exatos e busca semântica. Isso é útil porque números, nomes e termos técnicos exigem correspondência literal, enquanto descrições de ideias podem usar vocabulário diferente.
- **Frontend TypeScript:** apresenta formulário, resultados, trechos, fontes, avisos e feedback.

## Arquitetura inicial recomendada:

- **Frontend:** TypeScript, mantendo a tecnologia já usada pelo site. Se ainda não houver aplicação, React é uma opção.
- **Backend:** Java com Spring Boot para API HTTP, validação, regras do produto e integração com os demais serviços.
- **Banco relacional:** PostgreSQL para metadados, usuários, consultas e estado do sistema.
- **Busca textual e filtros:** iniciar com PostgreSQL ou um mecanismo de busca dedicado, conforme volume e necessidade de ranking.
- **Busca semântica:** embeddings multilíngues e índice vetorial, por exemplo pgvector junto ao PostgreSQL. 
- **Arquivos e extração:** armazenamento organizado para documentos permitidos, com ferramentas para extrair PDF e OCR apenas quando necessário.
- **Observabilidade:** logs sem texto confidencial por padrão, métricas de latência, erros, custo de recursos e versão dos dados/modelos.
- **Implantação:** serviços isolados na VPS, HTTPS na borda, backups e atualização controlada.
  
## Dados brasileiros e contexto internacional:

### Brasil como ponto de partida

A fonte prioritária é o conjunto de informações públicas do INPI e os acessos oficiais às bases de patentes indicados pelo próprio instituto. Antes de construir um importador, a equipe deve identificar quais campos estão disponíveis, quais formatos e condições de acesso se aplicam, frequência de atualização e se o uso pretendido é permitido. Nem todo registro terá texto pesquisável de qualidade; alguns documentos podem precisar de OCR e checagem.

O INPI é a principal fonte oficial para o processamento de pedidos e concessões brasileiras, mas não é a única base que pode conter informação sobre documentos relacionados ao Brasil. Fontes internacionais podem ajudar a localizar publicações e famílias, sem substituir a verificação do processo nacional no INPI. O escopo precisa diferenciar “publicado em uma base global” de “depositado, em fase nacional ou concedido no Brasil”.

### Plano internacional gradual

Incluir o mundo inteiro no primeiro ciclo não é viável. As bases têm formatos, cobertura, idiomas, políticas de acesso e atualizações diferentes. A equipe pode, no protótipo, escolher entre: (a) mostrar links para busca externa em fontes oficiais; ou (b) experimentar um único conector limitado, como uma consulta à API EPO OPS, respeitando cadastro, limites e termos. PATENTSCOPE não deve ser tratado como fonte para robôs ou download em massa; suas orientações proíbem automação desse tipo.

Para a entrega até 23 de dezembro de 2026, a recomendação é manter a indexação e a demonstração concentradas no Brasil e fazer, no máximo, uma prova de conceito de consulta internacional. Uma cobertura internacional real pode ser planejada como etapa posterior, país por país e com fonte e política de dados definidas.

## Privacidade, segurança e confiança?


- Não registrar o texto integral da invenção em logs técnicos.
- Definir prazo e processo de exclusão de consultas armazenadas.
- Proteger o site com HTTPS, validação, limitação de requisições e controle de acesso.
- Mostrar fontes, datas de acesso, filtros e limitações da busca.
- Tratar o sistema como ferramenta educacional e informativa; encaminhar questões jurídicas específicas a profissional qualificado.

## Integração com o site:

O backend Java deve oferecer endpoints claros que o frontend TypeScript possa chamar. Um contrato inicial pode incluir:

- POST /api/search: recebe a descrição e filtros, retorna documentos e evidências com identificadores e URLs de origem.
- POST /api/explain: recebe uma consulta e uma lista de evidências selecionadas, retorna uma explicação com referências por documento.
- GET /api/patents/{id}: retorna metadados e links disponíveis para um documento.
- POST /api/feedback: registra avaliação simples sobre relevância, fonte ou explicação, sem guardar a descrição original por padrão.
- GET /api/health: informa disponibilidade dos componentes sem expor detalhes internos.

## Como avaliar o protótipo?

A demonstração deve ser julgada por critérios observáveis:

- Uma consulta retorna documentos com identificadores e fontes oficiais ou claramente identificadas.
- O usuário consegue entender por que cada documento apareceu.
- O protótipo não afirma que uma invenção é elegível ou que será concedida.
- A equipe registra falsos positivos, documentos relevantes que não apareceram, latência e recursos consumidos.
- O comportamento foi experimentado com consultas de teste documentadas.
- Os dados e modelos usados têm origem e condições de uso registradas.

## Perguntas para serem respondidas antes de começar:

2. Qual é a estrutura e tecnologia atual do site?
3. Qual será a primeira área técnica piloto para as buscas de demonstração?
4. Quais dados e interfaces do INPI podem ser usados no formato pretendido, e com que frequência serão atualizados?
5. Qual é a licença e a atribuição necessárias para cada conjunto de dados, modelo e software?
6. O protótipo terá login? Como evitar armazenar ideias sensíveis desnecessariamente?
7. Quais consultas de teste representam resultados úteis, resultados ruins e casos sem evidência?
8. A amostra de decisões públicas do INPI permite relacionar documentos, despachos e resultados sem ambiguidades?
9. O prazo permite apenas demonstração local para a equipe ou também uma disponibilização pública? Uma exposição pública exige revisar segurança, privacidade, capacidade e custos.

## Fontes oficiais e técnicas para consulta

- Lei nº 9.279/1996 — Lei da Propriedade Industrial, Portal da Legislação, Planalto: https://www.planalto.gov.br/ccivil_03/leis/l9279.htm
- INPI — Você quer patentear só no Brasil ou em outros países também?: https://www.gov.br/inpi/pt-br/servicos/patentes/tutorial-de-deposito/voce-quer-patentear-so-no-brasil-ou-em-outros-paises-tambem-1
- INPI — Acessos às bases de pesquisas e busca terceirizada: https://www.gov.br/inpi/pt-br/servicos/patentes/busca-terceirizada/acessos-as-bases-de-pesquisas/
- INPI — Bases de patentes online: https://www.gov.br/inpi/pt-br/assuntos/informacao/bases-de-patentes-online
- EPO — Open Patent Services (OPS), API e condições de acesso: https://www.epo.org/en/searching-for-patents/data/web-services/ops
- WIPO — PATENTSCOPE FAQs e limites de automação: https://www.wipo.int/en/web/patentscope/faqs_patentscope
- Spring Boot — documentação oficial: https://docs.spring.io/spring-boot/index.html
- PostgreSQL — documentação oficial: https://www.postgresql.org/docs/
- pgvector — extensão vetorial para PostgreSQL: https://github.com/pgvector/pgvector
