package example.reporting.application;


import example.reporting.api.testrun.TestRun;
import example.reporting.api.testrun.TestRunStatus;
import example.reporting.api.testrun.UpdateTestRunRequest;
import example.reporting.reportconverter.ReportConverterService;
import example.reporting.scenario.ScenarioDAO;
import example.reporting.testrun.TestRunDAO;
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

    private final ScenarioDAO scenarioDAO;

    private final ReportConverterService reportConverterService;

    private final TestRun testRun;

    @Component
    public static class Factory {

        private final TestRunDAO testRunDAO;

        private final ScenarioDAO scenarioDAO;

        private final ReportConverterService reportConverterService;

        @Autowired
        public Factory(
            final TestRunDAO testRunDAO,
            final ScenarioDAO scenarioDAO,
            final ReportConverterService reportConverterService
        ) {
            this.testRunDAO = testRunDAO;
            this.scenarioDAO = scenarioDAO;
            this.reportConverterService = reportConverterService;
        }

        public TestRunResource create(final TestRun testRun) {
            return new TestRunResource(this, testRun);
        }

    }

    private TestRunResource(final Factory factory, final TestRun testRun) {
        this.testRunDAO = factory.testRunDAO;
        this.scenarioDAO = factory.scenarioDAO;
        this.reportConverterService = factory.reportConverterService;
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

        scenarioDAO.findByTestRunId(testRun.getId()).forEach(scenario -> {
            scenario.calculateStatusFromSteps();
            scenarioDAO.save(scenario);
        });

        testRun.close();
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
