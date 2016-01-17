package io.testscucumber.backend.support.ddd;

/**
 * Exception thrown when an entity is not found.
 */
public class EntityNotFoundException extends RuntimeException {

    private final Class<?> entityType;

    public EntityNotFoundException(final Class<?> clazz, final String details) {
        super(clazz.getSimpleName() + ": " + details);
        entityType = clazz;
    }

    public Class<?> getEntityType() {
        return entityType;
    }

}
