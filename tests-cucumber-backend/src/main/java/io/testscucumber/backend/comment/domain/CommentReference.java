package io.testscucumber.backend.comment.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.base.MoreObjects;

import java.util.Objects;

public final class CommentReference {

    @JsonProperty
    private final String type;

    @JsonProperty
    private final String reference;

    @JsonCreator
    public CommentReference(@JsonProperty("type") final String type, @JsonProperty("reference") final String reference) {
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
