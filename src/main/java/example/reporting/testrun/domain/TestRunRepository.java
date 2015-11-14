package example.reporting.testrun.domain;

import example.reporting.testrun.model.TestRun;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestRunRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestRunRepository.class);

    private final TestRunDAO testRunDAO;

    public TestRunRepository(final TestRunDAO testRunDAO) {
        this.testRunDAO = testRunDAO;
    }

    public void save(final TestRun testRun) {
        LOGGER.info("Saving test run {}", testRun.getId());

        testRunDAO.save(testRun);
    }

}
