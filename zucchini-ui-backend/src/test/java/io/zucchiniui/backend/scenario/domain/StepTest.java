package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class StepTest {

    @Test
    public void should_change_status() throws Exception {
        // given
        final Step step = createStep();

        final StepStatus newStatus = StepStatus.PASSED;

        // when
        step.setStatus(newStatus);

        // then
        assertThat(step.getStatus()).isEqualTo(newStatus);
        assertThat(step.getErrorMessage()).isNull();
    }

    @Test
    public void should_copy_step() throws Exception {
        // given
        final Step step = createStep();

        // when
        final Step stepCopy = step.copy();

        // then
        assertThat(stepCopy).isNotSameAs(step);
        assertThat(stepCopy).isEqualToComparingFieldByField(step);
    }

    private static Step createStep() {
        return new StepBuilder()
            .withInfo(new BasicInfo("Step", "step1"))
            .withStatus(StepStatus.FAILED)
            .withErrorMessage("error")
            .withComment("comment")
            .build();
    }

}
