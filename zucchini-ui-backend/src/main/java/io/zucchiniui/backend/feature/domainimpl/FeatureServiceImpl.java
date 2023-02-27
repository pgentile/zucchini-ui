package io.zucchiniui.backend.feature.domainimpl;

import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import io.zucchiniui.backend.feature.domain.FeatureRepository;
import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.scenario.dao.ScenarioQuery;
import io.zucchiniui.backend.scenario.domain.ScenarioRepository;
import io.zucchiniui.backend.scenario.views.ScenarioStats;
import io.zucchiniui.backend.scenario.views.ScenarioViewAccess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
class FeatureServiceImpl implements FeatureService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureServiceImpl.class);

    private final FeatureRepository featureRepository;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioViewAccess scenarioViewAccess;

    public FeatureServiceImpl(
        final FeatureRepository featureRepository,
        final ScenarioRepository scenarioRepository,
        final ScenarioViewAccess scenarioViewAccess
    ) {
        this.featureRepository = featureRepository;
        this.scenarioRepository = scenarioRepository;
        this.scenarioViewAccess = scenarioViewAccess;
    }

    @Override
    public void calculateStatusFromScenarii(final Feature feature) {
        final var q = new ScenarioQuery().withFeatureId(feature.getId());
        final ScenarioStats scenarioStats = scenarioViewAccess.getStats(q);
        feature.setStatus(scenarioStats.computeFeatureStatus());
    }

    @Override
    public void updateStatusFromScenarii(final String featureId) {
        final Feature feature = featureRepository.getById(featureId);
        calculateStatusFromScenarii(feature);
        featureRepository.save(feature);
    }

    @Override
    public void deleteByTestRunId(final String testRunId) {
        final var q = new ScenarioQuery().withTestRunId(testRunId);
        scenarioRepository.query(q).delete();
        featureRepository.query(new FeatureQuery().withTestRunId(testRunId)).delete();
    }

    @Override
    public void deleteById(final String featureId) {
        final var q = new ScenarioQuery().withFeatureId(featureId);
        scenarioRepository.query(q).delete();

        final Feature feature = featureRepository.getById(featureId);
        featureRepository.delete(feature);
    }

    @Override
    public Feature tryToMergeWithExistingFeature(final Feature newFeature) {
        return featureRepository.query(new FeatureQuery().withTestRunId(newFeature.getTestRunId()).withFeatureKey(newFeature.getFeatureKey()))
            .tryToFindOne()
            .map(existingFeature -> {
                LOGGER.info("Merged new feature with key {} with existing feature {}", newFeature.getFeatureKey(), existingFeature);
                existingFeature.mergeWith(newFeature);
                return existingFeature;
            })
            .orElse(newFeature);
    }

    @Override
    public void updateScenariiWithFeatureTags(final Feature feature) {
        final var q = new ScenarioQuery().withFeatureId(feature.getId());
        scenarioRepository.query(q).update(scenario -> scenario.updateWithExtraTags(feature.getTags()));
    }

}
