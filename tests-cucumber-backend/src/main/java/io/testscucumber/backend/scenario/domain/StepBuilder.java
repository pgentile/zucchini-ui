package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.shared.domain.Location;

public class StepBuilder {

    private BasicInfo info;

    private Location location;

    private StepStatus status = StepStatus.NOT_RUN;

    private String errorMessage;

    private String[][] table;

    private String comment;

    public StepBuilder withInfo(final BasicInfo info) {
        this.info = info;
        return this;
    }

    public StepBuilder withLocation(final Location location) {
        this.location = location;
        return this;
    }

    public StepBuilder withStatus(final StepStatus status) {
        this.status = status;
        return this;
    }

    public StepBuilder withErrorMessage(final String errorMessage) {
        this.errorMessage = errorMessage;
        return this;
    }

    public StepBuilder withTable(final String[][] table) {
        this.table = table;
        return this;
    }

    public StepBuilder withComment(final String comment) {
        this.comment = comment;
        return this;
    }

    public Step build() {
        return new Step(this);
    }

    protected BasicInfo getInfo() {
        return info;
    }

    protected Location getLocation() {
        return location;
    }

    protected StepStatus getStatus() {
        return status;
    }

    protected String getErrorMessage() {
        return errorMessage;
    }

    protected String[][] getTable() {
        return table;
    }

    protected String getComment() {
        return comment;
    }

}
