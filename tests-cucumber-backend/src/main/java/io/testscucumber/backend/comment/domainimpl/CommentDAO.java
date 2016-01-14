package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class CommentDAO extends MorphiaTypedQueryDAO<Comment, String, CommentQueryImpl> {

    @Autowired
    public CommentDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    protected CommentQueryImpl createTypedQuery() {
        return new CommentQueryImpl(createQuery());
    }
}
