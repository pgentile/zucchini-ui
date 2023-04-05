package io.zucchiniui.backend.scenario.rest;

import io.zucchiniui.backend.scenario.domain.ScenarioStatus;

import jakarta.validation.constraints.NotNull;

public class ChangeStatusRequest {

    @NotNull
    private ScenarioStatus newStatus;

    public ScenarioStatus getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(final ScenarioStatus newStatus) {
        this.newStatus = newStatus;
    }

}
