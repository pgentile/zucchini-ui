package io.zucchiniui.backend.scenario.domainimpl;

import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.scenario.domain.*;
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
        params.status().ifPresent(scenario::setStatus);
        params.reviewed().ifPresent(scenario::setReviewed);
        scenarioRepository.save(scenario);

        if (params.status().isPresent()) {
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
    public Scenario tryToMergeWithExistingScenario(final Scenario newScenario, boolean mergeOnlyNewPassedScenarii) {
        return scenarioRepository.query(q -> q.withFeatureId(newScenario.getFeatureId()).withScenarioKey(newScenario.getScenarioKey()))
            .tryToFindOne()
            .map(existingScenario -> {
                LOGGER.info("Merging new scenario {} with existing feature {}, merge only passed is {}", newScenario, existingScenario, mergeOnlyNewPassedScenarii);
                if (!mergeOnlyNewPassedScenarii || isNewPassedScenarii(existingScenario, newScenario)) {
                    existingScenario.mergeWith(newScenario);
                }
                return existingScenario;
            })
            .orElse(newScenario);
    }

    /**
     * Define if the new scenarii is passed and the existing is not passed.
     *
     * @return true if the new scenarii is passed and the existing is not passed.
     */
    private boolean isNewPassedScenarii(Scenario existingScenario, Scenario newScenario) {
        return newScenario.getStatus() == ScenarioStatus.PASSED && existingScenario.getStatus() != ScenarioStatus.PASSED;
    }

}
