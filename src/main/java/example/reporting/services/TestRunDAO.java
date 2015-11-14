package example.reporting.services;

import example.reporting.model.TestRun;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

public class TestRunDAO extends BasicDAO<TestRun, String> {

    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

}
