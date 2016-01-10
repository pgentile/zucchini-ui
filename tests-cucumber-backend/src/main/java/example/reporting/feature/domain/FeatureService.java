package example.reporting.feature.domain;

public interface FeatureService {

    FeatureStats computeStats(String featureId);

    void deleteByTestRunId(String testRunId);

    void deleteById(String featureId);

}
