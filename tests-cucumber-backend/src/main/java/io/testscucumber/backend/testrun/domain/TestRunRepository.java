package io.testscucumber.backend.testrun.domain;

import io.testscucumber.backend.support.ddd.QueriableRepository;

public interface TestRunRepository extends QueriableRepository<TestRun, String, TestRunQuery> {

}
