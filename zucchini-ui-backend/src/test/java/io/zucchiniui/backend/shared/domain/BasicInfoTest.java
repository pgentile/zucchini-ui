package io.zucchiniui.backend.shared.domain;

import com.google.common.collect.Lists;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class BasicInfoTest {

    private static final String KEYWORD = "keyword";

    private static final String NAME = "name";

    @Test
    void should_create_info_with_no_arguments() {
        // given

        // when
        final BasicInfo info = new BasicInfo(KEYWORD, NAME);

        // then
        assertThat(info.getKeyword()).isEqualTo(KEYWORD);
        assertThat(info.getName()).isEqualTo(NAME);
        assertThat(info.getArguments()).isEmpty();
    }

    @Test
    void should_create_info_with_some_arguments() {
        // given
        final List<Argument> arguments = Lists.newArrayList(
            new Argument(0, "toto"),
            new Argument(10, "tutu")
        );

        // when
        final BasicInfo info = new BasicInfo(KEYWORD, NAME, arguments);

        // then
        assertThat(info.getKeyword()).isEqualTo(KEYWORD);
        assertThat(info.getName()).isEqualTo(NAME);
    }

}
