package example.reporting.scenario.views;

import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domainimpl.ScenarioDAO;
import ma.glasnost.orika.BoundMapperFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScenarioViewAccess {

    private final ScenarioDAO scenarioDAO;

    private final BoundMapperFacade<Scenario, ScenarioListItemView> scenarioToListItemView;

    @Autowired
    public ScenarioViewAccess(final ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;

        final ScenarioViewMapper mapper = new ScenarioViewMapper();
        scenarioToListItemView = mapper.dedicatedMapperFor(Scenario.class, ScenarioListItemView.class, false);
    }

    public List<ScenarioListItemView> getScenariiByFeatureId(final String featureId) {
        return scenarioDAO.prepareTypedQuery(q -> q.withFeatureId(featureId).orderedByScenarioName())
            .retrievedFields(true, "id", "info", "tags", "status", "testRunId")
            .order("info.name")
            .asList()
            .stream()
            .map(scenarioToListItemView::map)
            .collect(Collectors.toList());
    }

    public ScenarioListItemView getScenarioByTestRunIdAndScenarioKey(final String testRunId, final String scenarioKey) {
        final Scenario scenario = scenarioDAO.prepareTypedQuery(q -> q.withTestRunId(testRunId).withScenarioKey(scenarioKey))
            .retrievedFields(true, "id", "info", "tags", "status", "testRunId")
            .get();
        return scenarioToListItemView.map(scenario);
    }

}
