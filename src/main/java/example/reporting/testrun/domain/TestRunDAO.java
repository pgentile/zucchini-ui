package example.reporting.testrun.domain;

import example.reporting.testrun.model.TestRun;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

public class TestRunDAO extends BasicDAO<TestRun, String> {

    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

}
