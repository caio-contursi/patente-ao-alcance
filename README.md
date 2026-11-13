# Patente ao Alcance

Projeto de extensão para democratizar o acesso à informação sobre patentes e apoiar a pesquisa de tecnologias com foco, à priori, em documentos depositados no território nacional.

## Documentos do projeto

- [Planejamento de 150 horas por integrante](docs/planejamento-do-projeto.md) — seis módulos, cronograma, tarefas, entregas, responsabilidades e modelo de registro.
- [Visão do produto e arquitetura inicial](docs/visao-e-arquitetura-inicial.md) — objetivos, escopo do protótipo, fluxo do site, explicação da IA local, privacidade e evolução internacional.
- [Guia para executar a estrutura inicial](frontend/exec-guide.md) — requisitos e comandos para abrir a interface e a API localmente.

## Objetivos principais:

- Publicar um portal com busca guiada e uma base de dados das patentes no Brasil a partir do Google Patents Public Datasets., dando ênfase às patentes da UNIRIO e acrescentando texto didático em linguagem simples para as patentes da universidade.
- Produzir conteúdos em vídeo de orientação online, com espaço para dúvidas e questionamentos.
- Produzir um guia do depósito de patente no INPI em linguagem simples.
- Inventariar e adaptar os gibis e jogos impressos existentes e aplicá-los em oficinas, ensinando a distinguir patente, marca, direito autoral, desenho industrial, segredo de negócio e conhecimento público, e a escolher o instrumento de proteção adequado.
- Explicar conceitos técnicos de propriedade intelectual em linguagem acessível e com links para fontes oficiais.
- Produzir materiais educativos, oficinas, exercícios de busca, experimentos e apresentações em formato de pitch ou hackathon.
- Futuramente implementar assistente de IA integrado e treinado para busca de patentes.
- Ensinar estratégia de busca (palavras-chave, sinônimos, classificação IPC/CPC, titular, inventor, citações e famílias) e comparar as bases INPI, PATENTSCOPE, Espacenet e Google Patents, usando o Derwent apenas quando houver licença institucional.
- Ensinar a ler documentos de patente (família, prioridade, reivindicações e estado jurídico) e a usar IA de forma responsável, com registro de fonte e verificação humana.
- Ao final das 150 horas, avaliar o projeto com os participantes, registrar os resultados num relatório final e deixar um kit replicável para universidades, incubadoras, empresas juniores e pequenas empresas

## Objetivos futuros:

1. Realizar um laboratório de engenharia reversa educacional e segura, a partir de uma tecnologia escolhida, produzindo uma matriz de reivindicações e um protótipo conceitual ou de bancada.
2. Criar o novo gibi Da patente ao protótipo, integrando propriedade industrial, busca, engenharia reversa e pitch.
   
## Escopo inicial

O primeiro protótipo prioriza documentos de patentes brasileiros. Deve oferecer um portal que intermediará relações entre nosso grupo e pequenas empresas e negócio por meio da clínica de busca por palavras e descrição técnica, filtros disponíveis, resultados com metadados e links oficiais, comparação explicável e respostas apoiadas nos trechos recuperados.

Uma busca sem resultados não prova novidade nem ausência de anterioridade. A avaliação oficial depende do pedido, das reivindicações, do estado da técnica e do exame competente. A ferramenta não substitui orientação profissional.

A cobertura internacional será gradual. Para o primeiro ciclo, a equipe pode fornecer links para bases oficiais ou demonstrar uma consulta limitada a uma única fonte, conforme acesso e condições de uso. Indexar patentes do mundo todo não faz parte do escopo inicial.

O backend será majoritariamente Java, com Spring Boot como opção para a API. O frontend será TypeScript. PostgreSQL e pgvector são opções iniciais para dados e busca semântica; 
Ollama poderá ser avaliado para executar modelos localmente. As escolhas dependem dos recursos reais da VPS, das licenças e de testes de qualidade e velocidade. (Futuramente)

## Experiência e funcionalidades

A pessoa informa o problema técnico, a solução e seus componentes principais. O site apresenta resultados e evidências antes da explicação automatizada. Cada documento deve ter identificador, metadados disponíveis, origem e link verificável.

Depois do protótipo, podem ser avaliados busca guiada, comparação lado a lado de reivindicações, glossário e linha do tempo de pedidos, relatórios exportáveis, materiais de oficina, feedback e integrações internacionais adicionais.

Como descrições de invenções podem ser confidenciais, o protótipo deve alertar sobre isso, evitar registrar o texto integral em logs e não usar consultas para treinamento sem consentimento e finalidade documentada.

## Plano de trabalho

A equipe é formada por Pedro Bartkevihi, Caio Contursi e Enzo Paulino. O planejamento atual prevê 150 horas por integrante, 20 horas semanais por pessoa.

O trabalho está organizado em seis módulos iguais de 25 horas por pessoa:

1. Escuta, requisitos e preparação.
2. Fontes, dados e busca textual.
3. API Java, interface TypeScript e primeira integração.
4. Comparação, evidências e materiais de oficina.
5. Busca semântica, modelo local e avaliação.
6. Revisão, documentação, demonstração e pitch.

As datas, entregas e tarefas detalhadas ficam no [documento de planejamento](docs/planejamento-do-projeto.md).
