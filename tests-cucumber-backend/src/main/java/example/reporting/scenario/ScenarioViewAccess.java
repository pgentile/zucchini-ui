package example.reporting.scenario;

import example.reporting.api.scenario.ScenarioListItemView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ScenarioViewAccess {

    private final ScenarioDAO scenarioDAO;

    private final ScenarioViewMapper mapper = new ScenarioViewMapper();

    @Autowired
    public ScenarioViewAccess(ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;
    }

    public List<ScenarioListItemView> getScenariiByFeatureId(String featureId) {
        return scenarioDAO.createQuery()
            .field("featureId").equal(featureId)
            .asList()
            .stream()
            .map(scenario -> mapper.map(scenario, ScenarioListItemView.class))
            .collect(Collectors.toList());
    }

}
