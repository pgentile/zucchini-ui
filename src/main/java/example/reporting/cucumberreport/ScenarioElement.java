package example.reporting.cucumberreport;

import com.google.common.base.MoreObjects;

import java.util.List;

public class ScenarioElement extends CucumberElement implements HasTags {

    private String type;

    private String description;

    private List<Step> steps;

    private List<Tag> tags;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(List<Step> steps) {
        this.steps = steps;
    }

    @Override
    public List<Tag> getTags() {
        return tags;
    }

    @Override
    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    @Override
    protected MoreObjects.ToStringHelper createToStringHelper() {
        return super.createToStringHelper()
                .add("type", type)
                .add("size of steps", steps.size());
    }

}
