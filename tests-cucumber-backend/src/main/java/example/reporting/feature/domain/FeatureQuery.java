package example.reporting.feature.domain;

import example.support.ddd.Query;

public interface FeatureQuery extends Query<Feature> {

    FeatureQuery withFeatureKey(String featureKey);

    FeatureQuery withTestRunId(String testRunId);

    FeatureQuery orderByFeatureName();

}
