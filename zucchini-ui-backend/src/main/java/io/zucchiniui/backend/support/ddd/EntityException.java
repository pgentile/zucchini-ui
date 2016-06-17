package io.zucchiniui.backend.support.ddd;

public class EntityException extends RuntimeException {

    private final Class<?> entityType;

    public EntityException(final Class<?> clazz, final String details, final Throwable cause) {
        super(clazz.getSimpleName() + ": " + details, cause);
        entityType = clazz;
    }

    public EntityException(final Class<?> clazz, final String details) {
        this(clazz, details, null);
    }

    public Class<?> getEntityType() {
        return entityType;
    }

}
