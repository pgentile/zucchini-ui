package example.reporting.testrun.domain;

import example.reporting.testrun.model.TestRun;

import java.util.Date;
import java.util.UUID;

public class TestRunFactory {

    public TestRun create(final String env) {
        final TestRun testRun = new TestRun();
        testRun.setId("TEST-RUN-" + UUID.randomUUID().toString());
        testRun.setDate(new Date());
        testRun.setEnv(env);
        return testRun;
    }

}
