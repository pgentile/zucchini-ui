package io.zucchiniui.backend.comment.domain;

import io.zucchiniui.backend.shared.domain.ItemReference;

public interface CommentQuery {

    CommentQuery withReference(ItemReference itemReference);

    CommentQuery withReferences(Iterable<ItemReference> references);

    CommentQuery orderByLatestFirst();

}
