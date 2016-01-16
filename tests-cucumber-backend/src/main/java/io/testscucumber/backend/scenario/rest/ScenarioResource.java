package io.testscucumber.backend.scenario.rest;

import io.testscucumber.backend.comment.domain.CommentReference;
import io.testscucumber.backend.comment.rest.CommentResource;
import io.testscucumber.backend.scenario.domain.Scenario;
import io.testscucumber.backend.scenario.domain.ScenarioRepository;
import io.testscucumber.backend.scenario.domain.ScenarioService;
import io.testscucumber.backend.scenario.domain.ScenarioStatus;
import io.testscucumber.backend.scenario.views.ScenarioHistoryItemView;
import io.testscucumber.backend.scenario.views.ScenarioListItemView;
import io.testscucumber.backend.scenario.views.ScenarioViewAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public List<ScenarioListItemView> getScenarii(@QueryParam("featureId") final String featureId) {
        return scenarioViewAccess.getScenarioListItems(q -> q.withFeatureId(featureId).orderedByScenarioName());
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

        final Set<CommentReference> findReferences = Collections.singleton(
            new CommentReference("scenarioKey", scenario.getScenarioKey())
        );

        final Set<CommentReference> createReferences = new HashSet<>(findReferences);
        createReferences.add(new CommentReference("testRunId", scenario.getTestRunId()));
        createReferences.add(new CommentReference("scenarioId", scenario.getId()));

        final URI commentsUri = uriInfo.getBaseUriBuilder()
            .path("/scenarii/{scenarioId}/comments")
            .build(scenarioId);

        return commentResourceFactory.create(commentsUri, findReferences, createReferences);
    }

}
