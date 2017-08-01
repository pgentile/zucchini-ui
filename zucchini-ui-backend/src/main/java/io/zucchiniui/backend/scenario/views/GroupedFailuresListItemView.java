package io.zucchiniui.backend.scenario.views;

import java.util.Set;

public class GroupedFailuresListItemView {

    private String errorMessage;
    private Set<FailedScenarioListItemView> failedScenarii;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    void addFailedScenario(FailedScenarioListItemView failed) {
        failedScenarii.add(failed);
    }

    public Set<FailedScenarioListItemView> getFailedScenarii() {
        return failedScenarii;
    }

    public void setFailedScenarii(Set<FailedScenarioListItemView> failedScenarii) {
        this.failedScenarii = failedScenarii;
    }
}
