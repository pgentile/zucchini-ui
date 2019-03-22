package io.zucchiniui.backend.testrun.domain;

public interface TestRunQuery {

    TestRunQuery orderByLatestFirst();

    TestRunQuery withType(String type);

}
