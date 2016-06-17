package io.zucchiniui.backend.testrun.dao;

import io.zucchiniui.backend.support.ddd.morphia.BaseMorphiaQuery;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
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
