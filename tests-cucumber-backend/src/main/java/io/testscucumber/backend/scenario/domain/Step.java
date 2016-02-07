package io.testscucumber.backend.scenario.domain;

import com.google.common.base.MoreObjects;
import io.testscucumber.backend.shared.domain.BasicInfo;

public class Step {

    private BasicInfo info;

    private StepStatus status;

    private String errorMessage;

    private String[][] table;

    private String comment;

    /**
     * Private constructor for Morphia.
     */
    private Step() {

    }

    protected Step(final StepBuilder builder) {
        info = builder.getInfo();
        status = builder.getStatus();
        errorMessage = builder.getErrorMessage();
        table = builder.getTable();
        comment = builder.getComment();
    }

    public BasicInfo getInfo() {
        return info;
    }

    public StepStatus getStatus() {
        return status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String[][] getTable() {
        return table;
    }

    public String getComment() {
        return comment;
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("info", info)
            .add("status", status)
            .toString();
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
