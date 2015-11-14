package example.reporting.scenario.domain;

import example.reporting.scenario.model.Scenario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ScenarioService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ScenarioService.class);

    private final ScenarioDAO scenarioDAO;

    public ScenarioService(final ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;
    }

    public void save(final Scenario scenario) {
        LOGGER.info("Saving scenario {}", scenario.getId());

        // FIXME Check ID

        scenarioDAO.save(scenario);
    }

}
