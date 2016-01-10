package example.reporting.scenario.domain;

public class AroundAction {

    private StepStatus status;

    private String errorMessage;

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
