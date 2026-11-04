package br.edu.patenteaoalcance.patent;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatentExplanationService {
    private final PatentSearchService searchService;

    public PatentExplanationService(PatentSearchService searchService) {
        this.searchService = searchService;
    }

    public PatentExplanationResponse explain(PatentExplanationRequest request) {
        List<PatentDocument> documents = request.documentIds().stream().map(searchService::getById).toList();
        String titles = documents.stream().map(PatentDocument::title).reduce((a, b) -> a + "; " + b).orElse("");
        String evidence = documents.stream()
                .flatMap(document -> document.evidenceSnippets().stream().map(snippet -> "[" + document.id() + "] " + snippet))
                .reduce((a, b) -> a + " " + b).orElse("");
        String explanation = "Nesta demonstração, os registros selecionados mencionam temas relacionados à sua descrição: "
                + titles + ". Trechos disponíveis: " + evidence;

        return new PatentExplanationResponse("DEMO", explanation, documents.stream().map(PatentDocument::id).toList(),
                "Explicação de demonstração baseada em registros sintéticos. Nenhum modelo de IA está conectado ainda; "
                        + "isso não é análise de patenteabilidade nem previsão de concessão.");
    }
}
