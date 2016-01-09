package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioResource {

    private final ScenarioHistoryResource.Factory historyResourceFactory;

    private final Scenario scenario;

    public ScenarioResource(ScenarioHistoryResource.Factory historyResourceFactory, Scenario scenario) {
        this.historyResourceFactory = historyResourceFactory;
        this.scenario = scenario;
    }

    @GET
    public Scenario get() {
        return scenario;
    }

    @Path("history")
    public ScenarioHistoryResource getHistory() {
        return historyResourceFactory.create(scenario.getScenarioKey(), scenario.getTestRunId());
    }

}
