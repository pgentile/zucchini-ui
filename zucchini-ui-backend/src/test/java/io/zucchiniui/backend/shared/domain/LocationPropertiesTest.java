package io.zucchiniui.backend.shared.domain;

import com.pholser.junit.quickcheck.Property;
import com.pholser.junit.quickcheck.generator.InRange;
import com.pholser.junit.quickcheck.runner.JUnitQuickcheck;
import org.junit.runner.RunWith;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assume.assumeFalse;
import static org.junit.Assume.assumeTrue;

@RunWith(JUnitQuickcheck.class)
public class LocationPropertiesTest {

    @Property
    public void arguments_with_same_values_should_be_equal(
        final String filename,
        @InRange(minInt = 1) final int line
    ) throws Exception {
        final Location leftLocation = new Location(filename, line);
        final Location rightLocation = new Location(filename, line);

        assertThat(leftLocation).isEqualTo(rightLocation);
        assertThat(leftLocation.hashCode()).isEqualTo(rightLocation.hashCode());
    }

    @Property
    public void arguments_with_different_line_numbers_should_not_be_equal(
        @InRange(minInt = 1) final int leftLine,
        @InRange(minInt = 1) final int rightLine
    ) throws Exception {
        assumeTrue(leftLine != rightLine);

        final String filename = "value";
        final Location leftLocation = new Location(filename, leftLine);
        final Location rightLocation = new Location(filename, rightLine);

        assertThat(leftLocation).isNotEqualTo(rightLocation);
    }

    @Property
    public void arguments_with_different_filenames_should_not_be_equal(
       final String leftFilename,
       final String rightFilename
    ) throws Exception {
        assumeFalse(leftFilename.equals(rightFilename));

        final int line = 6;
        final Location leftLocation = new Location(leftFilename, line);
        final Location rightLocation = new Location(rightFilename, line);

        assertThat(leftLocation).isNotEqualTo(rightLocation);
    }

}
