package example.reporting.scenario.domain;

import example.reporting.scenario.model.Scenario;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ScenarioFactory {

    public Scenario create(final String testRunId, final String featureId) {
        final Scenario scenario = new Scenario();
        scenario.setId(UUID.randomUUID().toString());
        scenario.setTestRunId(testRunId);
        scenario.setFeatureId(featureId);
        return scenario;
    }

}
