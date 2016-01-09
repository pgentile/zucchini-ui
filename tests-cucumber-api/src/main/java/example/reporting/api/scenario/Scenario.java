package example.reporting.api.scenario;

import com.google.common.base.MoreObjects;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity("scenarii")
public class Scenario extends FeatureElement {

    @Id
    private String id;

    @Indexed
    private String scenarioKey;

    @Indexed
    private String featureId;

    @Indexed
    private String testRunId;

    @Indexed
    private Set<String> tags = new HashSet<>();

    private Background background;

    private StepStatus status;

    private List<AroundAction> beforeActions = new ArrayList<>();

    private List<AroundAction> afterActions = new ArrayList<>();

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getScenarioKey() {
        return scenarioKey;
    }

    public void setScenarioKey(final String scenarioKey) {
        this.scenarioKey = scenarioKey;
    }

    public String getFeatureId() {
        return featureId;
    }

    public void setFeatureId(final String featureId) {
        this.featureId = featureId;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public void setTestRunId(final String testRunId) {
        this.testRunId = testRunId;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(final Set<String> tags) {
        this.tags = tags;
    }

    public Background getBackground() {
        return background;
    }

    public void setBackground(final Background background) {
        this.background = background;
    }

    public StepStatus getStatus() {
        return status;
    }

    public void setStatus(StepStatus status) {
        this.status = status;
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
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("id", id)
            .add("scenarioKey", scenarioKey)
            .add("info", getInfo())
            .add("location", getLocation())
            .add("tags", tags)
            .add("status", status)
            .toString();
    }

}
