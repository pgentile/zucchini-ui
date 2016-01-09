package example.reporting.feature;

import example.reporting.api.feature.Feature;
import example.reporting.api.feature.FeatureStats;
import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.ScenarioStatus;
import example.reporting.scenario.ScenarioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
public class FeatureService {

    private final ScenarioDAO scenarioDAO;

    @Autowired
    public FeatureService(ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;
    }

    public FeatureStats computeStats(Feature feature) {
        final Map<ScenarioStatus, Integer> statsByStatus = new EnumMap<>(ScenarioStatus.class);
        for (ScenarioStatus status : ScenarioStatus.values()) {
            statsByStatus.put(status, 0);
        }

        final List<Scenario> scenarii = scenarioDAO.findByFeatureId(feature.getId());
        for (Scenario scenario : scenarii) {
            statsByStatus.compute(scenario.getStatus(), (key, count) -> count + 1);
        }

        return new FeatureStats(scenarii.size(), statsByStatus);
    }

}
