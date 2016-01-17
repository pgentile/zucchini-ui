package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.testrun.domain.TestRun;

public class FeatureHistoryItem {

    private String id;

    private FeatureStatus status;

    private TestRun testRun;

    private ScenarioStats stats;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public FeatureStatus getStatus() {
        return status;
    }

    public void setStatus(final FeatureStatus status) {
        this.status = status;
    }

    public TestRun getTestRun() {
        return testRun;
    }

    public void setTestRun(final TestRun testRun) {
        this.testRun = testRun;
    }

    public ScenarioStats getStats() {
        return stats;
    }

    public void setStats(final ScenarioStats stats) {
        this.stats = stats;
    }
}
