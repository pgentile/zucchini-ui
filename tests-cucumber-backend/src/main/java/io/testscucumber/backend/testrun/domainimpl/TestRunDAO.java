package io.testscucumber.backend.testrun.domainimpl;

import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
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
