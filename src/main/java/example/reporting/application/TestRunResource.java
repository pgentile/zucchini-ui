package example.reporting.application;

import example.reporting.reportconverter.app.ReportConverterAppService;
import example.reporting.testrun.domain.TestRunDAO;
import example.reporting.testrun.domain.TestRunFactory;
import example.reporting.testrun.model.TestRun;
import example.reporting.testrun.model.TestRunStatus;
import example.reporting.testrun.view.TestRunListItemView;
import example.reporting.testrun.view.TestRunViewAccess;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.InputStream;
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
            TestRunFactory testRunFactory,
            TestRunDAO testRunDAO,
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
    @Path("{testRunId}/import")
    public void importReport(@PathParam("testRunId") final String testRunId, final InputStream inputStream) {
        // FIXME This must be deleted
        final TestRun testRun = testRunFactory.create("TEST");
        testRun.setId(testRunId);
        testRun.setStatus(TestRunStatus.CLOSED);
        testRunDAO.save(testRun);

        reportConverterService.convertAndSaveFeatures(testRunId, inputStream);
    }

}
