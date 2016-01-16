package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.Feature;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

class FeatureViewMapper extends ConfigurableMapper {

    @Override
    protected void configure(final MapperFactory factory) {
        factory.classMap(Feature.class, FeatureHistoryItemView.class)
            .byDefault()
            .register();

        factory.classMap(Feature.class, FeatureListItemView.class)
            .byDefault()
            .register();
    }

}
