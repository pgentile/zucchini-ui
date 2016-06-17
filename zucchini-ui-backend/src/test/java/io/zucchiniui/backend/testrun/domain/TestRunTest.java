package io.zucchiniui.backend.testrun.domain;

import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class TestRunTest {

    @Test
    public void should_create_test_run() throws Exception {
        // given
        final ZonedDateTime testStartDate = ZonedDateTime.now();
        final String type = "TYPE";

        // when
        final TestRun testRun = new TestRun(type);

        // then
        assertThat(testRun.getId()).isNotEmpty();
        assertThat(testRun.getType()).isEqualTo(type);
        assertThat(testRun.getDate()).isAfterOrEqualTo(testStartDate);

        assertThat(testRun.getEntityId()).isEqualTo(testRun.getId());
    }

    @Test
    public void should_change_type() throws Exception {
        // given
        final TestRun testRun = new TestRun("OLD_TYPE");

        final String newType = "TYPE";

        // when
        testRun.setType(newType);

        // then
        assertThat(testRun.getType()).isEqualTo(newType);
    }

    @Test
    public void should_change_labels() throws Exception {
        // given
        final TestRun testRun = new TestRun("TYPE");

        final List<Label> oldLabels = Arrays.asList(
            new Label("label1", "titi"),
            new Label("label2", "toto", "http://example.org")
        );

        testRun.setLabels(oldLabels);

        final List<Label> newLabels = Arrays.asList(
            new Label("label3", "tata", "http://example.org/new"),
            new Label("label4", "tete"),
            new Label("label5", "xxx")
        );

        // when
        testRun.setLabels(newLabels);

        // then
        Assertions.assertThat(testRun.getLabels())
            .doesNotContainAnyElementsOf(oldLabels)
            .containsExactlyElementsOf(newLabels);
    }

}
