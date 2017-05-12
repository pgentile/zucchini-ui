package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.TagSelection;

import java.util.List;

public interface ScenarioQuery {

    ScenarioQuery withFeatureId(String featureId);

    ScenarioQuery withScenarioKey(String scenarioKey);

    ScenarioQuery withTestRunId(String testRunId);

    ScenarioQuery withSearch(String search);

    ScenarioQuery orderedByName();

    ScenarioQuery withSelectedTags(TagSelection tagSelection);

    ScenarioQuery withErrorOutputCodes(List<String> errorOutputCodes);

}
