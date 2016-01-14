package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.comment.domain.CommentQuery;
import io.testscucumber.backend.comment.domain.CommentRepository;
import io.testscucumber.backend.support.ddd.morphia.MorphiaQueriableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class CommentRepositoryImpl extends MorphiaQueriableRepository<Comment, String, CommentQuery> implements CommentRepository {

    @Autowired
    public CommentRepositoryImpl(final CommentDAO dao) {
        super(dao);
    }

}
