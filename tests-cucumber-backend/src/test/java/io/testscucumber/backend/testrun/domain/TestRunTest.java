package io.testscucumber.backend.testrun.domain;

import org.junit.Test;

import java.time.ZonedDateTime;

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

}
