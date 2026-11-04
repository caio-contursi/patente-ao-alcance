package br.edu.patenteaoalcance.api;

import br.edu.patenteaoalcance.patent.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PatentController {
    private final PatentSearchService searchService;
    private final PatentExplanationService explanationService;

    public PatentController(PatentSearchService searchService, PatentExplanationService explanationService) {
        this.searchService = searchService;
        this.explanationService = explanationService;
    }

    @PostMapping("/search")
    public PatentSearchResponse search(@Valid @RequestBody PatentSearchRequest request) {
        return searchService.search(request);
    }

    @GetMapping("/patents/{id}")
    public PatentDocument getPatent(@PathVariable String id) {
        return searchService.getById(id);
    }

    @PostMapping("/explain")
    public PatentExplanationResponse explain(@Valid @RequestBody PatentExplanationRequest request) {
        return explanationService.explain(request);
    }

    @PostMapping("/feedback")
    public ResponseEntity<Void> feedback(@Valid @RequestBody FeedbackRequest request) {
        // O protótipo não persiste descrição técnica nem comentários livres.
        return ResponseEntity.noContent().build();
    }

    public record FeedbackRequest(@jakarta.validation.constraints.NotBlank String documentId,
                                  @jakarta.validation.constraints.NotBlank String rating) { }
}
