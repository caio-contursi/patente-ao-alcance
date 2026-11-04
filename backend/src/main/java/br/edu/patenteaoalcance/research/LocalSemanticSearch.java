package br.edu.patenteaoalcance.research;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.*;
import java.util.stream.IntStream;

@Component
class LocalSemanticSearch {
    private final ObjectMapper json;
    private final URI endpoint;
    private final String model;
    private final HttpClient http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(2)).build();

    LocalSemanticSearch(ObjectMapper json, @Value("${research.ollama-url}") URI ollama,
                        @Value("${research.embedding-model}") String model) {
        this.json = json;
        this.endpoint = ollama.resolve("/api/embed");
        this.model = model;
    }

    Optional<List<Double>> scores(String question, List<String> documents) {
        if (model.isBlank() || documents.isEmpty()) return Optional.empty();
        var inputs = new ArrayList<String>();
        inputs.add("Instruct: Retrieve documents that are relevant to the technical question.\nQuery: " + question);
        inputs.addAll(documents);
        try {
            var body = json.writeValueAsString(Map.of("model", model, "input", inputs));
            var request = HttpRequest.newBuilder(endpoint).timeout(Duration.ofSeconds(18))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body)).build();
            var response = http.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) return Optional.empty();
            var vectors = json.readTree(response.body()).path("embeddings");
            if (!vectors.isArray() || vectors.size() != inputs.size()) return Optional.empty();
            var query = vectors.get(0);
            if (!query.isArray() || query.isEmpty()) return Optional.empty();
            for (JsonNode vector : vectors) {
                if (!vector.isArray() || vector.size() != query.size()) return Optional.empty();
                for (JsonNode value : vector) if (!value.isNumber()) return Optional.empty();
            }
            return Optional.of(IntStream.range(1, vectors.size()).mapToObj(i -> cosine(query, vectors.get(i))).toList());
        } catch (IOException e) {
            return Optional.empty();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return Optional.empty();
        }
    }

    private static double cosine(JsonNode a, JsonNode b) {
        double product = 0, aSquared = 0, bSquared = 0;
        for (int i = 0; i < a.size(); i++) {
            double x = a.get(i).asDouble(), y = b.get(i).asDouble();
            product += x * y;
            aSquared += x * x;
            bSquared += y * y;
        }
        return aSquared > 0 && bSquared > 0 ? product / Math.sqrt(aSquared * bSquared) : 0;
    }
}
