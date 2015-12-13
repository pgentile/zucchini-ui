package example.reporting.testrun.view;

import example.reporting.testrun.model.TestRun;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

class TestRunViewMapper extends ConfigurableMapper {

    @Override
    protected void configure(final MapperFactory factory) {
        factory.classMap(TestRun.class, TestRunListItemView.class)
                .byDefault()
                .register();
    }

}
