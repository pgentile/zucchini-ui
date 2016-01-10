package example.support.ddd;

public interface Repository<T, I> {

    T getById(I id);

    void save(T entity);

    void delete(T entity);

}
