package io.zucchiniui.backend.comment.dao;

import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.comment.domain.CommentQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import xyz.morphia.Datastore;
import xyz.morphia.query.Query;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class CommentDAO extends MorphiaTypedQueryDAO<Comment, String, CommentQuery> {

    public CommentDAO(final Datastore ds) {
        super(ds);
    }

    @Override
    public Query<Comment> prepareTypedQuery(final Consumer<? super CommentQuery> preparator) {
        final CommentQueryImpl typedQuery = new CommentQueryImpl(createQuery());
        preparator.accept(typedQuery);
        return typedQuery.morphiaQuery();
    }

}
