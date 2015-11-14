package example.reporting.testrun;

import example.reporting.testrun.dao.TestRunDAO;
import example.reporting.testrun.model.TestRun;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestRunService {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestRunService.class);

    private final TestRunDAO testRunDAO;

    public TestRunService(final TestRunDAO testRunDAO) {
        this.testRunDAO = testRunDAO;
    }

    public void save(final TestRun testRun) {
        LOGGER.info("Saving test run {}", testRun.getId());

        testRunDAO.save(testRun);
    }

}
