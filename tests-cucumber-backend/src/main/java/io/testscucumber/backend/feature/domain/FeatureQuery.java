package io.testscucumber.backend.feature.domain;

public interface FeatureQuery {

    FeatureQuery withFeatureKey(String featureKey);

    FeatureQuery withTestRunId(String testRunId);

    FeatureQuery orderByFeatureName();

}
