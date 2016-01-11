package example.reporting.feature.domain;

import example.support.ddd.TypedQuery;

import java.util.List;

public interface FeatureQuery extends TypedQuery<Feature> {

    FeatureQuery withFeatureKey(String featureKey);

    FeatureQuery withTestRunId(String testRunId);

    FeatureQuery orderByFeatureName();

    FeatureQuery withTestRunIdIn(List<String> testRuns);
}
