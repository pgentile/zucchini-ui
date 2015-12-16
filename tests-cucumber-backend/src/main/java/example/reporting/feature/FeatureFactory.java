package example.reporting.feature;

import example.reporting.api.feature.Feature;
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
