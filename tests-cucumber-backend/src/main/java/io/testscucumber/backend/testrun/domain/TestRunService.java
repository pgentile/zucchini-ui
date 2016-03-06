package io.testscucumber.backend.testrun.domain;

public interface TestRunService {

    void updateType(String testRunId, String newType);

    void deleteById(String testRunId);

}
