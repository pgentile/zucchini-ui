package example.reporting.feature.domain;

public interface FeatureService {

    void deleteByTestRunId(String testRunId);

    void deleteById(String featureId);

}
