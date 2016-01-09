package example.reporting.api.feature;

import example.reporting.api.scenario.ScenarioStatus;

import java.util.EnumMap;
import java.util.Map;

public class FeatureStats {

    private int scenarioCount;

    private final Map<ScenarioStatus, Integer> statsByStatus;

    public FeatureStats() {
        statsByStatus = new EnumMap<>(ScenarioStatus.class);
    }

    public FeatureStats(int scenarioCount, Map<ScenarioStatus, Integer> statsByStatus) {
        this.scenarioCount = scenarioCount;
        this.statsByStatus = new EnumMap<>(statsByStatus);
    }

    public int getScenarioCount() {
        return scenarioCount;
    }

    public void setScenarioCount(int scenarioCount) {
        this.scenarioCount = scenarioCount;
    }

    public Map<ScenarioStatus, Integer> getStatsByStatus() {
        return statsByStatus;
    }

    public void setStatsByStatus(Map<ScenarioStatus, Integer> statsByStatus) {
        this.statsByStatus.clear();
        this.statsByStatus.putAll(statsByStatus);
    }

}
