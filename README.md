# Patente ao Alcance

Projeto de extensão para democratizar o acesso à informação sobre patentes e apoiar a pesquisa de tecnologias, começando por documentos relacionados ao Brasil.

A proposta é criar um assistente educativo de consulta e comparação. A pessoa descreve uma solução técnica; o sistema procura documentos próximos, mostra trechos e fontes oficiais e ajuda a compreender o que foi encontrado. O resultado informa padrões e evidências disponíveis, sem prometer que uma invenção é patenteável ou que um pedido será concedido.

## Documentos do projeto

- [Planejamento de 150 horas por integrante](docs/planejamento-do-projeto.md) — seis módulos, cronograma, tarefas, entregas, responsabilidades e modelo de registro.
- [Visão do produto e arquitetura inicial](docs/visao-e-arquitetura-inicial.md) — objetivos, escopo do protótipo, fluxo do site, explicação da IA local, privacidade e evolução internacional.
- [Guia para executar a estrutura inicial](README_DEV.md) — requisitos e comandos para abrir a interface e a API localmente.

## Objetivos

- Facilitar a busca e a leitura de documentos de patente.
- Comparar descrições técnicas com documentos próximos, mostrando as evidências usadas.
- Explicar conceitos de propriedade intelectual em linguagem acessível e com links para fontes oficiais.
- Aprender com documentos e decisões públicas do INPI sem tratar padrões históricos como garantia de resultado.
- Produzir materiais educativos, oficinas, exercícios de busca, experimentos e apresentações em formato de pitch ou hackathon.

## Escopo inicial

O primeiro protótipo prioriza documentos de patentes brasileiros. Deve oferecer busca por palavras e descrição técnica, filtros disponíveis, resultados com metadados e links oficiais, comparação explicável e respostas apoiadas nos trechos recuperados.

Uma busca sem resultados não prova novidade nem ausência de anterioridade. A avaliação oficial depende do pedido, das reivindicações, do estado da técnica e do exame competente. A ferramenta não substitui orientação profissional.

A cobertura internacional será gradual. Para o primeiro ciclo, a equipe pode fornecer links para bases oficiais ou demonstrar uma consulta limitada a uma única fonte, conforme acesso e condições de uso. Indexar patentes do mundo todo não faz parte do escopo inicial.

## Como a IA está planejada

A equipe não precisa treinar um modelo de linguagem grande do zero. A proposta é combinar modelos abertos já treinados, executados localmente na VPS disponível, com uma busca de documentos e uma base de evidências do projeto.

O fluxo planejado é:

1. Importar documentos de fontes permitidas e organizar texto e metadados.
2. Buscar por termos e por proximidade de significado.
3. Selecionar documentos e trechos que sustentem a resposta.
4. Usar um modelo de linguagem local para explicar os resultados com referências.
5. Exibir documentos, evidências, limitações e links no site.

O backend será majoritariamente Java, com Spring Boot como opção para a API. O frontend será TypeScript. PostgreSQL e pgvector são opções iniciais para dados e busca semântica; Ollama pode ser avaliado para executar modelos localmente. As escolhas dependem dos recursos reais da VPS, das licenças e de testes de qualidade e velocidade.

A execução local evita cobrança por token de uma API de IA externa, mas ainda exige a VPS, armazenamento, backups, atualizações, segurança e manutenção. O modelo deve ficar acessível ao backend, sem exposição direta à internet.

## Experiência e funcionalidades

A pessoa informa o problema técnico, a solução e seus componentes principais. O site apresenta resultados e evidências antes da explicação automatizada. Cada documento deve ter identificador, metadados disponíveis, origem e link verificável.

Depois do protótipo, podem ser avaliados busca guiada, comparação lado a lado de reivindicações, glossário e linha do tempo de pedidos, relatórios exportáveis, materiais de oficina, feedback e integrações internacionais adicionais.

Como descrições de invenções podem ser confidenciais, o protótipo deve alertar sobre isso, evitar registrar o texto integral em logs e não usar consultas para treinamento sem consentimento e finalidade documentada.

## Plano de trabalho

A equipe é formada por Pedro Bartkevihi, Caio Contursi e Enzo Paulino. O planejamento atual prevê 150 horas por integrante, 20 horas semanais por pessoa, 450 horas de equipe e conclusão em 23 de dezembro de 2026.

O trabalho está organizado em seis módulos iguais de 25 horas por pessoa:

1. Escuta, requisitos e preparação.
2. Fontes, dados e busca textual.
3. API Java, interface TypeScript e primeira integração.
4. Comparação, evidências e materiais de oficina.
5. Busca semântica, modelo local e avaliação.
6. Revisão, documentação, demonstração e pitch.

As datas, entregas e tarefas detalhadas ficam no [documento de planejamento](docs/planejamento-do-projeto.md).

## Repositório e privacidade

Este repositório é privado. O acesso de colaboradores é administrado pelo proprietário no GitHub.
