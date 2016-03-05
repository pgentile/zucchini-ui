package io.testscucumber.backend.scenario.domainimpl;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.domain.ScenarioService;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class ScenarioServiceImpl implements ScenarioService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScenarioServiceImpl.class);

    private final ScenarioRepository scenarioRepository;

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    @Autowired
    public ScenarioServiceImpl(
        final ScenarioRepository scenarioRepository,
        final FeatureRepository featureRepository,
        final FeatureService featureService
    ) {
        this.scenarioRepository = scenarioRepository;
        this.featureRepository = featureRepository;
        this.featureService = featureService;
    }

    @Override
    public void updateStatus(final Scenario scenario, final ScenarioStatus newStatus) {
        scenario.setStatus(newStatus);

        final Feature feature = featureRepository.getById(scenario.getFeatureId());
        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);
    }

    @Override
    public void deleteById(final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        scenarioRepository.delete(scenario);

        final Feature feature = featureRepository.getById(scenario.getFeatureId());
        featureService.calculateStatusFromScenarii(feature);
        featureRepository.save(feature);
    }

    @Override
    public Scenario tryToMergeWithExistingScenario(final Scenario newScenario) {
        return scenarioRepository.query(q -> q.withFeatureId(newScenario.getFeatureId()).withScenarioKey(newScenario.getScenarioKey()))
            .tryToFindOne()
            .map(existingScenario -> {
                LOGGER.info("Merging new scenario {} with existing feature {}", newScenario, existingScenario);
                existingScenario.mergeWith(newScenario);
                return existingScenario;
            })
            .orElse(newScenario);
    }

}
