package io.testscucumber.backend.support.ddd;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(final Class<?> clazz, final String details) {
        super(clazz.getSimpleName() + ": " + details);
    }

}
