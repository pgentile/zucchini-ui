package io.zucchiniui.backend.scenario.dao;

import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.scenario.domain.ScenarioQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
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
