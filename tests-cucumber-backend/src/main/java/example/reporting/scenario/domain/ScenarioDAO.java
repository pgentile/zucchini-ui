package example.reporting.scenario.domain;

import example.reporting.scenario.model.Scenario;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScenarioDAO extends BasicDAO<Scenario, String> {

    @Autowired
    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

}
