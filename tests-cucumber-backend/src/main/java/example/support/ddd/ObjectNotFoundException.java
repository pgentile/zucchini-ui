package example.support.ddd;

public class ObjectNotFoundException extends RuntimeException {

    public ObjectNotFoundException(final Class<?> clazz, final String details) {
        super(clazz.getSimpleName() + ": " + details);
    }

}
