package io.zucchiniui.backend.scenario.views;

import io.zucchiniui.backend.scenario.domain.Scenario;
import io.zucchiniui.backend.shared.views.AbstractConfigurableMapper;
import ma.glasnost.orika.CustomConverter;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.metadata.Type;

import java.util.Optional;

class ScenarioViewMapper extends AbstractConfigurableMapper {

    @Override
    protected void doConfigure(final MapperFactory factory) {
        factory.getConverterFactory().registerConverter("optionalOrNull", new OptionalOrNullConverter<>());

        factory.classMap(Scenario.class, ScenarioListItemView.class)
            .byDefault()
            .register();

        factory.classMap(Scenario.class, FailedScenarioListItemView.class)
            .byDefault()
            .register();

        factory.classMap(Scenario.class, ScenarioHistoryItemView.class)
            .byDefault()
            .register();

        factory.classMap(Scenario.class, FailedScenarioListItemView.class)
            .fieldMap("errorMessage").aToB().converter("optionalOrNull").add()
            .byDefault()
            .register();
    }

    private static class OptionalOrNullConverter<T> extends CustomConverter<Optional<T>, T> {

        @Override
        public T convert(Optional<T> source, Type<? extends T> destinationType, MappingContext mappingContext) {
            return source.orElse(null);
        }

    }

}
