package io.testscucumber.backend.scenario.views;

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

}
