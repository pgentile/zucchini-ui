package example.reporting.scenario.rest;

import example.reporting.scenario.domain.Scenario;
import example.reporting.scenario.domain.ScenarioRepository;
import example.reporting.scenario.domain.ScenarioService;
import example.reporting.scenario.domain.ScenarioStatus;
import example.reporting.scenario.views.ScenarioListItemView;
import example.reporting.scenario.views.ScenarioViewAccess;
import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Path("/scenarii")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioResource {

    private final ScenarioViewAccess scenarioViewAccess;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioService scenarioService;

    private final TestRunRepository testRunRepository;

    @Autowired
    public ScenarioResource(
        final ScenarioViewAccess scenarioViewAccess,
        final ScenarioRepository scenarioRepository,
        ScenarioService scenarioService,
        final TestRunRepository testRunRepository
    ) {
        this.scenarioViewAccess = scenarioViewAccess;
        this.scenarioRepository = scenarioRepository;
        this.scenarioService = scenarioService;
        this.testRunRepository = testRunRepository;
    }

    @GET
    public List<ScenarioListItemView> getScenarii(@QueryParam("featureId") final String featureId) {
        return scenarioViewAccess.getScenariiByFeatureId(featureId);
    }

    @GET
    @Path("{scenarioId}")
    public Scenario get(@PathParam("scenarioId") final String scenarioId) {
        return scenarioRepository.getById(scenarioId);
    }

    @DELETE
    @Path("{scenarioId}")
    public void delete(@PathParam("scenarioId") final String scenarioId) {
        scenarioService.deleteById(scenarioId);
    }

    @POST
    @Path("{scenarioId}/changeStatus/{status}")
    public void changeStatus(@PathParam("scenarioId") final String scenarioId, @PathParam("status") final String status) {
        final Set<String> possibleStatus = Arrays.asList(ScenarioStatus.values())
            .stream()
            .map(s -> s.name().toLowerCase().replace('_', '-'))
            .collect(Collectors.toSet());

        if (!possibleStatus.contains(status)) {
            throw new NotFoundException("Unknown new status: " + status);
        }

        final ScenarioStatus newStatus = ScenarioStatus.valueOf(status.toUpperCase().replace('-', '_'));

        final Scenario scenario = scenarioRepository.getById(scenarioId);
        scenarioService.updateStatus(scenario, newStatus);
    }

    @GET
    @Path("{scenarioId}/history")
    public List<ScenarioListItemView> getHistory(@PathParam("scenarioId") final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        final TestRun scenarioTestRun = testRunRepository.getById(scenario.getTestRunId());

        final List<String> testRunIds = testRunRepository.query(q -> q.withEnv(scenarioTestRun.getEnv()))
            .find()
            .stream()
            .map(TestRun::getId)
            .collect(Collectors.toList());

        // FIXME Order by date
        return scenarioViewAccess.getScenariiByScenarioKeyAndOneOfTestRunIds(scenario.getScenarioKey(), testRunIds);
    }
}
