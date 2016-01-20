package io.testscucumber.backend.testrun.rest;

import org.hibernate.validator.constraints.NotEmpty;

public class CreateTestRunRequest {

    @NotEmpty
    private String env;

    public String getEnv() {
        return env;
    }

    public void setEnv(final String env) {
        this.env = env;
    }

}
