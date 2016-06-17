package io.zucchiniui.backend.testrun.views;

import io.zucchiniui.backend.shared.views.AbstractConfigurableMapper;
import io.zucchiniui.backend.testrun.domain.TestRun;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.converter.builtin.PassThroughConverter;

import java.time.ZonedDateTime;

class TestRunMapper extends AbstractConfigurableMapper {

    @Override
    protected void doConfigure(final MapperFactory factory) {
        factory.getConverterFactory().registerConverter(new PassThroughConverter(ZonedDateTime.class));

        factory.classMap(TestRun.class, TestRunListItem.class)
            .byDefault()
            .register();
    }

}
