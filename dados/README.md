# Base de dados

Base local das patentes usadas no panorama e na vitrine. Os dados vêm do Google Patents Public Datasets, tabela `patents-public-data.patents.publications` (IFI CLAIMS Patent Services e Google, licença CC BY 4.0), consultada no BigQuery, e ficam em SQLite.

## Arquivos

- `esquema.sql`: tabelas `documento`, `pessoa` (titulares e inventores), `documento_pessoa`, `classificacao` e `extracao`, e as visões do panorama.
- `consultas/recorte_agua_chuva.sql`: documentos brasileiros do caso piloto, pela classificação E03B 3 ou por chuva, pluvial ou cisterna no título.
- `consultas/unirio.sql`: documentos brasileiros com a UNIRIO entre os titulares.
- `importar.py`: carrega no SQLite o CSV exportado do BigQuery e registra a extração.

## Como gerar

Antes de rodar, estimar quanto a consulta vai ler:

```powershell
bq query --use_legacy_sql=false --dry_run < dados/consultas/unirio.sql
```

O BigQuery cobra pelos bytes lidos. O primeiro 1 TiB por mês é gratuito e depois o preço é US$ 6,25 por TiB, segundo a página de preços do Google Cloud conferida em 26/11/2026. O valor do dry run vai para a planilha antes da execução.

Depois, rodar a consulta no console do BigQuery, salvar o resultado como CSV e importar:

```powershell
python dados/importar.py resultado.csv --consulta unirio --bytes 123456789
```

O arquivo `dados/patentes.db` é gerado pelo script e fica fora do repositório.

## Regra de contagem

O panorama conta famílias (`family_id`), não documentos. O mesmo invento publicado como pedido e como patente concedida, ou em mais de um país, conta uma vez. As visões `panorama_ano`, `panorama_secao_ipc` e `panorama_titulares` seguem essa regra, e o ano é o do depósito mais antigo da família.

## Limites

A tabela traz metadados de publicações do mundo todo, mas reivindicações e relatório descritivo só existem para documentos dos EUA. O nome da UNIRIO pode aparecer de formas diferentes entre os titulares, então os nomes retornados na primeira execução precisam ser conferidos e o filtro ajustado. A situação atual de cada pedido deve ser conferida no INPI.
