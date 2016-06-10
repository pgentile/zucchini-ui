package io.testscucumber.backend.scenario.domainimpl;

import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.domain.ScenarioService;
import io.testscucumber.backend.scenario.domain.UpdateScenarioParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
class ScenarioServiceImpl implements ScenarioService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScenarioServiceImpl.class);

    private final ScenarioRepository scenarioRepository;

    private final FeatureService featureService;

    public ScenarioServiceImpl(
        final ScenarioRepository scenarioRepository,
        final FeatureService featureService
    ) {
        this.scenarioRepository = scenarioRepository;
        this.featureService = featureService;
    }

    @Override
    public void updateScenario(final String scenarioId, final UpdateScenarioParams params) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        params.getStatus().ifPresent(scenario::setStatus);
        params.isReviewed().ifPresent(scenario::setReviewed);
        scenarioRepository.save(scenario);

        if (params.getStatus().isPresent()) {
            featureService.updateStatusFromScenarii(scenario.getFeatureId());
        }
    }

    @Override
    public void deleteById(final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        scenarioRepository.delete(scenario);

        featureService.updateStatusFromScenarii(scenario.getFeatureId());
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
