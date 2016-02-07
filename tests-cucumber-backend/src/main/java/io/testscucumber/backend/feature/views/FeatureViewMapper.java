package io.testscucumber.backend.feature.views;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.shared.views.AbstractConfigurableMapper;
import ma.glasnost.orika.MapperFactory;

class FeatureViewMapper extends AbstractConfigurableMapper {

    @Override
    protected void doConfigure(final MapperFactory factory) {
        factory.classMap(Feature.class, FeatureHistoryItem.class)
            .byDefault()
            .register();

        factory.classMap(Feature.class, FeatureListItem.class)
            .byDefault()
            .register();
    }

}
