package example.reporting.scenario.domainimpl;

import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.ScenarioFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
class ScenarioFactoryImpl implements ScenarioFactory {

    @Override
    public Scenario create(final String testRunId, final String featureId) {
        final Scenario scenario = new Scenario();
        scenario.setId(UUID.randomUUID().toString());
        scenario.setTestRunId(testRunId);
        scenario.setFeatureId(featureId);
        return scenario;
    }

}
