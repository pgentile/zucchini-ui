package io.zucchiniui.backend.testrun.views;

import io.zucchiniui.backend.scenario.views.ScenarioStats;

import java.time.ZonedDateTime;

public class TestRunListItem {

    private String id;

    private String type;

    private String environment;

    private String name;

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

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(final String environment) {
        this.environment = environment;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
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
