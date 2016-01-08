package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.StepStatus;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ScenarioFactory {

    public Scenario create(final String testRunId, final String featureId) {
        final Scenario scenario = new Scenario();
        scenario.setId(UUID.randomUUID().toString());
        scenario.setStatus(StepStatus.UNDEFINED);
        scenario.setTestRunId(testRunId);
        scenario.setFeatureId(featureId);
        return scenario;
    }

}
