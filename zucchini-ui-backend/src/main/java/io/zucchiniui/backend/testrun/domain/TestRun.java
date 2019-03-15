package io.zucchiniui.backend.testrun.domain;

import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.*;

@Entity("testRuns")
public class TestRun extends BaseEntity<String> {

    @Id
    private String id;

    private String type;

    private String plateforme;

    private String nom;

    private ZonedDateTime date;

    private List<Label> labels = new ArrayList<>();

    /**
     * Private constructor for Morphia.
     */
    private TestRun() {
    }

    public TestRun(final String type) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.type = Objects.requireNonNull(type);
    }

    public TestRun(final String type, final String plateforme, final String nom) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.type = Objects.requireNonNull(type);
        this.plateforme = Objects.requireNonNull(plateforme);
        this.nom = Objects.requireNonNull(nom);
    }

    public void setType(final String type) {
        this.type = Objects.requireNonNull(type);
    }

    public void setPlateforme(final String plateforme) {
        this.plateforme = Objects.requireNonNull(plateforme);
    }

    public void setNom(final String nom) {
        this.nom = Objects.requireNonNull(nom);
    }

    public void setLabels(final List<Label> labels) {
        this.labels = new ArrayList<>(labels);
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public String getPlateforme() {
        return plateforme;
    }

    public String getNom() {
        return nom;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public List<Label> getLabels() {
        return Collections.unmodifiableList(labels);
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
