package example.reporting.feature.domain;

import example.support.ddd.TypedQuery;

public interface FeatureQuery extends TypedQuery<Feature> {

    FeatureQuery withFeatureKey(String featureKey);

    FeatureQuery withTestRunId(String testRunId);

    FeatureQuery orderByFeatureName();

}
