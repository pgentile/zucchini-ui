package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;

import java.util.EnumMap;
import java.util.Map;

public class ScenarioStats {

    private int count;

    private final Map<ScenarioStatus, Integer> statsByStatus;

    public ScenarioStats() {
        statsByStatus = new EnumMap<>(ScenarioStatus.class);
        for (final ScenarioStatus status : ScenarioStatus.values()) {
            statsByStatus.put(status, 0);
        }
    }

    public void addScenarioStatus(final ScenarioStatus status) {
        statsByStatus.compute(status, (key, count) -> count + 1);
        count++;
    }

    public int getCount() {
        return count;
    }

    public Map<ScenarioStatus, Integer> getStatsByStatus() {
        return statsByStatus;
    }

    public FeatureStatus computeStatus() {
        if (count == 0) {
            return FeatureStatus.NOT_RUN;
        }
        if (statsByStatus.get(ScenarioStatus.FAILED) > 0) {
            return FeatureStatus.FAILED;
        }
        if (statsByStatus.get(ScenarioStatus.PASSED) == count) {
            return FeatureStatus.PASSED;
        }
        if (statsByStatus.get(ScenarioStatus.NOT_RUN) == count) {
            return FeatureStatus.NOT_RUN;
        }
        return FeatureStatus.PARTIAL;
    }

}
