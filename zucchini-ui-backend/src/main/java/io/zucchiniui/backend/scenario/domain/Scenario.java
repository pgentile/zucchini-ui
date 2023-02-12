package io.zucchiniui.backend.scenario.domain;

import com.google.common.base.Strings;
import io.zucchiniui.backend.shared.domain.BasicInfo;
import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity("scenarii")
public class Scenario extends BaseEntity<String> {

    @Id
    private String id;

    private String language;

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

    private List<ScenarioChange<?>> changes = new ArrayList<>();

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
        language = Objects.requireNonNull(builder.getLanguage());

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

        language = other.language;
        tags = new HashSet<>(other.tags);
        allTags = new HashSet<>(other.allTags);

        if (other.background == null) {
            background = null;
        } else {
            background = other.background.copy();
        }

        final boolean oldReviewed = reviewed;
        final ScenarioStatus oldStatus = status;

        status = other.status;
        info = other.info;
        comment = other.comment;

        steps = other.steps.stream()
            .map(Step::copy)
            .toList();

        beforeActions = other.beforeActions.stream()
            .map(AroundAction::copy)
            .toList();

        afterActions = other.afterActions.stream()
            .map(AroundAction::copy)
            .toList();

        calculateStatusFromSteps();
        calculateReviewStateFromStatus();

        modifiedAt = ZonedDateTime.now();

        if (oldReviewed != reviewed) {
            changes.add(new ScenarioReviewedStateChange(modifiedAt, oldReviewed, reviewed));
        }
        if (oldStatus != status) {
            changes.add(new ScenarioStatusChange(modifiedAt, oldStatus, status));
        }
    }

    public void setStatus(final ScenarioStatus newStatus) {
        Objects.requireNonNull(newStatus);

        if (status == newStatus) {
            return;
        }

        final StepStatus newStepStatus = switch (newStatus) {
            case PASSED -> StepStatus.PASSED;
            case FAILED -> StepStatus.FAILED;
            case NOT_RUN -> StepStatus.NOT_RUN;
            case PENDING -> StepStatus.PENDING;
        };

        beforeActions.forEach(step -> step.setStatus(newStepStatus));
        if (background != null) {
            background.setStatus(newStepStatus);
        }
        steps.forEach(step -> step.setStatus(newStepStatus));
        afterActions.forEach(step -> step.setStatus(newStepStatus));

        modifiedAt = ZonedDateTime.now();
        changes.add(new ScenarioStatusChange(modifiedAt, status, newStatus));

        status = newStatus;

        clearOutputIfPossible();
    }

    public void setReviewed(final boolean reviewed) {
        if (this.reviewed != reviewed) {
            modifiedAt = ZonedDateTime.now();
            changes.add(new ScenarioReviewedStateChange(modifiedAt, this.reviewed, reviewed));

            this.reviewed = reviewed;
        }
    }

    public void doIgnoringChanges(Consumer<Scenario> consumer) {
        final int oldSize = changes.size();

        consumer.accept(this);

        if (changes.size() > oldSize) {
            changes = new ArrayList<>(changes.subList(0, oldSize));
        }
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

    public Optional<Attachment> findAttachmentById(String attachmentId) {
        return steps.stream()
            .flatMap(step -> step.getAttachments().stream())
            .filter(attachment -> attachmentId.equals(attachment.getId()))
            .findFirst();
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

    public String getLanguage() {
        return language;
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

    public List<ScenarioChange<?>> getChanges() {
        return Collections.unmodifiableList(changes);
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public ZonedDateTime getModifiedAt() {
        return modifiedAt;
    }

    public Optional<String> getErrorMessage() {
        Stream<String> stream = steps.stream().map(Step::getErrorMessage);
        stream = Stream.concat(stream, beforeActions.stream().map(AroundAction::getErrorMessage));
        stream = Stream.concat(stream, afterActions.stream().map(AroundAction::getErrorMessage));

        if (background != null) {
            stream = Stream.concat(stream, background.getSteps().stream().map(Step::getErrorMessage));
        }

        // Return the first error message found
        return stream
            .filter(errorMessage -> !Strings.isNullOrEmpty(errorMessage))
            .findFirst();

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
        } else if (allStatus.contains(StepStatus.FAILED) || allStatus.contains(StepStatus.UNDEFINED)) {
            status = ScenarioStatus.FAILED;
        } else if (allStatus.contains(StepStatus.PENDING)) {
            status = ScenarioStatus.PENDING;
        } else if (allStatus.size() == 1 && allStatus.contains(StepStatus.PASSED)) {
            status = ScenarioStatus.PASSED;
        } else if (stepStatus.size() == 1 && stepStatus.contains(StepStatus.SKIPPED)) {
            status = ScenarioStatus.NOT_RUN;
        } else if (stepStatus.size() == 1 && stepStatus.contains(StepStatus.NOT_RUN)) {
            status = ScenarioStatus.NOT_RUN;
        } else {
            status = ScenarioStatus.FAILED;
        }
    }

    private void clearOutputIfPossible() {
        if (status == ScenarioStatus.PASSED || status == ScenarioStatus.NOT_RUN) {
            allSteps().forEach(Step::clearOutput);
        }
    }

    private Stream<Step> allSteps() {
        Stream<Step> stream = steps.stream();
        if (background != null) {
            stream = Stream.concat(stream, background.getSteps().stream());
        }
        return stream;
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
