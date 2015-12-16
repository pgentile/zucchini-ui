package example.reporting.testrun;

import example.reporting.api.testrun.TestRun;
import example.reporting.api.testrun.TestRunListItemView;
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
