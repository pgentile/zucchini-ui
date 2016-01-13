package example.reporting.scenario.domain;

public interface ScenarioService {

    void updateStatus(Scenario scenario, ScenarioStatus newStatus);

    void deleteById(String scenarioId);

}
