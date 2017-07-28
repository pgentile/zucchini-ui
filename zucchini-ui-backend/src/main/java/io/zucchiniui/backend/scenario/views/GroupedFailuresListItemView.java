package io.zucchiniui.backend.scenario.views;

import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

public class GroupedFailuresListItemView {

    private String errorMessage;
    private Set<FailedScenarioListItemView> failedScenarii = new TreeSet<>(Comparator.comparing(failure -> failure.getInfo().getName()));

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Set<FailedScenarioListItemView> getFailedScenarii() {
        return failedScenarii;
    }

    void addFailedScenario(FailedScenarioListItemView failed) {
        failedScenarii.add(failed);
    }
}
