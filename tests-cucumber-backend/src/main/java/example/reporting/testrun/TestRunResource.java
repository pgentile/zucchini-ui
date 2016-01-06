package example.reporting.testrun;


import example.reporting.api.testrun.TestRun;
import example.reporting.api.testrun.TestRunStatus;
import example.reporting.api.testrun.UpdateTestRunRequest;
import example.reporting.reportconverter.ReportConverterService;
import io.dropwizard.jersey.PATCH;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TestRunResource {

    private final TestRunDAO testRunDAO;

    private final ReportConverterService reportConverterService;

    private final TestRunService testRunService;

    private final TestRun testRun;

    @Component
    public static class Factory {

        private final TestRunDAO testRunDAO;

        private final ReportConverterService reportConverterService;

        private final TestRunService testRunService;

        @Autowired
        public Factory(
            final TestRunDAO testRunDAO,
            final ReportConverterService reportConverterService,
            final TestRunService testRunService
        ) {
            this.testRunDAO = testRunDAO;
            this.reportConverterService = reportConverterService;
            this.testRunService = testRunService;
        }

        public TestRunResource create(final TestRun testRun) {
            return new TestRunResource(this, testRun);
        }

    }

    private TestRunResource(final Factory factory, final TestRun testRun) {
        testRunDAO = factory.testRunDAO;
        reportConverterService = factory.reportConverterService;
        testRunService = factory.testRunService;

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
        ensureTestRunIsOpen();

        testRunService.close(testRun);
        testRunDAO.save(testRun);
    }

    @POST
    @Path("import")
    public void importReport(
        @QueryParam("dry-run") @DefaultValue("false") final boolean dryRun,
        @NotNull final InputStream inputStream
    ) {
        ensureTestRunIsOpen();

        reportConverterService.convertAndSaveFeatures(testRun.getId(), inputStream, dryRun);
    }

    private void ensureTestRunIsOpen() {
        if (testRun.getStatus() != TestRunStatus.OPEN) {
            throw new WebApplicationException("Test run '" + testRun.getId() + "' is not open", Response.Status.CONFLICT);
        }
    }

}
