package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.shared.views.AbstractConfigurableMapper;
import ma.glasnost.orika.MapperFactory;

class ScenarioViewMapper extends AbstractConfigurableMapper {

    @Override
    protected void doConfigure(final MapperFactory factory) {
        factory.classMap(Scenario.class, ScenarioListItemView.class)
            .byDefault()
            .register();

        factory.classMap(Scenario.class, ScenarioHistoryItemView.class)
            .byDefault()
            .register();
    }

}
