package br.edu.patenteaoalcance.patent;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PatentSearchRequest(
        @NotBlank(message = "Descreva a solução técnica para iniciar a busca.")
        @Size(min = 12, max = 5000, message = "A descrição deve ter entre 12 e 5000 caracteres.")
        String description,
        String applicant,
        Integer fromYear,
        Integer toYear
) { }
