package io.zucchiniui.backend.testrun.rest;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import java.util.List;

public class CreateTestRunRequest {

    @NotEmpty
    private String type;

    private String plateforme;

    private String nom;
    @Valid
    private List<RequestLabel> labels;

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getPlateforme() {
        return plateforme;
    }

    public void setPlateforme(final String plateforme) {
        this.plateforme = plateforme;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(final String nom) {
        this.nom = nom;
    }

    public List<RequestLabel> getLabels() {
        return labels;
    }

    public void setLabels(final List<RequestLabel> labels) {
        this.labels = labels;
    }

}
