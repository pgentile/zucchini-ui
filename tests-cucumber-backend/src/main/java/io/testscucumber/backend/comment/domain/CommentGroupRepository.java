package io.testscucumber.backend.comment.domain;

import io.testscucumber.backend.support.ddd.QueriableRepository;

public interface CommentGroupRepository extends QueriableRepository<CommentGroup, String, CommentGroupQuery> {
}
