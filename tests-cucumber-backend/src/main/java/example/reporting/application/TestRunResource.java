package example.reporting.application;


import example.reporting.reportconverter.domain.ReportConverterService;
import example.reporting.testrun.domain.TestRunDAO;
import example.reporting.testrun.model.TestRun;
import example.reporting.testrun.model.TestRunStatus;
import example.reporting.testrun.view.UpdateTestRunRequest;
import io.dropwizard.jersey.PATCH;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TestRunResource {

    private final TestRunDAO testRunDAO;

    private final ReportConverterService reportConverterService;

    private final TestRun testRun;

    public TestRunResource(
            final TestRunDAO testRunDAO,
            final ReportConverterService reportConverterService,
            final TestRun testRun
    ) {
        this.testRunDAO = testRunDAO;
        this.reportConverterService = reportConverterService;
        this.testRun = testRun;
    }

    @GET
    public TestRun get() {
        return testRun;
    }

    @PATCH
    public void update(@Valid @NotNull final UpdateTestRunRequest request) {
        testRun.setLabels(request.getLabels());
        testRunDAO.save(testRun);
    }

    @POST
    @Path("close")
    public void close() {
        if (testRun.getStatus() != TestRunStatus.OPEN) {
            throw new WebApplicationException("Test run '" + testRun.getId() + "' is not open", Response.Status.CONFLICT);
        }

        testRun.close();
        testRunDAO.save(testRun);
    }

    @POST
    @Path("import")
    public void importReport(@NotNull final InputStream inputStream) {
        if (testRun.getStatus() != TestRunStatus.OPEN) {
            throw new WebApplicationException("Test run '" + testRun.getId() + "' is not open", Response.Status.CONFLICT);
        }

        reportConverterService.convertAndSaveFeatures(testRun.getId(), inputStream);
    }

}
