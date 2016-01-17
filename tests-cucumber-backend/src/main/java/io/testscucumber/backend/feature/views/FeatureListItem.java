package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.shared.domain.BasicInfo;

public class FeatureListItem {

    private String id;

    private String testRunId;

    private BasicInfo info;

    private FeatureStatus status;

    private ScenarioStats stats;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(final String testRunId) {
        this.testRunId = testRunId;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public FeatureStatus getStatus() {
        return status;
    }

    public void setStatus(final FeatureStatus status) {
        this.status = status;
    }

    public ScenarioStats getStats() {
        return stats;
    }

    public void setStats(final ScenarioStats stats) {
        this.stats = stats;
    }

}
