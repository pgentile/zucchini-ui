package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;
import io.testscucumber.backend.support.ddd.BaseEntity;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;

@Entity("scenarii")
public class Scenario extends BaseEntity<String> {

    @Id
    private String id;

    private String scenarioKey;

    private String featureId;

    private String testRunId;

    private Set<String> tags = new HashSet<>();

    private Set<String> allTags = new HashSet<>();

    private Background background;

    private ScenarioStatus status;

    private BasicInfo info;

    private String comment;

    private List<Step> steps = new ArrayList<>();

    private List<AroundAction> beforeActions = new ArrayList<>();

    private List<AroundAction> afterActions = new ArrayList<>();

    private ZonedDateTime createdAt;

    private ZonedDateTime modifiedAt;

    /**
     * Private constructor for Morphia.
     */
    private Scenario() {

    }

    protected Scenario(final ScenarioBuilder builder) {
        id = UUID.randomUUID().toString();

        final ZonedDateTime now = ZonedDateTime.now();
        createdAt = now;
        modifiedAt = now;

        scenarioKey = Objects.requireNonNull(builder.getScenarioKey());
        featureId = Objects.requireNonNull(builder.getFeatureId());
        testRunId = Objects.requireNonNull(builder.getTestRunId());

        tags = new HashSet<>(builder.getTags());
        tags.removeAll(builder.getExtraTags());

        allTags = new HashSet<>(tags);
        allTags.addAll(builder.getExtraTags());

        if (builder.getBackgroundBuilder() != null) {
            background = builder.getBackgroundBuilder().build();
        }

        info = Objects.requireNonNull(builder.getInfo());
        comment = builder.getComment();

        for (final StepBuilder stepBuilder : builder.getStepBuilders()) {
            steps.add(stepBuilder.build());
        }

        for (final AroundActionBuilder aroundActionBuilder : builder.getBeforeActionBuilders()) {
            beforeActions.add(aroundActionBuilder.build());
        }

        for (final AroundActionBuilder aroundActionBuilder : builder.getAfterActionBuilders()) {
            afterActions.add(aroundActionBuilder.build());
        }

        calculateStatusFromSteps();
    }

    public void mergeWith(final Scenario other) {
        if (!scenarioKey.equals(other.scenarioKey)) {
            throw new IllegalArgumentException("Scenario key must be the same");
        }
        if (!featureId.equals(other.featureId)) {
            throw new IllegalArgumentException("Feature ID must be the same");
        }
        if (!testRunId.equals(other.testRunId)) {
            throw new IllegalArgumentException("Test run ID must be the same");
        }

        tags = new HashSet<>(other.tags);
        allTags = new HashSet<>(other.allTags);
        background = other.background;
        status = other.status;
        info = other.info;
        comment = other.comment;
        steps = new ArrayList<>(other.steps);
        beforeActions = new ArrayList<>(other.beforeActions);
        afterActions = new ArrayList<>(other.afterActions);
        modifiedAt = ZonedDateTime.now();

        calculateStatusFromSteps();
    }

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

        beforeActions.forEach(step -> step.setStatus(newStepStatus));
        if (background != null) {
            background.setStatus(newStepStatus);
        }
        steps.forEach(step -> step.setStatus(newStepStatus));
        afterActions.forEach(step -> step.setStatus(newStepStatus));

        status = newStatus;
        modifiedAt = ZonedDateTime.now();
    }

    public void updateWithExtraTags(final Set<String> extraTags) {
        final Set<String> newTags = new HashSet<>();
        newTags.addAll(tags);
        newTags.addAll(extraTags);

        if (!newTags.equals(allTags)) {
            allTags = newTags;
            modifiedAt = ZonedDateTime.now();
        }
    }

    public void setFeatureId(final String featureId) {
        this.featureId = featureId;
    }

    public String getId() {
        return id;
    }

    public String getScenarioKey() {
        return scenarioKey;
    }

    public String getFeatureId() {
        return featureId;
    }

    public String getTestRunId() {
        return testRunId;
    }

    public Set<String> getTags() {
        return tags;
    }

    public Set<String> getAllTags() {
        return allTags;
    }

    public Background getBackground() {
        return background;
    }

    public ScenarioStatus getStatus() {
        return status;
    }

    public List<AroundAction> getBeforeActions() {
        return Collections.unmodifiableList(beforeActions);
    }

    public List<AroundAction> getAfterActions() {
        return Collections.unmodifiableList(afterActions);
    }

    public BasicInfo getInfo() {
        return info;
    }

    public String getComment() {
        return comment;
    }

    public List<Step> getSteps() {
        return Collections.unmodifiableList(steps);
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getModifiedAt() {
        return modifiedAt;
    }

    @Override
    protected String getEntityId() {
        return getId();
    }

    private void calculateStatusFromSteps() {
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

}
