package io.testscucumber.backend.scenario.domain;

import java.util.Objects;

public class AroundAction {

    private StepStatus status;

    private String errorMessage;

    /**
     * Private constructor for Morphia.
     */
    private AroundAction() {
    }

    protected AroundAction(final AroundActionBuilder builder) {
        status = Objects.requireNonNull(builder.getStatus());
        errorMessage = builder.getErrorMessage();
    }

    public AroundAction copy() {
        final AroundAction newAroundAction = new AroundAction();
        newAroundAction.status = status;
        newAroundAction.errorMessage = errorMessage;
        return newAroundAction;
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
