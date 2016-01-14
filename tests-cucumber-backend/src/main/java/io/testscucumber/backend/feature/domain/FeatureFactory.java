package io.testscucumber.backend.feature.domain;

public interface FeatureFactory {

    Feature create(String testRunId);

}
