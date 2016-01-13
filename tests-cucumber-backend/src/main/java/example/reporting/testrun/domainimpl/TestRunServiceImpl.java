package example.reporting.testrun.domainimpl;

import example.reporting.feature.domain.FeatureService;
import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunRepository;
import example.reporting.testrun.domain.TestRunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class TestRunServiceImpl implements TestRunService {

    private final TestRunRepository testRunRepository;

    private final FeatureService featureService;

    @Autowired
    public TestRunServiceImpl(final TestRunRepository testRunRepository, final FeatureService featureService) {
        this.testRunRepository = testRunRepository;
        this.featureService = featureService;
    }

    @Override
    public void deleteById(final String testRunId) {
        featureService.deleteByTestRunId(testRunId);

        final TestRun testRun = testRunRepository.getById(testRunId);
        testRunRepository.delete(testRun);
    }

}
