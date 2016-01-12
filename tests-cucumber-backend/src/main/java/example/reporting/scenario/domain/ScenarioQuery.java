package example.reporting.scenario.domain;

import java.util.List;

public interface ScenarioQuery {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery withTestRunIdIn(List<String> testRunIds);

    ScenarioQuery withTestRunId(String testRunId);

    ScenarioQuery orderedByScenarioName();

}
