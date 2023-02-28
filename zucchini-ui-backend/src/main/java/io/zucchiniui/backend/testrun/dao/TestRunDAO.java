package io.zucchiniui.backend.testrun.dao;

import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import org.springframework.stereotype.Component;
import xyz.morphia.Datastore;
import xyz.morphia.dao.BasicDAO;
import xyz.morphia.query.Query;

@Component
public class TestRunDAO extends BasicDAO<TestRun, String> {

    public TestRunDAO(final Datastore ds) {
        super(ds);
    }

    public Query<TestRun> query(TestRunQuery q) {
        Query<TestRun> query = createQuery();

        if (q.type() != null) {
            query = query.field("type").equal(q.type());
        }

        if (q.orderByLatestFirst()) {
            query = query.order("-date");
        }

        return query;
    }

}
