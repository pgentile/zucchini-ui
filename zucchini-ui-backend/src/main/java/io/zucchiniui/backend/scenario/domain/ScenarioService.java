package io.zucchiniui.backend.scenario.domain;

public interface ScenarioService {

    void updateScenario(String scenarioId, UpdateScenarioParams params);

    void deleteById(String scenarioId);

    Scenario tryToMergeWithExistingScenario(Scenario newScenario);

}
