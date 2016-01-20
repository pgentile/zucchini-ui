package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.feature.views.FeatureStats;

import java.time.ZonedDateTime;

public class TestRunListItem {

    private String id;

    private String env;

    private ZonedDateTime date;

    private FeatureStats stats;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(final String env) {
        this.env = env;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public void setDate(final ZonedDateTime date) {
        this.date = date;
    }

    public FeatureStats getStats() {
        return stats;
    }

    public void setStats(final FeatureStats stats) {
        this.stats = stats;
    }
}
