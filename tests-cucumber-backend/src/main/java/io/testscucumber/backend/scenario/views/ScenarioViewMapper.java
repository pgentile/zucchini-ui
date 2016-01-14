package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.domain.Scenario;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

class ScenarioViewMapper extends ConfigurableMapper {

    @Override
    protected void configure(final MapperFactory factory) {
        factory.classMap(Scenario.class, ScenarioListItemView.class)
            .byDefault()
            .register();
    }

}
