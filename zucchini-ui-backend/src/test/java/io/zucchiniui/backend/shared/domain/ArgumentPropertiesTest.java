package io.zucchiniui.backend.shared.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ArgumentPropertiesTest {

    @Test
    void arguments_with_same_values_should_be_equal() {
        final int offset = 5;
        final String value = "value";
        final Argument leftArgument = new Argument(offset, value);
        final Argument rightArgument = new Argument(offset, value);

        assertThat(leftArgument).isEqualTo(rightArgument);
        assertThat(leftArgument.hashCode()).isEqualTo(rightArgument.hashCode());
    }

    @Test
    void arguments_with_different_offsets_should_not_be_equal() {
        final int leftOffset = 5;
        final int rightOffset = 10;

        final String value = "value";
        final Argument leftArgument = new Argument(leftOffset, value);
        final Argument rightArgument = new Argument(rightOffset, value);

        assertThat(leftArgument).isNotEqualTo(rightArgument);
    }

    @Test
    public void arguments_with_different_values_should_not_be_equal() {
        final String leftValue = "left";
        final String rightValue = "right";

        final int offset = 5;
        final Argument leftArgument = new Argument(offset, leftValue);
        final Argument rightArgument = new Argument(offset, rightValue);

        assertThat(leftArgument).isNotEqualTo(rightArgument);
    }

}
