package example.reporting.scenario;

import example.reporting.scenario.model.Scenario;

import java.util.UUID;

public class ScenarioFactory {

    public Scenario create(final String testRunId, final String featureId) {
        final Scenario scenario = new Scenario();
        scenario.setId("SCENARIO-" + UUID.randomUUID().toString());
        scenario.setTestRunId(testRunId);
        scenario.setFeatureId(featureId);
        return scenario;
    }

}
