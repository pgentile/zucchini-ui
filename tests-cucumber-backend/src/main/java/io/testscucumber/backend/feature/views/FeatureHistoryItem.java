package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.testrun.domain.TestRun;

public class FeatureHistoryItem {

    private String id;

    private FeatureStatus status;

    private TestRun testRun;

    private FeatureStats stats;

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

    public FeatureStats getStats() {
        return stats;
    }

    public void setStats(final FeatureStats stats) {
        this.stats = stats;
    }
}
