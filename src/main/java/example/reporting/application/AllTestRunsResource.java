package example.reporting.application;

import example.reporting.reportconverter.domain.ReportConverterService;
import example.reporting.testrun.domain.TestRunDAO;
import example.reporting.testrun.domain.TestRunFactory;
import example.reporting.testrun.model.TestRun;
import example.reporting.testrun.view.CreateTestRunRequest;
import example.reporting.testrun.view.TestRunListItemView;
import example.reporting.testrun.view.TestRunViewAccess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
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

@Path("/test-runs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AllTestRunsResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(AllTestRunsResource.class);

    private final TestRunFactory testRunFactory;

    private final TestRunDAO testRunDAO;

    private final TestRunViewAccess testRunViewAccess;

    private final ReportConverterService reportConverterService;

    public AllTestRunsResource(
            final TestRunFactory testRunFactory,
            final TestRunDAO testRunDAO,
            final TestRunViewAccess testRunViewAccess,
            final ReportConverterService reportConverterService
    ) {
        this.testRunFactory = testRunFactory;
        this.testRunDAO = testRunDAO;
        this.testRunViewAccess = testRunViewAccess;
        this.reportConverterService = reportConverterService;
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateTestRunRequest request) {
        final TestRun testRun = testRunFactory.create(request.getEnv());
        testRun.setLabels(request.getLabels());
        testRunDAO.save(testRun);

        final URI location = UriBuilder.fromPath("/test-runs/{testRunId}")
                .build(testRun.getId());

        return Response.created(location).build();
    }

    @GET
    public List<TestRunListItemView> getLatestTestRuns() {
        return testRunViewAccess.getLatests();
    }

    @Path("{testRunId}")
    public TestRunResource getTestRun(@PathParam("testRunId") final String testRunId) {
        LOGGER.debug("Get test run {}", testRunId);

        final TestRun testRun = testRunDAO.get(testRunId);
        if (testRun == null) {
            throw new NotFoundException("Test run with ID '" + testRunId + "' doesn't exist");
        }
        return new TestRunResource(testRunDAO, reportConverterService, testRun);
    }

}
