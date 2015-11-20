package example.reporting.application;

import example.reporting.reportconverter.app.ReportConverterAppService;
import example.reporting.testrun.domain.TestRunDAO;
import example.reporting.testrun.domain.TestRunFactory;
import example.reporting.testrun.model.TestRun;
import example.reporting.testrun.model.TestRunStatus;
import example.reporting.testrun.view.CreateTestRunRequest;
import example.reporting.testrun.view.TestRunListItemView;
import example.reporting.testrun.view.TestRunViewAccess;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import java.io.InputStream;
import java.net.URI;
import java.util.List;

@Path("/test-runs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TestRunResource {

    private final TestRunFactory testRunFactory;

    private final TestRunDAO testRunDAO;

    private final TestRunViewAccess testRunViewAccess;

    private final ReportConverterAppService reportConverterService;

    public TestRunResource(
            final TestRunFactory testRunFactory,
            final TestRunDAO testRunDAO,
            final TestRunViewAccess testRunViewAccess,
            final ReportConverterAppService reportConverterService
    ) {
        this.testRunFactory = testRunFactory;
        this.testRunDAO = testRunDAO;
        this.testRunViewAccess = testRunViewAccess;
        this.reportConverterService = reportConverterService;
    }

    @GET
    public List<TestRunListItemView> getLatestTestRuns() {
        return testRunViewAccess.getLatests();
    }

    @POST
    @Path("create")
    public Response createTestRun(CreateTestRunRequest request) {
        final TestRun testRun = testRunFactory.create(request.getEnv());
        testRun.setLabels(request.getLabels());
        testRunDAO.save(testRun);

        final URI location = UriBuilder.fromMethod(getClass(), "getTestRun")
                .build(testRun.getId());

        return Response.created(location).build();
    }

    @GET
    @Path("{testRunId}")
    public TestRun getTestRun(@PathParam("testRunId") final String testRunId) {
        final TestRun testRun = testRunDAO.get(testRunId);
        if (testRun == null) {
            throw new NotFoundException("Test run with ID '" + testRunId + "' doesn't exist");
        }
        return testRun;
    }

    @POST
    @Path("{testRunId}/close")
    public void close(@PathParam("testRunId") final String testRunId) {
        final TestRun testRun = testRunDAO.get(testRunId);

        if (testRun == null) {
            throw new IllegalArgumentException("Test run '"+ testRunId + "' doesn't exist");
        }
        if (testRun.getStatus() != TestRunStatus.OPEN) {
            throw new WebApplicationException("Test run '" + testRunId + "' is not open", Response.Status.CONFLICT);
        }

        testRun.close();
        testRunDAO.save(testRun);
    }

    @POST
    @Path("{testRunId}/import")
    public void importReport(@PathParam("testRunId") final String testRunId, final InputStream inputStream) {
        final TestRun testRun = testRunDAO.get(testRunId);

        if (testRun == null) {
            throw new NotFoundException("Test run with ID '" + testRunId + "' doesn't exist");
        }
        if (testRun.getStatus() != TestRunStatus.OPEN) {
            throw new WebApplicationException("Test run '" + testRunId + "' is not open", Response.Status.CONFLICT);
        }

        reportConverterService.convertAndSaveFeatures(testRunId, inputStream);
    }

}
