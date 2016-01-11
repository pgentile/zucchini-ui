package example.reporting.feature.views;

import example.reporting.scenario.domain.ScenarioStatus;
import example.reporting.scenario.views.ScenarioStatusAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class FeatureStatsViewAccess {

    private final ScenarioStatusAccess scenarioStatusAccess;

    @Autowired
    public FeatureStatsViewAccess(final ScenarioStatusAccess scenarioStatusAccess) {
        this.scenarioStatusAccess = scenarioStatusAccess;
    }

    public FeatureStats getStatsForByFeatureId(final String featureId) {
        final Map<ScenarioStatus, Integer> statsByStatus = new EnumMap<>(ScenarioStatus.class);
        for (final ScenarioStatus status : ScenarioStatus.values()) {
            statsByStatus.put(status, 0);
        }

        final List<ScenarioStatus> scenariiStatus = scenarioStatusAccess.getScenariiStatusByFeatureId(featureId);
        scenariiStatus.forEach(status -> statsByStatus.compute(status, (key, count) -> count + 1));
        return new FeatureStats(scenariiStatus.size(), statsByStatus);
    }

}
