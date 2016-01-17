package io.testscucumber.backend.comment.domain;

public enum CommentReferenceType {

    TEST_RUN_ID,
    SCENARIO_ID,
    SCENARIO_KEY;

    public CommentReference createReference(final String reference) {
        return new CommentReference(this, reference);
    }

    }
