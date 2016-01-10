package example.reporting.feature.domain;

public interface FeatureService {

    FeatureStats computeStats(Feature feature);

    void deleteByTestRunId(String testRunId);

    void deleteById(String featureId);

}
