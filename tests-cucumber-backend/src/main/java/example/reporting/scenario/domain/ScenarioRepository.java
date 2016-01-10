package example.reporting.scenario.domain;

import example.support.ddd.QueriableRepository;

public interface ScenarioRepository extends QueriableRepository<Scenario, String, ScenarioQuery> {
}
