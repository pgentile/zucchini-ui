package io.zucchiniui.backend.testrun.domain;

public record TestRunQuery(String type, boolean orderByLatestFirst) {

    public TestRunQuery() {
        this(null, false);
    }

    public TestRunQuery sortByLatestFirst() {
        return new TestRunQuery(type, true);
    }

    public TestRunQuery withType(String type) {
        return new TestRunQuery(type, orderByLatestFirst);
    }

}
