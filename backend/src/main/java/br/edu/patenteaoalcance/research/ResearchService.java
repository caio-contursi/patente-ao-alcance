package br.edu.patenteaoalcance.research;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

@Service
public class ResearchService {
    private static final Pattern TOKEN = Pattern.compile("[a-z0-9]{3,}");
    private static final Pattern RPI_REFERENCE = Pattern.compile("(PI \\d{7}-\\d [A-Z]\\d) · RPI (\\d+)");
    private static final Set<String> STOP = Set.of("uma", "uns", "das", "dos", "para", "com", "por",
            "que", "qual", "quais", "como", "esta", "esse", "isso", "sobre", "entre", "sao", "tem",
            "pode", "cada", "minha", "quero", "busque", "busca", "procure", "existe", "exemplos",
            "compare", "mostre", "explique", "encontre", "patente", "patentes", "pedido", "pedidos",
            "sistema", "documentos", "brasil", "brasileiro", "brasileiros", "encontrados");
    private static final List<Set<String>> SYNONYMS = List.of(
            Set.of("captacao", "coleta", "captar", "captador", "coletar", "harvesting", "collection"),
            Set.of("pluvial", "chuva", "chuvas", "rainwater", "rain"),
            Set.of("reservatorio", "cisterna", "armazenamento", "armazenar", "tank", "cistern", "storage"),
            Set.of("filtrar", "filtragem", "filtracao", "filtro", "filter", "filtration"),
            Set.of("sensor", "sensores"),
            Set.of("depositar", "deposito"),
            Set.of("anterioridade", "anterioridades"));
    private static final String SCOPE = "Amostra local de publicações da RPI sobre captação de água e material educativo do INPI. "
            + "A busca cobre apenas os registros listados, sem consulta à situação atual dos pedidos.";

    private final List<Entry> corpus;
    private final LocalResearchModel model;
    private final LocalSemanticSearch semanticSearch;

    public ResearchService(LocalResearchModel model, LocalSemanticSearch semanticSearch, ObjectMapper json,
                           @Value("classpath:research/sources.json") Resource sourceFile) throws IOException {
        this.model = model;
        this.semanticSearch = semanticSearch;
        try (var input = sourceFile.getInputStream()) {
            corpus = List.copyOf(json.readValue(input, new TypeReference<List<Entry>>() {}));
        }
    }

    Reply answer(String question, List<String> previousQuestions) {
        List<String> history = previousQuestions == null ? List.of() : previousQuestions;
        boolean useHistory = !history.isEmpty()
                && (terms(question).isEmpty() || normalize(question).matches(
                        ".*\\b(esse|essa|esses|essas|deles|delas|primeiro|segundo|anterior|desses|dessas)\\b.*"));
        String query = useHistory ? history.getLast() + "\n" + question : question;
        Set<String> currentTerms = terms(query);
        var expanded = SYNONYMS.stream().filter(group -> !Collections.disjoint(group, currentTerms))
                .flatMap(Set::stream).filter(term -> !currentTerms.contains(term)).distinct().sorted().toList();
        var features = Arrays.stream(query.split("[,;\\n]|\\s+(?:com|e|and|with)\\s+"))
                .map(String::strip).filter(feature -> !terms(feature).isEmpty()).distinct().limit(8).toList();
        var semantics = semanticSearch.scores(query, corpus.stream().map(ResearchService::evidenceText).toList());
        List<Ranked> ranked = rank(query, currentTerms, semantics.orElse(null));
        List<Source> sources = new ArrayList<>();
        Set<String> seen = new HashSet<>();
        for (Ranked match : ranked) {
            Entry entry = match.entry();
            if (!validCatalogReference(entry) || !seen.add(entry.reference())) continue;
            sources.add(new Source(sources.size() + 1, entry.title(), entry.reference(),
                    entry.url(), entry.summary(), match.terms(), entry.classifications()));
            if (sources.size() == 4) break;
        }
        var comparisons = features.stream().map(feature -> new Comparison(feature, sources.stream()
                .filter(source -> !matches(terms(feature), terms(source.title() + " " + source.summary())).isEmpty())
                .map(Source::number).toList())).toList();
        var audit = new Audit(expanded, comparisons, semantics.isPresent() ? "Híbrida" : "Textual",
                corpus.size(), ranked.size(), sources.size());

        if (sources.isEmpty()) {
            return new Reply("NO_EVIDENCE", "Não encontrei evidências nesta amostra para responder. "
                    + "Tente um termo técnico mais específico ou consulte a busca oficial do INPI.",
                    List.of(), List.of(), List.copyOf(currentTerms), SCOPE, audit);
        }
        var generated = model.summarize(question, history, sources);
        if (generated.isPresent()) {
            return new Reply("LOCAL_AI", "", generated.get(), sources, List.copyOf(currentTerms), SCOPE, audit);
        }
        var extracts = sources.stream().map(source -> new Statement(source.summary(), source.number())).toList();
        return new Reply("EXCERPTS", "A síntese por IA está indisponível ou não retornou citações utilizáveis. "
                + "Confira os resumos das fontes recuperadas.", extracts, sources, List.copyOf(currentTerms), SCOPE, audit);
    }

    private List<Ranked> rank(String query, Set<String> queryTerms, List<Double> semantics) {
        return IntStream.range(0, corpus.size()).mapToObj(i -> {
            Entry entry = corpus.get(i);
            Set<String> indexed = terms(evidenceText(entry) + " " + String.join(" ", entry.keywords()));
            List<String> overlap = matches(queryTerms, indexed);
            var reference = RPI_REFERENCE.matcher(entry.reference());
            boolean exact = reference.matches() && normalize(query).contains(normalize(reference.group(1)));
            double similarity = semantics == null ? 0 : semantics.get(i);
            double score = overlap.size() + (exact ? 30 : 0);
            if (similarity >= .58) score += similarity * 2;
            return new Ranked(entry, overlap, score);
        }).filter(hit -> hit.score() > 0)
                .sorted(Comparator.comparingDouble(Ranked::score).reversed()).toList();
    }

    private static boolean validCatalogReference(Entry entry) {
        URI url = URI.create(entry.url());
        if (!"https".equals(url.getScheme())) return false;
        if ("revistas.inpi.gov.br".equals(url.getHost())) {
            var reference = RPI_REFERENCE.matcher(entry.reference());
            return reference.matches() && url.getPath().equals("/pdf/PATENTES" + reference.group(2) + ".pdf");
        }
        return "www.gov.br".equals(url.getHost()) && url.getPath().startsWith("/inpi/")
                && entry.reference().startsWith("INPI · ");
    }

    private static String evidenceText(Entry entry) {
        return entry.title() + " " + entry.summary() + " " + String.join(" ", entry.classifications());
    }

    private static List<String> matches(Set<String> query, Set<String> indexed) {
        return query.stream().filter(term -> indexed.contains(term) ||
                SYNONYMS.stream().anyMatch(group -> group.contains(term) && !Collections.disjoint(group, indexed))).toList();
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

    private record Entry(String title, String reference, String url, String summary,
                         List<String> keywords, List<String> classifications) {
        Entry { classifications = classifications == null ? List.of() : List.copyOf(classifications); }
    }
    private record Ranked(Entry entry, List<String> terms, double score) { }
    public record Source(int number, String title, String reference, String url, String summary,
                         List<String> matchedTerms, List<String> classifications) { }
    public record Comparison(String feature, List<Integer> sourceNumbers) { }
    public record Audit(List<String> expandedTerms, List<Comparison> comparisons, String searchMode,
                        int indexed, int matched, int cited) { }
    public record Statement(String text, int source) { }
    public record Reply(String mode, String message, List<Statement> statements, List<Source> sources,
                        List<String> searchTerms, String scope, Audit audit) { }
}
