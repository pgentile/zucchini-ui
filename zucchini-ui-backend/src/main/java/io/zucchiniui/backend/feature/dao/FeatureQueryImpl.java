package io.zucchiniui.backend.feature.dao;

import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import io.zucchiniui.backend.support.ddd.morphia.BaseMorphiaQuery;
import xyz.morphia.query.Query;

import java.util.Collection;

class FeatureQueryImpl extends BaseMorphiaQuery<Feature> implements FeatureQuery {

    protected FeatureQueryImpl(final Query<Feature> query) {
        super(query);
    }

    @Override
    public FeatureQuery withFeatureKey(final String featureKey) {
        configureQuery(q -> q.field("featureKey").equal(featureKey));
        return this;
    }

    @Override
    public FeatureQuery withTestRunId(final String testRunId) {
        configureQuery(q -> q.field("testRunId").equal(testRunId));
        return this;
    }

    @Override
    public FeatureQuery withIdIn(final Collection<String> ids) {
        configureQuery(q -> q.field("id").in(ids));
        return this;
    }

    @Override
    public FeatureQuery orderByGroupAndName() {
        configureQuery(q -> q.order("group,info.name"));
        return this;
    }

}
