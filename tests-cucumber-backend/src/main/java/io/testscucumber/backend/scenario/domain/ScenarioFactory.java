package io.testscucumber.backend.scenario.domain;

public interface ScenarioFactory {

    Scenario create(String testRunId, String featureId);

}
