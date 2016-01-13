package example.reporting.feature.domain;

public interface FeatureService {

    void calculateStatusFromScenarii(Feature feature);

    void deleteByTestRunId(String testRunId);

    void deleteById(String featureId);

}
