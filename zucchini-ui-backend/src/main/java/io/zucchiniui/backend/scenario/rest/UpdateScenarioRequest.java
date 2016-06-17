package io.zucchiniui.backend.scenario.rest;

import io.zucchiniui.backend.scenario.domain.ScenarioStatus;

public class UpdateScenarioRequest {

    private ScenarioStatus status;

    private Boolean reviewed;

    public ScenarioStatus getStatus() {
        return status;
    }

    public void setStatus(final ScenarioStatus status) {
        this.status = status;
    }

    public Boolean isReviewed() {
        return reviewed;
    }

    public void setReviewed(final Boolean reviewed) {
        this.reviewed = reviewed;
    }

}
