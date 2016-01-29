package io.testscucumber.backend.scenario.rest;

import com.google.common.base.Strings;
import com.google.common.collect.Sets;
import io.testscucumber.backend.comment.domain.CommentReference;
import io.testscucumber.backend.comment.domain.CommentReferenceType;
import io.testscucumber.backend.comment.rest.CommentResource;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioQuery;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.domain.ScenarioService;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.scenario.views.ScenarioHistoryItemView;
import io.testscucumber.backend.scenario.views.ScenarioListItemView;
import io.testscucumber.backend.scenario.views.ScenarioStats;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import io.testscucumber.backend.testrun.views.ScenarioTagStats;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.BeanParam;
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
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Component
@Path("/scenarii")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class ScenarioResource {

    private final ScenarioViewAccess scenarioViewAccess;

    private final ScenarioRepository scenarioRepository;

    private final ScenarioService scenarioService;

    private final CommentResource.Factory commentResourceFactory;

    private UriInfo uriInfo;

    @Autowired
    public ScenarioResource(
        final ScenarioViewAccess scenarioViewAccess,
        final ScenarioRepository scenarioRepository,
        final ScenarioService scenarioService,
        final CommentResource.Factory commentResourceFactory
    ) {
        this.scenarioViewAccess = scenarioViewAccess;
        this.scenarioRepository = scenarioRepository;
        this.scenarioService = scenarioService;
        this.commentResourceFactory = commentResourceFactory;
    }

    @Context
    public void setUriInfo(final UriInfo uriInfo) {
        this.uriInfo = uriInfo;
    }

    @GET
    public List<ScenarioListItemView> getScenarii(@BeanParam final GetScenariiRequestParams requestParams) {
        final Consumer<ScenarioQuery> queryPreparator = q -> {
            if (!Strings.isNullOrEmpty(requestParams.getTestRunId())) {
                q.withTestRunId(requestParams.getTestRunId());
            }
            if (!Strings.isNullOrEmpty(requestParams.getFeatureId())) {
                q.withFeatureId(requestParams.getFeatureId());
            }
            if (!requestParams.getTags().isEmpty()) {
                q.withTags(requestParams.getTags());
            }
            q.orderedByName();
        };

        return scenarioViewAccess.getScenarioListItems(queryPreparator);
    }

    @GET
    @Path("tags")
    public List<ScenarioTagStats> getStats(@BeanParam final GetScenariiRequestParams requestParams) {
        // Filter scenarii
        final Consumer<ScenarioQuery> tagsQueryPreparator = q -> {
            if (!Strings.isNullOrEmpty(requestParams.getTestRunId())) {
                q.withTestRunId(requestParams.getTestRunId());
            }
            if (!Strings.isNullOrEmpty(requestParams.getFeatureId())) {
                q.withFeatureId(requestParams.getFeatureId());
            }
        };

        // Filter tags if requested
        Predicate<String> tagFilter = ignored -> true;
        if (!requestParams.getTags().isEmpty()) {
            tagFilter = tag -> requestParams.getTags().contains(tag);
        }

        return scenarioViewAccess.getTags(tagsQueryPreparator).stream()
            .filter(tagFilter)
            .map(tag -> {
                final ScenarioStats stats = scenarioViewAccess.getStats(tagsQueryPreparator.andThen(q -> q.withTag(tag)));
                return new ScenarioTagStats(tag, stats);
            })
            .sorted(Comparator.comparing(ScenarioTagStats::getTag))
            .collect(Collectors.toList());
    }

    @GET
    @Path("{scenarioId}")
    public Scenario get(@PathParam("scenarioId") final String scenarioId) {
        return scenarioRepository.getById(scenarioId);
    }

    @DELETE
    @Path("{scenarioId}")
    public void delete(@PathParam("scenarioId") final String scenarioId) {
        scenarioService.deleteById(scenarioId);
    }

    @POST
    @Path("{scenarioId}/changeStatus/{status}")
    public void changeStatus(@PathParam("scenarioId") final String scenarioId, @PathParam("status") final ScenarioStatus newStatus) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        scenarioService.updateStatus(scenario, newStatus);
    }

    @GET
    @Path("{scenarioId}/history")
    public List<ScenarioHistoryItemView> getHistory(@PathParam("scenarioId") final String scenarioId, @QueryParam("sameTestRunEnv") @DefaultValue("true") final boolean sameTestRunEnv) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);

        return scenarioViewAccess.getScenarioHistory(scenario.getScenarioKey());
    }

    @Path("{scenarioId}/comments")
    public CommentResource getComments(@PathParam("scenarioId") final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);

        final Set<CommentReference> mainReferences = Collections.singleton(
            CommentReferenceType.SCENARIO_KEY.createReference(scenario.getScenarioKey())
        );

        final Set<CommentReference> extraReferences = Sets.newHashSet(
            CommentReferenceType.TEST_RUN_ID.createReference(scenario.getTestRunId()),
            CommentReferenceType.SCENARIO_ID.createReference(scenario.getId())
        );

        final URI commentsUri = uriInfo.getBaseUriBuilder()
            .path("/scenarii/{scenarioId}/comments")
            .build(scenarioId);

        return commentResourceFactory.create(commentsUri, mainReferences, extraReferences);
    }

}
