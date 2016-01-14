package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.CommentGroup;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
class CommentGroupDAO extends MorphiaTypedQueryDAO<CommentGroup, String, CommentGroupQueryImpl> {

    @Autowired
    public CommentGroupDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    protected CommentGroupQueryImpl createTypedQuery() {
        return new CommentGroupQueryImpl(createQuery());
    }
}
