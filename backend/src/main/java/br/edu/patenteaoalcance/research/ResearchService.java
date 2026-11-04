package br.edu.patenteaoalcance.research;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;

@Service
public class ResearchService {
    private static final Pattern TOKEN = Pattern.compile("[a-z0-9]{3,}");
    private static final Set<String> STOP = Set.of("uma", "uns", "das", "dos", "para", "com", "por",
            "que", "qual", "quais", "como", "esta", "esse", "isso", "sobre", "entre", "sao", "tem",
            "pode", "cada", "minha", "quero", "busque", "busca", "procure", "existe", "exemplos",
            "compare", "mostre", "explique", "encontre", "patente", "patentes", "pedido", "pedidos",
            "sistema", "documentos", "brasil", "brasileiro", "brasileiros", "encontrados");
    private static final List<Set<String>> SYNONYMS = List.of(
            Set.of("captacao", "coleta", "captar", "captador", "coletar"),
            Set.of("pluvial", "chuva", "chuvas"),
            Set.of("reservatorio", "cisterna", "armazenamento", "armazenar"),
            Set.of("filtrar", "filtragem", "filtracao", "filtro"),
            Set.of("sensor", "sensores"),
            Set.of("depositar", "deposito"),
            Set.of("anterioridade", "anterioridades"));
    private static final String SCOPE = "Amostra local de publicações da RPI sobre captação de água e material educativo do INPI. "
            + "A busca cobre apenas os registros listados, sem consulta à situação atual dos pedidos.";

    private final List<Entry> corpus;
    private final LocalResearchModel model;

    public ResearchService(LocalResearchModel model, ObjectMapper json,
                           @Value("classpath:research/sources.json") Resource sourceFile) throws IOException {
        this.model = model;
        try (var input = sourceFile.getInputStream()) {
            corpus = List.copyOf(json.readValue(input, new TypeReference<List<Entry>>() {}));
        }
    }

    Reply answer(String question, List<String> previousQuestions) {
        List<String> history = previousQuestions == null ? List.of() : previousQuestions;
        Set<String> currentTerms = terms(question);
        List<Ranked> ranked = rank(currentTerms);
        boolean useHistory = ranked.isEmpty() && !history.isEmpty()
                && (currentTerms.isEmpty() || normalize(question).matches(
                        ".*\\b(esse|essa|esses|essas|deles|delas|primeiro|segundo|anterior|desses|dessas)\\b.*"));
        if (useHistory) {
            currentTerms = terms(String.join(" ", history));
            ranked = rank(currentTerms);
        }
        List<Source> sources = new ArrayList<>();
        for (Ranked match : ranked) {
            Entry entry = match.entry();
            sources.add(new Source(sources.size() + 1, entry.title(), entry.reference(),
                    entry.url(), entry.summary(), match.terms()));
        }

        if (sources.isEmpty()) {
            return new Reply("NO_EVIDENCE", "Não encontrei evidências nesta amostra para responder. "
                    + "Tente um termo técnico mais específico ou consulte a busca oficial do INPI.",
                    List.of(), List.of(), List.copyOf(currentTerms), SCOPE);
        }
        var generated = model.summarize(question, history, sources);
        if (generated.isPresent()) {
            return new Reply("LOCAL_AI", "", generated.get(), sources, List.copyOf(currentTerms), SCOPE);
        }
        var extracts = sources.stream().map(source -> new Statement(source.summary(), source.number())).toList();
        return new Reply("EXCERPTS", "A síntese por IA está indisponível ou não retornou citações utilizáveis. "
                + "Confira os resumos das fontes recuperadas.", extracts, sources, List.copyOf(currentTerms), SCOPE);
    }

    private List<Ranked> rank(Set<String> query) {
        return corpus.stream().map(entry -> {
            Set<String> indexed = terms(entry.title() + " " + entry.summary() + " " + String.join(" ", entry.keywords()));
            List<String> matches = query.stream().filter(term -> indexed.contains(term) ||
                    SYNONYMS.stream().anyMatch(group -> group.contains(term) && !Collections.disjoint(group, indexed))).toList();
            return new Ranked(entry, matches);
        }).filter(hit -> !hit.terms().isEmpty())
                .sorted(Comparator.comparingInt((Ranked hit) -> hit.terms().size()).reversed())
                .limit(4).toList();
    }

    private static Set<String> terms(String text) {
        Set<String> result = new LinkedHashSet<>();
        TOKEN.matcher(normalize(text)).results().map(java.util.regex.MatchResult::group)
                .filter(term -> !STOP.contains(term)).limit(40).forEach(result::add);
        return result;
    }

    private static String normalize(String text) {
        return Normalizer.normalize(text, Normalizer.Form.NFD).replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT);
    }

    private record Entry(String title, String reference, String url, String summary, List<String> keywords) { }
    private record Ranked(Entry entry, List<String> terms) { }
    public record Source(int number, String title, String reference, String url, String summary, List<String> matchedTerms) { }
    public record Statement(String text, int source) { }
    public record Reply(String mode, String message, List<Statement> statements, List<Source> sources,
                        List<String> searchTerms, String scope) { }
}
