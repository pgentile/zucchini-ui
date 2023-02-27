package io.zucchiniui.backend.feature.dao;

import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import xyz.morphia.Datastore;
import xyz.morphia.dao.BasicDAO;
import xyz.morphia.query.Query;
import org.springframework.stereotype.Component;

@Component
public class FeatureDAO extends BasicDAO<Feature, String> {

    public FeatureDAO(final Datastore ds) {
        super(ds);
    }

    public Query<Feature> query(FeatureQuery q) {
        Query<Feature> query = createQuery();

        if (q.featureKey() != null) {
            query = query.field("featureKey").equal(q.featureKey());
        }

        if (q.testRunId() != null) {
            query = query.field("testRunId").equal(q.testRunId());
        }

        if (q.ids() != null) {
            query = query.field("id").in(q.ids());
        }

        if (q.orderByGroupAndName()) {
            query = query.order("group,info.name");
        }

        return query;
    }

}
