package io.zucchiniui.backend.shared.domain;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ArgumentTest {

    @Test
    public void should_create_argument() throws Exception {
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
