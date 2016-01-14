package io.testscucumber.backend.comment.domain;

import io.testscucumber.backend.support.ddd.QueriableRepository;

public interface CommentRepository extends QueriableRepository<Comment, String, CommentQuery> {
}
