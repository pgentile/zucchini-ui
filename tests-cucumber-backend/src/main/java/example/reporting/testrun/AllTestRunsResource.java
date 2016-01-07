package example.reporting.testrun;

import example.reporting.api.testrun.CreateTestRunRequest;
import example.reporting.api.testrun.CreatedTestRunResponse;
import example.reporting.api.testrun.TestRun;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.net.URI;
import java.util.List;

@Component
@Path("/test-runs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AllTestRunsResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(AllTestRunsResource.class);

    private final TestRunFactory testRunFactory;

    private final TestRunDAO testRunDAO;

    private final TestRunResource.Factory testRunResourceFactory;

    @Autowired
    public AllTestRunsResource(
        final TestRunFactory testRunFactory,
        final TestRunDAO testRunDAO,
        final TestRunResource.Factory testRunResourceFactory
    ) {
        this.testRunFactory = testRunFactory;
        this.testRunDAO = testRunDAO;
        this.testRunResourceFactory = testRunResourceFactory;
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateTestRunRequest request) {
        final TestRun testRun = testRunFactory.create(request.getEnv());
        testRun.setLabels(request.getLabels());
        testRunDAO.save(testRun);

        final URI location = UriBuilder.fromPath("/test-runs/{testRunId}")
                .build(testRun.getId());

        final CreatedTestRunResponse response = new CreatedTestRunResponse(testRun.getId());
        return Response.created(location).entity(response).build();
    }

    @GET
    public List<TestRun> getLatestTestRuns(@BeanParam final LatestTestRunsParams params) {
        return testRunDAO.getLatests(params);
    }

    @Path("{testRunId}")
    public TestRunResource getTestRun(@PathParam("testRunId") final String testRunId) {
        LOGGER.debug("Get test run {}", testRunId);

        final TestRun testRun = testRunDAO.get(testRunId);
        if (testRun == null) {
            throw new NotFoundException("Test run with ID '" + testRunId + "' doesn't exist");
        }

        return testRunResourceFactory.create(testRun);
    }

}
