package io.testscucumber.backend.testrun.views;

import io.testscucumber.backend.testrun.domain.TestRun;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.converter.builtin.PassThroughConverter;
import ma.glasnost.orika.impl.ConfigurableMapper;

import java.time.ZonedDateTime;

class TestRunMapper extends ConfigurableMapper {

    @Override
    protected void configure(final MapperFactory factory) {
        factory.getConverterFactory().registerConverter(new PassThroughConverter(ZonedDateTime.class));

        factory.classMap(TestRun.class, TestRunListItem.class)
            .byDefault()
            .register();
    }

}
