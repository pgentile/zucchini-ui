package example.support.ddd;

public interface QueriableRepository<T, I, Q extends TypedQuery<T>> extends Repository<T, I> {

    Q query();

}
