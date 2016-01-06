package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioResource {

    private final Scenario scenario;

    public ScenarioResource(Scenario scenario) {
        this.scenario = scenario;
    }

    @GET
    public Scenario get() {
        return scenario;
    }

}
