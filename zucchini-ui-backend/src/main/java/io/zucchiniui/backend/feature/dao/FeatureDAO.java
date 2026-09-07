package io.zucchiniui.backend.feature.dao;

import dev.morphia.Datastore;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import dev.morphia.query.Sort;
import dev.morphia.query.filters.Filter;
import dev.morphia.query.filters.Filters;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaDAO;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class FeatureDAO extends MorphiaDAO<Feature, String> {

    public FeatureDAO(final Datastore ds) {
        super(ds, Feature.class);
    }

    public Query<Feature> query(final FeatureQuery q) {
        return query(q, new FindOptions());
    }

    public Query<Feature> query(final FeatureQuery q, final FindOptions options) {
        if (q.orderByGroupAndName()) {
            options.sort(Sort.ascending("group"), Sort.ascending("info.name"));
        }

        final Query<Feature> query = datastore.find(Feature.class, options);

        final List<Filter> filters = new ArrayList<>();

        if (q.featureKey() != null) {
            filters.add(Filters.eq("featureKey", q.featureKey()));
        }

        if (q.testRunId() != null) {
            filters.add(Filters.eq("testRunId", q.testRunId()));
        }

        if (q.ids() != null) {
            filters.add(Filters.in("id", q.ids()));
        }

        if (!filters.isEmpty()) {
            query.filter(filters.toArray(new Filter[0]));
        }

        return query;
    }

}
