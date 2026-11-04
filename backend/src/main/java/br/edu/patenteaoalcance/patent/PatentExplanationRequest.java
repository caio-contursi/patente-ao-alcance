package br.edu.patenteaoalcance.patent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record PatentExplanationRequest(
        @NotBlank @Size(min = 12, max = 5000) String description,
        @NotEmpty @Size(max = 5) List<String> documentIds
) { }
