# Executar o portal Patente ao Alcance

A interface atual reúne oito wireframes navegáveis dos módulos 1, 2 e 3. O código está em `frontend/index.html`, `frontend/app.js` e `frontend/styles.css` e é servido diretamente pelo Nginx. Não há instalação de pacotes ou compilação.

## Executar com Docker

Com o Docker Desktop em execução, abra um terminal na raiz do repositório:

```powershell
docker compose up -d --build
```

Abra [http://localhost:5181](http://localhost:5181). A porta fica disponível apenas neste computador.

Para conferir o serviço e encerrá-lo:

```powershell
docker compose ps
docker compose down
```

Depois de alterar o código, execute novamente `docker compose up -d --build` para atualizar a imagem. O projeto usa somente o serviço `web`; não requer API, banco de dados ou Ollama.

## Executar sem Docker

Como alternativa, com Python instalado, execute na raiz:

```powershell
python -m http.server 5181 --bind 127.0.0.1 --directory frontend
```

Abra o mesmo endereço. Encerre esse servidor antes de usar a mesma porta no Docker.

## O que pode ser apresentado

- Início do portal e caminhos de navegação.
- Preparação da equipe: escuta, inventário e decisões para o jogo.
- Jogo demonstrativo de propriedade intelectual com três situações e referências.
- Busca guiada: montagem de termos e abertura das bases externas.
- Panorama com três gráficos de valores sintéticos.
- Materiais, mapa de PI, glossário e estrutura do guia de depósito.
- Primeira oficina: inscrição, diagnóstico, feedback e atendimento simulados.
- Vitrine UNIRIO aguardando validação do NIT.

Os controles da apresentação alternam a visualização entre computador e celular e mostram ou ocultam as notas para discussão. O botão de impressão reúne as oito telas iniciais em A4 paisagem. A [versão PDF dos wireframes](docs/wireframes-m1-m3.pdf) também está no repositório.

A busca ocorre na base externa escolhida pela pessoa. Não há coleta automática de patentes. Os gráficos e as situações do jogo são demonstrativos. Os formulários não enviam dados: os rascunhos ficam somente na memória da página e desaparecem ao recarregá-la. O site usa Google Fonts quando disponível e fontes do sistema como alternativa.

## Referência do recorte

Os wireframes seguem o [planejamento no commit 907f240](https://github.com/caio-contursi/patente-ao-alcance/blob/907f24080b9fc1b606cc11ac022e24ddfa0582dd/docs/planejamento-do-projeto.md). Foi adotada a descrição detalhada do módulo 2, intitulada **Jogo**; a tabela resumida desse mesmo documento ainda usa o título **Busca e dados**. Essa divergência deve ser alinhada com a orientação.

## Organização

- `frontend/`: todos os arquivos usados pela interface.
- `Dockerfile.web`, `compose.yaml` e `docker/nginx.conf`: execução local com Docker.
- `docs/`: planejamento, visão do projeto, inventário e PDF para apresentação.
