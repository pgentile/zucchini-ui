package example.reporting.feature.domain;

import example.reporting.feature.model.Feature;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class FeatureFactory {

    public Feature create(final String testRunId) {
        final Feature feature = new Feature();
        feature.setId(UUID.randomUUID().toString());
        feature.setTestRunId(testRunId);
        return feature;
    }

}
