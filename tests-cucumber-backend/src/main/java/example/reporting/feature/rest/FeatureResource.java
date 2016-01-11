package example.reporting.feature.rest;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.feature.domain.FeatureService;
import example.reporting.feature.views.FeatureStats;
import example.reporting.feature.views.FeatureStatsViewAccess;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Component
@Path("/features")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FeatureResource {

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    private final FeatureStatsViewAccess featureStatsViewAccess;

    @Autowired
    public FeatureResource(final FeatureRepository featureRepository, final FeatureService featureService, final FeatureStatsViewAccess featureStatsViewAccess) {
        this.featureRepository = featureRepository;
        this.featureService = featureService;
        this.featureStatsViewAccess = featureStatsViewAccess;
    }

    @GET
    public List<Feature> getFeatures(@QueryParam("testRunId") final String testRunId) {
        return featureRepository.query()
            .withTestRunId(testRunId)
            .orderByFeatureName()
            .find();
    }

    @GET
    @Path("{featureId}")
    public Feature get(@PathParam("featureId") final String featureId) {
        return featureRepository.getById(featureId);
    }

    @GET
    @Path("{featureId}/stats")
    public FeatureStats getStats(@PathParam("featureId") final String featureId) {
        return featureStatsViewAccess.getStatsForByFeatureId(featureId);
    }

    @DELETE
    @Path("{featureId}")
    public void delete(@PathParam("featureId") final String featureId) {
        featureService.deleteById(featureId);
    }

}
