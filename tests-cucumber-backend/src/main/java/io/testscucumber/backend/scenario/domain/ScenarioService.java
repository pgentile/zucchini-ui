package io.testscucumber.backend.scenario.domain;

public interface ScenarioService {

    void updateStatus(String scenarioId, ScenarioStatus newStatus);

    void deleteById(String scenarioId);

    Scenario tryToMergeWithExistingScenario(Scenario newScenario);

}
