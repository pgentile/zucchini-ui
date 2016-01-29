package io.testscucumber.backend.scenario.domain;

import java.util.Collection;

public interface ScenarioQuery {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery withTestRunId(String testRunId);

    ScenarioQuery orderedByName();

    ScenarioQuery withTag(String tag);

    ScenarioQuery withTags(Collection<String> tags);

}
