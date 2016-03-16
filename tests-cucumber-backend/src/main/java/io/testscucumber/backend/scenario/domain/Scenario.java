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
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    private boolean reviewed;

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
        calculateReviewStateFromStatus();
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

        if (other.background == null) {
            background = null;
        } else {
            background = other.background.copy();
        }

        status = other.status;
        info = other.info;
        comment = other.comment;

        steps = other.steps.stream()
            .map(Step::copy)
            .collect(Collectors.toList());

        beforeActions = other.beforeActions.stream()
            .map(AroundAction::copy)
            .collect(Collectors.toList());

        afterActions = other.afterActions.stream()
            .map(AroundAction::copy)
            .collect(Collectors.toList());

        calculateStatusFromSteps();
        calculateReviewStateFromStatus();

        modifiedAt = ZonedDateTime.now();
    }

    public void setStatus(final ScenarioStatus newStatus) {
        Objects.requireNonNull(newStatus);

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

    public void setReviewed(final boolean reviewed) {
        this.reviewed = reviewed;
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
        return Collections.unmodifiableSet(tags);
    }

    public Set<String> getAllTags() {
        return Collections.unmodifiableSet(allTags);
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

    public boolean isReviewed() {
        return reviewed;
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
        final Set<StepStatus> stepStatus = steps.stream()
            .map(Step::getStatus)
            .collect(Collectors.toSet());

        final Set<StepStatus> allStatus = extractAllStepStatus().collect(Collectors.toSet());

        if (allStatus.isEmpty()) {
            status = ScenarioStatus.NOT_RUN;
            return;
        }

        if (allStatus.contains(StepStatus.FAILED) || allStatus.contains(StepStatus.UNDEFINED)) {
            status = ScenarioStatus.FAILED;
            return;
        }

        if (allStatus.contains(StepStatus.PENDING)) {
            status = ScenarioStatus.PENDING;
            return;
        }

        if (allStatus.size() == 1 && allStatus.contains(StepStatus.PASSED)) {
            status = ScenarioStatus.PASSED;
            return;
        }

        if (stepStatus.size() == 1 && stepStatus.contains(StepStatus.SKIPPED)) {
            status = ScenarioStatus.NOT_RUN;
            return;
        }

        if (stepStatus.size() == 1 && stepStatus.contains(StepStatus.NOT_RUN)) {
            status = ScenarioStatus.NOT_RUN;
            return;
        }

        status = ScenarioStatus.FAILED;
    }

    private Stream<StepStatus> extractAllStepStatus() {
        Stream<StepStatus> stream = steps.stream().map(Step::getStatus);
        stream = Stream.concat(stream, beforeActions.stream().map(AroundAction::getStatus));
        stream = Stream.concat(stream, afterActions.stream().map(AroundAction::getStatus));

        if (background != null) {
            stream = Stream.concat(stream, background.getSteps().stream().map(Step::getStatus));
        }

        return stream;
    }

    private void calculateReviewStateFromStatus() {
        // Passed scenario doesn't need a review
        reviewed = (status == ScenarioStatus.PASSED);
    }

}
