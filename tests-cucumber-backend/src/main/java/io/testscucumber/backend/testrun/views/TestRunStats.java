package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;

import java.util.EnumMap;
import java.util.Map;

public class TestRunStats {

    private int featureCount;

    private final Map<FeatureStatus, Integer> statsByStatus;

    public TestRunStats() {
        statsByStatus = new EnumMap<>(FeatureStatus.class);
    }

    public TestRunStats(final int featureCount, final Map<FeatureStatus, Integer> statsByStatus) {
        this.featureCount = featureCount;
        this.statsByStatus = new EnumMap<>(statsByStatus);
    }

    public int getFeatureCount() {
        return featureCount;
    }

    public void setFeatureCount(final int featureCount) {
        this.featureCount = featureCount;
    }

    public Map<FeatureStatus, Integer> getStatsByStatus() {
        return statsByStatus;
    }

    public void setStatsByStatus(final Map<FeatureStatus, Integer> statsByStatus) {
        this.statsByStatus.clear();
        this.statsByStatus.putAll(statsByStatus);
    }

}
