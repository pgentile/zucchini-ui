package io.testscucumber.backend.testrun.domainimpl;

import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import org.mongodb.morphia.query.Query;

class TestRunQueryImpl extends BaseMorphiaQuery<TestRun> implements TestRunQuery {

    protected TestRunQueryImpl(final Query<TestRun> query) {
        super(query);
    }

    @Override
    public TestRunQuery withType(final String type) {
        configureQuery(q -> q.field("type").equal(type));
        return this;
    }

    @Override
    public TestRunQuery orderByLatestFirst() {
        configureQuery(q -> q.order("-date"));
        return this;
    }

}
