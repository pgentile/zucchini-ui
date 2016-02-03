package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.TagSelectionQuery;

public interface ScenarioQuery extends TagSelectionQuery<ScenarioQuery> {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery withTestRunId(String testRunId);

    ScenarioQuery orderedByName();

}
