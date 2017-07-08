package io.zucchiniui.backend.scenario.views;

public class FailedScenarioListItemView extends ScenarioListItemView {

    private String errorMessage;

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

}
