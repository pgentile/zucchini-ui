package example.reporting.feature.domainimpl;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.feature.domain.FeatureService;
import example.reporting.feature.domain.FeatureStats;
import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.ScenarioRepository;
import example.reporting.scenario.domain.ScenarioStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Component
class FeatureServiceImpl implements FeatureService {

    private final FeatureRepository featureRepository;

    private final ScenarioRepository scenarioRepository;

    @Autowired
    public FeatureServiceImpl(FeatureRepository featureRepository, ScenarioRepository scenarioRepository) {
        this.featureRepository = featureRepository;
        this.scenarioRepository = scenarioRepository;
    }

    @Override
    public FeatureStats computeStats(Feature feature) {
        final Map<ScenarioStatus, Integer> statsByStatus = new EnumMap<>(ScenarioStatus.class);
        for (ScenarioStatus status : ScenarioStatus.values()) {
            statsByStatus.put(status, 0);
        }

        final List<Scenario> scenarii = scenarioRepository
            .query()
            .withFeatureId(feature.getId())
            .find();

        for (Scenario scenario : scenarii) {
            statsByStatus.compute(scenario.getStatus(), (key, count) -> count + 1);
        }
        return new FeatureStats(scenarii.size(), statsByStatus);
    }

    @Override
    public void deleteByTestRunId(String testRunId) {
        scenarioRepository.deleteByTestRunId(testRunId);
        featureRepository.deleteByTestRunId(testRunId);
    }

}
