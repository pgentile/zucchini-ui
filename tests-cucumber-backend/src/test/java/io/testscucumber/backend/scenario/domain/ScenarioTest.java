package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.BasicInfo;
import org.junit.Test;

import java.util.UUID;
import java.util.function.Consumer;

import static org.assertj.core.api.Assertions.assertThat;

public class ScenarioTest {

    @Test
    public void should_have_not_run_status_when_scenario_has_nothing() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder();

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.NOT_RUN);
    }

    @Test
    public void should_have_passed_status_when_scenario_has_only_passed_steps() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    }

    @Test
    public void should_have_failed_status_when_scenario_has_at_least_one_failed_before_action() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
            .withBeforeAction(StepStatus.PASSED)
            .withBeforeAction(StepStatus.FAILED)
            .withBackgroundStep(StepStatus.SKIPPED)
            .withStep(StepStatus.SKIPPED)
            .withAfterAction(StepStatus.SKIPPED);

        // when
        final Scenario scenario = builder.build();

        // then
        assertThat(scenario.getStatus()).isEqualTo(ScenarioStatus.FAILED);
    }

    @Test
    public void should_have_failed_status_when_scenario_has_at_least_one_failed_after_action() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    }

    @Test
    public void should_have_failed_status_when_scenario_has_at_least_one_failed_background_step() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    }

    @Test
    public void should_have_failed_status_when_scenario_has_at_least_one_undefined_step() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    public void should_have_pending_status_when_scenario_has_at_least_one_pending_step() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    }

    @Test
    public void should_have_not_run_status_when_scenario_has_only_skipped_steps() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    }

    @Test
    public void should_have_not_run_status_when_scenario_has_only_not_run_steps() throws Exception {
        // given
        final TestScenarioBuilder builder = new TestScenarioBuilder()
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
    }

    private static class TestScenarioBuilder {

        private final ScenarioBuilder scenarioBuilder = new ScenarioBuilder()
            .withTestRunId(UUID.randomUUID().toString())
            .withFeatureId(UUID.randomUUID().toString())
            .withScenarioKey(UUID.randomUUID().toString())
            .withInfo(new BasicInfo("Feature", "Test"));

        private Consumer<BackgroundBuilder> backgroundBuilderConsumer;

        public TestScenarioBuilder withBeforeAction(final StepStatus status) {
            scenarioBuilder.addBeforeAction(aab -> aab.withStatus(status));
            return this;
        }

        public TestScenarioBuilder withAfterAction(final StepStatus status) {
            scenarioBuilder.addAfterAction(aab -> aab.withStatus(status));
            return this;
        }

        public TestScenarioBuilder withBackgroundStep(final StepStatus status) {
            if (backgroundBuilderConsumer == null) {
                backgroundBuilderConsumer = bb -> bb.withInfo(new BasicInfo("Background", "Test"));
            }

            backgroundBuilderConsumer = backgroundBuilderConsumer.andThen(bb -> {
                bb.addStep(sb -> sb.withInfo(new BasicInfo("Step", "Test")).withStatus(status));
            });

            return this;
        }

        public TestScenarioBuilder withStep(final StepStatus status) {
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
