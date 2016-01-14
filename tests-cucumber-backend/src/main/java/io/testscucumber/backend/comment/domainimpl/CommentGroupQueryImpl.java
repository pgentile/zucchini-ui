package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.CommentGroup;
import io.testscucumber.backend.comment.domain.CommentGroupQuery;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

class CommentGroupQueryImpl extends BaseMorphiaQuery<CommentGroup> implements CommentGroupQuery {

    protected CommentGroupQueryImpl(final Query<CommentGroup> query) {
        super(query);
    }

    @Override
    public CommentGroupQuery withType(final String type) {
        configureQuery(q -> q.field("type").equal(type));
        return this;
    }

    @Override
    public CommentGroupQuery withReferenceId(final String referenceId) {
        configureQuery(q -> q.field("referenceIds").equal(referenceId));
        return this;
    }

}
