package io.testscucumber.backend.testrun.dao;

import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class TestRunDAO extends MorphiaTypedQueryDAO<TestRun, String, TestRunQuery> {

    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public Query<TestRun> prepareTypedQuery(final Consumer<? super TestRunQuery> preparator) {
        final TestRunQueryImpl typedQuery = new TestRunQueryImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
