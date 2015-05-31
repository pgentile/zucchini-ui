package example.reporting.cucumberreport;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.google.common.base.MoreObjects;

import java.util.ArrayList;
import java.util.List;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Scenario.class, name = "scenario"),
        @JsonSubTypes.Type(value = Background.class, name = "background")
})
public class ScenarioElement extends CucumberElement {

    private String description;

    private List<Step> steps = new ArrayList<>();

    private List<Tag> tags = new ArrayList<>();

    @JsonProperty("before")
    private List<AroundAction> beforeActions = new ArrayList<>();

    @JsonProperty("after")
    private List<AroundAction> afterActions = new ArrayList<>();

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

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<AroundAction> getBeforeActions() {
        return beforeActions;
    }

    public void setBeforeActions(List<AroundAction> beforeActions) {
        this.beforeActions = beforeActions;
    }

    public List<AroundAction> getAfterActions() {
        return afterActions;
    }

    public void setAfterActions(List<AroundAction> afterActions) {
        this.afterActions = afterActions;
    }

    @Override
    protected MoreObjects.ToStringHelper createToStringHelper() {
        return super.createToStringHelper()
                .add("size of steps", steps.size());
    }

}
