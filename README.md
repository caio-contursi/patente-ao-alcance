# Patente ao Alcance

Projeto de extensão para democratizar o acesso à informação sobre patentes e apoiar a pesquisa de tecnologias com foco, à priori, em documentos depositados no território nacional.

## Interface atual: módulos 1, 2 e 3

Este repositório contém oito wireframes navegáveis para apresentar à orientadora: início, preparação da equipe, jogo de PI, busca guiada, panorama, materiais, primeira oficina e vitrine UNIRIO. O recorte segue as descrições detalhadas dos módulos **Estudo e preparação**, **Jogo** e **Portal e primeira oficina** do planejamento.

Com o Docker Desktop em execução, abra um terminal na raiz e execute:

```powershell
docker compose up -d --build
```

Acesse [http://localhost:5181](http://localhost:5181). O código completo está em `frontend/`, em HTML, CSS e JavaScript, servido pelo Nginx. Os controles permitem visualizar as telas no computador ou celular, consultar notas para discussão e imprimir as oito telas.

A busca guiada organiza termos e abre bases externas. Os gráficos usam valores sintéticos, o jogo contém situações fictícias e os formulários são demonstrações sem envio de dados. A vitrine aguarda fichas validadas pelo NIT. Esta versão funciona sem API, banco de dados ou IA.

## Documentos do projeto

- [Planejamento de 150 horas por integrante](docs/planejamento-do-projeto.md) — seis módulos, cronograma, tarefas, entregas, responsabilidades e modelo de registro.
- [Visão do produto e arquitetura inicial](docs/visao-e-arquitetura-inicial.md) — documento de referência sobre objetivos, arquitetura e evolução; não descreve integralmente a implementação atual.
- [Guia de execução do portal](exec-guide.md) — execução com Docker, organização do código e limites da demonstração.
- [Wireframes em PDF](docs/first-wireframes.pdf) — oito telas para leitura e apresentação.

## Objetivos do projeto completo

Os objetivos abaixo abrangem a evolução do projeto. A implementação disponível nesta etapa é o recorte M1–M3 descrito acima.

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

O primeiro protótipo prioriza a navegação do portal e a validação da linguagem com o público. A preparação reúne escuta, inventário, mapa de PI e decisões sobre o jogo. A busca orienta a composição de termos para uso nas bases externas. A oficina e o atendimento educativo são apresentados por simulações.

Uma busca sem resultados não prova novidade nem ausência de anterioridade. A avaliação oficial depende do pedido, das reivindicações, do estado da técnica e do exame competente. A ferramenta não substitui orientação profissional.

A cobertura internacional será gradual. Para o primeiro ciclo, a equipe pode fornecer links para bases oficiais ou demonstrar uma consulta limitada a uma única fonte, conforme acesso e condições de uso. Indexar patentes do mundo todo não faz parte do escopo inicial.

Uma futura integração de dados e serviços deverá ter escopo validado com a orientação antes da escolha de tecnologias. O código anterior de React, API Java e integração com Ollama foi substituído pela interface estática atual.

## Experiência e funcionalidades

A pessoa descreve o problema e os componentes, revisa os termos e escolhe uma base externa para continuar a pesquisa. Os materiais educativos e o jogo apresentam referências para consulta. O panorama mostra a estrutura prevista para gráficos, com todos os valores identificados como sintéticos.

Depois do protótipo, podem ser avaliados busca guiada, comparação lado a lado de reivindicações, glossário e linha do tempo de pedidos, relatórios exportáveis, materiais de oficina, feedback e integrações internacionais adicionais.

Como descrições de invenções podem ser confidenciais, o protótipo deve alertar sobre isso, evitar registrar o texto integral em logs e não usar consultas para treinamento sem consentimento e finalidade documentada.

## Plano de trabalho

A equipe é formada por Pedro Bartkevihi, Caio Contursi e Enzo Paulino. O planejamento atual prevê 150 horas por integrante, 25 horas semanais por pessoa.

O trabalho está organizado em seis módulos iguais de 25 horas por pessoa:

1. Estudo e preparação.
2. Jogo.
3. Portal e primeira oficina.
4. Análise e aplicação.
5. Experimento e novo gibi.
6. Pitch e encerramento.
