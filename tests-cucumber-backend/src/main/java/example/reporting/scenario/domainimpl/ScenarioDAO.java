package example.reporting.scenario.domainimpl;

import example.reporting.scenario.domain.Scenario;
import example.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScenarioDAO extends MorphiaTypedQueryDAO<Scenario, String, ScenarioQueryImpl> {

    @Autowired
    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    protected ScenarioQueryImpl createTypedQuery() {
        return new ScenarioQueryImpl(createQuery());
    }

}
