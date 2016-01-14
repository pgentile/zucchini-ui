package io.testscucumber.backend.scenario.domain;

import io.testscucumber.backend.support.ddd.QueriableRepository;

public interface ScenarioRepository extends QueriableRepository<Scenario, String, ScenarioQuery> {

    void deleteByTestRunId(String testRunId);

    void deleteByFeatureId(String featureId);

}
