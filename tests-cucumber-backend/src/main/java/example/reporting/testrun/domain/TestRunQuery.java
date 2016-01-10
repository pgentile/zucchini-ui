package example.reporting.testrun.domain;

import example.support.ddd.Query;

public interface TestRunQuery extends Query<TestRun> {

    TestRunQuery orderByLatestFirst();

    TestRunQuery withEnv(String env);

}
