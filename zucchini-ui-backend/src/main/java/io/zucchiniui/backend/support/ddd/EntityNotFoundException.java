package io.zucchiniui.backend.support.ddd;

/**
 * Exception thrown when an entity is not found.
 */
public class EntityNotFoundException extends EntityException {

    public EntityNotFoundException(final Class<?> clazz, final String details) {
        super(clazz, details);
    }

}
