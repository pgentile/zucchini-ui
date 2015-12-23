package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.ScenarioListItemView;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

class ScenarioViewMapper extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory factory) {
        factory.classMap(Scenario.class, ScenarioListItemView.class)
            .byDefault()
            .register();
    }

}
