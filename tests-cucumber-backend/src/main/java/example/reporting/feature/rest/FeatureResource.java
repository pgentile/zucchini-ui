package example.reporting.feature.rest;

import example.reporting.feature.domain.Feature;
import example.reporting.feature.domain.FeatureRepository;
import example.reporting.feature.domain.FeatureService;
import example.reporting.feature.views.FeatureStats;
import example.reporting.feature.views.FeatureStatsViewAccess;
import example.reporting.testrun.domain.TestRun;
import example.reporting.testrun.domain.TestRunRepository;
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
import java.util.stream.Collectors;

@Component
@Path("/features")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FeatureResource {

    private final FeatureRepository featureRepository;

    private final FeatureService featureService;

    private final FeatureStatsViewAccess featureStatsViewAccess;

    private final TestRunRepository testRunRepository;

    @Autowired
    public FeatureResource(
        final FeatureRepository featureRepository,
        final FeatureService featureService,
        final FeatureStatsViewAccess featureStatsViewAccess,
        final TestRunRepository testRunRepository
    ) {
        this.featureRepository = featureRepository;
        this.featureService = featureService;
        this.featureStatsViewAccess = featureStatsViewAccess;
        this.testRunRepository = testRunRepository;
    }

    @GET
    public List<Feature> getFeatures(@QueryParam("testRunId") final String testRunId) {
        return featureRepository.query(q -> q.withTestRunId(testRunId).orderByFeatureName())
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

    @GET
    @Path("{featureId}/history")
    public List<Feature> getFeatureHistory(@PathParam("featureId") final String featureId) {
        final Feature feature = featureRepository.getById(featureId);
        final TestRun featureTestRun = testRunRepository.getById(feature.getTestRunId());

        final List<String> testRunIds = testRunRepository.query(q -> q.withEnv(featureTestRun.getEnv()))
            .find()
            .stream()
            .map(TestRun::getId)
            .collect(Collectors.toList());

        // FIXME Order by date
        return featureRepository.query(q -> q.withFeatureKey(feature.getFeatureKey()).withTestRunIdIn(testRunIds))
            .find();
    }

    @DELETE
    @Path("{featureId}")
    public void delete(@PathParam("featureId") final String featureId) {
        featureService.deleteById(featureId);
    }

}
