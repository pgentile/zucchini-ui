package io.testscucumber.backend.scenario.dao;

import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class ScenarioDAO extends MorphiaTypedQueryDAO<Scenario, String, ScenarioQuery> {

    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public Query<Scenario> prepareTypedQuery(final Consumer<? super ScenarioQuery> preparator) {
        final ScenarioQueryImpl typedQuery = new ScenarioQueryImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
