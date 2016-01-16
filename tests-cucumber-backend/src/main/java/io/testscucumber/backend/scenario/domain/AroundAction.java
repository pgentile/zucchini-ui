package io.testscucumber.backend.scenario.domain;

public class AroundAction {

    private StepStatus status;

    private String errorMessage;

    protected void changeStatus(final StepStatus newStatus) {
        if (newStatus == status) {
            return;
        }

        status = newStatus;
        if (newStatus != StepStatus.FAILED && newStatus != StepStatus.UNDEFINED) {
            errorMessage = null;
        }
    }

    public StepStatus getStatus() {
        return status;
    }

    public void setStatus(final StepStatus status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
    }

}
