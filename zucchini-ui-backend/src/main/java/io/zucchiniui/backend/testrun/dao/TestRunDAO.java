package io.zucchiniui.backend.testrun.dao;

import io.zucchiniui.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import xyz.morphia.Datastore;
import xyz.morphia.query.Query;
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
