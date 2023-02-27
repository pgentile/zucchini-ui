package io.zucchiniui.backend.feature.rest;

import com.google.common.base.Strings;
import io.zucchiniui.backend.feature.domain.Feature;
import io.zucchiniui.backend.feature.domain.FeatureQuery;
import io.zucchiniui.backend.feature.domain.FeatureRepository;
import io.zucchiniui.backend.feature.domain.FeatureService;
import io.zucchiniui.backend.feature.views.FeatureHistoryItem;
import io.zucchiniui.backend.feature.views.FeatureListItem;
import io.zucchiniui.backend.feature.views.FeatureViewAccess;
import io.zucchiniui.backend.shared.domain.TagSelection;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Set;

@Component
@Path("/features")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FeatureResource {

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    private final FeatureViewAccess featureViewAccess;

    public FeatureResource(
        final FeatureRepository featureRepository,
        final FeatureService featureService,
        final FeatureViewAccess featureViewAccess
    ) {
        this.featureRepository = featureRepository;
        this.featureService = featureService;
        this.featureViewAccess = featureViewAccess;
    }

    @GET
    public List<FeatureListItem> getFeatures(
        @QueryParam("testRunId") final String testRunId,
        @QueryParam("tag") final Set<String> tags,
        @QueryParam("excludedTag") final Set<String> excludedTag,
        @QueryParam("withStats") @DefaultValue("false") final boolean withStats
    ) {
        FeatureQuery q = new FeatureQuery().sortByGroupAndName();
        if (!Strings.isNullOrEmpty(testRunId)) {
            q = q.withTestRunId(testRunId);
        }
        final TagSelection tagSelection = new TagSelection(tags, excludedTag);
        return featureViewAccess.getFeatureListItems(q, tagSelection, withStats);
    }

    @GET
    @Path("{featureId}")
    public Feature get(@PathParam("featureId") final String featureId) {
        return featureRepository.getById(featureId);
    }

    @GET
    @Path("{featureId}/history")
    public List<FeatureHistoryItem> getFeatureHistory(@PathParam("featureId") final String featureId) {
        final Feature feature = featureRepository.getById(featureId);
        return featureViewAccess.getFeatureHistory(feature.getFeatureKey());
    }

    @PATCH
    @Path("{featureId}")
    public void update(@PathParam("featureId") final String featureId, @Valid @NotNull final UpdateFeatureRequest request) {
        final Feature feature = featureRepository.getById(featureId);
        feature.setGroup(Strings.emptyToNull(request.getGroup()));
        featureRepository.save(feature);
    }

    @DELETE
    @Path("{featureId}")
    public void delete(@PathParam("featureId") final String featureId) {
        featureService.deleteById(featureId);
    }

}
