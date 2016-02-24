package io.testscucumber.backend.scenario.rest;

import io.testscucumber.backend.scenario.domain.ScenarioStatus;

import javax.validation.constraints.NotNull;

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
