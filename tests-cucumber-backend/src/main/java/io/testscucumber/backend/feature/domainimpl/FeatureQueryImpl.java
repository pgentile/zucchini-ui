package io.testscucumber.backend.feature.domainimpl;

import com.google.common.base.Strings;
import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

import java.util.List;

class FeatureQueryImpl extends BaseMorphiaQuery<Feature> implements FeatureQuery {

    protected FeatureQueryImpl(final Query<Feature> query) {
        super(query);
    }

    @Override
    public FeatureQuery withFeatureKey(final String featureKey) {
        if (!Strings.isNullOrEmpty(featureKey)) {
            configureQuery(q -> q.field("featureKey").equal(featureKey));
        }
        return this;
    }

    @Override
    public FeatureQuery withTestRunId(final String testRunId) {
        if (!Strings.isNullOrEmpty(testRunId)) {
            configureQuery(q -> q.field("testRunId").equal(testRunId));
        }
        return this;
    }

    @Override
    public FeatureQuery orderByFeatureName() {
        configureQuery(q -> q.order("info.name"));
        return this;
    }

}
