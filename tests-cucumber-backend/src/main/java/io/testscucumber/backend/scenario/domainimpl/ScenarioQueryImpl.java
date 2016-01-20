package io.testscucumber.backend.scenario.domainimpl;

import com.google.common.base.Strings;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

class ScenarioQueryImpl extends BaseMorphiaQuery<Scenario> implements ScenarioQuery {

    protected ScenarioQueryImpl(final Query<Scenario> query) {
        super(query);
    }

    @Override
    public ScenarioQuery withFeatureId(final String featureId) {
        if (!Strings.isNullOrEmpty(featureId)) {
            configureQuery(q -> q.field("featureId").equal(featureId));
        }
        return this;
    }

    @Override
    public ScenarioQuery withScenarioKey(final String scenarioKey) {
        if (!Strings.isNullOrEmpty(scenarioKey)) {
            configureQuery(q -> q.field("scenarioKey").equal(scenarioKey));
        }
        return this;
    }

    @Override
    public ScenarioQuery withTestRunId(final String testRunId) {
        if (!Strings.isNullOrEmpty(testRunId)) {
            configureQuery(q -> q.field("testRunId").equal(testRunId));
        }
        return this;
    }

    @Override
    public ScenarioQuery orderedByName() {
        configureQuery(q -> q.order("info.name"));
        return this;
    }

}
