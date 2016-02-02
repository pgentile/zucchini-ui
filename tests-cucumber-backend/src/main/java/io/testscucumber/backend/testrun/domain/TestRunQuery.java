package io.testscucumber.backend.testrun.domain;

public interface TestRunQuery {

    TestRunQuery orderByLatestFirst();

    TestRunQuery withType(String type);

}
