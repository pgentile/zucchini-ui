package io.testscucumber.backend.feature.domainimpl;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.feature.domain.FeatureStatus;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

import static java.util.function.Predicate.isEqual;

@Component
class FeatureServiceImpl implements FeatureService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureServiceImpl.class);

    private final FeatureRepository featureRepository;

    private final ScenarioRepository scenarioRepository;

    @Autowired
    public FeatureServiceImpl(final FeatureRepository featureRepository, final ScenarioRepository scenarioRepository) {
        this.featureRepository = featureRepository;
        this.scenarioRepository = scenarioRepository;
    }

    @Override
    public void calculateStatusFromScenarii(final Feature feature) {
        final Set<ScenarioStatus> scenariiStatus = scenarioRepository.query(q -> q.withFeatureId(feature.getId()))
            .stream()
            .map(Scenario::getStatus)
            .collect(Collectors.toSet());

        final FeatureStatus featureStatus;
        if (scenariiStatus.contains(ScenarioStatus.FAILED)) {
            featureStatus = FeatureStatus.FAILED;
        } else if (scenariiStatus.stream().allMatch(isEqual(ScenarioStatus.PASSED))) {
            featureStatus = FeatureStatus.PASSED;
        } else if (scenariiStatus.stream().allMatch(isEqual(ScenarioStatus.NOT_RUN))) {
            featureStatus = FeatureStatus.NOT_RUN;
        } else {
            featureStatus = FeatureStatus.PARTIAL;
        }

        LOGGER.info("Calculed feature status {} for scenarii status {}", featureStatus, scenariiStatus);

        feature.setStatus(featureStatus);
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

}
