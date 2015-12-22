package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ScenarioDAO extends BasicDAO<Scenario, String> {

    @Autowired
    public ScenarioDAO(final Datastore ds) {
        super(ds);
    }

    public List<Scenario> findByTestRunId(final String testRunId) {
        return createQuery().field("testRunId").equal(testRunId).asList();
    }

    public Scenario findByFeatureIdAndKey(String featureId, String scenarioKey) {
        return createQuery()
            .field("featureId").equal(featureId)
            .field("scenarioKey").equal(scenarioKey)
            .get();
    }

}
