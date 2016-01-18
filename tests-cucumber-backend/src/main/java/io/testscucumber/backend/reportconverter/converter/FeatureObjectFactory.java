package io.testscucumber.backend.reportconverter.converter;

import io.testscucumber.backend.feature.domain.FeatureFactory;
import io.testscucumber.backend.feature.domain.Feature;
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
        final String group = (String) mappingContext.getProperty(MappingContextKey.GROUP);
        return featureFactory.create(testRunId, group);
    }

}
