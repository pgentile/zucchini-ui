package io.testscucumber.backend.comment.domain;

import com.google.common.base.MoreObjects;
import com.google.common.base.Strings;

import java.util.Objects;

public final class CommentReference {

    private final String type;

    private final String reference;

    public CommentReference(final String type, final String reference) {
        if (Strings.isNullOrEmpty(type)) {
            throw new IllegalArgumentException("Type must be defined");
        }
        if (Strings.isNullOrEmpty(reference)) {
            throw new IllegalArgumentException("Reference must be defined");
        }

        this.type = type;
        this.reference = reference;
    }

    public String getType() {
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
