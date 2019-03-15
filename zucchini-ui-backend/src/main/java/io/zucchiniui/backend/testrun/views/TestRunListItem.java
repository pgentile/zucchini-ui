package io.zucchiniui.backend.testrun.views;

import io.zucchiniui.backend.scenario.views.ScenarioStats;

import java.time.ZonedDateTime;

public class TestRunListItem {

    private String id;

    private String type;

    private String plateforme;

    private String nom;

    private ZonedDateTime date;

    private ScenarioStats stats;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

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

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(final ZonedDateTime date) {
        this.date = date;
    }

    public ScenarioStats getStats() {
        return stats;
    }

    public void setStats(final ScenarioStats stats) {
        this.stats = stats;
    }
}
