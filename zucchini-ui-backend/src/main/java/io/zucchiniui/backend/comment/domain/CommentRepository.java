package io.zucchiniui.backend.comment.domain;

import io.zucchiniui.backend.support.ddd.QueriableRepository;

public interface CommentRepository extends QueriableRepository<Comment, String, CommentQuery> {
}
