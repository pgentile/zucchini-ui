package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Consumer;

import static org.assertj.core.api.Assertions.assertThat;

public class ScenarioTest {

    @Test
    void should_have_not_run_status_when_scenario_has_nothing() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder();

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.NOT_RUN);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_have_passed_status_when_scenario_has_only_passed_steps() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withStep(StepStatus.PASSED)
            .withStep(StepStatus.PASSED)
            .withAfterAction(StepStatus.PASSED)
            .withAfterAction(StepStatus.PASSED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.PASSED);
        assertThat(scenario.isReviewed()).isTrue();
    }

    @Test
    void should_have_failed_status_when_scenario_has_at_least_one_failed_before_action() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBeforeAction(StepStatus.FAILED)
            .withBackgroundStep(StepStatus.SKIPPED)
            .withStep(StepStatus.SKIPPED)
            .withAfterAction(StepStatus.SKIPPED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.FAILED);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_have_failed_status_when_scenario_has_at_least_one_failed_after_action() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withStep(StepStatus.PASSED)
            .withAfterAction(StepStatus.PASSED)
            .withAfterAction(StepStatus.FAILED)
            .withAfterAction(StepStatus.SKIPPED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.FAILED);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_have_failed_status_when_scenario_has_at_least_one_failed_background_step() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.FAILED)
            .withBackgroundStep(StepStatus.SKIPPED)
            .withStep(StepStatus.SKIPPED)
            .withAfterAction(StepStatus.SKIPPED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.FAILED);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_have_failed_status_when_scenario_has_at_least_one_undefined_step() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withStep(StepStatus.PASSED)
            .withStep(StepStatus.UNDEFINED)
            .withAfterAction(StepStatus.PASSED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.FAILED);
    }

    @Test
    void should_have_pending_status_when_scenario_has_at_least_one_pending_step() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withStep(StepStatus.PASSED)
            .withStep(StepStatus.PENDING)
            .withStep(StepStatus.SKIPPED)
            .withAfterAction(StepStatus.PASSED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.PENDING);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_have_not_run_status_when_scenario_has_only_skipped_steps() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withStep(StepStatus.SKIPPED)
            .withStep(StepStatus.SKIPPED)
            .withStep(StepStatus.SKIPPED)
            .withAfterAction(StepStatus.PASSED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.NOT_RUN);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_have_not_run_status_when_scenario_has_only_not_run_steps() {
        // given
        final StatusTestScenarioBuilder builder = new StatusTestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBackgroundStep(StepStatus.PASSED)
            .withStep(StepStatus.NOT_RUN)
            .withStep(StepStatus.NOT_RUN)
            .withStep(StepStatus.NOT_RUN)
            .withAfterAction(StepStatus.PASSED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.NOT_RUN);
        assertThat(scenario.isReviewed()).isFalse();
    }

    @Test
    void should_merge_scenarii() {
        // given
        final String testRunId = UUID.randomUUID().toString();
        final String featureId = UUID.randomUUID().toString();
        final String scenarioKey = UUID.randomUUID().toString();

        final Scenario receivingScenario = new ScenarioBuilder()
            .withTestRunId(testRunId)
            .withFeatureId(featureId)
            .withScenarioKey(scenarioKey)
            .withLanguage("en")
            .withInfo(new BasicInfo("Feature A", "Feature name A"))
            .addStep(sb -> sb.withInfo(new BasicInfo("Step", "Step E")).withStatus(StepStatus.PASSED))
            .build();

        final Scenario inputScenario = new ScenarioBuilder()
            .withTestRunId(testRunId)
            .withFeatureId(featureId)
            .withScenarioKey(scenarioKey)
            .withLanguage("en")
            .withInfo(new BasicInfo("Feature B", "Feature name B"))
            .withComment("Feature comment")
            .withTags(Collections.singleton("toto"))
            .withExtraTags(Collections.singleton("tutu"))
            .addBeforeAction(sb -> sb.withStatus(StepStatus.FAILED).withErrorMessage("Error A"))
            .withBackground(bb -> {
                bb.withInfo(new BasicInfo("Background", "Background C"));
                bb.addStep(sb -> {
                    sb.withInfo(new BasicInfo("Step", "Step D"))
                        .withStatus(StepStatus.FAILED)
                        .withErrorMessage("Error B")
                        .withOutput("Failed output")
                        .withComment("Comment A");
                });
            })
            .addStep(sb -> sb.withInfo(new BasicInfo("Step", "Step E")).withStatus(StepStatus.FAILED).withErrorMessage("Error C").withComment("Comment B"))
            .addAfterAction(sb -> sb.withStatus(StepStatus.FAILED).withErrorMessage("Error D"))
            .build();

        inputScenario.doIgnoringChanges(s -> s.setReviewed(true));

        // when
        receivingScenario.mergeWith(inputScenario);

        // then
        assertThat(receivingScenario).usingRecursiveComparison()
            .ignoringFields("id", "createdAt", "modifiedAt", "background", "steps", "beforeActions", "afterActions", "reviewed", "changes")
            .isEqualTo(inputScenario);

        assertThat(receivingScenario.getId()).isNotEqualTo(inputScenario.getId());
        assertThat(receivingScenario.getModifiedAt()).isAfter(inputScenario.getModifiedAt());
        assertThat(receivingScenario.isReviewed()).isFalse();

        assertThat(receivingScenario.getBeforeActions()).usingRecursiveComparison().isEqualTo(inputScenario.getBeforeActions());

        assertThat(receivingScenario.getBackground()).isNotNull();
        assertThat(receivingScenario.getBackground().getSteps()).usingRecursiveComparison().isEqualTo(inputScenario.getBackground().getSteps());

        assertThat(receivingScenario.getSteps()).usingRecursiveComparison().isEqualTo(inputScenario.getSteps());

        assertThat(receivingScenario.getAfterActions()).usingRecursiveComparison().isEqualTo(inputScenario.getAfterActions());

        // Removing previous changes that must be ignored

        assertThat(receivingScenario.getChanges()).isNotEmpty();

        assertThat(receivingScenario.getChanges())
            .filteredOn(change -> change instanceof ScenarioStatusChange)
            .hasSize(1);

        final Optional<ScenarioStatusChange> scenarioStatusChange = receivingScenario.getChanges().stream()
            .filter(change -> change instanceof ScenarioStatusChange)
            .map(ScenarioStatusChange.class::cast)
            .findFirst();

        assertThat(scenarioStatusChange).hasValueSatisfying(change -> {
            assertThat(change.getOldValue()).isEqualTo(ScenarioStatus.PASSED);
            assertThat(change.getNewValue()).isEqualTo(ScenarioStatus.FAILED);
        });

        assertThat(receivingScenario.getChanges())
            .filteredOn(change -> change instanceof ScenarioReviewedStateChange)
            .hasSize(1);

        final Optional<ScenarioReviewedStateChange> scenarioReviewedStateChange = receivingScenario.getChanges().stream()
            .filter(change -> change instanceof ScenarioReviewedStateChange)
            .map(ScenarioReviewedStateChange.class::cast)
            .findFirst();

        assertThat(scenarioReviewedStateChange).hasValueSatisfying(change -> {
            assertThat(change.getOldValue()).isTrue();
            assertThat(change.getNewValue()).isFalse();
        });
    }

    @Test
    void should_add_status_change_on_set_status() {
        // given
        final Scenario scenario = new StatusTestScenarioBuilder()
            .withStep(StepStatus.NOT_RUN)
            .build();

        final ScenarioStatus newStatus = ScenarioStatus.PASSED;

        // when
        scenario.setStatus(newStatus);

        // then
        assertThat(scenario.getStatus()).isEqualTo(newStatus);

        assertThat(scenario.getChanges()).hasSize(1);

        final ScenarioChange<?> change = scenario.getChanges().get(0);
        assertThat(change).isInstanceOf(ScenarioStatusChange.class);

        final ScenarioStatusChange scenarioStatusChange = (ScenarioStatusChange) change;
        assertThat(scenarioStatusChange.getId()).isNotNull();
        assertThat(scenarioStatusChange.getType()).isEqualTo(ScenarioChange.ChangeType.STATUS);
        assertThat(scenarioStatusChange.getDate()).isNotNull();
        assertThat(scenarioStatusChange.getOldValue()).isEqualTo(ScenarioStatus.NOT_RUN);
        assertThat(scenarioStatusChange.getNewValue()).isEqualTo(newStatus);
    }

    @Test
    void should_reviewed_state_status_change_on_set_reviewed() {
        // given
        final Scenario scenario = new StatusTestScenarioBuilder()
            .withStep(StepStatus.NOT_RUN)
            .build();

        // when
        scenario.setReviewed(true);

        // then
        assertThat(scenario.isReviewed()).isTrue();

        assertThat(scenario.getChanges()).hasSize(1);

        final ScenarioChange<?> change = scenario.getChanges().get(0);
        assertThat(change).isInstanceOf(ScenarioReviewedStateChange.class);

        final ScenarioReviewedStateChange scenarioReviewedStateChange = (ScenarioReviewedStateChange) change;
        assertThat(scenarioReviewedStateChange.getId()).isNotNull();
        assertThat(scenarioReviewedStateChange.getType()).isEqualTo(ScenarioChange.ChangeType.REVIEWED_STATE);
        assertThat(scenarioReviewedStateChange.getDate()).isNotNull();
        assertThat(scenarioReviewedStateChange.getOldValue()).isFalse();
        assertThat(scenarioReviewedStateChange.getNewValue()).isTrue();
    }

    @Test
    void should_not_add_changes_on_ignore_changes() {
        // given
        final Scenario scenario = new StatusTestScenarioBuilder()
            .withStep(StepStatus.NOT_RUN)
            .build();

        // when
        scenario.doIgnoringChanges(s -> {
            s.setStatus(ScenarioStatus.PASSED);
            s.setReviewed(true);
        });

        // then
        assertThat(scenario.getChanges()).isEmpty();
    }

    private static class StatusTestScenarioBuilder {

        private final ScenarioBuilder scenarioBuilder = new ScenarioBuilder()
            .withTestRunId(UUID.randomUUID().toString())
            .withFeatureId(UUID.randomUUID().toString())
            .withScenarioKey(UUID.randomUUID().toString())
            .withLanguage("en")
            .withInfo(new BasicInfo("Feature", "Test"));

        private Consumer<BackgroundBuilder> backgroundBuilderConsumer;

        public StatusTestScenarioBuilder withBeforeAction(final StepStatus status) {
            scenarioBuilder.addBeforeAction(aab -> aab.withStatus(status));
            return this;
        }

        public StatusTestScenarioBuilder withAfterAction(final StepStatus status) {
            scenarioBuilder.addAfterAction(aab -> aab.withStatus(status));
            return this;
        }

        public StatusTestScenarioBuilder withBackgroundStep(final StepStatus status) {
            if (backgroundBuilderConsumer == null) {
                backgroundBuilderConsumer = bb -> bb.withInfo(new BasicInfo("Background", "Test"));
            }

            backgroundBuilderConsumer = backgroundBuilderConsumer.andThen(bb -> {
                bb.addStep(sb -> sb.withInfo(new BasicInfo("Step", "Test")).withStatus(status));
            });

            return this;
        }

        public StatusTestScenarioBuilder withStep(final StepStatus status) {
            scenarioBuilder.addStep(sb -> sb.withInfo(new BasicInfo("Step", "Test")).withStatus(status));
            return this;
        }

        public Scenario build() {
            if (backgroundBuilderConsumer != null) {
                scenarioBuilder.withBackground(backgroundBuilderConsumer);
            }
            return scenarioBuilder.build();
        }

    }

}
