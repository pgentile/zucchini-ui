package io.testscucumber.backend.scenario.domain;

public interface ScenarioService {

    void updateStatus(Scenario scenario, ScenarioStatus newStatus);

    void deleteById(String scenarioId);

    Scenario tryToMergeWithExistingScenario(Scenario newScenario);

}
