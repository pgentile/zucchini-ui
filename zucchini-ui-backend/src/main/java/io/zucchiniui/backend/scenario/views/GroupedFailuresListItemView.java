package io.zucchiniui.backend.scenario.views;

import java.util.ArrayList;
import java.util.List;

public class GroupedFailuresListItemView {

    private String errorMessage;
    private List<FailedScenarioListItemView> failedScenarii = new ArrayList<>();

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public List<FailedScenarioListItemView> getFailedScenarii() {
        return failedScenarii;
    }

    public void setFailedScenarii(List<FailedScenarioListItemView> failedScenarii) {
        this.failedScenarii = failedScenarii;
    }

    void addFailedScenario(FailedScenarioListItemView failed){
        failedScenarii.add(failed);
    }
}
