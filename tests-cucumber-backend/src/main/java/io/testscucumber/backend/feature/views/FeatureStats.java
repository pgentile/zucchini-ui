package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;

import java.util.EnumMap;
import java.util.Map;

public class FeatureStats {

    private int count;

    private final Map<FeatureStatus, Integer> statsByStatus;

    public FeatureStats() {
        statsByStatus = new EnumMap<>(FeatureStatus.class);
        for (final FeatureStatus status : FeatureStatus.values()) {
            statsByStatus.put(status, 0);
        }
    }

    public void addFeatureStatus(final FeatureStatus status) {
        statsByStatus.compute(status, (key, count) -> count + 1);
        count++;
    }

    public int getCount() {
        return count;
    }

    public Map<FeatureStatus, Integer> getStatsByStatus() {
        return statsByStatus;
    }

}
