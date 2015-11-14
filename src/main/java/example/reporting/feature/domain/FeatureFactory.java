package example.reporting.feature.domain;

import example.reporting.feature.model.Feature;

import java.util.UUID;

public class FeatureFactory {

    public Feature create(final String testRunId) {
        final Feature feature = new Feature();
        feature.setId(UUID.randomUUID().toString());
        feature.setTestRunId(testRunId);
        return feature;
    }

}
