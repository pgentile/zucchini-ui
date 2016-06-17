package io.zucchiniui.backend.testrun.rest;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import java.util.List;

public class CreateTestRunRequest {

    @NotEmpty
    private String type;

    @Valid
    private List<RequestLabel> labels;

    public String getType() {
        return type;
    }

    public void setType(final String type) {
        this.type = type;
    }

    public List<RequestLabel> getLabels() {
        return labels;
    }

    public void setLabels(final List<RequestLabel> labels) {
        this.labels = labels;
    }

}
