package example.reporting.testrun;

import example.reporting.api.testrun.TestRun;
import example.reporting.api.testrun.TestRunStatus;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;


@Component
class TestRunFactory {

    public TestRun create(final String env) {
        final TestRun testRun = new TestRun();
        testRun.setId(UUID.randomUUID().toString());
        testRun.setDate(new Date());
        testRun.setEnv(env);
        testRun.setStatus(TestRunStatus.OPEN);
        return testRun;
    }

}
