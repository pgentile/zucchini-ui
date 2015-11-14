package example.reporting.reporttomodel;

import example.reporting.model.Scenario;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.ObjectFactory;

import java.util.UUID;

class ScenarioObjectFactory implements ObjectFactory<Scenario> {

    @Override
    public Scenario create(final Object source, final MappingContext mappingContext) {
        final Scenario scenario = new Scenario();
        scenario.setId("SCENARIO-" + UUID.randomUUID().toString());
        return scenario;
    }

}
