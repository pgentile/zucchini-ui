package io.testscucumber.backend.scenario.views;

import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.scenario.domainimpl.ScenarioDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScenarioStatusAccess {

    private final ScenarioDAO scenarioDAO;

    @Autowired
    public ScenarioStatusAccess(final ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;
    }

    public List<ScenarioStatus> getScenariiStatusByFeatureId(final String featureId) {
        return scenarioDAO.prepareTypedQuery(q -> q.withFeatureId(featureId))
            .retrievedFields(true, "id", "status")
            .asList()
            .stream()
            .map(Scenario::getStatus)
            .collect(Collectors.toList());
    }

}
