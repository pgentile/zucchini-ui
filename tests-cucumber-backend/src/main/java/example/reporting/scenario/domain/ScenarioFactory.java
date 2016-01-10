package example.reporting.scenario.domain;

public interface ScenarioFactory {
    Scenario create(String testRunId, String featureId);
}
