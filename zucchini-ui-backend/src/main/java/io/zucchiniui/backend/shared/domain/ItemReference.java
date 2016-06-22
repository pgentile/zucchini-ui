package io.zucchiniui.backend.shared.domain;

import com.google.common.base.MoreObjects;
import com.google.common.base.Strings;

import java.util.Objects;

/**
 * Item reference.
 */
public final class ItemReference {

    /**
     * Type
     */
    private ItemReferenceType type;

    /**
     * Reference value.
     */
    private String reference;

    /**
     * Private constructor for Morphia.
     */
    private ItemReference() {

    }

    /**
     * Create a new reference.
     *
     * @param type      Type
     * @param reference Reference value
     */
    public ItemReference(final ItemReferenceType type, final String reference) {
        this.type = Objects.requireNonNull(type);

        if (Strings.isNullOrEmpty(reference)) {
            throw new IllegalArgumentException("Reference must be defined");
        }
        this.reference = reference;
    }

    public ItemReferenceType getType() {
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

        final ItemReference other = (ItemReference) obj;
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
