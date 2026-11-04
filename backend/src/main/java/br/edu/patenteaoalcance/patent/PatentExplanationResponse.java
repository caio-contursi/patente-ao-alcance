package br.edu.patenteaoalcance.patent;

import java.util.List;

public record PatentExplanationResponse(String mode, String explanation, List<String> evidenceIds, String notice) { }
