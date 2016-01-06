package example.reporting.testrun;

import example.reporting.api.testrun.TestRun;
import example.reporting.api.testrun.TestRunStatus;
import org.springframework.stereotype.Component;

@Component
class TestRunService {

    public void close(TestRun testRun) {
        if (testRun.getStatus() != TestRunStatus.OPEN) {
            throw new IllegalStateException("Test run '" + testRun.getId() + "' not in open state");
        }
    }

}
