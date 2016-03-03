package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.shared.domain.BasicInfo;

public class ScenarioListItemView {

    private String id;

    private BasicInfo info;

    private ScenarioStatus status;

    private boolean reviewed;

    private String testRunId;

    private String featureId;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public ScenarioStatus getStatus() {
        return status;
    }

    public void setStatus(final ScenarioStatus status) {
        this.status = status;
    }

    public boolean isReviewed() {
        return reviewed;
    }

    public void setReviewed(final boolean reviewed) {
        this.reviewed = reviewed;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(final String testRunId) {
        this.testRunId = testRunId;
    }

    public String getFeatureId() {
        return featureId;
    }

    public void setFeatureId(final String featureId) {
        this.featureId = featureId;
    }

}
