package example.reporting.scenario.domain;

import example.support.ddd.TypedQuery;

import java.util.List;

public interface ScenarioQuery extends TypedQuery<Scenario> {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery withTestRunIdIn(List<String> testRunIds);

    ScenarioQuery withTestRunId(String testRunId);

    ScenarioQuery orderedByScenarioName();

}
