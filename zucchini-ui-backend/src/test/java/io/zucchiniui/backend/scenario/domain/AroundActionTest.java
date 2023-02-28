package io.zucchiniui.backend.scenario.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AroundActionTest {

    @Test
    void should_create_around_action_without_error_message_using_builder() {
        // given
        final StepStatus step = StepStatus.PASSED;

        final AroundActionBuilder builder = new AroundActionBuilder()
            .withStatus(step);

        // when
        final AroundAction aroundAction = builder.build();

        // then
        assertThat(aroundAction.getStatus()).isEqualTo(step);
        assertThat(aroundAction.getErrorMessage()).isNull();
    }

    @Test
    void should_create_around_action_with_error_message_using_builder() {
        // given
        final String errorMessage = "error";
        final StepStatus step = StepStatus.FAILED;

        final AroundActionBuilder builder = new AroundActionBuilder()
            .withErrorMessage(errorMessage)
            .withStatus(step);

        // when
        final AroundAction aroundAction = builder.build();

        // then
        assertThat(aroundAction.getStatus()).isEqualTo(step);
        assertThat(aroundAction.getErrorMessage()).isEqualTo(errorMessage);
    }

    @Test
    void should_change_status_to_passed_on_failed_around_action() {
        // given

        final AroundAction aroundAction = new AroundActionBuilder()
            .withErrorMessage("error")
            .withStatus(StepStatus.FAILED)
            .build();

        final StepStatus newStatus = StepStatus.PASSED;

        // when
        aroundAction.setStatus(newStatus);

        // then
        assertThat(aroundAction.getStatus()).isEqualTo(newStatus);
        assertThat(aroundAction.getErrorMessage()).isNull();
    }

    @Test
    void should_change_status_to_failed_on_passed_around_action() {
        // given

        final AroundAction aroundAction = new AroundActionBuilder()
            .withStatus(StepStatus.PASSED)
            .build();

        final StepStatus newStatus = StepStatus.FAILED;

        // when
        aroundAction.setStatus(newStatus);

        // then
        assertThat(aroundAction.getStatus()).isEqualTo(newStatus);
        assertThat(aroundAction.getErrorMessage()).isNull();
    }

    @Test
    void should_copy_around_action() {
        // given

        final AroundAction aroundAction = new AroundActionBuilder()
            .withErrorMessage("error")
            .withStatus(StepStatus.FAILED)
            .build();

        // when
        final AroundAction aroundActionCopy = aroundAction.copy();

        // then
        assertThat(aroundActionCopy.getStatus()).isEqualTo(aroundAction.getStatus());
        assertThat(aroundActionCopy.getErrorMessage()).isEqualTo(aroundAction.getErrorMessage());
    }

}
