package example.reporting.scenario.domain;

import example.reporting.shared.domain.BasicInfo;
import example.reporting.shared.domain.Location;
import example.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexed;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity("scenarii")
public class Scenario extends BaseEntity<String> {

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

    private ScenarioStatus status;

    private BasicInfo info;

    private Location location;

    private List<Step> steps = new ArrayList<>();

    private List<AroundAction> beforeActions = new ArrayList<>();

    private List<AroundAction> afterActions = new ArrayList<>();

    public void changeStatus(final ScenarioStatus newStatus) {
        if (status == newStatus) {
            return;
        }

        final StepStatus newStepStatus;
        switch (newStatus) {
            case PASSED:
                newStepStatus = StepStatus.PASSED;
                break;
            case FAILED:
                newStepStatus = StepStatus.FAILED;
                break;
            case NOT_RUN:
                newStepStatus = StepStatus.NOT_RUN;
                break;
            case PENDING:
                newStepStatus = StepStatus.PENDING;
                break;
            default:
                throw new IllegalArgumentException("Unsupported status: " + newStatus);
        }

        beforeActions.forEach(step -> step.changeStatus(newStepStatus));
        if (background != null) {
            background.getSteps().forEach(step -> step.changeStatus(newStepStatus));
        }
        steps.forEach(step -> step.changeStatus(newStepStatus));
        afterActions.forEach(step -> step.changeStatus(newStepStatus));

        status = newStatus;
    }

    public void calculateStatusFromSteps() {
        final List<StepStatus> innerStatus = new ArrayList<>();
        if (background != null) {
            background.getSteps().stream().map(Step::getStatus).forEach(innerStatus::add);
        }
        beforeActions.stream().map(AroundAction::getStatus).forEach(innerStatus::add);
        steps.stream().map(Step::getStatus).forEach(innerStatus::add);
        afterActions.stream().map(AroundAction::getStatus).forEach(innerStatus::add);

        for (final StepStatus oneInnerStatus : innerStatus) {
            switch (oneInnerStatus) {
                case FAILED:
                case UNDEFINED:
                    status = ScenarioStatus.FAILED;
                    return;
                case PENDING:
                    status = ScenarioStatus.PENDING;
                    return;
                default:
                    // Rien à faire, on continue
                    break;
            }
        }

        // Tous les steps ont fonctionné : c'est good !
        if (innerStatus.stream().allMatch(StepStatus.PASSED::equals)) {
            status = ScenarioStatus.PASSED;
            return;
        }

        // Si tous les steps du scénario sont skipped, alors non joués
        if (steps.stream().map(Step::getStatus).allMatch(StepStatus.SKIPPED::equals)) {
            status = ScenarioStatus.NOT_RUN;
            return;
        }

        // Si tous les steps du scénario sont non joués, alors non joués
        if (steps.stream().map(Step::getStatus).allMatch(StepStatus.NOT_RUN::equals)) {
            status = ScenarioStatus.NOT_RUN;
            return;
        }

        status = ScenarioStatus.FAILED;
    }

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

    public ScenarioStatus getStatus() {
        return status;
    }

    public void setStatus(final ScenarioStatus status) {
        this.status = status;
    }

    public List<AroundAction> getBeforeActions() {
        return beforeActions;
    }

    public void setBeforeActions(final List<AroundAction> beforeActions) {
        this.beforeActions = beforeActions;
    }

    public List<AroundAction> getAfterActions() {
        return afterActions;
    }

    public void setAfterActions(final List<AroundAction> afterActions) {
        this.afterActions = afterActions;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public void setInfo(final BasicInfo info) {
        this.info = info;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(final Location location) {
        this.location = location;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public void setSteps(final List<Step> steps) {
        this.steps = steps;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

}
