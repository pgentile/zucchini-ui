package io.testscucumber.backend.testrun.domainimpl;

import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import io.testscucumber.backend.testrun.domain.TestRunService;
import org.springframework.stereotype.Component;

@Component
class TestRunServiceImpl implements TestRunService {

    private final TestRunRepository testRunRepository;

    private final FeatureService featureService;

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
