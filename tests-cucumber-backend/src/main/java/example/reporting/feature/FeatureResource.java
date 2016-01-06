package example.reporting.feature;

import example.reporting.api.feature.Feature;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FeatureResource {

    private final Feature feature;

    public FeatureResource(Feature feature) {
        this.feature = feature;
    }

    @GET
    public Feature get() {
        return feature;
    }

}
