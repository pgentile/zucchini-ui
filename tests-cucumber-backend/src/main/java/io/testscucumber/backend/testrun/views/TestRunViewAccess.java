package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.feature.views.FeatureStats;
import io.testscucumber.backend.feature.views.FeatureViewAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TestRunViewAccess {

    private final FeatureViewAccess featureViewAccess;

    @Autowired
    public TestRunViewAccess(final FeatureViewAccess featureViewAccess) {
        this.featureViewAccess = featureViewAccess;
    }

    public FeatureStats getStatsForFeaturesByTestRunId(final String testRunId) {
        return featureViewAccess.getStats(q -> q.withTestRunId(testRunId));
    }

}
