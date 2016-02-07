package io.testscucumber.backend.scenario.domain;

import com.google.common.base.MoreObjects;
import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;

public class Step {

    private BasicInfo info;

    private Location location;

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
        location = builder.getLocation();
        status = builder.getStatus();
        errorMessage = builder.getErrorMessage();
        table = builder.getTable();
        comment = builder.getComment();
    }

    public BasicInfo getInfo() {
        return info;
    }

    public Location getLocation() {
        return location;
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
