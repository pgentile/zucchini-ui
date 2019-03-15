package io.zucchiniui.backend.comment.dao;

import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.comment.domain.CommentQuery;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.support.ddd.morphia.BaseMorphiaQuery;
import xyz.morphia.query.Query;

class CommentQueryImpl extends BaseMorphiaQuery<Comment> implements CommentQuery {

    protected CommentQueryImpl(final Query<Comment> query) {
        super(query);
    }

    @Override
    @SuppressWarnings("deprecation")
    public CommentQuery withReference(final ItemReference reference) {
        // TODO hasThisElement is deprecated, find a way to use another method
        configureQuery(q -> q.field("references").hasThisElement(reference));
        return this;
    }

    @Override
    public CommentQuery withReferences(final Iterable<ItemReference> references) {
        for (final ItemReference reference : references) {
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
