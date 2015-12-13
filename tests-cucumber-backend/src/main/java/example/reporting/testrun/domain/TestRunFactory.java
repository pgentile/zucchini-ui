package example.reporting.testrun.domain;

import example.reporting.testrun.model.TestRun;
import example.reporting.testrun.model.TestRunStatus;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;


@Component
public class TestRunFactory {

    public TestRun create(final String env) {
        final TestRun testRun = new TestRun();
        testRun.setId(UUID.randomUUID().toString());
        testRun.setDate(new Date());
        testRun.setEnv(env);
        testRun.setStatus(TestRunStatus.OPEN);
        return testRun;
    }

}
