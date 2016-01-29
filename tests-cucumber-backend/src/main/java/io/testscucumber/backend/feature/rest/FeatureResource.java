package io.testscucumber.backend.feature.rest;

import io.testscucumber.backend.feature.domain.Feature;
import io.testscucumber.backend.feature.domain.FeatureQuery;
import io.testscucumber.backend.feature.domain.FeatureRepository;
import io.testscucumber.backend.feature.domain.FeatureService;
import io.testscucumber.backend.feature.views.FeatureHistoryItem;
import io.testscucumber.backend.feature.views.FeatureListItem;
import io.testscucumber.backend.feature.views.FeatureViewAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;

@Component
@Path("/features")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FeatureResource {

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    private final FeatureViewAccess featureViewAccess;

    @Autowired
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
        @QueryParam("withStats") @DefaultValue("false") final boolean withStats
    ) {
        final Consumer<FeatureQuery> query = q -> q.withTestRunId(testRunId).orderByGroupAndName();
        return featureViewAccess.getFeatureListItems(query, tags, withStats);
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

    @DELETE
    @Path("{featureId}")
    public void delete(@PathParam("featureId") final String featureId) {
        featureService.deleteById(featureId);
    }

}
