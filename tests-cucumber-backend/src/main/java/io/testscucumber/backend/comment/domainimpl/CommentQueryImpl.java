package io.testscucumber.backend.comment.domainimpl;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.comment.domain.CommentQuery;
import io.testscucumber.backend.comment.domain.CommentReference;
import io.testscucumber.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

class CommentQueryImpl extends BaseMorphiaQuery<Comment> implements CommentQuery {

    protected CommentQueryImpl(final Query<Comment> query) {
        super(query);
    }

    @Override
    public CommentQuery withReference(final CommentReference commentReference) {
        configureQuery(q -> q.field("references").hasThisElement(commentReference));
        return this;
    }

    @Override
    public CommentQuery orderByLatestFirst() {
        configureQuery(q -> q.order("-date"));
        return this;
    }
}
