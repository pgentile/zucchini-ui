package io.testscucumber.backend.scenario.domainimpl;

import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

import java.util.Collection;

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
    public ScenarioQuery withTag(final String tag) {
        configureQuery(q -> q.field("allTags").equal(tag));
        return this;
    }

    @Override
    public ScenarioQuery withTags(final Collection<String> tags) {
        configureQuery(q -> q.field("allTags").in(tags));
        return this;
    }

}
