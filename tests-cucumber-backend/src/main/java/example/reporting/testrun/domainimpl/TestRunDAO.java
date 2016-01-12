package example.reporting.testrun.domainimpl;

import example.reporting.testrun.domain.TestRun;
import example.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class TestRunDAO extends MorphiaTypedQueryDAO<TestRun, String, TestRunQueryImpl> {

    @Autowired
    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    protected TestRunQueryImpl createTypedQuery() {
        return new TestRunQueryImpl(createQuery());
    }

}
