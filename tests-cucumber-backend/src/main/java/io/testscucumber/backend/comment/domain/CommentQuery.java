package io.testscucumber.backend.comment.domain;

public interface CommentQuery {

    CommentQuery withReference(CommentReference commentReference);

    CommentQuery orderByLatestFirst();

}
