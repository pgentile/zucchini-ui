package example.reporting.testrun.domainimpl;

import com.google.common.base.Strings;
import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunQuery;
import example.support.morphiaddd.AbstractMorphiaQuery;
import org.mongodb.morphia.query.Query;

class TestRunQueryImpl extends AbstractMorphiaQuery<TestRun> implements TestRunQuery {

    public TestRunQueryImpl(final Query<TestRun> query) {
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
