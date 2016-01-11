package example.reporting.feature.domainimpl;

import com.google.common.base.Strings;
import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureQuery;
import example.support.morphiaddd.AbstractMorphiaQuery;
import org.mongodb.morphia.query.Query;

import java.util.List;

class FeatureQueryImpl extends AbstractMorphiaQuery<Feature> implements FeatureQuery {

    public FeatureQueryImpl(final Query<Feature> query) {
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
    public FeatureQuery withTestRunIdIn(final List<String> testRunIds) {
        configureQuery(q -> q.field("testRunId").in(testRunIds));
        return this;
    }

    @Override
    public FeatureQuery orderByFeatureName() {
        configureQuery(q -> q.order("info.name"));
        return this;
    }

}
