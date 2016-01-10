package example.support.ddd;

public interface QueriableRepository<T, I, Q extends Query<T>> extends Repository<T, I> {

    Q query();

}
