package example.reporting.scenario.domain;

import example.support.ddd.Query;

public interface ScenarioQuery extends Query<Scenario> {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery orderedByScenarioName();

}
