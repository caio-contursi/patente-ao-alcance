CREATE TABLE IF NOT EXISTS extracao (
    id INTEGER PRIMARY KEY,
    consulta TEXT NOT NULL,
    executada_em TEXT NOT NULL,
    bytes_processados INTEGER,
    linhas INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS documento (
    publicacao TEXT PRIMARY KEY,
    pedido TEXT,
    familia TEXT NOT NULL,
    tipo TEXT,
    titulo TEXT,
    resumo TEXT,
    data_deposito TEXT,
    data_publicacao TEXT,
    data_concessao TEXT,
    ipc_principal TEXT,
    extracao_id INTEGER NOT NULL REFERENCES extracao (id)
);

CREATE TABLE IF NOT EXISTS pessoa (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    pais TEXT NOT NULL DEFAULT '',
    UNIQUE (nome, pais)
);

CREATE TABLE IF NOT EXISTS documento_pessoa (
    publicacao TEXT NOT NULL REFERENCES documento (publicacao),
    pessoa_id INTEGER NOT NULL REFERENCES pessoa (id),
    papel TEXT NOT NULL CHECK (papel IN ('titular', 'inventor')),
    PRIMARY KEY (publicacao, pessoa_id, papel)
);

CREATE TABLE IF NOT EXISTS classificacao (
    publicacao TEXT NOT NULL REFERENCES documento (publicacao),
    codigo TEXT NOT NULL,
    principal INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (publicacao, codigo)
);

CREATE VIEW IF NOT EXISTS panorama_ano AS
SELECT ano, COUNT(*) AS familias
FROM (
    SELECT familia, substr(MIN(data_deposito), 1, 4) AS ano
    FROM documento
    WHERE data_deposito IS NOT NULL
    GROUP BY familia
)
GROUP BY ano
ORDER BY ano;

CREATE VIEW IF NOT EXISTS panorama_secao_ipc AS
SELECT substr(c.codigo, 1, 1) AS secao, COUNT(DISTINCT d.familia) AS familias
FROM classificacao c
JOIN documento d ON d.publicacao = c.publicacao
GROUP BY secao
ORDER BY familias DESC;

CREATE VIEW IF NOT EXISTS panorama_titulares AS
SELECT p.nome, COUNT(DISTINCT d.familia) AS familias
FROM pessoa p
JOIN documento_pessoa dp ON dp.pessoa_id = p.id AND dp.papel = 'titular'
JOIN documento d ON d.publicacao = dp.publicacao
GROUP BY p.id
ORDER BY familias DESC, p.nome
LIMIT 10;
