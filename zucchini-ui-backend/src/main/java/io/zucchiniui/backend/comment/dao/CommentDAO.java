package io.zucchiniui.backend.comment.dao;

import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.shared.domain.ItemReference;
import org.springframework.stereotype.Component;
import xyz.morphia.Datastore;
import xyz.morphia.dao.BasicDAO;
import xyz.morphia.query.Query;

import java.util.Set;

@Component
public class CommentDAO extends BasicDAO<Comment, String> {

    public CommentDAO(final Datastore ds) {
        super(ds);
    }

    public Query<Comment> queryByReferences(Set<ItemReference> itemReferences) {
        return createQuery()
            .field("references").hasAnyOf(itemReferences)
            .order("-date");
    }

}
