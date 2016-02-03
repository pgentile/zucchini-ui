package io.testscucumber.backend.scenario.domainimpl;

import io.testscucumber.backend.scenario.dao.ScenarioDAO;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class ScenarioRepositoryImpl extends MorphiaQueriableRepository<Scenario, String, ScenarioQuery> implements ScenarioRepository {

    private final ScenarioDAO dao;

    @Autowired
    public ScenarioRepositoryImpl(final ScenarioDAO dao) {
        super(dao);
        this.dao = dao;
    }

    @Override
    public void deleteByTestRunId(final String testRunId) {
        final Query<Scenario> query = dao.prepareTypedQuery(q -> q.withTestRunId(testRunId));
        dao.deleteByQuery(query);
    }

    @Override
    public void deleteByFeatureId(final String featureId) {
        final Query<Scenario> query = dao.prepareTypedQuery(q -> q.withFeatureId(featureId));
        dao.deleteByQuery(query);
    }

}
