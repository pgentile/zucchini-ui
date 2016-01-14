package io.testscucumber.backend.feature.domain;

import java.util.List;

public interface FeatureQuery {

    FeatureQuery withFeatureKey(String featureKey);

    FeatureQuery withTestRunId(String testRunId);

    FeatureQuery orderByFeatureName();

    FeatureQuery withTestRunIdIn(List<String> testRuns);
}
