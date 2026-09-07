package io.zucchiniui.backend.comment.dao;

import dev.morphia.Datastore;
import dev.morphia.query.FindOptions;
import dev.morphia.query.Query;
import dev.morphia.query.Sort;
import dev.morphia.query.filters.Filters;
import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaDAO;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class CommentDAO extends MorphiaDAO<Comment, String> {

    public CommentDAO(final Datastore ds) {
        super(ds, Comment.class);
    }

    public Query<Comment> queryByReferences(final Set<ItemReference> itemReferences) {
        final FindOptions options = new FindOptions().sort(Sort.descending("date"));
        return datastore.find(Comment.class, options)
            .filter(Filters.in("references", itemReferences));
    }

}
