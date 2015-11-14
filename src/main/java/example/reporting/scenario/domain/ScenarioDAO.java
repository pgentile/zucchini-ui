package example.reporting.scenario.domain;

import example.reporting.scenario.model.Scenario;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

public class ScenarioDAO extends BasicDAO<Scenario, String> {

    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

}
