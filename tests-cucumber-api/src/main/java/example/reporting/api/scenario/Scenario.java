package example.reporting.api.scenario;

import com.google.common.base.MoreObjects;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity("scenarii")
public class Scenario extends FeatureElement {

    @Id
    private String id;

    private String scenarioKey;

    private String featureId;

    private String testRunId;

    private Set<String> tags = new HashSet<>();

    private Background background;

    private StepStatus status;

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

    public void calculateStatusFromSteps() {
        status = getStatusFromSteps();
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

    private StepStatus getStatusFromSteps() {
        final List<StepStatus> innerStatus = new ArrayList<>();
        if (background != null) {
            background.getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);
        }
        getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);

        for (final StepStatus oneInnerStatus : innerStatus) {
            switch (oneInnerStatus) {
                case FAILED:
                case UNDEFINED:
                    return StepStatus.FAILED;
                case PENDING:
                    return StepStatus.PENDING;
                default:
                    // Rien à faire, on continue
                    break;
            }
        }

        // Tous les steps ont fonctionné : c'est good !
        if (innerStatus.stream().allMatch(StepStatus.PASSED::equals)) {
            return StepStatus.PASSED;
        }

        // Si tous les steps du scénario sont skipped, alors skipped
        if (getSteps().stream().map(Step::getStatus).allMatch(StepStatus.SKIPPED::equals)) {
            return StepStatus.SKIPPED;
        }

        // Si tous les steps du scénario sont non joués, alors non joués
        if (getSteps().stream().map(Step::getStatus).allMatch(StepStatus.NOT_RUN::equals)) {
            return StepStatus.NOT_RUN;
        }

        return StepStatus.FAILED;
    }

}
