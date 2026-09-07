package io.zucchiniui.backend.testrun.dao;

import dev.morphia.Datastore;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import dev.morphia.query.Sort;
import dev.morphia.query.filters.Filters;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaDAO;
import io.zucchiniui.backend.testrun.domain.TestRun;
import io.zucchiniui.backend.testrun.domain.TestRunQuery;
import org.springframework.stereotype.Component;

@Component
public class TestRunDAO extends MorphiaDAO<TestRun, String> {

    public TestRunDAO(final Datastore ds) {
        super(ds, TestRun.class);
    }

    public Query<TestRun> query(final TestRunQuery q) {
        final FindOptions options = new FindOptions();
        if (q.orderByLatestFirst()) {
            options.sort(Sort.descending("date"));
        }

        final Query<TestRun> query = datastore.find(TestRun.class, options);

        if (q.type() != null) {
            query.filter(Filters.eq("type", q.type()));
        }

        return query;
    }

}
