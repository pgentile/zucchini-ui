package example.support.ddd;

public class ObjectNotFoundException extends RuntimeException {

    public ObjectNotFoundException(Class<?> clazz, String details) {
        super(clazz.getSimpleName() + ": " + details);
    }

}
