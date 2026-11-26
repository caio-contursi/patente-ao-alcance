SELECT
  p.publication_number AS publicacao,
  p.application_number AS pedido,
  p.family_id AS familia,
  p.kind_code AS tipo,
  COALESCE(
    (SELECT t.text FROM UNNEST(p.title_localized) t WHERE t.language = 'pt' LIMIT 1),
    (SELECT t.text FROM UNNEST(p.title_localized) t LIMIT 1)
  ) AS titulo,
  COALESCE(
    (SELECT a.text FROM UNNEST(p.abstract_localized) a WHERE a.language = 'pt' LIMIT 1),
    (SELECT a.text FROM UNNEST(p.abstract_localized) a LIMIT 1)
  ) AS resumo,
  SAFE.PARSE_DATE('%Y%m%d', CAST(NULLIF(p.filing_date, 0) AS STRING)) AS data_deposito,
  SAFE.PARSE_DATE('%Y%m%d', CAST(NULLIF(p.publication_date, 0) AS STRING)) AS data_publicacao,
  SAFE.PARSE_DATE('%Y%m%d', CAST(NULLIF(p.grant_date, 0) AS STRING)) AS data_concessao,
  TO_JSON_STRING(ARRAY(SELECT AS STRUCT x.name AS nome, x.country_code AS pais FROM UNNEST(p.assignee_harmonized) x)) AS titulares,
  TO_JSON_STRING(ARRAY(SELECT AS STRUCT x.name AS nome, x.country_code AS pais FROM UNNEST(p.inventor_harmonized) x)) AS inventores,
  TO_JSON_STRING(ARRAY(SELECT AS STRUCT c.code AS codigo, c.first AS principal FROM UNNEST(p.ipc) c)) AS ipc
FROM `patents-public-data.patents.publications` p
WHERE p.country_code = 'BR'
  AND EXISTS (
    SELECT 1 FROM UNNEST(p.assignee_harmonized) x
    WHERE REGEXP_CONTAINS(UPPER(x.name), r'UNIRIO|UNIV(ERSIDADE)? FEDERAL DO ESTADO DO RIO DE JANEIRO')
  )
ORDER BY data_deposito
