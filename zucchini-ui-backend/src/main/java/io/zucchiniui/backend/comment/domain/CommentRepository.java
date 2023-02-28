package io.zucchiniui.backend.comment.domain;

import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.support.ddd.PreparedQuery;
import io.zucchiniui.backend.support.ddd.Repository;

import java.util.Set;

public interface CommentRepository extends Repository<Comment, String> {

    PreparedQuery<Comment> queryByReferences(Set<ItemReference> itemReferences);

}
