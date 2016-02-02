package io.testscucumber.backend.testrun.rest;

import org.hibernate.validator.constraints.NotEmpty;

public class CreateTestRunRequest {

    @NotEmpty
    private String type;

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

}
