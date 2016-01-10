package example.reporting.feature.domainimpl;

import com.google.common.base.Strings;
import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureQuery;
import example.support.morphiaddd.AbstractMorphiaQuery;
import org.mongodb.morphia.query.Query;

class FeatureQueryImpl extends AbstractMorphiaQuery<Feature> implements FeatureQuery {

    public FeatureQueryImpl(Query<Feature> query) {
        super(query);
    }

    @Override
    public FeatureQuery withFeatureKey(String featureKey) {
        if (!Strings.isNullOrEmpty(featureKey)) {
            configureQuery(query -> query.field("featureKey").equal(featureKey));
        }
        return this;
    }

    @Override
    public FeatureQuery withTestRunId(String testRunId) {
        if (!Strings.isNullOrEmpty(testRunId)) {
            configureQuery(query -> query.field("testRunId").equal(testRunId));
        }
        return this;
    }

    @Override
    public FeatureQuery orderByFeatureName() {
        configureQuery(query -> query.order("info.name"));
        return this;
    }

}
