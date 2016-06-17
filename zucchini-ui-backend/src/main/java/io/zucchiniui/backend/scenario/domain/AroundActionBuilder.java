package io.zucchiniui.backend.scenario.domain;

public class AroundActionBuilder {

    private StepStatus status = StepStatus.NOT_RUN;

    private String errorMessage;

    public AroundActionBuilder withStatus(final StepStatus status) {
        this.status = status;
        return this;
    }

    public AroundActionBuilder withErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }

    public AroundAction build() {
        return new AroundAction(this);
    }

    protected StepStatus getStatus() {
        return status;
    }

    protected String getErrorMessage() {
        return errorMessage;
    }

}
