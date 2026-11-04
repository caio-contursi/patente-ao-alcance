package br.edu.patenteaoalcance.patent;

public class PatentNotFoundException extends RuntimeException {
    public PatentNotFoundException(String id) {
        super("Documento não encontrado: " + id);
    }
}
