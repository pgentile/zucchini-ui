package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BackgroundTest {

    @Test
    public void should_change_step_status_on_background_status_change() throws Exception {
        // given
        final Background background = createBackground();

        final StepStatus newStatus = StepStatus.PASSED;

        // when
        background.setStatus(newStatus);

        // then
        assertThat(background.getSteps()).extracting(Step::getStatus).containsOnly(newStatus);
    }

    @Test
    public void should_copy_background() throws Exception {
        // given
        final Background background = createBackground();

        // when
        final Background backgroundCopy = background.copy();

        // then
        assertThat(backgroundCopy).isNotSameAs(background);
        assertThat(backgroundCopy.getInfo()).isEqualTo(background.getInfo());
        assertThat(backgroundCopy.getSteps()).hasSameSizeAs(background.getSteps());

        for (int i = 0; i < backgroundCopy.getSteps().size(); i++) {
            final Step stepCopy = backgroundCopy.getSteps().get(i);
            final Step step = background.getSteps().get(i);

            assertThat(stepCopy).isNotSameAs(step);
            assertThat(stepCopy).usingRecursiveComparison().isEqualTo(step);
        }

    }

    private static Background createBackground() {
        return new BackgroundBuilder()
            .withInfo(new BasicInfo("Background", "test"))
            .addStep(stepBuilder -> stepBuilder.withInfo(new BasicInfo("Step", "step 1")).withStatus(StepStatus.PASSED))
            .addStep(stepBuilder -> stepBuilder.withInfo(new BasicInfo("Step", "step 2")).withStatus(StepStatus.PASSED))
            .addStep(stepBuilder -> stepBuilder.withInfo(new BasicInfo("Step", "step 3")).withStatus(StepStatus.FAILED).withErrorMessage("error"))
            .build();
    }

}
