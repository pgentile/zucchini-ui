package example.reporting.services;

import example.reporting.model.Feature;
import example.reporting.model.Scenario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FeatureService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureService.class);

    private final FeatureDAO featureDAO;

    private final ScenarioDAO scenarioDAO;

    public FeatureService(final FeatureDAO featureDAO, final ScenarioDAO scenarioDAO) {
        this.featureDAO = featureDAO;
        this.scenarioDAO = scenarioDAO;
    }

    public void save(final Feature feature, final Iterable<Scenario> scenarii) {
        LOGGER.info("Saving feature", feature.getId());

        // Checking IDs coherence

        for (final Scenario scenario: scenarii) {
            if (!feature.getTestRunId().equals(scenario.getTestRunId())) {
                throw new IllegalStateException("Incoherent test run ID for scenario " + scenario);
            }

            if (!feature.getId().equals(scenario.getFeatureId())) {
                throw new IllegalStateException("Incoherent feature ID for scenario " + scenario);
            }
        }

        // Saving in database

        featureDAO.save(feature);
        scenarii.forEach(scenarioDAO::save);
    }

}
