package io.zucchiniui.backend.support.ddd;

/**
 * Exception thrown on a concurrent entity exception.
 */
public class ConcurrentEntityModificationException extends EntityException {

    public ConcurrentEntityModificationException(final Class<?> clazz, final String details, final Throwable cause) {
        super(clazz, details, cause);
    }

    public ConcurrentEntityModificationException(final Class<?> clazz, final String details) {
        super(clazz, details);
    }

}
