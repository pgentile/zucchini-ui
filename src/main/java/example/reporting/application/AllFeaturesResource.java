package example.reporting.application;

import example.reporting.feature.domain.FeatureDAO;
import example.reporting.feature.model.Feature;
import org.mongodb.morphia.query.Query;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/features")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AllFeaturesResource {

    private final FeatureDAO featureDAO;

    public AllFeaturesResource(FeatureDAO featureDAO) {
        this.featureDAO = featureDAO;
    }

    @GET
    public List<Feature> getFeatures(@QueryParam("testRunId") String testRunId) {
        Query<Feature> query = featureDAO.createQuery();
        if (testRunId != null) {
            query = query.field("testRunId").equal(testRunId);
        }

        return query.asList();
    }

}
