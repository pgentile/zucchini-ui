package example.reporting.scenario.domainimpl;

import com.google.common.base.Strings;
import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.ScenarioQuery;
import example.support.morphiaddd.AbstractMorphiaQuery;
import org.mongodb.morphia.query.Query;

public class ScenarioQueryImpl extends AbstractMorphiaQuery<Scenario> implements ScenarioQuery {

    public ScenarioQueryImpl(final Query<Scenario> query) {
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
    public ScenarioQuery orderedByScenarioName() {
        configureQuery(q -> q.order("info.name"));
        return this;
    }

}
