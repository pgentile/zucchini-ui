package example.reporting.feature.domainimpl;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.feature.domain.FeatureService;
import example.reporting.scenario.domain.ScenarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class FeatureServiceImpl implements FeatureService {

    private final FeatureRepository featureRepository;

    private final ScenarioRepository scenarioRepository;

    @Autowired
    public FeatureServiceImpl(final FeatureRepository featureRepository, final ScenarioRepository scenarioRepository) {
        this.featureRepository = featureRepository;
        this.scenarioRepository = scenarioRepository;
    }

    @Override
    public void deleteByTestRunId(final String testRunId) {
        scenarioRepository.deleteByTestRunId(testRunId);
        featureRepository.deleteByTestRunId(testRunId);
    }

    @Override
    public void deleteById(final String featureId) {
        final Feature feature = featureRepository.getById(featureId);

        scenarioRepository.deleteByFeatureId(featureId);

        featureRepository.delete(feature);
    }

}
