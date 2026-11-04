package br.edu.patenteaoalcance.patent;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Corpus intencionalmente sintético para desenhar e demonstrar a interface.
 * Não representa publicação, pedido ou decisão oficial do INPI.
 */
@Repository
@Profile("!production")
public class DemoPatentRepository implements PatentRepository {
    private final List<PatentDocument> documents = List.of(
            new PatentDocument(
                    "demo-water-01",
                    "Exemplo sintético de captação e filtragem de água pluvial",
                    "Registro fictício criado apenas para demonstrar busca, evidências e comparação no protótipo.",
                    "Sem número oficial — exemplo demonstrativo",
                    LocalDate.of(2024, 8, 1),
                    "Corpus fictício do protótipo",
                    "Amostra demonstrativa",
                    null,
                    "DEMO",
                    List.of("Exemplo fictício: reservatório, filtragem inicial e reaproveitamento de água da chuva."),
                    List.of("captação de água da chuva", "filtragem", "reservatório")
            ),
            new PatentDocument(
                    "demo-water-02",
                    "Exemplo sintético de monitoramento de nível em reservatório",
                    "Registro fictício para testar consultas que combinem armazenamento, sensores e alertas.",
                    "Sem número oficial — exemplo demonstrativo",
                    LocalDate.of(2023, 3, 1),
                    "Corpus fictício do protótipo",
                    "Amostra demonstrativa",
                    null,
                    "DEMO",
                    List.of("Exemplo fictício: sensor de nível e aviso de necessidade de manutenção do reservatório."),
                    List.of("sensor", "nível", "reservatório", "monitoramento")
            ),
            new PatentDocument(
                    "demo-garden-01",
                    "Exemplo sintético de irrigação orientada por umidade do solo",
                    "Registro inventado para validar consultas de tecnologias agrícolas no ambiente demonstrativo.",
                    "Sem número oficial — exemplo demonstrativo",
                    LocalDate.of(2022, 11, 1),
                    "Corpus fictício do protótipo",
                    "Amostra demonstrativa",
                    null,
                    "DEMO",
                    List.of("Exemplo fictício: sensor de umidade aciona o controle de irrigação de uma área de cultivo."),
                    List.of("sensor", "umidade do solo", "irrigação", "controle")
            )
    );

    @Override
    public List<PatentDocument> findAll() {
        return documents;
    }

    @Override
    public Optional<PatentDocument> findById(String id) {
        return documents.stream().filter(document -> document.id().equals(id)).findFirst();
    }
}
