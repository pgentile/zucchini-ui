package example.reporting.scenario.domainimpl;

import example.reporting.scenario.domain.Scenario;
import example.support.morphiaddd.AbstractMorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScenarioDAO extends AbstractMorphiaTypedQueryDAO<Scenario, String, ScenarioQueryImpl> {

    @Autowired
    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public ScenarioQueryImpl createTypedQuery() {
        return new ScenarioQueryImpl(createQuery());
    }

}
