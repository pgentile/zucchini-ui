package io.testscucumber.backend.comment.dao;

import io.testscucumber.backend.comment.domain.Comment;
import io.testscucumber.backend.comment.domain.CommentQuery;
import io.testscucumber.backend.support.ddd.morphia.MorphiaTypedQueryDAO;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.function.Consumer;

@Component
public class CommentDAO extends MorphiaTypedQueryDAO<Comment, String, CommentQuery> {

    @Autowired
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
