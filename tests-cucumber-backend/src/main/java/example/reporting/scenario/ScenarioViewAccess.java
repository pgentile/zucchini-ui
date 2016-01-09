package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.ScenarioListItemView;
import ma.glasnost.orika.BoundMapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
class ScenarioViewAccess {

    private final ScenarioDAO scenarioDAO;

    private final BoundMapperFacade<Scenario, ScenarioListItemView> scenarioToListItemView;

    @Autowired
    public ScenarioViewAccess(ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;

        final ScenarioViewMapper mapper = new ScenarioViewMapper();
        scenarioToListItemView = mapper.dedicatedMapperFor(Scenario.class, ScenarioListItemView.class, false);
    }

    public List<ScenarioListItemView> getScenariiByFeatureId(String featureId) {
        return scenarioDAO.createQuery()
            .field("featureId").equal(featureId)
            .retrievedFields(true, "id", "info", "tags", "status", "testRunId")
            .order("info.name")
            .asList()
            .stream()
            .map(scenarioToListItemView::map)
            .collect(Collectors.toList());
    }

    public ScenarioListItemView getScenarioByTestRunIdAndScenarioKey(String testRunId, String scenarioKey) {
        final Scenario scenario = scenarioDAO.createQuery()
            .field("testRunId").equal(testRunId)
            .field("scenarioKey").equal(scenarioKey)
            .retrievedFields(true, "id", "info", "tags", "status", "testRunId")
            .get();
        return scenarioToListItemView.map(scenario);
    }

}
