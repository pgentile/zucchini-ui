package io.testscucumber.backend.comment.domain;

import java.util.List;

public interface CommentService {

    Comment addComment(String type, String referenceId, String content);

    List<Comment> getCommentsByTypeAndReferenceId(String type, String referenceId);

}
