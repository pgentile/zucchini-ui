package io.testscucumber.backend.testrun.domainimpl;

import com.google.common.base.Strings;
import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import io.testscucumber.backend.testrun.domain.TestRunService;
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
    public void updateType(final String testRunId, final String newType) {
        final TestRun testRun = testRunRepository.getById(testRunId);
        testRun.setType(Strings.nullToEmpty(newType));
        testRunRepository.save(testRun);
    }

    @Override
    public void deleteById(final String testRunId) {
        featureService.deleteByTestRunId(testRunId);

        final TestRun testRun = testRunRepository.getById(testRunId);
        testRunRepository.delete(testRun);
    }

}
