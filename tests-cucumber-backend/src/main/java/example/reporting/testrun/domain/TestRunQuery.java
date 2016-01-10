package example.reporting.testrun.domain;

import example.support.ddd.TypedQuery;

public interface TestRunQuery extends TypedQuery<TestRun> {

    TestRunQuery orderByLatestFirst();

    TestRunQuery withEnv(String env);

}
