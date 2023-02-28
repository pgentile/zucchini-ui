package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class StepTest {

    @Test
    void should_change_status() {
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
    void should_copy_step() {
        // given
        final Step step = createStep();

        // when
        final Step stepCopy = step.copy();

        // then
        assertThat(stepCopy).isNotSameAs(step);
        assertThat(stepCopy).usingRecursiveComparison().isEqualTo(step);
    }

    private static Step createStep() {
        return new StepBuilder()
            .withInfo(new BasicInfo("Step", "step1"))
            .withStatus(StepStatus.FAILED)
            .withErrorMessage("error")
            .withComment("comment")
            .withOutput("output")
            .build();
    }

}
