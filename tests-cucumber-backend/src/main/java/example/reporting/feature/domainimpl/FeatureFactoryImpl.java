package example.reporting.feature.domainimpl;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
class FeatureFactoryImpl implements FeatureFactory {

    @Override
    public Feature create(final String testRunId) {
        final Feature feature = new Feature();
        feature.setId(UUID.randomUUID().toString());
        feature.setTestRunId(testRunId);
        return feature;
    }

}
