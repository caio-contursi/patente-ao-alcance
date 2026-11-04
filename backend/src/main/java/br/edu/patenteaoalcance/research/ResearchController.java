package br.edu.patenteaoalcance.research;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/research")
public class ResearchController {
    private final ResearchService research;

    public ResearchController(ResearchService research) {
        this.research = research;
    }

    @PostMapping("/chat")
    public ResearchService.Reply chat(@Valid @RequestBody Question request) {
        return research.answer(request.message().strip(), request.previousQuestions());
    }

    public record Question(
            @NotBlank @Size(max = 2000) String message,
            @Size(max = 3) List<@NotBlank @Size(max = 2000) String> previousQuestions
    ) { }
}
