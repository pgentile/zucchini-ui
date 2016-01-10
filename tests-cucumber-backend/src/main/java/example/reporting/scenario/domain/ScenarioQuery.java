package example.reporting.scenario.domain;

import example.support.ddd.TypedQuery;

public interface ScenarioQuery extends TypedQuery<Scenario> {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery orderedByScenarioName();

    ScenarioQuery withTestRunId(String testRunId);

}
