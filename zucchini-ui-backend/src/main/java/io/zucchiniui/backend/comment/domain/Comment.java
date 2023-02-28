package io.zucchiniui.backend.comment.domain;

import com.google.common.collect.Sets;
import io.zucchiniui.backend.shared.domain.ItemReference;
import io.zucchiniui.backend.support.ddd.BaseEntity;
import xyz.morphia.annotations.Embedded;
import xyz.morphia.annotations.Entity;
import xyz.morphia.annotations.Id;

import java.time.ZonedDateTime;
import java.util.*;

/**
 * Comment entity.
 */
@Entity("comments")
public class Comment extends BaseEntity<String> {

    /**
     * ID.
     */
    @Id
    private String id;

    /**
     * Comment creation date.
     */
    private ZonedDateTime date;

    /**
     * Comment content.
     */
    private String content;

    /**
     * Comment references.
     */
    @Embedded(concreteClass = HashSet.class)
    private Set<ItemReference> references;

    /**
     * Private constructor for Morphia.
     */
    private Comment() {
    }

    /**
     * Create a new comment.
     *
     * @param references References
     * @param content    Comment content
     */
    public Comment(final Iterable<ItemReference> references, final String content) {
        id = UUID.randomUUID().toString();
        date = ZonedDateTime.now();
        this.references = Sets.newHashSet(references);
        this.content = Objects.requireNonNull(content);
    }

    public void setContent(final String content) {
        this.content = Objects.requireNonNull(content);
    }

    public String getId() {
        return id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public String getContent() {
        return content;
    }

    public Set<ItemReference> getReferences() {
        return Collections.unmodifiableSet(references);
    }

    @Override
    protected String getEntityId() {
        return id;
    }

}
