package io.testscucumber.backend.comment.domain;

public interface CommentQuery {

    CommentQuery withGroupId(String groupId);

    CommentQuery orderByLatestFirst();

}
