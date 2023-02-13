package io.zucchiniui.backend.shared.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocationPropertiesTest {

    @Test
    public void arguments_with_same_values_should_be_equal() {
        final String filename = "filename.txt";
        final int line = 10;
        final Location leftLocation = new Location(filename, line);
        final Location rightLocation = new Location(filename, line);

        assertThat(leftLocation).isEqualTo(rightLocation);
        assertThat(leftLocation.hashCode()).isEqualTo(rightLocation.hashCode());
    }

    @Test
    public void arguments_with_different_line_numbers_should_not_be_equal() {
        final int leftLine = 5;
        final int rightLine = 11;

        final String filename = "value";
        final Location leftLocation = new Location(filename, leftLine);
        final Location rightLocation = new Location(filename, rightLine);

        assertThat(leftLocation).isNotEqualTo(rightLocation);
    }

    @Test
    public void arguments_with_different_filenames_should_not_be_equal() {
        final String leftFilename = "leftFilename.txt";
        final String rightFilename = "rightFilename.txt";

        final int line = 6;
        final Location leftLocation = new Location(leftFilename, line);
        final Location rightLocation = new Location(rightFilename, line);

        assertThat(leftLocation).isNotEqualTo(rightLocation);
    }

}
