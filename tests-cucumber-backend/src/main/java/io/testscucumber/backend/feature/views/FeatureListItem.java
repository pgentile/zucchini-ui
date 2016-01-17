package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.shared.domain.BasicInfo;

public class FeatureListItem {

    private String id;

    private String testRunId;

    private BasicInfo info;

    private FeatureStatus status;

    private FeatureStats stats;

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

    public FeatureStats getStats() {
        return stats;
    }

    public void setStats(final FeatureStats stats) {
        this.stats = stats;
    }

}
