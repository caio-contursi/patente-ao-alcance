package br.edu.patenteaoalcance.patent;

import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PatentSearchService {
    private static final String DEMO_NOTICE = "Amostra demonstrativa: estes registros são fictícios e não são documentos oficiais. "
            + "A busca não avalia nem prevê a concessão de patente.";

    private final PatentRepository repository;

    public PatentSearchService(PatentRepository repository) {
        this.repository = repository;
    }

    public PatentSearchResponse search(PatentSearchRequest request) {
        Set<String> queryTerms = terms(request.description());

        List<PatentDocument> results = repository.findAll().stream()
                .filter(document -> request.applicant() == null || request.applicant().isBlank()
                        || normalize(document.applicant()).contains(normalize(request.applicant())))
                .map(document -> new RankedDocument(document, overlapCount(queryTerms, document)))
                .filter(ranked -> ranked.matchCount() > 0)
                .sorted(Comparator.comparingInt(RankedDocument::matchCount).reversed())
                .map(RankedDocument::document)
                .toList();

        return new PatentSearchResponse("DEMO", DEMO_NOTICE, results.size(), results);
    }

    public PatentDocument getById(String id) {
        return repository.findById(id).orElseThrow(() -> new PatentNotFoundException(id));
    }

    private int overlapCount(Set<String> queryTerms, PatentDocument document) {
        String searchable = normalize(document.title() + " " + document.summary() + " "
                + String.join(" ", document.matchingTerms()) + " " + String.join(" ", document.evidenceSnippets()));
        return (int) queryTerms.stream().filter(searchable::contains).count();
    }

    private Set<String> terms(String text) {
        return Arrays.stream(normalize(text).split("[^\\p{L}\\p{N}]+"))
                .filter(term -> term.length() >= 4)
                .collect(Collectors.toSet());
    }

    private String normalize(String text) {
        return Normalizer.normalize(text == null ? "" : text, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT);
    }

    private record RankedDocument(PatentDocument document, int matchCount) { }
}
