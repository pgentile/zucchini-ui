package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class FeatureServiceImpl implements FeatureService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureServiceImpl.class);

    private final FeatureRepository featureRepository;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioViewAccess scenarioViewAccess;

    @Autowired
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
        final ScenarioStats scenarioStats = scenarioViewAccess.getStats(q -> q.withFeatureId(feature.getId()));
        feature.setStatus(scenarioStats.computeFeatureStatus());
    }

    @Override
    public void deleteByTestRunId(final String testRunId) {
        scenarioRepository.deleteByTestRunId(testRunId);
        featureRepository.deleteByTestRunId(testRunId);
    }

    @Override
    public void deleteById(final String featureId) {
        scenarioRepository.deleteByFeatureId(featureId);

        final Feature feature = featureRepository.getById(featureId);
        featureRepository.delete(feature);
    }

    @Override
    public Feature tryToMergeWithExistingFeature(final Feature newFeature) {
        return featureRepository.query(q -> q.withTestRunId(newFeature.getTestRunId()).withFeatureKey(newFeature.getFeatureKey()))
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
        scenarioRepository.query(q -> q.withFeatureId(feature.getId()))
            .stream()
            .forEach(scenario -> {
                scenario.updateWithExtraTags(feature.getTags());
                scenarioRepository.save(scenario);
            });
    }

}
