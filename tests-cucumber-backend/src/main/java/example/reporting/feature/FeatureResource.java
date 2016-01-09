package example.reporting.feature;

import example.reporting.api.feature.Feature;
import example.reporting.api.feature.FeatureStats;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FeatureResource {

    private final FeatureService featureService;

    private final Feature feature;

    public FeatureResource(FeatureService featureService, Feature feature) {
        this.featureService = featureService;
        this.feature = feature;
    }

    @GET
    public Feature get() {
        return feature;
    }

    @GET
    @Path("stats")
    public FeatureStats getStats() {
        return featureService.computeStats(feature);
    }

}
