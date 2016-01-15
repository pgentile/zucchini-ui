package io.testscucumber.backend.feature.domain;

public interface FeatureService {

    void calculateStatusFromScenarii(Feature feature);

    void deleteByTestRunId(String testRunId);

    void deleteById(String featureId);

    Feature tryToMergeWithExistingFeature(Feature newFeature);

}
