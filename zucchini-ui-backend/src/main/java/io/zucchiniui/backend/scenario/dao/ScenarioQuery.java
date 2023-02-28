package io.zucchiniui.backend.scenario.dao;

import io.zucchiniui.backend.shared.domain.TagSelection;

public record ScenarioQuery(
    String featureId,
    String scenarioKey,
    String testRunId,
    String search,
    String name,
    boolean orderedByName,
    TagSelection tagSelection,
    boolean withErrorMessage
) {

    public ScenarioQuery() {
        this(null, null, null, null, null, false, null, false);
    }

    public ScenarioQuery withFeatureId(String featureId) {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery withScenarioKey(String scenarioKey) {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery withTestRunId(String testRunId) {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery withSearch(String search) {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery withName(String name) {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery sortByName() {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            true,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery withSelectedTags(TagSelection tagSelection) {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            withErrorMessage
        );
    }

    public ScenarioQuery havingErrorMessage() {
        return new ScenarioQuery(
            featureId,
            scenarioKey,
            testRunId,
            search,
            name,
            orderedByName,
            tagSelection,
            true
        );
    }

}
