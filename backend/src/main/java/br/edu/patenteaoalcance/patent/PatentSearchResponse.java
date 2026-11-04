package br.edu.patenteaoalcance.patent;

import java.util.List;

public record PatentSearchResponse(
        String mode,
        String notice,
        int total,
        List<PatentDocument> results
) { }
