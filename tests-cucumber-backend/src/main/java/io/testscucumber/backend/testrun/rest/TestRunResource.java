package io.testscucumber.backend.testrun.rest;


import com.google.common.base.Strings;
import io.dropwizard.jersey.PATCH;
import io.testscucumber.backend.reportconverter.domain.ReportConverterService;
import io.testscucumber.backend.testrun.domain.Label;
import io.testscucumber.backend.testrun.domain.TestRun;
import io.testscucumber.backend.testrun.domain.TestRunQuery;
import io.testscucumber.backend.testrun.domain.TestRunRepository;
import io.testscucumber.backend.testrun.domain.TestRunService;
import io.testscucumber.backend.testrun.views.TestRunListItem;
import io.testscucumber.backend.testrun.views.TestRunScenarioDiff;
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
import java.util.Optional;
import java.util.function.Consumer;
import java.util.stream.Collectors;

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
        @QueryParam("type") final String type,
        @QueryParam("withStats") @DefaultValue("false") final boolean withStats
    ) {
        Consumer<TestRunQuery> queryPreparator = TestRunQuery::orderByLatestFirst;
        if (!Strings.isNullOrEmpty(type)) {
            queryPreparator = queryPreparator.andThen(q -> q.withType(type));
        }

        return testRunViewAccess.getTestRunListItems(queryPreparator, withStats);
    }

    @POST
    @Path("create")
    public Response create(@Valid @NotNull final CreateTestRunRequest request) {
        final TestRun testRun = new TestRun(request.getType());

        convertRequestLabels(request.getLabels()).ifPresent(testRun::setLabels);

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

        if (!Strings.isNullOrEmpty(request.getType())) {
            testRun.setType(request.getType());
        }

        convertRequestLabels(request.getLabels()).ifPresent(testRun::setLabels);

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
        @QueryParam("group") final String groupStr,
        @QueryParam("dryRun") @DefaultValue("false") final boolean dryRun,
        @QueryParam("onlyNewScenarii") @DefaultValue("false") final boolean onlyNewScenarii,
        @NotNull final InputStream inputStream
    ) {
        final TestRun testRun = testRunRepository.getById(testRunId);
        final Optional<String> group = Optional.ofNullable(Strings.emptyToNull(groupStr));
        reportConverterService.convertAndSaveFeatures(testRun.getId(), inputStream, group, dryRun, onlyNewScenarii);
    }

    @GET
    @Path("{leftTestRunId}/scenarioDiff/{rightTestRunId}")
    public TestRunScenarioDiff getScenarioDiff(@PathParam("leftTestRunId") final String leftTestRunId, @PathParam("rightTestRunId") final String rightTestRunId) {
        return testRunViewAccess.getScenarioDiff(leftTestRunId, rightTestRunId);
    }

    private static Optional<List<Label>> convertRequestLabels(final List<RequestLabel> requestLabels) {
        if (requestLabels == null) {
            return Optional.empty();
        }

        final List<Label> labels = requestLabels.stream()
            .map(requestLabel -> new Label(requestLabel.getName(), requestLabel.getValue(), requestLabel.getUrl()))
            .collect(Collectors.toList());

        return Optional.of(labels);
    }

}
