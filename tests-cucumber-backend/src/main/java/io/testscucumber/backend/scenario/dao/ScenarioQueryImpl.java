package io.testscucumber.backend.scenario.dao;

import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.shared.domain.TagSelection;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

class ScenarioQueryImpl extends BaseMorphiaQuery<Scenario> implements ScenarioQuery {

    protected ScenarioQueryImpl(final Query<Scenario> query) {
        super(query);
    }

    @Override
    public ScenarioQuery withFeatureId(final String featureId) {
        configureQuery(q -> q.field("featureId").equal(featureId));
        return this;
    }

    @Override
    public ScenarioQuery withScenarioKey(final String scenarioKey) {
        configureQuery(q -> q.field("scenarioKey").equal(scenarioKey));
        return this;
    }

    @Override
    public ScenarioQuery withTestRunId(final String testRunId) {
        configureQuery(q -> q.field("testRunId").equal(testRunId));
        return this;
    }

    @Override
    public ScenarioQuery orderedByName() {
        configureQuery(q -> q.order("info.name"));
        return this;
    }

    @Override
    public ScenarioQuery withSelectedTags(final TagSelection tagSelection) {
        if (tagSelection.isActive()) {
            if (!tagSelection.getIncludedTags().isEmpty()) {
                configureQuery(q -> q.field("allTags").in(tagSelection.getIncludedTags()));
            }
            if (!tagSelection.getExcludedTags().isEmpty()) {
                configureQuery(q -> q.field("allTags").notIn(tagSelection.getExcludedTags()));
            }
        }
        return this;
    }

}
