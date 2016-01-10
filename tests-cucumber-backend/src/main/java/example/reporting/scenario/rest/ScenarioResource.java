package example.reporting.scenario.rest;

import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.StepStatus;
import example.reporting.scenario.domainimpl.ScenarioDAO;
import example.reporting.scenario.views.ScenarioListItemView;
import example.reporting.scenario.views.ScenarioViewAccess;
import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Path("/scenarii")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioResource {

    private final ScenarioViewAccess scenarioViewAccess;

    private final ScenarioDAO scenarioDAO;

    private final TestRunRepository testRunRepository;

    @Autowired
    public ScenarioResource(
        ScenarioViewAccess scenarioViewAccess,
        ScenarioDAO scenarioDAO,
        TestRunRepository testRunRepository
    ) {
        this.scenarioViewAccess = scenarioViewAccess;
        this.scenarioDAO = scenarioDAO;
        this.testRunRepository = testRunRepository;
    }

    @GET
    public List<ScenarioListItemView> getScenarii(@QueryParam("featureId") String featureId) {
        return scenarioViewAccess.getScenariiByFeatureId(featureId);
    }

    @GET
    @Path("{scenarioId}")
    public Scenario get(@PathParam("scenarioId") String scenarioId) {
        return scenarioDAO.get(scenarioId);
    }

    @POST
    @Path("{scenarioId}/changeStatus/passed")
    public void changeStatusToPassed(@PathParam("scenarioId") String scenarioId) {
        Scenario scenario = scenarioDAO.get(scenarioId);
        scenario.changeStatus(StepStatus.PASSED);
        scenarioDAO.save(scenario);
    }

    @POST
    @Path("{scenarioId}/changeStatus/failed")
    public void changeStatusToFailed(@PathParam("scenarioId") String scenarioId) {
        Scenario scenario = scenarioDAO.get(scenarioId);
        scenario.changeStatus(StepStatus.FAILED);
        scenarioDAO.save(scenario);
    }

    @GET
    @Path("{scenarioId}/history")
    public List<ScenarioListItemView> getHistory(@PathParam("scenarioId") String scenarioId) {
        final Scenario scenario = scenarioDAO.get(scenarioId);
        final TestRun scenarioTestRun = testRunRepository.getById(scenario.getTestRunId());

        return testRunRepository.query()
            .orderByLatestFirst()
            .withEnv(scenarioTestRun.getEnv())
            .find()
            .stream()
            .map(testRun -> scenarioViewAccess.getScenarioByTestRunIdAndScenarioKey(testRun.getId(), scenario.getScenarioKey()))
            .collect(Collectors.toList());
    }
}
