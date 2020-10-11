package io.zucchiniui.backend.shared.domain;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ArgumentTest {

    @Test
    void should_create_argument() {
        // given
        final int offset = 99;
        final String value = "arg";

        // when
        final Argument argument = new Argument(offset, value);

        // then
        assertThat(argument.getOffset()).isEqualTo(offset);
        assertThat(argument.getValue()).isEqualTo(value);
    }

}
