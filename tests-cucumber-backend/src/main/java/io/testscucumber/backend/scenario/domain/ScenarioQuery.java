package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.shared.domain.TagSelection;

public interface ScenarioQuery {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery withTestRunId(String testRunId);

    ScenarioQuery orderedByName();

    ScenarioQuery withTag(String tag);

    ScenarioQuery withSelectedTags(TagSelection tagSelection);

}
