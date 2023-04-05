package io.zucchiniui.backend.testrun.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class CreateTestRunRequest {

    @NotEmpty
    private String type;

    @NotEmpty
    private String environment;

    private String name;

    @Valid
    private List<RequestLabel> labels;

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public String getEnvironment() {
        return environment;
    }

    public void setEnvironment(final String environment) {
        this.environment = environment;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public List<RequestLabel> getLabels() {
        return labels;
    }

    public void setLabels(final List<RequestLabel> labels) {
        this.labels = labels;
    }

}
