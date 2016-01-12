package example.reporting.testrun.domain;

public interface TestRunQuery {

    TestRunQuery orderByLatestFirst();

    TestRunQuery withEnv(String env);

}
