package example.reporting.reportconverter.report;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ReportScenario.class, name = "scenario"),
        @JsonSubTypes.Type(value = ReportBackground.class, name = "background")
})
public class ReportFeatureElement extends CucumberElement {

    private String description;

    private List<ReportStep> steps = new ArrayList<>();

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public List<ReportStep> getSteps() {
        return steps;
    }

    public void setSteps(final List<ReportStep> steps) {
        this.steps = steps;
    }

    @Override
    protected MoreObjects.ToStringHelper createToStringHelper() {
        return super.createToStringHelper()
                .add("size of steps", steps.size());
    }

}
