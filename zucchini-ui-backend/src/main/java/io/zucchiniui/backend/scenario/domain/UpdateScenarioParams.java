package io.zucchiniui.backend.scenario.domain;

import java.util.Optional;

public class UpdateScenarioParams {

    private final Optional<ScenarioStatus> status;

    private final Optional<Boolean> reviewed;

    public UpdateScenarioParams(final Optional<ScenarioStatus> status, final Optional<Boolean> reviewed) {
        this.status = status;
        this.reviewed = reviewed;
    }

    public Optional<ScenarioStatus> getStatus() {
        return status;
    }

    public Optional<Boolean> isReviewed() {
        return reviewed;
    }

}
