package io.testscucumber.backend.testrun.rest;


import com.google.common.base.Strings;
import io.testscucumber.backend.reportconverter.domain.ReportConverterService;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import io.testscucumber.backend.testrun.domain.TestRunService;
import io.testscucumber.backend.testrun.views.ScenarioTagStats;
import io.testscucumber.backend.testrun.views.TestRunListItem;
import io.testscucumber.backend.testrun.views.TestRunViewAccess;
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
import java.util.function.Consumer;

@Component
@Path("/testRuns")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TestRunResource {

    private static final Logger LOGGER = LoggerFactory.getLogger(TestRunResource.class);

    private final TestRunRepository testRunRepository;

    private final TestRunService testRunService;

    private final TestRunViewAccess testRunViewAccess;

    private final ReportConverterService reportConverterService;

    private UriInfo uriInfo;

    @Autowired
    public TestRunResource(
        final TestRunRepository testRunRepository,
        final TestRunService testRunService,
        final TestRunViewAccess testRunViewAccess,
        final ReportConverterService reportConverterService
    ) {
        this.testRunRepository = testRunRepository;
        this.testRunService = testRunService;
        this.testRunViewAccess = testRunViewAccess;
        this.reportConverterService = reportConverterService;
    }

    @Context
    public void setUriInfo(final UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @GET
    public List<TestRunListItem> getLatests(
        @QueryParam("env") final String env,
        @QueryParam("withStats") @DefaultValue("false") final boolean withStats
    ) {
        Consumer<TestRunQuery> queryPreparator = TestRunQuery::orderByLatestFirst;
        if (!Strings.isNullOrEmpty(env)) {
            queryPreparator = queryPreparator.andThen(q -> q.withEnv(env));
        }

        return testRunViewAccess.getTestRunListItems(queryPreparator, withStats);
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateTestRunRequest request) {
        final TestRun testRun = new TestRun(request.getEnv());
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

    @GET
    @Path("{testRunId}/stats")
    public ScenarioStats getStatsForScenarii(@PathParam("testRunId") final String testRunId) {
        return testRunViewAccess.getStatsForScenariiByTestRunId(testRunId);
    }

    @GET
    @Path("{testRunId}/tags")
    public List<ScenarioTagStats> getTags(@PathParam("testRunId") final String testRunId) {
        return testRunViewAccess.getScenarioTagStats(testRunId);
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
        @QueryParam("group") final String group,
        @QueryParam("dryRun") @DefaultValue("false") final boolean dryRun,
        @QueryParam("onlyNewScenarii") @DefaultValue("false") final boolean onlyNewScenarii,
        @NotNull final InputStream inputStream
    ) {
        final TestRun testRun = testRunRepository.getById(testRunId);
        reportConverterService.convertAndSaveFeatures(testRun.getId(), inputStream, group, dryRun, onlyNewScenarii);
    }

}
