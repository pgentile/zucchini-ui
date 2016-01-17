package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.feature.views.FeatureViewAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class TestRunViewAccess {

    private final FeatureViewAccess featureViewAccess;

    @Autowired
    public TestRunViewAccess(final FeatureViewAccess featureViewAccess) {
        this.featureViewAccess = featureViewAccess;
    }

    public TestRunStats getStatsForFeatureById(final String testRunId) {
        final Map<FeatureStatus, Integer> statsByStatus = new EnumMap<>(FeatureStatus.class);
        for (final FeatureStatus status : FeatureStatus.values()) {
            statsByStatus.put(status, 0);
        }

        final List<FeatureStatus> scenariiStatus = featureViewAccess.getFeaturesStatusByTestRunId(testRunId);
        scenariiStatus.forEach(status -> statsByStatus.compute(status, (key, count) -> count + 1));
        return new TestRunStats(scenariiStatus.size(), statsByStatus);
    }


}
