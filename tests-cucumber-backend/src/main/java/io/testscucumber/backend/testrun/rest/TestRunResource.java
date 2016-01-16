package io.testscucumber.backend.testrun.rest;


import io.dropwizard.jersey.PATCH;
import io.testscucumber.backend.reportconverter.domain.ReportConverterService;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import io.testscucumber.backend.testrun.domain.TestRunService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.InputStream;
import java.net.URI;
import java.util.List;

@Component
@Path("/test-runs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TestRunResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestRunResource.class);

    private final TestRunRepository testRunRepository;

    private final TestRunService testRunService;

    private final ReportConverterService reportConverterService;

    private UriInfo uriInfo;

    @Autowired
    public TestRunResource(
        final TestRunRepository testRunRepository,
        final TestRunService testRunService, final ReportConverterService reportConverterService
    ) {
        this.testRunRepository = testRunRepository;
        this.testRunService = testRunService;
        this.reportConverterService = reportConverterService;
    }

    @Context
    public void setUriInfo(UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @GET
    public List<TestRun> getLatests(@QueryParam("env") final String env) {
        return testRunRepository.query(q -> q.withEnv(env).orderByLatestFirst())
            .find();
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateTestRunRequest request) {
        final TestRun testRun = new TestRun(request.getEnv(), request.getLabels());
        testRunRepository.save(testRun);

        final URI location = uriInfo.getBaseUriBuilder()
            .path("/test-runs/{testRunId}")
            .build(testRun.getId());

        final CreatedTestRunResponse response = new CreatedTestRunResponse(testRun.getId());
        return Response.created(location).entity(response).build();
    }

    @GET
    @Path("{testRunId}")
    public TestRun get(@PathParam("testRunId") final String testRunId) {
        LOGGER.debug("Get test run {}", testRunId);
        return testRunRepository.getById(testRunId);
    }

    @PATCH
    @Path("{testRunId}")
    public void update(@PathParam("testRunId") final String testRunId, @Valid @NotNull final UpdateTestRunRequest request) {
        final TestRun testRun = testRunRepository.getById(testRunId);
        testRun.setLabels(request.getLabels());
        testRunRepository.save(testRun);
    }

    @DELETE
    @Path("{testRunId}")
    public void delete(@PathParam("testRunId") final String testRunId) {
        testRunService.deleteById(testRunId);
    }

    @POST
    @Path("{testRunId}/import")
    public void importCucumberReport(
        @PathParam("testRunId") final String testRunId,
        @QueryParam("dry-run") @DefaultValue("false") final boolean dryRun,
        @NotNull final InputStream inputStream
    ) {
        reportConverterService.convertAndSaveFeatures(testRunId, inputStream, dryRun);
    }

}
