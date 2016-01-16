package io.testscucumber.backend.comment.domain;

public interface CommentQuery {

    CommentQuery withReference(CommentReference commentReference);

    CommentQuery withReferences(Iterable<CommentReference> references);

    CommentQuery orderByLatestFirst();

}
