package io.testscucumber.backend.comment.domain;

public interface CommentGroupQuery {

    CommentGroupQuery withType(String type);

    CommentGroupQuery withReferenceId(String referenceId);

}
