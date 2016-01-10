package example.reporting.reportconverter.converter;

import example.reporting.scenario.domain.ScenarioFactory;
import example.reporting.scenario.domain.Scenario;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.ObjectFactory;

class ScenarioObjectFactory implements ObjectFactory<Scenario> {

    private final ScenarioFactory scenarioFactory;

    public ScenarioObjectFactory(final ScenarioFactory scenarioFactory) {
        this.scenarioFactory = scenarioFactory;
    }

    @Override
    public Scenario create(final Object source, final MappingContext mappingContext) {
        final String testRunId = (String) mappingContext.getProperty(MappingContextKey.TEST_RUN_ID);
        final String featureId = (String) mappingContext.getProperty(MappingContextKey.FEATURE_ID);
        return scenarioFactory.create(testRunId, featureId);
    }

}
