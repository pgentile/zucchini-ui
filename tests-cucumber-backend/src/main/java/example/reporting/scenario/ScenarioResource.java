package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioResource {

    private final ScenarioDAO scenarioDAO;

    private final ScenarioService scenarioService;

    private final ScenarioHistoryResource.Factory historyResourceFactory;

    private final Scenario scenario;

    @Component
    public static class Factory {

        private final ScenarioDAO scenarioDAO;

        private final ScenarioService scenarioService;

        private final ScenarioHistoryResource.Factory historyResourceFactory;

        @Autowired
        public Factory(
            ScenarioDAO scenarioDAO,
            ScenarioService scenarioService,
            ScenarioHistoryResource.Factory historyResourceFactory
        ) {
            this.scenarioDAO = scenarioDAO;
            this.scenarioService = scenarioService;
            this.historyResourceFactory = historyResourceFactory;
        }

        public ScenarioResource create(Scenario scenario) {
            return new ScenarioResource(this, scenario);
        }

    }

    private ScenarioResource(Factory factory, Scenario scenario) {
        scenarioDAO = factory.scenarioDAO;
        scenarioService = factory.scenarioService;
        historyResourceFactory = factory.historyResourceFactory;
        this.scenario = scenario;
    }

    @GET
    public Scenario get() {
        return scenario;
    }

    @POST
    @Path("changeStatusToPassed")
    public void changeStatusToPassed() {
        scenarioService.changeStatusToPassed(scenario);
        scenarioDAO.save(scenario);
    }

    @Path("history")
    public ScenarioHistoryResource getHistory() {
        return historyResourceFactory.create(scenario.getScenarioKey(), scenario.getTestRunId());
    }

}
