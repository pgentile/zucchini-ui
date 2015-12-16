package example.reporting.application;

import com.google.common.base.Strings;
import example.reporting.scenario.ScenarioDAO;
import example.reporting.api.scenario.Scenario;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/scenarii")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AllScenariiResource {

    private final ScenarioDAO scenarioDAO;

    @Autowired
    public AllScenariiResource(ScenarioDAO scenarioDAO) {
        this.scenarioDAO = scenarioDAO;
    }

    @GET
    public List<Scenario> getScenarii(@QueryParam("featureId") String featureId) {
        Query<Scenario> query = scenarioDAO.createQuery();
        if (!Strings.isNullOrEmpty(featureId)) {
            query = query.field("featureId").equal(featureId);
        }
        return query.asList();
    }

}
