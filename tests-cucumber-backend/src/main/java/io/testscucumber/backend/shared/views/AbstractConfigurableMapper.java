package io.testscucumber.backend.shared.views;

import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.converter.builtin.PassThroughConverter;
import ma.glasnost.orika.impl.ConfigurableMapper;

import java.time.ZonedDateTime;

public abstract class AbstractConfigurableMapper extends ConfigurableMapper {

    @Override
    protected final void configure(final MapperFactory factory) {
        factory.getConverterFactory().registerConverter(new PassThroughConverter(ZonedDateTime.class));
        factory.getConverterFactory().registerConverter(new BasicInfoConverter());

        doConfigure(factory);
    }

    protected abstract void doConfigure(MapperFactory factory);

}
