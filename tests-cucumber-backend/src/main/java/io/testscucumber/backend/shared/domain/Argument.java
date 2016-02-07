package io.testscucumber.backend.shared.domain;

import com.google.common.base.MoreObjects;

import java.util.Objects;

public final class Argument {

    private int offset;

    private String value;

    /**
     * For frameworks.
     */
    private Argument() {
    }

    public Argument(final int offset, final String value) {
        this.offset = offset;
        this.value = value;
    }

    public int getOffset() {
        return offset;
    }

    public String getValue() {
        return value;
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

        final Argument other = (Argument) obj;
        return offset == other.offset && Objects.equals(value, other.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(offset, value);
    }

    @Override
    public String toString() {
        return MoreObjects.toStringHelper(this)
            .add("offset", offset)
            .add("value", value)
            .toString();
    }

}
