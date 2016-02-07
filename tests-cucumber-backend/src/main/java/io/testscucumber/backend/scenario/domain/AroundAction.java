package io.testscucumber.backend.scenario.domain;

public class AroundAction {

    private StepStatus status;

    private String errorMessage;

    /**
     * Private constructor for Morphia.
     */
    private AroundAction() {

    }

    protected AroundAction(final AroundActionBuilder builder) {
        status = builder.getStatus();
        errorMessage = builder.getErrorMessage();
    }

    public StepStatus getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    protected void setStatus(final StepStatus newStatus) {
        if (newStatus == status) {
            return;
        }

        status = newStatus;
        if (newStatus != StepStatus.FAILED && newStatus != StepStatus.UNDEFINED) {
            errorMessage = null;
        }
    }

}
