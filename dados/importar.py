import argparse
import csv
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

PASTA = Path(__file__).parent


def lista(valor):
    return json.loads(valor) if valor else []


def pessoa_id(con, nome, pais):
    pais = pais or ""
    con.execute("INSERT OR IGNORE INTO pessoa (nome, pais) VALUES (?, ?)", (nome, pais))
    return con.execute("SELECT id FROM pessoa WHERE nome = ? AND pais = ?", (nome, pais)).fetchone()[0]


def importar(con, linhas, extracao_id):
    for linha in linhas:
        publicacao = linha["publicacao"]
        ipc = lista(linha["ipc"])
        principal = next((c["codigo"] for c in ipc if c.get("principal")), None)
        con.execute("DELETE FROM classificacao WHERE publicacao = ?", (publicacao,))
        con.execute("DELETE FROM documento_pessoa WHERE publicacao = ?", (publicacao,))
        con.execute(
            "INSERT OR REPLACE INTO documento VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                publicacao,
                linha["pedido"] or None,
                linha["familia"],
                linha["tipo"] or None,
                linha["titulo"] or None,
                linha["resumo"] or None,
                linha["data_deposito"] or None,
                linha["data_publicacao"] or None,
                linha["data_concessao"] or None,
                principal,
                extracao_id,
            ),
        )
        for papel, coluna in (("titular", "titulares"), ("inventor", "inventores")):
            for pessoa in lista(linha[coluna]):
                if pessoa.get("nome"):
                    con.execute(
                        "INSERT OR IGNORE INTO documento_pessoa VALUES (?, ?, ?)",
                        (publicacao, pessoa_id(con, pessoa["nome"], pessoa.get("pais")), papel),
                    )
        for codigo in {c["codigo"]: c for c in ipc}.values():
            con.execute(
                "INSERT INTO classificacao VALUES (?, ?, ?)",
                (publicacao, codigo["codigo"], 1 if codigo.get("principal") else 0),
            )


def main():
    parser = argparse.ArgumentParser(description="Importa no SQLite o CSV exportado do BigQuery.")
    parser.add_argument("arquivo", type=Path)
    parser.add_argument("--consulta", required=True)
    parser.add_argument("--bytes", type=int)
    parser.add_argument("--banco", type=Path, default=PASTA / "patentes.db")
    args = parser.parse_args()

    csv.field_size_limit(10**7)
    with args.arquivo.open(encoding="utf-8", newline="") as arquivo:
        linhas = list(csv.DictReader(arquivo))

    con = sqlite3.connect(args.banco)
    con.executescript((PASTA / "esquema.sql").read_text(encoding="utf-8"))
    with con:
        extracao = con.execute(
            "INSERT INTO extracao (consulta, executada_em, bytes_processados, linhas) VALUES (?, ?, ?, ?)",
            (args.consulta, datetime.now(timezone.utc).isoformat(timespec="seconds"), args.bytes, len(linhas)),
        )
        importar(con, linhas, extracao.lastrowid)
    familias = con.execute("SELECT COUNT(DISTINCT familia) FROM documento").fetchone()[0]
    con.close()
    print(f"{len(linhas)} documentos importados, {familias} famílias na base")


if __name__ == "__main__":
    main()
