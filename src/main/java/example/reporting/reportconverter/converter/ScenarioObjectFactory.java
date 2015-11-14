package example.reporting.reportconverter.converter;

import example.reporting.scenario.domain.ScenarioRepository;
import example.reporting.scenario.model.Scenario;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.ObjectFactory;

class ScenarioObjectFactory implements ObjectFactory<Scenario> {

    private final ScenarioRepository scenarioRepository;

    public ScenarioObjectFactory(final ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    @Override
    public Scenario create(final Object source, final MappingContext mappingContext) {
        final String testRunId = (String) mappingContext.getProperty(MappingContextKey.TEST_RUN_ID);
        final String featureId = (String) mappingContext.getProperty(MappingContextKey.FEATURE_ID);
        return scenarioRepository.create(testRunId, featureId);
    }

}
