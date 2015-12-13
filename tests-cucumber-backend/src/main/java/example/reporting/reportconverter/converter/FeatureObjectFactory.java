package example.reporting.reportconverter.converter;

import example.reporting.feature.domain.FeatureFactory;
import example.reporting.feature.model.Feature;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.ObjectFactory;

class FeatureObjectFactory implements ObjectFactory<Feature> {

    private final FeatureFactory featureFactory;

    public FeatureObjectFactory(final FeatureFactory featureFactory) {
        this.featureFactory = featureFactory;
    }

    @Override
    public Feature create(final Object source, final MappingContext mappingContext) {
        final String testRunId = (String) mappingContext.getProperty(MappingContextKey.TEST_RUN_ID);
        return featureFactory.create(testRunId);
    }

}
