package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.feature.views.FeatureStats;
import io.testscucumber.backend.feature.views.FeatureViewAccess;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TestRunViewAccess {

    private final FeatureViewAccess featureViewAccess;

    private final ScenarioViewAccess scenarioViewAccess;

    @Autowired
    public TestRunViewAccess(final FeatureViewAccess featureViewAccess, final ScenarioViewAccess scenarioViewAccess) {
        this.featureViewAccess = featureViewAccess;
        this.scenarioViewAccess = scenarioViewAccess;
    }

    public FeatureStats getStatsForFeaturesByTestRunId(final String testRunId) {
        return featureViewAccess.getStats(q -> q.withTestRunId(testRunId));
    }

    public ScenarioStats getStatsForScenariiByTestRunId(final String testRunId) {
        return scenarioViewAccess.getStats(q -> q.withTestRunId(testRunId));
    }

}
