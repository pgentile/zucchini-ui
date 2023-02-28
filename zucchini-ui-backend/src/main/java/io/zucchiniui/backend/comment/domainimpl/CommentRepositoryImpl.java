package io.zucchiniui.backend.comment.domainimpl;

import io.zucchiniui.backend.comment.dao.CommentDAO;
import io.zucchiniui.backend.comment.domain.Comment;
import io.zucchiniui.backend.comment.domain.CommentRepository;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.morphia.MorphiaRepository;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
class CommentRepositoryImpl extends MorphiaRepository<Comment, String, CommentDAO> implements CommentRepository {

    public CommentRepositoryImpl(final CommentDAO dao) {
        super(dao);
    }

    @Override
    public PreparedQuery<Comment> queryByReferences(Set<ItemReference> itemReferences) {
        return prepareQuery(dao -> dao.queryByReferences(itemReferences));
    }

}
