package io.zucchiniui.backend.scenario.rest;

import com.google.common.base.Strings;
import com.google.common.collect.Sets;
import io.dropwizard.jersey.PATCH;
import io.zucchiniui.backend.comment.rest.CommentResource;
import io.zucchiniui.backend.scenario.domain.*;
import io.zucchiniui.backend.scenario.views.*;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.shared.domain.ItemReferenceType;
import io.zucchiniui.backend.shared.domain.TagSelection;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;
import java.util.*;
import java.util.function.Consumer;
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
        Consumer<ScenarioQuery> query = prepareQueryFromRequestParams(requestParams);

        if (Strings.isNullOrEmpty(requestParams.getSearch())) {
            query = query.andThen(ScenarioQuery::orderedByName);
        }

        return scenarioViewAccess.getScenarioListItems(query);
    }

    @GET
    @Path("tags")
    public List<ScenarioTagStats> getTagStats(@BeanParam final GetScenariiRequestParams requestParams) {
        if (!requestParams.getExcludedTags().isEmpty()) {
            throw new BadRequestException("You can't exclude tags when requesting feature tags");
        }

        final Consumer<ScenarioQuery> query = prepareQueryFromRequestParams(requestParams);
        return scenarioViewAccess.getTagStats(query, requestParams.getTags());
    }

    @GET
    @Path("stats")
    public ScenarioStats getStats(@BeanParam final GetScenariiRequestParams requestParams) {
        final Consumer<ScenarioQuery> query = prepareQueryFromRequestParams(requestParams);
        return scenarioViewAccess.getStats(query);
    }

    @GET
    @Path("associatedFailures")
    public Map<String, List<ScenarioListItemView>> getAllAssociatedFailures(@BeanParam final GetScenariiRequestParams requestParams) {
        Consumer<ScenarioQuery> query = q -> {
            if (!Strings.isNullOrEmpty(requestParams.getTestRunId())) {
                q.withTestRunId(requestParams.getTestRunId());
            }
            if (!Strings.isNullOrEmpty(requestParams.getFeatureId())) {
                q.withFeatureId(requestParams.getFeatureId());
            }
            q.havingErrorMessage();
        };
        return ErrorMessageGroupingUtils.computeDistance(scenarioViewAccess.getFailedScenarii(query));
    }


    @GET
    @Path("{scenarioId}")
    public Scenario get(@PathParam("scenarioId") final String scenarioId) {
        return scenarioRepository.getById(scenarioId);
    }

    @GET
    @Path("{scenarioId}/associatedFailures")
    public List<ScenarioListItemView> getAssociatedFailures(@PathParam("scenarioId") final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        List<ScenarioListItemView> associatedFailures = null;
        String errorMessage = ErrorMessageGroupingUtils.extractErrorMessage(scenario);
        if(StringUtils.isNotBlank(errorMessage)) {
            associatedFailures = scenarioViewAccess.getFailedScenarii(q -> { q.withTestRunId(scenario.getTestRunId()).havingErrorMessage();})
                .stream()
                .filter(otherScenario -> !scenarioId.equals(otherScenario.getId()))
                .filter(otherScenario -> ErrorMessageGroupingUtils.isSimilar(errorMessage, otherScenario.getErrorMessage()))
                .collect(Collectors.toList());
        }
        return associatedFailures != null ? associatedFailures : Collections.emptyList();
    }

    @GET
    @Path("{scenarioId}/attachments/{attachmentId}")
    public Response getAttachment(@PathParam("scenarioId") final String scenarioId, @PathParam("attachmentId") final String attachmentId) {
        final Optional<Attachment> attachment = scenarioRepository.getById(scenarioId).findAttachmentById(attachmentId);
        if (attachment.isPresent()) {
            final String mimeType = attachment.get().getMimeType();
            final byte[] attachmentData = attachment.get().getData();
            return Response.ok(attachmentData, mimeType).build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @PATCH
    @Path("{scenarioId}")
    public void update(@PathParam("scenarioId") final String scenarioId, @Valid @NotNull final UpdateScenarioRequest request) {
        final UpdateScenarioParams updateScenarioParams = new UpdateScenarioParams(
            Optional.ofNullable(request.getStatus()),
            Optional.ofNullable(request.isReviewed())
        );
        scenarioService.updateScenario(scenarioId, updateScenarioParams);
    }

    @DELETE
    @Path("{scenarioId}")
    public void delete(@PathParam("scenarioId") final String scenarioId) {
        scenarioService.deleteById(scenarioId);
    }

    @GET
    @Path("{scenarioId}/history")
    public List<ScenarioHistoryItemView> getHistory(@PathParam("scenarioId") final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);
        return scenarioViewAccess.getScenarioHistory(scenario.getScenarioKey());
    }

    @Path("{scenarioId}/comments")
    public CommentResource getComments(@PathParam("scenarioId") final String scenarioId) {
        final Scenario scenario = scenarioRepository.getById(scenarioId);

        final Set<ItemReference> mainReferences = Collections.singleton(
            ItemReferenceType.SCENARIO_KEY.createReference(scenario.getScenarioKey())
        );

        final Set<ItemReference> extraReferences = Sets.newHashSet(
            ItemReferenceType.TEST_RUN_ID.createReference(scenario.getTestRunId()),
            ItemReferenceType.SCENARIO_ID.createReference(scenario.getId())
        );

        final URI commentsUri = uriInfo.getBaseUriBuilder()
            .path("/scenarii/{scenarioId}/comments")
            .build(scenarioId);

        return commentResourceFactory.create(commentsUri, mainReferences, extraReferences);
    }

    private static Consumer<ScenarioQuery> prepareQueryFromRequestParams(final GetScenariiRequestParams requestParams) {
        return q -> {
            if (!Strings.isNullOrEmpty(requestParams.getTestRunId())) {
                q.withTestRunId(requestParams.getTestRunId());
            }
            if (!Strings.isNullOrEmpty(requestParams.getFeatureId())) {
                q.withFeatureId(requestParams.getFeatureId());
            }
            if (!Strings.isNullOrEmpty(requestParams.getSearch())) {
                q.withSearch(requestParams.getSearch());
            }

            final TagSelection tagSelection = new TagSelection(requestParams.getTags(), requestParams.getExcludedTags());
            q.withSelectedTags(tagSelection);
        };
    }

}
