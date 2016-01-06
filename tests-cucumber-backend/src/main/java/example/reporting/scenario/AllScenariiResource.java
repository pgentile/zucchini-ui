package example.reporting.scenario;

import example.reporting.api.scenario.Scenario;
import example.reporting.api.scenario.ScenarioListItemView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/scenarii")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AllScenariiResource {

    private final ScenarioViewAccess scenarioViewAccess;

    private final ScenarioDAO scenarioDAO;

    @Autowired
    public AllScenariiResource(ScenarioViewAccess scenarioViewAccess, ScenarioDAO scenarioDAO) {
        this.scenarioViewAccess = scenarioViewAccess;
        this.scenarioDAO = scenarioDAO;
    }

    @GET
    public List<ScenarioListItemView> getScenarii(@QueryParam("featureId") String featureId) {
        return scenarioViewAccess.getScenariiByFeatureId(featureId);
    }

    @Path("{scenarioId}")
    public ScenarioResource getScenario(@PathParam("scenarioId") String scenarioId) {
        final Scenario scenario = scenarioDAO.get(scenarioId);
        if (scenario == null) {
            throw new NotFoundException("Scenario with ID '" + scenarioId + "' doesn't exist");
        }
        return new ScenarioResource(scenario);
    }

}
