package example.reporting.feature;

import com.google.common.base.Strings;
import example.reporting.api.feature.Feature;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
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

    private final FeatureDAO featureDAO;

    @Autowired
    public AllFeaturesResource(FeatureDAO featureDAO) {
        this.featureDAO = featureDAO;
    }

    @GET
    public List<Feature> getFeatures(@QueryParam("testRunId") String testRunId) {
        Query<Feature> query = featureDAO.createQuery();
        if (!Strings.isNullOrEmpty(testRunId)) {
            query = query.field("testRunId").equal(testRunId);
        }

        return query.asList();
    }

    @Path("{featureId}")
    public FeatureResource getFeature(@PathParam("featureId") String featureId) {
        Feature feature = featureDAO.get(featureId);
        if (feature == null) {
            throw new NotFoundException("Feature with ID '" + featureId + "' doesn't exist");
        }
        return new FeatureResource(feature);
    }

}
