package br.edu.patenteaoalcance.patent;

import java.time.LocalDate;
import java.util.List;

public record PatentDocument(
        String id,
        String title,
        String summary,
        String publicationNumber,
        LocalDate publicationDate,
        String applicant,
        String sourceName,
        String sourceUrl,
        String sourceType,
        List<String> evidenceSnippets,
        List<String> matchingTerms
) { }
