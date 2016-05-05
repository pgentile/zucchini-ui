package io.testscucumber.backend.shared.domain;

import com.pholser.junit.quickcheck.Property;
import com.pholser.junit.quickcheck.generator.InRange;
import com.pholser.junit.quickcheck.runner.JUnitQuickcheck;
import org.junit.runner.RunWith;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assume.assumeFalse;
import static org.junit.Assume.assumeTrue;

@RunWith(JUnitQuickcheck.class)
public class ArgumentPropertiesTest {

    @Property
    public void arguments_with_same_values_should_be_equal(
        @InRange(minInt = 0) final int offset,
        final String value
    ) throws Exception {
        final Argument leftArgument = new Argument(offset, value);
        final Argument rightArgument = new Argument(offset, value);

        assertThat(leftArgument).isEqualTo(rightArgument);
        assertThat(leftArgument.hashCode()).isEqualTo(rightArgument.hashCode());
    }

    @Property
    public void arguments_with_different_offsets_should_not_be_equal(
        @InRange(minInt = 0) final int leftOffset,
        @InRange(minInt = 0) final int rightOffset
    ) throws Exception {
        assumeTrue(leftOffset != rightOffset);

        final String value = "value";
        final Argument leftArgument = new Argument(leftOffset, value);
        final Argument rightArgument = new Argument(rightOffset, value);

        assertThat(leftArgument).isNotEqualTo(rightArgument);
    }

    @Property
    public void arguments_with_different_values_should_not_be_equal(
        final String leftValue,
        final String rightValue
    ) throws Exception {
        assumeFalse(leftValue.equals(rightValue));

        final int offset = 5;
        final Argument leftArgument = new Argument(offset, leftValue);
        final Argument rightArgument = new Argument(offset, rightValue);

        assertThat(leftArgument).isNotEqualTo(rightArgument);
    }

}
