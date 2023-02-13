package io.zucchiniui.backend.support.ddd;

import java.util.Objects;

/**
 * Base class to build a DDD entity.
 * <p>
 * This class ensures that two differents entities are equal by identifier, by providing {@link #equals(Object)}
 * and {@link #hashCode()} methods.
 *
 * @param <I> Type of entity identifier
 */
public abstract class BaseEntity<I> {

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

        final BaseEntity<?> other = (BaseEntity<?>) obj;
        return Objects.equals(getEntityId(), other.getEntityId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getEntityId());
    }

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(ID = " + getEntityId() + ")";
    }

    protected abstract I getEntityId();

}
