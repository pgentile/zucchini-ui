package io.testscucumber.backend.support.ddd;

import java.util.Objects;

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

        final BaseEntity other = (BaseEntity) obj;
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
