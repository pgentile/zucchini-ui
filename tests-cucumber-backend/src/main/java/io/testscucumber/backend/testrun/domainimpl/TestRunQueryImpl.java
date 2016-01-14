package io.testscucumber.backend.testrun.domainimpl;

import com.google.common.base.Strings;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

class TestRunQueryImpl extends BaseMorphiaQuery<TestRun> implements TestRunQuery {

    protected TestRunQueryImpl(final Query<TestRun> query) {
        super(query);
    }

    @Override
    public TestRunQuery withEnv(final String env) {
        if (!Strings.isNullOrEmpty(env)) {
            configureQuery(q -> q.field("env").equal(env));
        }
        return this;
    }

    @Override
    public TestRunQuery orderByLatestFirst() {
        configureQuery(q -> q.order("-date"));
        return this;
    }

}
