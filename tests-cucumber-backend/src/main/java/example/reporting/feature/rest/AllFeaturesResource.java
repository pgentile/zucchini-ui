package example.reporting.feature.rest;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.feature.domain.FeatureService;
import example.reporting.feature.domain.FeatureStats;
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
public class AllFeaturesResource {

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    @Autowired
    public AllFeaturesResource(final FeatureRepository featureRepository, final FeatureService featureService) {
        this.featureRepository = featureRepository;
        this.featureService = featureService;
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
        return featureService.computeStats(featureId);
    }

    @DELETE
    @Path("{featureId}")
    public void delete(@PathParam("featureId") final String featureId) {
        featureService.deleteById(featureId);
    }

}
