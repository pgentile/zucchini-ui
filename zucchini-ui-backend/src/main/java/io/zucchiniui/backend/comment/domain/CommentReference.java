package io.zucchiniui.backend.comment.domain;

import com.google.common.base.MoreObjects;
import com.google.common.base.Strings;

import java.util.Objects;

/**
 * Comment reference.
 */
public final class CommentReference {

    /**
     * Type
     */
    private CommentReferenceType type;

    /**
     * Reference value.
     */
    private String reference;

    /**
     * Private constructor for Morphia.
     */
    private CommentReference() {

    }

    /**
     * Create a new reference.
     *
     * @param type      Type
     * @param reference Reference value
     */
    public CommentReference(final CommentReferenceType type, final String reference) {
        this.type = Objects.requireNonNull(type);

        if (Strings.isNullOrEmpty(reference)) {
            throw new IllegalArgumentException("Reference must be defined");
        }
        this.reference = reference;
    }

    public CommentReferenceType getType() {
        return type;
    }

    public String getReference() {
        return reference;
    }

    @Override
    public boolean equals(final Object obj) {
        if (obj == null) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        if (!getClass().equals(obj.getClass())) {
            return false;
        }

        final CommentReference other = (CommentReference) obj;
        return Objects.equals(type, other.type) && Objects.equals(reference, other.reference);
    }

    @Override
    public int hashCode() {
        return Objects.hash(type, reference);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("type", type)
            .add("reference", reference)
            .toString();
    }

}
