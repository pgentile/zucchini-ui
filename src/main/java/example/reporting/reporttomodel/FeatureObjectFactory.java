package example.reporting.reporttomodel;

import example.reporting.model.Feature;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.ObjectFactory;

import java.util.UUID;

class FeatureObjectFactory implements ObjectFactory<Feature> {

    @Override
    public Feature create(final Object source, final MappingContext mappingContext) {
        final Feature feature = new Feature();
        feature.setId("FEATURE-" + UUID.randomUUID().toString());
        return feature;
    }

}
