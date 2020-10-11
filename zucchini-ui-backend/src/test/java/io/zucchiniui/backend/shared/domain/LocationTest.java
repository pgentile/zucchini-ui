package io.zucchiniui.backend.shared.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class LocationTest {

    private static final String FILENAME = "filename";

    private static final int LINE = 5;

    @Test
    void should_create_location() {
        // given

        // when
        final Location location = new Location(FILENAME, LINE);

        // then
        assertThat(location.getFilename()).isEqualTo(FILENAME);
        assertThat(location.getLine()).isEqualTo(LINE);
    }

}
