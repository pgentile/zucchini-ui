package example.reporting.scenario.domainimpl;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.feature.domain.FeatureService;
import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.ScenarioRepository;
import example.reporting.scenario.domain.ScenarioService;
import example.reporting.scenario.domain.ScenarioStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class ScenarioServiceImpl implements ScenarioService {

    private final ScenarioRepository scenarioRepository;

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    @Autowired
    public ScenarioServiceImpl(
        ScenarioRepository scenarioRepository,
        FeatureRepository featureRepository,
        FeatureService featureService
    ) {
        this.scenarioRepository = scenarioRepository;
        this.featureRepository = featureRepository;
        this.featureService = featureService;
    }

    @Override
    public void updateStatus(Scenario scenario, ScenarioStatus newStatus) {
        scenario.changeStatus(newStatus);
        scenarioRepository.save(scenario);

        final Feature feature = featureRepository.getById(scenario.getFeatureId());
        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);
    }

    @Override
    public void deleteById(String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        scenarioRepository.delete(scenario);

        final Feature feature = featureRepository.getById(scenario.getFeatureId());
        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);
    }

}
