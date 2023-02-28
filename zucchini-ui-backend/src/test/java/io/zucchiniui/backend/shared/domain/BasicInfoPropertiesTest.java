package io.zucchiniui.backend.shared.domain;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class BasicInfoPropertiesTest {

    @Test
    void infos_with_same_values_should_be_equal() {
        final String keyword = "Soit";
        final String name = "un superbe test";

        final List<Argument> arguments = List.of(
            new Argument(15, "arg1"),
            new Argument(18, "arg2")
        );

        final BasicInfo leftInfo = new BasicInfo(
            keyword,
            name,
            arguments
        );

        final BasicInfo rightInfo = new BasicInfo(
            keyword,
            name,
            arguments
        );

        assertThat(leftInfo).isEqualTo(rightInfo);
        assertThat(leftInfo.hashCode()).isEqualTo(rightInfo.hashCode());
    }

}
