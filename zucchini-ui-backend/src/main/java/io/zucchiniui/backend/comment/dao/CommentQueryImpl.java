package io.zucchiniui.backend.comment.dao;

import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.comment.domain.CommentQuery;
import io.zucchiniui.backend.comment.domain.CommentReference;
import io.zucchiniui.backend.support.ddd.morphia.BaseMorphiaQuery;
import org.mongodb.morphia.query.Query;

class CommentQueryImpl extends BaseMorphiaQuery<Comment> implements CommentQuery {

    protected CommentQueryImpl(final Query<Comment> query) {
        super(query);
    }

    @Override
    public CommentQuery withReference(final CommentReference reference) {
        configureQuery(q -> q.field("references").hasThisElement(reference));
        return this;
    }

    @Override
    public CommentQuery withReferences(final Iterable<CommentReference> references) {
        for (final CommentReference reference : references) {
            withReference(reference);
        }
        return this;
    }

    @Override
    public CommentQuery orderByLatestFirst() {
        configureQuery(q -> q.order("-date"));
        return this;
    }
}
