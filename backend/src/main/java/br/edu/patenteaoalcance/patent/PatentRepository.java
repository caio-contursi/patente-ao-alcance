package br.edu.patenteaoalcance.patent;

import java.util.List;
import java.util.Optional;

public interface PatentRepository {
    List<PatentDocument> findAll();
    Optional<PatentDocument> findById(String id);
}
